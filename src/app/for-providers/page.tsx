import type { Metadata } from 'next';
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

export default function Page() {
  return <ProviderLanding />;
}
