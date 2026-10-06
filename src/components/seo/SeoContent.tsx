import Link from 'next/link';
import FaqAccordion from '@/components/seo/FaqAccordion';
import ReadMore from '@/components/seo/ReadMore';
import type { Cell, SeoPage, SeoSection } from '@/lib/seo-content';

/**
 * Renders a page built by lib/seo-content.ts. Heading levels are fixed here, the words come from the
 * builders: the template H2 with its stats strip, upper copy and collapsed "read more" H3s (SeoIntro),
 * then the tables and the FAQ block (SeoBody).
 */
export function SeoIntro({ page, className = '' }: { page: SeoPage; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">{page.h2}</h2>
      {page.stats.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Key figures">
          {page.stats.map((s) => (
            <li
              key={s}
              className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E5E4] font-caption-strong text-caption-strong text-[#1C1917]"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      <p className="font-body-default text-body-default text-[#5c403d] leading-relaxed max-w-[900px]">
        {page.upper}
      </p>
      {page.readMore.length > 0 && (
        <ReadMore>
          <div className="space-y-4 max-w-[900px] pt-1">
            {page.readMore.map((section) => (
              <Section key={section.heading} section={section} />
            ))}
          </div>
        </ReadMore>
      )}
    </div>
  );
}

function Section({ section }: { section: SeoSection }) {
  return (
    <section className="space-y-1.5">
      <h3 className="font-body-strong text-body-strong text-[#1C1917]">{section.heading}</h3>
      {section.paragraphs?.map((p) => (
        <p key={p} className="font-caption text-caption text-[#5c403d] leading-relaxed">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="list-disc pl-5 space-y-0.5 font-caption text-caption text-[#5c403d]">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

const cell = (c: Cell) =>
  typeof c === 'string' ? (
    c
  ) : (
    <Link href={c.href} className="text-[#C1121F] hover:underline">
      {c.text}
    </Link>
  );

export function SeoBody({ page, className = '' }: { page: SeoPage; className?: string }) {
  return (
    <div className={`space-y-10 ${className}`}>
      {page.tables.map((t) => (
        <section key={t.id} id={t.id} className="space-y-3 scroll-mt-24">
          <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">{t.heading}</h2>
          {t.lead && (
            <p className="font-caption text-caption text-[#5c403d] max-w-[900px]">{t.lead}</p>
          )}
          <div className="overflow-x-auto rounded-xl border border-[#E7E5E4] bg-[#FFFFFF]">
            <table className="w-full min-w-[560px] text-left font-caption text-caption">
              <thead className="bg-[#FAFAF9] text-[#78716C]">
                <tr>
                  {t.columns.map((c, i) => (
                    <th
                      key={`${c}-${i}`}
                      scope="col"
                      className="px-3 py-2 font-caption-strong text-caption-strong whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, r) => (
                  <tr key={r} className="border-t border-[#E7E5E4] align-top">
                    {row.map((c, i) =>
                      i === 0 ? (
                        <th
                          key={i}
                          scope="row"
                          className="px-3 py-2 font-caption-strong text-caption-strong text-[#1C1917]"
                        >
                          {cell(c)}
                        </th>
                      ) : (
                        <td key={i} className="px-3 py-2 text-[#1C1917]">
                          {cell(c)}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {t.note && (
            <Link
              href={t.note.href}
              className="inline-block font-caption-strong text-caption-strong text-[#C1121F] hover:underline"
            >
              {t.note.text}
            </Link>
          )}
        </section>
      ))}
      {page.sections?.map((section) => (
        <Section key={section.heading} section={section} />
      ))}
      <FaqAccordion faqs={page.faqs} heading={page.faqHeading} answerAs="p" />
      {page.footnote && (
        <p className="font-caption text-caption text-[#78716C] max-w-[900px]">{page.footnote}</p>
      )}
    </div>
  );
}
