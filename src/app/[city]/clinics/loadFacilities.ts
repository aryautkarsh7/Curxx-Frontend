import { api, type FacilityQuery } from '@/lib/api';

type SearchParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

/** Reads listing filters from the URL and fetches one page of facilities. */
export async function loadFacilities(type: 'hospital' | 'clinic', city: string, params: SearchParams) {
  const sort = one(params.sort);
  const query: FacilityQuery = {
    city,
    type,
    category: one(params.category),
    area: one(params.area),
    department: one(params.department),
    emergency: one(params.emergency) === 'true' || undefined,
    q: one(params.q),
    sort: sort === 'distance' || sort === 'reviews' ? sort : 'rating',
    page: Math.max(1, Number(one(params.page)) || 1),
    limit: 8,
  };
  const data = await api.facilities(query).catch(() => ({ items: [], total: 0, page: 1, limit: 8, pages: 1, facets: { areas: [], categories: [] } }));
  return { query, data };
}
