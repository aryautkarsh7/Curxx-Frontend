import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

/** Shell for simple content pages (policies, account, uploads). */
export default function StaticPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto py-16 px-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface">{title}</h1>
            {intro && <p className="text-body-default font-body-default text-on-surface-variant">{intro}</p>}
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
