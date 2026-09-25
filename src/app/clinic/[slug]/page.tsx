import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiError, api } from '@/lib/api';
import { image } from '@/lib/site';
import ClinicProfile from './ClinicProfile';

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try {
    return await api.facility(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const { items } = await api.facilities({ limit: 60 });
    return items.map((f) => ({ slug: f.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { facility: f } = data;
  return {
    title: `${f.name}, ${f.area} — Doctors, Timings & Booking | Curxx`,
    description: `${f.tagline}. ${f.openHours}. ${data.doctors.length} doctors bookable on Curxx at ${f.name}, ${f.address}.`,
    alternates: { canonical: `/clinic/${f.slug}` },
  };
}

export default async function ClinicPage({ params }: Props) {
  const [data, settings] = await Promise.all([load((await params).slug), api.siteSettings().then((r) => r.settings).catch(() => ({}))]);
  if (!data) notFound();
  const contact = { phone: (settings as Record<string, string>)['contact-phone'] ?? '', whatsapp: (settings as Record<string, string>)['contact-whatsapp'] ?? '' };
  return <ClinicProfile facility={data.facility} doctors={data.doctors} interior={image(settings, 'image-clinic-interior')} contact={contact} />;
}
