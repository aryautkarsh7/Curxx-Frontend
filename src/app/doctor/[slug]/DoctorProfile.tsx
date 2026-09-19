
'use client';
import Link from 'next/link';
import type { Doctor } from '@/lib/doctors';
import { getSpecialty } from '@/lib/specialties';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';

export default function DoctorDrpriyasharmaPagePage({ doctor }: { doctor: Doctor }) {
  return (
    <>
      
<Header />
{/* BREADCRUMB */}
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop pt-4 pb-2">
<nav className="flex items-center gap-1.5 font-caption text-caption text-[#78716C]">
<Link href="/" className="hover:text-[#1C1917]">Home</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<Link href="/bangalore/specialties" className="hover:text-[#1C1917]">Bangalore</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<Link className="hover:text-[#1C1917]" href={`/bangalore/${doctor.specialty}`}>{getSpecialty(doctor.specialty)?.plural ?? 'Doctors'}</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-[#C1121F] font-caption-strong text-caption-strong">{doctor.name}</span>
</nav>
</div>
{/* MAIN CANVAS CONTAINER (Two Column Grid: 780px Main + 360px Sticky Sidebar, 32px gap) */}
<main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-4 pb-16">
<div className="flex flex-col lg:flex-row gap-8 items-start">
{/* MAIN COLUMN (~780px) */}
<section className="flex-1 w-full space-y-6">
{/* 1. HERO CARD */}
<article className="bg-white border border-[#E7E5E4] rounded-2xl p-8 relative">
{/* Top Right Action Controls */}
<div className="absolute top-6 right-6 flex items-center gap-2">
<Link href="/records?share=1" className="p-2 rounded-lg border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9] transition duration-150" title="Share profile">
<span className="material-symbols-outlined text-[20px]">share</span>
</Link>
<button className="p-2 rounded-lg border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9] transition duration-150" title="Save doctor">
<span className="material-symbols-outlined text-[20px]">bookmark</span>
</button>
</div>
<div className="flex flex-col sm:flex-row gap-6 items-start">
{/* Doctor Portrait */}
<div className="relative shrink-0">
<img loading="lazy" decoding="async" alt={`${doctor.name}`} className="w-[120px] h-[120px] rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-[#E7E5E4]" data-alt="High-resolution clinical portrait of Dr Priya Sharma, an authoritative Indian female dermatologist in crisp white medical coat with stethoscope wearing subtle gold earrings and gentle approachable smile against soft architectural clinic interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNzU1hZdZyNI_DPkWSf7MoRRp-QH1gKiXDo2-7-FRUM7Lwn_DIucI7NhACYjTQEy4BaA3S9ZmyDaVP8UgAIWxdaNzs3-h63d3a-ImMpVUk7ebYjbuEq_dBuTOaLuVguQYCe0DrRpxJd1cjuGrrZ1R-FvB7TOHmysoo5YF2bqRmtFgJOaB1fzCCp3vQs2GrqH-ULObcTs9uPvO0w7zImVtiCUN1RNCDkHAzWhTRbG-cDlnVYElar9MF=w240"/>
<span className="absolute bottom-1 right-1 bg-[#047857] text-white p-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs" title="Board Certified &amp; Verified">
<span className="material-symbols-outlined text-[16px] font-bold">check</span>
</span>
</div>
{/* Identity Core */}
<div className="space-y-1.5 flex-1 pr-16">
<div className="flex items-center gap-2 flex-wrap">
<h1 className="font-display text-display text-[#1C1917] tracking-tight">{doctor.name}</h1>
<span className="inline-flex items-center gap-1 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-2 py-0.5 rounded-full font-micro text-micro">
<span className="material-symbols-outlined text-[12px] font-semibold">verified</span>
                  Verified Specialist
                </span>
</div>
<p className="font-body-default text-body-default text-[#78716C]">{doctor.qualification}</p>
<p className="font-body-strong text-body-strong text-[#1C1917]">{doctor.title}</p>
<div className="flex items-center gap-1.5 pt-1 text-[#78716C] font-caption text-caption">
<span className="material-symbols-outlined text-[16px] text-[#047857]">shield</span>
<span>KMC Reg. No: 64829 · Physically Verified Credentials</span>
</div>
</div>
</div>
{/* Stat Strip */}
<div className="mt-6 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-4 grid grid-cols-3 divide-x divide-[#E7E5E4]">
<div className="px-3 text-center">
<div className="font-headline-h2 text-headline-h2 text-[#047857] font-bold">98%</div>
<div className="font-caption-strong text-caption-strong text-[#1C1917]">Recommended</div>
<div className="font-caption text-caption text-[#78716C]">from 1,240 patients</div>
</div>
<div className="px-3 text-center">
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">1,240</div>
<div className="font-caption-strong text-caption-strong text-[#1C1917]">Patient Stories</div>
<div className="font-caption text-caption text-[#78716C]">Verified consults</div>
</div>
<div className="px-3 text-center">
<div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">14 Yrs</div>
<div className="font-caption-strong text-caption-strong text-[#1C1917]">Clinical Practice</div>
<div className="font-caption text-caption text-[#78716C]">Post-MD practice</div>
</div>
</div>
{/* Spoken Languages */}
<div className="mt-5 flex items-center gap-2 flex-wrap">
<span className="font-caption-strong text-caption-strong text-[#78716C] mr-1">Speaks:</span>
<span className="px-3 py-1 bg-[#F5F5F4] border border-[#E7E5E4] rounded-full font-caption text-caption text-[#1C1917]">English</span>
<span className="px-3 py-1 bg-[#F5F5F4] border border-[#E7E5E4] rounded-full font-caption text-caption text-[#1C1917]">Hindi (हिंदी)</span>
<span className="px-3 py-1 bg-[#F5F5F4] border border-[#E7E5E4] rounded-full font-caption text-caption text-[#1C1917]">Kannada (ಕನ್ನಡ)</span>
<span className="px-3 py-1 bg-[#F5F5F4] border border-[#E7E5E4] rounded-full font-caption text-caption text-[#1C1917]">Tamil (தமிழ்)</span>
</div>
</article>
{/* 2. STICKY IN-PAGE TAB BAR */}
<nav className="overflow-x-auto no-scrollbar sticky top-16 z-40 bg-white border-b border-[#E7E5E4] -mx-1 px-4 flex items-center gap-8 shadow-xs">
<Link className="py-3 font-body-strong text-body-strong text-[#C1121F] border-b-2 border-[#C1121F]" href="#overview">Overview</Link>
<Link className="py-3 font-body-default text-body-default text-[#78716C] hover:text-[#1C1917] border-b-2 border-transparent transition duration-150" href="#services">Services</Link>
<Link className="py-3 font-body-default text-body-default text-[#78716C] hover:text-[#1C1917] border-b-2 border-transparent transition duration-150" href="#reviews">Reviews (1,240)</Link>
<Link className="py-3 font-body-default text-body-default text-[#78716C] hover:text-[#1C1917] border-b-2 border-transparent transition duration-150" href="#clinics">Clinics</Link>
<Link className="py-3 font-body-default text-body-default text-[#78716C] hover:text-[#1C1917] border-b-2 border-transparent transition duration-150" href="#faqs">FAQs</Link>
</nav>
{/* 3. OVERVIEW SECTION */}
<section className="bg-white border border-[#E7E5E4] rounded-2xl p-8 space-y-6" id="overview">
<div>
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917] mb-3">About {doctor.name}</h2>
<p className="font-body-default text-body-default text-[#1C1917] leading-relaxed">
              {doctor.name} is a distinguished Senior Dermatologist and Dermatosurgeon with over 14 years of clinical excellence across leading institutes including AIIMS New Delhi and Manipal Hospitals. She specializes in evidence-based management of recalcitrant adult acne, pediatric dermatoses, advanced fractional laser revisions, and hair loss protocols. Her patient-first methodology combines cutting-edge clinical precision with tailored lifestyle interventions to achieve sustained, holistic dermatological health.
              <Link href="#overview" className="text-[#C1121F] font-body-strong text-body-strong ml-1 hover:underline">Read more</Link>
</p>
</div>
{/* Specialisations Wrap */}
<div className="pt-2">
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Specialisations</h3>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Clinical Dermatology</span>
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Pediatric Dermatology</span>
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Acne &amp; Scar Revision</span>
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Laser Hair Reduction</span>
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Chemical Peels</span>
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Melasma Treatment</span>
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Hair Loss Management</span>
<span className="px-3 py-1 bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-caption-strong rounded-full">Psoriasis Care</span>
</div>
</div>
{/* Education & Medical Training Vertical Timeline */}
<div className="pt-2">
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-4">Education &amp; Medical Training</h3>
<div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#E7E5E4]">
{/* Node 1 */}
<div className="relative">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white border-2 border-[#C1121F] flex items-center justify-center">
<div className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></div>
</div>
<div className="font-body-strong text-body-strong text-[#1C1917]">Fellowship in Pediatric Dermatology</div>
<div className="font-caption text-caption text-[#78716C]">Royal Children&apos;s Hospital, Melbourne · 2016</div>
</div>
{/* Node 2 */}
<div className="relative">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white border-2 border-[#78716C] flex items-center justify-center">
<div className="w-1.5 h-1.5 rounded-full bg-[#78716C]"></div>
</div>
<div className="font-body-strong text-body-strong text-[#1C1917]">MD - Dermatology, Venereology &amp; Leprosy</div>
<div className="font-caption text-caption text-[#78716C]">All India Institute of Medical Sciences (AIIMS), New Delhi · 2014</div>
</div>
{/* Node 3 */}
<div className="relative">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white border-2 border-[#78716C] flex items-center justify-center">
<div className="w-1.5 h-1.5 rounded-full bg-[#78716C]"></div>
</div>
<div className="font-body-strong text-body-strong text-[#1C1917]">MBBS</div>
<div className="font-caption text-caption text-[#78716C]">Bangalore Medical College and Research Institute (BMCRI) · 2010</div>
</div>
</div>
</div>
{/* Clinical Experience */}
<div className="pt-2">
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Experience</h3>
<div className="space-y-3">
<div className="p-3.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] flex items-start gap-3">
<span className="material-symbols-outlined text-[#78716C] text-[22px] mt-0.5">apartment</span>
<div>
<div className="font-body-strong text-body-strong text-[#1C1917]">Head of Dermatology</div>
<div className="font-caption text-caption text-[#78716C]">Kaya Skin &amp; Wellness Clinic, Indiranagar · 2018 - Present (6 yrs)</div>
</div>
</div>
<div className="p-3.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] flex items-start gap-3">
<span className="material-symbols-outlined text-[#78716C] text-[22px] mt-0.5">local_hospital</span>
<div>
<div className="font-body-strong text-body-strong text-[#1C1917]">Senior Resident</div>
<div className="font-caption text-caption text-[#78716C]">Manipal Hospital, HAL Airport Road · 2014 - 2018 (4 yrs)</div>
</div>
</div>
</div>
</div>
{/* Awards & Memberships */}
<div className="pt-2">
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917] mb-3">Awards &amp; Memberships</h3>
<ul className="space-y-2">
<li className="flex items-center gap-2.5 text-[#1C1917] font-body-default text-body-default">
<span className="material-symbols-outlined text-[#047857] text-[18px]">verified</span>
<span>Gold Medalist in MD Dermatology — All India Institute of Medical Sciences (AIIMS)</span>
</li>
<li className="flex items-center gap-2.5 text-[#1C1917] font-body-default text-body-default">
<span className="material-symbols-outlined text-[#047857] text-[18px]">verified</span>
<span>Life Member, Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)</span>
</li>
<li className="flex items-center gap-2.5 text-[#1C1917] font-body-default text-body-default">
<span className="material-symbols-outlined text-[#047857] text-[18px]">verified</span>
<span>Active International Fellow, International Society of Dermatology (ISD)</span>
</li>
</ul>
</div>
</section>
{/* 4. SERVICES & TREATMENTS SECTION */}
<section className="bg-white border border-[#E7E5E4] rounded-2xl p-8" id="services">
<div className="flex items-center justify-between mb-6">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Treatments &amp; Consultations</h2>
<span className="font-caption text-caption text-[#78716C]">Standardized pricing in INR (₹)</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/* Treatment 1 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Acne &amp; Acne Scar Treatment</h4>
<p className="font-caption text-caption text-[#78716C]">Extraction &amp; topical regimens</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹800</span>
<span className="block font-micro text-micro text-[#78716C]">onwards</span>
</div>
</div>
{/* Treatment 2 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Laser Hair Removal</h4>
<p className="font-caption text-caption text-[#78716C]">US-FDA triple diode system</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹1,500</span>
<span className="block font-micro text-micro text-[#78716C]">onwards</span>
</div>
</div>
{/* Treatment 3 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Chemical Peels</h4>
<p className="font-caption text-caption text-[#78716C]">Glycolic, Salicylic &amp; Yellow peel</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹1,200</span>
<span className="block font-micro text-micro text-[#78716C]">onwards</span>
</div>
</div>
{/* Treatment 4 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Pediatric Skin Consult</h4>
<p className="font-caption text-caption text-[#78716C]">Specialized child derm protocol</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹650</span>
<span className="block font-micro text-micro text-[#78716C]">standard fee</span>
</div>
</div>
{/* Treatment 5 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Hair Fall &amp; PRP Therapy</h4>
<p className="font-caption text-caption text-[#78716C]">Autologous platelet concentrate</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹2,200</span>
<span className="block font-micro text-micro text-[#78716C]">per session</span>
</div>
</div>
{/* Treatment 6 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Eczema &amp; Psoriasis Management</h4>
<p className="font-caption text-caption text-[#78716C]">Systemic &amp; biologics roadmap</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹650</span>
<span className="block font-micro text-micro text-[#78716C]">standard fee</span>
</div>
</div>
{/* Treatment 7 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Wart &amp; Skin Tag Removal</h4>
<p className="font-caption text-caption text-[#78716C]">Radiofrequency ablation</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹900</span>
<span className="block font-micro text-micro text-[#78716C]">onwards</span>
</div>
</div>
{/* Treatment 8 */}
<div className="p-4 rounded-xl border border-[#E7E5E4] hover:border-[#78716C] transition duration-150 flex justify-between items-center bg-[#FAFAF9]">
<div>
<h4 className="font-body-strong text-body-strong text-[#1C1917]">Skin Brightening &amp; Melasma</h4>
<p className="font-caption text-caption text-[#78716C]">Targeted depigmentation</p>
</div>
<div className="text-right">
<span className="font-body-strong text-body-strong text-[#1C1917]">₹1,400</span>
<span className="block font-micro text-micro text-[#78716C]">onwards</span>
</div>
</div>
</div>
</section>
{/* 5. REVIEWS & PATIENT STORIES SECTION */}
<section className="bg-white border border-[#E7E5E4] rounded-2xl p-8 space-y-6" id="reviews">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Patient Stories (1,240)</h2>
<p className="font-caption text-caption text-[#78716C]">100% verified appointments completed via Curxx</p>
</div>
</div>
{/* Rating Breakdown Matrix */}
<div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-6 flex flex-col md:flex-row items-center gap-8">
{/* Left Score Column */}
<div className="text-center md:border-r md:border-[#E7E5E4] md:pr-8 shrink-0">
<div className="text-[44px] font-bold leading-none text-[#1C1917] tracking-tight">4.9</div>
<div className="flex items-center justify-center gap-0.5 text-[#D97706] my-1.5">
<span className="material-symbols-outlined text-[20px] fill-icon">star</span>
<span className="material-symbols-outlined text-[20px] fill-icon">star</span>
<span className="material-symbols-outlined text-[20px] fill-icon">star</span>
<span className="material-symbols-outlined text-[20px] fill-icon">star</span>
<span className="material-symbols-outlined text-[20px] fill-icon">star</span>
</div>
<div className="font-caption text-caption text-[#78716C]">Based on 1,240 ratings</div>
</div>
{/* Right Distribution Bars */}
<div className="flex-1 w-full space-y-2">
<div className="flex items-center gap-3 text-caption font-caption">
<span className="w-10 text-[#78716C]">5 star</span>
<div className="flex-1 h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
<div className="h-full bg-[#C1121F] rounded-full" style={{"width":"88%"}}></div>
</div>
<span className="w-8 text-right text-[#1C1917] font-caption-strong">88%</span>
</div>
<div className="flex items-center gap-3 text-caption font-caption">
<span className="w-10 text-[#78716C]">4 star</span>
<div className="flex-1 h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
<div className="h-full bg-[#C1121F] rounded-full" style={{"width":"9%"}}></div>
</div>
<span className="w-8 text-right text-[#1C1917] font-caption-strong">9%</span>
</div>
<div className="flex items-center gap-3 text-caption font-caption">
<span className="w-10 text-[#78716C]">3 star</span>
<div className="flex-1 h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
<div className="h-full bg-[#C1121F] rounded-full" style={{"width":"2%"}}></div>
</div>
<span className="w-8 text-right text-[#1C1917] font-caption-strong">2%</span>
</div>
<div className="flex items-center gap-3 text-caption font-caption">
<span className="w-10 text-[#78716C]">2 star</span>
<div className="flex-1 h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
<div className="h-full bg-[#C1121F] rounded-full" style={{"width":"1%"}}></div>
</div>
<span className="w-8 text-right text-[#1C1917] font-caption-strong">1%</span>
</div>
<div className="flex items-center gap-3 text-caption font-caption">
<span className="w-10 text-[#78716C]">1 star</span>
<div className="flex-1 h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
<div className="h-full bg-[#C1121F] rounded-full" style={{"width":"0%"}}></div>
</div>
<span className="w-8 text-right text-[#1C1917] font-caption-strong">0%</span>
</div>
</div>
</div>
{/* Filter Chips */}
<div className="flex items-center gap-2 flex-wrap">
<button className="px-4 py-1.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#D92D3A] font-caption-strong text-caption-strong">
              All (1,240)
            </button>
<Link href="#reviews" className="px-4 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] font-caption text-caption">
              Video Consult (820)
            </Link>
<button className="px-4 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] font-caption text-caption">
              Clinic Visit (420)
            </button>
<button className="px-4 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917] font-caption text-caption ml-auto flex items-center gap-1">
<span>Most Recent</span>
<span className="material-symbols-outlined text-[16px]">expand_more</span>
</button>
</div>
{/* Review Cards Stack */}
<div className="space-y-4">
{/* Card 1 */}
<div className="p-5 rounded-xl border border-[#E7E5E4] bg-white space-y-3">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center font-body-strong text-body-strong text-[#1C1917]">
                    AK
                  </div>
<div>
<div className="flex items-center gap-2">
<span className="font-body-strong text-body-strong text-[#1C1917]">Ananya Kulkarni</span>
<span className="inline-flex items-center gap-0.5 text-[#047857] font-micro text-micro bg-[#ECFDF5] px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[12px]">verified</span> Verified Visit
                      </span>
</div>
<div className="font-caption text-caption text-[#78716C]">2 days ago · Clinic Visit (Indiranagar)</div>
</div>
</div>
<div className="flex shrink-0 text-[#D97706]">
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
</div>
</div>
<p className="font-body-default text-body-default text-[#1C1917]">
                Dr. Priya was incredibly patient. She diagnosed my persistent adult acne within minutes and prescribed a gentle, non-steroidal regimen that cleared my breakouts in 3 weeks. Her explanation of skin barriers changed my entire skincare routine.
              </p>
<div className="flex items-center gap-2 pt-1 text-[#78716C]">
<button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] font-caption text-caption transition duration-150">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
<span>Helpful (42)</span>
</button>
</div>
</div>
{/* Card 2 */}
<div className="p-5 rounded-xl border border-[#E7E5E4] bg-white space-y-3">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center font-body-strong text-body-strong text-[#1C1917]">
                    RV
                  </div>
<div>
<div className="flex items-center gap-2">
<span className="font-body-strong text-body-strong text-[#1C1917]">Rahul Verma</span>
<span className="inline-flex items-center gap-0.5 text-[#047857] font-micro text-micro bg-[#ECFDF5] px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[12px]">verified</span> Verified Visit
                      </span>
</div>
<div className="font-caption text-caption text-[#78716C]">1 week ago · Video Consult</div>
</div>
</div>
<div className="flex shrink-0 text-[#D97706]">
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
</div>
</div>
<p className="font-body-default text-body-default text-[#1C1917]">
                Seamless video consult. She reviewed my uploaded reports instantly and explained the causes clearly without pushing unnecessary cosmetic treatments. Prescribed medicines were instantly available on the Curxx pharmacy section.
              </p>
<div className="flex items-center gap-2 pt-1 text-[#78716C]">
<button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] font-caption text-caption transition duration-150">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
<span>Helpful (19)</span>
</button>
</div>
</div>
{/* Card 3 */}
<div className="p-5 rounded-xl border border-[#E7E5E4] bg-white space-y-3">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center font-body-strong text-body-strong text-[#1C1917]">
                    SM
                  </div>
<div>
<div className="flex items-center gap-2">
<span className="font-body-strong text-body-strong text-[#1C1917]">Sneha Menon</span>
<span className="inline-flex items-center gap-0.5 text-[#047857] font-micro text-micro bg-[#ECFDF5] px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[12px]">verified</span> Verified Visit
                      </span>
</div>
<div className="font-caption text-caption text-[#78716C]">3 weeks ago · Clinic Visit (HSR Layout)</div>
</div>
</div>
<div className="flex shrink-0 text-[#D97706]">
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
</div>
</div>
<p className="font-body-default text-body-default text-[#1C1917]">
                Visited for pediatric eczema for my 4-year-old son. She was extraordinarily calm and child-friendly. Her fellowship experience in Melbourne clearly shows in how delicately she evaluates sensitive pediatric skin conditions.
              </p>
<div className="flex items-center gap-2 pt-1 text-[#78716C]">
<button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] font-caption text-caption transition duration-150">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
<span>Helpful (28)</span>
</button>
</div>
</div>
{/* Card 4 */}
<div className="p-5 rounded-xl border border-[#E7E5E4] bg-white space-y-3">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center font-body-strong text-body-strong text-[#1C1917]">
                    DP
                  </div>
<div>
<div className="flex items-center gap-2">
<span className="font-body-strong text-body-strong text-[#1C1917]">Deepa Patel</span>
<span className="inline-flex items-center gap-0.5 text-[#047857] font-micro text-micro bg-[#ECFDF5] px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[12px]">verified</span> Verified Visit
                      </span>
</div>
<div className="font-caption text-caption text-[#78716C]">1 month ago · Video Consult</div>
</div>
</div>
<div className="flex shrink-0 text-[#D97706]">
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
<span className="material-symbols-outlined text-[18px] fill-icon">star</span>
</div>
</div>
<p className="font-body-default text-body-default text-[#1C1917]">
                Very thorough consultation. The digital prescription and 7-day chat follow-up gave immense peace of mind. Her advice on sunscreens tailored for humid weather has made a visible difference in hyperpigmentation.
              </p>
<div className="flex items-center gap-2 pt-1 text-[#78716C]">
<button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] font-caption text-caption transition duration-150">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
<span>Helpful (14)</span>
</button>
</div>
</div>
</div>
</section>
{/* 6. CLINICS & PRACTICE LOCATIONS SECTION */}
<section className="bg-white border border-[#E7E5E4] rounded-2xl p-8 space-y-6" id="clinics">
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Clinics &amp; Practice Locations</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Clinic 1 */}
<div className="border border-[#E7E5E4] rounded-xl overflow-hidden bg-white flex flex-col">
<div className="h-32 bg-[#FAFAF9] relative border-b border-[#E7E5E4]" data-alt="Stylized map screenshot interface indicating clinical address in Indiranagar Bengaluru with road markings and location pinpoint icon in high clarity architectural view" data-location="Bengaluru" style={{"backgroundImage":"url('https"}}>
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
<span className="absolute bottom-2 left-3 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2 py-0.5 rounded font-micro text-micro">
                  ● Open Today
                </span>
</div>
<div className="p-5 flex-1 flex flex-col justify-between space-y-4">
<div>
<h3 className="font-body-strong text-body-strong text-[#1C1917]"><Link href="/clinic/manipal-hospital" className="hover:text-[#C1121F] transition">SkinCare Super Specialty Clinic</Link></h3>
<p className="font-caption text-caption text-[#78716C] mt-0.5">100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru</p>
<div className="mt-3 space-y-1 font-caption text-caption">
<div className="flex items-center gap-2 text-[#1C1917]">
<span className="material-symbols-outlined text-[16px] text-[#78716C]">schedule</span>
<span>Today: 4:00 PM - 8:30 PM</span>
</div>
<div className="flex items-center gap-2 text-[#1C1917]">
<span className="material-symbols-outlined text-[16px] text-[#78716C]">payments</span>
<span>Consultation Fee: <strong className="font-body-strong">₹650</strong></span>
</div>
</div>
</div>
<a href="https://www.google.com/maps/search/?api=1&query=Manipal+Hospital+HAL+Airport+Road+Bengaluru" target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] font-body-strong text-body-strong text-[#1C1917] transition duration-150">
                  Get Directions
                </a>
</div>
</div>
{/* Clinic 2 */}
<div className="border border-[#E7E5E4] rounded-xl overflow-hidden bg-white flex flex-col">
<div className="h-32 bg-[#FAFAF9] relative border-b border-[#E7E5E4]" data-alt="Clean minimalist cartographic map representation showing HSR Layout Sector 4 Bengaluru street layout with doctor clinic indicator pin" data-location="Bengaluru" style={{"backgroundImage":"url('https"}}>
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
<span className="absolute bottom-2 left-3 bg-[#F5F5F4] text-[#78716C] border border-[#E7E5E4] px-2 py-0.5 rounded font-micro text-micro">
                  Opens Tomorrow
                </span>
</div>
<div className="p-5 flex-1 flex flex-col justify-between space-y-4">
<div>
<h3 className="font-body-strong text-body-strong text-[#1C1917]">Aura Aesthetics &amp; Polyclinic</h3>
<p className="font-caption text-caption text-[#78716C] mt-0.5">12th Main, HSR Layout Sector 4, Bengaluru</p>
<div className="mt-3 space-y-1 font-caption text-caption">
<div className="flex items-center gap-2 text-[#1C1917]">
<span className="material-symbols-outlined text-[16px] text-[#78716C]">schedule</span>
<span>Tomorrow: 10:00 AM - 2:00 PM</span>
</div>
<div className="flex items-center gap-2 text-[#1C1917]">
<span className="material-symbols-outlined text-[16px] text-[#78716C]">payments</span>
<span>Consultation Fee: <strong className="font-body-strong">₹750</strong></span>
</div>
</div>
</div>
<a href="https://www.google.com/maps/search/?api=1&query=Manipal+Hospital+HAL+Airport+Road+Bengaluru" target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] font-body-strong text-body-strong text-[#1C1917] transition duration-150">
                  Get Directions
                </a>
</div>
</div>
</div>
</section>
</section>
{/* RIGHT COLUMN: STICKY BOOKING CARD (360px fixed desktop width) */}
<aside className="w-full lg:w-full lg:w-[360px] lg:shrink-0 lg:sticky lg:top-24 space-y-3">
<div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm space-y-5">
{/* Mode Segmented Switcher */}
<div className="bg-[#FAFAF9] p-1 border border-[#E7E5E4] rounded-xl grid grid-cols-2 gap-1 text-center font-caption-strong text-caption-strong">
<Link href="/consult/lobby/cx-88421" className="py-2 rounded-lg text-[#78716C] hover:text-[#1C1917] transition duration-150">
              Video (₹349)
            </Link>
<button className="py-2 rounded-lg bg-white border border-[#E7E5E4] text-[#1C1917] shadow-xs">
              Clinic Visit (₹650)
            </button>
</div>
{/* Pricing Block */}
<div className="border-b border-[#E7E5E4] pb-4">
<div className="flex items-baseline gap-2">
<span className="font-display text-display text-[#1C1917]">₹650</span>
<span className="text-[#78716C] line-through font-body-default text-body-default">₹800</span>
<span className="ml-auto bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-2 py-0.5 rounded-full font-micro text-micro">
                Save 19% with Curxx
              </span>
</div>
<div className="font-caption text-caption text-[#78716C] mt-1">Includes 7-day follow-up chat support</div>
</div>
{/* 7-Day Date Horizontal Strip */}
<div>
<div className="flex items-center justify-between mb-2.5">
<span className="font-caption-strong text-caption-strong text-[#1C1917]">Select Date</span>
<span className="font-micro text-micro text-[#78716C]">May 2025</span>
</div>
<div className="grid grid-cols-7 gap-1 text-center">
{/* Active Mon 24 */}
<div className="bg-[#C1121F] text-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer shadow-xs">
<span className="font-micro text-micro text-white/80">Mon</span>
<span className="font-body-strong text-body-strong">24</span>
<span className="w-1 h-1 rounded-full bg-white mt-1"></span>
</div>
{/* Day 2 Tue 25 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer">
<span className="font-micro text-micro text-[#78716C]">Tue</span>
<span className="font-body-strong text-body-strong text-[#1C1917]">25</span>
<span className="w-1 h-1 rounded-full bg-[#047857] mt-1"></span>
</div>
{/* Day 3 Wed 26 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer">
<span className="font-micro text-micro text-[#78716C]">Wed</span>
<span className="font-body-strong text-body-strong text-[#1C1917]">26</span>
<span className="w-1 h-1 rounded-full bg-[#047857] mt-1"></span>
</div>
{/* Day 4 Thu 27 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer">
<span className="font-micro text-micro text-[#78716C]">Thu</span>
<span className="font-body-strong text-body-strong text-[#1C1917]">27</span>
<span className="w-1 h-1 rounded-full bg-[#047857] mt-1"></span>
</div>
{/* Day 5 Fri 28 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer">
<span className="font-micro text-micro text-[#78716C]">Fri</span>
<span className="font-body-strong text-body-strong text-[#1C1917]">28</span>
<span className="w-1 h-1 rounded-full bg-[#047857] mt-1"></span>
</div>
{/* Day 6 Sat 29 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer">
<span className="font-micro text-micro text-[#78716C]">Sat</span>
<span className="font-body-strong text-body-strong text-[#1C1917]">29</span>
<span className="w-1 h-1 rounded-full bg-[#047857] mt-1"></span>
</div>
{/* Day 7 Sun 30 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer opacity-50">
<span className="font-micro text-micro text-[#78716C]">Sun</span>
<span className="font-body-strong text-body-strong text-[#78716C]">30</span>
<span className="w-1 h-1 rounded-full bg-transparent mt-1"></span>
</div>
</div>
</div>
{/* Time Slot Matrix */}
<div className="space-y-4 pt-1">
{/* Morning Slots */}
<div>
<div className="flex items-center gap-1.5 text-caption-strong font-caption-strong text-[#78716C] mb-2">
<span className="material-symbols-outlined text-[16px]">wb_sunny</span>
<span>Morning (3 slots)</span>
</div>
<div className="grid grid-cols-3 gap-2">
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]">10:00 AM</Link>
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]">10:30 AM</Link>
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]">11:15 AM</Link>
</div>
</div>
{/* Afternoon Slots */}
<div>
<div className="flex items-center gap-1.5 text-caption-strong font-caption-strong text-[#78716C] mb-2">
<span className="material-symbols-outlined text-[16px]">wb_twilight</span>
<span>Afternoon (2 slots left)</span>
</div>
<div className="grid grid-cols-3 gap-2">
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-[#F5F5F4] text-[#A8A29E] line-through font-caption text-caption cursor-not-allowed" >02:00 PM</Link>
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]">03:30 PM</Link>
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]">04:15 PM</Link>
</div>
</div>
{/* Evening Slots */}
<div>
<div className="flex items-center gap-1.5 text-caption-strong font-caption-strong text-[#78716C] mb-2">
<span className="material-symbols-outlined text-[16px]">nights_stay</span>
<span>Evening (3 slots)</span>
</div>
<div className="grid grid-cols-3 gap-2">
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]">05:00 PM</Link>
{/* Selected Slot with Red Ring */}
<Link href="/book" className="py-2 text-center rounded-lg border-2 border-[#C1121F] bg-[#FFF1F2] font-caption-strong text-caption-strong text-[#C1121F] shadow-xs">05:45 PM</Link>
<Link href="/book" className="py-2 text-center rounded-lg border border-[#E7E5E4] bg-white hover:border-[#1C1917] font-caption text-caption text-[#1C1917]">06:30 PM</Link>
</div>
</div>
</div>
{/* Slot Hold Notice */}
<div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg p-2.5 flex items-center gap-2">
<span className="material-symbols-outlined text-[#C1121F] text-[18px]">alarm</span>
<span className="font-caption text-caption text-[#1C1917]">Evening slot: <strong>Today, 05:45 PM</strong> held for 10:00 mins</span>
</div>
{/* PRIMARY ACTION CTA (Strict Red Discipline: Sole primary red CTA on the screen canvas) */}
<Link href="/book" className="w-full h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] active:scale-[0.99] text-white font-body-strong text-body-strong tracking-wide shadow-sm transition duration-150 flex items-center justify-center gap-2">
<span>Book Appointment</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
{/* Policies & Trust */}
<div className="space-y-2.5 pt-1">
<div className="flex items-center gap-1.5 text-caption text-caption text-[#78716C]">
<span className="material-symbols-outlined text-[16px] text-[#047857]">check_circle</span>
<span>Free cancellation up to 2 hours before appointment</span>
</div>
<div className="border-t border-[#E7E5E4] pt-3 flex items-center justify-between text-micro font-micro text-[#78716C]">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">bolt</span> Instant Confirm
              </div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">verified_user</span> Verified Doctor
              </div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">lock</span> ABDM Sync
              </div>
