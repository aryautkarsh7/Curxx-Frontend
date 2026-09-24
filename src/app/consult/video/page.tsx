import type { Metadata } from 'next';
import Link from 'next/link';
import ConsultSteps from '@/components/ConsultSteps';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Instant Video Consultation — Choose a Specialty | Curxx',
  description: 'Start a video consultation with a verified doctor. Pick a specialty, narrow it to your concern, compare doctors available now and join the call.',
  alternates: { canonical: '/consult/video' },
};

async function loadSpecialties() {
  try {
    const { specialties } = await api.specialties('video', 'all');
    return specialties;
  } catch {
    return [];
  }
}

export default async function ConsultSpecialtyPage() {
  const specialties = await loadSpecialties();
  const liveNow = specialties.filter((s) => (s.availableDoctors ?? 0) > 0);
  const byAppointment = specialties.filter((s) => (s.availableDoctors ?? 0) === 0);
  const doctorsOnline = liveNow.reduce((sum, s) => sum + (s.availableDoctors ?? 0), 0);

  return (
    <>
      <Header />
      <ConsultSteps current={1} />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-surface-variant text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              {doctorsOnline} doctors available on video this week
            </span>
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface">Which specialty do you need?</h1>
            <p className="text-body-default font-body-default text-on-surface-variant max-w-2xl">
              Pick a specialty to start. Next you will narrow it to your specific concern, then choose a doctor and join the video call.
            </p>
          </div>

          {specialties.length === 0 ? (
            <div className="p-8 rounded-xl border border-surface-variant bg-surface-container-low text-center space-y-3">
              <p className="text-body-default font-body-default text-on-surface">We could not load the specialty list just now.</p>
              <Link href="/doctors" className="inline-flex items-center gap-1.5 h-11 px-5 rounded-lg bg-primary-container hover:bg-primary text-white font-caption-strong text-caption-strong transition">
                Browse all verified doctors
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveNow.map((specialty) => (
                <Link
                  key={specialty.slug}
                  href={`/consult/video/${specialty.slug}`}
                  className="p-5 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline transition group flex items-start gap-4"
                >
                  <span className="w-12 h-12 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">{specialty.icon}</span>
                  </span>
                  <div className="min-w-0 space-y-1">
                    <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{specialty.name}</h2>
                    <p className="text-caption font-caption text-on-surface-variant">
                      Video consult from ₹{specialty.fromPrice} · {specialty.subSpecialties.length} focus areas
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-caption-strong font-caption-strong text-[#047857]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />
                      {specialty.availableDoctors} {specialty.availableDoctors === 1 ? 'doctor' : 'doctors'} available
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-outline ml-auto group-hover:text-primary-container transition-colors">chevron_right</span>
                </Link>
              ))}
            </div>
          )}

          {byAppointment.length > 0 && (
            <div className="pt-6 border-t border-surface-variant space-y-3">
              <h2 className="text-headline-h3 font-headline-h3 text-on-surface">No one on video right now in these specialties</h2>
              <p className="text-caption font-caption text-on-surface-variant">You can still book a scheduled consultation or a clinic visit.</p>
              <div className="flex flex-wrap gap-2">
                {byAppointment.map((specialty) => (
                  <Link
                    key={specialty.slug}
                    href={`/consult/video/${specialty.slug}`}
                    className="px-3 py-1.5 rounded-full border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:border-outline transition"
                  >
                    {specialty.plural}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="p-5 rounded-xl border border-surface-variant bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-surface-variant flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
              </span>
              <div>
                <h2 className="text-caption-strong font-caption-strong text-on-surface">Not sure which specialty fits?</h2>
                <p className="text-caption font-caption text-on-surface-variant">Describe your symptoms and our triage points you to the right department in 60 seconds.</p>
              </div>
            </div>
            <Link href="/triage" className="h-11 px-5 rounded-lg border border-primary-container text-primary-container hover:bg-surface-container-lowest font-caption-strong text-caption-strong flex items-center justify-center whitespace-nowrap transition">
              Start free AI triage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
