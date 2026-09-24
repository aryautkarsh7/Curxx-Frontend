import { CITY_LIST, type CityInfo } from './catalogue-data';

export type { CityInfo };
/** Every city we serve: the generated snapshot plus any added in the admin panel since (see registerCities). */
export const CITIES: CityInfo[] = [...CITY_LIST];
export const DEFAULT_CITY = 'bangalore';

const BY_SLUG = new Map(CITIES.map((c) => [c.slug, c]));
const ALIASES = new Map(CITIES.flatMap((c) => c.aliases.map((a) => [a, c.slug] as const)));

/** Picker and footer order: cities with a popular order first (set in the admin panel). */
export const POPULAR_CITIES: string[] = [];
const sortPopular = () => {
  POPULAR_CITIES.splice(0, POPULAR_CITIES.length, ...CITIES.filter((c) => (c.popularOrder ?? 0) > 0).sort((a, b) => a.popularOrder! - b.popularOrder!).map((c) => c.slug));
};
sortPopular();

/**
 * Adds or updates cities from the live catalogue, so a city added in the admin panel shows in the
 * picker and resolves on the client before the next deploy regenerates the snapshot. Idempotent.
 */
export function registerCities(cities: CityInfo[]) {
  for (const city of cities) {
    const at = CITIES.findIndex((c) => c.slug === city.slug);
    if (at >= 0) CITIES[at] = city;
    else CITIES.push(city);
    BY_SLUG.set(city.slug, city);
    for (const alias of city.aliases) ALIASES.set(alias, city.slug);
  }
  sortPopular();
}

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
  let best = CITIES[0]!;
  let bestD = Infinity;
  for (const c of CITIES) {
    const d = (c.lat - lat) ** 2 + ((c.lng - lng) * Math.cos((lat * Math.PI) / 180)) ** 2;
    if (d < bestD) {
      best = c;
      bestD = d;
    }
  }
  return best;
}