</div>
</div>
</div>
{/* Floating Quick Switch Helper Pill */}
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-3 flex items-center justify-between text-caption font-caption text-[#8E0E17]">
<div className="flex items-center gap-2">
<span>⚡ Next Video Slot: <strong>In 15 mins</strong></span>
</div>
<Link className="font-caption-strong text-caption-strong text-[#C1121F] hover:underline" href="/">Switch to Video</Link>
</div>
</aside>
</div>
{/* BELOW THE FOLD SECTION 1: SIMILAR DERMATOLOGISTS IN BANGALORE */}
<section className="mt-16 pt-8 border-t border-[#E7E5E4] space-y-6">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Similar Dermatologists in Bangalore</h2>
<p className="font-caption text-caption text-[#78716C]">Verified board-certified specialists with immediate availability</p>
</div>
<Link className="font-body-strong text-body-strong text-[#C1121F] hover:underline flex items-center gap-1" href="/">
<span>View all 84 specialists</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Doctor 1 */}
<div className="bg-white border border-[#E7E5E4] rounded-xl p-5 flex flex-col justify-between hover:border-[#78716C] transition duration-150 space-y-4">
<div className="flex items-start gap-3">
<img loading="lazy" decoding="async" alt="Dr. Rajeshwari Iyer" className="w-12 h-12 rounded-lg object-cover border border-[#E7E5E4]" data-alt="Portrait of Dr Rajeshwari Iyer, senior South Indian female doctor in clinical attire smiling with warm approachable reassurance against neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7FM8qw0ZhbfA-GD5MVrmxIjZxDIdkG3QQTXU-11V4Ja2GLQ4dArY067QrYLhN1EeWOU08mxovBl2r9ScvNoVqD2BZ9nCFS8jCu1njGSDJxJ7UOPq_9AmC-zD9Y2HWC-PxMB1e45PtzFbY5SIaEjf9IJi84YssDvDTpX1vt0nPw2M2EBjX1J0X6U4xl2xluGYOUckvBoQbHJuUu_WX-1e8kqHMZqXNYzqsrw04-M_zLaK3Qr5kWfwC=w96"/>
<div className="flex-1 min-w-0">
<h3 className="font-body-strong text-body-strong text-[#1C1917] truncate">Dr. Rajeshwari Iyer</h3>
<p className="font-caption text-caption text-[#78716C] truncate">Dermatology · 16 Yrs Exp</p>
<div className="flex items-center gap-1 text-micro font-micro text-[#047857] mt-0.5">
<span className="material-symbols-outlined text-[13px]">thumb_up</span>
<span>98% (890 reviews)</span>
</div>
</div>
</div>
<div className="flex items-center justify-between border-t border-[#E7E5E4] pt-3">
<div>
<span className="font-caption text-caption text-[#78716C]">Indiranagar</span>
<div className="font-body-strong text-body-strong text-[#1C1917]">₹700</div>
</div>
<Link href="/doctor/dr-rajeshwari-iyer" className="px-4 py-2 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#1C1917] font-caption-strong text-caption-strong transition duration-150">
              Book Visit
            </Link>
