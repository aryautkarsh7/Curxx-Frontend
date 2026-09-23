'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';

const HOLD_KEY = 'curxx_slot_hold';
const HOLD_EVENT = 'curxx-slot-hold';
const HOLD_MS = 8 * 60 * 1000;

function readExpiresAt(): number | null {
  try {
    const hold = JSON.parse(localStorage.getItem(HOLD_KEY) ?? 'null');
    return typeof hold?.expiresAt === 'number' ? hold.expiresAt : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(HOLD_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(HOLD_EVENT, onChange);
  };
}

function writeHold(value: { expiresAt: number } | null) {
  try {
    if (value) localStorage.setItem(HOLD_KEY, JSON.stringify(value));
    else localStorage.removeItem(HOLD_KEY);
  } catch {
    // Storage blocked — the hold just won't survive a reload.
  }
  window.dispatchEvent(new Event(HOLD_EVENT));
}

/** Call when the user picks a slot: (re)starts the 8:00 hold. */
export function startSlotHold(expiresAt?: string | number) {
  const at = typeof expiresAt === 'string' ? new Date(expiresAt).getTime() : expiresAt;
  writeHold({ expiresAt: at && Number.isFinite(at) ? at : Date.now() + HOLD_MS });
}

export function clearSlotHold() {
  writeHold(null);
}

/** Milliseconds left on the hold, or null when no slot is held. */
export function useSlotHold(): number | null {
  const expiresAt = useSyncExternalStore(subscribe, readExpiresAt, () => null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (expiresAt === null) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return expiresAt === null ? null : Math.max(0, expiresAt - now);
}

export function formatHold(ms: number) {
  const total = Math.ceil(ms / 1000);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export default function SlotCountdown() {
  const remaining = useSlotHold();
  const router = useRouter();

  if (remaining === null) return null;

  return (
    <>
      <div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-lg p-2.5 flex items-center justify-center gap-2 text-primary-container" role="timer" aria-live="off">
        <span className="material-symbols-outlined text-[18px]" data-icon="timer">timer</span>
        <span className="font-caption-strong text-caption-strong">Slot held for <span className="font-mono">{formatHold(remaining)}</span></span>
      </div>
      {remaining === 0 && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" aria-hidden="true"></div>
          <div role="alertdialog" aria-modal="true" aria-labelledby="slot-expired-title" className="relative w-full max-w-sm bg-surface-container-lowest border-t border-[#E7E5E4] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-6 space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#B45309]">
              <span className="material-symbols-outlined text-[24px]">timer_off</span>
            </div>
            <div className="space-y-1">
              <h2 id="slot-expired-title" className="font-headline-h2 text-headline-h2 text-[#1C1917]">Slot hold expired</h2>
              <p className="font-body-default text-body-default text-[#78716C]">We released your reserved slot so other patients can book it. Pick a new time to continue.</p>
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => { clearSlotHold(); router.push('/book'); }}
              className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition"
            >
              Choose another slot
            </button>
          </div>
        </div>
      )}
    </>
  );
}
