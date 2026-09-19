
'use client';
import Link from 'next/link';
import { formatHold, startSlotHold, useSlotHold } from '@/components/SlotCountdown';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';

const SLOT_IDLE = 'border border-[#E7E5E4] bg-white hover:border-[#1C1917] py-3 rounded-lg text-center font-body-strong text-body-strong text-[#1C1917] transition shadow-xs';
const SLOT_SELECTED = 'bg-[#FFF1F2] border-2 border-primary-container text-primary-container font-headline-h3 font-bold py-3 rounded-lg text-center shadow-xs flex items-center justify-center gap-1.5 transition ring-1 ring-primary-container';

export default function BookingStep1PagePage() {
  const [slot, setSlot] = useState('05:45 PM');
  const remaining = useSlotHold();

  function pickSlot(time: string) {
    setSlot(time);
    startSlotHold();
  }

  return (
    <>
      
<Header />
<BookingProgress currentStep={1} />
{/* MAIN BOOKING CANVAS */}
<main className="w-full max-w-[900px] mx-auto px-4 py-8 space-y-6 pb-36">
{/* 1. DOCTOR SUMMARY CARD */}
<div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
<div className="flex items-center gap-4">
<div className="relative flex-shrink-0">
<img loading="lazy" decoding="async" className="w-16 h-16 rounded-full object-cover border border-[#E7E5E4]" data-alt="Close-up professional portrait of Dr. Priya Sharma, an Indian female dermatologist in white lab coat with stethoscope, smiling gently against a bright clinical hospital background with soft ambient lighting and clean medical aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIlXbviVHjbxLSVgluPvx1kKrjHUer5LhzICejP81zXq8DJ5WfkUMAXadEXvLk75qFDBNsZlN6Lk4cDVd_ENFglG07lUrK544ILVsTinINlj14RmE0bZ6aJJeRH-S1pj1WQE3s4Jb1lKtLoUScaMiWMEwGxaBBjrRkzNHKZbKb1DNvy7xrDoZI9KEu4sN5YGRK-r-Z6uKDflVcFoG6SWqxCYv9yYj3ObmfMmg3nOH9yWIiOv8SWYB8=w128"/>
<div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
<span className="material-symbols-outlined text-[#047857] text-[18px] block" data-icon="verified" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
</div>
<div>
<div className="flex items-center gap-2 flex-wrap">
<h1 className="text-headline-h3 font-headline-h3 text-[#1C1917]">Dr. Priya Sharma</h1>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-micro font-micro font-semibold">
<span className="material-symbols-outlined text-[12px]" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
              NMC Verified
            </span>
</div>
<p className="text-caption-strong font-caption-strong text-[#5c403d] mt-0.5">Senior Dermatologist · 14 Yrs Exp</p>
<div className="flex items-center gap-2 mt-1 text-caption font-caption text-[#78716C] flex-wrap">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-[#78716C]" data-icon="apartment">apartment</span>
              SkinCare Super Specialty Clinic, Indiranagar, Bengaluru
            </span>
<span className="text-[#E7E5E4]">•</span>
<span className="inline-flex items-center gap-1 font-caption-strong text-caption-strong text-[#047857]">
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
              98% (1,240 consults)
            </span>
</div>
</div>
</div>
<div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E7E5E4] flex sm:flex-col justify-between sm:justify-center items-end">
<div className="flex items-center gap-2">
<span className="line-through text-caption font-caption text-[#78716C]">₹800</span>
<span className="text-headline-h2 font-headline-h2 font-bold text-[#1C1917]">₹650</span>
</div>
<span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-primary-container text-micro font-micro font-semibold">
          Save ₹150
        </span>
</div>
</div>
{/* 2. VISIT TYPE SEGMENTED TOGGLE */}
<div className="bg-[#FAFAF9] p-1.5 border border-[#E7E5E4] rounded-xl grid grid-cols-2 max-w-md mx-auto shadow-xs">
<button className="bg-white text-[#1C1917] font-body-strong text-body-strong rounded-lg py-2.5 shadow-sm border border-[#E7E5E4] flex items-center justify-center gap-2 transition-all" type="button">
<span className="material-symbols-outlined text-[18px] text-primary-container" data-icon="local_hospital">local_hospital</span>
        Clinic Visit (₹650)
      </button>
<Link href="/consult/lobby/cx-88421" className="text-[#78716C] hover:text-[#1C1917] font-body-default text-body-default py-2.5 flex items-center justify-center gap-2 transition-all" type="button">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="videocam">videocam</span>
        Video Consult (₹349)
      </Link>
</div>
{/* 3. 7-DAY HORIZONTAL DATE STRIP */}
<div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[20px]" data-icon="calendar_today">calendar_today</span>
<h2 className="text-headline-h3 font-headline-h3 text-[#1C1917]">Select Appointment Date</h2>
</div>
<span className="text-caption-strong font-caption-strong text-[#78716C] bg-[#FAFAF9] border border-[#E7E5E4] px-3 py-1 rounded-full">
          May 2025
        </span>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
{/* Day 1: SELECTED */}
<div className="bg-primary-container text-white rounded-xl py-3 px-2 flex flex-col items-center justify-center shadow-sm cursor-pointer transition ring-2 ring-primary-container ring-offset-2">
<span className="text-micro font-micro uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full mb-1">Today</span>
<span className="text-headline-h3 font-headline-h3 font-bold">24</span>
<span className="text-caption font-caption opacity-90">Mon</span>
<div className="flex items-center gap-1 mt-1 text-[11px] text-white">
<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            9 slots
          </div>
</div>
{/* Day 2 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white hover:border-[#1C1917] rounded-xl py-3 px-2 flex flex-col items-center justify-center cursor-pointer transition">
<span className="text-caption font-caption text-[#78716C]">Tue</span>
<span className="text-headline-h3 font-headline-h3 text-[#1C1917]">25</span>
<span className="text-micro font-micro text-[#78716C]">May</span>
<div className="flex items-center gap-1 mt-1 text-micro font-micro text-[#047857]">
<span className="w-1.5 h-1.5 rounded-full bg-[#047857] inline-block"></span>
            8 slots
          </div>
</div>
{/* Day 3 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white hover:border-[#1C1917] rounded-xl py-3 px-2 flex flex-col items-center justify-center cursor-pointer transition">
<span className="text-caption font-caption text-[#78716C]">Wed</span>
<span className="text-headline-h3 font-headline-h3 text-[#1C1917]">26</span>
<span className="text-micro font-micro text-[#78716C]">May</span>
<div className="flex items-center gap-1 mt-1 text-micro font-micro text-[#047857]">
<span className="w-1.5 h-1.5 rounded-full bg-[#047857] inline-block"></span>
            12 slots
          </div>
</div>
{/* Day 4 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white hover:border-[#1C1917] rounded-xl py-3 px-2 flex flex-col items-center justify-center cursor-pointer transition">
<span className="text-caption font-caption text-[#78716C]">Thu</span>
<span className="text-headline-h3 font-headline-h3 text-[#1C1917]">27</span>
<span className="text-micro font-micro text-[#78716C]">May</span>
<div className="flex items-center gap-1 mt-1 text-micro font-micro text-[#047857]">
<span className="w-1.5 h-1.5 rounded-full bg-[#047857] inline-block"></span>
            10 slots
          </div>
</div>
{/* Day 5 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white hover:border-[#1C1917] rounded-xl py-3 px-2 flex flex-col items-center justify-center cursor-pointer transition">
<span className="text-caption font-caption text-[#78716C]">Fri</span>
<span className="text-headline-h3 font-headline-h3 text-[#1C1917]">28</span>
<span className="text-micro font-micro text-[#78716C]">May</span>
<div className="flex items-center gap-1 mt-1 text-micro font-micro text-[#047857]">
<span className="w-1.5 h-1.5 rounded-full bg-[#047857] inline-block"></span>
            6 slots
          </div>
</div>
{/* Day 6 */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white hover:border-[#1C1917] rounded-xl py-3 px-2 flex flex-col items-center justify-center cursor-pointer transition">
<span className="text-caption font-caption text-[#78716C]">Sat</span>
<span className="text-headline-h3 font-headline-h3 text-[#1C1917]">29</span>
<span className="text-micro font-micro text-[#78716C]">May</span>
<div className="flex items-center gap-1 mt-1 text-micro font-micro text-[#047857]">
<span className="w-1.5 h-1.5 rounded-full bg-[#047857] inline-block"></span>
            14 slots
          </div>
</div>
{/* Day 7: CLOSED */}
<div className="border border-[#E7E5E4] bg-[#FAFAF9] opacity-40 cursor-not-allowed rounded-xl py-3 px-2 flex flex-col items-center justify-center">
<span className="text-caption font-caption text-[#78716C]">Sun</span>
<span className="text-headline-h3 font-headline-h3 text-[#1C1917]">30</span>
<span className="text-micro font-micro text-[#78716C]">May</span>
<div className="flex items-center gap-1 mt-1 text-micro font-micro text-[#78716C]">
            Closed
          </div>
</div>
</div>
</div>
{/* 4. TIME SLOTS MATRIX */}
<div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-6 shadow-sm">
{/* Section A: Morning */}
<div>
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="wb_twilight">wb_twilight</span>
<h3 className="text-headline-h3 font-headline-h3 text-[#1C1917]">Morning</h3>
<span className="text-caption font-caption text-[#78716C]">(10:00 AM - 12:30 PM)</span>
</div>
<span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded font-semibold">3 slots available</span>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
<button type="button" onClick={() => pickSlot('10:00 AM')} className={slot === '10:00 AM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '10:00 AM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            10:00 AM
          </button>
<button type="button" onClick={() => pickSlot('10:30 AM')} className={slot === '10:30 AM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '10:30 AM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            10:30 AM
          </button>
<button type="button" onClick={() => pickSlot('11:15 AM')} className={slot === '11:15 AM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '11:15 AM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            11:15 AM
          </button>
<button className="border border-dashed border-[#E7E5E4] bg-[#F5F5F4] text-[#A8A29E] line-through py-3 rounded-lg text-center font-body-default text-body-default cursor-not-allowed" disabled type="button">
            11:45 AM
          </button>
</div>
</div>
<hr className="border-[#E7E5E4]"/>
{/* Section B: Afternoon */}
<div>
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="wb_sunny">wb_sunny</span>
<h3 className="text-headline-h3 font-headline-h3 text-[#1C1917]">Afternoon</h3>
<span className="text-caption font-caption text-[#78716C]">(02:00 PM - 04:30 PM)</span>
</div>
<span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded font-semibold">2 slots available</span>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
<button className="border border-dashed border-[#E7E5E4] bg-[#F5F5F4] text-[#A8A29E] line-through py-3 rounded-lg text-center font-body-default text-body-default cursor-not-allowed" disabled type="button">
            02:00 PM
          </button>
<button type="button" onClick={() => pickSlot('02:45 PM')} className={slot === '02:45 PM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '02:45 PM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            02:45 PM
          </button>
<button type="button" onClick={() => pickSlot('03:30 PM')} className={slot === '03:30 PM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '03:30 PM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            03:30 PM
          </button>
<button className="border border-dashed border-[#E7E5E4] bg-[#F5F5F4] text-[#A8A29E] line-through py-3 rounded-lg text-center font-body-default text-body-default cursor-not-allowed" disabled type="button">
            04:15 PM
          </button>
</div>
</div>
<hr className="border-[#E7E5E4]"/>
{/* Section C: Evening */}
<div>
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="nightlight">nightlight</span>
<h3 className="text-headline-h3 font-headline-h3 text-[#1C1917]">Evening</h3>
<span className="text-caption font-caption text-[#78716C]">(05:00 PM - 08:30 PM)</span>
</div>
<span className="text-micro font-micro text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded font-semibold">3 slots available</span>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
<button type="button" onClick={() => pickSlot('05:00 PM')} className={slot === '05:00 PM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '05:00 PM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            05:00 PM
          </button>
{/* SELECTED SLOT */}
<button type="button" onClick={() => pickSlot('05:45 PM')} className={slot === '05:45 PM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '05:45 PM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            05:45 PM
          </button>
<button type="button" onClick={() => pickSlot('06:30 PM')} className={slot === '06:30 PM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '06:30 PM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            06:30 PM
          </button>
<button type="button" onClick={() => pickSlot('07:15 PM')} className={slot === '07:15 PM' ? SLOT_SELECTED : SLOT_IDLE}>
{slot === '07:15 PM' && <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
            07:15 PM
          </button>
</div>
</div>
</div>
{/* 5. SLOT HOLD NOTICE BANNER */}
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-4 flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-white border border-[#F9C6C9] flex items-center justify-center flex-shrink-0 text-primary-container">
<span className="material-symbols-outlined text-[20px]" data-icon="timer">timer</span>
</div>
<div className="flex-1 text-caption font-caption text-[#1C1917]">
<span className="font-caption-strong text-caption-strong text-primary-container">Selected slot: Today, {slot}</span>
        held for you. Reserving for <span className="font-caption-strong text-caption-strong font-mono text-primary-container" id="countdown-timer">{remaining === null ? '08:00' : formatHold(remaining)}</span> minutes.
      </div>
<div className="hidden sm:flex items-center gap-1 text-micro font-micro text-[#78716C]">
<span className="material-symbols-outlined text-[14px]" data-icon="verified_user">verified_user</span>
        Instant Guarantee
      </div>
</div>
</main>
<div className="pb-28"><Footer /></div>
{/* STICKY BOTTOM BAR (Level 2 Floating Checkout Anchor) */}
<aside aria-label="Booking Confirmation Bar" className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E5E4] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-40 py-4 px-6">
<div className="w-full max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
{/* Slot summary */}
<div className="flex items-center gap-4 w-full sm:w-auto">
<div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center flex-shrink-0 text-primary-container">
<span className="material-symbols-outlined text-[22px]" data-icon="event_available">event_available</span>
</div>
<div>
<div className="text-caption font-caption text-[#78716C] flex items-center gap-1.5">
<span>Dr. Priya Sharma</span>
<span>•</span>
<span className="text-[#1C1917] font-caption-strong text-caption-strong">Clinic Visit</span>
</div>
<div className="text-body-strong font-body-strong text-[#1C1917] flex items-center gap-2">
<span>Today, 24 May at {slot}</span>
<span className="text-primary-container font-headline-h3 font-headline-h3">₹650</span>
</div>
</div>
</div>
{/* Action button */}
<div className="w-full sm:w-auto flex items-center gap-3">
<Link className="w-full sm:w-auto bg-primary-container hover:bg-[#970012] text-white px-8 py-3.5 rounded-lg font-body-strong text-body-strong flex items-center justify-center gap-2 shadow-sm transition active:scale-98" href="/book/patient-details" onClick={() => { if (remaining === null) startSlotHold(); }}>
<span>Continue to Patient Details</span>
<span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
</div>
</aside>
{/* MICRO-INTERACTION SCRIPT FOR TIMER */}


    </>
  );
}
