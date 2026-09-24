'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { rupees, type Doctor, type Slot } from '@/lib/api';

type Mode = 'clinic' | 'video';

const dayKey = (value: string | Date) => new Date(value).toDateString();

/** Morning / afternoon / evening buckets, matching how the clinic day is presented. */
const BANDS = [
  { id: 'morning', label: 'Morning', icon: 'wb_sunny', upto: 12 },
  { id: 'afternoon', label: 'Afternoon', icon: 'wb_twilight', upto: 17 },
  { id: 'evening', label: 'Evening', icon: 'nights_stay', upto: 24 },
] as const;

/** Scrolls an element into view only when it isn't already fully visible. */
function reveal(el: HTMLElement | null, block: ScrollLogicalPosition = 'nearest') {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const hidden = rect.top < 72 || rect.bottom > window.innerHeight - 140;
  if (hidden) el.scrollIntoView({ behavior: 'smooth', block });
}

type Props = {
  doctor: Doctor;
  slots: Slot[];
  initialMode?: Mode;
  /** A slot picked elsewhere (listing chip, consult-now card) arrives preselected. */
  initialSlotId?: string;
  onSelect?: (slot: Slot | null, mode: Mode) => void;
};

export default function BookingWidget({ doctor, slots, initialMode = 'clinic', initialSlotId, onSelect }: Props) {
  const router = useRouter();
  const offersVideo = doctor.offersVideo !== false && slots.some((s) => s.mode === 'video');
  const offersClinic = slots.some((s) => s.mode === 'clinic') || !offersVideo;
  const preselected = initialSlotId ? slots.find((s) => s.id === initialSlotId) ?? null : null;
  const startMode: Mode = preselected?.mode ?? (initialMode === 'video' && offersVideo ? 'video' : offersClinic ? 'clinic' : 'video');

  const [mode, setMode] = useState<Mode>(startMode);
  const [selected, setSelected] = useState<Slot | null>(preselected);
  const [activeDay, setActiveDay] = useState<string | null>(preselected ? dayKey(preselected.startsAt) : null);
  const timesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const missedSlot = Boolean(initialSlotId && !preselected);

  const modeSlots = useMemo(() => slots.filter((s) => s.mode === mode), [slots, mode]);

  // Seven days from today, marked with whether this doctor has anything open.
  const days = useMemo(() => {
    const open = new Set(modeSlots.map((s) => dayKey(s.startsAt)));
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return { date, key: date.toDateString(), hasSlots: open.has(date.toDateString()) };
    });
  }, [modeSlots]);

  const day = activeDay ?? days.find((d) => d.hasSlots)?.key ?? days[0]!.key;
  const daySlots = useMemo(() => modeSlots.filter((s) => dayKey(s.startsAt) === day), [modeSlots, day]);
  const freeToday = daySlots.some((s) => s.free);
  const fee = selected ? selected.fee : mode === 'video' ? doctor.videoFee : doctor.fee;
  const time = (slot: Slot) => new Date(slot.startsAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

  useEffect(() => {
    onSelect?.(selected, mode);
  }, [selected, mode, onSelect]);

  // A preselected slot scrolls its confirm button into view once the page settles.
  useEffect(() => {
    if (!preselected) return;
    const t = window.setTimeout(() => reveal(ctaRef.current, 'center'), 400);
    return () => window.clearTimeout(t);
  }, [preselected]);

  function switchMode(value: Mode) {
    setMode(value);
    setSelected(null);
    setActiveDay(null);
  }

  function pickDay(key: string) {
    setActiveDay(key);
    setSelected(null);
    // On phones the times sit below the fold — bring them up.
    requestAnimationFrame(() => reveal(timesRef.current, 'start'));
  }

  function choose(slot: Slot) {
    setSelected(slot);
    requestAnimationFrame(() => reveal(ctaRef.current, 'center'));
  }

  function book() {
    if (!selected) return;
    router.push(`/book?slot=${selected.id}&doctor=${doctor.slug}`);
  }

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm space-y-5">
      {/* Mode Segmented Switcher */}
      {offersVideo && offersClinic ? (
        <div className="bg-[#FAFAF9] p-1 border border-[#E7E5E4] rounded-xl grid grid-cols-2 gap-1 text-center font-caption-strong text-caption-strong" role="tablist" aria-label="Consultation type">
          {(['video', 'clinic'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              onClick={() => switchMode(value)}
              className={mode === value ? 'py-2 rounded-lg bg-white border border-[#E7E5E4] text-[#1C1917] shadow-xs' : 'py-2 rounded-lg text-[#78716C] hover:text-[#1C1917] transition duration-150'}
            >
              {value === 'video' ? `Video (${doctor.freeVideo ? 'Free first' : rupees(doctor.videoFee)})` : `Clinic Visit (${rupees(doctor.fee)})`}
            </button>
          ))}
        </div>
      ) : (
        <p className="px-3 py-2 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] font-caption-strong text-caption-strong text-[#1C1917] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#C1121F]">{offersVideo ? 'videocam' : 'local_hospital'}</span>
          {offersVideo ? 'Video consultation' : 'In-clinic visits only'}
        </p>
      )}

      {/* Pricing Block */}
      <div className="border-b border-[#E7E5E4] pb-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-display text-display text-[#1C1917]">{fee === 0 ? 'Free' : rupees(fee)}</span>
          {selected?.free && <span className="font-caption text-caption text-[#78716C] line-through">{rupees(doctor.videoFee)}</span>}
          <span className="ml-auto bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-2 py-0.5 rounded-full font-micro text-micro">Instant confirmation</span>
        </div>
        <div className="font-caption text-caption text-[#78716C] mt-1">Includes 7-day follow-up chat support</div>
        {doctor.consultHours && (
          <div className="font-caption text-caption text-[#78716C] mt-1 flex items-start gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Consults {doctor.consultHours}</span>
          </div>
        )}
      </div>

      {missedSlot && (
        <p role="status" className="px-3 py-2 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] font-caption text-caption text-[#9A3412]">
          That slot was just booked by someone else. Here are the next open times.
        </p>
      )}

      {/* 7-Day Date Strip */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-caption-strong text-caption-strong text-[#1C1917]">Select Date</span>
          <span className="font-micro text-micro text-[#78716C]">{new Date(day).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map(({ date, key, hasSlots }) => {
            const active = key === day;
            return (
              <button
                key={key}
                type="button"
                disabled={!hasSlots}
                aria-pressed={active}
                aria-label={`${date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}${hasSlots ? '' : ', no slots'}`}
                onClick={() => pickDay(key)}
                className={
                  active
                    ? 'bg-[#C1121F] text-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer shadow-xs'
                    : `border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center ${hasSlots ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`
                }
              >
                <span className={active ? 'font-micro text-micro text-white/80' : 'font-micro text-micro text-[#78716C]'}>{date.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                <span className={active ? 'font-body-strong text-body-strong' : 'font-body-strong text-body-strong text-[#1C1917]'}>{date.getDate()}</span>
                <span className={`w-1 h-1 rounded-full mt-1 ${active ? 'bg-white' : hasSlots ? 'bg-[#047857]' : 'bg-transparent'}`}></span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Matrix */}
      <div ref={timesRef} className="space-y-4 pt-1 scroll-mt-28">
        {daySlots.length === 0 && <p className="font-caption text-caption text-[#78716C]">No {mode === 'video' ? 'video' : 'in-clinic'} slots left on this day. Try another date.</p>}
        {freeToday && (
          <p className="font-caption text-caption text-[#047857] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">redeem</span>Slots marked Free cost nothing — a free first video consult.
          </p>
        )}
        {BANDS.map((band, index) => {
          const from = index === 0 ? 0 : BANDS[index - 1]!.upto;
          const inBand = daySlots.filter((s) => {
            const hour = new Date(s.startsAt).getHours();
            return hour >= from && hour < band.upto;
          });
          if (inBand.length === 0) return null;
          return (
            <div key={band.id}>
              <div className="flex items-center gap-1.5 text-caption-strong font-caption-strong text-[#78716C] mb-2">
                <span className="material-symbols-outlined text-[16px]">{band.icon}</span>
                <span>{band.label} ({inBand.length} {inBand.length === 1 ? 'slot' : 'slots'})</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {inBand.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    aria-pressed={selected?.id === slot.id}
                    onClick={() => choose(slot)}
                    className={
                      selected?.id === slot.id
                        ? 'relative py-2 text-center rounded-lg border-2 border-[#C1121F] bg-[#FFF1F2] font-caption-strong text-caption-strong text-[#C1121F] shadow-xs'
                        : `relative py-2 text-center rounded-lg border bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917] ${slot.free ? 'border-[#A7F3D0]' : 'border-[#E7E5E4]'}`
                    }
                  >
                    {time(slot)}
                    {slot.free && <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 rounded-full bg-[#047857] text-white text-[10px] leading-4 font-semibold">FREE</span>}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm — kept in view on desktop while the slot list scrolls. */}
      <div ref={ctaRef} className="space-y-3 lg:sticky lg:bottom-0 bg-white pt-2 -mb-1 pb-1 scroll-mb-28">
        {selected && (
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg p-2.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#C1121F] text-[18px]">alarm</span>
            <span className="font-caption text-caption text-[#1C1917]">
              Selected: <strong>{new Date(selected.startsAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}, {time(selected)}</strong> · {selected.mode === 'video' ? 'Video' : 'Clinic'} — held for 8 minutes once you continue
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={book}
          disabled={!selected}
          className="w-full h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] active:scale-[0.99] disabled:bg-[#A8A29E] disabled:active:scale-100 text-white font-body-strong text-body-strong tracking-wide shadow-sm transition duration-150 flex items-center justify-center gap-2"
        >
          <span>{selected ? (selected.free ? 'Book Free Consultation' : 'Book Appointment') : 'Select a time slot'}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* Policies & Trust */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-1.5 text-caption font-caption text-[#78716C]">
          <span className="material-symbols-outlined text-[16px] text-[#047857]">check_circle</span>
          <span>Free cancellation up to 2 hours before appointment</span>
        </div>
        <div className="border-t border-[#E7E5E4] pt-3 flex items-center justify-between text-micro font-micro text-[#78716C]">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span> Instant Confirm
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified_user</span> Verified Doctor
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock</span> ABDM Sync
          </div>
        </div>
      </div>
    </div>
  );
}
