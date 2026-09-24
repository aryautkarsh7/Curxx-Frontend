import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { canonicalCity } from '@/lib/cities';
import { ALL_DOCTORS, conditionFromSegment, getSpecialty, specialtyAlias } from '@/lib/specialties';
import ConditionPage, { conditionMetadata } from './ConditionPage';
import { listingMetadata, renderListing, type SearchParams } from './listing';

type Props = {
  params: Promise<{ city: string; specialty: string }>;
  searchParams: Promise<SearchParams>;
};

const known = (slug: string) => slug === ALL_DOCTORS.slug || Boolean(getSpecialty(slug));

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { city, specialty: segment } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) return {};
  const condition = conditionFromSegment(segment);
  if (condition) return conditionMetadata(canonical, condition.slug);
  if (!known(segment)) return {};
  return listingMetadata({ city: canonical, specialty: segment }, await searchParams);
}

export default async function SpecialtyListingPage({ params, searchParams }: Props) {
  const { city, specialty: segment } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();

  const alias = specialtyAlias(segment);
  if (alias) permanentRedirect(`/${canonical}/${alias}`);
  if (canonical !== city) permanentRedirect(`/${canonical}/${segment}`);

  const condition = conditionFromSegment(segment);
  if (condition) return <ConditionPage city={canonical} slug={condition.slug} searchParams={await searchParams} />;
  if (!known(segment)) notFound();

  return renderListing({ city: canonical, specialty: segment }, await searchParams);
}
