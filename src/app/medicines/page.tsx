import type { Metadata } from 'next';
import { api, type MedicineQuery } from '@/lib/api';
import { items, loadSite } from '@/lib/site';
import MedicineStore from './MedicineStore';

export const metadata: Metadata = {
  title: 'Medicines: Uses, Side Effects, Composition & Substitutes | Curxx',
  description:
    'Browse medicines and check their uses, side effects, composition and substitutes. Information only: Curxx does not sell or deliver medicines.',
  alternates: { canonical: '/medicines' },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const SORTS = ['popular', 'price_asc', 'price_desc', 'rating'] as const;

export default async function MedicinesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sort = SORTS.find((s) => s === one(params.sort)) ?? 'popular';
  const query: MedicineQuery = {
    category: one(params.category),
    q: one(params.q),
    rx: one(params.rx) === 'otc' ? 'otc' : one(params.rx) === 'required' ? 'required' : undefined,
    sort,
    page: Math.max(1, Number(one(params.page)) || 1),
    limit: 12,
  };

  // The page still renders if the API is briefly unavailable.
  const empty = { items: [], total: 0, page: 1, limit: 12, pages: 1 };
  const [categories, results, site] = await Promise.all([
    api
      .medicineCategories()
      .then((r) => r.categories)
      .catch(() => []),
    api.medicines(query).catch(() => empty),
    loadSite('medicines'),
  ]);

  return (
    <MedicineStore
      categories={categories}
      results={results}
      query={query}
      popularSearches={items<string>(site.sections, 'medicines/popular-searches')}
    />
  );
}
