import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage, { LinkGrid } from '@/components/seo/SeoLandingPage';
import { api } from '@/lib/api';
import { indiaDoctorsPage } from '@/lib/seo-content';

/** /india/doctors: every doctor on Curxx, by city and specialty (Diksha's India template, page A). */
async function load() {
  try {
    const stats = await api.seoDoctors('india');
    const page = indiaDoctorsPage(stats);
    return page ? { stats, page } : null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = (await load())?.page;
  if (!page) return { title: { absolute: 'Doctors in India – Book Online | Curxx' }, alternates: { canonical: '/india/doctors' } };
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.canonical },
    openGraph: { title: page.title, description: page.description, type: 'website', url: page.canonical },
  };
}

export default async function IndiaDoctorsPage() {
  const data = await load();
  if (!data) notFound();
  const { page, stats } = data;
  return (
    <SeoLandingPage page={page} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'India' }, { label: 'Doctors' }]}>
      <LinkGrid heading="All Specialties in India" links={stats.specialties.map((s) => ({ text: `${s.plural} in India`, href: `/india/${s.slug}` }))} />
      <LinkGrid heading="Doctors by City" links={stats.cities.map((c) => ({ text: `Doctors in ${c.name}`, href: `/${c.slug}/doctors` }))} />
    </SeoLandingPage>
  );
}
