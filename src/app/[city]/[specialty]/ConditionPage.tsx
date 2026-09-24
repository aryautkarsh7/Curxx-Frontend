import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FaqAccordion from '@/components/seo/FaqAccordion';
import { api, type ConditionDetail } from '@/lib/api';
import { resolveCity } from '@/lib/catalogue-live';
import { JsonLd } from '@/lib/seo';
import { conditionHref } from '@/lib/specialties';
import DoctorListing from './DoctorListing';
import { loadDoctors, queryFrom, type SearchParams } from './listing';

async function load(city: string, slug: string): Promise<ConditionDetail | null> {
  try {
    return await api.condition(slug, city);
  } catch {
    return null;
  }
}

export async function conditionMetadata(city: string, slug: string): Promise<Metadata> {
  const detail = await load(city, slug);
  if (!detail) return {};
  const { condition, specialty } = detail;
  const cityName = (await resolveCity(city))!.name;
  const title = `${condition.name} Treatment in ${cityName} — Consult ${specialty?.plural ?? 'Doctors'} Online or In-Clinic | Curxx`;
  const description = `${condition.summary} Book a verified ${specialty?.name.toLowerCase() ?? 'doctor'} in ${cityName} for ${condition.name.toLowerCase()} — video consult or clinic visit.`;
  const path = conditionHref(city, slug);
  return { title: { absolute: title }, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } };
}

const LINK = 'text-[#78716C] hover:text-[#C1121F] transition-colors';

/** /{city}/treatment-for-{condition}: a clean, indexable page for the homepage's popular consultations. */
export default async function ConditionPage({ city, slug, searchParams }: { city: string; slug: string; searchParams: SearchParams }) {
  const detail = await load(city, slug);
  if (!detail || !detail.specialty) notFound();
  const { condition, specialty } = detail;
  const cityInfo = (await resolveCity(city))!;
  const filters = queryFrom(searchParams);
  const listing = await loadDoctors({ ...filters, q: undefined, city, specialty: specialty.slug });
  const path = conditionHref(city, slug);

  const lists: [string, string[]][] = [
    [`Symptoms of ${condition.name}`, condition.symptoms],
    ['Common Causes', condition.causes],
    ['How It Is Treated', condition.treatments],
    ['Self-Care at Home', condition.selfCare],
    ['When to See a Doctor', condition.whenToSee],
  ];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'MedicalCondition',
          name: condition.name,
          description: condition.summary,
          signOrSymptom: condition.symptoms.map((s) => ({ '@type': 'MedicalSignOrSymptom', name: s })),
          possibleTreatment: condition.treatments.map((t) => ({ '@type': 'MedicalTherapy', name: t })),
          relevantSpecialty: specialty.name,
        }}
      />
      <DoctorListing
        {...listing}
        city={city}
        cityName={cityInfo.name}
        place={cityInfo.name}
        plural={specialty.plural}
        heading={`${condition.name} Treatment in ${cityInfo.name}`}
        subheading={`${listing.total.toLocaleString('en-IN')} verified ${specialty.plural.toLowerCase()} for ${condition.name.toLowerCase()} · video consult or clinic visit`}
        resultsHeading={`${specialty.plural} for ${condition.name} in ${cityInfo.name}`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: cityInfo.name, href: `/${city}/specialties` }, { label: specialty.plural, href: `/${city}/${specialty.slug}` }, { label: condition.name }]}
        emptyAction={{ href: `/${city}/${specialty.slug}`, label: `See all ${specialty.plural.toLowerCase()}` }}
      >
        <section className="bg-[#FAFAF9] border-y border-[#E7E5E4] py-12">
          <div className="w-full max-w-[900px] mx-auto px-6 space-y-6">
            <div className="space-y-3">
              <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">About {condition.name}</h2>
              <p className="text-body-default font-body-default text-[#5c403d] leading-relaxed">{condition.summary}</p>
              <p className="text-body-default font-body-default text-[#5c403d] leading-relaxed">
                {specialty.plural} treat {condition.name.toLowerCase()}. Curxx lists {detail.doctorCount} verified {specialty.plural.toLowerCase()} in {cityInfo.name}
                {detail.focus ? ` — look for doctors who focus on ${detail.focus.name.toLowerCase()}` : ''}. {specialty.video ? 'You can see one at a clinic near you or on a secure video call.' : 'Book a clinic visit at a time that suits you.'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {lists.map(([heading, items]) => (
                <div key={heading}>
                  <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-2">{heading}</h3>
                  <ul className="space-y-1.5 text-caption font-caption text-[#1C1917]">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F] shrink-0 mt-2"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {detail.article && (
              <Link href={`/blog/${detail.article.slug}`} className="block p-4 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#C1121F] transition">
                <span className="text-micro font-micro uppercase tracking-wider text-[#78716C]">Read the full guide · {detail.article.readMinutes} min</span>
                <span className="block font-body-strong text-body-strong text-[#1C1917] mt-1">{detail.article.title}</span>
              </Link>
            )}
            <p className="text-micro font-micro text-[#78716C]">This page is for general information and is not a substitute for a doctor’s advice. In an emergency call 108.</p>
            <FaqAccordion faqs={detail.faqs} heading={`${condition.name}: Frequently Asked Questions`} className="pt-6 border-t border-[#E7E5E4]" />
          </div>
        </section>
        <section className="bg-[#FFFFFF] py-10">
          <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-8">
            <h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">More Ways to Get Care</h2>
            {detail.related.length > 0 && (
              <div>
                <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Related Conditions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
                  {detail.related.map((c) => (
                    <Link key={c.slug} href={conditionHref(city, c.slug)} className={LINK}>{c.name} treatment in {cityInfo.name}</Link>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">{condition.name} Treatment in Other Cities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
                {detail.otherCities.map((c) => (
                  <Link key={c.slug} href={conditionHref(c.slug, slug)} className={LINK}>{condition.name} treatment in {c.name}</Link>
                ))}
              </div>
            </div>
            <Link href={path.replace(`treatment-for-${slug}`, specialty.slug)} className="inline-flex items-center gap-1 font-caption-strong text-caption-strong text-[#C1121F] hover:underline">
              All {specialty.plural.toLowerCase()} in {cityInfo.name}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </section>
      </DoctorListing>
    </>
  );
}
