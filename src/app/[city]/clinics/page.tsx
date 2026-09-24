import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity, getCity } from '@/lib/cities';
import { FACILITY_TYPES } from '@/lib/catalogue-data';
import ClinicsListing from './ClinicsListing';
import { loadFacilities } from './loadFacilities';

type Props = { params: Promise<{ city: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const canonical = canonicalCity((await params).city);
  if (!canonical) return {};
  const name = getCity(canonical)!.name;
  const category = (await searchParams).category;
  const type = FACILITY_TYPES.find((t) => t.slug === category);
  return {
    title: { absolute: type ? `${type.name}s in ${name} — Book Doctors & Check Timings | Curxx` : `Clinics in ${name} — Polyclinics, Dental, Eye & Day Care | Curxx` },
    description: type ? `${type.description} in ${name}: timings, departments, insurers and doctors you can book on Curxx.` : `Verified clinics in ${name} — polyclinics, dental, diagnostic, day-care and rehab centres — with opening and OPD hours, specialities and bookable doctors.`,
    alternates: { canonical: `/${canonical}/clinics${type ? `?category=${type.slug}` : ''}` },
  };
}

export default async function CityClinicsPage({ params, searchParams }: Props) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/clinics`);
  const { query, data } = await loadFacilities('clinic', canonical, await searchParams);
  return (
    <ClinicsListing
      type="clinic"
      city={canonical}
      cityName={getCity(canonical)!.name}
      categories={data.facets.categories ?? []}
      items={data.items}
      total={data.total}
      page={data.page}
      pages={data.pages}
      areas={data.facets.areas}
      query={query}
    />
  );
}
