'use client';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { rupees, type Doctor, type Slot } from '@/lib/api';

type Mode = 'clinic' | 'video';

const dayKey = (value: string | Date) => new Date(value).toDateString();

/** Morning / afternoon / evening buckets, matching how the clinic day is presented. */
const BANDS = [
  { id: 'morning', label: 'Morning', icon: 'wb_sunny', upto: 12 },
  { id: 'afternoon', label: 'Afternoon', icon: 'wb_twilight', upto: 17 },
  { id: 'evening', label: 'Evening', icon: 'nights_stay', upto: 24 },
] as const;

export default function BookingWidget({ doctor, slots, initialMode = 'clinic' }: { doctor: Doctor; slots: Slot[]; initialMode?: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [selected, setSelected] = useState<Slot | null>(null);

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

  const [activeDay, setActiveDay] = useState<string | null>(null);
  const day = activeDay ?? days.find((d) => d.hasSlots)?.key ?? days[0]!.key;

  const daySlots = useMemo(() => modeSlots.filter((s) => dayKey(s.startsAt) === day), [modeSlots, day]);
  const fee = mode === 'video' ? doctor.videoFee : doctor.fee;
  const time = (slot: Slot) => new Date(slot.startsAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

  function choose(slot: Slot) {
    setSelected(slot);
  }

  function book() {
    if (!selected) return;
    router.push(`/book?slot=${selected.id}&doctor=${doctor.slug}`);
  }

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm space-y-5">
      {/* Mode Segmented Switcher */}
      <div className="bg-[#FAFAF9] p-1 border border-[#E7E5E4] rounded-xl grid grid-cols-2 gap-1 text-center font-caption-strong text-caption-strong">
        {(['video', 'clinic'] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => { setMode(value); setSelected(null); setActiveDay(null); }}
            className={mode === value ? 'py-2 rounded-lg bg-white border border-[#E7E5E4] text-[#1C1917] shadow-xs' : 'py-2 rounded-lg text-[#78716C] hover:text-[#1C1917] transition duration-150'}
          >
            {value === 'video' ? `Video (${rupees(doctor.videoFee)})` : `Clinic Visit (${rupees(doctor.fee)})`}
          </button>
        ))}
      </div>

      {/* Pricing Block */}
      <div className="border-b border-[#E7E5E4] pb-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-display text-display text-[#1C1917]">{rupees(fee)}</span>
          <span className="ml-auto bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-2 py-0.5 rounded-full font-micro text-micro">
            Instant confirmation
          </span>
        </div>
        <div className="font-caption text-caption text-[#78716C] mt-1">Includes 7-day follow-up chat support</div>
      </div>

      {/* 7-Day Date Strip */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-caption-strong text-caption-strong text-[#1C1917]">Select Date</span>
          <span className="font-micro text-micro text-[#78716C]">
            {new Date(day).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map(({ date, key, hasSlots }) => {
            const active = key === day;
            return (
              <button
                key={key}
                type="button"
                disabled={!hasSlots}
                onClick={() => { setActiveDay(key); setSelected(null); }}
                className={
                  active
                    ? 'bg-[#C1121F] text-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer shadow-xs'
                    : `border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center ${hasSlots ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`
                }
              >
                <span className={active ? 'font-micro text-micro text-white/80' : 'font-micro text-micro text-[#78716C]'}>
                  {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                </span>
                <span className={active ? 'font-body-strong text-body-strong' : 'font-body-strong text-body-strong text-[#1C1917]'}>{date.getDate()}</span>
                <span className={`w-1 h-1 rounded-full mt-1 ${active ? 'bg-white' : hasSlots ? 'bg-[#047857]' : 'bg-transparent'}`}></span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Matrix */}
      <div className="space-y-4 pt-1">
        {daySlots.length === 0 && (
          <p className="font-caption text-caption text-[#78716C]">
            No {mode === 'video' ? 'video' : 'in-clinic'} slots left on this day. Try another date.
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
                    onClick={() => choose(slot)}
                    className={
                      selected?.id === slot.id
                        ? 'py-2 text-center rounded-lg border-2 border-[#C1121F] bg-[#FFF1F2] font-caption-strong text-caption-strong text-[#C1121F] shadow-xs'
                        : 'py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]'
                    }
                  >
                    {time(slot)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Notice */}
      {selected && (
        <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg p-2.5 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#C1121F] text-[18px]">alarm</span>
          <span className="font-caption text-caption text-[#1C1917]">
            Selected: <strong>{new Date(selected.startsAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}, {time(selected)}</strong> — held for 8 minutes once you continue
          </span>
        </div>
      )}

      {/* PRIMARY ACTION CTA */}
      <button
        type="button"
        onClick={book}
        disabled={!selected}
        className="w-full h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] active:scale-[0.99] disabled:bg-[#A8A29E] disabled:active:scale-100 text-white font-body-strong text-body-strong tracking-wide shadow-sm transition duration-150 flex items-center justify-center gap-2"
      >
        <span>{selected ? 'Book Appointment' : 'Select a time slot'}</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>

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