</div>
</div>
{/* Doctor 2 */}
<div className="bg-white border border-[#E7E5E4] rounded-xl p-5 flex flex-col justify-between hover:border-[#78716C] transition duration-150 space-y-4">
<div className="flex items-start gap-3">
<img loading="lazy" decoding="async" alt="Dr. Ananya Sen" className="w-12 h-12 rounded-lg object-cover border border-[#E7E5E4]" data-alt="Portrait of Dr Ananya Sen, dermatologist in clinic setting with modern diagnostic lab in background dressed in professional medical doctor attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUXrWuweSKXw-JeJJ5Jwy27yqb-TAIJlFh3GCXrZGSb-1BghaACOQX4vOegIf6dx5eh9VbQL5u0dnAB0a4uDjYzTc-JhNBo5L2vDtP7RbuBBMGKdTtS9DPRDSGTSXefuxy1fVwNDDCdaszahi4DOessTCzuYrSaWaV-Xnl5iBhiGrcTQgmaTMJ67FAbCqZB2Y-pO4nF5VJmjl1dNiNr1Dtgrp2WjRVXYqeZQvsk8706VwKjBn6FweG=w96"/>
<div className="flex-1 min-w-0">
<h3 className="font-body-strong text-body-strong text-[#1C1917] truncate">Dr. Ananya Sen</h3>
<p className="font-caption text-caption text-[#78716C] truncate">Cosmetic Derm · 12 Yrs Exp</p>
<div className="flex items-center gap-1 text-micro font-micro text-[#047857] mt-0.5">
<span className="material-symbols-outlined text-[13px]">thumb_up</span>
<span>99% (1,120 reviews)</span>
</div>
</div>
</div>
<div className="flex items-center justify-between border-t border-[#E7E5E4] pt-3">
<div>
<span className="font-caption text-caption text-[#78716C]">Whitefield</span>
<div className="font-body-strong text-body-strong text-[#1C1917]">₹850</div>
</div>
<Link href="/doctor/dr-ananya-sen" className="px-4 py-2 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#1C1917] font-caption-strong text-caption-strong transition duration-150">
              Book Visit
            </Link>
