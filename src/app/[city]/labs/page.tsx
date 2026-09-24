import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { api, type LabDirectoryQuery } from '@/lib/api';
import { canonicalCity, getCity } from '@/lib/cities';
import LabsListing from './LabsListing';

type Props = { params: Promise<{ city: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const canonical = canonicalCity((await params).city);
  if (!canonical) return {};
  const name = getCity(canonical)!.name;
  return {
    title: { absolute: `Diagnostic Labs in ${name} — NABL Accredited, Home Collection | Curxx` },
    description: `NABL and CAP accredited diagnostic labs and imaging centres in ${name} with timings, tests offered, home sample collection areas and walk-in counters.`,
    alternates: { canonical: `/${canonical}/labs` },
  };
}
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const ACCREDITATIONS = ['NABL', 'CAP', 'ISO 15189'] as const;

export default async function CityLabsPage({ params, searchParams }: Props) {
  const { city } = await params;
  const canonical = canonicalCity(city);
  if (!canonical) notFound();
  if (canonical !== city) permanentRedirect(`/${canonical}/labs`);

  const sp = await searchParams;
  const sort = one(sp.sort);
  const accreditation = one(sp.accreditation);
  const pincode = one(sp.pincode);
  const query: LabDirectoryQuery = {
    city: canonical,
    pincode: pincode && /^\d{6}$/.test(pincode) ? pincode : undefined,
    area: one(sp.area),
    q: one(sp.q),
    test: one(sp.test),
    accreditation: ACCREDITATIONS.find((a) => a === accreditation),
    homeCollection: one(sp.homeCollection) === 'true' || undefined,
    walkIn: one(sp.walkIn) === 'true' || undefined,
    sort: sort === 'rating' || sort === 'reviews' ? sort : 'distance',
  };
  const [data, tests] = await Promise.all([
    api.labs(query).catch(() => null),
    api.labTests({ limit: 60 }).then((r) => r.items.map((t) => ({ slug: t.slug, name: t.name, kind: t.kind }))).catch(() => []),
  ]);
  return (
    <LabsListing
      items={data?.items ?? []}
      total={data?.total ?? 0}
      city={canonical}
      cityName={getCity(canonical)!.name}
      near={data?.near ?? { pincode: getCity(canonical)!.localities[0]!.pincode, area: getCity(canonical)!.localities[0]!.name }}
      areas={data?.facets.areas ?? []}
      accreditations={data?.facets.accreditations ?? []}
      tests={tests}
      query={query}
      failed={!data}
    />
  );
}
