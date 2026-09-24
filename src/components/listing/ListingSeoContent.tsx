import Link from 'next/link';
import FaqAccordion from '@/components/seo/FaqAccordion';
import type { Faq, SpecialtyContent } from '@/lib/api';
import { conditionHref } from '@/lib/specialties';

const LINK = 'text-[#78716C] hover:text-[#C1121F] transition-colors';

type Props = {
  content: SpecialtyContent;
  /** Base listing path for this specialty, e.g. /mumbai/cardiologist. */
  basePath: string;
};

/** Specialty × city × locality copy, FAQs and internal links under a doctor listing. */
export default function ListingSeoContent({ content, basePath }: Props) {
  const { specialty, city, locality, place } = content;
  const plural = specialty.plural;
  const localities = content.localities.filter((l) => l.slug !== locality?.slug);
  return (
    <>
      <section className="bg-[#FAFAF9] border-y border-[#E7E5E4] py-12">
        <div className="w-full max-w-[900px] mx-auto px-6">
          <div className="space-y-4">
            <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">
              About {specialty.name} Care in {place}
            </h2>
            {content.about.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-body-default font-body-default text-[#5c403d] leading-relaxed">
                {paragraph}
              </p>
            ))}
            {content.conditions.length > 0 && (
              <div className="pt-4">
                <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Common Conditions Treated by {plural}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-caption font-caption text-[#1C1917]">
                  {content.conditions.map((condition) => (
                    <li key={condition} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F] shrink-0"></span>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.whenToSee.length > 0 && (
              <div className="pt-4">
                <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">When Should You See a {specialty.name}?</h3>
                <ul className="space-y-2 text-caption font-caption text-[#1C1917]">
                  {content.whenToSee.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#047857] mt-0.5">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.topDoctors.length > 0 && (
              <div className="pt-4">
                <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Top-Rated {plural} in {place}</h3>
                <ol className="space-y-1.5 text-caption font-caption text-[#1C1917] list-decimal pl-5">
                  {content.topDoctors.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/doctor/${d.slug}`} className="font-caption-strong text-caption-strong hover:text-[#C1121F]">{d.name}</Link>
                      <span className="text-[#78716C]"> — {d.experienceYears} yrs experience · {d.rating.toFixed(1)}★ ({d.reviewCount} reviews) · {d.area} · ₹{d.fee.toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <FaqAccordion faqs={content.faqs} heading={`Frequently Asked Questions About ${plural} in ${place}`} className="mt-10 pt-8 border-t border-[#E7E5E4]" />
        </div>
      </section>
      <InternalLinks content={content} basePath={basePath} localities={localities} cityName={city.name} />
    </>
  );
}

function InternalLinks({ content, basePath, localities, cityName }: { content: SpecialtyContent; basePath: string; localities: SpecialtyContent['localities']; cityName: string }) {
  const { specialty, city } = content;
  const plural = specialty.plural;
  return (
    <section className="bg-[#FFFFFF] py-10">
      <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-8">
        <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Find {plural} Near You</h2>
        {localities.length > 0 && (
          <div>
            <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">{plural} by Locality in {cityName}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
              {localities.map((l) => (
                <Link key={l.slug} className={LINK} href={`/${city.slug}/${specialty.slug}/${l.slug}`}>
                  {plural} in {l.name} <span className="tabular-nums">({l.count})</span>
                </Link>
              ))}
            </div>
          </div>
        )}
        {content.locality && (
          <div>
            <Link href={basePath} className="inline-flex items-center gap-1 font-caption-strong text-caption-strong text-[#C1121F] hover:underline">
              See all {plural.toLowerCase()} in {cityName}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        )}
        {content.otherCities.length > 0 && (
          <div>
            <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">{plural} in Other Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
              {content.otherCities.map((c) => (
                <Link key={c.slug} className={LINK} href={`/${c.slug}/${specialty.slug}`}>
                  {plural} in {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {content.related.length > 0 && (
          <div>
            <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Related Specialties in {cityName}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
              {content.related.map((r) => (
                <Link key={r.slug} href={`/${city.slug}/${r.slug}`} className={LINK}>
                  {r.plural} in {cityName}
                </Link>
              ))}
            </div>
          </div>
        )}
        {(content.relatedConditions.length > 0 || content.surgeries.length > 0) && (
          <div>
            <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Treatments &amp; Procedures</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
              {content.relatedConditions.map((c) => (
                <Link key={c.slug} href={conditionHref(city.slug, c.slug)} className={LINK}>
                  {c.name} treatment in {cityName}
                </Link>
              ))}
              {content.surgeries.map((s) => (
                <Link key={s.slug} href={`/${city.slug}/surgery/${s.slug}`} className={LINK}>
                  {s.name} in {cityName}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Generic FAQs for the all-doctors page, where there is no single specialty. */
export function allDoctorsFaqs(cityName: string, total: number): Faq[] {
  return [
    { question: `How do I book a doctor in ${cityName} on Curxx?`, answer: `Search by specialty, symptom or doctor name, compare ${total.toLocaleString('en-IN')} verified doctors in ${cityName} by fee, experience and rating, then pick a clinic visit or video slot on the doctor’s profile. You get an instant confirmation by SMS.` },
    { question: 'Are the doctors on Curxx verified?', answer: 'Yes. Every doctor’s medical registration is checked against the State Medical Council register, along with their degrees and clinic details, before their profile goes live.' },
    { question: 'Can I consult a doctor online instead of visiting the clinic?', answer: 'Most doctors offer secure video consultations. Choose “Video Consultation” in the filters to see them; many also offer a free first video consult.' },
    { question: 'Does a consultation include a free follow-up?', answer: 'Every booking includes a free 7-day chat follow-up with the doctor, so you can share reports or ask about your medicines without paying again.' },
  ];
}
