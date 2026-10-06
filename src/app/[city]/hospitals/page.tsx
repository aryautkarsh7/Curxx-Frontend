import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { SeoBody } from '@/components/seo/SeoContent';
import { api } from '@/lib/api';
import { liveCatalogue, resolveCity } from '@/lib/catalogue-live';
import { hospitalsPage } from '@/lib/hospitals-content';
import { loadFigures } from '@/lib/seo-load';
import ClinicsListing from '../clinics/ClinicsListing';
import { loadFacilities } from '../clinics/loadFacilities';

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
  const stats = type ? null : await loadFigures(() => api.seoHospitals(canonical));
  const copy = stats ? hospitalsPage(stats) : null;
  return {
    title: {
      absolute: type
        ? `${type.name}s in ${name} — Book Doctors & Check Timings | Curxx`
        : (copy?.title ?? `Hospitals in ${name} | Curxx`),
    },
    description: type
      ? `${type.description} in ${name}: timings, departments and doctors listed on Curxx.`
      : copy?.description,
    alternates: {
      canonical: `/${canonical}/hospitals${type ? `?category=${type.slug}` : ''}${page > 1 ? `${type ? '&' : '?'}page=${page}` : ''}`,
    },
  };
}

export default async function CityHospitalsPage({ params, searchParams }: Props) {
  const { city } = await params;
  const info = await resolveCity(city);
  if (!info) notFound();
  const canonical = info.slug;
  if (canonical !== city) permanentRedirect(`/${canonical}/hospitals`);
  const sp = await searchParams;
  const { query, data } = await loadFacilities('hospital', canonical, sp);
  // The copy describes the whole city, so filtered views leave it out.
  const filtered = Object.keys(sp).some(
    (k) => sp[k] !== undefined && k !== 'page' && k !== 'utm_source',
  );
  const stats = filtered ? null : await loadFigures(() => api.seoHospitals(canonical));
  const copy = stats ? hospitalsPage(stats) : null;
  return (
    <ClinicsListing
      type="hospital"
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
      intro={
        copy ? (
          <p className="mt-4 max-w-[900px] font-body-default text-body-default text-[#5c403d] leading-relaxed">
            {copy.upper}
          </p>
        ) : undefined
      }
      below={
        copy ? (
          <section className="mt-12 py-10 border-t border-[#E7E5E4]">
            <SeoBody page={copy} />
          </section>
        ) : undefined
      }
    />
  );
}
