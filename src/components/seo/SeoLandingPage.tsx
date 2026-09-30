import Link from 'next/link';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SeoBody, SeoIntro } from '@/components/seo/SeoContent';
import { JsonLd } from '@/lib/seo';
import type { SeoPage } from '@/lib/seo-content';

type Crumb = { label: string; href?: string };

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Crumb[] }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href ? { item: c.href } : {}) })),
        }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-caption font-caption text-[#78716C]">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.label} className="flex items-center gap-1.5">
            {i > 0 && <span className="material-symbols-outlined text-[14px]">chevron_right</span>}
            {crumb.href ? <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link> : <span className="text-[#1C1917] font-caption-strong">{crumb.label}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}

/** A content page built from a template (India pages): H1, template copy, tables, FAQs, then extras. */
export default function SeoLandingPage({ page, breadcrumbs, children }: { page: SeoPage; breadcrumbs: Crumb[]; children?: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-lowest">
        <section className="bg-[#FAFAF9] border-b border-[#E7E5E4] py-6">
          <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-2">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h1 className="font-headline-h1 text-headline-h1 text-[#1C1917] tracking-tight">{page.h1}</h1>
            <p className="flex items-center gap-2 font-caption text-caption text-[#78716C]">
              <span className="w-2 h-2 rounded-full bg-[#047857]" aria-hidden="true"></span>
              {page.subline}
            </p>
            <SeoIntro page={page} className="pt-4" />
          </div>
        </section>
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-10 space-y-10">
          <SeoBody page={page} />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

/** A template page with nobody listed yet: a clean empty state instead of empty tables and zero counts. */
export function EmptyLandingPage({ heading, message, action, breadcrumbs }: { heading: string; message: string; action: { href: string; label: string }; breadcrumbs: Crumb[] }) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-lowest">
        <section className="bg-[#FAFAF9] border-b border-[#E7E5E4] py-6">
          <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-2">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h1 className="font-headline-h1 text-headline-h1 text-[#1C1917] tracking-tight">{heading}</h1>
          </div>
        </section>
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-10">
          <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-8 text-center shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px] text-[#C1121F]">search_off</span>
            </div>
            <p className="font-headline-h2 text-headline-h2 text-[#1C1917] tracking-tight">{message}</p>
            <p className="font-body-default text-body-default text-[#5c403d] max-w-[500px] mt-2">We&apos;re adding doctors to Curxx. Meanwhile, you can see the doctors listed elsewhere.</p>
            <Link href={action.href} className="mt-6 h-11 px-5 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg inline-flex items-center gap-2 transition">
              <span className="material-symbols-outlined text-[18px]">groups</span>{action.label}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** A plain grid of internal links under a heading. */
export function LinkGrid({ heading, links }: { heading: string; links: { text: string; href: string }[] }) {
  if (!links.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 text-caption font-caption">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="text-[#78716C] hover:text-[#C1121F] transition-colors">{l.text}</Link>
        ))}
      </div>
    </section>
  );
}
