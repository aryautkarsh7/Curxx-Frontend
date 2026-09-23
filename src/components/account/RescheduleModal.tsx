'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { api, errorMessage, rupees, type Appointment, type Slot } from '@/lib/api';
import { getToken } from '@/lib/session';

/** Moves an appointment to another open slot with the same doctor and mode. */
export default function RescheduleModal({ appointment, onClose, onDone }: { appointment: Appointment | null; onClose: () => void; onDone: (a: Appointment) => void }) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!appointment) return;
    setSlots(null); setSlotId(null); setDay(null); setError(null);
    api.slots(appointment.doctorSlug, appointment.mode).then((r) => setSlots(r.slots)).catch(() => setSlots([]));
  }, [appointment]);

  const byDay = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots ?? []) {
      const key = new Date(s.startsAt).toDateString();
      map.set(key, [...(map.get(key) ?? []), s]);
    }
    return [...map.entries()];
  }, [slots]);
  const active = byDay.find(([k]) => k === day) ?? byDay[0];

  async function confirm() {
    const token = getToken();
    if (!token || !appointment || !slotId) return;
    setBusy(true);
    setError(null);
    try {
      const { appointment: updated } = await api.reschedule(appointment.id, slotId, token);
      onDone(updated);
    } catch (e) {
      setError(errorMessage(e));
      api.slots(appointment.doctorSlug, appointment.mode).then((r) => setSlots(r.slots)).catch(() => {});
    } finally {
      setBusy(false);
    }
  }

  const chosen = slots?.find((s) => s.id === slotId);

  return (
    <AnimatePresence>
      {appointment && (
        <div className="fixed inset-0 z-[74] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={onClose} aria-hidden="true" />
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} role="dialog" aria-modal="true" aria-labelledby="reschedule-title" className="relative w-full sm:max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl border border-surface-variant shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[90vh] overflow-y-auto">
            <div className="px-5 py-4 border-b border-surface-variant flex items-start justify-between gap-3">
              <div>
                <h2 id="reschedule-title" className="font-headline-h3 text-headline-h3 text-on-surface">Reschedule</h2>
                <p className="font-caption text-caption text-on-surface-variant">{appointment.doctor?.name} · {appointment.mode === 'video' ? 'Video consult' : 'Clinic visit'}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">close</span></button>
            </div>
            <div className="px-5 py-4 space-y-4">
              {slots === null ? (
                <div className="h-32 rounded-lg bg-surface-container-low animate-pulse" aria-busy="true" />
              ) : byDay.length === 0 ? (
                <p className="font-body-default text-body-default text-on-surface-variant">No other open slots this week.</p>
              ) : (
                <>
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                    {byDay.map(([key]) => {
                      const d = new Date(key);
                      const selected = active?.[0] === key;
                      return (
                        <button key={key} type="button" onClick={() => { setDay(key); setSlotId(null); }} aria-pressed={selected} className={`shrink-0 w-14 flex flex-col items-center py-2 rounded-lg border ${selected ? 'border-primary-container bg-[#FFF1F2] text-primary font-semibold' : 'border-surface-variant bg-surface-container-low'}`}>
                          <span className="text-micro font-micro">{d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                          <span className="font-body-strong text-caption">{d.getDate()}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(active?.[1] ?? []).map((s) => (
                      <button key={s.id} type="button" onClick={() => setSlotId(s.id)} aria-pressed={slotId === s.id} className={slotId === s.id ? 'py-2 rounded-lg border-2 border-primary-container bg-[#FFF1F2] text-primary-container font-caption-strong text-caption' : 'py-2 rounded-lg border border-surface-variant bg-white text-on-surface font-caption text-caption'}>
                        {new Date(s.startsAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()}
                      </button>
                    ))}
                  </div>
                  {chosen && chosen.fee !== appointment.amount && (
                    <p className="font-caption text-caption text-on-surface-variant">This slot is {rupees(chosen.fee)} (you paid {rupees(appointment.amount)}). The difference is settled at the visit.</p>
                  )}
                </>
              )}
              {error && <p role="alert" className="px-3 py-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] font-caption text-caption text-[#8E0E17]">{error}</p>}
            </div>
            <div className="px-5 py-3 border-t border-surface-variant flex justify-end gap-2">
              <button type="button" onClick={onClose} className="h-11 px-5 rounded-lg border border-surface-variant bg-white font-caption-strong text-caption-strong">Keep current time</button>
              <button type="button" onClick={confirm} disabled={!slotId || busy} className="h-11 px-5 rounded-lg bg-primary-container hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-caption-strong text-caption-strong">{busy ? 'Moving…' : 'Confirm new time'}</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
