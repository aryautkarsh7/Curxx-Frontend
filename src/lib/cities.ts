import { CITY_LIST, type CityInfo } from './catalogue-data';

export type { CityInfo };
export const CITIES = CITY_LIST;
export const DEFAULT_CITY = 'bangalore';

const BY_SLUG = new Map(CITY_LIST.map((c) => [c.slug, c]));
const ALIASES = new Map(CITY_LIST.flatMap((c) => c.aliases.map((a) => [a, c.slug] as const)));

/** Canonical slug for a `[city]` URL segment (aliases like bengaluru → bangalore), or null when we don't serve that city. */
export function canonicalCity(slug: string): string | null {
  const s = slug.toLowerCase();
  if (BY_SLUG.has(s)) return s;
  return ALIASES.get(s) ?? null;
}

export const getCity = (slug: string) => BY_SLUG.get(canonicalCity(slug) ?? '');
export const cityName = (slug: string) => getCity(slug)?.name ?? 'Bengaluru';
export const getLocality = (city: string, locality: string) => getCity(city)?.localities.find((l) => l.slug === locality.toLowerCase());

/** The nearest city we serve to a coordinate, for "use my location". */
export function nearestCity(lat: number, lng: number) {
  let best = CITY_LIST[0]!;
  let bestD = Infinity;
  for (const c of CITY_LIST) {
    const d = (c.lat - lat) ** 2 + ((c.lng - lng) * Math.cos((lat * Math.PI) / 180)) ** 2;
    if (d < bestD) {
      best = c;
      bestD = d;
    }
  }
  return best;
}

/** Cities ordered for pickers: the big metros first, then alphabetically. */
export const POPULAR_CITIES = ['bangalore', 'mumbai', 'delhi', 'hyderabad', 'chennai', 'pune', 'kolkata', 'ahmedabad', 'gurgaon', 'noida', 'jaipur', 'lucknow'];
