import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiError, api } from '@/lib/api';
import DoctorProfile from './DoctorProfile';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Pre-render every doctor the API knows about; new ones render on first request. */
export async function generateStaticParams() {
  try {
    const { doctors } = await api.doctors({ limit: 50 });
    return doctors.map((d) => ({ slug: d.slug }));
  } catch {
    return [];
  }
}

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
  const title = `${doctor.name} — ${doctor.title}, ${doctor.area} | Curxx`;
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

  const requested = (await searchParams).mode;
  const mode = (Array.isArray(requested) ? requested[0] : requested) === 'video' ? 'video' : 'clinic';
  const [{ slots }, specialties] = await Promise.all([
    api.slots(slug).catch(() => ({ slots: [] })),
    api.specialties().then((r) => r.specialties).catch(() => []),
  ]);
  const plural = specialties.find((s) => s.slug === data.doctor.specialty)?.plural ?? 'Doctors';

  return <DoctorProfile doctor={data.doctor} facility={data.facility} similar={data.similar} slots={slots} mode={mode} specialtyPlural={plural} />;
}
