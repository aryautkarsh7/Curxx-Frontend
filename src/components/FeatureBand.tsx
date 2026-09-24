import Link from 'next/link';
import type { Band } from '@/lib/content-types';

/** One content section from the SEO spec: eyebrow, H2, body, proof points and a CTA. */
export default function FeatureBand({ band, flip = false }: { band: Band; flip?: boolean }) {
  return (
    <section id={band.id} className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl scroll-mt-16">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="lg:col-span-7 space-y-4">
          <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">{band.eyebrow}</span>
          <h2 className="text-headline-h1 font-headline-h1 text-on-surface">{band.heading}</h2>
          <p className="text-body-default font-body-default text-on-surface-variant max-w-xl">{band.body}</p>
          <Link href={band.cta.href} className="inline-flex items-center gap-1.5 h-11 px-5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong transition">
            {band.cta.label}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl border border-surface-variant bg-surface-container-lowest space-y-4">
            <span className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[26px]">{band.icon}</span>
            </span>
            <ul className="space-y-2.5">
              {(band.points ?? []).map((point) => (
                <li key={point} className="flex items-start gap-2 text-caption font-caption text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0">check_circle</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
