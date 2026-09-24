import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FaqAccordion from '@/components/seo/FaqAccordion';
import { api, type Specialty } from '@/lib/api';
import { liveCatalogue, resolveCity } from '@/lib/catalogue-live';
import { specialtyCountLabel } from '@/lib/specialties';

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = await resolveCity((await params).city);
  if (!info) return {};
  const { slug: canonical, name } = info;
  const { specialties: SPECIALTIES } = await liveCatalogue();
  return {
    title: { absolute: `All ${specialtyCountLabel(SPECIALTIES.length)} Specialties in ${name} — Book a Verified Doctor | Curxx` },
    description: `Browse all ${SPECIALTIES.length} clinical specialties on Curxx — from general physicians and dermatologists to oncologists, physiotherapists and AYUSH doctors — and book a verified doctor in ${name} online or in-clinic.`,
    alternates: { canonical: `/${canonical}/specialties` },
  };
}

async function loadCounts(city: string): Promise<Map<string, Specialty>> {
  try {
    const { specialties } = await api.specialties(undefined, city);
    return new Map(specialties.map((s) => [s.slug, s]));
  } catch {
    return new Map();
  }
}

export default async function SpecialtiesPage({ params }: Props) {
  const { city } = await params;
  const info = await resolveCity(city);
  if (!info) notFound();
  const canonical = info.slug;
  if (canonical !== city) permanentRedirect(`/${canonical}/specialties`);

  const cityName = info.name;
  const { specialties: SPECIALTIES, specialtyCategories: SPECIALTY_CATEGORIES } = await liveCatalogue();
  const SPECIALTY_COUNT_LABEL = specialtyCountLabel(SPECIALTIES.length);
  const counts = await loadCounts(canonical);
  const doctorTotal = [...counts.values()].reduce((n, s) => n + (s.doctorCount ?? 0), 0);
  const groups = SPECIALTY_CATEGORIES.map((category) => ({ category, items: SPECIALTIES.filter((s) => s.category === category) })).filter((g) => g.items.length);

  const faqs = [
    { question: `How many specialties can I book on Curxx in ${cityName}?`, answer: `Curxx lists ${SPECIALTIES.length} clinical specialties in ${cityName}${doctorTotal ? `, with ${doctorTotal.toLocaleString('en-IN')} verified doctors` : ''} — covering primary care, surgery, women and child health, mental health, dental, eye and ENT care, therapy, nutrition and AYUSH.` },
    { question: 'I am not sure which specialist I need. What should I do?', answer: 'Start with a General Physician, or use the free symptom checker — describe what you feel and it suggests the right specialist.' },
    { question: 'Can I consult these specialists online?', answer: 'Most specialties offer secure video consultations. A few, such as veterinarians and radiologists, see patients in person only; their pages show clinic visits.' },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>{cityName}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-caption-strong">Specialties</span>
          </nav>
          <div>
            <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Clinical Specialties</span>
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">All {SPECIALTY_COUNT_LABEL} Specialties in {cityName}</h1>
            <p className="text-body-default font-body-default text-on-surface-variant mt-1">
              Verified doctors across {SPECIALTIES.length} clinical disciplines{doctorTotal ? ` — ${doctorTotal.toLocaleString('en-IN')} in ${cityName}` : ''}, for video consults and clinic visits.
            </p>
            <nav aria-label="Jump to a category" className="flex flex-wrap gap-2 pt-4">
              {groups.map((g) => (
                <a key={g.category} href={`#${g.category.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="px-3 py-1.5 rounded-full border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:border-outline">
                  {g.category}
                </a>
              ))}
            </nav>
          </div>
          {groups.map((g) => (
            <section key={g.category} id={g.category.toLowerCase().replace(/[^a-z]+/g, '-')} className="space-y-4 scroll-mt-20">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">{g.category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {g.items.map((s) => {
                  const live = counts.get(s.slug);
                  return (
                    <Link key={s.slug} href={`/${canonical}/${s.slug}`} className="p-4 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline text-center flex flex-col items-center justify-center transition cursor-pointer">
                      <span className="material-symbols-outlined text-outline text-[28px] mb-2">{s.icon}</span>
                      <h3 className="text-caption-strong font-caption-strong text-on-surface">{s.name}</h3>
                      <div className="text-micro font-micro text-on-surface-variant mt-1">From ₹{live?.fromPrice ?? s.fromPrice}</div>
                      {live?.doctorCount ? <div className="text-micro font-micro text-[#047857] mt-0.5">{live.doctorCount} doctors</div> : null}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
          <Link href={`/${canonical}/doctors`} className="inline-flex items-center space-x-1 text-caption-strong font-caption-strong text-primary-container hover:underline">
            <span>Browse all doctors in {cityName}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <FaqAccordion faqs={faqs} heading={`Specialties in ${cityName}: Frequently Asked Questions`} className="max-w-[900px]" />
        </div>
      </main>
      <Footer />
    </>
  );
}