</div>
</div>
{/* Doctor 3 */}
<div className="bg-white border border-[#E7E5E4] rounded-xl p-5 flex flex-col justify-between hover:border-[#78716C] transition duration-150 space-y-4">
<div className="flex items-start gap-3">
<img loading="lazy" decoding="async" alt="Dr. Arvind Swaminathan" className="w-12 h-12 rounded-lg object-cover border border-[#E7E5E4]" data-alt="Portrait of Dr Arvind Swaminathan, experienced male dermatologist in navy medical scrubs with spectacles and serene confident clinical demeanor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJxzDL6aE47GAxqk0Xus65GNwnqn787Ylhf_eSllWbVzdZqtd2NbnU_wpvXweePjrE5OH2tRdj724TxqlMC7phO11SqbhzC1YQ3sASKXucRCo1k4VNFbNN4GorJGQmo8h9PQtBLDPBuvZRxpmHQF8LO4ss672-YG1QuqGc90GVgw4qSbnQzwG5A-E0N-ZpOTUGvEINWryRFCSU5v7YNBQ5hkJAFT8dfxM1xhExZ1-9kibz0Ph5NUUw=w96"/>
<div className="flex-1 min-w-0">
<h3 className="font-body-strong text-body-strong text-[#1C1917] truncate">Dr. Arvind Swaminathan</h3>
<p className="font-caption text-caption text-[#78716C] truncate">Dermatosurgeon · 21 Yrs Exp</p>
<div className="flex items-center gap-1 text-micro font-micro text-[#047857] mt-0.5">
<span className="material-symbols-outlined text-[13px]">thumb_up</span>
<span>97% (1,640 reviews)</span>
</div>
</div>
</div>
<div className="flex items-center justify-between border-t border-[#E7E5E4] pt-3">
<div>
<span className="font-caption text-caption text-[#78716C]">Koramangala</span>
<div className="font-body-strong text-body-strong text-[#1C1917]">₹900</div>
</div>
<Link href="/doctor/dr-arvind-swaminathan" className="px-4 py-2 rounded-lg border border-[#E7E5E4] hover:bg-[#FAFAF9] text-[#1C1917] font-caption-strong text-caption-strong transition duration-150">
              Book Visit
            </Link>
