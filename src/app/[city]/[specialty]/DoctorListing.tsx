'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useListingControls } from './useListingControls';
import DoctorCard from '@/components/DoctorCard';
import ListingFilterGroups, { toChips } from '@/components/ListingFilterGroups';
import MobileFilterSheet from '@/components/MobileFilterSheet';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { DoctorList } from '@/lib/api';

export type Crumb = { label: string; href?: string };

type Props = DoctorList & {
  city: string;
  cityName: string;
  /** "Indiranagar, Bengaluru" or "Bengaluru". */
  place: string;
  plural: string;
  heading: string;
  subheading?: string;
  resultsHeading: string;
  breadcrumbs: Crumb[];
  /** Locality pages fix the area, so its filter is hidden. */
  lockedArea?: boolean;
  /** Shown instead of the empty state when this page has no doctors (e.g. a quiet locality). */
  emptyAction?: { href: string; label: string };
  children?: ReactNode;
};

const SUBNAV = 'whitespace-nowrap text-on-surface-variant font-body-default text-body-default pb-1 hover:text-primary transition-colors duration-150';

export default function DoctorListing({ city, cityName, place, plural, heading, subheading, resultsHeading, breadcrumbs, lockedArea, emptyAction, children, doctors, total, pages, facets }: Props) {
  const { page, sort, filters, setParam, setAvailability, setSort, clearFilters, goToPage, openDoctor } = useListingControls();
  const pageNumbers = Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).filter((n) => n <= pages);
  const activeChips = toChips(filters);
  const hide = lockedArea ? (['area'] as const) : undefined;
  return (
    <>
      <Header />
      {/* ==================== SUB-NAV / MAIN LINKS ==================== */}
      <nav aria-label="Sections" className="bg-[#FFFFFF] border-b border-[#E7E5E4]">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop flex items-center justify-between h-11">
          <div className="overflow-x-auto no-scrollbar flex items-center gap-8 text-caption font-caption">
            <Link href={`/${city}/specialties`} className="whitespace-nowrap text-primary border-b-2 border-primary font-body-strong text-body-strong pb-1">Specialties</Link>
            <Link href={`/${city}/doctors`} className={SUBNAV}>Doctors</Link>
            <Link href="/records" className={SUBNAV}>ABHA ID</Link>
            <Link href="/medicines" className={SUBNAV}>Medicines</Link>
            <Link href="/lab-tests" className={SUBNAV}>Diagnostic Tests</Link>
            <Link href={`/${city}/hospitals`} className={SUBNAV}>Hospital Network</Link>
            <Link href={`/${city}/surgeries`} className={SUBNAV}>Surgeries</Link>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-micro font-micro text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 rounded border border-[#A7F3D0]">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span>ABHA &amp; ABDM Integrated Healthcare Facility</span>
          </div>
        </div>
      </nav>
      {/* ==================== BREADCRUMBS & PAGE HEADER ==================== */}
      <section className="bg-[#FAFAF9] border-b border-[#E7E5E4] py-5">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-caption font-caption text-[#78716C] mb-2.5">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <span className="material-symbols-outlined text-[14px]">chevron_right</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-[#1C1917] font-caption-strong">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-headline-h1 text-headline-h1 text-[#1C1917] tracking-tight">{heading}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                <p className="font-caption text-caption text-[#78716C]">{subheading ?? `${total.toLocaleString('en-IN')} verified ${plural.toLowerCase()} available in ${place} · Updated today`}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="font-caption text-caption text-[#78716C]">Sort by:</span>
              <div className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort doctors" className="w-full sm:w-auto appearance-none bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg pl-3 pr-8 py-1.5 font-caption-strong text-caption-strong text-[#1C1917] focus:outline-none focus:border-[#C1121F] cursor-pointer shadow-sm">
                  <option value="relevance">Relevance</option>
                  <option value="soonest">Earliest available</option>
                  <option value="fee_asc">Fee: Low to High</option>
                  <option value="fee_desc">Fee: High to Low</option>
                  <option value="experience">Experience: Most Experienced</option>
                  <option value="rating">Rating: Highest Rated</option>
                </select>
                <span className="material-symbols-outlined text-[16px] text-[#78716C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">unfold_more</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==================== THREE-COLUMN RESULTS LAYOUT ==================== */}
      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-8 pb-28 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_300px] gap-gutter-desktop items-start">
          {/* Filters rail — deliberately not a heading, so it stays out of the page outline. */}
          <aside aria-label="Filters" className="hidden lg:block bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-4 lg:sticky lg:top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <p className="font-headline-h3 text-headline-h3 text-[#1C1917] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#78716C]" aria-hidden="true">tune</span>
                Filters
              </p>
              <button type="button" onClick={clearFilters} className="font-caption-strong text-caption-strong text-[#C1121F] hover:text-[#8E0E17] transition-colors">Clear all</button>
            </div>
            <ListingFilterGroups filters={filters} activeChips={activeChips} setParam={setParam} setAvailability={setAvailability} hide={hide ? [...hide] : undefined} areas={facets?.areas} languages={facets?.languages} />
          </aside>
          {/* Results */}
          <section className="space-y-4 min-w-0" aria-labelledby="results-heading">
            <h2 id="results-heading" className="font-headline-h3 text-headline-h3 text-[#1C1917]">{resultsHeading}</h2>
            {doctors.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-8 text-center shadow-sm flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px] text-[#C1121F]">search_off</span>
                </div>
                <p className="font-headline-h2 text-headline-h2 text-[#1C1917] tracking-tight">
                  {activeChips.length ? `No ${plural.toLowerCase()} match these filters` : `No ${plural.toLowerCase()} listed in ${place} yet`}
                </p>
                <p className="font-body-default text-body-default text-[#5c403d] max-w-[500px] mt-2 leading-relaxed">
                  {activeChips.length ? 'Try clearing a filter or two.' : `We are adding ${plural.toLowerCase()} here. Doctors elsewhere in ${cityName} can see you, and many consult on video.`}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full max-w-[440px]">
                  {activeChips.length > 0 && (
                    <button type="button" onClick={clearFilters} className="w-full h-11 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center gap-2 transition active:scale-95 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>Clear All Filters
                    </button>
                  )}
                  <Link href={emptyAction?.href ?? `/${city}/doctors`} className="w-full h-11 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center gap-2 transition active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">groups</span>{emptyAction?.label ?? `Browse all doctors in ${cityName}`}
                  </Link>
                </div>
              </div>
            ) : (
              doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} nextSlot={doctor.nextSlot ?? null} onOpen={openDoctor(`/doctor/${doctor.slug}`)} />)
            )}
            {pages > 1 && (
              <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-6 pb-2 flex-wrap">
                <button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)} className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg font-caption-strong text-caption text-[#78716C] hover:bg-surface-container transition flex items-center gap-1 disabled:opacity-40">
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  Previous
                </button>
                {pageNumbers.map((n) => (
                  <button key={n} type="button" onClick={() => goToPage(n)} aria-current={page === n ? 'page' : undefined} className={page === n ? 'w-9 h-9 bg-[#C1121F] text-white font-caption-strong text-caption rounded-lg flex items-center justify-center' : 'w-9 h-9 border border-[#E7E5E4] text-[#1C1917] font-caption-strong text-caption rounded-lg hover:bg-surface-container flex items-center justify-center'}>{n}</button>
                ))}
                <button type="button" disabled={page >= pages} onClick={() => goToPage(page + 1)} className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg font-caption-strong text-caption text-[#1C1917] hover:bg-surface-container transition flex items-center gap-1 disabled:opacity-40">
                  Next
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </nav>
            )}
          </section>
          {/* Utilities — plain text labels, not headings, so the outline stays about the doctors. */}
          <aside aria-label="Help choosing" className="space-y-4 lg:hidden xl:block xl:sticky xl:top-24">
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-[#C1121F] mb-3">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <p className="font-headline-h3 text-headline-h3 text-[#1C1917]">Not sure which doctor?</p>
              <p className="font-caption text-caption text-[#78716C] mt-1.5 leading-relaxed">Describe your symptoms and our triage suggests the right specialist in {cityName} in about a minute.</p>
              <Link href="/triage" className="mt-4 w-full h-10 border border-[#C1121F] text-[#C1121F] hover:bg-[#FFF1F2] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center gap-1.5 transition">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                Check your symptoms
              </Link>
            </div>
            <div className="bg-[#FFFFFF] border border-[#F9C6C9] border-t-4 border-t-[#EE1C25] rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[#8E0E17]">
                <span className="material-symbols-outlined text-[20px] text-[#EE1C25]">warning</span>
                <p className="font-headline-h3 text-headline-h3 text-[#1C1917]">Need urgent care?</p>
              </div>
              <p className="font-caption text-caption text-[#78716C] mt-2 leading-relaxed">Chest pain, trouble breathing, heavy bleeding or a severe allergic reaction need emergency care now — don’t wait for an appointment.</p>
              <a className="mt-4 w-full h-10 bg-[#EE1C25] hover:bg-[#C1121F] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center gap-2 transition active:scale-95 shadow-sm" href="tel:108">
                <span className="w-2 h-2 rounded-full bg-white emergency-pulse"></span>
                Call 108 (24x7 Medical)
              </a>
            </div>
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 space-y-3.5">
              <p className="font-caption-strong text-caption-strong text-[#1C1917] tracking-wider uppercase">Curxx Care Shield</p>
              {[
                ['verified', '100% Verified Credentials', 'Every doctor’s State Medical Council registration is checked before they go live.'],
                ['currency_rupee', 'Zero Wait or Full Refund', 'If the doctor misses your slot, rebook free or get your money back.'],
                ['chat', 'Free 7-Day Follow-Up', 'Ask your doctor follow-up questions on chat at no extra cost.'],
              ].map(([icon, title, body]) => (
                <div key={title} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#047857] mt-0.5" style={icon === 'verified' ? { fontVariationSettings: "'FILL' 1" } : undefined}>{icon}</span>
                  <div>
                    <p className="font-caption-strong text-caption-strong text-[#1C1917]">{title}</p>
                    <p className="font-caption text-caption text-[#78716C]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
      {children}
      <MobileFilterSheet filters={filters} activeChips={activeChips} total={total} noun={plural.toLowerCase()} setParam={setParam} setAvailability={setAvailability} clearFilters={clearFilters} hide={hide ? [...hide] : undefined} areas={facets?.areas} languages={facets?.languages} />
      <Footer />
    </>
  );
}
