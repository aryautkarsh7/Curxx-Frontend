import type { Metadata } from 'next';
import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AccountTabs from './AccountTabs';

export const metadata: Metadata = {
  title: 'My Account | Curxx',
  description: 'Your appointments, orders, profile, addresses and saved doctors on Curxx.',
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-margin sm:px-margin-desktop py-8 pb-24 space-y-2">
        <h1 className="text-headline-h1 font-headline-h1 text-on-surface">My account</h1>
        <Suspense>
          <AccountTabs />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
