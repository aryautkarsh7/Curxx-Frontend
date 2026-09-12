import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity } from '@/lib/cities';
import ClinicsListing from '../clinics/ClinicsListing';

export const metadata: Metadata = { title: 'Hospitals in Bangalore | Curxx' };

export default async function CityHospitalsPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/hospitals`);
  return <ClinicsListing type="hospital" />;
}
