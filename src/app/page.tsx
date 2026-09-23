import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { HOME_FAQS } from '@/lib/home-content';
import { JsonLd, faqSchema } from '@/lib/seo';
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

export default async function Page() {
  // Doctors, specialties, nearby centres and labs come from the API. The rest of the
  // page is static marketing copy, so an API outage hides those sections rather than
  // taking the homepage down.
  const [doctors, specialties, facilities, labs] = await Promise.all([
    api.doctors({ sort: 'rating', limit: 3 }).then((r) => r.doctors).catch(() => []),
    api.specialties().then((r) => r.specialties).catch(() => []),
    api.facilities({ sort: 'distance', limit: 4 }).then((r) => r.items).catch(() => []),
    api.labs({ limit: 4 }).then((r) => ({ items: r.items, total: r.total, near: r.near })).catch(() => null),
  ]);

  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <HomePage doctors={doctors} specialties={specialties} facilities={facilities} labs={labs} />
    </>
  );
}
