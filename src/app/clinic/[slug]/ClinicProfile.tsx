
'use client';
import Link from 'next/link';
import type { Facility } from '@/lib/facilities';
import { mapsUrl } from '@/lib/facilities';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxClinicProfileManipalHospitalPage({ facility }: { facility: Facility }) {
  return (
    <>
      
<Header />
{/* ==================== MAIN WRAPPER ==================== */}
<main className="w-full max-w-[1200px] mx-auto px-margin-desktop py-space-md">
{/* BREADCRUMB */}
<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption font-caption text-outline mb-space-base">
<Link href="/" className="hover:text-primary transition-colors">Home</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<Link href="/bangalore/specialties" className="hover:text-primary transition-colors">Bangalore</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<Link href={facility.type === 'hospital' ? '/bangalore/hospitals' : '/bangalore/clinics'} className="hover:text-primary transition-colors">{facility.type === 'hospital' ? 'Hospitals' : 'Clinics'}</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<span className="text-on-surface font-caption-strong text-caption-strong truncate">{facility.name}</span>
</nav>
{/* TOP GALLERY STRIP */}
<section className="grid grid-cols-12 gap-3 h-[380px] rounded-2xl overflow-hidden bg-surface-container-lowest border border-[#E7E5E4] shadow-sm mb-space-base">
{/* Left 65%: Large Hero Exterior / Lobby Photo */}
<div className="col-span-8 relative group overflow-hidden cursor-pointer h-full">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" data-alt="An expansive, architecturally sophisticated modern hospital facade and welcoming glass-enclosed reception lobby in Bangalore, bathed in bright natural daytime illumination with spotless clinical precision, subtle warm beige stone finishes, and organized medical staff movement." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_vDuj7RhVbCr8582fDhCcDxWRErgSbLlkF_PVgTF5UKL74H0xSgdseOh_hD2v6ch5HKPthWRiEV39XgSrjCQWsPOLp0SK9fsiWNRQqRVwpF4tMGddYOV8kqyBGD3YqbcGxsB6ceh76tnFFjhgJsoSiWYkU7LWC2IxFBF55DQfVLH4ypMpFWe4XxzTVXp0Oya2ep50iNoQNs2mmTpP_p87joUTfgMifhdhdy2eaVWLHuYkknbMud1_"/>
<div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E7E5E4] flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]" data-icon="verified">verified</span>
<span className="font-caption-strong text-caption-strong text-on-surface">Main Campus &amp; Quaternary Facility</span>
</div>
</div>
{/* Right 35%: 3 Stacked / Grid Interior & Modern OT Photos */}
<div className="col-span-4 grid grid-rows-2 gap-3 h-full">
{/* Top Interior Photo */}
<div className="relative overflow-hidden cursor-pointer rounded-lg h-full">
<img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" data-alt="A pristine high-tech modern hospital surgical operating room interior with robotic surgical arms, sterile surgical lighting, clean stainless steel carts, and precision clinical monitors, styled in modern medical minimalism." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-yeCH51N12rpPo_7G6QMICKO9iJHLhO5ZRVk0lmOrt1YeQupaCNjnwLZcuapTVpibWhJUa2w4qzgz6nsS7bzPCsi-cJCsHMuJgn9za5FoR6BkS-4VlmUuxK-VN5DV6S06-RIgtkMLdirPtkfQ0XvkDLMgcO9dTyD2be344CRi2mUpU4g4k90PyNQfxT88gJEi81dBS6rG2cEYX0ev9u64qiJf1_g_v1DONcbk2fXWlpPRfU0Co2WA"/>
</div>
{/* Bottom Row split into two thumbs */}
<div className="grid grid-cols-2 gap-3 h-full">
<div className="relative overflow-hidden cursor-pointer rounded-lg h-full">
<img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" data-alt="A serene private inpatient hospital suite with ergonomic adjustable medical bed, comfortable visitor couch, warm clinical lighting, and large clean windows looking out onto city greenery." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfzKL6Q8O6ls-Ky7XuL_bnIIA5GQeTgMBZ6efqhoQCZCSDTa8B9SP7DEsEoiCiBEFszl8dzPNQFyaiZupPYWeHa_NDF3qmu_-IV3N_-Q0U87clhzPXzPwWZRBiiM73iYn-_a84qKC9dsIttg9Ue5G276FHiHEslz-BedoDX0WQ00zXMz6di3XgMyG7vg1GkV97vkkJxTGhLsI5D72Wha3x0ftmdGEu_cx-5ZVkM03ZrbMtJ188F5dS"/>
</div>
{/* Last thumb with overlay badge */}
<div className="relative overflow-hidden cursor-pointer rounded-lg h-full group">
<img className="w-full h-full object-cover" data-alt="An advanced 24x7 hospital digital diagnostic laboratory and radiology suite equipped with state of the art imaging systems, high-key clean medical lighting, and disciplined clinical aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5maQC4_2pVFYelgad4s_4Yd5Yh052lwER8v8BhElSpiINqnYdFEu9HY71M4Y-QWOnU8Ivvn04taVPhGkc1wzu80_XNMPFcvs0mvI_u--GQI6led4Io_-0nHRQgi4h1XCrwl0kIwrSLibs4p7Pg7W-ZZ5HIXDXAtMAY_a2tZhV9G9VYXzvixGRTXqEIYJWwTq085xj25Z4RY98ipBlypQOsv42-UMWPaR-dMsvB7Hmc9m6WwONy5C5"/>
<div className="absolute inset-0 bg-on-surface/60 group-hover:bg-on-surface/70 transition-colors flex flex-col items-center justify-center text-center p-2 text-white">
<span className="material-symbols-outlined text-[24px] mb-0.5" data-icon="photo_library">photo_library</span>
<span className="font-caption-strong text-caption-strong tracking-wide">+8 photos</span>
<span className="font-micro text-micro text-white/90">View Gallery</span>
</div>
</div>
</div>
</div>
</section>
{/* CLINIC HERO BANNER */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-6 mb-space-lg shadow-sm">
<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
{/* Left Banner Details */}
<div className="space-y-3 max-w-3xl">
{/* Badges Row */}
<div className="flex flex-wrap items-center gap-2">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[14px]" data-icon="check_circle" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
              NABH Accredited
            </span>
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container border border-surface-variant text-on-surface-variant font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[14px]" data-icon="verified_user">verified_user</span>
              NABL Certified Diagnostics
            </span>
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#EE1C25] font-caption-strong text-caption-strong">
<span className="material-symbols-outlined text-[14px] text-[#EE1C25]" data-icon="emergency" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>emergency</span>
              24x7 Trauma &amp; Emergency Center
            </span>
</div>
{/* Clinic Title in Display Size */}
<h1 className="text-display font-display text-on-surface tracking-tight">
            {facility.name}
          </h1>
{/* Subtitle */}
<p className="text-caption font-caption text-outline flex items-center gap-2 flex-wrap">
<span>Tertiary Care Hospital</span>
<span>•</span>
<span>Established 1991</span>
<span>•</span>
<span>600 Beds</span>
<span>•</span>
<span>45+ Clinical Specialties</span>
</p>
{/* Address Row */}
<div className="flex items-start sm:items-center gap-2 text-body-default font-body-default text-on-surface pt-1">
<span className="material-symbols-outlined text-[18px] text-outline shrink-0 mt-0.5 sm:mt-0" data-icon="pin_drop">pin_drop</span>
<span className="text-on-surface-variant">98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017</span>
<a href={mapsUrl(`${facility.name} Bengaluru`)} target="_blank" rel="noopener noreferrer" className="font-body-strong text-body-strong text-primary hover:underline ml-1 inline-flex items-center gap-0.5">
<span>Get Directions</span>
<span className="material-symbols-outlined text-[14px]" data-icon="open_in_new">open_in_new</span>
</a>
</div>
</div>
{/* Quick Action Buttons on Right */}
<div className="flex sm:flex-row lg:flex-col items-stretch gap-2.5 shrink-0">
<a className="h-11 px-4 rounded-lg border border-[#E7E5E4] bg-surface-container-lowest text-on-surface font-body-strong text-body-strong flex items-center justify-center gap-2 hover:bg-surface-container-low transition" href="tel:08025024444">
<span className="material-symbols-outlined text-[18px] text-primary" data-icon="call">call</span>
<span>080 2502 4444</span>
</a>
<div className="flex items-center gap-2">
<Link href="/records?share=1" className="flex-1 h-11 px-3 rounded-lg border border-[#E7E5E4] bg-surface-container-lowest text-on-surface font-caption-strong text-caption-strong flex items-center justify-center gap-1.5 hover:bg-surface-container-low transition">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="share">share</span>
<span>Share</span>
</Link>
<button className="flex-1 h-11 px-3 rounded-lg border border-[#E7E5E4] bg-surface-container-lowest text-on-surface font-caption-strong text-caption-strong flex items-center justify-center gap-1.5 hover:bg-surface-container-low transition">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="bookmark">bookmark</span>
<span>Save</span>
</button>
</div>
</div>
</div>
</section>
{/* ==================== TWO-COLUMN BODY ==================== */}
<div className="grid grid-cols-12 gap-space-lg items-start">
{/* ==================== LEFT COLUMN: MAIN CONTENT (~65%) ==================== */}
<div className="col-span-12 lg:col-span-8 space-y-space-xl">
{/* Sticky Sub-Navigation Tab Bar */}
<div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-b border-[#E7E5E4] py-2 flex items-center gap-6">
<button className="text-primary font-body-strong text-body-strong border-b-2 border-primary pb-2 flex items-center gap-1.5">
<span>Overview</span>
</button>
<button className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 flex items-center gap-1 transition">
<span>Doctors</span>
<span className="px-1.5 py-0.5 text-micro font-micro rounded-full bg-surface-container text-outline">42</span>
</button>
<button className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 transition">
            Services &amp; Treatments
          </button>
<button className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 transition">
            Timings
          </button>
<button className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 flex items-center gap-1 transition">
<span>Reviews</span>
<span className="text-micro font-micro text-tertiary flex items-center">
              4.8 <span className="material-symbols-outlined text-[12px] text-tertiary ml-0.5" data-icon="star" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</span>
</button>
</div>
{/* 1. OVERVIEW SECTION */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-6 space-y-space-lg shadow-sm">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-3">About the Hospital</h2>
<div className="text-body-default font-body-default text-on-surface-variant space-y-3">
<p>
                Manipal Super Specialty Hospital, HAL Airport Road, is Bangalore&apos;s pioneer quaternary healthcare institution, offering unmatched medical excellence for over three decades. Renowned for multi-organ transplants, robotic-assisted cardiovascular surgeries, and comprehensive oncology care, the facility maintains stringent NABH and NABL benchmarks that set clinical standards across South India.
              </p>
<p>
                Featuring over 600 beds, 20 advanced laminar flow modular operation theaters, and an internationally certified Level 1 Trauma Center, the center combines empathetic bedside nursing with precision-guided digital therapeutics and seamless ABHA digital health record integrations.
              </p>
</div>
</div>
{/* Facilities Grid: 8 icon blocks with tinted #FFF1F2 badges */}
<div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface mb-4">Core Clinical Facilities</h3>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="emergency_heat">emergency_heat</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">24/7 Emergency &amp; ICU</span>
</div>
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="monitor_heart">monitor_heart</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">Digital Cath Lab</span>
</div>
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="local_pharmacy">local_pharmacy</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">In-House 24/7 Pharmacy</span>
</div>
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="bloodtype">bloodtype</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">Advanced Blood Bank</span>
</div>
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="shield_person">shield_person</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">Cashless TPA Desk</span>
</div>
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="ambulance">ambulance</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">Dedicated Ambulance Fleet</span>
</div>
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="local_parking">local_parking</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">Free Valet Parking</span>
</div>
<div className="p-3 rounded-xl border border-[#E7E5E4] bg-surface-container-lowest flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px] text-primary" data-icon="accessible">accessible</span>
</div>
<span className="font-caption-strong text-caption-strong text-on-surface leading-tight">Wheelchair Friendly</span>
</div>
</div>
</div>
{/* Cashless Insurance Partners */}
<div>
<div className="flex items-center justify-between mb-3">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">Cashless Insurance Partners</h3>
<span className="text-caption font-caption text-primary">30+ TPAs supported</span>
</div>
<div className="flex flex-wrap items-center gap-2">
<span className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] bg-surface-container-low font-caption-strong text-caption-strong text-on-surface">Star Health</span>
<span className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] bg-surface-container-low font-caption-strong text-caption-strong text-on-surface">HDFC ERGO</span>
<span className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] bg-surface-container-low font-caption-strong text-caption-strong text-on-surface">ICICI Lombard</span>
<span className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] bg-surface-container-low font-caption-strong text-caption-strong text-on-surface">Medi Assist</span>
<span className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] bg-surface-container-low font-caption-strong text-caption-strong text-on-surface">Max Bupa / Niva Bupa</span>
<span className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] bg-surface-container-low font-caption-strong text-caption-strong text-on-surface">Care Health</span>
<span className="px-3 py-1.5 rounded-lg border border-tertiary-container/30 bg-[#ECFDF5] text-tertiary font-caption-strong text-caption-strong">CGHS / ECHS Approved</span>
</div>
</div>
{/* Emergency Services Card (full width with #EE1C25 border, #FFF1F2 fill) */}
<div className="rounded-2xl border-2 border-[#EE1C25] bg-[#FFF1F2] p-5">
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
<div className="space-y-1.5">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[24px] text-[#EE1C25]" data-icon="fmd_bad" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>fmd_bad</span>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">Emergency &amp; Trauma Care — Immediate Triage</h3>
</div>
<p className="text-body-default font-body-default text-on-surface-variant max-w-xl">
                  Level 1 Trauma Centre with dedicated resuscitation bays, on-site cardiac emergency catheterization, and immediate OT availability.
                </p>
</div>
<a className="shrink-0 px-5 py-2.5 rounded-lg bg-[#EE1C25] text-white font-body-strong text-body-strong flex items-center gap-2 hover:opacity-95 transition shadow-sm" href="tel:08025024499">
<span className="material-symbols-outlined text-[20px]" data-icon="call">call</span>
<span>Desk: 080 2502 4499</span>
</a>
</div>
</div>
</section>
{/* 2. DOCTORS TAB PREVIEW */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-6 space-y-space-base shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Available Specialists at this Centre</h2>
<Link href="/bangalore/doctors" className="text-primary font-caption-strong text-caption-strong hover:underline flex items-center gap-1">
<span>View all 42 Doctors</span>
<span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{/* Specialty Filter Pills */}
<div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
<button className="px-3.5 py-1.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-primary font-caption-strong text-caption-strong whitespace-nowrap">
              All (42)
            </button>
<button className="px-3.5 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-outline font-caption text-caption hover:border-outline whitespace-nowrap">
              Cardiology (8)
            </button>
<button className="px-3.5 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-outline font-caption text-caption hover:border-outline whitespace-nowrap">
              Dermatology (4)
            </button>
<button className="px-3.5 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-outline font-caption text-caption hover:border-outline whitespace-nowrap">
              Orthopedics (6)
            </button>
<button className="px-3.5 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-outline font-caption text-caption hover:border-outline whitespace-nowrap">
              Neurology (5)
            </button>
<button className="px-3.5 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-outline font-caption text-caption hover:border-outline whitespace-nowrap">
              Pediatrics (6)
            </button>
</div>
{/* 3 Compact Doctor Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
{/* Doctor 1 (Dr. Arvind Swaminathan) */}
<div className="border border-[#E7E5E4] rounded-xl p-4 flex flex-col justify-between bg-surface-container-lowest hover:border-outline transition">
<div className="space-y-3">
<div className="flex items-start gap-3">
<div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-container border border-surface-variant">
<img className="w-full h-full object-cover" data-alt="A portrait of an experienced Indian male orthopedic surgeon with salt-and-pepper hair in clinical doctor coat against a clean light clinical background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEIEsK1Vv60oiBgjAKrK5fZ_w1gqWI4MlDx3UnXqpsoQx052dJvQQFQ6jVRM6gOFxQuMb6GYMv8Z20UFQxKfHT3hlf0kJSjiRQm9EANcRK_Ih4aHcSUouo-OXf_Szdoq-U75L5gipsEvQeMgV214RHZhMYM3H2w9TSZ70nUP1OvmW_5CAoGPpXeHhkQqUTSIcfxfV85b5QncU99hHbCJIJTv2AWfOhcBNve2KR6ZxrUJqeJU-TzwzR"/>
</div>
<div>
<div className="flex items-center gap-1">
<h4 className="font-headline-h3 text-headline-h3 text-on-surface leading-tight">Dr. Arvind Swaminathan</h4>
</div>
<p className="text-caption font-caption text-outline">Orthopedics · Joint Replacement</p>
<span className="inline-flex items-center gap-0.5 text-micro font-micro text-tertiary bg-[#ECFDF5] px-1.5 py-0.5 rounded mt-1">
<span className="material-symbols-outlined text-[12px]" data-icon="verified" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                      NABH Certified
                    </span>
</div>
</div>
<div className="pt-2 border-t border-surface-variant text-caption font-caption text-on-surface-variant space-y-1">
<div className="flex items-center justify-between">
<span className="text-outline">Experience</span>
<span className="font-caption-strong text-caption-strong">21 yrs</span>
</div>
<div className="flex items-center justify-between">
<span className="text-outline">Next Available</span>
<span className="text-tertiary font-caption-strong text-caption-strong">Today 4:00 PM</span>
</div>
<div className="flex items-center justify-between">
<span className="text-outline">Consultation Fee</span>
<span className="text-body-strong font-body-strong text-on-surface">₹900</span>
</div>
</div>
</div>
<Link href="/book" className="mt-4 w-full py-2 bg-primary-container text-white font-caption-strong text-caption-strong rounded-lg hover:bg-primary transition">
                Book OPD
              </Link>
</div>
{/* Doctor 2 (Dr. Rajeshwari Iyer) */}
<div className="border border-[#E7E5E4] rounded-xl p-4 flex flex-col justify-between bg-surface-container-lowest hover:border-outline transition">
<div className="space-y-3">
<div className="flex items-start gap-3">
<div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-container border border-surface-variant">
<img className="w-full h-full object-cover" data-alt="A portrait of a confident female Indian consultant dermatologist with glasses wearing a white medical lab coat in bright clean clinical room lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWU_CrE6HVOe1svsz9NnSlkncM_3ZfQTfrzuSSWzOqcbmN1ditjtfUBECAup4phbD7m-kUJe1Mc-f7NISqZlwhhG9EGWurMrG5Ul8OgS-3eZTUpDommgwyx4dnHI78F5R14dybk7esH0oX7AJzf9eZ54w6eb_DxtCM24RPewa7PnxDcl0BFyaY3O2ljmUfgzfhiLM_ZNGxaXKEJCFhPEwbboubM143enbWf33cSyWki47QZw6mCoXI"/>
</div>
<div>
<h4 className="font-headline-h3 text-headline-h3 text-on-surface leading-tight">Dr. Rajeshwari Iyer</h4>
<p className="text-caption font-caption text-outline">Dermatology · Cosmetology</p>
<span className="inline-flex items-center gap-0.5 text-micro font-micro text-tertiary bg-[#ECFDF5] px-1.5 py-0.5 rounded mt-1">
<span className="material-symbols-outlined text-[12px]" data-icon="verified" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                      NMC Verified
                    </span>
</div>
</div>
<div className="pt-2 border-t border-surface-variant text-caption font-caption text-on-surface-variant space-y-1">
<div className="flex items-center justify-between">
<span className="text-outline">Experience</span>
<span className="font-caption-strong text-caption-strong">16 yrs</span>
</div>
<div className="flex items-center justify-between">
<span className="text-outline">Next Available</span>
<span className="text-tertiary font-caption-strong text-caption-strong">Today 5:30 PM</span>
</div>
<div className="flex items-center justify-between">
<span className="text-outline">Consultation Fee</span>
<span className="text-body-strong font-body-strong text-on-surface">₹700</span>
</div>
</div>
</div>
<Link href="/book" className="mt-4 w-full py-2 bg-primary-container text-white font-caption-strong text-caption-strong rounded-lg hover:bg-primary transition">
                Book OPD
              </Link>
</div>
{/* Doctor 3 (Dr. Sudhir Shenoy) */}
<div className="border border-[#E7E5E4] rounded-xl p-4 flex flex-col justify-between bg-surface-container-lowest hover:border-outline transition">
<div className="space-y-3">
<div className="flex items-start gap-3">
<div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-container border border-surface-variant">
<img className="w-full h-full object-cover" data-alt="A portrait of a senior Indian male cardiologist with stethoscope and formal clinical attire in modern high-end hospital clinic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6gb1vMdruqnzBn49-DMEGoNdG18aZpek5RgMInE-QwxnfqqjOEkSaOIa8jeL8oIqNcq-d22SiRsB-WNE4c8NCSSjmfnBmWWmWAUfqRdiV_V7H2rCxkRrY7TNBrpk2H-Cb0b_9KhhFqwRi101Q2YRra65TnYJG58d9pQQ9mzryviIsM4u4WmaeF2hIZ8dIpjaiw6npUw96g0cqAj34Ay2Xt3xEnKarkisuOXroc6XPHfKBZQMVTGjC"/>
</div>
<div>
<h4 className="font-headline-h3 text-headline-h3 text-on-surface leading-tight">Dr. Sudhir Shenoy</h4>
<p className="text-caption font-caption text-outline">Cardiology · Interventional</p>
<span className="inline-flex items-center gap-0.5 text-micro font-micro text-tertiary bg-[#ECFDF5] px-1.5 py-0.5 rounded mt-1">
<span className="material-symbols-outlined text-[12px]" data-icon="verified" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                      NMC Verified
                    </span>
</div>
</div>
<div className="pt-2 border-t border-surface-variant text-caption font-caption text-on-surface-variant space-y-1">
<div className="flex items-center justify-between">
<span className="text-outline">Experience</span>
<span className="font-caption-strong text-caption-strong">24 yrs</span>
</div>
<div className="flex items-center justify-between">
<span className="text-outline">Next Available</span>
<span className="text-on-surface-variant font-caption-strong text-caption-strong">Tomorrow 10:00 AM</span>
</div>
<div className="flex items-center justify-between">
<span className="text-outline">Consultation Fee</span>
<span className="text-body-strong font-body-strong text-on-surface">₹1,000</span>
</div>
</div>
</div>
<Link href="/book" className="mt-4 w-full py-2 bg-primary-container text-white font-caption-strong text-caption-strong rounded-lg hover:bg-primary transition">
                Book OPD
              </Link>
</div>
</div>
</section>
{/* 3. TIMINGS SECTION */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-6 space-y-4 shadow-sm">
<div className="flex items-center justify-between">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Hospital OPD &amp; Visiting Hours</h2>
<p className="text-caption font-caption text-outline">General consultation desk &amp; outpatient clinics</p>
</div>
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-caption-strong">
<span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse"></span>
              Open Now
            </span>
</div>
<div className="overflow-hidden rounded-xl border border-[#E7E5E4]">
<table className="w-full text-left text-body-default font-body-default">
<thead className="bg-surface-container-low text-outline text-caption font-caption border-b border-[#E7E5E4]">
<tr>
<th className="py-2.5 px-4 font-caption-strong">Day</th>
<th className="py-2.5 px-4 font-caption-strong">General OPD</th>
<th className="py-2.5 px-4 font-caption-strong">Patient Visiting Hours</th>
</tr>
</thead>
<tbody className="divide-y divide-[#E7E5E4] text-on-surface text-caption">
<tr>
<td className="py-2.5 px-4">Monday</td>
<td className="py-2.5 px-4 text-on-surface-variant">08:00 AM – 08:00 PM</td>
<td className="py-2.5 px-4 text-outline">04:30 PM – 07:00 PM</td>
</tr>
<tr>
<td className="py-2.5 px-4">Tuesday</td>
<td className="py-2.5 px-4 text-on-surface-variant">08:00 AM – 08:00 PM</td>
<td className="py-2.5 px-4 text-outline">04:30 PM – 07:00 PM</td>
</tr>
{/* Today Highlighted (Wednesday) */}
<tr className="bg-[#FFF1F2] font-caption-strong text-on-surface">
<td className="py-2.5 px-4 flex items-center gap-2">
<span>Wednesday (Today)</span>
<span className="px-2 py-0.5 rounded text-[11px] bg-white border border-[#F9C6C9] text-primary">Active</span>
</td>
<td className="py-2.5 px-4 text-primary">08:00 AM – 08:00 PM</td>
<td className="py-2.5 px-4 text-on-surface">04:30 PM – 07:00 PM</td>
</tr>
<tr>
<td className="py-2.5 px-4">Thursday</td>
<td className="py-2.5 px-4 text-on-surface-variant">08:00 AM – 08:00 PM</td>
<td className="py-2.5 px-4 text-outline">04:30 PM – 07:00 PM</td>
</tr>
<tr>
<td className="py-2.5 px-4">Friday</td>
<td className="py-2.5 px-4 text-on-surface-variant">08:00 AM – 08:00 PM</td>
<td className="py-2.5 px-4 text-outline">04:30 PM – 07:00 PM</td>
</tr>
<tr>
<td className="py-2.5 px-4">Saturday</td>
<td className="py-2.5 px-4 text-on-surface-variant">08:00 AM – 06:00 PM</td>
<td className="py-2.5 px-4 text-outline">04:30 PM – 07:00 PM</td>
</tr>
<tr>
<td className="py-2.5 px-4">Sunday</td>
<td className="py-2.5 px-4 text-outline">Emergency OPD Only</td>
<td className="py-2.5 px-4 text-outline">10:00 AM – 12:00 PM</td>
</tr>
</tbody>
</table>
</div>
<div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-caption font-caption text-on-surface">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-[#EE1C25]" data-icon="acute">acute</span>
<span><strong>Emergency &amp; Critical Care:</strong> 24 Hours / 7 Days Operational</span>
</div>
<span className="text-tertiary font-caption-strong text-caption-strong">100% Doctor On-Duty</span>
</div>
</section>
{/* 4. REVIEWS SECTION PREVIEW */}
<section className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-6 space-y-space-base shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
<div className="flex items-center gap-4">
<div className="text-center px-4 py-2 bg-surface-container-low rounded-xl border border-[#E7E5E4]">
<div className="text-display font-display text-on-surface flex items-center justify-center gap-1">
<span>4.8</span>
<span className="material-symbols-outlined text-primary text-[24px]" data-icon="star" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<div className="text-micro font-micro text-outline">Overall Rating</div>
</div>
<div>
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Patient Experience Stories</h2>
<p className="text-caption font-caption text-outline">Verified reviews from 2,410 OPD &amp; Inpatient admissions</p>
</div>
</div>
<Link href="/records?share=1" className="px-3.5 py-2 border border-[#E7E5E4] rounded-lg font-caption-strong text-caption-strong hover:bg-surface-container-low transition">
              Share Feedback
            </Link>
</div>
{/* Review Card */}
<div className="p-4 rounded-xl border border-[#E7E5E4] space-y-2 bg-surface-bright">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-caption-strong flex items-center justify-center">
                  KG
                </div>
<div>
<h4 className="font-caption-strong text-caption-strong text-on-surface">Karthik G.</h4>
<p className="text-micro font-micro text-outline">Visited for Knee Arthroscopy with Dr. Arvind Swaminathan</p>
</div>
</div>
<span className="text-micro font-micro text-outline">3 days ago</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">
              &quot;The admission process was swift through Curxx cashless authorization desk. The nursing staff on the 4th floor was attentive, and Dr. Arvind explained every step of the rehabilitation clearly. Excellent hospital hygiene.&quot;
            </p>
</div>
</section>
</div>
{/* ==================== RIGHT COLUMN: STICKY BOOKING & EMERGENCY RAIL (360px) ==================== */}
<aside className="col-span-12 lg:col-span-4 sticky top-20 space-y-4">
{/* PRIMARY OPD BOOKING CARD */}
<div className="bg-surface-container-lowest border border-[#E7E5E4] rounded-2xl p-6 shadow-md space-y-space-base">
<div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">Book Clinic Appointment</h3>
<span className="material-symbols-outlined text-outline text-[20px]" data-icon="event_available">event_available</span>
</div>
{/* Doctor Selector Dropdown */}
<div>
<label className="block text-caption-strong font-caption-strong text-on-surface-variant mb-1.5">Selected Specialist</label>
<div className="relative">
<select className="w-full h-11 pl-3 pr-8 rounded-lg border border-[#E7E5E4] bg-surface-container-low text-on-surface font-caption-strong text-caption-strong appearance-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 cursor-pointer">
<option >Dr. Arvind Swaminathan (Orthopedics)</option>
<option>Dr. Rajeshwari Iyer (Dermatology)</option>
<option>Dr. Sudhir Shenoy (Cardiology)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-3 text-outline pointer-events-none text-[18px]" data-icon="unfold_more">unfold_more</span>
</div>
</div>
{/* Consultation Fee */}
<div className="p-3 bg-surface-container-low rounded-xl flex items-baseline justify-between border border-[#E7E5E4]">
<div>
<span className="text-caption font-caption text-outline block">Consultation Fee</span>
<div className="flex items-baseline gap-1">
<span className="text-display font-display text-on-surface">₹900</span>
<span className="text-micro font-micro text-outline line-through">₹1,100</span>
</div>
</div>
<span className="inline-flex items-center gap-1 text-micro font-micro text-tertiary bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
<span className="material-symbols-outlined text-[12px]" data-icon="check">check</span>
              Zero platform fee
            </span>
</div>
{/* Date Strip (Horizontal Picker) */}
<div>
<label className="block text-caption-strong font-caption-strong text-on-surface-variant mb-2">Select Date</label>
<div className="grid grid-cols-4 gap-1.5 text-center">
{/* Today Selected */}
<button className="py-2 px-1 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong shadow-sm">
<span className="block text-micro uppercase opacity-90">Today</span>
<span className="text-body-strong">23 Oct</span>
</button>
<button className="py-2 px-1 rounded-lg bg-surface-container-low border border-[#E7E5E4] text-on-surface font-caption text-caption hover:border-outline">
<span className="block text-micro text-outline uppercase">Thu</span>
<span className="text-caption-strong">24 Oct</span>
</button>
<button className="py-2 px-1 rounded-lg bg-surface-container-low border border-[#E7E5E4] text-on-surface font-caption text-caption hover:border-outline">
<span className="block text-micro text-outline uppercase">Fri</span>
<span className="text-caption-strong">25 Oct</span>
</button>
<button className="py-2 px-1 rounded-lg bg-surface-container-low border border-[#E7E5E4] text-on-surface font-caption text-caption hover:border-outline">
<span className="block text-micro text-outline uppercase">Sat</span>
<span className="text-caption-strong">26 Oct</span>
</button>
</div>
</div>
{/* Slot Grid: 3-column slots */}
<div>
<label className="block text-caption-strong font-caption-strong text-on-surface-variant mb-2">Available Slots (OPD)</label>
<div className="grid grid-cols-3 gap-2">
<button className="py-2 px-1 rounded-lg border border-[#E7E5E4] text-caption font-caption text-on-surface-variant hover:bg-surface-container-low">
                10:30 AM
              </button>
<button className="py-2 px-1 rounded-lg border border-[#E7E5E4] text-caption font-caption text-on-surface-variant hover:bg-surface-container-low">
                11:15 AM
              </button>
{/* Selected Slot */}
<button className="py-2 px-1 rounded-lg bg-[#FFF1F2] border-1.5 border-primary-container text-primary font-caption-strong text-caption-strong shadow-sm">
                04:00 PM
              </button>
<button className="py-2 px-1 rounded-lg border border-[#E7E5E4] text-caption font-caption text-on-surface-variant hover:bg-surface-container-low">
                05:30 PM
              </button>
<button className="py-2 px-1 rounded-lg border border-[#E7E5E4] text-caption font-caption text-on-surface-variant hover:bg-surface-container-low">
                07:00 PM
              </button>
<button className="py-2 px-1 rounded-lg border border-[#E7E5E4] text-caption font-caption text-outline bg-surface-container-low/50 cursor-not-allowed line-through" disabled>
                08:15 PM
              </button>
</div>
</div>
{/* Primary Booking Button */}
<Link href="/book" className="w-full h-12 rounded-lg bg-primary-container text-white font-body-strong text-body-strong hover:bg-primary transition duration-150 ease-in-out active:scale-95 shadow-sm flex items-center justify-center gap-2">
<span>Book OPD Appointment</span>
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
</Link>
{/* Policy Caption */}
<p className="text-micro font-micro text-outline text-center leading-relaxed">
            Instant confirmation · Free cancellation up to 2 hours before slot · ABHA synced
          </p>
{/* Trust Micro Icons */}
<div className="pt-3 border-t border-[#E7E5E4] flex items-center justify-between text-micro font-micro text-outline">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="verified_user">verified_user</span>
              ABDM Ready
            </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="timelapse">timelapse</span>
              Zero Wait Guarantee
            </span>
</div>
</div>
{/* EMERGENCY ADMISSION CARD */}
<div className="rounded-2xl border border-[#F9C6C9] bg-[#FFF1F2] p-5 space-y-3">
<div className="flex items-center gap-2 text-[#EE1C25]">
<span className="material-symbols-outlined text-[20px]" data-icon="ambulance" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>ambulance</span>
<span className="font-micro text-micro tracking-wider uppercase font-bold">24/7 CRITICAL ADMISSION</span>
</div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface leading-tight">Need Immediate Hospitalization?</h3>
<p className="text-caption font-caption text-on-surface-variant">
            Direct emergency bed allotment &amp; resuscitation team dispatch.
          </p>
<a className="w-full h-11 rounded-lg bg-[#EE1C25] text-white font-body-strong text-body-strong flex items-center justify-center gap-2 hover:opacity-95 transition shadow-sm" href="tel:108">
<span className="material-symbols-outlined text-[18px]" data-icon="emergency">emergency</span>
<span>Emergency Admission: 108</span>
</a>
</div>
</aside>
</div>
</main>
<Footer />

    </>
  );
}
