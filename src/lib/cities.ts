// Cities we list providers for, by URL slug. Aliases permanently redirect to the canonical slug.
const SUPPORTED_CITIES = new Set(['bangalore']);
const CITY_ALIASES = new Map([['bengaluru', 'bangalore']]);

/** Canonical slug for a `[city]` URL segment, or null when we don't serve that city. */
export function canonicalCity(slug: string): string | null {
  const canonical = CITY_ALIASES.get(slug) ?? slug;
  return SUPPORTED_CITIES.has(canonical) ? canonical : null;
}