</div>
</div>
</div>
</section>
{/* BELOW THE FOLD SECTION 2: FREQUENTLY ASKED QUESTIONS (Accordion) */}
<section className="mt-16 pt-8 border-t border-[#E7E5E4] space-y-6" id="faqs">
<div>
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Frequently Asked Questions</h2>
<p className="font-caption text-caption text-[#78716C]">Everything you need to know about booking {doctor.name} on Curxx</p>
</div>
<div className="bg-white border border-[#E7E5E4] rounded-2xl divide-y divide-[#E7E5E4]">
{/* Accordion Item 1 */}
<details className="group p-6" open>
<summary className="flex justify-between items-center cursor-pointer list-none font-body-strong text-body-strong text-[#1C1917]">
<span>What happens during the initial consultation with {doctor.name}?</span>
<span className="material-symbols-outlined text-[#78716C] group-open:rotate-180 transition-transform duration-200">expand_more</span>
</summary>
<p className="mt-3 font-body-default text-body-default text-[#78716C] leading-relaxed">
            During your 20-30 minute consultation, Dr. Priya conducts a comprehensive skin and scalp assessment using high-magnification dermatoscopy. She reviews your past medical history, dietary patterns, and previous topical reactions before generating an ABDM-compliant digital prescription with clear instructions.
          </p>
