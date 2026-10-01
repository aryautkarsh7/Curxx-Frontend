import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { liveCatalogue, resolveCity } from '@/lib/catalogue-live';
import ClinicsListing from './ClinicsListing';
import { loadFacilities } from './loadFacilities';

type Props = {
  params: Promise<{ city: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const info = await resolveCity((await params).city);
  if (!info) return {};
  const { slug: canonical, name } = info;
  const { facilityTypes: FACILITY_TYPES } = await liveCatalogue();
  const sp = await searchParams;
  const category = sp.category;
  // Each page of the infinite-scroll listing is crawlable on its own (?page=N, self canonical).
  const page = Math.max(1, Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1);
  const type = FACILITY_TYPES.find((t) => t.slug === category);
  return {
    title: {
      absolute: type
        ? `${type.name}s in ${name} — Book Doctors & Check Timings | Curxx`
        : `Clinics in ${name} — Polyclinics, Dental, Eye & Day Care | Curxx`,
    },
    description: type
      ? `${type.description} in ${name}: timings, departments, insurers and doctors you can book on Curxx.`
      : `Verified clinics in ${name} — polyclinics, dental, diagnostic, day-care and rehab centres — with opening and OPD hours, specialities and bookable doctors.`,
    alternates: {
      canonical: `/${canonical}/clinics${type ? `?category=${type.slug}` : ''}${page > 1 ? `${type ? '&' : '?'}page=${page}` : ''}`,
    },
  };
}

export default async function CityClinicsPage({ params, searchParams }: Props) {
  const { city } = await params;
  const info = await resolveCity(city);
  if (!info) notFound();
  const canonical = info.slug;
  if (canonical !== city) permanentRedirect(`/${canonical}/clinics`);
  const { query, data } = await loadFacilities('clinic', canonical, await searchParams);
  return (
    <ClinicsListing
      type="clinic"
      city={canonical}
      cityName={info.name}
      categories={data.facets.categories ?? []}
      items={data.items}
      total={data.total}
      page={data.page}
      pages={data.pages}
      unavailable={data.unavailable}
      areas={data.facets.areas}
      departments={data.facets.departments ?? []}
      query={query}
    />
  );
}
