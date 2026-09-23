import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiError, api } from '@/lib/api';
import MedicineDetail from './MedicineDetail';

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try {
    return await api.medicine(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const { items } = await api.medicines({ limit: 60 });
    return items.map((m) => ({ slug: m.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { medicine: m } = data;
  return {
    title: `${m.name} — Price, Uses & Side Effects | Curxx`,
    description: `Buy ${m.name} (${m.composition}) online at ₹${m.price}. ${m.description?.slice(0, 110) ?? ''}`,
    alternates: { canonical: `/medicines/${m.slug}` },
  };
}

export default async function MedicinePage({ params }: Props) {
  const data = await load((await params).slug);
  if (!data) notFound();
  const categories = await api.medicineCategories().then((r) => r.categories).catch(() => []);
  const categoryName = categories.find((c) => c.slug === data.medicine.categories[0])?.name ?? null;
  return <MedicineDetail medicine={data.medicine} substitutes={data.substitutes} similar={data.similar} categoryName={categoryName} />;
}
