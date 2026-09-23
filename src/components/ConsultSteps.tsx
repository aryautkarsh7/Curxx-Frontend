import Link from 'next/link';

export const CONSULT_STEPS = ['Specialty', 'Focus area', 'Doctor', 'Join'] as const;

type Props = {
  /** 1-based index of the step being shown. */
  current: number;
  /** Where each completed step goes back to, keyed by its 1-based index. */
  backTo?: Record<number, string>;
};

/** Progress rail for the instant video consult flow: specialty → focus area → doctor → join. */
export default function ConsultSteps({ current, backTo = {} }: Props) {
  return (
    <nav aria-label="Consultation progress" className="bg-surface-container-lowest border-b border-surface-variant">
      <ol className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-3 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
        {CONSULT_STEPS.map((label, index) => {
          const step = index + 1;
          const done = step < current;
          const active = step === current;
          const href = done ? backTo[step] : undefined;

          const content = (
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span
                className={
                  active
                    ? 'w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center text-micro font-micro font-semibold'
                    : done
                      ? 'w-6 h-6 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] flex items-center justify-center'
                      : 'w-6 h-6 rounded-full border border-surface-variant text-on-surface-variant flex items-center justify-center text-micro font-micro'
                }
              >
                {done ? <span className="material-symbols-outlined text-[14px]">check</span> : step}
              </span>
              <span
                className={
                  active
                    ? 'text-caption-strong font-caption-strong text-on-surface'
                    : 'text-caption font-caption text-on-surface-variant'
                }
              >
                {label}
              </span>
            </span>
          );

          return (
            <li key={label} className="flex items-center gap-2 sm:gap-3">
              {href ? (
                <Link href={href} className="hover:text-primary-container transition-colors">{content}</Link>
              ) : (
                <span aria-current={active ? 'step' : undefined}>{content}</span>
              )}
              {step < CONSULT_STEPS.length && (
                <span className="material-symbols-outlined text-[16px] text-outline-variant" aria-hidden="true">chevron_right</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
