import Link from 'next/link';
import { PARTNER_SECTIONS } from '@/lib/home-content';

/** B2B sections (spec 8–10), shared by the homepage and Partner With Us. */
export default function PartnerSections({ eyebrow = 'For Providers', title = 'Built for Doctors, Hospitals and Employers', sectionHeadings = false }: { eyebrow?: string; title?: string; sectionHeadings?: boolean }) {
  // On the homepage each programme is its own section (H2); elsewhere they are cards under one H2.
  const Title = sectionHeadings ? 'p' : 'h2';
  const CardHeading = sectionHeadings ? 'h2' : 'h3';
  return (
    <section id="for-providers" className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl scroll-mt-16 space-y-8">
      <div>
        <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">{eyebrow}</span>
        <Title className="text-headline-h1 font-headline-h1 text-on-surface mt-1">{title}</Title>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PARTNER_SECTIONS.map((section) => (
          <article key={section.id} id={section.id} className="p-6 rounded-2xl border border-surface-variant bg-surface-container-lowest flex flex-col gap-4 scroll-mt-16">
            <span className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[26px]">{section.icon}</span>
            </span>
            <div className="space-y-2">
              <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">{section.eyebrow}</span>
              <CardHeading className="text-headline-h3 font-headline-h3 text-on-surface">{section.heading}</CardHeading>
              <p className="text-caption font-caption text-on-surface-variant">{section.body}</p>
            </div>
            <ul className="space-y-2 pt-2 border-t border-surface-variant">
              {section.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-caption font-caption text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">check</span>
                  {point}
                </li>
              ))}
            </ul>
            {section.cta.href.startsWith('mailto:') ? (
              <a href={section.cta.href} className="mt-auto inline-flex items-center gap-1.5 text-caption-strong font-caption-strong text-primary-container hover:underline">
                {section.cta.label}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            ) : (
              <Link href={section.cta.href} className="mt-auto inline-flex items-center gap-1.5 text-caption-strong font-caption-strong text-primary-container hover:underline">
                {section.cta.label}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
