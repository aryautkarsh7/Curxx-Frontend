import type { Metadata } from 'next';
import MedicineStore from './MedicineStore';

export const metadata: Metadata = {
  title: 'Order Medicines Online, Delivered in 2 Hours | Curxx',
  description: 'Genuine prescription medicines, devices and wellness essentials from licensed pharmacies across Bengaluru.',
};

type SearchParams = Promise<{ category?: string | string[]; q?: string | string[] }>;

export default async function MedicinesPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, q } = await searchParams;
  return (
    <MedicineStore
      category={typeof category === 'string' ? category : undefined}
      query={typeof q === 'string' ? q : undefined}
    />
  );
}
