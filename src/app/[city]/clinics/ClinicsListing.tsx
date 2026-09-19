
'use client';
import Link from 'next/link';
import type { FacilityType } from '@/lib/facilities';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxClinicsHospitalsInBangalorePage({ type }: { type: FacilityType }) {
  return (
    <>
      
<Header />
{/* SUB-BAR: BREADCRUMBS & CONTEXT */}
<div className="bg-surface border-b border-[#E7E5E4] py-2.5">
<div className="w-full max-w-[1440px] mx-auto px-margin sm:px-margin-desktop flex items-center justify-between">
<nav className="flex items-center gap-2 text-caption font-caption text-outline">
<Link href="/" className="hover:text-primary transition-colors">Home</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<Link href="/bangalore/specialties" className="hover:text-primary transition-colors">Bangalore</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<span className="font-caption-strong text-caption-strong text-on-surface">{type === 'hospital' ? 'Hospitals' : 'Clinics'}</span>
</nav>
<div className="hidden sm:flex items-center gap-2 text-micro font-micro text-tertiary bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px]" data-icon="verified">verified</span>
<span>ABDM &amp; Karnataka DHS Certified Directory</span>
</div>
</div>
</div>
{/* MAIN CANVAS */}
<main className="flex-1 w-full max-w-[1440px] mx-auto px-margin sm:px-margin-desktop py-space-base">
{/* PAGE HEAD */}
<div className="flex flex-col md:flex-row md:items-end justify-between pb-6 gap-4 border-b border-[#E7E5E4]">
<div>
<h1 className="text-headline-h1 font-headline-h1 text-on-surface tracking-tight">{type === 'hospital' ? 'Hospitals' : 'Clinics'} in Bangalore</h1>
<p className="text-caption font-caption text-on-surface-variant mt-1">{type === 'hospital' ? '140 verified hospitals' : '30 verified clinics & polyclinics'} · Updated today</p>
<div className="flex gap-2 mt-3">{(['hospital', 'clinic'] as const).map((t) => (<Link key={t} href={t === 'hospital' ? '/bangalore/hospitals' : '/bangalore/clinics'} aria-current={t === type ? 'page' : undefined} className={`px-3 py-1.5 rounded-full border text-caption-strong font-caption-strong transition ${t === type ? 'bg-[#FFF1F2] border-[#F9C6C9] text-[#D92D3A]' : 'bg-[#FAFAF9] border-[#E7E5E4] text-[#78716C] hover:border-outline'}`}>{t === 'hospital' ? 'Hospitals' : 'Clinics'}</Link>))}</div>
</div>
{/* Sort Dropdown */}
<div className="flex items-center gap-3">
<label className="text-caption font-caption text-outline" htmlFor="sort-select">Sort by:</label>
<div className="relative">
<select className="appearance-none bg-surface-container-lowest border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface pl-3.5 pr-8 py-2 focus:border-primary-container focus:ring-1 focus:ring-primary-container cursor-pointer shadow-sm" id="sort-select">
<option>Relevance</option>
<option>Distance</option>
<option>Rating (Highest first)</option>
<option>Doctors Available</option>
<option>Open Now</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]" data-icon="unfold_more">unfold_more</span>
</div>
</div>
</div>
{/* THREE-COLUMN LAYOUT */}
<div className="flex flex-col lg:flex-row gap-gutter-desktop mt-6 items-start">
{/* 1. LEFT SIDEBAR: FILTERS (280px sticky) */}
<aside className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-20 bg-surface-container-lowest border border-[#E7E5E4] rounded-xl p-5 shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto">
{/* Sidebar Header */}
<div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
<div className="flex items-center gap-1.5 font-headline-h3 text-headline-h3 text-on-surface">
<span className="material-symbols-outlined text-outline text-[18px]" data-icon="tune">tune</span>
<span>Filters</span>
</div>
<button className="text-caption-strong font-caption-strong text-primary hover:underline">Clear all</button>
</div>
{/* Applied Filter Chips */}
<div className="pt-3 pb-4 border-b border-[#E7E5E4]">
<span className="text-micro font-micro text-outline uppercase tracking-wider block mb-2">Active Filters</span>
<div className="flex flex-wrap gap-1.5">
<span className="inline-flex items-center gap-1 bg-[#FFF1F2] border border-[#F9C6C9] text-primary rounded-full px-2.5 py-0.5 text-micro font-micro">
              Hospitals
              <button className="hover:text-black">✕</button>
</span>
<span className="inline-flex items-center gap-1 bg-[#FFF1F2] border border-[#F9C6C9] text-primary rounded-full px-2.5 py-0.5 text-micro font-micro">
              Indiranagar
              <button className="hover:text-black">✕</button>
</span>
<span className="inline-flex items-center gap-1 bg-[#FFF1F2] border border-[#F9C6C9] text-primary rounded-full px-2.5 py-0.5 text-micro font-micro">
              NABH Accredited
              <button className="hover:text-black">✕</button>
</span>
</div>
</div>
{/* Filter: Open Now Toggle Switch */}
<div className="py-3.5 border-b border-[#E7E5E4] flex items-center justify-between">
<div>
<span className="text-caption-strong font-caption-strong text-on-surface block">Open Now</span>
<span className="text-micro font-micro text-outline">Operating right now</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-10 h-5 bg-[#E7E5E4] peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-defaultChecked:bg-primary-container"></div>
</label>
</div>
{/* Filter: Facility Type */}
<div className="py-3.5 border-b border-[#E7E5E4]">
<span className="font-caption-strong text-caption-strong text-on-surface block mb-2">Facility Type</span>
<div className="space-y-2">
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Hospital</span>
</span>
<span className="text-micro font-micro text-outline">142</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Polyclinic &amp; Clinic</span>
</span>
<span className="text-micro font-micro text-outline">98</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Diagnostic Centre</span>
</span>
<span className="text-micro font-micro text-outline">44</span>
</label>
</div>
</div>
{/* Filter: Clinical Specialty */}
<div className="py-3.5 border-b border-[#E7E5E4]">
<span className="font-caption-strong text-caption-strong text-on-surface block mb-2">Clinical Specialty</span>
<div className="mb-2">
<input className="w-full h-8 px-2.5 text-caption font-caption bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg placeholder:text-outline focus:ring-0 focus:border-primary" placeholder="Filter specialties..." type="text"/>
</div>
<div className="space-y-2 max-h-36 overflow-y-auto pr-1">
<label className="flex items-center gap-2 text-caption font-caption text-on-surface cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>General Medicine</span>
</label>
<label className="flex items-center gap-2 text-caption font-caption text-on-surface cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Cardiology</span>
</label>
<label className="flex items-center gap-2 text-caption font-caption text-on-surface cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Dermatology</span>
</label>
<label className="flex items-center gap-2 text-caption font-caption text-on-surface cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Orthopedics</span>
</label>
<label className="flex items-center gap-2 text-caption font-caption text-on-surface cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Pediatrics</span>
</label>
<label className="flex items-center gap-2 text-caption font-caption text-on-surface cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Gynecology</span>
</label>
<label className="flex items-center gap-2 text-caption font-caption text-on-surface cursor-pointer">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Oncology</span>
</label>
</div>
</div>
{/* Filter: Facilities */}
<div className="py-3.5 border-b border-[#E7E5E4]">
<span className="font-caption-strong text-caption-strong text-on-surface block mb-2">Key Facilities</span>
<div className="space-y-2">
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="e911_emergency">e911_emergency</span>
<span>24x7 Emergency</span>
</span>
<span className="text-micro font-micro text-outline">68</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="monitor_heart">monitor_heart</span>
<span>ICU &amp; Critical Care</span>
</span>
<span className="text-micro font-micro text-outline">52</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="medication">medication</span>
<span>In-house Pharmacy</span>
</span>
<span className="text-micro font-micro text-outline">194</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="ambulance">ambulance</span>
<span>Ambulance Transit</span>
</span>
<span className="text-micro font-micro text-outline">41</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="credit_card">credit_card</span>
<span>Cashless TPA</span>
</span>
<span className="text-micro font-micro text-outline">180</span>
</label>
</div>
</div>
{/* Filter: Accreditation */}
<div className="py-3.5 border-b border-[#E7E5E4]">
<span className="font-caption-strong text-caption-strong text-on-surface block mb-2">Accreditation</span>
<div className="space-y-2">
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>NABH Accredited</span>
</span>
<span className="text-micro font-micro text-outline">78</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>NABL Certified Lab</span>
</span>
<span className="text-micro font-micro text-outline">62</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>JCI Certified</span>
</span>
<span className="text-micro font-micro text-outline">12</span>
</label>
</div>
</div>
{/* Filter: Locality */}
<div className="pt-3.5">
<span className="font-caption-strong text-caption-strong text-on-surface block mb-2">Locality</span>
<div className="space-y-2">
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Indiranagar</span>
</span>
<span className="text-micro font-micro text-outline">32</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Koramangala</span>
</span>
<span className="text-micro font-micro text-outline">28</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Whitefield</span>
</span>
<span className="text-micro font-micro text-outline">35</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>HSR Layout</span>
</span>
<span className="text-micro font-micro text-outline">22</span>
</label>
<label className="flex items-center justify-between text-caption font-caption text-on-surface cursor-pointer">
<span className="flex items-center gap-2">
<input className="w-4 h-4 rounded text-primary-container focus:ring-primary-container border-[#E7E5E4]" type="checkbox"/>
<span>Jayanagar</span>
</span>
<span className="text-micro font-micro text-outline">19</span>
</label>
</div>
</div>
</aside>
{/* 2. MAIN COLUMN: FEED OF CLINIC CARDS (flex-1) */}
<section className="flex-1 space-y-4">
{/* CARD 1: Manipal Super Specialty Hospital */}
{type === 'hospital' && (
<article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150 relative">
<div className="flex flex-col md:flex-row gap-5">
{/* Left Thumbnail (160px) with badges */}
<div className="relative w-full md:w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[#FAFAF9] border border-[#E7E5E4]">
<img loading="lazy" decoding="async" alt="Manipal Super Specialty Hospital exterior" className="w-full h-full object-cover" data-alt="Modern multi-story facade of a premier hospital in Bangalore with glass exterior, pristine clinical entryway, clear daylight, high-key architecture photography with clean white and warm neutral surfaces." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2osAc3WmXQDs5jM1ksqA6GZzt7YCH6YXGckHkSnceH-cTrSq0Rrow3G9P7se_CddB2c52mjhlkqnKRB5VPHypwWoiDucDVE8ufoZ4uN2EyYFGkm6lzc1qPR_JEBhBN3MhTx1iq9tkJUFdaS_QfTdZXCNzhrWSN40vzveOXqDY8ZZ8uNGTIhZVLSGblO8cJ2C2rnzqvOwsXy59FPde6ZWZTsWcFl3miQtpUi6GI-FxiH--3InFtot0=w800"/>
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="inline-flex items-center gap-0.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-1.5 py-0.5 rounded shadow-xs">
<span className="material-symbols-outlined text-[12px]" data-icon="shield">shield</span>
                  NABH
                </span>
<span className="inline-flex items-center gap-0.5 bg-[#EE1C25] text-white text-micro font-micro px-1.5 py-0.5 rounded shadow-xs">
<span className="material-symbols-outlined text-[12px]" data-icon="emergency">emergency</span>
                  24x7
                </span>
</div>
</div>
{/* Content Details */}
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface hover:text-primary transition-colors cursor-pointer">
                        Manipal Super Specialty Hospital
                      </h2>
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px]" data-icon="verified">verified</span>
                        Verified
                      </span>
</div>
<p className="text-caption-strong font-caption-strong text-outline mt-0.5">
                      Super Specialty Hospital · HAL Airport Road (1.8 km)
                    </p>
</div>
<div className="text-left sm:text-right sm:shrink-0">
<div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface">
<span className="material-symbols-outlined text-amber-500 text-[18px]" data-icon="star" data-weight="fill">star</span>
<span>4.8</span>
<span className="text-outline font-caption">(1,420 reviews)</span>
</div>
</div>
</div>
{/* Full Address */}
<p className="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="pin_drop">pin_drop</span>
                  98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017
                </p>
{/* Status Chip & Key Features */}
<div className="flex flex-wrap items-center gap-2 mt-3">
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#047857] font-caption-strong text-micro px-2 py-1 rounded-md">
<span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>
                    Open 24 Hours
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="e911_emergency">e911_emergency</span>
                    Emergency ICU
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="medication">medication</span>
                    In-house Pharmacy
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="credit_card">credit_card</span>
                    Cashless TPA
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="ambulance">ambulance</span>
                    Ambulance
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="biotech">biotech</span>
                    Diagnostics
                  </span>
</div>
</div>
{/* Bottom Row: Doctor Avatar Strip & Actions */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-[#E7E5E4]">
{/* Doctor Avatars */}
<div className="flex items-center gap-2">
<div className="flex -space-x-2 overflow-hidden">
<img loading="lazy" decoding="async" alt="Doctor profile avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of senior female Indian surgeon in clean clinical scrubs, gentle composed expression, high clarity modern portrait lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOyLpVIyfIHkZRQPwYML-qaEsBMBRJ5RYBeDV-3_et36VU_QZbrPJALEqEyZfZRkdg2IoKlOSqI5OsfXjxjOIXOavVYce01xbx5zlbQHKBo14Ib97ByVUqekYjVGhalQu5RiYH4SNrJVNzdzIyHkym_5rwiNxnbN8dljyhaSww7CChSUDpftfuPttuTMABZICSqAwQ-YEcUv7TfH37kxuKSdah92s6vP_KbUE-XugRHZmClTLRJwHj=w64"/>
<img loading="lazy" decoding="async" alt="Doctor profile avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of male cardiologist with stethoscope in contemporary clinic, professional and approachable demeanour, sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVHF6DrB5S25DOxVBjSfsDPDZHQnyJdZm-RtVg0SfQbA5VHnemurwTyqWTR7P7lpBQCXys4-BYCoMp07mic6Cp_y62QbTs_LiALT64kayoUx6ywtRiN3fAg75tBY8VlEi8w03dI00o72YLHH5rmUnj4QyTXjbzdOnAF0WoPHMGBbasvH9gkPhpzhWf7eHRQVvQBGr0-cfNdVJ9oJdTHH6-knQm8uot3oHXJwde72GWMVoJq0rG_HfR=w64"/>
<img loading="lazy" decoding="async" alt="Doctor profile avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of young female pediatrician in crisp clinical white coat, smiling warmly, bright hospital lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuApFDj0uWeGpzg56gdjhJCsXvAZv0glsbhy2xyZ2rKEoLLuQ2KygR0wvYF4aXuAWqybiZD4xZoaLaLKoiuDU4u7KpJYJNFU4nLDK0VQMyi955SgNXFzPgiho2--xXKe2b5YeTBnT6Rtu35-uJCf6RLT-nBr4HDsqJefMeqfOSDIb7hvTDyIeFpqdFVT0ojQuEXVosiBJi79SShhyqhTk--cPmnCdoTT4BaHSmrFkYpBjqtretHg83cT=w64"/>
<img loading="lazy" decoding="async" alt="Doctor profile avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of experienced male neurologist with glasses, clean institutional medical setting, soft neutral background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpF937OscJTUnMauAQAps4_vmD_to8wZJcId11xj0YwemuAiu8uBSm4nqBchR1-0AgR01eSPTtPDQBxIidJ3QiZXL5eaaSeVxq1lqKb-9rIYsvzcZ4bIQn0WNp7yexIs266axbBiUpveiEs9Eq8IhwdhYltGjv5UVeoDxfDjCIamMvJ5XXABN_rAyjN7h1vQC4bDiasv4hGpgh-0I69WqMM6P1eMDIUJ2DqLtN0-2DO48QFh94HkJ=w64"/>
</div>
<span className="text-caption-strong font-caption-strong text-primary">+38 verified specialists</span>
</div>
{/* Action Rail */}
<div className="flex items-center gap-2">
<a href="https://www.google.com/maps/search/?api=1&query=Manipal+Hospital+HAL+Airport+Road+Bengaluru" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center gap-1.5 transition">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="directions">directions</span>
                    Get Directions
                  </a>
<Link href="/clinic/manipal-hospital" className="px-4 py-2 bg-primary-container text-white rounded-lg text-caption-strong font-caption-strong hover:bg-primary transition shadow-xs">
                    View Clinic
                  </Link>
</div>
</div>
</div>
</div>
</article>
)}
{/* CARD 2: Aster CMI Hospital - Hebbal */}
{type === 'hospital' && (
<article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150 relative">
<div className="flex flex-col md:flex-row gap-5">
<div className="relative w-full md:w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[#FAFAF9] border border-[#E7E5E4]">
<img loading="lazy" decoding="async" alt="Aster CMI Hospital Hebbal exterior" className="w-full h-full object-cover" data-alt="Exterior architecture of Aster CMI quaternary care hospital in Hebbal Bangalore, ultra-modern glass elevation, clear skies, clean clinical entrance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC75MZgzVc254cYxFWPYnt02_3MdQZv6o5gDRnQjroJzuOjqkuQ_XlcqSZ_itB-lUPKqIoh-pQcTsxFK77NiY7FdbiLb762aQWRVckyRdm6yNzGufQrkyUrYxdPekuo04Sf6_f1namCq_MMyB09OPPhhgF-HSzHAR37vmHCEFTJ2rTzU_3oUVYvZf_AMNa4QBRTcEiRcTe1uXY5xF1YTrpEDVA6sW7d_NmbZ9U09baQzo1kObqa1r8W=w800"/>
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="inline-flex items-center gap-0.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-1.5 py-0.5 rounded shadow-xs">
<span className="material-symbols-outlined text-[12px]" data-icon="shield">shield</span>
                  NABH &amp; JCI
                </span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface hover:text-primary transition-colors cursor-pointer">
                        Aster CMI Hospital - Hebbal
                      </h2>
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px]" data-icon="verified">verified</span>
                        Verified
                      </span>
</div>
<p className="text-caption-strong font-caption-strong text-outline mt-0.5">
                      Multi-Specialty Quaternary Hospital · Hebbal (8.4 km)
                    </p>
</div>
<div className="text-left sm:text-right sm:shrink-0">
<div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface">
<span className="material-symbols-outlined text-amber-500 text-[18px]" data-icon="star" data-weight="fill">star</span>
<span>4.7</span>
<span className="text-outline font-caption">(980 reviews)</span>
</div>
</div>
</div>
<p className="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="pin_drop">pin_drop</span>
                  No. 43/2, New Airport Road, NH 44, Sahakar Nagar, Hebbal, Bengaluru 560092
                </p>
<div className="flex flex-wrap items-center gap-2 mt-3">
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#047857] font-caption-strong text-micro px-2 py-1 rounded-md">
<span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>
                    Open 24 Hours
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="cardiology">cardiology</span>
                    Organ Transplant Unit
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="credit_card">credit_card</span>
                    Insurance Desk
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="ambulance">ambulance</span>
                    Helipad &amp; Ambulance
                  </span>
</div>
</div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-[#E7E5E4]">
<div className="flex items-center gap-2">
<div className="flex -space-x-2 overflow-hidden">
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of senior female physician with clinical coat and badge, gentle and confident expression, high key lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg8h-V3DCZcAGSO7dSU3n3Dq58Cgyriov0UjaHzHb-FIOE7X8HhjbLbFa56a8fFXIJJnBAAhgWzRbt9H72gJMmYPXn1ZPEQ-ojUJdCcr1-XJHJUPQDc9c05KCDOswsWY1h4iqgFt6omLCB2MUFMrEa0rM8NyEsgGosRzK8DuaHhB_B-eeKvEep5E5x4Uqtab8BS_WCqFF3WLLgAP56j16ZtdKXku2gio3U7MFTMk1pDaotFy792PRB=w64"/>
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of male orthopedic surgeon in clean hospital scrubs, sharp modern medical studio lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEpIneet8J_Prt4UJWWU_rA9TGDpZZ9ENoaQ3HmU8sCCUuaA6rJRJcjJmEj3Z48Z4F3CEvY7axJMUORZ5Rk5HqZWfh-ZQnkv1i6-P-2VRMpEX9NoNCvySUBDK4eL20DWf00rqoWnqZqUGu6REFbJyGYJvoBUbBQrS7t9Kfb3IK2UbuJqr-UIaIl5tgn1YvFh_WOjJPeiWC8_0Idd94lMf4JYEdpaaP32DmYDUQVgp2M9swuYwQZQca=w64"/>
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of female clinical oncologist in hospital lab coat, warm composed smile, pristine background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtU3JmNRfjgvtZAgICptnPhsRJcuMguuVSSvEEzGbKkzCd4_ozXVkHSnpWIYtWanWYOuDHINN1HfC4BltC-sRxR4kRQmrKuemHF3YJ09ZhAVVQle-Zp74h1Tc5ilnplx-O5RJBgVPCmcMLLRvSzsMBn8_ApKqy2JAN2GZH6c2u2Zbm4Q5GVvIaHdZBIpDtB68vaTAcYHX6xxgUoQ0Wnl9SvSn4qDTTdKHGwiLE9CdFf7F7jM2O4DWo=w64"/>
</div>
<span className="text-caption-strong font-caption-strong text-primary">+54 verified specialists</span>
</div>
<div className="flex items-center gap-2">
<a href="https://www.google.com/maps/search/?api=1&query=Aster+CMI+Hospital+Hebbal+Bengaluru" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center gap-1.5 transition">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="directions">directions</span>
                    Get Directions
                  </a>
<Link href="/clinic/aster-cmi-hospital" className="px-4 py-2 bg-primary-container text-white rounded-lg text-caption-strong font-caption-strong hover:bg-primary transition shadow-xs">
                    View Clinic
                  </Link>
</div>
</div>
</div>
</div>
</article>
)}
{/* CARD 3: Cloudnine Hospital - Indiranagar */}
{type === 'hospital' && (
<article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150 relative">
<div className="flex flex-col md:flex-row gap-5">
<div className="relative w-full md:w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[#FAFAF9] border border-[#E7E5E4]">
<img loading="lazy" decoding="async" alt="Cloudnine Hospital Indiranagar exterior" className="w-full h-full object-cover" data-alt="Bright, welcoming facade of modern maternity hospital in Indiranagar Bangalore, clean architectural lines with glass doors, daytime lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6o1zir7xBQZbZ8i1yh3DbDHKhmPJy5SA6u3wQUrrdt2H7oESizf90P-yHStJQU1ERUUpzG_yObT-T9aTixWS78PvwjjLSxLOQPbk0X6fkZNhCjqxC2mYbIRp1x6jROmimS32ZJU9QQmmQllvz7OOrIugSd2amvXZg6sb7WKHB9_pFNlvFJJhKFJdzxiWG1XGAtDmgq3bawxFfZBjn1xn4bDrus2Q6kgc3COAi1_d9dR3_vwdQ2Eyw=w800"/>
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="inline-flex items-center gap-0.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-1.5 py-0.5 rounded shadow-xs">
<span className="material-symbols-outlined text-[12px]" data-icon="shield">shield</span>
                  NABH
                </span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface hover:text-primary transition-colors cursor-pointer">
                        Cloudnine Hospital - Indiranagar
                      </h2>
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px]" data-icon="verified">verified</span>
                        Verified
                      </span>
</div>
<p className="text-caption-strong font-caption-strong text-outline mt-0.5">
                      Maternity &amp; Child Care Clinic · Indiranagar (0.9 km)
                    </p>
</div>
<div className="text-left sm:text-right sm:shrink-0">
<div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface">
<span className="material-symbols-outlined text-amber-500 text-[18px]" data-icon="star" data-weight="fill">star</span>
<span>4.9</span>
<span className="text-outline font-caption">(640 reviews)</span>
</div>
</div>
</div>
<p className="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="pin_drop">pin_drop</span>
                  1782, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru 560008
                </p>
<div className="flex flex-wrap items-center gap-2 mt-3">
<span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant font-caption-strong text-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="schedule">schedule</span>
                    Open Today: 8:00 AM – 9:00 PM
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="child_care">child_care</span>
                    Level III NICU
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="vaccines">vaccines</span>
                    Pediatric Vaccination
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="credit_card">credit_card</span>
                    Maternity Cashless
                  </span>
</div>
</div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-[#E7E5E4]">
<div className="flex items-center gap-2">
<div className="flex -space-x-2 overflow-hidden">
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of senior female gynecologist with stethoscope, reassuring clinical appearance, bright natural clinic lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_s0fmMvEPik2B81VpqlTGMJ7wfhucXBzzSddwAhs5PjSld83ZGyQ3CjbQ0Jhk9oUdfygFnBtS2QI7aW0fxWx4R0PhheVNtg7lM761oaXegzeRWu_U2SbdhnwPJ70JLjD4tjc6ei8yWRChlRX9pflmTPWCAHGAAts0bxpNAbKnbRg0NxitT0LgwtFfDdGyXLHE9DZ-Ua1dT2q0IwP88g6906lyto4guIUf5ZhaKzSHEHYwTsLskjgh=w64"/>
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of male pediatrician smiling gently, hospital setting with soft focus background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxHwl7p_My0gOHsv6uoi_l9jJWeAzq5Tt-K4KIU7VLlwUJ-nKU64iWxWkoO9k6ngCrmQVMFzfBF7on5XnF36cBdXhUcvSRUNuv8iZjbV55hvhJAfysB5SjWXcST6CdEew6dZ2B4-3U3wPVC7nsAr2ZiEFwPjEDAWc35Nd3hDHATj4nh3a2a9nxFpZiXvnNUgbpJlxpEqj_-tjDbHzu7Hx2jzByo7F4mFmwB3JQ24Udhty_tSJ-BEpb=w64"/>
</div>
<span className="text-caption-strong font-caption-strong text-primary">+16 doctors</span>
</div>
<div className="flex items-center gap-2">
<a href="https://www.google.com/maps/search/?api=1&query=Cloudnine+Hospital+Indiranagar+Bengaluru" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center gap-1.5 transition">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="directions">directions</span>
                    Get Directions
                  </a>
<Link href="/clinic/cloudnine-hospital" className="px-4 py-2 bg-primary-container text-white rounded-lg text-caption-strong font-caption-strong hover:bg-primary transition shadow-xs">
                    View Clinic
                  </Link>
</div>
</div>
</div>
</div>
</article>
)}
{/* CARD 4: Apollo Clinic & Diagnostics - Koramangala */}
{type === 'clinic' && (
<article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150 relative">
<div className="flex flex-col md:flex-row gap-5">
<div className="relative w-full md:w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[#FAFAF9] border border-[#E7E5E4]">
<img loading="lazy" decoding="async" alt="Apollo Clinic Koramangala exterior" className="w-full h-full object-cover" data-alt="Clean corporate facade of an Apollo clinic and medical diagnostics centre in Koramangala, modern sign, crisp architectural photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7xZuw_32k-qt0fbfb9DDpawpIbGNkb8AFFb52ewnN8m0j9p0ZH92MVjIserEjZrmSwfKWyD2-PiFbUpTVYDx3InHavnc1JLJh0qzn2CqhJIfIEUyA6SQm000dTHfEPgPT8jgsor8YPShPYJZIjDQdDqlF4i8yjHDCdhdr7Ni5cYyFIKbd7_sDhZse2lH1FdWhmmR6tT76yQKz22lj7lvbwjKe2xakQ4Vggl2HlkHb2tF_TWPr7FLj=w800"/>
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="inline-flex items-center gap-0.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-1.5 py-0.5 rounded shadow-xs">
<span className="material-symbols-outlined text-[12px]" data-icon="shield">shield</span>
                  NABL
                </span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface hover:text-primary transition-colors cursor-pointer">
                        Apollo Clinic &amp; Diagnostics - Koramangala
                      </h2>
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px]" data-icon="verified">verified</span>
                        Verified
                      </span>
</div>
<p className="text-caption-strong font-caption-strong text-outline mt-0.5">
                      Daycare Polyclinic &amp; Diagnostic Centre · Koramangala 5th Block (3.2 km)
                    </p>
</div>
<div className="text-left sm:text-right sm:shrink-0">
<div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface">
<span className="material-symbols-outlined text-amber-500 text-[18px]" data-icon="star" data-weight="fill">star</span>
<span>4.6</span>
<span className="text-outline font-caption">(512 reviews)</span>
</div>
</div>
</div>
<p className="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="pin_drop">pin_drop</span>
                  428, 80 Feet Road, 5th Block, Koramangala, Bengaluru 560095
                </p>
<div className="flex flex-wrap items-center gap-2 mt-3">
<span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant font-caption-strong text-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="schedule">schedule</span>
                    Open Today: 7:00 AM – 8:30 PM
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="bloodtype">bloodtype</span>
                    NABL Blood Tests
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="dentistry">dentistry</span>
                    Dental &amp; Eye Care
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="medication">medication</span>
                    Apollo Pharmacy
                  </span>
</div>
</div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-[#E7E5E4]">
<div className="flex items-center gap-2">
<div className="flex -space-x-2 overflow-hidden">
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of male general physician in Bangalore clinic, warm and approachable demeanor, modern lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZKVMqxlPirnsdzei8GmeppSMYu7c0Ie9avk8lEj0UZMH1zOmpLitznk3_il6PYrmvM9IDfli8ccVtmaWoCLsvPDvBrJmZhI0kaz900QE62g7Q-82ufB_fx7mFSIAdAtvlCUjiRwi0SI1NIDD8E_IHFuYpV7vsNQfJX42ybilOzwqkLCFirH1Gc8maJWg-y9vJqLsikGCJ0IXrlLyMG7dAIKpJe2gb-tG_5ZL2NEh1gvJL1Z8E0Z1d=w64"/>
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of female dermatologist in white lab coat with clinical backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMmtIye6IvscPh3dHaEQ2XW3loLurE_-JnYdMpKmidD0XR1lYJoSJdsRpLU208-SBsg4-JZr4UnRxpgjJnrn91SEFNKHNLWqljJ3yueK8gTgVK3rwmE7B2T8G-RbpxMUZkI-1hcCq4RoAtt51K3meLiG7P2-cnpfzCunztY3LtyUK0-nxrweqna9DiVxCOK7nz7m4pO1FBk4HvUw0-91Or6EbqTRuBmKEq8VtAR3XDfZAS3kTjLwS=w64"/>
</div>
<span className="text-caption-strong font-caption-strong text-primary">+12 doctors</span>
</div>
<div className="flex items-center gap-2">
<a href="https://www.google.com/maps/search/?api=1&query=Apollo+Clinic+Koramangala+Bengaluru" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center gap-1.5 transition">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="directions">directions</span>
                    Get Directions
                  </a>
<Link href="/clinic/apollo-clinic-koramangala" className="px-4 py-2 bg-primary-container text-white rounded-lg text-caption-strong font-caption-strong hover:bg-primary transition shadow-xs">
                    View Clinic
                  </Link>
</div>
</div>
</div>
</div>
</article>
)}
{/* CARD 5: Fortis Medical Centre - Cunningham Road */}
{type === 'clinic' && (
<article className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 hover:shadow-md transition duration-150 relative">
<div className="flex flex-col md:flex-row gap-5">
<div className="relative w-full md:w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[#FAFAF9] border border-[#E7E5E4]">
<img loading="lazy" decoding="async" alt="Fortis Medical Centre Cunningham Road exterior" className="w-full h-full object-cover" data-alt="Modern street-facing facade of Fortis Medical Centre on Cunningham Road Bangalore, glass windows with clinical insignia, daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOrqHKHzAl5VZrB9vPcrQpSm-jZAf3a-de4YGbYvzGds56iP54w0LjLVoVrIhmzMdq3Afffc40x76u64NLwmf4CyhgMm3vrgx8oATRKb8r89ORFk7k7L-eZ9eQGWy-EqTty5N5Je79xy6g7DdjR34h70RY8jNDr-x0krAS7jS6F5Z-OtHboj59Pu3G-KAxx5-DepCmOaFNsODro2vmLnQ6cgAr31Xx9WZNxGmdlEzDnYATo1Cjomte=w800"/>
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="inline-flex items-center gap-0.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-1.5 py-0.5 rounded shadow-xs">
<span className="material-symbols-outlined text-[12px]" data-icon="shield">shield</span>
                  NABH
                </span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface hover:text-primary transition-colors cursor-pointer">
                        Fortis Medical Centre - Cunningham Road
                      </h2>
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px]" data-icon="verified">verified</span>
                        Verified
                      </span>
</div>
<p className="text-caption-strong font-caption-strong text-outline mt-0.5">
                      Specialty Outpatient Centre · Vasanth Nagar (4.1 km)
                    </p>
</div>
<div className="text-left sm:text-right sm:shrink-0">
<div className="flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface">
<span className="material-symbols-outlined text-amber-500 text-[18px]" data-icon="star" data-weight="fill">star</span>
<span>4.7</span>
<span className="text-outline font-caption">(418 reviews)</span>
</div>
</div>
</div>
<p className="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="pin_drop">pin_drop</span>
                  14, Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560052
                </p>
<div className="flex flex-wrap items-center gap-2 mt-3">
<span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant font-caption-strong text-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="schedule">schedule</span>
                    Open Today: 8:00 AM – 8:00 PM
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="ecg_heart">ecg_heart</span>
                    Cardiology OPD
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="radiology">radiology</span>
                    Ultrasound &amp; X-Ray
                  </span>
<span className="inline-flex items-center gap-1 bg-[#FAFAF9] border border-[#E7E5E4] text-outline text-micro font-micro px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px]" data-icon="credit_card">credit_card</span>
                    OPD Reimbursement TPA
                  </span>
</div>
</div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-[#E7E5E4]">
<div className="flex items-center gap-2">
<div className="flex -space-x-2 overflow-hidden">
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of senior clinical neurologist in modern Bangalore healthcare hospital, dignified and experienced look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwoRnljvf_M-5cGTJm1o8A76x_6e0BID7I8WngK-bRIQD2A9ZEsKGO7kcu7bogwJKDI-83QhQ5oXrCjxQ5ZK1v0ns0cPGvMoDviO9Ulc-01X0R30TORrhzUbmjgBAXtvEGB4Ii_Ijpv9YOevCZjVFM1sMTtRSg0KWTzTGOGeweRkNCjkok3oKMY6u7P5EyP1jCm36wiB3ojSNV34zG3qLRT63XGOzgLMnbD2ci4S78N7JDLo7Z06KB=w64"/>
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of smiling female ENT specialist in medical clinic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi3KADjez1HNQ8LPh1aOVtrA_7xT--fcaY0UEe0IgO8tfAvogxiEn7Mr_F2qTkdGaBbCezI1Gep_XKUWJrf8pUa0QJovBr1BqmoV17V_MQ4k1FlQgxDy0TbiWa83UeRmi6vM3Iwjq4suSnBi1B87MkjITLXWxPTH11USmgcl2aNWd4D3ZcDku2r-sqhmVaJg2aK82XiwKFhuzqRhQnDLX3fyZx1t547ammvwsfdDNY5Iry6fmVSa-_=w64"/>
<img loading="lazy" decoding="async" alt="Doctor avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" data-alt="Portrait of male pulmonologist in clinical consultation chamber." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF3N_XbZgbwfnakjgA_S-lz6Gm2t_s53ZjirThdqDD-g9uJ_tsOGgo8ueJszf2k_srDgCfAHCwY0IW-u5LnUo5vL81LfKbbx4k_6u2Z0-a594Qpb-pXwwYeis_lUijtx9h97TiArcI5RAV1hQ_UGiKqdOhj3wpfXS0ONiy8d0t1g9E827qV6eqxyXXBbFpguj3PC6OUmOMIRAw3BqwA4YRsbGeDYLiF-Op6CBEZzHm6WGBXv608iRE=w64"/>
</div>
<span className="text-caption-strong font-caption-strong text-primary">+22 doctors</span>
</div>
<div className="flex items-center gap-2">
<a href="https://www.google.com/maps/search/?api=1&query=Fortis+Medical+Centre+Cunningham+Road+Bengaluru" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center gap-1.5 transition">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="directions">directions</span>
                    Get Directions
                  </a>
<Link href="/clinic/fortis-medical-centre" className="px-4 py-2 bg-primary-container text-white rounded-lg text-caption-strong font-caption-strong hover:bg-primary transition shadow-xs">
                    View Clinic
                  </Link>
</div>
</div>
</div>
</div>
</article>
)}
{/* NUMBERED PAGINATION */}
<div className="flex items-center justify-between pt-6 pb-8 border-t border-[#E7E5E4]">
<span className="text-caption font-caption text-outline">
            Showing <strong className="text-on-surface">1–{type === 'hospital' ? 3 : 2}</strong> of {type === 'hospital' ? 140 : 30} centres
          </span>
<div className="flex items-center gap-1">
<button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E7E5E4] text-outline opacity-40 cursor-not-allowed" disabled>
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">1</button>
<button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E7E5E4] text-on-surface font-caption-strong text-caption-strong hover:bg-[#FAFAF9]">2</button>
<button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E7E5E4] text-on-surface font-caption-strong text-caption-strong hover:bg-[#FAFAF9]">3</button>
<span className="w-9 h-9 flex items-center justify-center text-outline">...</span>
<button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E7E5E4] text-on-surface font-caption-strong text-caption-strong hover:bg-[#FAFAF9]">57</button>
<button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E7E5E4] text-on-surface hover:bg-[#FAFAF9]">
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</section>
{/* 3. RIGHT COLUMN (320px sticky) */}
<aside className="w-full lg:w-[320px] lg:shrink-0 lg:sticky lg:top-20 space-y-4">
{/* MAP PREVIEW CARD */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-sm">
<div className="relative h-48 w-full bg-[#FAFAF9]">
<img loading="lazy" decoding="async" alt="Map preview of Bangalore medical centers" className="w-full h-full object-cover" data-alt="A clean styled cartographic map view of central Bangalore city streets and arterial corridors with subtle geometric landmarks, plotted in soft warm neutrals with crisp red medical pin indicators." data-location="Bangalore" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDVztVIdEkoX2TPG8JYBXa76S8zkfWbcPmy8z1l0XN9ZXy4qc_i7gKwPOgDRecvczauqzLTNZ-xx0kErud-fY78gUmJVOZD1h_5igPSbg_qTmh9-SpoTpAdzuRS8Dy3Sk4Ixa4WPNl3T4LTNf3ZthRo4jHuHzyWHEUpeUlmUR2C0u6wAN163cnUUOXm4-MN3z8WecNQGMICB5HL3AJY7o3y07xLB_Vvc_VSwAJCjjE0A4sVFA3qJSW=w800"/>
{/* Custom UI Pin Overlays */}
<div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
<div className="flex items-center justify-between pointer-events-auto">
<span className="bg-surface-container-lowest/90 backdrop-blur-sm border border-[#E7E5E4] text-micro font-micro px-2 py-0.5 rounded-full text-on-surface shadow-xs">
                  28 pins in view
                </span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm border border-[#E7E5E4] text-micro font-micro px-2 py-0.5 rounded-full text-primary font-caption-strong shadow-xs">
                  GPS Active
                </span>
</div>
{/* Selected pin callout card */}
<div className="bg-surface-container-lowest/95 backdrop-blur-sm border border-[#E7E5E4] p-2.5 rounded-xl shadow-md pointer-events-auto flex items-center justify-between">
<div>
<span className="text-caption-strong font-caption-strong text-on-surface block leading-tight">Manipal Hospital</span>
<span className="text-micro font-micro text-outline">HAL Airport Rd · 1.8 km</span>
</div>
<span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center">
<span className="material-symbols-outlined text-[16px]" data-icon="local_hospital">local_hospital</span>
</span>
</div>
</div>
</div>
<div className="p-3.5 bg-surface-container-lowest border-t border-[#E7E5E4]">
<a href="https://www.google.com/maps/search/?api=1&query=hospitals+near+Indiranagar+Bengaluru" target="_blank" rel="noopener noreferrer" className="w-full py-2 bg-surface-container-lowest border border-[#E7E5E4] rounded-lg text-caption-strong font-caption-strong text-on-surface hover:bg-[#FAFAF9] flex items-center justify-center gap-1.5 transition">
<span>View on interactive map</span>
<span className="material-symbols-outlined text-[16px]" data-icon="north_east">north_east</span>
</a>
</div>
</div>
{/* URGENT EMERGENCY DISPATCH CARD */}
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-2xl p-5 shadow-sm">
<div className="flex items-center gap-2 text-secondary mb-2">
<span className="material-symbols-outlined text-[24px] text-[#EE1C25]" data-icon="e911_emergency">e911_emergency</span>
<span className="font-headline-h3 text-headline-h3 text-[#1C1917]">Need urgent emergency care?</span>
</div>
<p className="text-caption font-caption text-on-surface-variant leading-relaxed mb-4">
            For acute trauma, cardiac distress, or immediate ambulance transit across the Bengaluru metropolitan perimeter.
          </p>
<a className="emergency-pulse-btn w-full py-2.5 px-4 bg-[#EE1C25] text-white rounded-lg text-caption-strong font-caption-strong flex items-center justify-center gap-2 hover:bg-[#c9121a] transition shadow-sm" href="tel:108">
<span className="material-symbols-outlined text-[20px]" data-icon="call">call</span>
<span>Emergency SOS: Call 108</span>
</a>
<div className="mt-3 text-center">
<span className="text-micro font-micro text-[#78716C]">Govt of Karnataka &amp; EMS Network Dispatch</span>
</div>
</div>
{/* ABDM & INSURANCE CASHLESS TRUST CARD */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-3.5">
<div className="flex items-center gap-2 pb-2 border-b border-[#E7E5E4]">
<span className="material-symbols-outlined text-tertiary text-[20px]" data-icon="health_and_safety">health_and_safety</span>
<h3 className="font-headline-h3 text-headline-h3 text-on-surface">ABDM &amp; Insurance Cashless</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5" data-icon="check_circle">check_circle</span>
<div className="text-caption font-caption">
<strong className="font-caption-strong text-on-surface block">Ayushman Bharat Digital Mission</strong>
<span className="text-on-surface-variant">Instant 14-digit ABHA health records synchronization at counter.</span>
</div>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5" data-icon="check_circle">check_circle</span>
<div className="text-caption font-caption">
<strong className="font-caption-strong text-on-surface block">100% NABH Standard Audit</strong>
<span className="text-on-surface-variant">Real-time verification of ICU bed counts and bio-safety certifications.</span>
</div>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5" data-icon="check_circle">check_circle</span>
<div className="text-caption font-caption">
<strong className="font-caption-strong text-on-surface block">45+ TPA Cashless Desk</strong>
<span className="text-on-surface-variant">Star Health, HDFC ERGO, Care, ICICI Lombard pre-auth approval assistance.</span>
</div>
</li>
</ul>
<div className="pt-2 border-t border-[#E7E5E4]">
<div className="bg-surface-container-low p-2.5 rounded-lg flex items-center justify-between">
<span className="text-micro font-micro text-outline">Need TPA guidance?</span>
<a href="tel:18004190108" className="text-caption-strong font-caption-strong text-primary hover:underline">Chat with Desk</a>
</div>
</div>
</div>
</aside>
</div>
</main>
<Footer />

    </>
  );
}
