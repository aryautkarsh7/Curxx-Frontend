import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiError, api } from '@/lib/api';
import LabProfile from './LabProfile';

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try {
    return await api.lab(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const { items } = await api.labs({ limit: 60 });
    return items.map((l) => ({ slug: l.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { lab } = data;
  return {
    title: `${lab.name.includes(lab.area) ? lab.name : `${lab.name}, ${lab.area}`} — Timings, Tests & ${lab.homeCollection ? 'Home Collection' : 'Walk-in'} | Curxx`,
    description: `${lab.accreditations.join(', ')} accredited. ${lab.openHours}. ${lab.testCount} tests bookable${lab.homeCollection ? ` with home sample collection within ${lab.collectionRadiusKm} km` : ', walk-in only'}. ${lab.address}.`,
    alternates: { canonical: `/lab/${lab.slug}` },
  };
}

export default async function LabPage({ params }: Props) {
  const [data, settings] = await Promise.all([load((await params).slug), api.siteSettings().then((r) => r.settings).catch(() => ({}) as Record<string, string>)]);
  if (!data) notFound();
  const contact = { phone: settings['contact-phone'] ?? '', whatsapp: settings['contact-whatsapp'] ?? '' };
  return <LabProfile lab={data.lab} tests={data.tests} nearby={data.nearby} contact={contact} />;
}
