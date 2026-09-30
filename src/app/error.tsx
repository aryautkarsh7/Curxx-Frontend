'use client';

import Link from 'next/link';

/**
 * A page that couldn't load, e.g. a doctor profile while the doctor directory is being refreshed (the
 * API answers 503). Cached pages keep being served; this only shows when there's no good copy to fall back on.
 */
export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="flex-1 bg-surface-container-lowest">
      <div className="w-full max-w-[720px] mx-auto px-margin sm:px-margin-desktop py-16">
        <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-8 text-center shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px] text-[#C1121F]">cloud_off</span>
          </div>
          <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917] tracking-tight">This page is temporarily unavailable</h1>
          <p className="font-body-default text-body-default text-[#5c403d] max-w-[500px] mt-2">We&apos;re refreshing our directory. Please try again in a few minutes.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <button type="button" onClick={() => retry()} className="h-11 px-5 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg inline-flex items-center gap-2 transition">
              <span className="material-symbols-outlined text-[18px]">refresh</span>Try again
            </button>
            <Link href="/" className="h-11 px-5 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg inline-flex items-center gap-2 transition">
              <span className="material-symbols-outlined text-[18px]">home</span>Back to the homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