</details>
{/* Accordion Item 2 */}
<details className="group p-6">
<summary className="flex justify-between items-center cursor-pointer list-none font-body-strong text-body-strong text-[#1C1917]">
<span>Can I reschedule or cancel my consultation if an emergency occurs?</span>
<span className="material-symbols-outlined text-[#78716C] group-open:rotate-180 transition-transform duration-200">expand_more</span>
</summary>
<p className="mt-3 font-body-default text-body-default text-[#78716C] leading-relaxed">
            Yes. Full refunds and instantaneous 1-click slot rescheduling are permitted up to 2 hours prior to the booked appointment window. Cancellations made inside 2 hours are subject to a nominal clinic desk fee of ₹100.
          </p>
</details>
{/* Accordion Item 3 */}
<details className="group p-6">
<summary className="flex justify-between items-center cursor-pointer list-none font-body-strong text-body-strong text-[#1C1917]">
<span>Are prescriptions automatically synchronized with my ABHA Health Locker?</span>
<span className="material-symbols-outlined text-[#78716C] group-open:rotate-180 transition-transform duration-200">expand_more</span>
</summary>
<p className="mt-3 font-body-default text-body-default text-[#78716C] leading-relaxed">
            Yes. Curxx is fully certified with the Ayushman Bharat Digital Mission (ABDM). Upon completion of your clinic or video visit, your digitally signed medical receipt and diagnosis are pushed immediately to your 14-digit ABHA ID address.
          </p>
