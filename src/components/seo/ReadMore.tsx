'use client';
import { useId, useState, type ReactNode } from 'react';

/**
 * Collapsed "Read more" copy. Everything stays in the HTML (crawlers and screen readers get it all);
 * only the visible height changes.
 */
export default function ReadMore({
  children,
  label = 'Read more',
}: {
  children: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div>
      <div id={id} className={open ? '' : 'relative max-h-24 overflow-hidden'}>
        {children}
        {!open && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FAFAF9] to-transparent"
          />
        )}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="mt-2 inline-flex items-center gap-1 font-caption-strong text-caption-strong text-[#C1121F] hover:underline"
      >
        {open ? 'Show less' : label}
        <span className="material-symbols-outlined text-[18px]">
          {open ? 'expand_less' : 'expand_more'}
        </span>
      </button>
    </div>
  );
}
