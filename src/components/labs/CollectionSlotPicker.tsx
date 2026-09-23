'use client';
import { useEffect, useState } from 'react';
import { api, type CollectionDay, type CollectionMode } from '@/lib/api';

export type CollectionChoice = { date: string; window: string };

const dayLabel = (iso: string, index: number) => {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y!, m! - 1, d!);
  return { day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : date.toLocaleDateString('en-IN', { weekday: 'short' }), date: date.getDate() };
};

type Props = {
  value: CollectionChoice | null;
  /** Called with null when the chosen window isn't open at this lab. */
  onChange: (c: CollectionChoice | null) => void;
  fasting?: boolean;
  /** Availability is per lab and per mode; omitted means our default reference lab's home visits. Key the picker by both so it reloads fresh. */
  lab?: string;
  mode?: CollectionMode;
};

/** Live collection availability for one lab: closed, full or too-soon windows are disabled. */
export default function CollectionSlotPicker({ value, onChange, fasting, lab, mode = 'home' }: Props) {
  const [days, setDays] = useState<CollectionDay[] | null>(null);
  const [error, setError] = useState(false);
  const [activeDate, setActiveDate] = useState<string | null>(value?.date ?? null);

  useEffect(() => {
    let live = true;
    api.collectionSlots(lab, mode).then(({ days: list }) => {
      if (!live) return;
      setDays(list);
      const first = list.find((d) => d.windows.some((w) => w.available));
      const chosenOpen = value && list.find((d) => d.date === value.date)?.windows.some((w) => w.window === value.window && w.available);
      // A slot picked for another lab or mode may not exist here.
      if (value && !chosenOpen) onChange(null);
      setActiveDate(chosenOpen ? value!.date : first?.date ?? list[0]?.date ?? null);
    }).catch(() => live && setError(true));
    return () => {
      live = false;
    };
    // Reload only when the lab or mode changes; the current choice is read once per load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lab, mode]);

  if (error) return <p className="font-caption text-caption text-[#8E0E17]">Couldn&apos;t load collection slots. Please refresh.</p>;
  if (!days) return <div className="h-40 rounded-lg bg-surface-container-low animate-pulse" aria-busy="true" />;

  if (!days.some((d) => d.windows.some((w) => w.available))) {
    return <p className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] font-caption text-caption text-[#92400E]">No open {mode === 'lab' ? 'visit' : 'collection'} slots at this lab in the next 5 days. Please pick another lab.</p>;
  }
  const active = days.find((d) => d.date === activeDate) ?? days[0]!;
  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-caption-strong font-caption-strong text-on-surface">{mode === 'lab' ? 'Visit date' : 'Collection date'}</span>
          <span className="text-micro font-micro text-tertiary font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{fasting ? 'Morning slots suit fasting' : 'Live availability'}</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d, i) => {
            const { day, date } = dayLabel(d.date, i);
            const open = d.windows.some((w) => w.available);
            const selected = d.date === active.date;
            return (
              <button
                key={d.date}
                type="button"
                disabled={!open}
                aria-pressed={selected}
                onClick={() => setActiveDate(d.date)}
                className={`flex flex-col items-center py-2 px-1 rounded-lg border transition ${!open ? 'border-surface-variant bg-surface-container opacity-60 cursor-not-allowed' : selected ? 'border-primary-container bg-[#FFF1F2] text-primary font-semibold shadow-sm' : 'border-surface-variant bg-surface-container-low hover:bg-surface-container'}`}
              >
                <span className="text-micro font-micro">{day}</span>
                <span className="font-body-strong text-caption">{date}</span>
                <span className={`text-micro font-micro ${open ? 'text-tertiary' : 'text-outline'}`}>{open ? '•' : d.closed ? 'Closed' : 'Full'}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <span className="block text-caption-strong font-caption-strong text-on-surface mb-2">{mode === 'lab' ? 'Arrival window' : 'Time window'}</span>
        <div className="grid grid-cols-2 gap-2 text-caption font-caption">
          {active.windows.map((w) => {
            const selected = value?.date === active.date && value.window === w.window;
            return (
              <button
                key={w.window}
                type="button"
                disabled={!w.available}
                aria-pressed={selected}
                onClick={() => onChange({ date: active.date, window: w.window })}
                className={`py-2 px-2.5 rounded-lg border text-left flex items-center justify-between gap-1 ${!w.available ? 'border-surface-variant bg-surface-container text-outline line-through cursor-not-allowed' : selected ? 'border-primary-container bg-[#FFF1F2] text-primary font-semibold' : 'border-surface-variant bg-surface-container-low hover:bg-surface-container text-on-surface'}`}
              >
                <span>{w.window}</span>
                {selected ? <span className="material-symbols-outlined text-[16px]">check_circle</span> : w.available && w.remaining <= 2 ? <span className="text-micro font-micro text-[#B45309] no-underline">{w.remaining} left</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
