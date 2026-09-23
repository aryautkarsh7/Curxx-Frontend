import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity } from '@/lib/cities';
import ClinicsListing from './ClinicsListing';
import { loadFacilities } from './loadFacilities';

export const metadata: Metadata = {
  title: 'Clinics in Bangalore — Book a Visit | Curxx',
  description: 'Verified clinics and polyclinics across Bangalore with opening hours, departments, insurers and bookable doctors.',
  alternates: { canonical: '/bangalore/clinics' },
};

type Props = { params: Promise<{ city: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CityClinicsPage({ params, searchParams }: Props) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/clinics`);
  const { query, data } = await loadFacilities('clinic', await searchParams);
  return <ClinicsListing type="clinic" items={data.items} total={data.total} page={data.page} pages={data.pages} areas={data.facets.areas} query={query} />;
}
