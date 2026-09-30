import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage, { EmptyLandingPage, LinkGrid } from '@/components/seo/SeoLandingPage';
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
  const sp = data?.stats.scope.specialty;
  if (data && !data.stats.total && sp) {
    // Nobody listed anywhere yet: a clean empty page, kept out of the index.
    return { title: { absolute: `${sp.plural} in India | Curxx` }, description: `No ${sp.plural.toLowerCase()} are listed on Curxx yet.`, alternates: { canonical: `/india/${sp.slug}` }, robots: { index: false, follow: true } };
  }
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
  const empty = data?.stats.scope.specialty && !data.stats.total ? data.stats.scope.specialty : null;
  if (empty) {
    return (
      <EmptyLandingPage
        heading={`${empty.plural} in India`}
        message={`No ${empty.plural.toLowerCase()} listed here yet`}
        action={{ href: '/india/doctors', label: 'See all doctors in India' }}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'India', href: '/india/doctors' }, { label: empty.plural }]}
      />
    );
  }
  if (!data?.page) notFound();
  const { page, stats } = data;
  const sp = stats.scope.specialty!;
  return (
    <SeoLandingPage page={page} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'India', href: '/india/doctors' }, { label: sp.plural }]}>
      <LinkGrid heading={`Find ${sp.plural} in Your City`} links={stats.cities.map((c) => ({ text: `${sp.plural} in ${c.name}`, href: `/${c.slug}/${sp.slug}` }))} />
      <LinkGrid heading="Doctors across India" links={[{ text: 'All doctors in India', href: '/india/doctors' }]} />
    </SeoLandingPage>
  );
}
