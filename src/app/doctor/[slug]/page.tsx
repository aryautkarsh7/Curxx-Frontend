import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiError, api } from '@/lib/api';
import DoctorProfile from './DoctorProfile';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Rendered per request: the page reads ?slot= / ?mode= and shows live, bookable slots.
// (Static params here made Next render it statically and fail with DYNAMIC_SERVER_USAGE.)
export const dynamic = 'force-dynamic';

async function load(slug: string) {
  try {
    return await api.doctor(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { doctor } = data;
  const title = `${doctor.name} — ${doctor.title} in ${doctor.area}, ${doctor.cityName ?? 'Bengaluru'} | Curxx`;
  const description = `Book ${doctor.name}, ${doctor.title.toLowerCase()} at ${doctor.clinicName}, ${doctor.area}. ${doctor.experienceYears} years of experience, consultations from ₹${doctor.videoFee}. Video consult or in-clinic visit on Curxx.`;
  return {
    title,
    description,
    alternates: { canonical: `/doctor/${doctor.slug}` },
    openGraph: { title, description, type: 'profile' },
  };
}

export default async function DoctorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();

  const query = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const mode = first(query.mode) === 'video' ? 'video' : 'clinic';
  const { slots } = await api.slots(slug).catch(() => ({ slots: [] }));

  return <DoctorProfile doctor={data.doctor} facility={data.facility} similar={data.similar} slots={slots} mode={mode} slotId={first(query.slot)} />;
}
