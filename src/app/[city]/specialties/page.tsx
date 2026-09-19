import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { canonicalCity } from '@/lib/cities';
import { SPECIALTIES } from '@/lib/specialties';

export const metadata: Metadata = { title: 'All Specialties in Bangalore | Curxx' };

export default async function SpecialtiesPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/specialties`);

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-caption-strong">Specialties</span>
          </nav>
          <div>
            <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Clinical Specialties</span>
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">All Specialties in Bangalore</h1>
            <p className="text-body-default font-body-default text-on-surface-variant mt-1">Verified doctors across {SPECIALTIES.length} clinical disciplines, for video consults and clinic visits.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPECIALTIES.map((s) => (
              <Link key={s.slug} href={`/${canonical}/${s.slug}`} className="p-4 rounded-xl border border-surface-variant bg-surface-container-lowest hover:border-outline text-center flex flex-col items-center justify-center transition cursor-pointer">
                <span className="material-symbols-outlined text-outline text-[28px] mb-2">{s.icon}</span>
                <div className="text-caption-strong font-caption-strong text-on-surface">{s.name}</div>
                <div className="text-micro font-micro text-on-surface-variant mt-1">From ₹{s.fromPrice}</div>
              </Link>
            ))}
          </div>
          <Link href={`/${canonical}/doctors`} className="inline-flex items-center space-x-1 text-caption-strong font-caption-strong text-primary-container hover:underline">
            <span>Browse all doctors in Bangalore</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
