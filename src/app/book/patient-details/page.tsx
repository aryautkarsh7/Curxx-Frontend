
'use client';
import Link from 'next/link';
import SlotCountdown from '@/components/SlotCountdown';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';

export default function BookingStep2PagePage() {
  return (
    <>
      
<Header />
<BookingProgress currentStep={2} />
{/* MAIN CANVAS */}
<main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8">
<div className="flex flex-col lg:flex-row gap-8 items-start">
{/* LEFT COLUMN: Patient Setup & Medical Details */}
<section className="w-full lg:w-[760px] flex-1 space-y-6">
{/* 1. 'Booking for' Family Member Horizontal Selector */}
<div className="bg-white rounded-xl border border-[#E7E5E4] p-6">
<div className="flex items-center justify-between mb-4">
<div>
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Who is this consultation for?</h2>
<p className="font-caption text-caption text-[#78716C] mt-0.5">Select an existing family member or register a new patient file</p>
</div>
<span className="font-micro text-micro bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[14px]" data-icon="verified_user">verified_user</span>
              ABHA Profile Linked
            </span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
{/* Card 1: Selected (Myself) */}
<div className="relative border-2 border-primary-container bg-[#FFF1F2] p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
                  KR
                </div>
<span className="material-symbols-outlined text-primary-container text-[20px]" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="mt-3">
<div className="font-body-strong text-body-strong text-[#1C1917]">Kavita R.</div>
<div className="font-caption-strong text-caption-strong text-primary-container">Myself</div>
<div className="font-micro text-micro text-[#78716C] mt-1">32 Yrs · Female</div>
</div>
</div>
{/* Card 2: Aarav (Son) */}
<div className="border border-[#E7E5E4] bg-white p-4 rounded-xl cursor-pointer hover:border-[#1C1917] transition-all flex flex-col justify-between group">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[#1C1917] flex items-center justify-center font-bold text-sm group-hover:bg-[#FFF1F2]">
                  AR
                </div>
<div className="w-4 h-4 rounded-full border border-[#78716C]"></div>
</div>
<div className="mt-3">
<div className="font-body-strong text-body-strong text-[#1C1917]">Aarav R.</div>
<div className="font-caption text-caption text-[#78716C]">Son</div>
<div className="font-micro text-micro text-[#78716C] mt-1">4 Yrs · Male</div>
</div>
</div>
{/* Card 3: Sunita (Mother) */}
<div className="border border-[#E7E5E4] bg-white p-4 rounded-xl cursor-pointer hover:border-[#1C1917] transition-all flex flex-col justify-between group">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[#1C1917] flex items-center justify-center font-bold text-sm group-hover:bg-[#FFF1F2]">
                  SR
                </div>
<div className="w-4 h-4 rounded-full border border-[#78716C]"></div>
</div>
<div className="mt-3">
<div className="font-body-strong text-body-strong text-[#1C1917]">Sunita R.</div>
<div className="font-caption text-caption text-[#78716C]">Mother</div>
<div className="font-micro text-micro text-[#78716C] mt-1">58 Yrs · Female</div>
</div>
</div>
{/* Card 4: Add New Member */}
<div className="border-2 border-dashed border-[#78716C]/40 bg-[#FAFAF9] hover:bg-[#FFF1F2]/50 hover:border-primary-container p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[120px]">
<div className="w-9 h-9 rounded-full bg-white border border-[#E7E5E4] flex items-center justify-center text-primary-container mb-2">
<span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
</div>
<span className="font-caption-strong text-caption-strong text-primary-container">Add Family Member</span>
<span className="font-micro text-micro text-[#78716C]">Instant ABHA create</span>
</div>
</div>
</div>
{/* 2. Patient Information Form */}
<div className="bg-white rounded-xl border border-[#E7E5E4] p-6 space-y-5">
<div className="border-b border-[#E7E5E4] pb-4 flex items-center justify-between">
<div>
<h2 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Patient Contact &amp; Clinical Details</h2>
<p className="font-caption text-caption text-[#78716C]">Details will appear directly on doctor&apos;s clinical prescription</p>
</div>
<span className="font-micro text-micro text-[#78716C] bg-[#FAFAF9] px-2.5 py-1 rounded border border-[#E7E5E4]">Step 2 of 4</span>
</div>
{/* Row 1: Full Name & Age */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
<div className="sm:col-span-2 space-y-1.5">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Full Legal Name *</label>
<div className="relative">
<input className="w-full h-11 px-3.5 bg-white border border-[#E7E5E4] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 font-body-default" placeholder="Enter patient name as per Aadhaar/ABHA" type="text" value="Kavita Ramanathan"/>
<span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-[#047857]" data-icon="verified" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
</div>
<div className="space-y-1.5">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Age (Years) *</label>
<input className="w-full h-11 px-3.5 bg-white border border-[#E7E5E4] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 font-body-default" placeholder="Age" type="number" value="32"/>
</div>
</div>
{/* Row 2: Gender Selector */}
<div className="space-y-1.5">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Gender *</label>
<div className="grid grid-cols-3 gap-3">
<button className="h-10 rounded-lg border-2 border-primary-container bg-[#FFF1F2] text-primary-container font-caption-strong text-caption-strong flex items-center justify-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px]" data-icon="female">female</span>
                Female
              </button>
<button className="h-10 rounded-lg border border-[#E7E5E4] bg-white text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9] font-caption-strong text-caption-strong flex items-center justify-center gap-2 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]" data-icon="male">male</span>
                Male
              </button>
<button className="h-10 rounded-lg border border-[#E7E5E4] bg-white text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9] font-caption-strong text-caption-strong flex items-center justify-center gap-2 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]" data-icon="transgender">transgender</span>
                Other
              </button>
</div>
</div>
{/* Row 3: Phone Number with prefix and checkmark */}
<div className="space-y-1.5">
<div className="flex items-center justify-between">
<label className="font-caption-strong text-caption-strong text-[#1C1917]">Phone Number (for SMS &amp; WhatsApp reminders) *</label>
<span className="font-micro text-micro text-[#047857] flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="check_circle">check_circle</span>
                Verified Mobile
              </span>
</div>
<div className="flex rounded-lg border border-[#E7E5E4] overflow-hidden focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container/20">
<div className="bg-[#FAFAF9] px-3 flex items-center gap-1.5 border-r border-[#E7E5E4] select-none text-sm text-[#1C1917] font-medium">
<span className="inline-flex flex-col w-4 h-3 overflow-hidden rounded-[1px] border border-stone-300">
<span className="h-1 bg-[#FF9933] w-full"></span>
<span className="h-1 bg-white w-full flex items-center justify-center"><span className="w-0.5 h-0.5 rounded-full bg-blue-800"></span></span>
<span className="h-1 bg-[#128807] w-full"></span>
</span>
<span>+91</span>
</div>
<input className="w-full h-11 px-3.5 bg-white text-sm text-[#1C1917] border-0 focus:ring-0 font-body-default" placeholder="10-digit mobile number" type="tel" value="98450 12890"/>
<div className="flex items-center pr-3 bg-white">
<span className="material-symbols-outlined text-[#047857] text-[20px]" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
</div>
</div>
{/* Row 4: Email Address */}
<div className="space-y-1.5">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Email Address (for Digital Prescription &amp; GST Receipt) *</label>
<div className="relative">
<input className="w-full h-11 pl-10 pr-3.5 bg-white border border-[#E7E5E4] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 font-body-default" placeholder="e.g. name@domain.com" type="email" value="kavita.ramanathan@gmail.com"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#78716C]" data-icon="mail">mail</span>
</div>
</div>
{/* Row 5: Reason for Visit / Symptoms */}
<div className="space-y-1.5">
<div className="flex items-center justify-between">
<label className="font-caption-strong text-caption-strong text-[#1C1917]">Reason for Visit / Chief Symptoms</label>
<span className="font-micro text-micro text-[#78716C]">74/500</span>
</div>
<textarea className="w-full p-3 bg-white border border-[#E7E5E4] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 font-body-default resize-none" placeholder="Describe current symptoms (e.g. skin rash, persistent acne on cheek, itching duration)" rows={3}>Persistent adult acne breakout along jawline since 3 weeks, mild redness</textarea>
<p className="font-micro text-micro text-[#78716C]">This information helps the doctor prepare clinical notes ahead of your arrival.</p>
</div>
</div>
{/* 3. Optional Medical Records / File Upload */}
<div className="bg-white rounded-xl border border-[#E7E5E4] p-6 space-y-4">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Attach Previous Records (Optional)</h3>
<p className="font-caption text-caption text-[#78716C]">Upload lab tests, skin photos, or past dermatological prescriptions</p>
</div>
<span className="font-micro text-micro text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded">ABDM Compliant</span>
</div>
{/* Dashed Drop Area */}
<div className="border-2 border-dashed border-[#E7E5E4] hover:border-primary-container bg-[#FAFAF9] rounded-xl p-6 text-center transition-colors cursor-pointer group">
<div className="w-12 h-12 mx-auto rounded-full bg-white border border-[#E7E5E4] flex items-center justify-center text-[#78716C] group-hover:text-primary-container group-hover:border-primary-container mb-2 transition-colors">
<span className="material-symbols-outlined text-[24px]" data-icon="cloud_upload">cloud_upload</span>
</div>
<div className="font-body-strong text-body-strong text-[#1C1917]">Click to upload or drag &amp; drop files here</div>
<div className="font-micro text-micro text-[#78716C] mt-1">PNG, JPG, PDF up to 10MB · ABDM 256-bit encrypted medical store</div>
</div>
{/* Uploaded Pill Preview */}
<div className="flex items-center justify-between bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg px-4 py-2.5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-[#FFF1F2] text-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]" data-icon="picture_as_pdf">picture_as_pdf</span>
</div>
<div>
<div className="font-caption-strong text-caption-strong text-[#1C1917]">Derm_Report_March2025.pdf</div>
<div className="font-micro text-micro text-[#78716C]">1.2 MB · Uploaded just now</div>
</div>
</div>
<button className="text-[#78716C] hover:text-primary-container transition-colors p-1" title="Remove file" type="button">
<span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</div>
</section>
{/* RIGHT COLUMN: Order Summary & Checkout Action */}
<aside className="w-full lg:w-[380px] lg:sticky lg:top-24 space-y-4">
{/* SUMMARY CARD */}
<div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-sm space-y-5">
<div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
<h2 className="font-headline-h3 text-headline-h3 text-[#1C1917]">Consultation Summary</h2>
<span className="material-symbols-outlined text-[#78716C] text-[20px]" data-icon="receipt_long">receipt_long</span>
</div>
{/* Doctor Profile Snippet */}
<div className="flex items-start gap-3.5">
<img loading="lazy" decoding="async" className="w-12 h-12 rounded-lg object-cover border border-[#E7E5E4]" data-alt="A portrait of Dr Priya Sharma in a crisp white medical coat with stethoscope in a clean contemporary hospital lighting with sterile minimalist aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAigIdLYBujxHTbbJIl5w0GH5Ni3HcmcTqa1peb8_d9o96htc_jFoWJ7PnsRN0lEOEtOvfxKHeM9HO3kVii6TkKbgW2MOJJQPRii49x37h3AcIc5lZyUP1eqzNRW8whwILZAFZ2XUVeI5YIQpONq8gg7kJZzyGQAtytRM2T55xMGMKtS0zJbaFQhynSUYO9Q9IRdsBi-u2UcNUoPY3V-Ws0toMUVfoFY59I2S1orpbEreErbfYyBQ0b=w96"/>
<div>
<div className="flex items-center gap-1.5">
<span className="font-body-strong text-body-strong text-[#1C1917]">Dr. Priya Sharma</span>
<span className="font-micro text-micro bg-[#ECFDF5] text-[#047857] px-1.5 py-0.5 rounded border border-[#A7F3D0] font-semibold">MD Verified</span>
</div>
<p className="font-caption text-caption text-[#78716C]">Senior Dermatologist (12+ Yrs)</p>
<p className="font-micro text-micro text-[#1C1917] mt-0.5 flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-[#78716C]" data-icon="location_on">location_on</span>
                SkinCare Super Specialty Clinic, Indiranagar
              </p>
</div>
</div>
{/* Appointment Slot Details Box */}
<div className="bg-[#FAFAF9] p-3.5 rounded-xl border border-[#E7E5E4] space-y-2">
<div className="flex items-center gap-2 font-caption-strong text-caption-strong text-[#1C1917]">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="calendar_today">calendar_today</span>
<span>Date: Today, 24 May 2025</span>
</div>
<div className="flex items-center gap-2 font-caption-strong text-caption-strong text-[#1C1917]">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="schedule">schedule</span>
<span>Time: 05:45 PM (Clinic Visit)</span>
</div>
<div className="flex items-center gap-2 font-caption text-caption text-[#78716C]">
<span className="material-symbols-outlined text-[18px] text-[#78716C]" data-icon="domain">domain</span>
<span>In-Person Physical Consultation</span>
</div>
</div>
<SlotCountdown />
{/* Bill Breakdown */}
<div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
<div className="flex items-center justify-between font-body-default text-body-default text-[#1C1917]">
<span>Consultation Fee</span>
<span className="font-body-strong text-body-strong">₹800</span>
</div>
<div className="flex items-center justify-between font-body-default text-body-default text-[#047857]">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="local_offer">local_offer</span>
                Curxx First-Visit Benefit
              </span>
<span className="font-body-strong text-body-strong">-₹150</span>
</div>
<div className="flex items-center justify-between font-body-default text-body-default text-[#78716C]">
<span className="flex items-center gap-1">
                ABHA &amp; Digital Storage
              </span>
<span className="font-caption-strong text-caption-strong text-[#047857] uppercase">Free</span>
</div>
<div className="pt-3 border-t border-[#E7E5E4] flex items-baseline justify-between">
<div>
<span className="font-headline-h3 text-headline-h3 text-[#1C1917]">Total Payable</span>
<p className="font-micro text-micro text-[#78716C]">Inclusive of all GST &amp; clinic charges</p>
</div>
<div className="font-display text-display font-bold text-[#1C1917]">
                ₹650
              </div>
</div>
</div>
{/* Promo Input */}
<div className="flex gap-2 pt-1">
<input className="flex-1 h-10 px-3 uppercase text-xs border border-[#E7E5E4] rounded-lg focus:outline-none focus:border-primary-container font-body-default placeholder:normal-case" placeholder="Enter coupon code" type="text"/>
<button className="px-4 h-10 bg-white border border-[#E7E5E4] text-primary-container hover:bg-[#FFF1F2] rounded-lg font-caption-strong text-caption-strong transition-colors" type="button">
              Apply
            </button>
</div>
{/* PRIMARY CTA */}
<Link className="w-full h-12 bg-primary-container hover:bg-[#8E0E17] text-white rounded-lg flex items-center justify-center gap-2 font-body-strong text-body-strong transition-colors shadow-sm active:scale-[0.99]" href="/book/payment">
<span>Continue to Payment</span>
<span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
{/* Cancellation Policy */}
<div className="flex items-start gap-2 bg-[#FAFAF9] p-3 rounded-lg border border-[#E7E5E4]">
<span className="material-symbols-outlined text-[18px] text-[#047857] mt-0.5" data-icon="policy">policy</span>
<p className="font-micro text-micro text-[#78716C]">
<strong className="text-[#1C1917]">Free cancellation</strong> up to 2 hours before visit. Instant 100% refund guaranteed to original payment method.
            </p>
</div>
{/* Security Trust Row */}
<div className="flex items-center justify-between pt-2 border-t border-[#E7E5E4] text-[#78716C]">
<div className="flex items-center gap-1 font-micro text-micro">
<span className="material-symbols-outlined text-[15px] text-[#047857]" data-icon="verified">verified</span>
<span>MCI Registered</span>
</div>
<div className="flex items-center gap-1 font-micro text-micro">
<span className="material-symbols-outlined text-[15px] text-[#047857]" data-icon="health_and_safety">health_and_safety</span>
<span>ABDM Encrypted</span>
</div>
<div className="flex items-center gap-1 font-micro text-micro">
<span className="material-symbols-outlined text-[15px] text-[#047857]" data-icon="lock">lock</span>
<span>100% Secure</span>
</div>
</div>
</div>
{/* Help Support Micro Box */}
<div className="flex items-center justify-between px-4 py-3 bg-white border border-[#E7E5E4] rounded-xl text-xs text-[#78716C]">
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-primary-container" data-icon="support_agent">support_agent</span>
            Need help with this booking?
          </span>
<Link className="text-primary-container font-semibold hover:underline" href="/">Call 1800-CURXX-DOC</Link>
</div>
</aside>
</div>
</main>
<Footer />

    </>
  );
}
