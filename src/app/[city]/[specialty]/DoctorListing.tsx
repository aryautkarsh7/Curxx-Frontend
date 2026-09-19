
'use client';
import Link from 'next/link';
import { useListingControls } from './useListingControls';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';

export default function DoctorsPagePage({ plural }: { plural: string }) {
  const { page, onFilterChange, setAvailability, clearFilters, goToPage, openDoctor } = useListingControls();
  return (
    <>
      
<Header />
{/* ==================== SUB-NAV / MAIN LINKS ==================== */}
<nav className="bg-[#FFFFFF] border-b border-[#E7E5E4]">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop flex items-center justify-between h-11">
<div className="overflow-x-auto no-scrollbar flex items-center gap-8 text-caption font-caption">
<Link href="/bangalore/specialties" className="text-primary border-b-2 border-primary font-body-strong text-body-strong pb-1">Specialties</Link>
<Link href="/bangalore/doctors" className="text-on-surface-variant font-body-default text-body-default pb-1 hover:text-primary transition-colors duration-150">Doctors</Link>
<Link className="text-on-surface-variant font-body-default text-body-default pb-1 hover:text-primary transition-colors duration-150" href="/records">ABHA ID</Link>
<Link href="/medicines" className="text-on-surface-variant font-body-default text-body-default pb-1 hover:text-primary transition-colors duration-150">Medicines</Link>
<Link href="/lab-tests" className="text-on-surface-variant font-body-default text-body-default pb-1 hover:text-primary transition-colors duration-150">Diagnostic Tests</Link>
<Link href="/bangalore/hospitals" className="text-on-surface-variant font-body-default text-body-default pb-1 hover:text-primary transition-colors duration-150">Hospital Network</Link>
</div>
<div className="flex items-center gap-2 text-micro font-micro text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 rounded border border-[#A7F3D0]">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span>ABHA &amp; ABDM Integrated Healthcare Facility</span>
</div>
</div>
</nav>
{/* ==================== BREADCRUMBS & PAGE HEADER ==================== */}
<section className="bg-[#FAFAF9] border-b border-[#E7E5E4] py-5">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
{/* Breadcrumb */}
<nav className="flex items-center gap-1.5 text-caption font-caption text-[#78716C] mb-2.5">
<Link href="/" className="hover:text-primary transition-colors">Home</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<Link href="/bangalore/specialties" className="hover:text-primary transition-colors">Bangalore</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-[#1C1917] font-caption-strong">{plural}</span>
</nav>
{/* Page Header Row */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div>
<h1 className="font-headline-h1 text-headline-h1 text-[#1C1917] tracking-tight">{plural} in Bangalore</h1>
<div className="flex items-center gap-2 mt-1">
<span className="w-2 h-2 rounded-full bg-[#047857]"></span>
<p className="font-caption text-caption text-[#78716C]">410 verified dermatologists available · Updated today</p>
</div>
</div>
{/* Sort Control */}
<div className="flex items-center gap-2 w-full sm:w-auto">
<span className="font-caption text-caption text-[#78716C]">Sort by:</span>
<div className="relative">
<select className="w-full sm:w-auto appearance-none bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg pl-3 pr-8 py-1.5 font-caption-strong text-caption-strong text-[#1C1917] focus:outline-none focus:border-[#C1121F] cursor-pointer shadow-sm">
<option>Relevance</option>
<option>Fee: Low to High</option>
<option>Fee: High to Low</option>
<option>Experience: Most Experienced</option>
<option>Rating: Highest Rated</option>
<option>Availability: Earliest First</option>
</select>
<span className="material-symbols-outlined text-[16px] text-[#78716C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">unfold_more</span>
</div>
</div>
</div>
</div>
</section>
{/* ==================== THREE-COLUMN RESULTS LAYOUT ==================== */}
<main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-8">
<div className="grid grid-cols-1 lg:grid-cols-[280px_580px_300px] gap-gutter-desktop items-start">
{/* ==================== 1. LEFT SIDEBAR (FILTERS) ==================== */}
<aside onChange={onFilterChange} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-4 sticky top-24 space-y-5">
{/* Sidebar Header */}
<div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-[#78716C]">tune</span>
            Filters
          </h3>
<button type="button" onClick={clearFilters} className="font-caption-strong text-caption-strong text-[#C1121F] hover:text-[#8E0E17] transition-colors">Clear all</button>
</div>
{/* Applied Chips */}
<div className="flex flex-wrap gap-1.5 pb-3 border-b border-[#E7E5E4]">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] font-micro text-micro text-[#8E0E17]">
            Dermatology
            <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-black">close</span>
</span>
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] font-micro text-micro text-[#8E0E17]">
            Indiranagar
            <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-black">close</span>
</span>
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] font-micro text-micro text-[#8E0E17]">
            Available Today
            <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-black">close</span>
</span>
</div>
{/* Availability Filter */}
<div className="space-y-2">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Availability</label>
<div className="grid grid-cols-3 gap-1.5">
<button type="button" onClick={() => setAvailability('today')} className="px-2 py-1.5 rounded-lg font-caption-strong text-caption text-center border bg-[#FFF1F2] border-[#C1121F] text-[#C1121F]">Today</button>
<button type="button" onClick={() => setAvailability('tomorrow')} className="px-2 py-1.5 rounded-lg font-caption text-caption text-center border bg-[#FAFAF9] border-[#E7E5E4] text-[#78716C] hover:bg-surface-container">Tomorrow</button>
<button type="button" onClick={() => setAvailability('next-7-days')} className="px-2 py-1.5 rounded-lg font-caption text-caption text-center border bg-[#FAFAF9] border-[#E7E5E4] text-[#78716C] hover:bg-surface-container">Next 7 D</button>
</div>
</div>
{/* Consultation Mode */}
<div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Consultation Mode</label>
<div className="space-y-2 text-caption font-caption text-[#1C1917]">
<label className="flex items-center gap-2.5 cursor-pointer">
<input defaultChecked className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" type="checkbox"/>
<span>In-Clinic Visit</span>
</label>
<label className="flex items-center gap-2.5 cursor-pointer">
<input defaultChecked className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" type="checkbox"/>
<span>Video Consultation</span>
</label>
<label className="flex items-center gap-2.5 cursor-pointer">
<input className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" type="checkbox"/>
<span>Home Visit</span>
</label>
</div>
</div>
{/* Fee Range Slider */}
<div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
<div className="flex justify-between items-center">
<label className="font-caption-strong text-caption-strong text-[#1C1917]">Consultation Fee</label>
<span className="font-caption-strong text-caption-strong text-[#C1121F]">₹400 - ₹1,200</span>
</div>
<div className="relative w-full pt-2">
<div className="h-1.5 bg-[#E7E5E4] rounded-full">
<div className="h-1.5 bg-[#C1121F] rounded-full ml-[20%] w-[50%]"></div>
</div>
<div className="flex justify-between items-center text-micro font-micro text-[#78716C] mt-2">
<span>₹0</span>
<span>₹1000</span>
<span>₹2000+</span>
</div>
</div>
</div>
{/* Experience */}
<div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Experience</label>
<div className="space-y-2 text-caption font-caption text-[#1C1917]">
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2.5">
<input className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" type="checkbox"/>
                0-5 Years
              </span>
<span className="text-micro font-micro text-[#78716C] bg-[#FAFAF9] px-2 py-0.5 rounded border border-[#E7E5E4]">84</span>
</label>
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2.5">
<input defaultChecked className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" type="checkbox"/>
                5-10 Years
              </span>
<span className="text-micro font-micro text-[#78716C] bg-[#FAFAF9] px-2 py-0.5 rounded border border-[#E7E5E4]">142</span>
</label>
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2.5">
<input defaultChecked className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" type="checkbox"/>
                10-15 Years
              </span>
<span className="text-micro font-micro text-[#78716C] bg-[#FAFAF9] px-2 py-0.5 rounded border border-[#E7E5E4]">115</span>
</label>
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2.5">
<input className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" type="checkbox"/>
                15+ Years
              </span>
<span className="text-micro font-micro text-[#78716C] bg-[#FAFAF9] px-2 py-0.5 rounded border border-[#E7E5E4]">69</span>
</label>
</div>
</div>
{/* Doctor Gender */}
<div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Doctor Gender</label>
<div className="flex items-center gap-4 text-caption font-caption text-[#1C1917]">
<label className="flex items-center gap-1.5 cursor-pointer">
<input defaultChecked className="w-[18px] h-[18px] text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" name="gender" type="radio"/>
<span>Any</span>
</label>
<label className="flex items-center gap-1.5 cursor-pointer">
<input className="w-[18px] h-[18px] text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" name="gender" type="radio"/>
<span>Female</span>
</label>
<label className="flex items-center gap-1.5 cursor-pointer">
<input className="w-[18px] h-[18px] text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" name="gender" type="radio"/>
<span>Male</span>
</label>
</div>
</div>
{/* Locality Selector */}
<div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Locality</label>
<div className="relative">
<input className="w-full h-8 px-2.5 text-caption font-caption bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg focus:outline-none focus:border-[#C1121F]" placeholder="Search locality..." type="text"/>
<span className="material-symbols-outlined text-[14px] text-[#78716C] absolute right-2 top-2">search</span>
</div>
<div className="max-h-32 overflow-y-auto space-y-1.5 text-caption font-caption text-[#1C1917] pr-1">
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2"><input defaultChecked className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/>Indiranagar</span>
<span className="text-micro text-[#78716C]">42</span>
</label>
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2"><input className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/>Koramangala</span>
<span className="text-micro text-[#78716C]">54</span>
</label>
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2"><input className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/>Whitefield</span>
<span className="text-micro text-[#78716C]">38</span>
</label>
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2"><input className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/>HSR Layout</span>
<span className="text-micro text-[#78716C]">49</span>
</label>
<label className="flex items-center justify-between cursor-pointer">
<span className="flex items-center gap-2"><input className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/>Jayanagar</span>
<span className="text-micro text-[#78716C]">35</span>
</label>
</div>
</div>
{/* Spoken Languages */}
<div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Spoken Languages</label>
<div className="grid grid-cols-2 gap-2 text-caption font-caption text-[#1C1917]">
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/> English
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/> Kannada
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/> Hindi
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/> Telugu
            </label>
</div>
</div>
{/* Facilities */}
<div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Clinic Facilities</label>
<div className="space-y-1.5 text-caption font-caption text-[#1C1917]">
<label className="flex items-center gap-2 cursor-pointer">
<input className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/> Wheelchair Accessible
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/> Dedicated Car Parking
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" type="checkbox"/> Digital Instant Reports
            </label>
</div>
</div>
</aside>
{/* ==================== 2. MAIN RESULTS COLUMN (6 CARDS) ==================== */}
<section className="space-y-4">
{/* DOCTOR CARD 1 */}
<div onClick={openDoctor('/doctor/dr-priya-sharma')} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 hover:border-neutral-300 transition duration-150 relative cursor-pointer">
<div className="flex gap-4">
{/* Left Portrait & Verified Badge */}
<div className="relative flex-shrink-0">
<img loading="lazy" decoding="async" alt="Doctor portrait" className="w-[88px] h-[88px] rounded-full object-cover border border-[#E7E5E4]" data-alt="Warm studio headshot portrait of Dr. Rajeshwari Iyer, a senior Indian female dermatologist in white clinical coat with stethoscope in a clean hospital lighting setup." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCANgKgGJ5AwPuVgz9FgpkKzgcz4i-ZhYGzfwrTP-MtUsBn7JtI5eRoAseRuAzJoaNZ-u5LfH_WkPr9CbeYnUC7OSbmPIpnLC3tIqwuPesy3nlomd2U-v0hMMqLFGbVxywPzcvVAZq8ymIdiZyKq5H3GkQknTk_rNQ5IL31bC7wQhzJwp3htgW3FWdZFMa3Ljl9F53HbnlEPi2nh1Ud-ielTdRzX6Kzfuatp9QloJ0rM41x_XSvIjkk=w176"/>
<span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
</div>
{/* Middle Info */}
<div className="flex-1 min-w-0 pr-2">
<div className="flex items-center gap-1.5">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] truncate">Dr. Rajeshwari Iyer</h2>
<span className="material-symbols-outlined text-[#047857] text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<p className="font-caption text-caption text-[#78716C] mt-0.5">MBBS, MD - Dermatology, DNB (Dermatology)</p>
<p className="font-caption-strong text-caption-strong text-[#1C1917] mt-1">Dermatologist, Trichologist · 16 Years Experience</p>
<div className="flex items-center gap-1 text-caption font-caption text-[#78716C] mt-1.5">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span className="truncate">DermaCare Clinic · 100ft Road, Indiranagar (0.8 km away)</span>
</div>
{/* Spoken Languages */}
<div className="flex items-center gap-1.5 mt-2.5">
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">English</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Kannada</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Hindi</span>
</div>
{/* Recommendation Rate */}
<div className="flex items-center gap-1.5 mt-3 text-[#047857] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
<span>98%</span>
<span className="text-[#78716C] font-caption text-caption">(840 Patient Stories)</span>
</div>
</div>
{/* Right Rail (Price & Booking) */}
<div className="w-40 flex flex-col justify-between items-end border-l border-[#E7E5E4] pl-4">
<div className="text-right">
<span className="font-caption text-caption text-[#78716C] block">Consultation fee</span>
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">₹700</div>
</div>
<div className="w-full space-y-2 mt-3">
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#8E0E17]">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Today, 4:30 PM</span>
</div>
<Link href="/doctor/dr-priya-sharma" className="w-full h-10 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95 shadow-sm">
                  Book Clinic Visit
                </Link>
<Link href="/doctor/dr-priya-sharma" className="w-full h-9 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95">
                  Video ₹399
                </Link>
</div>
</div>
</div>
</div>
{/* DOCTOR CARD 2 (PROMOTED VARIANT) */}
<div className="bg-[#FFFFFF] border border-[#F9C6C9] rounded-xl p-5 hover:border-neutral-400 transition duration-150 relative bg-gradient-to-t from-white to-[#FFF1F2]/20 shadow-sm">
{/* Promoted Badge */}
<div className="absolute top-3 right-4 flex items-center gap-1 bg-[#FFF1F2] border border-[#F9C6C9] px-2 py-0.5 rounded font-micro text-micro text-[#8E0E17]">
<span className="material-symbols-outlined text-[12px]">campaign</span>
<span>Promoted</span>
</div>
<div className="flex gap-4">
{/* Left Portrait & Verified Badge */}
<div className="relative flex-shrink-0">
<img loading="lazy" decoding="async" alt="Doctor portrait" className="w-[88px] h-[88px] rounded-full object-cover border border-[#E7E5E4]" data-alt="Professional clinical headshot of Dr. Ananya Sen, a smiling female cosmetic dermatologist wearing a stethoscope against a soft focus contemporary medical clinic interior." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWfmdOz6hk4ZlCeU9c385X9ZQu9I0tGyCrWtkIUJlleL9Xdy5ci6q-FaiEH4q_Nr2htSHhdYRk5PYdjbGyF4sdrjzGLdEpCGWKKIISeUIOxHQTZwekE57kqE_m3hFyQnIkxWRCqh3Z7Ed_lPcRZWkUCO5mRXfpshxiNJPXtw2aInNwSZs2DMXsk7VQjXbPeuAlabuwDgQBDIWlXtM4B5vzoHTMH_YwG0Llp9Ck7Bw8IyBK_j_w8U9G=w176"/>
<span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
</div>
{/* Middle Info */}
<div className="flex-1 min-w-0 pr-2">
<div className="flex items-center gap-1.5">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] truncate">Dr. Ananya Sen</h2>
<span className="material-symbols-outlined text-[#047857] text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<p className="font-caption text-caption text-[#78716C] mt-0.5">MBBS, DVD, Fellowship in Aesthetic Medicine (Germany)</p>
<p className="font-caption-strong text-caption-strong text-[#1C1917] mt-1">Cosmetic Dermatologist, Dermatosurgeon · 12 Years Experience</p>
<div className="flex items-center gap-1 text-caption font-caption text-[#78716C] mt-1.5">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span className="truncate">Aura Skin &amp; Hair Clinic · 12th Main, Indiranagar (1.1 km away)</span>
</div>
{/* Spoken Languages */}
<div className="flex items-center gap-1.5 mt-2.5">
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">English</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Hindi</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Bengali</span>
</div>
{/* Recommendation Rate */}
<div className="flex items-center gap-1.5 mt-3 text-[#047857] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
<span>99%</span>
<span className="text-[#78716C] font-caption text-caption">(1,120 Patient Stories)</span>
</div>
</div>
{/* Right Rail */}
<div className="w-40 flex flex-col justify-between items-end border-l border-[#E7E5E4] pl-4">
<div className="text-right">
<span className="font-caption text-caption text-[#78716C] block">Consultation fee</span>
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">₹850</div>
</div>
<div className="w-full space-y-2 mt-3">
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#8E0E17]">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Today, 5:15 PM</span>
</div>
<Link href="/doctor/dr-priya-sharma" className="w-full h-10 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95 shadow-sm">
                  Book Clinic Visit
                </Link>
<Link href="/doctor/dr-priya-sharma" className="w-full h-9 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95">
                  Video ₹499
                </Link>
</div>
</div>
</div>
</div>
{/* DOCTOR CARD 3 */}
<div onClick={openDoctor('/doctor/dr-priya-sharma')} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 hover:border-neutral-300 transition duration-150 relative cursor-pointer">
<div className="flex gap-4">
<div className="relative flex-shrink-0">
<img loading="lazy" decoding="async" alt="Doctor portrait" className="w-[88px] h-[88px] rounded-full object-cover border border-[#E7E5E4]" data-alt="Crisp portrait of Dr. Arvind Swaminathan, an experienced South Indian male dermatologist with glasses and white lab coat in an ultra-clean diagnostic clinic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFzBz663taQ-wSJo4_ehyR7mGG-g7EcaNFNrQ1HyNsKYcryJ-YoVbG28HhplkI5VbGX1yOV6DhMStNeW_6kusgYH-7usUwHgz4XUK-C847eyy9Ksu6sr0PD1KTI4VNAY4I6vXpGHNqeDa40By6t1pVA24QH2Zx8bq0d1PZRjQymYu_mwhaBx5u1MBaNEojTKqeWBnYV4-fZjhHLaUORQmYYcc-puqg5WYFH4RlcEArXM7xmcJ_C8xs=w176"/>
<span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
</div>
<div className="flex-1 min-w-0 pr-2">
<div className="flex items-center gap-1.5">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] truncate">Dr. Arvind Swaminathan</h2>
<span className="material-symbols-outlined text-[#047857] text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<p className="font-caption text-caption text-[#78716C] mt-0.5">MBBS, MD - Dermatology, Venereology &amp; Leprosy</p>
<p className="font-caption-strong text-caption-strong text-[#1C1917] mt-1">Senior Dermatologist · 21 Years Experience</p>
<div className="flex items-center gap-1 text-caption font-caption text-[#78716C] mt-1.5">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span className="truncate">Manipal Skin Institute · HAL 2nd Stage, Indiranagar (1.8 km away)</span>
</div>
<div className="flex items-center gap-1.5 mt-2.5">
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">English</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Kannada</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Tamil</span>
</div>
<div className="flex items-center gap-1.5 mt-3 text-[#047857] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
<span>97%</span>
<span className="text-[#78716C] font-caption text-caption">(950 Patient Stories)</span>
</div>
</div>
<div className="w-40 flex flex-col justify-between items-end border-l border-[#E7E5E4] pl-4">
<div className="text-right">
<span className="font-caption text-caption text-[#78716C] block">Consultation fee</span>
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">₹900</div>
</div>
<div className="w-full space-y-2 mt-3">
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#8E0E17]">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Tomorrow, 10:00 AM</span>
</div>
<Link href="/doctor/dr-priya-sharma" className="w-full h-10 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95 shadow-sm">
                  Book Clinic Visit
                </Link>
<Link href="/doctor/dr-priya-sharma" className="w-full h-9 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95">
                  Video ₹499
                </Link>
</div>
</div>
</div>
</div>
{/* DOCTOR CARD 4 */}
<div onClick={openDoctor('/doctor/dr-priya-sharma')} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 hover:border-neutral-300 transition duration-150 relative cursor-pointer">
<div className="flex gap-4">
<div className="relative flex-shrink-0">
<img loading="lazy" decoding="async" alt="Doctor portrait" className="w-[88px] h-[88px] rounded-full object-cover border border-[#E7E5E4]" data-alt="Portrait of Dr. Priya Venkatesh, an Indian pediatric dermatologist in crisp clinical attire with stethoscope, softly backlit in an airy high-tech clinic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKcIP1kgDyQF50k1L1U9qC6PJQcF3ZroRmTUVogFnplaoxaODqJGBPHD_mjpCuUWRi9k3CExtx7l6JacW7Pqtw5rpeZmpk1IpbxPUSA9FOpTEzzYqsBGbzdMHhJmYJjl635dpyfA1slXPkbCZm4xknTC6KMDD5P2DRpUXwcuUxfwNK8wTqLjdE_jCTXhW9Q2bAdAORRHQaysP_BUPRz4hssEjAsuvAeYwr4swo0Y3vxtgU8wgU4Gdt=w176"/>
<span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
</div>
<div className="flex-1 min-w-0 pr-2">
<div className="flex items-center gap-1.5">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] truncate">Dr. Priya Venkatesh</h2>
<span className="material-symbols-outlined text-[#047857] text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<p className="font-caption text-caption text-[#78716C] mt-0.5">MBBS, DNB - Dermatology, Pediatric Dermatology Fellow</p>
<p className="font-caption-strong text-caption-strong text-[#1C1917] mt-1">Pediatric &amp; Clinical Dermatologist · 9 Years Experience</p>
<div className="flex items-center gap-1 text-caption font-caption text-[#78716C] mt-1.5">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span className="truncate">SkinCare Super Specialty · Defence Colony, Indiranagar (0.5 km away)</span>
</div>
<div className="flex items-center gap-1.5 mt-2.5">
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">English</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Kannada</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Telugu</span>
</div>
<div className="flex items-center gap-1.5 mt-3 text-[#047857] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
<span>99%</span>
<span className="text-[#78716C] font-caption text-caption">(620 Patient Stories)</span>
</div>
</div>
<div className="w-40 flex flex-col justify-between items-end border-l border-[#E7E5E4] pl-4">
<div className="text-right">
<span className="font-caption text-caption text-[#78716C] block">Consultation fee</span>
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">₹650</div>
</div>
<div className="w-full space-y-2 mt-3">
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#8E0E17]">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Today, 6:00 PM</span>
</div>
<Link href="/doctor/dr-priya-sharma" className="w-full h-10 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95 shadow-sm">
                  Book Clinic Visit
                </Link>
<Link href="/doctor/dr-priya-sharma" className="w-full h-9 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95">
                  Video ₹349
                </Link>
</div>
</div>
</div>
</div>
{/* DOCTOR CARD 5 */}
<div onClick={openDoctor('/doctor/dr-priya-sharma')} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 hover:border-neutral-300 transition duration-150 relative cursor-pointer">
<div className="flex gap-4">
<div className="relative flex-shrink-0">
<img loading="lazy" decoding="async" alt="Doctor portrait" className="w-[88px] h-[88px] rounded-full object-cover border border-[#E7E5E4]" data-alt="Headshot of Dr. Rohan Kulkarni, male trichologist and dermatologist in a clean modern diagnostic office setting with calm clinical lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM3Jzitbzol3tRqBDUF9MPI6puAgZmAaNg1RSzS0Yfexta-bhEJGRgMg6xpBy5LZMt2rR98KWx3N7ZhZIk5SRKBr14DZmNCSSDXMDofZfXlE9AQyg0a-DxBPtDSlRandBURyzNKHo6EKbWv79yHu56r__nLgBEqIHpwJmgHvQ7eDLOGnmUdhN2z_tOaDyHf-CCO6bB4YJM3efjuuCp_KWTZ8m2MKIZYDKnUDjSruH9fL8xmDBzxSXh=w176"/>
<span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
</div>
<div className="flex-1 min-w-0 pr-2">
<div className="flex items-center gap-1.5">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] truncate">Dr. Rohan Kulkarni</h2>
<span className="material-symbols-outlined text-[#047857] text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<p className="font-caption text-caption text-[#78716C] mt-0.5">MBBS, MD - Dermatology, Hair Transplant Surgeon (ISHRS)</p>
<p className="font-caption-strong text-caption-strong text-[#1C1917] mt-1">Dermatologist &amp; Hair Restoration Specialist · 14 Years Experience</p>
<div className="flex items-center gap-1 text-caption font-caption text-[#78716C] mt-1.5">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span className="truncate">Apex Derma &amp; Follicle Hub · CMH Road, Indiranagar (1.4 km away)</span>
</div>
<div className="flex items-center gap-1.5 mt-2.5">
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">English</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Hindi</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Marathi</span>
</div>
<div className="flex items-center gap-1.5 mt-3 text-[#047857] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
<span>96%</span>
<span className="text-[#78716C] font-caption text-caption">(415 Patient Stories)</span>
</div>
</div>
<div className="w-40 flex flex-col justify-between items-end border-l border-[#E7E5E4] pl-4">
<div className="text-right">
<span className="font-caption text-caption text-[#78716C] block">Consultation fee</span>
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">₹750</div>
</div>
<div className="w-full space-y-2 mt-3">
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#8E0E17]">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Today, 7:15 PM</span>
</div>
<Link href="/doctor/dr-priya-sharma" className="w-full h-10 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95 shadow-sm">
                  Book Clinic Visit
                </Link>
<Link href="/doctor/dr-priya-sharma" className="w-full h-9 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95">
                  Video ₹399
                </Link>
</div>
</div>
</div>
</div>
{/* DOCTOR CARD 6 */}
<div onClick={openDoctor('/doctor/dr-priya-sharma')} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 hover:border-neutral-300 transition duration-150 relative cursor-pointer">
<div className="flex gap-4">
<div className="relative flex-shrink-0">
<img loading="lazy" decoding="async" alt="Doctor portrait" className="w-[88px] h-[88px] rounded-full object-cover border border-[#E7E5E4]" data-alt="Portrait photo of Dr. Kavita Nair, an Indian female dermatologist and laser therapist with a gentle professional expression in a medical consulting room." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdvivpTMZ3WcSbeRdbnIVrmwQ49WPN7pMFZyGTqgRMi7fWRiGYXCTf8YYzfNL2OfBSbbBvfqPC1tUtVGpTF08GcJ9413Gnn03LmUfvimOBgWJD6H0mrruylg1AHdDXxFbVnHt8YdM2B4wB_35QSTKsMBKsWzFiXPHGp_gsZEGfK14vqFQ9Wu9wi17F37X8dyYPkueS0tiYYz222RgWUUX5xKq3I76NkLrMn2EhHzFoCcSgt4vIlSlF=w176"/>
<span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
</div>
<div className="flex-1 min-w-0 pr-2">
<div className="flex items-center gap-1.5">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] truncate">Dr. Kavita Nair</h2>
<span className="material-symbols-outlined text-[#047857] text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<p className="font-caption text-caption text-[#78716C] mt-0.5">MBBS, MD - Dermatology, Fellow in Laser Surgeries</p>
<p className="font-caption-strong text-caption-strong text-[#1C1917] mt-1">Dermatologist &amp; Laser Specialist · 11 Years Experience</p>
<div className="flex items-center gap-1 text-caption font-caption text-[#78716C] mt-1.5">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span className="truncate">Nair Skin Aesthetics · 80ft Road, Indiranagar (1.5 km away)</span>
</div>
<div className="flex items-center gap-1.5 mt-2.5">
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">English</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Malayalam</span>
<span className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">Kannada</span>
</div>
<div className="flex items-center gap-1.5 mt-3 text-[#047857] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
<span>97%</span>
<span className="text-[#78716C] font-caption text-caption">(530 Patient Stories)</span>
</div>
</div>
<div className="w-40 flex flex-col justify-between items-end border-l border-[#E7E5E4] pl-4">
<div className="text-right">
<span className="font-caption text-caption text-[#78716C] block">Consultation fee</span>
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">₹800</div>
</div>
<div className="w-full space-y-2 mt-3">
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#8E0E17]">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Tomorrow, 11:30 AM</span>
</div>
<Link href="/doctor/dr-priya-sharma" className="w-full h-10 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95 shadow-sm">
                  Book Clinic Visit
                </Link>
<Link href="/doctor/dr-priya-sharma" className="w-full h-9 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95">
                  Video ₹449
                </Link>
</div>
</div>
</div>
</div>
{/* Centered Pagination */}
<div className="flex items-center justify-center gap-2 pt-6 pb-2">
<button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)} className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg font-caption-strong text-caption text-[#78716C] hover:bg-surface-container transition flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
            Previous
          </button>
<button type="button" onClick={() => goToPage(1)} className={page === 1 ? 'w-9 h-9 bg-[#C1121F] text-white font-caption-strong text-caption rounded-lg flex items-center justify-center' : 'w-9 h-9 border border-[#E7E5E4] text-[#1C1917] font-caption-strong text-caption rounded-lg hover:bg-surface-container flex items-center justify-center'}>1</button>
<button type="button" onClick={() => goToPage(2)} className={page === 2 ? 'w-9 h-9 bg-[#C1121F] text-white font-caption-strong text-caption rounded-lg flex items-center justify-center' : 'w-9 h-9 border border-[#E7E5E4] text-[#1C1917] font-caption-strong text-caption rounded-lg hover:bg-surface-container flex items-center justify-center'}>2</button>
<button type="button" onClick={() => goToPage(3)} className={page === 3 ? 'w-9 h-9 bg-[#C1121F] text-white font-caption-strong text-caption rounded-lg flex items-center justify-center' : 'w-9 h-9 border border-[#E7E5E4] text-[#1C1917] font-caption-strong text-caption rounded-lg hover:bg-surface-container flex items-center justify-center'}>3</button>
<span className="text-[#78716C] px-1 font-caption">...</span>
<button type="button" onClick={() => goToPage(41)} className={page === 41 ? 'w-9 h-9 bg-[#C1121F] text-white font-caption-strong text-caption rounded-lg flex items-center justify-center' : 'w-9 h-9 border border-[#E7E5E4] text-[#1C1917] font-caption-strong text-caption rounded-lg hover:bg-surface-container flex items-center justify-center'}>41</button>
<button type="button" onClick={() => goToPage(page + 1)} className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg font-caption-strong text-caption text-[#1C1917] hover:bg-surface-container transition flex items-center gap-1">
            Next
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
</section>
{/* ==================== 3. RIGHT COLUMN (STICKY UTILITIES) ==================== */}
<aside className="space-y-4 sticky top-24">
{/* CARD 1: Clinical AI Triage */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 shadow-sm relative overflow-hidden">
<div className="w-10 h-10 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-[#C1121F] mb-3">
<span className="material-symbols-outlined text-[22px]">psychology</span>
</div>
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Clinical AI Triage</h3>
<p className="font-caption text-caption text-[#78716C] mt-1.5 leading-relaxed">
            Not sure which specialist you need? Describe symptoms like sudden rash, severe hairfall, or cystic acne to match the right sub-specialist in 60 seconds.
          </p>
<Link href="/triage" className="mt-4 w-full h-10 border border-[#C1121F] text-[#C1121F] hover:bg-[#FFF1F2] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center gap-1.5 transition">
<span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            Start Free AI Triage
          </Link>
</div>
{/* CARD 2: Emergency Alert Card */}
<div className="bg-[#FFFFFF] border border-[#F9C6C9] border-t-4 border-t-[#EE1C25] rounded-xl p-5 shadow-sm">
<div className="flex items-center gap-2 text-[#8E0E17]">
<span className="material-symbols-outlined text-[20px] text-[#EE1C25]">warning</span>
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Need urgent care?</h3>
</div>
<p className="font-caption text-caption text-[#78716C] mt-2 leading-relaxed">
            Acute allergic anaphylaxis, extensive chemical burns, or rapid facial angioedema require instant critical care dispatch.
          </p>
<Link className="mt-4 w-full h-10 bg-[#EE1C25] hover:bg-[#C1121F] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center gap-2 transition active:scale-95 shadow-sm" href="tel:108">
<span className="w-2 h-2 rounded-full bg-white emergency-pulse"></span>
            Call 108 (24x7 Medical)
          </Link>
</div>
{/* CARD 3: Curxx Trust Guarantee */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 space-y-3.5">
<h4 className="font-caption-strong text-caption-strong text-[#1C1917] tracking-wider uppercase">Curxx Care Shield</h4>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[20px] text-[#047857] mt-0.5" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<div>
<p className="font-caption-strong text-caption-strong text-[#1C1917]">100% Verified Credentials</p>
<p className="font-caption text-caption text-[#78716C]">Every doctor&apos;s KMC medical registration is physically cross-verified.</p>
</div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[20px] text-[#047857] mt-0.5">currency_rupee</span>
<div>
<p className="font-caption-strong text-caption-strong text-[#1C1917]">Zero Wait or Full Refund</p>
<p className="font-caption text-caption text-[#78716C]">Guaranteed on-time consultation slots with 100% money back guarantee.</p>
</div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[20px] text-[#047857] mt-0.5">chat</span>
<div>
<p className="font-caption-strong text-caption-strong text-[#1C1917]">Free 7-Day Follow-Up</p>
<p className="font-caption text-caption text-[#78716C]">Ask follow-up questions to your dermatologist at no added cost.</p>
</div>
</div>
</div>
</aside>
</div>
</main>
{/* ==================== SEO CONTENT BLOCK & ACCORDION ==================== */}
<section className="bg-[#FAFAF9] border-y border-[#E7E5E4] py-12">
<div className="w-full max-w-[900px] mx-auto px-6">
{/* Informational Article */}
<div className="space-y-4">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">About Dermatological Care in Bangalore</h2>
<p className="text-body-default font-body-default text-[#5c403d] leading-relaxed">
          Bengaluru’s unique climate—characterized by elevated humidity during monsoon spells paired with dry winters and notorious borewell hard water—contributes extensively to local dermatological challenges. Hard water with elevated dissolved calcium and magnesium precipitates lipid barrier disruption, exacerbating eczema flare-ups, follicular blockages, and premature scalp dryness.
        </p>
<p className="text-body-default font-body-default text-[#5c403d] leading-relaxed">
          Urban microclimates in tech corridors like Whitefield, Indiranagar, and Electronic City additionally expose skin to persistent particulate pollutants (PM2.5), driving oxidative skin damage, contact dermatitis, and recurring cystic acne. Certified dermatologists listed on Curxx practice evidence-based protocolized care, steering patients away from hazardous over-the-counter steroid creams toward validated pharmacotherapy, clinical chemical peels, and laser interventions.
        </p>
<p className="text-body-default font-body-default text-[#5c403d] leading-relaxed">
          Whether you require targeted intervention for chronic psoriasis, sudden scalp thinning, fungal infections resistant to home remedies, or cosmetic consultation for post-acne pigmentation, selecting a board-certified dermatologist ensures your care aligns strictly with Indian Association of Dermatologists, Venereologists and Leprologists (IADVL) guidelines.
        </p>
{/* Common Conditions Grid */}
<div className="pt-4">
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Common Conditions Treated</h3>
<div className="grid grid-cols-2 gap-x-6 gap-y-2 text-caption font-caption text-[#1C1917]">
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span>
<span>Acne Vulgaris, Cystic Breakouts &amp; Scar Revision</span>
</div>
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span>
<span>Alopecia Areata, Telogen Effluvium &amp; Male/Female Pattern Hair Thinning</span>
</div>
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span>
<span>Eczema, Atopic Dermatitis &amp; Contact Allergies</span>
</div>
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span>
<span>Tinea Cruris, Candidiasis &amp; Recurrent Fungal Dermatitis</span>
</div>
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span>
<span>Melasma, Hyperpigmentation &amp; Sun Damaged Skin</span>
</div>
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span>
<span>Psoriasis Management &amp; Phototherapy Protocols</span>
</div>
</div>
</div>
</div>
{/* FAQ Section */}
<div className="mt-10 pt-8 border-t border-[#E7E5E4] space-y-3">
<h3 className="font-headline-h2 text-headline-h2 text-[#1C1917] mb-4">Frequently Asked Questions</h3>
{/* FAQ Item 1 */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg p-4">
<button className="w-full flex items-center justify-between text-left font-body-strong text-body-strong text-[#1C1917]">
<span>1. What is the consultation fee of a top dermatologist in Bangalore?</span>
<span className="material-symbols-outlined text-[20px] text-[#78716C]">expand_more</span>
</button>
<div className="mt-2 text-caption font-caption text-[#5c403d] leading-relaxed">
            Consultation fees typically range between ₹500 to ₹1,200 depending on the specialist&apos;s clinical experience, hospital affiliation, and locality. Virtual video consultations on Curxx start from ₹349.
          </div>
</div>
{/* FAQ Item 2 */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg p-4">
<button className="w-full flex items-center justify-between text-left font-body-strong text-body-strong text-[#1C1917]">
<span>2. Can I consult a dermatologist online via Curxx?</span>
<span className="material-symbols-outlined text-[20px] text-[#78716C]">expand_more</span>
</button>
<div className="mt-2 text-caption font-caption text-[#5c403d] leading-relaxed">
            Yes. Curxx offers instant and scheduled teleconsultations with HD video, allowing secure digital image upload for skin lesions, automated e-prescriptions, and continuous chat follow-up for 7 days.
          </div>
</div>
{/* FAQ Item 3 */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg p-4">
<button className="w-full flex items-center justify-between text-left font-body-strong text-body-strong text-[#1C1917]">
<span>3. How soon can I get an in-person clinic appointment?</span>
<span className="material-symbols-outlined text-[20px] text-[#78716C]">expand_more</span>
</button>
<div className="mt-2 text-caption font-caption text-[#5c403d] leading-relaxed">
            Most participating clinics in prime Bengaluru localities like Indiranagar, Koramangala, and HSR Layout feature same-day walk-in tokens or guaranteed appointment slots within 2 to 4 hours.
          </div>
</div>
{/* FAQ Item 4 */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg p-4">
<Link href="/records" className="w-full flex items-center justify-between text-left font-body-strong text-body-strong text-[#1C1917]">
<span>4. Are dermatologist consultations covered under ABHA or health insurance?</span>
<span className="material-symbols-outlined text-[20px] text-[#78716C]">expand_more</span>
</Link>
<div className="mt-2 text-caption font-caption text-[#5c403d] leading-relaxed">
            Yes. Curxx natively links with your 14-digit ABHA (Ayushman Bharat Health Account) ID. OPD consultations and minor procedures can be processed via leading OPD health insurance plans and corporate flexi-benefits.
          </div>
</div>
{/* FAQ Item 5 */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg p-4">
<button className="w-full flex items-center justify-between text-left font-body-strong text-body-strong text-[#1C1917]">
<span>5. How does Curxx verify doctor credentials?</span>
<span className="material-symbols-outlined text-[20px] text-[#78716C]">expand_more</span>
</button>
<div className="mt-2 text-caption font-caption text-[#5c403d] leading-relaxed">
            Our clinical compliance cell validates every doctor against Karnataka Medical Council (KMC) registries, verified postgraduate medical degrees (MD/DVD/DNB), and clinic ownership certificates prior to onboarding.
          </div>
</div>
{/* FAQ Item 6 */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg p-4">
<button className="w-full flex items-center justify-between text-left font-body-strong text-body-strong text-[#1C1917]">
<span>6. Does a consultation include a free follow-up?</span>
<span className="material-symbols-outlined text-[20px] text-[#78716C]">expand_more</span>
</button>
<div className="mt-2 text-caption font-caption text-[#5c403d] leading-relaxed">
            Every booking on Curxx provides a complimentary 7-day text chat follow-up with the doctor, enabling patients to clarify lab test results or dosage changes without an additional consultation fee.
          </div>
</div>
</div>
</div>
</section>
{/* ==================== INTERNAL LINK CLUSTERS ==================== */}
<section className="bg-[#FFFFFF] py-10">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-8">
{/* Locality Links */}
<div>
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Dermatologists by locality in Bangalore</h3>
<div className="grid grid-cols-4 gap-y-2 text-caption font-caption">
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Koramangala</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Indiranagar</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Whitefield</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in HSR Layout</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Jayanagar</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Electronic City</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Marathahalli</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Malleshwaram</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Banashankari</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Bellandur</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in RT Nagar</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in JP Nagar</Link>
</div>
</div>
{/* Other Cities */}
<div>
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Dermatologists in other cities</h3>
<div className="grid grid-cols-4 gap-y-2 text-caption font-caption">
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Mumbai</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Delhi NCR</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Hyderabad</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Chennai</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Pune</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Kolkata</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Ahmedabad</Link>
<Link className="text-[#78716C] hover:text-[#C1121F] transition-colors" href="/bangalore/dermatologist">Dermatologists in Jaipur</Link>
</div>
</div>
{/* Related Specialties */}
<div>
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Related specialties</h3>
<div className="grid grid-cols-4 gap-y-2 text-caption font-caption">
<Link href="/bangalore/trichologist" className="text-[#78716C] hover:text-[#C1121F] transition-colors">Trichologist</Link>
<Link href="/bangalore/cosmetic-surgeon" className="text-[#78716C] hover:text-[#C1121F] transition-colors">Cosmetic Surgeon</Link>
<Link href="/bangalore/venereologist" className="text-[#78716C] hover:text-[#C1121F] transition-colors">Venereologist</Link>
<Link href="/bangalore/general-physician" className="text-[#78716C] hover:text-[#C1121F] transition-colors">General Physician</Link>
<Link href="/bangalore/pediatric-dermatologist" className="text-[#78716C] hover:text-[#C1121F] transition-colors">Pediatric Dermatologist</Link>
<Link href="/bangalore/allergist" className="text-[#78716C] hover:text-[#C1121F] transition-colors">Allergist &amp; Immunologist</Link>
</div>
</div>
</div>
</section>
<Footer />

    </>
  );
}
