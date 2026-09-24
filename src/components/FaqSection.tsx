import type { Faq } from '@/lib/api';

/**
 * FAQ block for both pages and search results: section heading is an H2,
 * each question an H3 and each answer an H4 (styled as body text).
 */
export default function FaqSection({ faqs, heading = 'Frequently Asked Questions', intro, id = 'faq' }: { faqs: Faq[]; heading?: string; intro?: string; id?: string }) {
  return (
    <section id={id} className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl scroll-mt-16">
      <div className="mb-6">
        <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Questions, answered</span>
        <h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">{heading}</h2>
        {intro && <p className="text-body-default font-body-default text-on-surface-variant mt-2 max-w-2xl">{intro}</p>}
      </div>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="group bg-surface-container-lowest border border-surface-variant rounded-xl px-5 py-4">
            <summary className="flex items-start justify-between gap-4 cursor-pointer list-none select-none">
              <h3 className="text-body-strong font-body-strong text-on-surface">{faq.question}</h3>
              <span className="material-symbols-outlined text-on-surface-variant shrink-0 group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <h4 className="text-body-default font-body-default text-on-surface-variant mt-3 font-normal">{faq.answer}</h4>
          </details>
        ))}
      </div>
    </section>
  );
}
