'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ReportIssue from '@/components/profile/ReportIssue';
import Header from '@/components/Header';
import MedicineCard from '@/components/pharmacy/MedicineCard';
import { rupees, type Medicine, photo } from '@/lib/api';

type Props = {
  medicine: Medicine;
  substitutes: Medicine[];
  similar: Medicine[];
  categoryName: string | null;
};

export default function MedicineDetail({ medicine: m, substitutes, similar, categoryName }: Props) {
  const sections = [
    { id: 'about', label: 'Description' },
    { id: 'uses-side-effects', label: 'Uses & side effects' },
    m.howToUse && { id: 'how-to-use', label: 'How to use' },
    (m.safetyAdvice?.length ?? 0) > 0 && { id: 'safety-advice', label: 'Safety advice' },
    { id: 'substitutes', label: 'Substitutes' },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-base pb-28 lg:pb-space-base">
        <nav aria-label="Breadcrumb" className="mb-space-base">
          <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 text-caption font-caption text-outline">
            <li>
              <Link href="/" className="hover:text-primary transition-colors duration-150">
                Home
              </Link>
            </li>
            <li>
              <span className="text-surface-variant">/</span>
            </li>
            <li>
              <Link href="/medicines" className="hover:text-primary transition-colors duration-150">
                Medicines
              </Link>
            </li>
            {categoryName && (
              <>
                <li>
                  <span className="text-surface-variant">/</span>
                </li>
                <li>
                  <Link
                    href={`/medicines?category=${m.categories[0]}#results`}
                    className="hover:text-primary transition-colors duration-150"
                  >
                    {categoryName}
                  </Link>
                </li>
              </>
            )}
            <li>
              <span className="text-surface-variant">/</span>
            </li>
            <li
              aria-current="page"
              className="font-caption-strong text-caption-strong text-primary truncate max-w-[60vw]"
            >
              {m.name}
            </li>
          </ol>
        </nav>

        {/* PRODUCT HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-2xl items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-base">
            <div className="relative bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg flex flex-col items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[400px]">
              {m.rxRequired && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-micro">
                  <span className="material-symbols-outlined text-[14px]">prescriptions</span>Rx
                  required
                </span>
              )}
              {m.imageUrl ? (
                <img
                  src={photo(m.imageUrl, 900)}
                  alt={m.name}
                  className="max-h-[360px] w-auto object-contain rounded-lg"
                />
              ) : (
                <div className="w-40 h-40 rounded-3xl bg-surface-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[88px]">{m.icon}</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div>
              <span className="font-micro text-micro text-outline tracking-wider block mb-1 uppercase">
                {m.manufacturer} · {m.form}
              </span>
              <h1 className="text-display font-display text-on-surface leading-tight">{m.name}</h1>
              <p className="text-caption font-caption text-on-surface-variant mt-1">
                Composition:{' '}
                <span className="text-on-surface font-caption-strong">{m.composition}</span>
              </p>
              <div className="flex items-center gap-2 mt-2 text-caption font-caption text-on-surface-variant">
                <span className="inline-flex items-center gap-1 text-[#047857] font-caption-strong">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {m.rating}
                </span>
                <span>({m.reviewCount.toLocaleString('en-IN')} ratings)</span>
                <ReportIssue targetType="medicine" slug={m.slug} name={m.name} className="ml-2" />
              </div>
            </div>

            <div>
              <span className="font-caption-strong text-caption-strong text-on-surface block mb-2">
                Pack size
              </span>
              <span className="inline-flex px-3.5 py-2 rounded-lg bg-error-container border border-outline-variant text-primary font-caption-strong text-caption items-center gap-1.5 ring-1 ring-primary-container">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                {m.packSize}
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col gap-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-display font-display text-on-surface">{rupees(m.price)}</span>
                {m.mrp > m.price && (
                  <span className="text-caption font-caption text-outline line-through">
                    MRP {rupees(m.mrp)}
                  </span>
                )}
              </div>
              <p className="font-micro text-micro text-outline">
                For information only. The price at a pharmacy may differ.
              </p>
            </div>

            {m.rxRequired && (
              <div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFE4E6] flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">medical_information</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-body-strong text-body-strong text-[#8E0E17]">
                    Prescription medicine
                  </h2>
                  <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                    Take it only as prescribed by your doctor.
                  </p>
                </div>
              </div>
            )}

            <div className="hidden lg:flex flex-col gap-3 pt-1">
              <a
                href="#uses-side-effects"
                className="w-full h-12 bg-primary-container text-on-primary rounded-lg font-body-strong text-body-strong flex items-center justify-center gap-2 hover:bg-[#8E0E17] transition-all duration-150 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">medication</span>
                Check Uses &amp; Side Effects
              </a>
            </div>
          </div>
        </section>

        {/* SUB-NAVIGATION */}
        <nav
          aria-label="On this page"
          className="sticky top-16 z-30 bg-surface border-b border-surface-variant mb-space-xl -mx-margin sm:-mx-margin-desktop px-margin sm:px-margin-desktop"
        >
          <div className="max-w-[1200px] mx-auto flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-1 whitespace-nowrap transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-space-xl">
          <section
            id="about"
            className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32"
          >
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">About {m.name}</h2>
            <p className="text-body-default font-body-default text-on-surface-variant mt-2 leading-relaxed max-w-4xl">
              {m.description}
            </p>
          </section>

          {/* Only the medicine's own data: nothing is written here when a field is missing. */}
          <section
            id="uses-side-effects"
            className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32 space-y-6"
          >
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
              Uses &amp; Side Effects of {m.name}
            </h2>
            <div>
              <h3 className="text-headline-h3 font-headline-h3 text-on-surface">Uses</h3>
              {(m.uses?.length ?? 0) > 0 ? (
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {m.uses!.map((u) => (
                    <li
                      key={u}
                      className="flex items-start gap-2 text-body-default font-body-default text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5">
                        check_circle
                      </span>
                      {u}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-body-default font-body-default text-on-surface-variant">
                  Information not available yet
                </p>
              )}
            </div>
            <div>
              <h3 className="text-headline-h3 font-headline-h3 text-on-surface">Side effects</h3>
              {(m.sideEffects?.length ?? 0) > 0 ? (
                <>
                  <p className="text-caption font-caption text-on-surface-variant mt-1">
                    Most are mild and settle as your body adjusts. Contact your doctor if they
                    persist or worsen.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {m.sideEffects!.map((e) => (
                      <span
                        key={e}
                        className="px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-variant text-caption-strong font-caption-strong text-on-surface"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="mt-2 text-body-default font-body-default text-on-surface-variant">
                  Information not available yet
                </p>
              )}
            </div>
          </section>

          {m.howToUse && (
            <section
              id="how-to-use"
              className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32"
            >
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">How to use</h2>
              <p className="text-body-default font-body-default text-on-surface-variant mt-2 leading-relaxed max-w-4xl">
                {m.howToUse}
              </p>
              {m.storage && (
                <p className="text-caption font-caption text-outline mt-3">Storage: {m.storage}</p>
              )}
            </section>
          )}

          {(m.safetyAdvice?.length ?? 0) > 0 && (
            <section
              id="safety-advice"
              className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32"
            >
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Safety advice</h2>
              <ul className="mt-3 space-y-2">
                {m.safetyAdvice!.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-body-default font-body-default text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#B45309] mt-0.5">
                      warning
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section
            id="substitutes"
            className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32"
          >
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
              Substitute medicines
            </h2>
            <p className="text-caption font-caption text-on-surface-variant mt-1">
              Same composition, strength and form. Always check with your doctor or pharmacist
              before switching.
            </p>
            {substitutes.length === 0 ? (
              <p className="text-body-default font-body-default text-on-surface-variant mt-3">
                No other medicine with this exact composition is listed.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-surface-variant border border-surface-variant rounded-lg">
                {substitutes.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/medicines/${s.slug}`}
                    className="flex items-center justify-between gap-3 p-3 hover:bg-surface-container-low"
                  >
                    <div className="min-w-0">
                      <p className="font-body-strong text-body-strong text-on-surface truncate">
                        {s.name}
                      </p>
                      <p className="font-caption text-caption text-outline truncate">
                        {s.manufacturer}
                      </p>
                    </div>
                    <span className="font-body-strong text-body-strong text-on-surface shrink-0">
                      {rupees(s.price)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {similar.length > 0 && (
            <section className="space-y-space-base">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
                Related medicines in {categoryName ?? 'this category'}
              </h2>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-space-base">
                {similar.slice(0, 4).map((s) => (
                  <MedicineCard key={s.slug} medicine={s} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile sticky action bar */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-surface-container-lowest border-t border-surface-variant px-4 py-3 flex items-center gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="min-w-0">
          <p className="font-headline-h3 text-headline-h3 text-on-surface">{rupees(m.price)}</p>
          {m.mrp > m.price && (
            <p className="font-micro text-micro text-outline line-through">MRP {rupees(m.mrp)}</p>
          )}
        </div>
        <a
          href="#uses-side-effects"
          className="flex-1 h-11 bg-primary-container text-on-primary rounded-lg font-body-strong text-body-strong flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">medication</span>
          Check Uses &amp; Side Effects
        </a>
      </div>
      <Footer />
    </>
  );
}
