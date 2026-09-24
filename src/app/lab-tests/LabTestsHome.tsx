'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { useEmergency } from '@/components/EmergencyModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LabMiniCard } from '@/components/labs/LabCard';
import LabTestCard from '@/components/labs/LabTestCard';
import { api, type Address, type LabCategory, type LabQuery, type LabSummary, type LabTest, type Near, type Paged } from '@/lib/api';
import { useCart } from '@/lib/cart';
import { getToken, useSession } from '@/lib/session';

const TRENDING_SEARCHES = [
  { label: 'CBC Test', q: 'CBC' },
  { label: 'HbA1c', q: 'HbA1c' },
  { label: 'Lipid Profile', q: 'Lipid' },
  { label: 'Thyroid T3/T4/TSH', q: 'Thyroid' },
];

const SYMPTOMS = [
  { label: 'Fatigue & Weakness', icon: 'bolt', category: 'vitamin-d-b12' },
  { label: 'Joint Pain', icon: 'accessibility_new', category: 'vitamin-d-b12' },
  { label: 'Hairfall', icon: 'content_cut', category: 'thyroid' },
  { label: 'Unexplained Weight Gain', icon: 'monitor_weight', category: 'thyroid' },
  { label: 'Chest Discomfort', icon: 'ecg_heart', category: 'heart-health', emergency: true },
  { label: 'Frequent Urination', icon: 'water_drop', category: 'diabetes' },
  { label: 'Digestive Issues', icon: 'save_as', category: 'liver-function' },
  { label: 'Fever', icon: 'thermostat', category: 'fever-infections' },
];

const SORTS = [
  { value: 'popular', label: 'Most booked' },
  { value: 'discount', label: 'Biggest discount' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
];

const SYMPTOM_CHIP = 'flex items-center space-x-2 px-4 py-2 rounded-full border border-surface-variant bg-surface-container-lowest text-on-surface hover:border-outline hover:bg-surface-container-low transition-colors duration-150';

const categoryHref = (slug: string) => `/lab-tests?category=${slug}#packages`;

type Props = { categories: LabCategory[]; results: Paged<LabTest>; query: LabQuery; labs: { items: LabSummary[]; total: number; near: Near } | null };

export default function LabTestsHome({ categories, results, query, labs }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const emergency = useEmergency();
  const session = useSession();
  const labCart = useCart('lab');
  const [address, setAddress] = useState<Address | null>(null);
  const activeCategory = categories.find((c) => c.slug === query.category);
  const filterLabel = activeCategory ? activeCategory.name : query.q ? `“${query.q}”` : null;

  useEffect(() => {
    const token = getToken();
    if (!session.signedIn || !token) return setAddress(null);
    api.addresses(token).then(({ addresses }) => setAddress(addresses.find((a) => a.isDefault) ?? addresses[0] ?? null)).catch(() => {});
  }, [session.signedIn]);

  function update(mutate: (p: URLSearchParams) => void, keepPage = false) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    if (!keepPage) next.delete('page');
    const qs = next.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}#packages`, { scroll: false });
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get('q') ?? '').trim();
    update((p) => (q ? p.set('q', q) : p.delete('q')));
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  }

  const count = (c: LabCategory) => [c.packages && `${c.packages} ${c.packages === 1 ? 'package' : 'packages'}`, c.tests && `${c.tests} ${c.tests === 1 ? 'test' : 'tests'}`].filter(Boolean).join(' · ') || 'Coming soon';

  return (
    <>
<Header />
{/* SUB-HEADER SAMPLE COLLECTION BAR */}
<div className="w-full bg-surface-container-low border-b border-surface-variant py-2.5">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
<div className="flex items-center gap-2 text-on-surface min-w-0">
<span className="material-symbols-outlined text-primary text-[20px]">home_pin</span>
<span className="text-caption font-caption text-on-surface-variant">Sample collection at:</span>
<span className="text-caption-strong font-caption-strong text-on-surface truncate">{address ? `${address.pincode}, ${address.area || address.city || 'Bengaluru'}` : 'Bengaluru'}</span>
<Link href="/account?tab=addresses" className="text-caption-strong font-caption-strong text-primary hover:underline ml-1 shrink-0">{address ? 'Change' : 'Add address'}</Link>
</div>
<div className="flex items-center gap-2 sm:gap-4">
<Link href="/labs" className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px] text-primary">location_on</span>Labs near you
</Link>
<span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full hidden md:flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">timer</span>
<span>Free home collection · most reports in 6h</span>
</span>
<Link href="/lab-tests/book" className="flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors py-1 px-2.5 rounded-lg border border-surface-variant bg-surface-container-lowest">
<span className="material-symbols-outlined text-[18px]">shopping_bag</span>
<span className="text-caption-strong font-caption-strong">Booking</span>
<span className="bg-primary text-white text-micro font-micro px-1.5 rounded-full ml-1 tabular-nums">{labCart.count}</span>
</Link>
</div>
</div>
</div>
{/* HERO SECTION (TWO-COLUMN) */}
<section className="py-space-2xl bg-surface-container-lowest border-b border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
{/* Left Column: Copy & Search */}
<div className="lg:col-span-7 flex flex-col space-y-5">
<div className="inline-flex items-center space-x-2 bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full w-max">
<span className="material-symbols-outlined text-[#047857] text-[16px]" data-icon="verified_user">verified_user</span>
<span className="text-micro font-micro text-[#047857] tracking-wider uppercase">NABL &amp; CAP ACCREDITED NETWORK</span>
</div>
<h1 className="text-display font-display text-on-surface tracking-tight leading-tight">
          Lab tests at home, reports in <span className="text-primary">6 hours</span>
