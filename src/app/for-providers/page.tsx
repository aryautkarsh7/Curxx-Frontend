import type { Metadata } from 'next';
import { api, type Faq } from '@/lib/api';
import { countLabel, items, loadSite } from '@/lib/site';
import ProviderLanding from './ProviderLanding';

const TITLE = 'Curxx for Doctors & Clinics — Grow Your Practice Online and In-Clinic';
const DESCRIPTION =
  'List your practice on Curxx: verified profile, online and in-clinic scheduling, digital billing, e-prescriptions and automated patient reminders from one dashboard.';

export const metadata: Metadata = {
  title: `${TITLE} | Curxx`,
  description: DESCRIPTION,
  alternates: { canonical: '/for-providers' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/for-providers', type: 'website' },
};

export default async function Page() {
  // Plans, doctor stories and FAQs are edited in the admin panel; the doctor count is live.
  const [{ sections, stats }, plans, testimonials] = await Promise.all([
    loadSite('for-providers'),
    api.plans('provider').then((r) => r.plans).catch(() => []),
    api.testimonials('provider').then((r) => r.testimonials).catch(() => []),
  ]);
  return <ProviderLanding doctorsLabel={countLabel(stats?.verifiedDoctors)} plans={plans} testimonials={testimonials} faqs={items<Faq>(sections, 'for-providers/faqs')} />;
}
