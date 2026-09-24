import type { Faq } from '@/lib/api';
import { JsonLd, faqSchema } from '@/lib/seo';

type Props = {
  faqs: Faq[];
  heading?: string;
  /** Emit FAQPage structured data alongside the visible questions. */
  schema?: boolean;
  className?: string;
};

/**
 * FAQ block with the heading outline the SEO spec asks for: section H2, question H3, answer H4.
 * Native <details> keeps every answer in the HTML (indexable) while staying collapsible.
 */
export default function FaqAccordion({ faqs, heading = 'Frequently Asked Questions', schema = true, className = '' }: Props) {
  if (!faqs.length) return null;
  return (
    <div className={`space-y-3 ${className}`}>
      {schema && <JsonLd data={faqSchema(faqs)} />}
      <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] mb-4">{heading}</h2>
      {faqs.map((faq, index) => (
        <details key={faq.question} className="group bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg p-4 open:border-[#D6D3D1]" open={index === 0}>
          <summary className="w-full flex items-center justify-between gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-left font-body-strong text-body-strong text-[#1C1917]">{faq.question}</h3>
            <span className="material-symbols-outlined text-[20px] text-[#78716C] transition-transform group-open:rotate-180" aria-hidden="true">expand_more</span>
          </summary>
          <h4 className="mt-2 text-caption font-caption font-normal text-[#5c403d] leading-relaxed">{faq.answer}</h4>
        </details>
      ))}
    </div>
  );
}