</h1>
<p className="text-body-default font-body-default text-on-surface-variant max-w-xl">
          Most routine tests are reported in 6 hours and full-body packages within 24 hours. Certified phlebotomists, temperature-controlled sample logistics, and digital reports signed by MD pathologists.
        </p>
{/* Search Input Bar */}
<div className="pt-2">
<form role="search" onSubmit={handleSearch} className="relative flex items-center rounded-lg border border-surface-variant bg-white p-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-sm">
<span className="material-symbols-outlined text-[22px] text-on-surface-variant ml-3 mr-2" data-icon="search">search</span>
<input key={query.q ?? ''} name="q" defaultValue={query.q} aria-label="Search lab tests" className="w-full bg-transparent border-0 text-body-default font-body-default text-on-surface placeholder:text-on-surface-variant/70 focus:ring-0 focus:outline-none py-2" placeholder="Search tests, packages or a parameter like HbA1c" type="text"/>
<button type="submit" className="bg-[#C1121F] hover:bg-[#8E0E17] text-white px-6 py-2.5 rounded-lg text-body-strong font-body-strong transition-colors duration-150 shrink-0">
              Search
            </button>
</form>
<div className="flex items-center space-x-2 mt-3 text-micro font-micro text-on-surface-variant">
<span className="font-caption-strong text-on-surface">Trending Searches:</span>
{TRENDING_SEARCHES.map((t, i) => (
<span key={t.q} className="contents">
{i > 0 && <span>•</span>}
<Link className="underline hover:text-primary" href={`/lab-tests?q=${encodeURIComponent(t.q)}#packages`}>{t.label}</Link>
</span>
))}
</div>
</div>
</div>
{/* Right Column: Medical Illustration / Badge Card */}
<div className="lg:col-span-5">
<div className="relative rounded-xl border border-surface-variant bg-surface-container-low p-6 overflow-hidden">
<div className="flex items-center justify-between mb-4 border-b border-surface-variant pb-3">
<div className="flex items-center space-x-2">
<span className="w-3 h-3 rounded-full bg-emerald-500"></span>
<span className="text-caption-strong font-caption-strong text-on-surface">Precision Logistics Active</span>
</div>
<span className="text-micro font-micro text-on-surface-variant">Standard Operating Protocol 9.4</span>
</div>
<div className="relative h-56 rounded-lg overflow-hidden border border-surface-variant bg-white">
<img loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Barcoded vacutainer test tubes in a sterile rack" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwu5owhCgxV-ZuLFrP6N0j8o7REsL33cYSZ-igKDivGBT_ApQr_YWhm437wc9S9h2PKqIhT4WagifiPv7AW5vOCM4WLosLoobANYEkLX_skYchD9d1IKLGr0F1m0r_Ve5UyVodiaM_Bo5cQCzaglhZcUhn4MLeBpNT6I258Y1KbrMiDSLV60wPpONpkCPuMrahhOwBF_dgEYnjOOazhoOCacLhzxYhmLdIeB3Ld5NgH-ulm_LV_Klq=w800"/>
{/* 60-min badge floating */}
<div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-surface-variant px-3 py-1.5 rounded-lg flex items-center space-x-2 shadow-sm">
<span className="material-symbols-outlined text-primary text-[18px]" data-icon="electric_bolt">electric_bolt</span>
<div>
<p className="text-micro font-micro text-on-surface-variant leading-none">Standard Promise</p>
<p className="text-caption-strong font-caption-strong text-on-surface">60-Min Phlebotomist Arrival</p>
</div>
</div>
</div>
{/* Feature Bullets inside Card */}
<div className="grid grid-cols-2 gap-3 mt-4">
<div className="flex items-center space-x-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-variant">
<span className="material-symbols-outlined text-[#047857] text-[18px]" data-icon="check_circle">check_circle</span>
<span className="text-micro font-micro text-on-surface">100% Painless Draw</span>
</div>
<div className="flex items-center space-x-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-variant">
<span className="material-symbols-outlined text-[#047857] text-[18px]" data-icon="qr_code_scanner">qr_code_scanner</span>
<span className="text-micro font-micro text-on-surface">Barcoded Vacutainers</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* TRUST STRIP (4 ITEMS) */}
<section className="bg-surface-container-lowest border-b border-surface-variant py-6">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-6">
<div className="flex items-center space-x-3.5">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[22px]" data-icon="verified">verified</span>
</div>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">NABL &amp; CAP Certified</h4>
<p className="text-micro font-micro text-on-surface-variant">100% Validated Laboratory Network</p>
</div>
</div>
<div className="flex items-center space-x-3.5">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[22px]" data-icon="home_health">home_health</span>
</div>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">Free Sample Collection</h4>
<p className="text-micro font-micro text-on-surface-variant">Trained &amp; vaccinated technicians</p>
</div>
</div>
<div className="flex items-center space-x-3.5">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[22px]" data-icon="analytics">analytics</span>
</div>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">Digital Smart Reports</h4>
<p className="text-micro font-micro text-on-surface-variant">Historical health trend graphs</p>
</div>
</div>
<div className="flex items-center space-x-3.5">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[22px]" data-icon="stethoscope">stethoscope</span>
</div>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">Free Doctor Consultation</h4>
<p className="text-micro font-micro text-on-surface-variant">Post-report MD discussion included</p>
</div>
</div>
</div>
</section>
{/* TESTS & PACKAGES */}
<section id="packages" className="py-space-2xl bg-surface scroll-mt-16">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
<div>
<span className="text-micro font-micro text-primary uppercase tracking-wider font-semibold">{query.kind === 'test' ? 'INDIVIDUAL TESTS' : query.kind === 'package' ? 'PREVENTIVE CARE' : query.kind === 'scan' ? 'IMAGING · VISIT A CENTRE' : 'ALL DIAGNOSTICS'}</span>
<h2 className="text-headline-1 font-headline-h1 text-on-surface mt-1">{filterLabel ? `Tests for ${filterLabel}` : query.kind === 'test' ? 'Individual Lab Tests' : query.kind === 'package' ? 'Full Body & Health Packages' : query.kind === 'scan' ? 'Scans & Imaging' : 'Health Packages & Lab Tests'}</h2>
<p className="text-caption font-caption text-on-surface-variant mt-1">{results.total} {results.total === 1 ? 'result' : 'results'}</p>
</div>
<div className="flex items-center gap-2 flex-wrap">
<div className="flex p-1 bg-surface-container-low rounded-full border border-surface-variant" role="tablist" aria-label="Test type">
{([['', 'All'], ['package', 'Packages'], ['test', 'Single tests'], ['scan', 'Scans']] as const).map(([value, label]) => (
<button key={value || 'all'} type="button" role="tab" aria-selected={(query.kind ?? '') === value} onClick={() => update((p) => (value ? p.set('kind', value) : p.delete('kind')))} className={(query.kind ?? '') === value ? 'h-8 px-3.5 rounded-full bg-surface-container-lowest shadow-sm text-caption-strong font-caption-strong text-primary' : 'h-8 px-3.5 rounded-full text-caption font-caption text-on-surface-variant hover:text-on-surface'}>{label}</button>
))}
</div>
<label className="relative">
<span className="sr-only">Sort tests</span>
<select value={query.sort ?? 'popular'} onChange={(e) => update((p) => (e.target.value === 'popular' ? p.delete('sort') : p.set('sort', e.target.value)))} className="h-10 appearance-none bg-surface-container-lowest border border-surface-variant rounded-full pl-3 pr-8 text-caption-strong font-caption-strong text-on-surface focus:outline-none focus:border-primary-container cursor-pointer">
{SORTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
</select>
<span className="material-symbols-outlined text-[16px] text-outline absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">unfold_more</span>
</label>
</div>
</div>
{filterLabel && (
<div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-[#F9C6C9] bg-[#FFF1F2] px-4 py-2.5">
<span className="text-caption font-caption text-on-surface">Filtered by <span className="font-caption-strong text-caption-strong">{filterLabel}</span></span>
<Link className="text-caption-strong font-caption-strong text-[#D92D3A] hover:underline" href="/lab-tests#packages">Clear filter</Link>
</div>
)}
{results.items.length === 0 ? (
<div className="rounded-xl border border-dashed border-surface-variant bg-surface-container-lowest p-8 text-center">
<p className="text-body-strong font-body-strong text-on-surface">No tests match {filterLabel ?? 'these filters'}</p>
<p className="text-caption font-caption text-on-surface-variant mt-1">Try a parameter name (e.g. TSH, HbA1c) or browse all packages.</p>
<Link className="inline-flex mt-4 bg-[#C1121F] hover:bg-[#8E0E17] text-white px-4 py-2 rounded-lg text-body-strong font-body-strong transition-colors duration-150" href="/lab-tests#packages">View all tests</Link>
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{results.items.map((t) => <LabTestCard key={t.slug} test={t} />)}
</div>
)}
{results.pages > 1 && (
<nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-8 flex-wrap">
<button type="button" disabled={results.page <= 1} onClick={() => update((p) => p.set('page', String(results.page - 1)), true)} className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface-variant hover:bg-surface-container disabled:opacity-40">Previous</button>
{Array.from({ length: results.pages }, (_, i) => i + 1).map((n) => (
<button key={n} type="button" aria-current={n === results.page ? 'page' : undefined} onClick={() => update((p) => (n === 1 ? p.delete('page') : p.set('page', String(n))), true)} className={n === results.page ? 'w-9 h-9 bg-primary-container text-white font-caption-strong text-caption rounded-lg' : 'w-9 h-9 border border-surface-variant text-on-surface font-caption-strong text-caption rounded-lg hover:bg-surface-container'}>{n}</button>
))}
<button type="button" disabled={results.page >= results.pages} onClick={() => update((p) => p.set('page', String(results.page + 1)), true)} className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface hover:bg-surface-container disabled:opacity-40">Next</button>
</nav>
)}
</div>
</section>
{/* CATEGORY GRID */}
<section className="py-space-2xl bg-surface-container-lowest border-y border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="mb-8">
<span className="text-micro font-micro text-primary uppercase tracking-wider font-semibold">TESTS BY SPECIALTY</span>
<h2 className="text-headline-1 font-headline-h1 text-on-surface mt-1">Explore by Clinical Category</h2>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
{categories.filter((c) => c.group !== 'department').map((c) => {
  const active = c.slug === activeCategory?.slug;
  return (
<Link key={c.slug} aria-current={active ? 'true' : undefined} className={`p-4 rounded-xl border ${active ? 'border-[#F9C6C9] bg-[#FFF1F2]' : 'border-surface-variant bg-surface'} hover:border-outline transition duration-150 flex flex-col items-center text-center group`} href={active ? '/lab-tests#packages' : categoryHref(c.slug)}>
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center mb-3 group-hover:bg-[#FFF1F2] transition-colors">
<span className="material-symbols-outlined text-[24px] text-on-surface-variant group-hover:text-primary">{c.icon}</span>
</div>
<span className="text-caption-strong font-caption-strong text-on-surface">{c.name}</span>
<span className="text-micro font-micro text-on-surface-variant mt-0.5">{count(c)}</span>
</Link>
  );
})}
</div>
</div>
</section>
{/* DIAGNOSTIC TEST DIRECTORY BY DEPARTMENT */}
{categories.some((c) => c.group === 'department') && (
<section id="directory" className="py-space-2xl bg-surface scroll-mt-16">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-3">
<div>
<span className="text-micro font-micro text-primary uppercase tracking-wider font-semibold">DIAGNOSTIC CENTRE TEST DIRECTORY</span>
<h2 className="text-headline-1 font-headline-h1 text-on-surface mt-1">250+ Tests &amp; Scans by Department</h2>
<p className="text-caption font-caption text-on-surface-variant mt-1 max-w-2xl">Everything a full diagnostic centre offers — pathology, imaging, cardiac, neuro, pulmonary and more. Blood and urine tests can be collected at home; scans and procedures are done at the centre.</p>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
{categories.filter((c) => c.group === 'department').map((c) => {
  const active = c.slug === activeCategory?.slug;
  return (
<Link key={c.slug} aria-current={active ? 'true' : undefined} href={active ? '/lab-tests#packages' : categoryHref(c.slug)} className={`p-4 rounded-xl border flex items-center gap-3 transition ${active ? 'border-[#F9C6C9] bg-[#FFF1F2]' : 'border-surface-variant bg-surface-container-lowest hover:border-outline'}`}>
<span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-[22px] text-primary-container">{c.icon}</span></span>
<span className="min-w-0">
<h3 className="text-caption-strong font-caption-strong text-on-surface">{c.name}</h3>
<span className="block text-micro font-micro text-on-surface-variant">{c.tests + c.packages} {c.tests + c.packages === 1 ? 'test' : 'tests'}</span>
</span>
<span className="material-symbols-outlined text-[18px] text-outline ml-auto">chevron_right</span>
</Link>
  );
})}
</div>
</div>
</section>
)}
{/* BOOK BY SYMPTOM OR CONDITION CHIPS */}
<section className="py-space-xl bg-surface">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-surface-variant">
<div>
<span className="text-micro font-micro text-on-surface-variant uppercase tracking-wider font-semibold">QUICK TRIAGE</span>
<h3 className="text-headline-h2 font-headline-h2 text-on-surface mt-0.5">Book by Symptom or Condition</h3>
</div>
<span className="text-caption font-caption text-on-surface-variant mt-1 md:mt-0">Matched automatically with relevant biomarker tests</span>
</div>
<div className="flex flex-wrap gap-2.5 mt-5">
{SYMPTOMS.map((s) => {
  const content = (
    <>
<span className="material-symbols-outlined text-[18px] text-primary" data-icon={s.icon}>{s.icon}</span>
<span className="text-body-default font-body-default">{s.label}</span>
    </>
  );
  // Chest discomfort can be cardiac: surface 108 before offering tests.
  return s.emergency ? (
<button key={s.label} type="button" className={SYMPTOM_CHIP} onClick={() => emergency.open({ continueTo: { href: categoryHref(s.category), label: 'Not an emergency? See heart health tests' } })}>{content}</button>
  ) : (
<Link key={s.label} className={SYMPTOM_CHIP} href={categoryHref(s.category)}>{content}</Link>
  );
})}
</div>
</div>
</section>
{/* PARTNER LABS */}
{labs && labs.items.length > 0 && (
<section className="py-space-2xl bg-surface-container-lowest border-t border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-6">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
<div>
<span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Near {labs.near.area}</span>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mt-1">Partner labs that process your sample</h2>
<p className="text-caption font-caption text-on-surface-variant mt-1">We assign the nearest lab that collects at your pincode — or walk in to one at a booked slot.</p>
</div>
<Link href="/labs" className="inline-flex items-center gap-1 text-caption-strong font-caption-strong text-primary-container hover:underline shrink-0">View all {labs.total} labs<span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
{labs.items.map((lab) => <LabMiniCard key={lab.slug} lab={lab} />)}
</div>
</div>
</section>
)}
{/* ACCREDITATION & CERTIFICATION STRIP */}
<section className="bg-surface-container-low border-t border-surface-variant py-8">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-6">
<div className="flex items-center space-x-4">
<span className="material-symbols-outlined text-[32px] text-[#047857]" data-icon="verified_user">verified_user</span>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">Official National Health Mission Standards</h4>
<p className="text-caption font-caption text-on-surface-variant">Standardized phlebotomy temperature chain monitored under IoT tracking from collection to reporting.</p>
</div>
</div>
{/* Trust Badges */}
<div className="flex items-center space-x-4 shrink-0">
<div className="px-3 py-1.5 rounded bg-white border border-surface-variant text-caption-strong font-caption-strong text-on-surface">
          NABL Accredited
        </div>
<div className="px-3 py-1.5 rounded bg-white border border-surface-variant text-caption-strong font-caption-strong text-on-surface">
          NABH Laboratory
        </div>
<div className="px-3 py-1.5 rounded bg-white border border-surface-variant text-caption-strong font-caption-strong text-on-surface">
          ISO 27001 Data Secure
        </div>
</div>
</div>
</section>
{labCart.count > 0 && (
<Link href="/lab-tests/book" className="lg:hidden fixed bottom-20 inset-x-4 z-40 h-12 rounded-xl bg-primary-container text-white shadow-[0_6px_20px_rgba(28,25,23,0.28)] flex items-center justify-between px-4">
<span className="font-caption-strong text-caption-strong">{labCart.count} {labCart.count === 1 ? 'test' : 'tests'} · ₹{labCart.total.toLocaleString('en-IN')}</span>
<span className="flex items-center gap-1 font-body-strong text-body-strong">Book collection <span className="material-symbols-outlined text-[18px]">arrow_forward</span></span>
</Link>
)}
<Footer />
    </>
  );
}
