import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FaqAccordion from '@/components/seo/FaqAccordion';
import SurgeryLeadForm from '@/components/surgery/SurgeryLeadForm';
import DoctorCard from '@/components/DoctorCard';
import SurgeryTable from '@/components/surgery/SurgeryTable';
import { ApiError, api, hasReviews, rupees, uniqueDoctors } from '@/lib/api';
import { resolveCity } from '@/lib/catalogue-live';
import { JsonLd } from '@/lib/seo';
import { surgeryPageCopy } from '@/lib/surgery-template';

type Props = { params: Promise<{ city: string; slug: string }> };

async function load(slug: string, city: string) {
  try {
    return await api.surgery(slug, city);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, slug } = await params;
  const info = await resolveCity(city);
  if (!info) return {};
  const canonical = info.slug;
  const data = await load(slug, canonical);
  if (!data) return {};
  const { surgery } = data;
  const name = info.name;
  // The single surgery template's title and description, when the surgery has its figures.
  const copy = data.template
    ? surgeryPageCopy(
        surgery,
        { slug: canonical, name },
        data.specialty?.plural ?? 'Surgeons',
        data.template,
      )
    : null;
  if (copy)
    return {
      title: { absolute: copy.title },
      ...(copy.description ? { description: copy.description } : {}),
      alternates: { canonical: `/${canonical}/surgery/${slug}` },
    };
  return {
    title: {
      absolute: `${surgery.name} in ${name} — Est. Cost ${rupees(surgery.cost[0])}–${rupees(surgery.cost[1])}, Hospitals | Curxx`,
    },
    description: [
      surgery.description,
      surgery.cost[1] > 0
        ? `Estimated cost in ${name}: ${rupees(surgery.cost[0])} to ${rupees(surgery.cost[1])}.`
        : '',
      surgery.stay ? `Hospital stay: ${surgery.stay}.` : '',
    ]
      .filter(Boolean)
      .join(' '),
    alternates: { canonical: `/${canonical}/surgery/${slug}` },
  };
}

