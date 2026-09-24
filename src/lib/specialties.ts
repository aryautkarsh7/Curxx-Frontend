// URL-slug catalogue used for routing, menus and metadata (generated from the backend catalogue).
// Listings read live counts and content from the API.
import { CONDITION_LIST, SPECIALTY_ALIASES, SPECIALTY_CATEGORIES, SPECIALTY_LIST, type SpecialtyInfo } from './catalogue-data';

export type Specialty = SpecialtyInfo;
export const SPECIALTIES = SPECIALTY_LIST;
export { SPECIALTY_CATEGORIES };

/** `/{city}/doctors` lists every specialty. */
export const ALL_DOCTORS = { slug: 'doctors', name: 'Doctor', plural: 'Doctors', icon: 'stethoscope', category: '', fromPrice: 0, videoFrom: 0, video: true, popular: false, description: 'Verified doctors across every specialty' } as const;

const BY_SLUG = new Map(SPECIALTY_LIST.map((s) => [s.slug, s]));

export function getSpecialty(slug: string) {
  return BY_SLUG.get(slug);
}

/** A specialty URL that should permanently redirect elsewhere (trichologist → dermatologist). */
export const specialtyAlias = (slug: string) => SPECIALTY_ALIASES[slug];

/** `treatment-for-{condition}` URLs are condition pages. */
export const CONDITION_PREFIX = 'treatment-for-';
export const conditionFromSegment = (segment: string) =>
  segment.startsWith(CONDITION_PREFIX) ? CONDITION_LIST.find((c) => c.slug === segment.slice(CONDITION_PREFIX.length)) : undefined;
export const conditionHref = (city: string, slug: string) => `/${city}/${CONDITION_PREFIX}${slug}`;

/** The total we advertise ("55+ specialties") — the catalogue minus General Surgeon, which lives under surgeries. */
export const SPECIALTY_COUNT_LABEL = `${Math.floor((SPECIALTY_LIST.length - 1) / 5) * 5}+`;
