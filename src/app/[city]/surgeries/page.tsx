import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SeoBody, SeoIntro } from '@/components/seo/SeoContent';
import SurgeryLeadForm from '@/components/surgery/SurgeryLeadForm';
import { SurgeryCards, ProcedureDirectory } from '@/components/surgery/SurgeryCatalogue';
import { api, type SurgerySummary } from '@/lib/api';
import { liveCatalogue, resolveCity } from '@/lib/catalogue-live';
import { surgeriesPage } from '@/lib/seo-content';

type Props = { params: Promise<{ city: string }> };

/** Diksha's surgery template for this city, or null if the figures can't be loaded. */
async function template(city: string) {
  try {
    const stats = await api.seoSurgeries(city);
    const page = surgeriesPage(stats);
    return page ? { stats, page } : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = await resolveCity((await params).city);
  if (!info) return {};
  const data = await template(info.slug);
  if (!data) {
    return {
      title: { absolute: `Surgery in ${info.name}: Hospitals & Cost | Curxx` },
      alternates: { canonical: `/${info.slug}/surgeries` },
    };
  }
  const { page } = data;
  // Template index rule: a city needs 2+ hospitals and 3+ surgeons to be indexed; otherwise point at India.
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.index === false ? '/india/surgeries' : page.canonical },
    ...(page.index === false ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title: page.title, description: page.description, type: 'website', url: page.canonical },
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
  const [surgeries, { surgeries: SURGERY_LIST, surgeryCategories: SURGERY_CATEGORIES }, data] = await Promise.all([load(canonical), liveCatalogue(), template(canonical)]);
  const groups = SURGERY_CATEGORIES.map((category) => ({ category, items: surgeries.filter((s) => s.category === category) })).filter((g) => g.items.length);
  const page = data?.page;

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
            <div className="space-y-3 min-w-0">
              <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Planned surgery, handled end to end</span>
              <h1 className="text-headline-h1 font-headline-h1 text-on-surface">{page?.h1 ?? `Surgery in ${cityName}: Hospitals, Costs & Free Consultation`}</h1>
              {page && <p className="text-caption font-caption text-on-surface-variant">{page.subline}</p>}
              {page ? (
                <SeoIntro page={page} className="pt-2" />
              ) : (
                <p className="text-body-default font-body-default text-on-surface-variant max-w-2xl">
                  Choose from {surgeries.length || SURGERY_LIST.length} common procedures. See estimated costs in {cityName}, hospital stay and recovery time, then book a free consultation with an experienced surgeon.
                </p>
              )}
              <nav aria-label="Categories" className="flex flex-wrap gap-2 pt-2">
                {groups.map((g) => (
                  <a key={g.category} href={`#${g.category.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="px-3 py-1.5 rounded-full border border-surface-variant bg-surface-container-low text-caption font-caption text-on-surface-variant hover:border-outline">{g.category}</a>
                ))}
              </nav>
            </div>
            <SurgeryLeadForm city={canonical} cityName={cityName} options={SURGERY_LIST.map((s) => ({ slug: s.slug, name: s.name }))} />
          </div>
          <SurgeryCards groups={groups} city={canonical} />
          {data && <ProcedureDirectory groups={data.stats.directory} />}
          {page && <SeoBody page={page} className="max-w-[1200px]" />}
        </div>
      </main>
      <Footer />
    </>
  );
}
