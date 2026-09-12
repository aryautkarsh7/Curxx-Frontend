import type { Metadata } from 'next';
import LabTestsHome from './LabTestsHome';

export const metadata: Metadata = {
  title: 'Lab Tests at Home, Reports in 24 Hours | Curxx',
  description: 'Book NABL & CAP accredited lab tests and full body checkups with free home sample collection across Bengaluru.',
};

type SearchParams = Promise<{ category?: string | string[]; q?: string | string[] }>;

export default async function LabTestsPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, q } = await searchParams;
  return (
    <LabTestsHome
      category={typeof category === 'string' ? category : undefined}
      query={typeof q === 'string' ? q : undefined}
    />
  );
}
