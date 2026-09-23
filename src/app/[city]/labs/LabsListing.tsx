'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FilterPillSheet from '@/components/FilterPillSheet';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LabCard from '@/components/labs/LabCard';
import type { Facet, LabDirectoryQuery, LabSummary, Near } from '@/lib/api';
import { useCart } from '@/lib/cart';

const SORTS = [
  { value: 'distance', label: 'Nearest first' },
  { value: 'rating', label: 'Rating (highest first)' },
  { value: 'reviews', label: 'Most reviewed' },
];
const ACCREDITATION_HINT: Record<string, string> = {
  NABL: 'National Accreditation Board for Testing & Calibration Laboratories',
  CAP: 'College of American Pathologists',
  'ISO 15189': 'International standard for medical laboratories',
};

type Props = {
  items: LabSummary[];
  total: number;
  near: Near;
  areas: Facet[];
  accreditations: Facet[];
  tests: { slug: string; name: string; kind: string }[];
  query: LabDirectoryQuery;
  failed: boolean;
};

export default function LabsListing({ items, total, near, areas, accreditations, tests, query, failed }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const cart = useCart('lab');
  const [pincode, setPincode] = useState(query.pincode ?? '');
  const [pincodeError, setPincodeError] = useState('');
  const testName = tests.find((t) => t.slug === query.test)?.name;

  function update(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }
  const toggle = (key: string, value: string) => update((p) => (p.get(key) === value ? p.delete(key) : p.set(key, value)));
  // Clearing filters keeps the location: it isn't a filter.
  const clear = () => router.replace(query.pincode ? `${pathname}?pincode=${query.pincode}` : pathname, { scroll: false });

  function changeLocation(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[1-9]\d{5}$/.test(pincode)) return setPincodeError('Enter a 6-digit pincode');
    if (!pincode.startsWith('560')) return setPincodeError('We list labs in Bengaluru (560xxx) for now');
    setPincodeError('');
    update((p) => p.set('pincode', pincode));
  }

  const chips = [
    query.homeCollection && { key: 'homeCollection', label: 'Collects at my address' },
    query.walkIn && { key: 'walkIn', label: 'Walk-in' },
    query.accreditation && { key: 'accreditation', label: query.accreditation },
    query.test && { key: 'test', label: testName ?? query.test },
    query.area && { key: 'area', label: query.area },
    query.q && { key: 'q', label: `“${query.q}”` },
  ].filter(Boolean) as { key: string; label: string }[];

  const filters = (
    <div className="space-y-5">
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-3 border-b border-[#E7E5E4]">
          {chips.map((c) => (
            <button key={c.key} type="button" onClick={() => update((p) => p.delete(c.key))} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] font-micro text-micro text-[#8E0E17]">
              {c.label}<span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          ))}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); const q = String(new FormData(e.currentTarget).get('q') ?? '').trim(); update((p) => (q ? p.set('q', q) : p.delete('q'))); }} className="relative">
        <span className="sr-only">Search labs</span>
        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline">search</span>
        <input key={query.q ?? ''} name="q" defaultValue={query.q} placeholder="Search labs or areas" className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#E7E5E4] bg-white text-caption font-caption outline-none focus:border-primary-container" />
      </form>
      <div className="space-y-2.5">
        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <span className="font-caption-strong text-caption-strong text-on-surface">Collects at my address</span>
          <input type="checkbox" checked={Boolean(query.homeCollection)} onChange={() => toggle('homeCollection', 'true')} className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F]" />
        </label>
        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <span className="font-caption-strong text-caption-strong text-on-surface">Takes walk-ins</span>
          <input type="checkbox" checked={Boolean(query.walkIn)} onChange={() => toggle('walkIn', 'true')} className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F]" />
        </label>
      </div>
      <label className="block space-y-2 pt-2 border-t border-[#E7E5E4]">
        <span className="font-caption-strong text-caption-strong text-on-surface block">Runs this test</span>
        <span className="relative block">
          <select value={query.test ?? ''} onChange={(e) => update((p) => (e.target.value ? p.set('test', e.target.value) : p.delete('test')))} className="w-full appearance-none bg-white border border-[#E7E5E4] rounded-lg text-caption font-caption text-on-surface pl-3 pr-8 h-10 cursor-pointer">
            <option value="">Any test</option>
            <optgroup label="Packages">{tests.filter((t) => t.kind === 'package').map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</optgroup>
            <optgroup label="Individual tests">{tests.filter((t) => t.kind !== 'package').map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</optgroup>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">expand_more</span>
        </span>
      </label>
      <div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
        <span className="font-caption-strong text-caption-strong text-on-surface block">Accreditation</span>
        <div className="space-y-1.5 text-caption font-caption text-on-surface">
          {accreditations.map((a) => (
            <label key={a.value} className="flex items-center justify-between gap-2 cursor-pointer" title={ACCREDITATION_HINT[a.value]}>
              <span className="flex items-center gap-2.5"><input type="checkbox" checked={query.accreditation === a.value} onChange={() => toggle('accreditation', a.value)} className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" />{a.value}</span>
              <span className="text-micro text-outline">{a.count}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
        <span className="font-caption-strong text-caption-strong text-on-surface block">Locality</span>
        <div className="space-y-1.5 text-caption font-caption text-on-surface">
          {areas.map((a) => (
            <label key={a.value} className="flex items-center justify-between gap-2 cursor-pointer">
              <span className="flex items-center gap-2.5"><input type="checkbox" checked={query.area === a.value} onChange={() => toggle('area', a.value)} className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" />{a.value}</span>
              <span className="text-micro text-outline">{a.count}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="bg-surface border-b border-[#E7E5E4] py-2.5">
        <div className="w-full max-w-[1440px] mx-auto px-margin sm:px-margin-desktop flex items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption font-caption text-outline">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href="/lab-tests" className="hover:text-primary">Lab tests</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-caption-strong text-caption-strong text-on-surface">Labs in Bangalore</span>
          </nav>
          <div className="hidden sm:flex items-center gap-2 text-micro font-micro text-tertiary bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px]">verified</span><span>Every lab NABL accredited · pathologist-signed reports</span>
          </div>
        </div>
      </div>
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-margin sm:px-margin-desktop py-space-base pb-28 lg:pb-space-base">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 gap-4 border-b border-[#E7E5E4]">
          <div className="min-w-0">
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface tracking-tight">{testName ? `Labs for ${testName}` : 'Diagnostic labs in Bangalore'}</h1>
            <p className="text-caption font-caption text-on-surface-variant mt-1">
              {total} partner {total === 1 ? 'lab' : 'labs'} near <span className="font-caption-strong text-on-surface">{near.area} ({near.pincode})</span> · {SORTS.find((s) => s.value === (query.sort ?? 'distance'))!.label.toLowerCase()}
            </p>
            <form onSubmit={changeLocation} className="mt-3 flex items-start gap-2">
              <label className="relative">
                <span className="sr-only">Your pincode</span>
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline">my_location</span>
                <input value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="Your pincode" aria-invalid={Boolean(pincodeError)} className="w-40 h-10 pl-9 pr-3 rounded-lg border border-[#E7E5E4] bg-white text-caption font-caption tabular-nums outline-none focus:border-primary-container" />
              </label>
              <button type="submit" className="h-10 px-4 rounded-lg border border-[#E7E5E4] bg-white text-caption-strong font-caption-strong text-on-surface hover:border-outline">Update</button>
            </form>
            {pincodeError && <p role="alert" className="mt-1 font-caption text-caption text-[#8E0E17]">{pincodeError}</p>}
          </div>
          <label className="flex items-center gap-3">
            <span className="text-caption font-caption text-outline">Sort by:</span>
            <span className="relative">
              <select value={query.sort ?? 'distance'} onChange={(e) => update((p) => (e.target.value === 'distance' ? p.delete('sort') : p.set('sort', e.target.value)))} className="appearance-none bg-surface-container-lowest border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface pl-3.5 pr-8 py-2 cursor-pointer shadow-sm">
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">unfold_more</span>
            </span>
          </label>
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter-desktop mt-6 items-start">
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-20 bg-surface-container-lowest border border-[#E7E5E4] rounded-xl p-5 shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-1.5 font-headline-h3 text-headline-h3 text-on-surface"><span className="material-symbols-outlined text-outline text-[18px]">tune</span>Filters</div>
              <button type="button" onClick={clear} className="font-caption-strong text-caption-strong text-[#C1121F]">Clear all</button>
            </div>
            {filters}
          </aside>

          <section className="flex-1 min-w-0 space-y-4 w-full">
            {cart.hydrated && cart.count > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FFF1F2] border border-[#F9C6C9]">
                <p className="flex items-start gap-2 font-caption text-caption text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary-container">science</span>
                  <span><span className="block font-caption-strong text-caption-strong text-on-surface">{cart.count} {cart.count === 1 ? 'test' : 'tests'} in your booking</span>We&apos;ll assign the nearest lab to your address — or pick one here and book at that lab.</span>
                </p>
                <Link href="/lab-tests/book" className="h-10 px-4 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong inline-flex items-center justify-center gap-1 shrink-0">Continue booking<span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
              </div>
            )}
            {failed ? (
              <div role="alert" className="rounded-2xl border border-[#F9C6C9] bg-[#FFF1F2] p-6 text-center">
                <p className="text-body-strong font-body-strong text-[#8E0E17]">We couldn&apos;t load labs right now</p>
                <button type="button" onClick={() => router.refresh()} className="mt-3 h-10 px-4 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Try again</button>
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E7E5E4] bg-surface-container-lowest p-8 text-center">
                <p className="text-body-strong font-body-strong text-on-surface">No labs match these filters</p>
                <p className="text-caption font-caption text-on-surface-variant mt-1">{query.homeCollection ? 'No lab collects at this pincode with these filters — try a lab visit instead.' : 'Try removing a filter.'}</p>
                <button type="button" onClick={clear} className="mt-3 h-10 px-4 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Clear filters</button>
              </div>
            ) : (
              items.map((lab) => <LabCard key={lab.slug} lab={lab} testName={testName} />)
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E7E5E4]"><span className="material-symbols-outlined text-primary-container text-[20px]">route</span><h3 className="font-headline-h3 text-headline-h3 text-on-surface">How lab booking works</h3></div>
                <ol className="space-y-3 text-caption font-caption text-on-surface-variant">
                  {[
                    ['Pick your tests', 'Same price at every partner lab.'],
                    ['Home visit or walk in', 'We assign the nearest lab that collects at your pincode, or you choose a lab to visit.'],
                    ['Report in your locker', 'Signed by the lab’s pathologist, filed to your Curxx health records.'],
                  ].map(([title, body], i) => (
                    <li key={title} className="flex gap-3">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-[#FFF1F2] text-primary-container font-caption-strong text-micro flex items-center justify-center">{i + 1}</span>
                      <span><span className="block font-caption-strong text-on-surface">{title}</span>{body}</span>
                    </li>
                  ))}
                </ol>
                <Link href="/lab-tests" className="w-full h-10 rounded-lg border border-[#E7E5E4] text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center justify-center">Browse lab tests</Link>
              </div>
              <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E7E5E4]"><span className="material-symbols-outlined text-tertiary text-[20px]">verified</span><h3 className="font-headline-h3 text-headline-h3 text-on-surface">What the badges mean</h3></div>
                <dl className="space-y-2 text-caption font-caption text-on-surface-variant">
                  {Object.entries(ACCREDITATION_HINT).map(([k, v]) => (
                    <div key={k}><dt className="inline font-caption-strong text-on-surface">{k}: </dt><dd className="inline">{v}</dd></div>
                  ))}
                </dl>
                <p className="text-caption font-caption text-on-surface-variant">Reference labs run every test in-house; diagnostic centres run routine panels and send specialised assays to a reference lab the same day.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FilterPillSheet activeCount={chips.length} total={total} noun="labs" onClear={clear}>{filters}</FilterPillSheet>
      <Footer />
    </>
  );
}
