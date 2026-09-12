'use client';
import Link from 'next/link';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// Emergency UI uses Emergency Red (#EE1C25) only — never the brand red (#C1121F).
const NEAREST_HOSPITALS = [
  { name: 'Manipal Super Specialty Hospital', area: 'HAL Airport Road', distance: '1.8 km' },
  { name: 'Fortis Medical Centre', area: 'Cunningham Road, Vasanth Nagar', distance: '4.1 km' },
  { name: 'Aster CMI Hospital', area: 'Hebbal', distance: '8.4 km' },
];

type ContinueTo = { href: string; label: string };
type OpenOptions = { continueTo?: ContinueTo };

const EmergencyContext = createContext<{ open: (options?: OpenOptions) => void } | null>(null);

export function EmergencyProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<OpenOptions | null>(null);
  return (
    <EmergencyContext.Provider value={{ open: (o) => setOptions(o ?? {}) }}>
      {children}
      <EmergencyModal open={options !== null} onClose={() => setOptions(null)} continueTo={options?.continueTo} />
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const ctx = useContext(EmergencyContext);
  if (!ctx) throw new Error('useEmergency must be used inside <EmergencyProvider>');
  return ctx;
}

type Props = {
  open: boolean;
  onClose: () => void;
  /** Optional non-emergency next step, e.g. Chest Pain → cardiologists. */
  continueTo?: ContinueTo;
};

export default function EmergencyModal({ open, onClose, continueTo }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true"></div>
      <div role="alertdialog" aria-modal="true" aria-labelledby="emergency-title" className="relative w-full sm:max-w-md bg-white border-t border-[#E7E5E4] rounded-t-2xl sm:rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 p-1.5 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="px-6 pt-6 pb-5 text-center space-y-3 border-b border-[#E7E5E4]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#EE1C25] font-micro text-micro uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            Medical emergency
          </div>
          <h2 id="emergency-title" className="font-headline-h2 text-headline-h2 text-[#1C1917]">Call the national ambulance line</h2>
          <div className="text-[72px] leading-none font-bold tracking-tight text-[#EE1C25] tabular-nums">108</div>
          <p className="font-caption text-caption text-[#78716C]">Free, 24×7 across India. Stay on the line and share your exact location.</p>
          <a
            href="tel:108"
            autoFocus
            className="pulse-emergency w-full h-12 rounded-lg bg-[#EE1C25] hover:bg-[#C8161E] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 transition"
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
            Call Now
          </a>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div className="font-caption-strong text-caption-strong text-[#1C1917] uppercase tracking-wider">Nearest 24×7 emergency departments</div>
          <ul className="space-y-2">
            {NEAREST_HOSPITALS.map((h) => (
              <li key={h.name} className="flex items-center gap-3 p-3 rounded-xl border border-[#E7E5E4]">
                <span className="material-symbols-outlined text-[20px] text-[#78716C]">local_hospital</span>
                <div className="flex-1 min-w-0">
                  <div className="font-body-strong text-body-strong text-[#1C1917] truncate">{h.name}</div>
                  <div className="font-caption text-caption text-[#78716C]">{h.area} · {h.distance}</div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${h.name} ${h.area} Bengaluru`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 h-9 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] flex items-center gap-1 font-caption-strong text-caption-strong text-[#1C1917]"
                >
                  <span className="material-symbols-outlined text-[16px]">directions</span>
                  Directions
                </a>
              </li>
            ))}
          </ul>
          {continueTo && (
            <Link href={continueTo.href} onClick={onClose} className="block pt-1 text-center font-caption-strong text-caption-strong text-[#78716C] hover:text-[#1C1917]">
              {continueTo.label} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
