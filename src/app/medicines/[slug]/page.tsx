import type { ComponentType } from 'react';
import { notFound } from 'next/navigation';
import AccudermDetail from './AccudermDetail';
import AugmentinDetail from './AugmentinDetail';

// Each product has its own Stitch-designed detail page.
const DETAIL_PAGES: Record<string, ComponentType> = {
  'accuderm-20mg': AccudermDetail,
  'augmentin-625': AugmentinDetail,
};

export function generateStaticParams() {
  return Object.keys(DETAIL_PAGES).map((slug) => ({ slug }));
}

export default async function MedicinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Object.hasOwn(DETAIL_PAGES, slug)) notFound();
  const Detail = DETAIL_PAGES[slug];
  return <Detail />;
}
