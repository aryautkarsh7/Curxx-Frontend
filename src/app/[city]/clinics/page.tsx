import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity } from '@/lib/cities';
import ClinicsListing from './ClinicsListing';

export const metadata: Metadata = { title: 'Clinics in Bangalore | Curxx' };

export default async function CityClinicsPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/clinics`);
  return <ClinicsListing type="clinic" />;
}
