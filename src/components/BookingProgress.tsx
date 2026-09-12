import Link from 'next/link';
import { Fragment } from 'react';

const STEPS = [
  { label: 'Select Slot', href: '/book' },
  { label: 'Patient Details', href: '/book/patient-details' },
  { label: 'Payment', href: '/book/payment' },
  { label: 'Confirmation', href: '/book/confirmed' },
];

export default function BookingProgress({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  return (
    <div className="bg-surface-container-lowest border-b border-surface-variant py-4">
      <nav aria-label="Booking progress" className="max-w-[760px] mx-auto px-margin flex items-center justify-between">
        {STEPS.map((step, i) => {
          const n = i + 1;
          return (
            <Fragment key={step.href}>
              {i > 0 && <div className={`flex-1 h-[2px] mx-3 ${n <= currentStep ? 'bg-primary-container' : 'bg-surface-variant'}`}></div>}
              {n < currentStep ? (
                // Completed: clickable, takes the user back to that step
                <Link href={step.href} className="flex items-center gap-2.5 group" title={`Back to ${step.label}`}>
                  <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-bold shrink-0">
                    <span className="material-symbols-outlined text-[16px]" data-icon="check">check</span>
                  </div>
                  <span className="text-caption-strong font-caption-strong text-on-surface hidden sm:inline group-hover:text-primary-container transition-colors">{step.label}</span>
                </Link>
              ) : n === currentStep ? (
                <div className="flex items-center gap-2.5" aria-current="step">
                  <div className="w-7 h-7 rounded-full ring-2 ring-primary-container ring-offset-2 bg-surface-container-lowest text-primary-container text-xs font-bold flex items-center justify-center shrink-0">
                    {n}
                  </div>
                  <span className="text-caption-strong font-caption-strong text-on-surface font-bold">{step.label}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 opacity-60">
                  <div className="w-7 h-7 rounded-full border border-surface-variant bg-surface-container-low text-on-surface-variant text-xs flex items-center justify-center shrink-0">
                    {n}
                  </div>
                  <span className="text-caption font-caption text-on-surface-variant hidden sm:inline">{step.label}</span>
                </div>
              )}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
}
