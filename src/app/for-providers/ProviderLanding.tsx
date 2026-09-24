
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Faq, Plan, Testimonial } from '@/lib/api';
import { boldParts } from '@/lib/site';

type Props = {
  /** Verified doctors on Curxx, rounded down ("3,200+"); null hides the number. */
  doctorsLabel: string | null;
  plans: Plan[];
  testimonials: Testimonial[];
  faqs: Faq[];
};

const periodLabel = (period: string) => ` / ${period}`;

export default function ProviderLanding({ doctorsLabel, plans, testimonials, faqs }: Props) {
  return (
    <>
      
<Header />
<main>
{/* 2. HERO SECTION */}
<section className="w-full bg-[#FFFFFF] border-b border-[#E7E5E4] pt-12 pb-16">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
{/* Left Column (55% -> 7 cols) */}
<div className="lg:col-span-7 pr-0 lg:pr-4">
{/* Eyebrow */}
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold mb-4">
<span className="material-symbols-outlined text-[#047857] text-[16px]">verified</span>
<span>{doctorsLabel ? `TRUSTED BY ${doctorsLabel} INDIAN DOCTORS` : 'TRUSTED BY INDIAN DOCTORS'}</span>
</div>
{/* Headline */}
<h1 className="text-on-surface font-display text-[36px] leading-[44px] lg:text-[42px] lg:leading-[50px] font-bold tracking-tight mb-4">
              Grow your practice. <br className="hidden sm:block"/>We’ll handle the rest.
            </h1>
{/* Subcopy */}
<p className="text-on-surface-variant font-body-default text-body-default max-w-xl mb-8">
              End-to-end digital practice management engineered for Indian healthcare. From verified ABDM-compliant clinical records and friction-free teleconsultation dispatch to instant patient acquisition across your city.
            </p>
{/* Inline Quick Lead/Signup Card */}
<div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-6 shadow-sm max-w-xl" id="signup-form">
<div className="mb-4">
<span className="text-headline-h3 font-headline-h3 text-on-surface">Start your verified clinical profile</span>
<p className="text-caption font-caption text-on-surface-variant">Takes less than 3 minutes to set up your digital OPD.</p>
</div>
<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
{/* Name Field */}
<div>
<label className="block text-caption font-caption-strong text-on-surface mb-1">Doctor&apos;s Full Name</label>
<input className="w-full h-11 px-3 bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg text-body-default font-body-default text-on-surface placeholder-[#78716C] focus:outline-none focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F]" placeholder="Dr. Ramesh Rao" type="text"/>
</div>
{/* Phone Number Field (+91 fixed) */}
<div>
<label className="block text-caption font-caption-strong text-on-surface mb-1">Mobile Number</label>
<div className="flex h-11 items-center bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg focus-within:border-[#C1121F] focus-within:ring-1 focus-within:ring-[#C1121F] overflow-hidden">
<div className="flex items-center gap-1.5 px-3 bg-[#FAFAF9] border-r border-[#E7E5E4] text-caption font-caption-strong text-on-surface select-none">
<span className="text-xs">🇮🇳</span>
<span>+91</span>
</div>
<input className="w-full h-full px-3 text-body-default font-body-default text-on-surface placeholder-[#78716C] border-none focus:outline-none focus:ring-0" placeholder="98765 43210" type="tel"/>
</div>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
{/* Specialty Dropdown */}
<div>
<label className="block text-caption font-caption-strong text-on-surface mb-1">Clinical Specialty</label>
<div className="relative">
<select className="w-full h-11 px-3 bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg text-body-default font-body-default text-on-surface appearance-none focus:outline-none focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F]">
<option>Dermatology</option>
<option>Cardiology</option>
<option>Pediatrics</option>
<option>General Medicine</option>
<option>Orthopedics</option>
<option>Gynecology</option>
<option>ENT &amp; Head-Neck</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-[#78716C] text-[18px]">expand_more</span>
</div>
</div>
{/* City Dropdown */}
<div>
<label className="block text-caption font-caption-strong text-on-surface mb-1">Practice City</label>
<div className="relative">
<select className="w-full h-11 px-3 bg-[#FFFFFF] border border-[#E7E5E4] rounded-lg text-body-default font-body-default text-on-surface appearance-none focus:outline-none focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F]">
<option>Bengaluru</option>
<option>Mumbai</option>
<option>Delhi NCR</option>
<option>Hyderabad</option>
<option>Chennai</option>
<option>Pune</option>
<option>Kolkata</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-[#78716C] text-[18px]">expand_more</span>
</div>
</div>
</div>
{/* Primary CTA Button */}
<button className="w-full h-12 bg-[#C1121F] hover:bg-[#8E0E17] text-[#FFFFFF] rounded-lg font-body-strong text-body-strong transition duration-150 ease-in-out shadow-sm flex items-center justify-center gap-2 mt-2" type="submit">
<span>Get Started Free</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</form>
{/* Micro Caption */}
<p className="text-micro font-micro text-[#78716C] text-center mt-3">
                No setup fee · Free for the first 3 months · Zero credit card required · ABDM &amp; NMC compliant
              </p>
</div>
</div>
{/* Right Column (45% -> 5 cols): Layered Laptop Mockup + Overlays */}
<div className="lg:col-span-5 relative mt-6 lg:mt-0">
{/* Decorative Backing Surface */}
<div className="relative mx-auto max-w-md lg:max-w-none">
{/* Realistic Laptop Frame */}
<div className="bg-[#1C1917] rounded-2xl p-2.5 shadow-xl border border-[#44403C]">
{/* Camera Notch */}
<div className="flex items-center justify-center mb-1">
<div className="w-2 h-2 rounded-full bg-[#44403C]"></div>
</div>
{/* Screen Bezel Screen Canvas */}
<div className="bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] overflow-hidden p-3">
{/* Portal App Top Bar */}
<div className="flex items-center justify-between border-b border-[#E7E5E4] pb-2 mb-3">
<div className="flex items-center gap-2">
<div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
<div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
<div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
<span className="text-micro font-micro font-semibold text-[#78716C] ml-2">Curxx Provider Portal • OPD Live</span>
</div>
<span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">ABDM Connected</span>
</div>
{/* Portal Mock Content (OPD Queue + Stats) */}
<div className="space-y-2.5">
<div className="flex items-center justify-between bg-white p-2.5 rounded border border-[#E7E5E4]">
<div>
<p className="text-caption-strong font-caption-strong text-on-surface">Indiranagar Clinic OPD</p>
<p className="text-micro font-micro text-on-surface-variant">Today&apos;s Schedule: 14 Consults</p>
</div>
<span className="px-2 py-0.5 bg-[#FFF1F2] text-[#C1121F] text-micro font-micro rounded font-semibold">Active Session</span>
</div>
{/* Mini Appointment Rows */}
<div className="space-y-1.5">
<div className="flex items-center justify-between p-2 bg-white rounded border border-[#E7E5E4]">
<div className="flex items-center gap-2">
<span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-micro font-bold text-primary">AK</span>
<div>
<p className="text-micro font-caption-strong text-on-surface">Ananya K. (Token #08)</p>
<p className="text-[10px] text-[#78716C]">In-Clinic Follow-up • Skin Rash</p>
</div>
</div>
<span className="text-[10px] text-[#047857] font-medium bg-[#ECFDF5] px-1.5 py-0.5 rounded">Checked In</span>
</div>
<div className="flex items-center justify-between p-2 bg-white rounded border border-[#E7E5E4]">
<div className="flex items-center gap-2">
<span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-micro font-bold text-primary">MS</span>
<div>
<p className="text-micro font-caption-strong text-on-surface">Manish S. (Token #09)</p>
<p className="text-[10px] text-[#78716C]">Telehealth • Lab Review</p>
</div>
</div>
<span className="text-[10px] text-[#C1121F] font-medium bg-[#FFF1F2] px-1.5 py-0.5 rounded">Next in 4m</span>
</div>
</div>
</div>
</div>
{/* Laptop Base Bottom Edge */}
<div className="mt-2 text-center">
<div className="w-16 h-1 bg-[#44403C] rounded-full mx-auto"></div>
</div>
</div>
{/* Floating Card Overlay 1: Live Video Consult Notification */}
<div className="absolute -top-4 -left-4 sm:-left-6 bg-white border border-[#E7E5E4] rounded-xl p-3.5 shadow-md max-w-xs z-10">
<div className="flex items-center gap-2 mb-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] live-pulse"></span>
<span className="text-micro font-micro font-semibold text-[#C1121F]">Upcoming Video Consult</span>
<span className="text-micro font-micro text-[#78716C] ml-auto">In 4 mins</span>
</div>
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-[#FFF1F2] flex items-center justify-center text-primary font-semibold text-caption">
                    PS
                  </div>
<div>
<p className="text-caption-strong font-caption-strong text-on-surface">Dr. Priya Sharma</p>
<p className="text-micro font-micro text-[#78716C]">Patient: Rahul Sen • ABHA Synced</p>
</div>
</div>
</div>
{/* Floating Card Overlay 2: Monthly Earnings + Mini Sparkline */}
<div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white border border-[#E7E5E4] rounded-xl p-3.5 shadow-md z-10">
<p className="text-micro font-micro text-[#78716C]">Earnings This Month</p>
<div className="flex items-baseline gap-2 mt-0.5">
<span className="text-headline-h2 font-headline-h2 font-bold text-on-surface">₹1,48,500</span>
<span className="text-micro font-micro text-[#047857] font-semibold bg-[#ECFDF5] px-1 rounded">+28%</span>
</div>
{/* Mini visual indicator bar */}
<div className="w-36 h-1.5 bg-[#FAFAF9] rounded-full overflow-hidden mt-2 border border-[#E7E5E4]">
<div className="w-4/5 h-full bg-[#047857] rounded-full"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* 3. STATS BAND */}
<section className="w-full bg-[#FAFAF9] border-b border-[#E7E5E4] py-8">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
<div className="text-center md:text-left border-r last:border-r-0 border-[#E7E5E4] pr-4">
<p className="text-display font-display text-[32px] font-bold text-primary tracking-tight">2.4M</p>
<p className="text-caption font-caption-strong text-on-surface mt-1">Monthly Patient Searches</p>
<p className="text-micro font-micro text-[#78716C]">High-intent local discovery</p>
</div>
<div className="text-center md:text-left border-r last:border-r-0 border-[#E7E5E4] pr-4">
<p className="text-display font-display text-[32px] font-bold text-primary tracking-tight">38%</p>
<p className="text-caption font-caption-strong text-on-surface mt-1">Average Booking Increase</p>
<p className="text-micro font-micro text-[#78716C]">Within the first 90 days</p>
</div>
<div className="text-center md:text-left border-r last:border-r-0 border-[#E7E5E4] pr-4">
<p className="text-display font-display text-[32px] font-bold text-primary tracking-tight">4 hrs</p>
<p className="text-caption font-caption-strong text-on-surface mt-1">Saved per Week</p>
<p className="text-micro font-micro text-[#78716C]">On admin &amp; Rx workflows</p>
</div>
<div className="text-center md:text-left">
<p className="text-display font-display text-[32px] font-bold text-primary tracking-tight">96%</p>
<p className="text-caption font-caption-strong text-on-surface mt-1">Provider Retention Rate</p>
<p className="text-micro font-micro text-[#78716C]">Annual clinician renewals</p>
</div>
</div>
</div>
</section>
{/* 4. FEATURES (3 Alternating 2-Column Sections) */}
<section className="w-full py-16 bg-[#FFFFFF]" id="features">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop space-y-20">
{/* Section 1: Practice Management */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center" id="why-curxx">
{/* Left: Prescription & Calendar Mockup */}
<div className="lg:col-span-6 bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl p-5 shadow-sm">
<div className="bg-white rounded-xl border border-[#E7E5E4] p-4">
<div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3 mb-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
<span className="font-headline-h3 text-headline-h3 text-on-surface">Curxx Smart Rx Writer</span>
</div>
<span className="text-micro font-micro bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded border border-[#A7F3D0] font-semibold">ICD-10 Connected</span>
</div>
{/* Rx Fields Mockup */}
<div className="space-y-3">
<div className="p-2.5 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4]">
<p className="text-micro font-micro text-[#78716C]">Diagnosis Autocomplete</p>
<p className="text-caption-strong font-caption-strong text-on-surface">L70.0 — Acne vulgaris (Moderate inflammatory)</p>
</div>
<div className="p-2.5 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] space-y-2">
<div className="flex justify-between items-center text-micro font-micro text-[#78716C]">
<span>Prescribed Regimen</span>
<span className="text-primary font-semibold">Dosage Preset Applied</span>
</div>
<div className="flex justify-between items-center text-caption font-caption text-on-surface">
<span className="font-semibold">Tab. Doxycycline 100mg</span>
<span className="text-on-surface-variant">1 - 0 - 0 • After Meals (14 Days)</span>
</div>
<div className="flex justify-between items-center text-caption font-caption text-on-surface">
<span className="font-semibold">Gel Clindamycin 1% w/w</span>
<span className="text-on-surface-variant">Apply gently at night</span>
</div>
</div>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-1.5 text-micro font-micro text-[#047857]">
<span className="material-symbols-outlined text-[16px]">lock_reset</span>
<span>Direct ABHA Locker Sync</span>
</div>
<button className="px-3 py-1.5 bg-[#C1121F] text-white rounded-lg text-micro font-body-strong">
                    Sign &amp; WhatsApp Rx
                  </button>
</div>
</div>
</div>
</div>
{/* Right: Text Content */}
<div className="lg:col-span-6">
<span className="text-micro font-micro font-semibold text-primary uppercase tracking-wider">INTELLIGENT WORKFLOWS</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-2 mb-4">
              Frictionless Practice Management
            </h2>
<p className="text-body-default font-body-default text-on-surface-variant mb-6">
              Replace fragmented notebooks and clunky generic software with a clinical suite purpose-built for high-volume Indian OPDs. Manage multiple clinic locations, patient queues, and statutory compliance without clerical friction.
            </p>
<ul className="space-y-3.5">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">Zero-click ABHA health locker integration:</strong> Complies instantly with National Health Authority (NHA) protocols for secure record sharing.
                </span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">Automated WhatsApp &amp; SMS reminders:</strong> Proven to cut clinic no-shows by up to 42% with localized patient notifications.
                </span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">Multi-clinic &amp; OPD slot manager:</strong> Harmonize walk-in queues, teleconsults, and nursing home visits on a unified real-time calendar.
                </span>
</li>
</ul>
</div>
</div>
{/* Section 2: Patient Acquisition (Reversed layout) */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
{/* Left: Text Content */}
<div className="lg:col-span-6 order-2 lg:order-1">
<span className="text-micro font-micro font-semibold text-primary uppercase tracking-wider">DISCOVERY &amp; TRUST</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-2 mb-4">
              Reach High-Intent Patients Across Your City
            </h2>
<p className="text-body-default font-body-default text-on-surface-variant mb-6">
              Over 2.4 million Indian patients use Curxx every month to find certified specialists. Stand out with official Medical Council verification, transparent consultation fees, and genuine verified reviews.
            </p>
<ul className="space-y-3.5">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">NMC &amp; State Council verified doctor badge:</strong> Elevates patient trust and increases profile booking conversions by 3.2x.
                </span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">Ranked specialty visibility:</strong> Capture localized search traffic for specific conditions in your neighborhood (e.g. &quot;Cardiologist in Koramangala&quot;).
                </span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">Verified patient testimonials:</strong> Automated post-consultation feedback loops protect your reputation against fake negative reviews.
                </span>
</li>
</ul>
</div>
{/* Right: Doctor Search Card Mockup */}
<div className="lg:col-span-6 order-1 lg:order-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl p-5 shadow-sm">
<div className="bg-white rounded-xl border border-[#E7E5E4] p-5">
{/* Doctor Card Preview */}
<div className="flex items-start gap-4 pb-4 border-b border-[#E7E5E4]">
<div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold text-headline-h2 shrink-0">
                  DR
                </div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-2">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface truncate">Dr. Rajeshwari Swaminathan</h3>
<span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-micro font-micro bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-semibold shrink-0">
<span className="material-symbols-outlined text-[13px]">verified</span> Verified
                    </span>
</div>
<p className="text-caption font-caption text-on-surface-variant">MBBS, MD - Dermatology, Venereology &amp; Leprosy</p>
<p className="text-micro font-micro text-[#78716C] mt-0.5">14 Years Experience • Indiranagar, Bengaluru</p>
</div>
</div>
{/* Metrics Row */}
<div className="grid grid-cols-3 gap-2 py-3 border-b border-[#E7E5E4] text-center">
<div>
<p className="text-micro font-micro text-[#78716C]">Rating</p>
<p className="text-caption-strong font-caption-strong text-on-surface flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[14px] text-[#F59E0B]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span> 4.9 (420+)
                  </p>
</div>
<div>
<p className="text-micro font-micro text-[#78716C]">Consultation</p>
<p className="text-caption-strong font-caption-strong text-on-surface">₹800</p>
</div>
<div>
<p className="text-micro font-micro text-[#78716C]">Next Available</p>
<p className="text-caption-strong font-caption-strong text-[#047857]">Today, 4:30 PM</p>
</div>
</div>
{/* Mock Booking Slot Selection */}
<div className="pt-3">
<p className="text-micro font-micro text-[#78716C] mb-2">Patient Instant Booking Slots</p>
<div className="grid grid-cols-3 gap-2">
<button className="py-1.5 px-2 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] text-primary text-caption font-semibold">4:30 PM</button>
<button className="py-1.5 px-2 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] text-on-surface text-caption">5:00 PM</button>
<button className="py-1.5 px-2 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] text-on-surface text-caption">5:30 PM</button>
</div>
</div>
</div>
</div>
</div>
{/* Section 3: Online Consultations */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
{/* Left: HD Video Room Mockup */}
<div className="lg:col-span-6 bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl p-5 shadow-sm">
<div className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden">
{/* Video Header */}
<div className="bg-[#1C1917] p-3 text-white flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
<span className="text-caption font-caption-strong">Encrypted Video Consult • 1080p WebRTC</span>
</div>
<span className="text-micro font-micro text-[#E7E5E4]">09:42 elapsed</span>
</div>
{/* Video Layout Simulation */}
<div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAFAF9]">
{/* Doctor Feed Frame */}
<div className="h-40 rounded-lg bg-[#292524] flex flex-col justify-between p-2 text-white relative">
<span className="text-micro font-micro bg-black/60 px-1.5 py-0.5 rounded w-fit">You (Dr. Rao)</span>
<div className="flex justify-center gap-2">
<span className="p-1 rounded-full bg-[#44403C] material-symbols-outlined text-[14px]">mic</span>
<span className="p-1 rounded-full bg-[#44403C] material-symbols-outlined text-[14px]">videocam</span>
</div>
</div>
{/* Patient Side EHR Panel */}
<div className="h-40 bg-white rounded-lg border border-[#E7E5E4] p-2.5 overflow-hidden flex flex-col justify-between">
<div>
<span className="text-micro font-micro text-[#78716C]">Side-by-Side ABHA Chart</span>
<p className="text-caption-strong font-caption-strong text-on-surface">Vikram Mehra, 46 M</p>
<p className="text-micro font-micro text-on-surface-variant">Known Hypertensive · BP 138/88</p>
</div>
<div className="pt-2 border-t border-[#E7E5E4] flex items-center justify-between">
<span className="text-micro font-micro text-[#047857]">E-Sign Enabled</span>
<button className="px-2 py-1 bg-[#C1121F] text-white rounded text-micro font-medium">Issue Rx</button>
</div>
</div>
</div>
{/* Payout Notification Banner */}
<div className="p-3 bg-[#FFF1F2] border-t border-[#F9C6C9] flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
<span className="text-caption font-caption-strong text-primary">Instant UPI Settlement</span>
</div>
<span className="text-caption font-caption-strong text-primary">₹750 direct to bank</span>
</div>
</div>
</div>
{/* Right: Text Content */}
<div className="lg:col-span-6">
<span className="text-micro font-micro font-semibold text-primary uppercase tracking-wider">TELEHEALTH INFRASTRUCTURE</span>
<h2 className="text-headline-h1 font-headline-h1 text-on-surface mt-2 mb-4">
              24x7 Teleconsultations &amp; Instant Payouts
            </h2>
<p className="text-body-default font-body-default text-on-surface-variant mb-6">
              Deliver remote consultations without downloading third-party software or chasing patients for payment screenshots. Everything occurs in a compliant browser-based medical cockpit.
            </p>
<ul className="space-y-3.5">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">Sub-100ms ultra-low latency WebRTC video:</strong> Optimized for low-bandwidth 4G and tier-2/3 cellular networks across India.
                </span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">In-consultation digital e-prescription:</strong> Sign digitally with compliant cryptographic timestamps; auto-dispatched to patient WhatsApp.
                </span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
<strong className="font-body-strong">Same-day automated UPI/NEFT payouts:</strong> Zero escrow delays; 100% transparent settlement ledger with zero hidden transaction deductions.
                </span>
</li>
</ul>
</div>
</div>
</div>
</section>
{/* 5. COMPARISON TABLE (Curxx vs Traditional Practice) */}
<section className="w-full py-16 bg-[#FAFAF9] border-t border-b border-[#E7E5E4]" id="comparison">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
{/* Header */}
<div className="text-center max-w-2xl mx-auto mb-12">
<span className="text-micro font-micro font-semibold text-primary uppercase tracking-wider">WHY CURXX</span>
<h2 className="text-display font-display font-bold text-on-surface mt-2 mb-3">
            Built Specifically for Modern Indian Clinicians
          </h2>
<p className="text-body-default font-body-default text-on-surface-variant">
            See how the integrated Curxx clinical operating system compares against traditional paper and ad-hoc practices.
          </p>
</div>
{/* Comparison Table Container */}
<div className="bg-white border border-[#E7E5E4] rounded-2xl shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-[#E7E5E4] bg-[#F4ECE8]/40">
<th className="py-4 px-6 text-caption-strong font-caption-strong text-on-surface w-2/5">Capability / Workflow</th>
<th className="py-4 px-6 text-caption-strong font-caption-strong text-primary w-2/5 bg-[#FFF1F2]/60 border-l border-r border-[#F9C6C9]">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary text-[18px]">verified</span>
<span>Curxx Healthcare Platform</span>
</div>
</th>
<th className="py-4 px-6 text-caption-strong font-caption-strong text-[#78716C] w-1/5">Traditional / Paper Practice</th>
</tr>
</thead>
<tbody className="divide-y divide-[#E7E5E4]">
{/* Row 1 */}
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-4 px-6 font-body-strong text-body-strong text-on-surface">
                    Patient Discovery &amp; Reach
                  </td>
<td className="py-4 px-6 bg-[#FFF1F2]/20 border-l border-r border-[#F9C6C9] font-body-default text-body-default text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#047857] text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>High-intent verified SEO, localized radius discovery &amp; instant app booking</span>
</div>
</td>
<td className="py-4 px-6 font-body-default text-body-default text-[#78716C]">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#A8A29E] text-[18px] shrink-0 mt-0.5">cancel</span>
<span>Limited to passive walk-ins and slow word-of-mouth</span>
</div>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-4 px-6 font-body-strong text-body-strong text-on-surface">
                    Prescription &amp; EHR Sync
                  </td>
<td className="py-4 px-6 bg-[#FFF1F2]/20 border-l border-r border-[#F9C6C9] font-body-default text-body-default text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#047857] text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>60-second digital Rx with 1-click ABHA health locker dispatch &amp; WhatsApp copy</span>
</div>
</td>
<td className="py-4 px-6 font-body-default text-body-default text-[#78716C]">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#A8A29E] text-[18px] shrink-0 mt-0.5">cancel</span>
<span>Illegible handwritten paper slips, easily lost with zero continuity</span>
</div>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-4 px-6 font-body-strong text-body-strong text-on-surface">
                    No-Show &amp; Cancellation Rates
                  </td>
<td className="py-4 px-6 bg-[#FFF1F2]/20 border-l border-r border-[#F9C6C9] font-body-default text-body-default text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#047857] text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>&lt; 6% no-shows with automated WhatsApp token tracking &amp; slot re-dispatch</span>
</div>
</td>
<td className="py-4 px-6 font-body-default text-body-default text-[#78716C]">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#A8A29E] text-[18px] shrink-0 mt-0.5">cancel</span>
<span>25% to 35% unconfirmed slot dropouts, idling OPD hours</span>
</div>
</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-4 px-6 font-body-strong text-body-strong text-on-surface">
                    Telemedicine &amp; Remote Care
                  </td>
<td className="py-4 px-6 bg-[#FFF1F2]/20 border-l border-r border-[#F9C6C9] font-body-default text-body-default text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#047857] text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>Built-in encrypted HD video, integrated gateway &amp; automated follow-up alerts</span>
</div>
</td>
<td className="py-4 px-6 font-body-default text-body-default text-[#78716C]">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#A8A29E] text-[18px] shrink-0 mt-0.5">cancel</span>
<span>Clunky personal WhatsApp calls and awkward screenshot tracking</span>
</div>
</td>
</tr>
{/* Row 5 */}
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-4 px-6 font-body-strong text-body-strong text-on-surface">
                    Billing &amp; Payout Settlements
                  </td>
<td className="py-4 px-6 bg-[#FFF1F2]/20 border-l border-r border-[#F9C6C9] font-body-default text-body-default text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#047857] text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>Automated daily payouts (T+1), itemized GST tax invoices &amp; zero reconciliations</span>
</div>
</td>
<td className="py-4 px-6 font-body-default text-body-default text-[#78716C]">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#A8A29E] text-[18px] shrink-0 mt-0.5">cancel</span>
<span>Manual end-of-day cash registers and manual tally errors</span>
</div>
</td>
</tr>
{/* Row 6 */}
<tr className="hover:bg-[#FAFAF9] transition-colors">
<td className="py-4 px-6 font-body-strong text-body-strong text-on-surface">
                    Regulatory Compliance
                  </td>
<td className="py-4 px-6 bg-[#FFF1F2]/20 border-l border-r border-[#F9C6C9] font-body-default text-body-default text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#047857] text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>100% ABDM M1-M3, DPDP Act 2023 &amp; Telemedicine Practice Guidelines certified</span>
</div>
</td>
<td className="py-4 px-6 font-body-default text-body-default text-[#78716C]">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[#A8A29E] text-[18px] shrink-0 mt-0.5">cancel</span>
<span>Fragmented documentation and high medicolegal exposure</span>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</section>
{/* 6. PRICING SECTION */}
<section className="w-full py-16 bg-[#FFFFFF]" id="pricing">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
{/* Header */}
<div className="text-center max-w-2xl mx-auto mb-10">
<span className="text-micro font-micro font-semibold text-primary uppercase tracking-wider">TRANSPARENT PLANS</span>
<h2 className="text-display font-display font-bold text-on-surface mt-2 mb-3">
            Predictable Pricing That Scales With Your OPD
          </h2>
<p className="text-body-default font-body-default text-on-surface-variant">
            No surprise setup charges or lock-in contracts. Upgrade or switch plans at any time.
          </p>
{/* Monthly / Annual Toggle Switch */}
<div className="mt-6 inline-flex items-center gap-3 bg-[#FAFAF9] p-1.5 rounded-full border border-[#E7E5E4]">
<button className="px-4 py-1.5 rounded-full text-caption font-caption-strong text-white bg-[#C1121F] shadow-sm">Monthly</button>
<button className="px-4 py-1.5 rounded-full text-caption font-caption-strong text-[#78716C] hover:text-on-surface">Annual</button>
<span className="text-micro font-micro font-semibold text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full mr-1">
              Save 20%
            </span>
</div>
</div>
{/* 3 Tier Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
{plans.map((plan) => (
<div key={plan.slug} className={plan.highlight ? 'bg-white border-2 border-[#C1121F] rounded-2xl p-6 flex flex-col justify-between shadow-md relative bg-gradient-to-b from-[#FFF1F2]/30 to-white' : 'bg-white border border-[#E7E5E4] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative'}>
{plan.badge && (
<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C1121F] text-white text-micro font-micro font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {plan.badge}
            </div>
)}
<div>
<div className={plan.badge ? 'mb-4 mt-2' : 'mb-4'}>
<h3 className="text-headline-h2 font-headline-h2 text-on-surface">{plan.name}</h3>
<p className="text-caption font-caption text-on-surface-variant mt-1">{plan.tagline}</p>
</div>
<div className="mb-6">
<span className={`text-display font-display font-bold ${plan.highlight ? 'text-primary' : 'text-on-surface'}`}>₹{plan.price.toLocaleString('en-IN')}</span>
<span className="text-caption font-caption text-[#78716C]">{periodLabel(plan.period)}</span>
</div>
<ul className="space-y-3 mb-6 text-caption font-caption text-on-surface">
{plan.perks.map((perk) => (
<li key={perk} className="flex items-center gap-2">
<span className="material-symbols-outlined text-[#047857] text-[16px]">check</span>
<span>{boldParts(perk).map((part, i) => (part.bold ? <span key={i} className="font-semibold">{part.text}</span> : part.text))}</span>
</li>
))}
{plan.excluded.map((item) => (
<li key={item} className="flex items-center gap-2 text-[#A8A29E]">
<span className="material-symbols-outlined text-[16px]">close</span>
<span>{item}</span>
</li>
))}
</ul>
</div>
<a className={plan.highlight ? 'w-full h-11 bg-[#C1121F] hover:bg-[#8E0E17] text-white rounded-lg font-body-strong text-body-strong flex items-center justify-center transition-colors shadow-sm' : 'w-full h-11 border border-[#E7E5E4] hover:bg-[#FAFAF9] text-on-surface rounded-lg font-body-strong text-body-strong flex items-center justify-center transition-colors'} href="#signup-form">
              {plan.ctaLabel || `Choose ${plan.name}`}
            </a>
</div>
))}
</div>
</div>
</section>
{/* 7. TESTIMONIALS */}
<section className="w-full py-16 bg-[#FAFAF9] border-t border-b border-[#E7E5E4]" id="testimonials">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop">
{/* Header */}
<div className="text-center max-w-2xl mx-auto mb-12">
<span className="text-micro font-micro font-semibold text-primary uppercase tracking-wider">PRACTICE STORIES</span>
<h2 className="text-display font-display font-bold text-on-surface mt-2 mb-3">
            Loved by Leading Clinicians Across Specialties
          </h2>
<p className="text-body-default font-body-default text-on-surface-variant">
            Real feedback from verified doctors transforming patient care with Curxx.
          </p>
</div>
{/* Doctor Quote Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{testimonials.map((t) => (
<div key={t.slug} className="bg-white border border-[#E7E5E4] rounded-xl p-6 shadow-sm flex flex-col justify-between">
<div>
{t.badge?.label && (
<div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold mb-4">
<span className="material-symbols-outlined text-[14px]">{t.badge.icon || 'verified'}</span>
<span>{t.badge.label}</span>
</div>
)}
<p className="text-body-default font-body-default text-on-surface mb-6 italic">
                &quot;{t.text}&quot;
              </p>
</div>
<div className="flex items-center gap-3 pt-4 border-t border-[#E7E5E4]">
<div className="w-10 h-10 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] flex items-center justify-center text-primary font-bold text-caption">
                {t.initials}
              </div>
<div>
<p className="text-caption-strong font-caption-strong text-on-surface">{t.name}</p>
<p className="text-micro font-micro text-[#78716C]">{t.location}</p>
</div>
</div>
</div>
))}
</div>
</div>
</section>
{/* 8. FAQ ACCORDION */}
<section className="w-full py-16 bg-[#FFFFFF]" id="faq">
<div className="w-full max-w-[800px] mx-auto px-margin sm:px-margin-desktop">
{/* Header */}
<div className="text-center mb-10">
<span className="text-micro font-micro font-semibold text-primary uppercase tracking-wider">CLEAR ANSWERS</span>
<h2 className="text-display font-display font-bold text-on-surface mt-2 mb-3">
            Frequently Asked Questions
          </h2>
<p className="text-body-default font-body-default text-on-surface-variant">
            Everything you need to know about joining Curxx as a certified healthcare provider.
          </p>
</div>
{/* Accordion Items */}
<div className="space-y-4">
{faqs.map((faq, index) => (
<details key={faq.question} className="group bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-4 transition-all duration-150 open:bg-white open:shadow-sm" open={index === 0}>
<summary className="flex items-center justify-between cursor-pointer font-headline-h3 text-headline-h3 text-on-surface list-none">
<span>{faq.question}</span>
<span className="material-symbols-outlined text-[#78716C] group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p className="mt-3 text-body-default font-body-default text-on-surface-variant border-t border-[#E7E5E4] pt-3">
              {faq.answer}
            </p>
</details>
))}
</div>
</div>
</section>
{/* 9. FINAL CALL-TO-ACTION BAND */}
<section className="w-full bg-[#8E0E17] text-white py-16">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop text-center">
<span className="inline-block text-micro font-micro font-semibold uppercase tracking-widest text-[#FFDAD6] bg-black/20 px-3 py-1 rounded-full mb-4">
          START YOUR MODERN PRACTICE TODAY
        </span>
<h2 className="text-display font-display text-[32px] md:text-[40px] font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
          {doctorsLabel ? `Join ${doctorsLabel} doctors delivering precision care to millions.` : 'Join the doctors delivering precision care to millions.'}
        </h2>
<p className="text-body-default font-body-default text-[#FFDAD6] max-w-xl mx-auto mb-8">
          Set up your digital profile in under 10 minutes. First 3 months completely free with zero credit card required.
        </p>
{/* CTA Buttons */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<a className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#8E0E17] hover:bg-[#FAFAF9] rounded-lg font-body-strong text-body-strong transition duration-150 shadow-md" href="#signup-form">
            List Your Practice Free
          </a>
<a className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 rounded-lg font-body-strong text-body-strong transition duration-150" href="#faq">
            Book a 1-on-1 Walkthrough
          </a>
</div>
</div>
</section>
</main>
<Footer />

    </>
  );
}
