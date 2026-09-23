import Link from 'next/link';

/** Hinglish prompt for practice owners, linking through to Partner With Us. */
export default function PartnerCta() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-lg">
      <div className="p-6 sm:p-7 rounded-2xl border border-[#F9C6C9] bg-[#FFF1F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-headline-h3 font-headline-h3 text-on-surface">Doctor ya clinic owner ho?</p>
          <p className="text-body-default font-body-default text-on-surface-variant">Apni practice grow karo Curxx Pro ke saath.</p>
        </div>
        <Link href="/partner-with-us" className="inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong transition whitespace-nowrap">
          Partner With Us
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
