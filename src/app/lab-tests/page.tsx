import type { Metadata } from 'next';
import { api, type LabQuery } from '@/lib/api';
import { countLabel, image, items, loadSite } from '@/lib/site';
import LabTestsHome from './LabTestsHome';

export async function generateMetadata(): Promise<Metadata> {
  const stats = await api.siteStats().then((r) => r.stats).catch(() => null);
  const tests = countLabel(stats?.labTests);
  return {
    title: `Lab Tests at Home, Most Reports in 6 Hours | ${tests ? `${tests} ` : ''}Tests & Scans | Curxx`,
    description: `Book NABL-accredited lab tests and full body checkups with free home sample collection${stats ? ` in ${stats.cities} cities` : ''}. Most reports in 6 hours.`,
    alternates: { canonical: '/lab-tests' },
  };
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function LabTestsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const kind = one(params.kind);
  const sort = one(params.sort);
  const query: LabQuery = {
    category: one(params.category),
    q: one(params.q),
    kind: kind === 'package' || kind === 'test' || kind === 'scan' || kind === 'procedure' ? kind : undefined,
    sort: sort === 'discount' || sort === 'price_asc' || sort === 'price_desc' ? sort : 'popular',
    page: Math.max(1, Number(one(params.page)) || 1),
    limit: 9,
  };
  const [categories, results, labs, site] = await Promise.all([
    api.labCategories().then((r) => r.categories).catch(() => []),
    api.labTests(query).catch(() => ({ items: [], total: 0, page: 1, limit: 9, pages: 1 })),
    api.labs({ limit: 4 }).then((r) => ({ items: r.items, total: r.total, near: r.near })).catch(() => null),
    loadSite('lab-tests'),
  ]);
  return (
    <LabTestsHome
      categories={categories}
      results={results}
      query={query}
      labs={labs}
      trending={items(site.sections, 'lab-tests/trending')}
      symptoms={items(site.sections, 'lab-tests/symptoms')}
      heroImage={image(site.settings, 'image-lab-tests-hero')}
      testsLabel={countLabel(site.stats?.labTests)}
    />
  );
}
