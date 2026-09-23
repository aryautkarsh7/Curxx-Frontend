import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity } from '@/lib/cities';
import ClinicsListing from '../clinics/ClinicsListing';
import { loadFacilities } from '../clinics/loadFacilities';

export const metadata: Metadata = {
  title: 'Hospitals in Bangalore — 24x7 Emergency & Specialists | Curxx',
  description: 'NABH-accredited hospitals across Bangalore with 24x7 emergency, departments, insurers and doctors you can book online.',
  alternates: { canonical: '/bangalore/hospitals' },
};

type Props = { params: Promise<{ city: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CityHospitalsPage({ params, searchParams }: Props) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/hospitals`);
  const { query, data } = await loadFacilities('hospital', await searchParams);
  return <ClinicsListing type="hospital" items={data.items} total={data.total} page={data.page} pages={data.pages} areas={data.facets.areas} query={query} />;
}
