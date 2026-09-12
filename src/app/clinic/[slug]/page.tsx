import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FACILITIES, getFacility } from '@/lib/facilities';
import ClinicProfile from './ClinicProfile';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FACILITIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const facility = getFacility((await params).slug);
  return facility ? { title: `${facility.name} | Curxx` } : {};
}

export default async function ClinicPage({ params }: Props) {
  const facility = getFacility((await params).slug);
  if (!facility) notFound();
  return <ClinicProfile facility={facility} />;
}
