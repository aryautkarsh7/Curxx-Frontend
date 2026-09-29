import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { ProcedureDirectory } from '@/components/surgery/SurgeryCatalogue';
import { api } from '@/lib/api';
import { surgeriesPage } from '@/lib/seo-content';

/** /india/surgeries: hospitals and surgeons by city, and the procedure catalogue (surgery template, India). */
async function load() {
  try {
    const stats = await api.seoSurgeries('india');
    const page = surgeriesPage(stats);
    return page ? { stats, page } : null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = (await load())?.page;
  if (!page) return { title: { absolute: 'Surgery in India: Hospitals & Cost | Curxx' }, alternates: { canonical: '/india/surgeries' } };
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.canonical },
    openGraph: { title: page.title, description: page.description, type: 'website', url: page.canonical },
  };
}

export default async function IndiaSurgeriesPage() {
  const data = await load();
  if (!data) notFound();
  return (
    <SeoLandingPage page={data.page} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'India' }, { label: 'Surgeries' }]}>
      <ProcedureDirectory groups={data.stats.directory} />
    </SeoLandingPage>
  );
}