export default async function SurgeryPage({ params }: Props) {
  const { city, slug } = await params;
  const info = await resolveCity(city);
  if (!info) notFound();
  const canonical = info.slug;
  if (canonical !== city) permanentRedirect(`/${canonical}/surgery/${slug}`);
  const data = await load(slug, canonical);
  if (!data) notFound();
  const { surgery, hospitals, surgeons, related, otherCities, specialty, template } = data;
  const cityName = info.name;
  const copy = template
    ? surgeryPageCopy(
        surgery,
        { slug: canonical, name: cityName },
        specialty?.plural ?? 'Surgeons',
        template,
      )
    : null;
  // One FAQ list (its structured data is exactly what's shown): the template's five, then the page's
  // others that they don't already answer (insurance, how to book).
  const faqs = copy
    ? [
        ...copy.faqs,
        ...data.faqs.filter(
          (f) => !/^What is the cost|^How long is the hospital stay/i.test(f.question),
        ),
      ]
    : data.faqs;

  // Procedures added from the cost sheet carry fewer details: leave out whatever isn't known.
  const facts = (
    [
      surgery.cost[1] > 0
        ? ['payments', 'Estimated cost', `${rupees(surgery.cost[0])} – ${rupees(surgery.cost[1])}`]
        : null,
      surgery.stay ? ['bed', 'Hospital stay', surgery.stay] : null,
      surgery.durationMinutes[1] > 0
        ? [
            'timer',
            'Procedure time',
            `${surgery.durationMinutes[0]}–${surgery.durationMinutes[1]} min`,
          ]
        : null,
      surgery.recovery ? ['healing', 'Recovery', surgery.recovery] : null,
    ] as ([string, string, string] | null)[]
  ).filter((f): f is [string, string, string] => f !== null);

  return (
    <>
      <Header />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: surgery.name,
          description: surgery.description,
          procedureType: 'https://schema.org/SurgicalProcedure',
          ...(surgery.techniques.length ? { howPerformed: surgery.techniques.join(', ') } : {}),
          ...(surgery.recovery ? { followup: surgery.recovery } : {}),
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            lowPrice: surgery.cost[0],
            highPrice: surgery.cost[1],
          },
        }}
      />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1.5 text-caption font-caption text-on-surface-variant"
          >
            <Link className="hover:text-primary-container" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary-container" href={`/${canonical}/surgeries`}>
              Surgeries in {cityName}
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-caption-strong">{surgery.name}</span>
          </nav>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
            <div className="space-y-8 min-w-0">
              <div className="space-y-3">
                <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">
                  {surgery.category}
                  {specialty ? ` · ${specialty.name}` : ''}
                </span>
                <h1 className="text-headline-h1 font-headline-h1 text-on-surface">
                  {copy ? copy.h1 : `${surgery.name} in ${cityName}`}
                </h1>
                {copy?.intro && (
                  <p className="text-body-default font-body-default text-on-surface">
                    {copy.intro}
                  </p>
                )}
                <p className="text-body-default font-body-default text-on-surface-variant">
                  {surgery.description}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {facts.map(([icon, label, value]) => (
                    <div
                      key={label}
                      className="p-3 rounded-xl border border-surface-variant bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary-container">
                        {icon}
                      </span>
                      <p className="font-caption-strong text-caption-strong text-on-surface mt-1">
                        {value}
                      </p>
                      <p className="font-micro text-micro text-on-surface-variant">{label}</p>
                    </div>
                  ))}
                </div>
                {surgery.insurance && (
                  <p className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] font-caption text-caption text-[#047857]">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    Usually covered by health insurance when medically necessary
                  </p>
                )}
              </div>
              {(surgery.treats.length > 0 || surgery.techniques.length > 0) && (
                <section className="grid sm:grid-cols-2 gap-6">
                  {surgery.treats.length > 0 && (
                    <div>
                      <h2 className="text-headline-h3 font-headline-h3 text-on-surface mb-2">
                        Who Needs It
                      </h2>
                      <ul className="space-y-1.5 text-caption font-caption text-on-surface">
                        {surgery.treats.map((t) => (
                          <li key={t} className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0"></span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {surgery.techniques.length > 0 && (
                    <div>
                      <h2 className="text-headline-h3 font-headline-h3 text-on-surface mb-2">
                        Techniques
                      </h2>
                      <ul className="space-y-1.5 text-caption font-caption text-on-surface">
                        {surgery.techniques.map((t) => (
                          <li key={t} className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0"></span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}
              {(surgery.steps.length > 0 || surgery.anaesthesia) && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
                    How the Procedure Works
                  </h2>
                  <ol className="space-y-3">
                    {surgery.steps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-caption-strong shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-body-default font-body-default text-on-surface pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                  {surgery.anaesthesia && (
                    <p className="text-caption font-caption text-on-surface-variant">
                      Anaesthesia: {surgery.anaesthesia}.
                    </p>
                  )}
                </section>
              )}
              {(surgery.benefits.length > 0 || surgery.risks.length > 0) && (
                <section className="grid sm:grid-cols-2 gap-6">
                  {surgery.benefits.length > 0 && (
                    <div className="p-4 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5]">
                      <h2 className="text-headline-h3 font-headline-h3 text-[#047857] mb-2">
                        Benefits
                      </h2>
                      <ul className="space-y-1.5 text-caption font-caption text-on-surface">
                        {surgery.benefits.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="material-symbols-outlined text-[16px] text-[#047857]">
                              check
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {surgery.risks.length > 0 && (
                    <div className="p-4 rounded-xl border border-surface-variant bg-surface-container-low">
                      <h2 className="text-headline-h3 font-headline-h3 text-on-surface mb-2">
                        Possible Risks
                      </h2>
                      <ul className="space-y-1.5 text-caption font-caption text-on-surface">
                        {surgery.risks.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                              info
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}
              {copy?.tables.surgeons && <SurgeryTable table={copy.tables.surgeons} />}
              {copy?.tables.areas && <SurgeryTable table={copy.tables.areas} />}
              {copy?.tables.hospitals && <SurgeryTable table={copy.tables.hospitals} />}
              {!copy?.tables.hospitals && hospitals.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
                    Hospitals for {surgery.name} in {cityName}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {hospitals.map((h) => (
                      <Link
                        key={h.slug}
                        href={`/clinic/${h.slug}`}
                        className="p-4 rounded-xl border border-surface-variant hover:border-outline transition space-y-1"
                      >
                        <h3 className="font-body-strong text-body-strong text-on-surface">
                          {h.name}
                        </h3>
                        <p className="font-caption text-caption text-on-surface-variant">
                          {h.category} · {h.area}
                        </p>
                        <p className="font-micro text-micro text-on-surface-variant flex flex-wrap gap-x-3">
                          {hasReviews(h) && <span className="text-tertiary">★ {h.rating}</span>}
                          {h.nabh && <span>NABH accredited</span>}
                          {h.beds > 0 && <span>{h.beds} beds</span>}
                          {h.insurers.length > 0 && (
                            <span>Cashless: {h.insurers.slice(0, 2).join(', ')}</span>
                          )}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
              {surgeons.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
                    Experienced {specialty?.plural ?? 'Surgeons'} in {cityName}
                  </h2>
                  <div className="space-y-4">
                    {uniqueDoctors(surgeons).map((d) => (
                      <DoctorCard key={d.slug} doctor={d} />
                    ))}
                  </div>
                </section>
              )}
              {copy?.tables.cities && <SurgeryTable table={copy.tables.cities} />}
              {copy?.cost && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
                    {copy.cost.heading}
                  </h2>
                  <p className="text-body-default font-body-default text-on-surface">
                    {copy.cost.intro}
                  </p>
                  <ul className="space-y-1.5 text-body-default font-body-default text-on-surface">
                    {copy.cost.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2.5 shrink-0"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <FaqAccordion faqs={faqs} heading={`${surgery.name}: Frequently Asked Questions`} />
              {copy && (copy.links.nearby.length > 0 || copy.links.related.length > 0) && (
                <section className="space-y-4">
                  {copy.links.nearby.length > 0 && (
                    <div className="space-y-2">
                      <h2 className="text-headline-h3 font-headline-h3 text-on-surface">
                        {copy.links.nearbyHeading}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {copy.links.nearby.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="px-3 py-1.5 rounded-full border border-surface-variant text-caption font-caption text-on-surface-variant hover:border-outline"
                          >
                            {l.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {copy.links.related.length > 0 && (
                    <div className="space-y-2">
                      <h2 className="text-headline-h3 font-headline-h3 text-on-surface">
                        {copy.links.relatedHeading}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {copy.links.related.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="px-3 py-1.5 rounded-full border border-surface-variant text-caption font-caption text-on-surface-variant hover:border-outline"
                          >
                            {l.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
              {!copy && related.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
                    Related Procedures
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/${canonical}/surgery/${r.slug}`}
                        className="px-3 py-1.5 rounded-full border border-surface-variant text-caption font-caption text-on-surface-variant hover:border-outline"
                      >
                        {r.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
              <section className="space-y-3">
                <h2 className="text-headline-h3 font-headline-h3 text-on-surface">
                  {surgery.name} in Other Cities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}/surgery/${surgery.slug}`}
                      className="text-on-surface-variant hover:text-primary-container"
                    >
                      {surgery.name} in {c.name}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
            <div className="lg:sticky lg:top-24 space-y-3">
              <SurgeryLeadForm
                surgery={{ slug: surgery.slug, name: surgery.name }}
                city={canonical}
                cityName={cityName}
              />
              <p className="px-1 font-micro text-micro text-on-surface-variant">
                Costs are estimated package ranges in {cityName} and vary with hospital, room type
                and technique. Your coordinator shares an itemised estimate.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
