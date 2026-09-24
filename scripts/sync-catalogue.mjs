#!/usr/bin/env node
/**
 * Regenerates src/lib/catalogue-data.ts from the API (GET /catalogue/routing): the snapshot of cities,
 * specialties, conditions, surgeries and facility types the website uses for menus, the alias
 * redirects in next.config.ts, and as the fallback when the API can't be reached.
 *
 *   npm run catalogue:sync                                   # local API
 *   NEXT_PUBLIC_API_URL=https://…/api/v1 npm run catalogue:sync
 *
 * Pages resolve new slugs from the live API without this, so it is only needed to refresh the
 * snapshot (e.g. to turn a new alias into a real 308 redirect). Commit the result.
 */
import { writeFileSync } from 'node:fs';

const base = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');
const res = await fetch(`${base}/catalogue/routing`);
if (!res.ok) throw new Error(`GET ${base}/catalogue/routing → ${res.status}`);
const c = await res.json();
const j = (v) => JSON.stringify(v);

const file = `// Generated from the API (GET /catalogue/routing) by scripts/sync-catalogue.mjs — don't edit by hand.
// A snapshot for routing, menus and metadata without an API round trip; pages check the live API
// for slugs added in the admin panel since (see lib/catalogue-live.ts).

export type CityInfo = { slug: string; name: string; state: string; tier: 1 | 2; lat: number; lng: number; aliases: string[]; localities: { slug: string; name: string; pincode: string }[]; popularOrder?: number };
export type SpecialtyInfo = { slug: string; name: string; plural: string; icon: string; category: string; fromPrice: number; videoFrom: number; video: boolean; popular: boolean; description: string; homeOrder?: number };
export type ConditionInfo = { slug: string; name: string; specialty: string; popular: string | null; popularOrder?: number };
export type SurgeryInfo = { slug: string; name: string; category: string; icon: string; popular: boolean };
export type FacilityTypeInfo = { name: string; slug: string; group: 'hospital' | 'clinic'; icon: string; description: string };

export const CITY_LIST: CityInfo[] = ${j(c.cities)};

export const SPECIALTY_CATEGORIES: string[] = ${j(c.specialtyCategories)};
export const SPECIALTY_LIST: SpecialtyInfo[] = ${j(c.specialties)};
/** Old or alternative specialty URLs → the canonical specialty. */
export const SPECIALTY_ALIASES: Record<string, string> = ${j(c.specialtyAliases)};

export const CONDITION_LIST: ConditionInfo[] = ${j(c.conditions)};

export const SURGERY_CATEGORIES: string[] = ${j(c.surgeryCategories)};
export const SURGERY_LIST: SurgeryInfo[] = ${j(c.surgeries)};

export const FACILITY_TYPES: FacilityTypeInfo[] = ${j(c.facilityTypes)};
`;
writeFileSync(new URL('../src/lib/catalogue-data.ts', import.meta.url), file);
console.log(`catalogue-data.ts: ${c.cities.length} cities, ${c.specialties.length} specialties, ${c.conditions.length} conditions, ${c.surgeries.length} surgeries`);
