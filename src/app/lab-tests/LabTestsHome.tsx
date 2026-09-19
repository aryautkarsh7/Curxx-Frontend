'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useEmergency } from '@/components/EmergencyModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LAB_CATEGORIES, filterLabPackages, formatINR } from '@/lib/lab-tests';

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

const SYMPTOM_CHIP = 'flex items-center space-x-2 px-4 py-2 rounded-full border border-surface-variant bg-surface-container-lowest text-on-surface hover:border-outline hover:bg-surface-container-low transition-colors duration-150';

const categoryHref = (slug: string) => `/lab-tests?category=${slug}#packages`;

export default function LabTestsHome({ category, query }: { category?: string; query?: string }) {
  const router = useRouter();
  const emergency = useEmergency();
  const activeCategory = LAB_CATEGORIES.find((c) => c.slug === category);
  const packages = filterLabPackages({ category: activeCategory?.slug, query });
  const filterLabel = activeCategory ? activeCategory.name : query ? `“${query}”` : null;

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get('q') ?? '').trim();
    router.push(q ? `/lab-tests?q=${encodeURIComponent(q)}#packages` : '/lab-tests#packages');
  }

  return (
    <>
<Header />
{/* SUB-HEADER DELIVERY & SAMPLE COLLECTION BAR */}
<div className="w-full bg-surface-container-low border-b border-surface-variant py-2.5">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop flex flex-wrap items-center justify-between gap-y-2">
<div className="flex items-center space-x-2 text-on-surface">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="home_pin">home_pin</span>
<span className="text-caption font-caption text-on-surface-variant">Sample Collection at:</span>
<span className="text-caption-strong font-caption-strong text-on-surface">560001, Indiranagar, Bengaluru</span>
<button className="text-caption-strong font-caption-strong text-primary hover:underline ml-2">Change</button>
</div>
<div className="flex items-center space-x-2 sm:space-x-4">
<span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full hidden sm:flex items-center space-x-1">
<span className="material-symbols-outlined text-[14px]" data-icon="timer">timer</span>
<span>Slots available today in 60 mins</span>
</span>
<button className="flex items-center space-x-1.5 text-on-surface hover:text-primary transition-colors py-1 px-2.5 rounded-lg border border-surface-variant bg-surface-container-lowest">
<span className="material-symbols-outlined text-[18px]" data-icon="shopping_bag">shopping_bag</span>
<span className="text-caption-strong font-caption-strong">Cart</span>
<span className="bg-primary text-white text-micro font-micro px-1.5 py-0.2 rounded-full ml-1">2</span>
</button>
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
          Lab tests at home, reports in <span className="text-primary">24 hours</span>
</h1>
<p className="text-body-default font-body-default text-on-surface-variant max-w-xl">
          Certified phlebotomists, temperature-controlled sample logistics, and digital smart reports reviewed by MD Pathologists with complete clinical transparency.
        </p>
{/* Search Input Bar */}
<div className="pt-2">
<form role="search" onSubmit={handleSearch} className="relative flex items-center rounded-lg border border-surface-variant bg-white p-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-sm">
<span className="material-symbols-outlined text-[22px] text-on-surface-variant ml-3 mr-2" data-icon="search">search</span>
<input key={query ?? ''} name="q" defaultValue={query} aria-label="Search lab tests" className="w-full bg-transparent border-0 text-body-default font-body-default text-on-surface placeholder:text-on-surface-variant/70 focus:ring-0 focus:outline-none py-2" placeholder="Search for 500+ lab tests, profiles &amp; health checkups" type="text"/>
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
{/* POPULAR HEALTH PACKAGES SECTION */}
<section id="packages" className="py-space-2xl bg-surface scroll-mt-16">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
{/* Section Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
<div>
<span className="text-micro font-micro text-primary uppercase tracking-wider font-semibold">PREVENTIVE CARE</span>
<h2 className="text-headline-1 font-headline-h1 text-on-surface mt-1">Popular Full Body &amp; Health Packages</h2>
</div>
<Link className="inline-flex items-center text-body-strong font-body-strong text-primary hover:text-[#8E0E17] mt-3 md:mt-0 transition-colors" href="/lab-tests#packages">
<span>View All 24 Packages</span>
<span className="material-symbols-outlined text-[18px] ml-1" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{filterLabel && (
<div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-[#F9C6C9] bg-[#FFF1F2] px-4 py-2.5">
<span className="text-caption font-caption text-on-surface">
Showing {packages.length} {packages.length === 1 ? 'package' : 'packages'} for <span className="font-caption-strong text-caption-strong">{filterLabel}</span>
</span>
<Link className="text-caption-strong font-caption-strong text-[#D92D3A] hover:underline" href="/lab-tests#packages">Clear filter</Link>
</div>
)}
{packages.length === 0 ? (
<div className="rounded-xl border border-dashed border-surface-variant bg-surface-container-lowest p-8 text-center">
<p className="text-body-strong font-body-strong text-on-surface">No packages for {filterLabel} yet</p>
<p className="text-caption font-caption text-on-surface-variant mt-1">Individual tests for this category are coming soon. Browse our full body and health packages in the meantime.</p>
<Link className="inline-flex mt-4 bg-[#C1121F] hover:bg-[#8E0E17] text-white px-4 py-2 rounded-lg text-body-strong font-body-strong transition-colors duration-150" href="/lab-tests#packages">View all packages</Link>
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{packages.map((pkg) => (
<div key={pkg.slug} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex flex-col justify-between hover:border-outline-variant transition-colors shadow-sm">
<div>
<div className="flex items-center justify-between mb-3">
<span className="text-micro font-micro bg-surface-container px-2 py-0.5 rounded text-on-surface-variant border border-surface-variant">{pkg.testsIncluded} tests included</span>
{pkg.fastingHours ? (
<span className="text-micro font-micro bg-[#FFF1F2] text-[#C1121F] border border-[#F9C6C9] px-2 py-0.5 rounded-full flex items-center space-x-1">
<span className="material-symbols-outlined text-[12px]" data-icon="schedule">schedule</span>
<span>{pkg.fastingLabel}</span>
</span>
) : (
<span className="text-micro font-micro bg-surface-container text-on-surface-variant border border-surface-variant px-2 py-0.5 rounded-full flex items-center space-x-1">
<span className="material-symbols-outlined text-[12px]" data-icon="check_circle">check_circle</span>
<span>{pkg.fastingLabel}</span>
</span>
)}
</div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">
<Link className="hover:text-primary transition-colors" href={`/lab-tests/${pkg.slug}`}>{pkg.name}</Link>
</h3>
<p className="text-caption font-caption text-on-surface-variant mt-2">
<span className="font-caption-strong text-on-surface">Covers:</span> {pkg.covers}
            </p>
<div className="mt-4 pt-4 border-t border-surface-variant grid grid-cols-2 gap-2 text-micro font-micro text-on-surface-variant">
{pkg.highlights.map((h) => (
<div key={h} className="flex items-center space-x-1">
<span className="material-symbols-outlined text-[14px] text-[#047857]" data-icon="check">check</span>
<span>{h}</span>
</div>
))}
</div>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<div className="flex items-baseline space-x-2">
<span className="text-headline-h2 font-headline-h2 text-on-surface">{formatINR(pkg.price)}</span>
<span className="text-caption font-caption text-on-surface-variant line-through">{formatINR(pkg.mrp)}</span>
<span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 py-0.2 rounded font-semibold">{pkg.discount}% OFF</span>
</div>
<span className="text-micro font-micro text-on-surface-variant">{pkg.turnaround}</span>
</div>
<Link className="bg-[#C1121F] hover:bg-[#8E0E17] text-white px-4 py-2 rounded-lg text-body-strong font-body-strong transition-colors duration-150" href={`/lab-tests/${pkg.slug}`}>
              Book Now
            </Link>
</div>
</div>
))}
</div>
)}
</div>
</section>
{/* CATEGORY GRID (12 CLINICAL OUTLINE CARDS) */}
<section className="py-space-2xl bg-surface-container-lowest border-y border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="mb-8">
<span className="text-micro font-micro text-primary uppercase tracking-wider font-semibold">TESTS BY SPECIALTY</span>
<h2 className="text-headline-1 font-headline-h1 text-on-surface mt-1">Explore by Clinical Category</h2>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
{LAB_CATEGORIES.map((c) => {
  const active = c.slug === activeCategory?.slug;
  return (
<Link key={c.slug} aria-current={active ? 'true' : undefined} className={`p-4 rounded-xl border ${active ? 'border-[#F9C6C9] bg-[#FFF1F2]' : 'border-surface-variant bg-surface'} hover:border-outline transition duration-150 flex flex-col items-center text-center group`} href={active ? '/lab-tests#packages' : categoryHref(c.slug)}>
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center mb-3 group-hover:bg-[#FFF1F2] transition-colors">
<span className="material-symbols-outlined text-[24px] text-on-surface-variant group-hover:text-primary" data-icon={c.icon}>{c.icon}</span>
</div>
<span className="text-caption-strong font-caption-strong text-on-surface">{c.name}</span>
<span className="text-micro font-micro text-on-surface-variant mt-0.5">{c.countLabel}</span>
</Link>
  );
})}
</div>
</div>
</section>
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
<Footer />
    </>
  );
}
