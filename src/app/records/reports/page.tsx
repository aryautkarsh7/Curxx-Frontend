import type { Metadata } from 'next';
import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LabResults from './LabResults';

export const metadata: Metadata = { title: 'Lab Results | Curxx', robots: { index: false } };

export default function ReportsPage() {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1100px] mx-auto px-margin sm:px-margin-desktop py-6 pb-24 space-y-6">
        <Suspense>
          <LabResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
