'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterPillSheet from '@/components/FilterPillSheet';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Facet, Facility, FacilityQuery } from '@/lib/api';

const DEPARTMENTS = ['Cardiology', 'Neurology', 'Orthopaedics', 'Paediatrics', 'Obstetrics & Gynaecology', 'Dermatology', 'ENT', 'Ophthalmology', 'Gastroenterology', 'General Medicine', 'Psychiatry', 'Dental'];
const SORTS = [
  { value: 'distance', label: 'Distance' },
  { value: 'rating', label: 'Rating (highest first)' },
  { value: 'reviews', label: 'Most reviewed' },
];
const AMENITY_ICON: Record<string, string> = {
  '24x7 Pharmacy': 'medication', 'Cashless Insurance Desk': 'credit_card', 'Ambulance Service': 'ambulance', 'Digital Reports': 'description',
  'Wheelchair Accessible': 'accessible', 'Car Parking': 'local_parking', Cafeteria: 'restaurant', 'Online Payments': 'payments', 'Air-conditioned Waiting': 'ac_unit',
};

const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

type Props = {
  type: 'hospital' | 'clinic';
  items: Facility[];
  total: number;
  page: number;
  pages: number;
  areas: Facet[];
  query: FacilityQuery;
};

export function FacilityCard({ f }: { f: Facility }) {
  const open24 = f.openHours.toLowerCase().includes('24');
  return (
    <article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150">
      <div className="flex flex-col md:flex-row gap-5">
        <Link href={`/clinic/${f.slug}`} className="relative w-full md:w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[#FAFAF9] border border-[#E7E5E4] block">
          {f.photoUrl && <img loading="lazy" decoding="async" alt={`${f.name} exterior`} className="w-full h-full object-cover" src={`${f.photoUrl}=w480`} />}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {f.nabh && (
              <span className="inline-flex items-center gap-0.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-1.5 py-0.5 rounded shadow-xs"><span className="material-symbols-outlined text-[12px]">shield</span>NABH</span>
            )}
            {f.emergency24x7 && (
              <span className="inline-flex items-center gap-0.5 bg-[#EE1C25] text-white text-micro font-micro px-1.5 py-0.5 rounded shadow-xs"><span className="material-symbols-outlined text-[12px]">emergency</span>24x7</span>
            )}
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface"><Link href={`/clinic/${f.slug}`} className="hover:text-primary transition-colors">{f.name}</Link></h2>
                  <span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-2 py-0.5 rounded-full"><span className="material-symbols-outlined text-[13px]">verified</span>Verified</span>
                </div>
                <p className="text-caption-strong font-caption-strong text-outline mt-0.5">{f.tagline} · {f.area} ({f.distanceKm} km)</p>
              </div>
              <div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface shrink-0">
                <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{f.rating}</span>
                <span className="text-outline font-caption">({f.reviewCount.toLocaleString('en-IN')} reviews)</span>
              </div>
            </div>
            <p className="text-caption font-caption text-on-surface-variant flex items-start gap-1 mt-2">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0">pin_drop</span>{f.address}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className={`inline-flex items-center gap-1 font-caption-strong text-micro px-2 py-1 rounded-md ${open24 ? 'bg-[#ECFDF5] text-[#047857]' : 'bg-[#FAFAF9] border border-[#E7E5E4] text-on-surface'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${open24 ? 'bg-[#047857]' : 'bg-outline'}`}></span>{f.openHours}
              </span>
              {f.amenities.slice(0, 4).map((a) => (
                <span key={a} className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[14px]">{AMENITY_ICON[a] ?? 'check'}</span>{a}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-[#E7E5E4]">
            <p className="text-caption font-caption text-on-surface-variant">
              <span className="text-caption-strong font-caption-strong text-primary">{f.doctorCount ?? 0} {f.doctorCount === 1 ? 'doctor' : 'doctors'}</span> bookable on Curxx · {f.departments.slice(0, 3).join(', ')}{f.departments.length > 3 ? ` +${f.departments.length - 3}` : ''}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <a href={mapsUrl(`${f.name} ${f.address}`)} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-outline">directions</span>Directions
              </a>
              <Link href={`/clinic/${f.slug}`} className="px-4 py-2 bg-primary-container text-white rounded-lg text-caption-strong font-caption-strong hover:bg-primary shadow-xs">
                View {f.type === 'hospital' ? 'hospital' : 'clinic'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ClinicsListing({ type, items, total, page, pages, areas, query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const label = type === 'hospital' ? 'Hospitals' : 'Clinics';

  function update(mutate: (p: URLSearchParams) => void, keepPage = false) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    if (!keepPage) next.delete('page');
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: keepPage });
  }
  const toggle = (key: string, value: string) => update((p) => (p.get(key) === value ? p.delete(key) : p.set(key, value)));
  const clear = () => router.replace(pathname, { scroll: false });

  const chips = [
    query.emergency && { key: 'emergency', label: '24x7 emergency' },
    query.area && { key: 'area', label: query.area },
    query.department && { key: 'department', label: query.department },
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
        <span className="sr-only">Search {label.toLowerCase()}</span>
        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline">search</span>
        <input key={query.q ?? ''} name="q" defaultValue={query.q} placeholder={`Search ${label.toLowerCase()}`} className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#E7E5E4] bg-white text-caption font-caption outline-none focus:border-primary-container" />
      </form>
      <label className="flex items-center justify-between gap-3 cursor-pointer">
        <span className="font-caption-strong text-caption-strong text-on-surface">24x7 emergency only</span>
        <input type="checkbox" checked={Boolean(query.emergency)} onChange={() => toggle('emergency', 'true')} className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F]" />
      </label>
      <div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
        <span className="font-caption-strong text-caption-strong text-on-surface block">Department</span>
        <div className="space-y-1.5 text-caption font-caption text-on-surface">
          {DEPARTMENTS.map((d) => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={query.department === d} onChange={() => toggle('department', d)} className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" />{d}
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
            <Link href="/bangalore/specialties" className="hover:text-primary">Bangalore</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-caption-strong text-caption-strong text-on-surface">{label}</span>
          </nav>
          <div className="hidden sm:flex items-center gap-2 text-micro font-micro text-tertiary bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px]">verified</span><span>Verified directory · ABDM-linked records</span>
          </div>
        </div>
      </div>
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-margin sm:px-margin-desktop py-space-base pb-28 lg:pb-space-base">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 gap-4 border-b border-[#E7E5E4]">
          <div>
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface tracking-tight">{label} in Bangalore</h1>
            <p className="text-caption font-caption text-on-surface-variant mt-1">{total} verified {total === 1 ? label.toLowerCase().replace(/s$/, '') : label.toLowerCase()} · sorted by {SORTS.find((s) => s.value === (query.sort ?? 'distance'))!.label.toLowerCase()}</p>
            <div className="flex gap-2 mt-3">
              {(['hospital', 'clinic'] as const).map((t) => (
                <Link key={t} href={t === 'hospital' ? '/bangalore/hospitals' : '/bangalore/clinics'} aria-current={t === type ? 'page' : undefined} className={`px-3 py-1.5 rounded-full border text-caption-strong font-caption-strong transition ${t === type ? 'bg-[#FFF1F2] border-[#F9C6C9] text-[#D92D3A]' : 'bg-[#FAFAF9] border-[#E7E5E4] text-[#78716C] hover:border-outline'}`}>{t === 'hospital' ? 'Hospitals' : 'Clinics'}</Link>
              ))}
            </div>
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
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E7E5E4] bg-surface-container-lowest p-8 text-center">
                <p className="text-body-strong font-body-strong text-on-surface">No {label.toLowerCase()} match these filters</p>
                <button type="button" onClick={clear} className="mt-3 h-10 px-4 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Clear filters</button>
              </div>
            ) : (
              items.map((f) => <FacilityCard key={f.slug} f={f} />)
            )}
            {pages > 1 && (
              <nav aria-label="Pagination" className="flex items-center justify-between pt-4 border-t border-[#E7E5E4]">
                <span className="text-caption font-caption text-outline">Page {page} of {pages}</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <button key={n} type="button" onClick={() => update((p) => (n === 1 ? p.delete('page') : p.set('page', String(n))), true)} aria-current={n === page ? 'page' : undefined} className={n === page ? 'w-9 h-9 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong' : 'w-9 h-9 rounded-lg border border-[#E7E5E4] text-on-surface font-caption-strong text-caption-strong hover:bg-[#FAFAF9]'}>{n}</button>
                  ))}
                </div>
              </nav>
            )}
          </section>

          <aside className="w-full lg:w-[320px] lg:shrink-0 lg:sticky lg:top-20 space-y-4">
            <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary-container">map</span><h3 className="font-headline-h3 text-headline-h3 text-on-surface">On the map</h3></div>
              <p className="text-caption font-caption text-on-surface-variant">See every {type} near you with live traffic and directions.</p>
              <a href={mapsUrl(`${label} near Indiranagar Bengaluru`)} target="_blank" rel="noopener noreferrer" className="w-full py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center justify-center gap-1.5">
                View on Google Maps<span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
            </div>
            <div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[24px] text-[#EE1C25]">e911_emergency</span>
                <span className="font-headline-h3 text-headline-h3 text-[#1C1917]">Need emergency care?</span>
              </div>
              <p className="text-caption font-caption text-on-surface-variant leading-relaxed mb-4">For chest pain, breathlessness, injury or loss of consciousness, call an ambulance first.</p>
              <a className="w-full py-2.5 px-4 bg-[#EE1C25] text-white rounded-lg text-caption-strong font-caption-strong flex items-center justify-center gap-2 hover:bg-[#c9121a]" href="tel:108">
                <span className="material-symbols-outlined text-[20px]">call</span>Call 108 (free)
              </a>
              {type === 'clinic' && <Link href="/bangalore/hospitals?emergency=true" className="block mt-3 text-center text-caption-strong font-caption-strong text-[#8E0E17] underline">24x7 emergency hospitals</Link>}
            </div>
            <div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E7E5E4]"><span className="material-symbols-outlined text-tertiary text-[20px]">health_and_safety</span><h3 className="font-headline-h3 text-headline-h3 text-on-surface">Cashless &amp; ABHA</h3></div>
              <p className="text-caption font-caption text-on-surface-variant">Most listed centres accept Star Health, HDFC ERGO, ICICI Lombard and CGHS. Check each profile for its insurer list, and share your Curxx records with the front desk from your health locker.</p>
              <Link href="/records" className="text-caption-strong font-caption-strong text-primary hover:underline">Open health locker →</Link>
            </div>
          </aside>
        </div>
      </main>
      <FilterPillSheet activeCount={chips.length} total={total} noun={label.toLowerCase()} onClear={clear}>{filters}</FilterPillSheet>
      <Footer />
    </>
  );
}
