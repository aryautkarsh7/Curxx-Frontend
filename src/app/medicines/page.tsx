import type { Metadata } from 'next';
import { api, type MedicineQuery } from '@/lib/api';
import type { Feature } from '@/lib/content-types';
import { items, loadSite } from '@/lib/site';
import MedicineStore from './MedicineStore';

export const metadata: Metadata = {
  title: 'Order Medicines Online, Delivered in 2 Hours | Curxx',
  description: 'Genuine prescription medicines, devices and wellness essentials from licensed pharmacies across India. Upload a prescription or shop by category.',
  alternates: { canonical: '/medicines' },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const SORTS = ['popular', 'price_asc', 'price_desc', 'discount', 'rating'] as const;

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

  // The storefront still renders if the API is briefly unavailable.
  const empty = { items: [], total: 0, page: 1, limit: 12, pages: 1 };
  const [categories, results, deals, site] = await Promise.all([
    api.medicineCategories().then((r) => r.categories).catch(() => []),
    api.medicines(query).catch(() => empty),
    api.medicines({ category: 'deals', sort: 'discount', limit: 4 }).then((r) => r.items).catch(() => []),
    loadSite('medicines'),
  ]);

  return (
    <MedicineStore
      categories={categories}
      results={results}
      deals={deals}
      query={query}
      popularSearches={items<string>(site.sections, 'medicines/popular-searches')}
      trust={items<Feature>(site.sections, 'medicines/trust')}
    />
  );
}
