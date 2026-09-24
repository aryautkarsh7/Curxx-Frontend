import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ConsultSteps from '@/components/ConsultSteps';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { api, type Doctor, type Specialty } from '@/lib/api';

type Props = { params: Promise<{ specialty: string }> };

async function loadSpecialty(slug: string): Promise<Specialty | null> {
  try {
    const { specialties } = await api.specialties('video', 'all');
    return specialties.find((s) => s.slug === slug) ?? null;
  } catch {
    return null;
  }
}

/** Every video-available doctor in the specialty, used to count doctors per focus area. */
async function loadDoctors(slug: string): Promise<Doctor[]> {
  try {
    const { doctors } = await api.doctors({ city: 'all', specialty: slug, mode: 'video', limit: 50 });
    return doctors;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty: slug } = await params;
  const specialty = await loadSpecialty(slug);
  if (!specialty) return {};
  return {
    title: `Video Consult a ${specialty.name} — Choose Your Concern | Curxx`,
    description: `Tell us what you need help with and we will show ${specialty.plural.toLowerCase()} available on video right now.`,
    alternates: { canonical: `/consult/video/${slug}` },
  };
}

export default async function ConsultFocusPage({ params }: Props) {
  const { specialty: slug } = await params;
  const [specialty, doctors] = await Promise.all([loadSpecialty(slug), loadDoctors(slug)]);
  if (!specialty) notFound();

  const counts = doctors.reduce<Record<string, number>>((acc, doctor) => {
    for (const focus of doctor.focusAreas ?? []) acc[focus] = (acc[focus] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Header />
      <ConsultSteps current={2} backTo={{ 1: '/consult/video' }} />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary-container" href="/consult/video">Video consult</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-caption-strong">{specialty.name}</span>
          </nav>

          <div className="space-y-2">
            <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Step 2 of 4</span>
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface">What do you need help with?</h1>
            <p className="text-body-default font-body-default text-on-surface-variant max-w-2xl">
              Choose the area closest to your concern and we will only show {specialty.plural.toLowerCase()} who treat it on video.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialty.subSpecialties.map((sub) => {
              const available = counts[sub.slug] ?? 0;
              return (
                <Link
                  key={sub.slug}
                  href={`/consult/video/${specialty.slug}/${sub.slug}`}
                  className="p-5 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline transition group space-y-2.5"
                >
                  <span className="w-10 h-10 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-[22px]">{sub.icon}</span>
                  </span>
                  <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{sub.name}</h2>
                  <p className="text-caption font-caption text-on-surface-variant">{sub.description}</p>
                  <span className={available > 0 ? 'inline-flex items-center gap-1.5 text-caption-strong font-caption-strong text-[#047857]' : 'inline-flex items-center gap-1.5 text-caption font-caption text-on-surface-variant'}>
                    {available > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />}
                    {available > 0 ? `${available} ${available === 1 ? 'doctor' : 'doctors'} on video` : 'By appointment'}
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href={`/consult/video/${specialty.slug}/all`}
            className="p-5 rounded-xl border border-surface-variant bg-surface-container-low hover:border-outline transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-surface-variant flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">help</span>
              </span>
              <div>
                <h2 className="text-caption-strong font-caption-strong text-on-surface">Not sure — show me every {specialty.name.toLowerCase()}</h2>
                <p className="text-caption font-caption text-on-surface-variant">
                  {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} available on video, no focus filter applied.
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-outline">arrow_forward</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
