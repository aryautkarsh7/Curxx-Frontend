import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiError, api } from '@/lib/api';
import LabTestDetail from './LabTestDetail';

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try {
    return await api.labTest(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const { items } = await api.labTests({ limit: 60 });
    return items.map((t) => ({ slug: t.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { test } = data;
  return {
    title: `${test.name} at Home — ₹${test.price}, ${test.reportTime} | Curxx`,
    description: `${test.kind === 'package' ? `${test.testsIncluded} tests. ` : ''}Covers ${test.covers}. Free home sample collection in 24 cities.`,
    alternates: { canonical: `/lab-tests/${test.slug}` },
  };
}

export default async function LabTestPage({ params }: Props) {
  const data = await load((await params).slug);
  if (!data) notFound();
  const categories = await api.labCategories().then((r) => r.categories).catch(() => []);
  const category = categories.find((c) => c.slug === data.test.categories[0]) ?? null;
  return <LabTestDetail pkg={data.test} related={data.related} category={category} availability={data.availability} />;
}
