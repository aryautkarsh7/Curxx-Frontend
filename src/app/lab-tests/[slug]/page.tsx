import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LAB_PACKAGES, getLabPackage } from '@/lib/lab-tests';
import LabTestDetail from './LabTestDetail';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LAB_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = getLabPackage((await params).slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} — Home Sample Collection | Curxx`,
    description: `${pkg.testsIncluded} tests. Covers ${pkg.covers}`,
  };
}

export default async function LabTestPage({ params }: Props) {
  const pkg = getLabPackage((await params).slug);
  if (!pkg) notFound();
  return <LabTestDetail pkg={pkg} />;
}
