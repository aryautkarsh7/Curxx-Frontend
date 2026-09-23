import type { Metadata } from 'next';
import { Suspense } from 'react';
import RecordsVault from './RecordsVault';

export const metadata: Metadata = {
  title: 'Health Records & ABHA Locker | Curxx',
  description: 'Your prescriptions, lab reports and scans in one encrypted locker, shared only with your consent.',
  robots: { index: false },
};

export default function RecordsPage() {
  return (
    <Suspense>
      <RecordsVault />
    </Suspense>
  );
}
