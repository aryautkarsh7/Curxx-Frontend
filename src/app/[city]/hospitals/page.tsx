import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity, getCity } from '@/lib/cities';
import { FACILITY_TYPES } from '@/lib/catalogue-data';
import ClinicsListing from '../clinics/ClinicsListing';
import { loadFacilities } from '../clinics/loadFacilities';

type Props = { params: Promise<{ city: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const canonical = canonicalCity((await params).city);
  if (!canonical) return {};
  const name = getCity(canonical)!.name;
  const category = (await searchParams).category;
  const type = FACILITY_TYPES.find((t) => t.slug === category);
  return {
    title: { absolute: type ? `${type.name}s in ${name} — Book Doctors & Check Timings | Curxx` : `Hospitals in ${name} — 24x7 Emergency, Specialists & Cashless | Curxx` },
    description: type ? `${type.description} in ${name}: timings, departments, insurers and doctors you can book on Curxx.` : `Compare hospitals in ${name} by type — multispecialty, government, eye, maternity and more — with 24x7 emergency, departments, insurers and doctors you can book online.`,
    alternates: { canonical: `/${canonical}/hospitals${type ? `?category=${type.slug}` : ''}` },
  };
}

export default async function CityHospitalsPage({ params, searchParams }: Props) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/hospitals`);
  const { query, data } = await loadFacilities('hospital', canonical, await searchParams);
  return (
    <ClinicsListing
      type="hospital"
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
