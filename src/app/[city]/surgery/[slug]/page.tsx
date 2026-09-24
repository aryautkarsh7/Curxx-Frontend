import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FaqAccordion from '@/components/seo/FaqAccordion';
import SurgeryLeadForm from '@/components/surgery/SurgeryLeadForm';
import { ApiError, api, photo, rupees } from '@/lib/api';
import { canonicalCity, getCity } from '@/lib/cities';
import { JsonLd } from '@/lib/seo';

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
  const canonical = canonicalCity(city);
  if (!canonical) return {};
  const data = await load(slug, canonical);
  if (!data) return {};
  const { surgery } = data;
  const name = getCity(canonical)!.name;
  return {
    title: { absolute: `${surgery.name} in ${name} — Cost ${rupees(surgery.cost[0])}–${rupees(surgery.cost[1])}, Top Hospitals | Curxx` },
    description: `${surgery.description} Typical cost in ${name}: ${rupees(surgery.cost[0])} to ${rupees(surgery.cost[1])}. ${surgery.stay} stay, ${surgery.recovery} recovery. Book a free surgeon consultation.`,
    alternates: { canonical: `/${canonical}/surgery/${slug}` },
  };
}

export default async function SurgeryPage({ params }: Props) {
  const { city, slug } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/surgery/${slug}`);
  const data = await load(slug, canonical);
  if (!data) notFound();
  const { surgery, hospitals, surgeons, related, otherCities, faqs, specialty } = data;
  const cityName = getCity(canonical)!.name;

  const facts: [string, string, string][] = [
    ['payments', 'Typical cost', `${rupees(surgery.cost[0])} – ${rupees(surgery.cost[1])}`],
    ['bed', 'Hospital stay', surgery.stay],
    ['timer', 'Procedure time', `${surgery.durationMinutes[0]}–${surgery.durationMinutes[1]} min`],
    ['healing', 'Recovery', surgery.recovery],
  ];

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
          howPerformed: surgery.techniques.join(', '),
          followup: surgery.recovery,
          offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: surgery.cost[0], highPrice: surgery.cost[1] },
        }}
      />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-10">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary-container" href={`/${canonical}/surgeries`}>Surgeries in {cityName}</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-caption-strong">{surgery.name}</span>
          </nav>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
            <div className="space-y-8 min-w-0">
              <div className="space-y-3">
                <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">{surgery.category}{specialty ? ` · ${specialty.name}` : ''}</span>
                <h1 className="text-headline-h1 font-headline-h1 text-on-surface">{surgery.name} in {cityName}</h1>
                <p className="text-body-default font-body-default text-on-surface-variant">{surgery.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {facts.map(([icon, label, value]) => (
                    <div key={label} className="p-3 rounded-xl border border-surface-variant bg-surface-container-low">
                      <span className="material-symbols-outlined text-[20px] text-primary-container">{icon}</span>
                      <p className="font-caption-strong text-caption-strong text-on-surface mt-1">{value}</p>
                      <p className="font-micro text-micro text-on-surface-variant">{label}</p>
                    </div>
                  ))}
                </div>
                {surgery.insurance && (
                  <p className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] font-caption text-caption text-[#047857]">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>Usually covered by health insurance · cashless at partner hospitals
                  </p>
                )}
              </div>
              <section className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-headline-h3 font-headline-h3 text-on-surface mb-2">Who Needs It</h2>
                  <ul className="space-y-1.5 text-caption font-caption text-on-surface">{surgery.treats.map((t) => <li key={t} className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0"></span>{t}</li>)}</ul>
                </div>
                <div>
                  <h2 className="text-headline-h3 font-headline-h3 text-on-surface mb-2">Techniques</h2>
                  <ul className="space-y-1.5 text-caption font-caption text-on-surface">{surgery.techniques.map((t) => <li key={t} className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0"></span>{t}</li>)}</ul>
                </div>
              </section>
              <section className="space-y-3">
                <h2 className="text-headline-h2 font-headline-h2 text-on-surface">How the Procedure Works</h2>
                <ol className="space-y-3">
                  {surgery.steps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-caption-strong shrink-0">{i + 1}</span>
                      <span className="text-body-default font-body-default text-on-surface pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-caption font-caption text-on-surface-variant">Anaesthesia: {surgery.anaesthesia}.</p>
              </section>
              <section className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5]">
                  <h2 className="text-headline-h3 font-headline-h3 text-[#047857] mb-2">Benefits</h2>
                  <ul className="space-y-1.5 text-caption font-caption text-on-surface">{surgery.benefits.map((b) => <li key={b} className="flex gap-2"><span className="material-symbols-outlined text-[16px] text-[#047857]">check</span>{b}</li>)}</ul>
                </div>
                <div className="p-4 rounded-xl border border-surface-variant bg-surface-container-low">
                  <h2 className="text-headline-h3 font-headline-h3 text-on-surface mb-2">Possible Risks</h2>
                  <ul className="space-y-1.5 text-caption font-caption text-on-surface">{surgery.risks.map((r) => <li key={r} className="flex gap-2"><span className="material-symbols-outlined text-[16px] text-on-surface-variant">info</span>{r}</li>)}</ul>
                </div>
              </section>
              {hospitals.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Hospitals for {surgery.name} in {cityName}</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {hospitals.map((h) => (
                      <Link key={h.slug} href={`/clinic/${h.slug}`} className="p-4 rounded-xl border border-surface-variant hover:border-outline transition space-y-1">
                        <h3 className="font-body-strong text-body-strong text-on-surface">{h.name}</h3>
                        <p className="font-caption text-caption text-on-surface-variant">{h.category} · {h.area}</p>
                        <p className="font-micro text-micro text-on-surface-variant flex flex-wrap gap-x-3">
                          <span className="text-tertiary">★ {h.rating}</span>
                          {h.nabh && <span>NABH accredited</span>}
                          {h.beds > 0 && <span>{h.beds} beds</span>}
                          {h.insurers.length > 0 && <span>Cashless: {h.insurers.slice(0, 2).join(', ')}</span>}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
              {surgeons.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Experienced {specialty?.plural ?? 'Surgeons'} in {cityName}</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {surgeons.map((d) => (
                      <Link key={d.slug} href={`/doctor/${d.slug}`} className="p-4 rounded-xl border border-surface-variant hover:border-outline transition flex items-center gap-3">
                        {d.photoUrl && <img src={photo(d.photoUrl, 112)} alt="" loading="lazy" className="w-14 h-14 rounded-full object-cover" />}
                        <span className="min-w-0">
                          <h3 className="font-body-strong text-body-strong text-on-surface truncate">{d.name}</h3>
                          <span className="block font-caption text-caption text-on-surface-variant truncate">{d.title} · {d.experienceYears} yrs</span>
                          <span className="block font-micro text-micro text-on-surface-variant truncate">{d.clinicName}, {d.area} · ★ {d.rating}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
              <FaqAccordion faqs={faqs} heading={`${surgery.name}: Frequently Asked Questions`} />
              {related.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Related Procedures</h2>
                  <div className="flex flex-wrap gap-2">
                    {related.map((r) => <Link key={r.slug} href={`/${canonical}/surgery/${r.slug}`} className="px-3 py-1.5 rounded-full border border-surface-variant text-caption font-caption text-on-surface-variant hover:border-outline">{r.name}</Link>)}
                  </div>
                </section>
              )}
              <section className="space-y-3">
                <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{surgery.name} in Other Cities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
                  {otherCities.map((c) => <Link key={c.slug} href={`/${c.slug}/surgery/${surgery.slug}`} className="text-on-surface-variant hover:text-primary-container">{surgery.name} in {c.name}</Link>)}
                </div>
              </section>
            </div>
            <div className="lg:sticky lg:top-24 space-y-3">
              <SurgeryLeadForm surgery={{ slug: surgery.slug, name: surgery.name }} city={canonical} cityName={cityName} />
              <p className="px-1 font-micro text-micro text-on-surface-variant">Costs are typical package ranges in {cityName} and vary with hospital, room type and technique. Your coordinator shares an itemised estimate.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
