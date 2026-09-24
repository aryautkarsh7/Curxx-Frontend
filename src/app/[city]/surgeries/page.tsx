import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FaqAccordion from '@/components/seo/FaqAccordion';
import SurgeryLeadForm from '@/components/surgery/SurgeryLeadForm';
import { api, rupees, type SurgerySummary } from '@/lib/api';
import { liveCatalogue, resolveCity } from '@/lib/catalogue-live';

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = await resolveCity((await params).city);
  if (!info) return {};
  const { slug: canonical, name } = info;
  const { surgeries: SURGERY_LIST } = await liveCatalogue();
  return {
    title: { absolute: `Surgery in ${name} — Costs, Top Hospitals & Free Consultation | Curxx` },
    description: `Compare ${SURGERY_LIST.length} common surgeries in ${name} — laser piles, cataract, hernia, knee replacement, LASIK and more. See cost ranges, recovery time and partner hospitals, and book a free surgeon consultation.`,
    alternates: { canonical: `/${canonical}/surgeries` },
  };
}

async function load(city: string): Promise<SurgerySummary[]> {
  try {
    return (await api.surgeries(city)).surgeries;
  } catch {
    return [];
  }
}

export default async function SurgeriesPage({ params }: Props) {
  const { city } = await params;
  const info = await resolveCity(city);
  if (!info) notFound();
  const canonical = info.slug;
  if (canonical !== city) permanentRedirect(`/${canonical}/surgeries`);
  const cityName = info.name;
  const [surgeries, { surgeries: SURGERY_LIST, surgeryCategories: SURGERY_CATEGORIES }] = await Promise.all([load(canonical), liveCatalogue()]);
  const groups = SURGERY_CATEGORIES.map((category) => ({ category, items: surgeries.filter((s) => s.category === category) })).filter((g) => g.items.length);

  const faqs = [
    { question: `How does Curxx help with surgery in ${cityName}?`, answer: `Share your details and a Curxx care coordinator books a free consultation with an experienced surgeon at a partner hospital in ${cityName}, shares an itemised cost estimate, and handles insurance paperwork and admission.` },
    { question: 'Is surgery covered by health insurance?', answer: 'Most medically necessary procedures — piles, hernia, gallbladder, cataract, joint replacement and more — are covered. Cosmetic procedures usually are not. We help with cashless approval at partner hospitals.' },
    { question: 'Are there EMI options?', answer: 'Yes. Partner hospitals offer no-cost EMI on most planned procedures, subject to eligibility.' },
    { question: 'Why do surgery costs vary so much?', answer: 'The final bill depends on the hospital, the technique (laser, laparoscopic or open), the implant or lens used, the room category and the length of stay. The ranges on Curxx reflect typical packages in your city.' },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary-container" href={`/${canonical}/specialties`}>{cityName}</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-caption-strong">Surgeries</span>
          </nav>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
            <div className="space-y-3">
              <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Planned surgery, handled end to end</span>
              <h1 className="text-headline-h1 font-headline-h1 text-on-surface">Surgery in {cityName}: Costs, Hospitals &amp; Free Consultation</h1>
              <p className="text-body-default font-body-default text-on-surface-variant max-w-2xl">
                Choose from {surgeries.length || SURGERY_LIST.length} common procedures. See typical costs in {cityName}, hospital stay and recovery time, then book a free consultation with an experienced surgeon — we take care of the estimate, insurance and admission.
              </p>
              <nav aria-label="Categories" className="flex flex-wrap gap-2 pt-2">
                {groups.map((g) => (
                  <a key={g.category} href={`#${g.category.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="px-3 py-1.5 rounded-full border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:border-outline">{g.category}</a>
                ))}
              </nav>
            </div>
            <SurgeryLeadForm city={canonical} cityName={cityName} options={SURGERY_LIST.map((s) => ({ slug: s.slug, name: s.name }))} />
          </div>
          {groups.map((g) => (
            <section key={g.category} id={g.category.toLowerCase().replace(/[^a-z]+/g, '-')} className="space-y-4 scroll-mt-20">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">{g.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((s) => (
                  <Link key={s.slug} href={`/${canonical}/surgery/${s.slug}`} className="p-5 rounded-xl border border-surface-variant hover:border-outline transition flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-10 h-10 rounded-lg bg-[#FFF1F2] text-primary-container flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-[22px]">{s.icon}</span></span>
                      <div className="min-w-0">
                        <h3 className="text-headline-h3 font-headline-h3 text-on-surface">{s.name}</h3>
                        <p className="text-caption font-caption text-on-surface-variant line-clamp-2">{s.description}</p>
                      </div>
                    </div>
                    <div className="mt-auto grid grid-cols-2 gap-2 text-micro font-micro text-on-surface-variant border-t border-surface-variant pt-3">
                      <span><span className="block text-on-surface font-caption-strong text-caption-strong">{rupees(s.cost[0])} – {rupees(s.cost[1])}</span>Typical cost</span>
                      <span><span className="block text-on-surface font-caption-strong text-caption-strong">{s.stay}</span>Hospital stay</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          <FaqAccordion faqs={faqs} heading={`Surgery in ${cityName}: Frequently Asked Questions`} className="max-w-[900px]" />
        </div>
      </main>
      <Footer />
    </>
  );
}
