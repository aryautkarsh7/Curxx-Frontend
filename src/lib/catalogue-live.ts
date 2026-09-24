/**
 * Server-side catalogue lookups for routing: which cities, localities, specialties and conditions
 * exist. Reads the live catalogue from the API (cached for 5 minutes), so a city or condition added in
 * the admin panel works without a redeploy; falls back to the generated snapshot in catalogue-data.ts
 * when the API can't be reached, so routing never fails on an outage.
 *
 * Trade-off: alias redirects in next.config.ts are built from the snapshot at deploy time (a real 308).
 * An alias added in the admin panel redirects from the page instead until the next deploy after
 * `npm run catalogue:sync`.
 */
import { cache } from 'react';
import { api, type RoutingCatalogue } from './api';
import { CITY_LIST, CONDITION_LIST, FACILITY_TYPES, SPECIALTY_ALIASES, SPECIALTY_CATEGORIES, SPECIALTY_LIST, SURGERY_CATEGORIES, SURGERY_LIST, type CityInfo, type ConditionInfo, type SpecialtyInfo } from './catalogue-data';

const SNAPSHOT: RoutingCatalogue = {
  cities: CITY_LIST.map((c) => ({ ...c, popularOrder: c.popularOrder ?? 0 })),
  specialtyCategories: SPECIALTY_CATEGORIES,
  specialties: SPECIALTY_LIST.map((s) => ({ ...s, homeOrder: s.homeOrder ?? 0 })),
  specialtyAliases: SPECIALTY_ALIASES,
  conditions: CONDITION_LIST.map((c) => ({ ...c, popularOrder: c.popularOrder ?? 0 })),
  surgeryCategories: SURGERY_CATEGORIES,
  surgeries: SURGERY_LIST,
  facilityTypes: FACILITY_TYPES,
};

/** The live catalogue, once per request. */
export const liveCatalogue = cache(async (): Promise<RoutingCatalogue> => {
  try {
    const live = await api.routing();
    // An empty answer would 404 every page: treat it like an outage.
    return live.cities?.length && live.specialties?.length ? live : SNAPSHOT;
  } catch {
    return SNAPSHOT;
  }
});

/** A `[city]` URL segment → the city, following aliases (bengaluru → Bengaluru). */
export async function resolveCity(segment: string): Promise<CityInfo | null> {
  const s = segment.toLowerCase();
  const { cities } = await liveCatalogue();
  return cities.find((c) => c.slug === s) ?? cities.find((c) => c.aliases.includes(s)) ?? null;
}

export async function resolveLocality(city: CityInfo, segment: string) {
  return city.localities.find((l) => l.slug === segment.toLowerCase());
}

export async function resolveSpecialty(slug: string): Promise<SpecialtyInfo | undefined> {
  return (await liveCatalogue()).specialties.find((s) => s.slug === slug);
}

/** A specialty URL that should permanently redirect elsewhere (trichologist → dermatologist). */
export async function resolveSpecialtyAlias(slug: string): Promise<string | undefined> {
  return (await liveCatalogue()).specialtyAliases[slug];
}

/** `treatment-for-{condition}` segments are condition pages. */
export async function resolveCondition(segment: string): Promise<ConditionInfo | undefined> {
  const prefix = 'treatment-for-';
  if (!segment.startsWith(prefix)) return undefined;
  const slug = segment.slice(prefix.length);
  return (await liveCatalogue()).conditions.find((c) => c.slug === slug);
}
