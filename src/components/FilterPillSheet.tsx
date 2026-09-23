'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  /** Number of active filters, shown as a badge on the pill. */
  activeCount: number;
  total: number;
  noun: string;
  onClear: () => void;
  children: ReactNode;
};

/**
 * Phone-only filter entry point: a floating pill above the tab bar that opens a
 * bottom sheet, so results start at the top of the page instead of below the rail.
 */
export default function FilterPillSheet({ activeCount, total, noun, onClear, children }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-40 h-12 pl-5 pr-4 rounded-full bg-primary-container text-white shadow-[0_6px_20px_rgba(28,25,23,0.28)] flex items-center gap-2.5 active:scale-95 transition"
      >
        <span className="material-symbols-outlined text-[20px]">filter_list</span>
        <span className="font-caption-strong text-caption-strong tracking-wide uppercase">Filter</span>
        {activeCount > 0 && (
          <span className="w-6 h-6 rounded-full bg-white text-primary-container font-caption-strong text-caption-strong flex items-center justify-center tabular-nums">{activeCount}</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <div className="lg:hidden fixed inset-0 z-[60] flex items-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-[rgba(28,25,23,0.45)]" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              role="dialog"
              aria-modal="true"
              aria-label={`Filter ${noun}`}
              className="relative w-full max-h-[85vh] bg-surface-container-lowest rounded-t-2xl border-t border-[#E7E5E4] shadow-[0_-8px_24px_rgba(0,0,0,0.12)] flex flex-col"
            >
              <div className="shrink-0 px-5 pt-3 pb-3 border-b border-[#E7E5E4]">
                <div className="w-10 h-1 rounded-full bg-[#E7E5E4] mx-auto mb-3" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#78716C]">tune</span>Filters
                  </h2>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={onClear} className="font-caption-strong text-caption-strong text-[#C1121F] hover:text-[#8E0E17]">Clear all</button>
                    <button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="p-1 rounded-lg text-[#78716C] hover:bg-[#FAFAF9]">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">{children}</div>
              <div className="shrink-0 p-4 border-t border-[#E7E5E4] bg-surface-container-lowest">
                <button type="button" onClick={() => setOpen(false)} className="w-full h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition">
                  Show {total.toLocaleString('en-IN')} {total === 1 ? noun.replace(/s$/, '') : noun}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
