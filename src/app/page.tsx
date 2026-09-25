import type { Metadata } from 'next';
import { api, type Doctor } from '@/lib/api';
import { liveCatalogue } from '@/lib/catalogue-live';
import type { Faq } from '@/lib/content-types';
import { DEFAULT_CITY } from '@/lib/cities';
import { JsonLd, faqSchema } from '@/lib/seo';
import { items, loadSite } from '@/lib/site';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: 'Doctor Appointments Online & At Clinics Near You – Curxx',
  description:
    'Book verified doctors online or at a clinic near you. Order medicines, home lab tests, and manage digital health records — all on one trusted website.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Doctor Appointments Online & At Clinics Near You – Curxx',
    description:
      'Book verified doctors online or at a clinic near you. Order medicines, home lab tests, and manage digital health records — all on one trusted website.',
    url: '/',
    type: 'website',
  },
};

/** An online-now GP for the hero card, or null when none is free. */
const nextAvailableGp = (city: string): Promise<Doctor | null> =>
  api.doctors({ city, specialty: 'general-physician', availability: 'now', limit: 1 }).then((r) => r.doctors[0] ?? null).catch(() => null);

export default async function Page() {
  // Everything here comes from the API: doctors, centres and labs, plus the editable copy, claims and
  // counts. An outage hides the affected sections rather than taking the homepage down.
  const [doctors, specialties, facilities, labs, site, testimonials, gp, catalogue, videos] = await Promise.all([
    api.doctors({ sort: 'rating', limit: 3 }).then((r) => r.doctors).catch(() => []),
    api.specialties().then((r) => r.specialties).catch(() => []),
    api.facilities({ sort: 'distance', limit: 4 }).then((r) => r.items).catch(() => []),
    api.labs({ limit: 4 }).then((r) => ({ items: r.items, total: r.total, near: r.near })).catch(() => null),
    loadSite('home', 'shared'),
    api.testimonials('patient').then((r) => r.testimonials).catch(() => []),
    nextAvailableGp(DEFAULT_CITY),
    liveCatalogue(),
    api.videos({ featured: true, limit: 12 }).then((r) => r.videos).catch(() => []),
  ]);

  // Specialty tiles and consultation chips are ordered in the admin panel (homepage order / chip order).
  const byOrder = <T,>(list: T[], key: (t: T) => number) => list.filter((t) => key(t) > 0).sort((a, b) => key(a) - key(b));
  const prices = new Map(specialties.map((s) => [s.slug, s.fromPrice]));
  const tiles = byOrder(catalogue.specialties, (s) => s.homeOrder)
    .slice(0, 12)
    .map((s) => ({ slug: s.slug, name: s.name, icon: s.icon, fromPrice: prices.get(s.slug) ?? s.fromPrice }));
  const chips = byOrder(catalogue.conditions, (c) => c.popularOrder).map((c) => ({ label: c.popular || c.name, condition: c.slug }));
  const faqs = items<Faq>(site.sections, 'home/faqs');

  return (
    <>
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <HomePage
        doctors={doctors}
        facilities={facilities}
        labs={labs}
        site={site}
        testimonials={testimonials}
        gp={gp}
        tiles={tiles}
        chips={chips}
        specialtyCount={catalogue.specialties.length}
        videos={videos}
      />
    </>
  );
}