</details>
{/* Accordion Item 4 */}
<details className="group p-6">
<summary className="flex justify-between items-center cursor-pointer list-none font-body-strong text-body-strong text-[#1C1917]">
<span>Is follow-up chat included with the consultation fee?</span>
<span className="material-symbols-outlined text-[#78716C] group-open:rotate-180 transition-transform duration-200">expand_more</span>
</summary>
<p className="mt-3 font-body-default text-body-default text-[#78716C] leading-relaxed">
            Every booking includes a 7-day complimentary chat window with {doctor.name}&apos;s clinical care team. You can clarify dosage schedules, upload progress photographs, or ask questions regarding topical medication reactions at no extra cost.
          </p>
</details>
</div>
</section>
</main>
{/* Mobile sticky action bar */}
<div className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-[#E7E5E4] px-margin py-3 flex items-center gap-3">
<div className="min-w-0">
<p className="font-micro text-micro text-[#78716C]">Consultation fee</p>
<p className="font-headline-h3 text-headline-h3 text-[#1C1917] leading-none">₹{doctor.fee}</p>
</div>
<Link href="/book" className="flex-1 h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">event_available</span>
<span>Book Appointment</span>
</Link>
</div>
<div className="h-20 lg:hidden" aria-hidden="true"></div>
<Footer />

    </>
  );
}
