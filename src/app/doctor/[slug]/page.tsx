import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DOCTORS, getDoctor } from '@/lib/doctors';
import DoctorProfile from './DoctorProfile';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOCTORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doctor = getDoctor((await params).slug);
  return doctor ? { title: `${doctor.name} — ${doctor.title} | Curxx` } : {};
}

export default async function DoctorPage({ params }: Props) {
  const doctor = getDoctor((await params).slug);
  if (!doctor) notFound();
  return <DoctorProfile doctor={doctor} />;
}
