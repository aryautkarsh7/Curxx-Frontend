import type { MetadataRoute } from 'next';
import { api } from '@/lib/api';
import { SITE_URL } from '@/lib/site-env';
import { CONDITION_PREFIX } from '@/lib/specialties';

/** Rebuilt hourly from the API. */
export const revalidate = 3600;

const PAGES = ['/', '/india/surgeries', '/blog', '/lab-tests', '/medicines', '/triage', '/curxx-plus', '/for-providers', '/partner-with-us', '/privacy', '/terms', '/teleconsultation-policy'];

/**
 * Only pages with something real on them: listings without doctors, city surgery pages that fail the
 * index rule and hidden sample data (doctors, clinics, lab centres) stay out. Lab tests, medicines,
 * articles and procedures are catalogue content and always listed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const at = (path: string, lastModified?: string | null) => ({ url: `${SITE_URL}${path}`, ...(lastModified ? { lastModified } : {}) });
  const entries = PAGES.map((path) => at(path));
  const data = await api.sitemap().catch(() => null);
  if (!data) return entries;

  if (data.india.doctors) entries.push(at('/india/doctors'), ...data.india.specialties.map((s) => at(`/india/${s}`)));
  for (const city of data.cities) {
    const base = `/${city.slug}`;
    if (city.doctors) entries.push(at(`${base}/doctors`), at(`${base}/specialties`));
    entries.push(...city.specialties.map((s) => at(`${base}/${s}`)));
    for (const [specialty, localities] of Object.entries(city.localities)) entries.push(...localities.map((l) => at(`${base}/${specialty}/${l}`)));
    entries.push(...city.conditions.map((c) => at(`${base}/${CONDITION_PREFIX}${c}`)));
    if (city.hospitals) entries.push(at(`${base}/hospitals`));
    if (city.clinics) entries.push(at(`${base}/clinics`));
    if (city.surgeries.length) entries.push(at(`${base}/surgeries`), ...city.surgeries.map((s) => at(`${base}/surgery/${s}`)));
  }
  entries.push(
    ...data.doctors.map((d) => at(`/doctor/${d.slug}`, d.updatedAt)),
    ...data.facilities.map((f) => at(`/clinic/${f.slug}`, f.updatedAt)),
    ...data.articles.map((a) => at(`/blog/${a.slug}`, a.updatedAt)),
    ...data.labTests.map((t) => at(`/lab-tests/${t.slug}`, t.updatedAt)),
    ...data.medicines.map((m) => at(`/medicines/${m.slug}`, m.updatedAt)),
  );
  return entries;
}
