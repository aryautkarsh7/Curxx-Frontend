import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage, { LinkGrid } from '@/components/seo/SeoLandingPage';
import { api } from '@/lib/api';
import { resolveSpecialty } from '@/lib/catalogue-live';
import { indiaSpecialtyPage } from '@/lib/seo-content';

type Props = { params: Promise<{ specialty: string }> };

/** /india/{specialty}: one specialty across every city (Diksha's India template, page B). */
async function load(slug: string) {
  if (!(await resolveSpecialty(slug))) return null;
  try {
    const stats = await api.seoDoctors('india', slug);
    return { stats, page: indiaSpecialtyPage(stats) };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).specialty);
  if (!data?.page) return {};
  const { page } = data;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.canonical },
    openGraph: { title: page.title, description: page.description, type: 'website', url: page.canonical },
  };
}

export default async function IndiaSpecialtyPage({ params }: Props) {
  const data = await load((await params).specialty);
  if (!data?.page) notFound();
  const { page, stats } = data;
  const sp = stats.scope.specialty!;
  return (
    <SeoLandingPage page={page} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'India', href: '/india/doctors' }, { label: sp.plural }]}>
      <LinkGrid heading={`${sp.plural} by City`} links={stats.cities.map((c) => ({ text: `${sp.plural} in ${c.name}`, href: `/${c.slug}/${sp.slug}` }))} />
      <LinkGrid heading="Doctors across India" links={[{ text: 'All doctors in India', href: '/india/doctors' }]} />
    </SeoLandingPage>
  );
}
