
'use client';
import Link from 'next/link';
import SlotCountdown from '@/components/SlotCountdown';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';

export default function BookingStep3PagePage() {
  return (
    <>
      
<Header />
<BookingProgress currentStep={3} />
{/* MAIN TWO-COLUMN CHECKOUT CONTENT */}
<main className="flex-1 max-w-[1200px] w-full mx-auto px-margin-desktop py-space-xl flex flex-col lg:flex-row gap-gutter-desktop items-start">
{/* LEFT COLUMN: Payment Methods Selector (~760px flex-1) */}
<div className="flex-1 w-full space-y-6">
<div className="space-y-1">
<h1 className="text-headline-h1 font-headline-h1 text-on-surface">Select Payment Method</h1>
<p className="text-body-default font-body-default text-on-surface-variant">
          100% secure encrypted payment processed via RBI compliant gateway
        </p>
</div>
{/* Payment Methods Container Accordion */}
<div className="rounded-xl border border-surface-variant bg-surface-container-lowest divide-y divide-surface-variant overflow-hidden shadow-sm">
{/* 1. UPI (EXPANDED & SELECTED) */}
<div className="transition-colors duration-150">
{/* Accordion Header */}
<label className="flex items-center justify-between p-4 cursor-pointer bg-surface-container-low/40">
<div className="flex items-center gap-3">
<input defaultChecked className="w-[18px] h-[18px] text-primary-container focus:ring-primary-container border-outline cursor-pointer accent-primary-container" name="payment_method" type="radio"/>
<span className="text-headline-h3 font-headline-h3 text-on-surface">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
</div>
<div className="flex items-center gap-2">
<span className="px-2.5 py-0.5 rounded-full text-micro font-micro bg-tertiary-container/10 border border-tertiary-fixed text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]" data-icon="bolt">bolt</span>
                Instant Zero Surcharge
              </span>
</div>
</label>
{/* Expanded Body */}
<div className="p-5 pt-3 space-y-5 bg-surface-container-lowest">
{/* Popular UPI Apps Grid */}
<div>
<p className="text-caption-strong font-caption-strong text-on-surface-variant mb-3">Pay using installed apps</p>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
{/* Google Pay Tile (Selected) */}
<div className="p-3 rounded-lg border-2 border-primary-container bg-surface-container-low flex flex-col items-center justify-center gap-2 cursor-pointer transition relative">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest border border-surface-variant flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-[24px] text-primary" data-icon="account_balance_wallet">account_balance_wallet</span>
</div>
<span className="text-caption-strong font-caption-strong text-on-surface">Google Pay</span>
<span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container"></span>
</div>
{/* PhonePe Tile */}
<div className="p-3 rounded-lg border border-surface-variant bg-surface-container-lowest hover:bg-surface-container-low transition flex flex-col items-center justify-center gap-2 cursor-pointer">
<div className="w-10 h-10 rounded-full bg-surface-container-low border border-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-[24px] text-on-surface-variant" data-icon="smartphone">smartphone</span>
</div>
<span className="text-caption font-caption text-on-surface font-medium">PhonePe</span>
</div>
{/* Paytm Tile */}
<div className="p-3 rounded-lg border border-surface-variant bg-surface-container-lowest hover:bg-surface-container-low transition flex flex-col items-center justify-center gap-2 cursor-pointer">
<div className="w-10 h-10 rounded-full bg-surface-container-low border border-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-[24px] text-on-surface-variant" data-icon="payments">payments</span>
</div>
<span className="text-caption font-caption text-on-surface font-medium">Paytm</span>
</div>
{/* BHIM / CRED Tile */}
<div className="p-3 rounded-lg border border-surface-variant bg-surface-container-lowest hover:bg-surface-container-low transition flex flex-col items-center justify-center gap-2 cursor-pointer">
<div className="w-10 h-10 rounded-full bg-surface-container-low border border-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-[24px] text-on-surface-variant" data-icon="qr_code_scanner">qr_code_scanner</span>
</div>
<span className="text-caption font-caption text-on-surface font-medium">BHIM / CRED</span>
</div>
</div>
</div>
{/* Divider */}
<div className="flex items-center gap-3">
<div className="flex-1 h-[1px] bg-surface-variant"></div>
<span className="text-micro font-micro uppercase tracking-wider text-on-surface-variant">OR ENTER VPA</span>
<div className="flex-1 h-[1px] bg-surface-variant"></div>
</div>
{/* UPI ID (VPA) Input */}
<div className="space-y-2">
<label className="block text-caption-strong font-caption-strong text-on-surface" htmlFor="vpa-input">
                Enter UPI ID (VPA)
              </label>
<div className="relative">
<input className="w-full h-11 px-3 pr-28 rounded-lg border border-surface-variant bg-surface-container-lowest text-on-surface font-body-default focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition outline-none" id="vpa-input" type="text" value="kavita@okhdfcbank"/>
<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-tertiary">
<span className="material-symbols-outlined text-[16px]" data-icon="verified" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="text-micro font-micro font-semibold">Verified VPA</span>
</div>
</div>
<p className="text-caption font-caption text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="info">info</span>
                Open your UPI app after clicking Pay to approve the ₹650 mandate.
              </p>
</div>
</div>
</div>
{/* 2. Credit / Debit Card (COLLAPSED) */}
<div>
<label className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container-low transition-colors duration-150">
<div className="flex items-center gap-3">
<input className="w-[18px] h-[18px] text-primary-container focus:ring-primary-container border-outline cursor-pointer accent-primary-container" name="payment_method" type="radio"/>
<div>
<span className="text-headline-h3 font-headline-h3 text-on-surface">Credit or Debit Card</span>
</div>
</div>
{/* Card Brand Logos/Chips */}
<div className="flex items-center gap-1.5 opacity-80">
<span className="px-2 py-0.5 rounded text-[11px] font-bold border border-surface-variant bg-surface-container-low text-on-surface">VISA</span>
<span className="px-2 py-0.5 rounded text-[11px] font-bold border border-surface-variant bg-surface-container-low text-on-surface">MC</span>
<span className="px-2 py-0.5 rounded text-[11px] font-bold border border-surface-variant bg-surface-container-low text-on-surface">RuPay</span>
<span className="px-2 py-0.5 rounded text-[11px] font-bold border border-surface-variant bg-surface-container-low text-on-surface">AMEX</span>
</div>
</label>
{/* Saved Card Preview Sub-row */}
<div className="px-5 pb-4 pt-1 flex flex-wrap items-center justify-between text-caption font-caption bg-surface-container-lowest text-on-surface-variant border-t border-surface-variant/40">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="credit_card">credit_card</span>
<span>Saved: <strong className="text-on-surface font-medium">HDFC Bank Visa ending in •••• 4092</strong></span>
<input className="w-14 h-8 text-center rounded border border-surface-variant text-caption font-caption focus:border-primary-container focus:ring-0 ml-2" maxLength={10} placeholder="CVV" type="password"/>
</div>
<button className="text-primary font-caption-strong font-semibold hover:underline mt-2 sm:mt-0" type="button">+ Add new card</button>
</div>
</div>
{/* 3. Netbanking (COLLAPSED) */}
<div>
<label className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container-low transition-colors duration-150">
<div className="flex items-center gap-3">
<input className="w-[18px] h-[18px] text-primary-container focus:ring-primary-container border-outline cursor-pointer accent-primary-container" name="payment_method" type="radio"/>
<span className="text-headline-h3 font-headline-h3 text-on-surface">Netbanking</span>
</div>
{/* Bank list icons preview */}
<div className="flex items-center gap-1.5 text-micro font-micro text-on-surface-variant">
<span className="px-1.5 py-0.5 rounded bg-surface-container-low border border-surface-variant">SBI</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-low border border-surface-variant">HDFC</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-low border border-surface-variant">ICICI</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-low border border-surface-variant">Axis</span>
<span className="text-caption font-caption text-primary hover:underline ml-1">More Banks ›</span>
</div>
</label>
</div>
{/* 4. Wallets (COLLAPSED) */}
<div>
<label className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container-low transition-colors duration-150">
<div className="flex items-center gap-3">
<input className="w-[18px] h-[18px] text-primary-container focus:ring-primary-container border-outline cursor-pointer accent-primary-container" name="payment_method" type="radio"/>
<span className="text-headline-h3 font-headline-h3 text-on-surface">Digital Wallets</span>
</div>
<span className="text-caption font-caption text-on-surface-variant">Paytm Wallet, Amazon Pay, Mobikwik</span>
</label>
</div>
{/* 5. Pay at Clinic (COLLAPSED - Secondary option) */}
<div className="bg-surface-container-low/20">
<label className="flex items-start justify-between p-4 cursor-pointer hover:bg-surface-container-low transition-colors duration-150">
<div className="flex items-start gap-3">
<input className="w-[18px] h-[18px] mt-0.5 text-primary-container focus:ring-primary-container border-outline cursor-pointer accent-primary-container" name="payment_method" type="radio"/>
<div>
<span className="text-headline-h3 font-headline-h3 text-on-surface">Pay at Clinic Counter</span>
<p className="text-caption font-caption text-on-surface-variant">Pay cash or card directly at the clinic desk upon arrival.</p>
</div>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container-high border border-surface-variant text-micro font-micro text-on-surface-variant shrink-0 mt-0.5">
              Requires OTP at check-in
            </span>
</label>
</div>
</div>
{/* Trust Milestone Notice */}
<div className="p-4 rounded-xl border border-surface-variant bg-surface-container-low flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5" data-icon="health_and_safety">health_and_safety</span>
<div className="space-y-0.5">
<p className="text-caption-strong font-caption-strong text-on-surface">Ayushman Bharat Digital Mission (ABDM) Compliant</p>
<p className="text-caption font-caption text-on-surface-variant">Your transaction and consultation records are securely mapped to your verified ABHA ID under National Health Authority standards.</p>
</div>
</div>
</div>
{/* RIGHT COLUMN: Sticky Summary Card (~380px) */}
<aside className="w-full lg:w-[380px] lg:sticky lg:top-24 space-y-4">
{/* Summary Card Box */}
<div className="bg-surface-container-lowest rounded-xl border border-surface-variant p-6 shadow-sm space-y-5">
{/* Header & Slot Countdown Pill */}
<div className="flex items-center justify-between pb-3 border-b border-surface-variant">
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Booking Details</h2>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-micro font-semibold border border-outline-variant">
<span className="material-symbols-outlined text-[14px]" data-icon="schedule">schedule</span>
<span>Slot reserved: 05:30</span>
</div>
</div>
{/* Appointment Key Facts Bento */}
<div className="space-y-3">
{/* Doctor & Specialty */}
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px] text-primary" data-icon="stethoscope">stethoscope</span>
</div>
<div>
<div className="flex items-center gap-1.5">
<span className="text-body-strong font-body-strong text-on-surface">Dr. Priya Sharma</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-tertiary-container/10 text-tertiary border border-tertiary-fixed">Verified</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">MD Dermatology · 12 Yrs Exp</p>
</div>
</div>
{/* Patient */}
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant" data-icon="person">person</span>
</div>
<div>
<p className="text-body-strong font-body-strong text-on-surface">Kavita Ramanathan</p>
<p className="text-caption font-caption text-on-surface-variant">Myself · 32 F · ABHA Linked</p>
</div>
</div>
{/* Clinic & Schedule */}
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant" data-icon="calendar_today">calendar_today</span>
</div>
<div>
<p className="text-body-strong font-body-strong text-on-surface">Today, 24 May at 05:45 PM</p>
<p className="text-caption font-caption text-on-surface-variant">SkinCare Super Specialty Clinic, Indiranagar</p>
</div>
</div>
</div>
<div className="h-[1px] bg-surface-variant"></div>
{/* Fee Breakdown Matrix */}
<div className="space-y-2 text-caption font-caption text-on-surface-variant">
<div className="flex items-center justify-between">
<span>Consultation Fee</span>
<span className="text-on-surface font-medium">₹800</span>
</div>
<div className="flex items-center justify-between text-tertiary">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]" data-icon="local_offer">local_offer</span>
              Curxx Care Discount
            </span>
<span className="font-semibold">-₹150</span>
</div>
<div className="flex items-center justify-between">
<span>Platform Convenience Fee</span>
<span className="text-tertiary font-semibold uppercase text-micro tracking-wide">FREE</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant">
<span>Taxes (GST)</span>
<span className="font-medium text-micro">Included</span>
</div>
<div className="h-[1px] bg-surface-variant pt-2"></div>
{/* Total Amount Row */}
<div className="flex items-baseline justify-between pt-1">
<span className="text-body-strong font-body-strong text-on-surface">Total Amount</span>
<div className="text-right">
<span className="text-headline-h1 font-headline-h1 font-bold text-on-surface tracking-tight">₹650</span>
<p className="text-micro font-micro text-on-surface-variant">One-time payment</p>
</div>
</div>
</div>
<SlotCountdown />
{/* PRIMARY ACTION CTA */}
<div>
<Link className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-headline-h3 font-headline-h3 font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition duration-150 ease-in-out active:scale-[0.98]" href="/book/confirmed">
<span className="material-symbols-outlined text-[20px]" data-icon="lock" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>lock</span>
<span>Pay ₹650</span>
</Link>
</div>
{/* Security Gateway Trust Marks */}
<div className="pt-2 border-t border-surface-variant space-y-3">
<div className="flex items-center justify-between px-2 text-micro font-micro text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="verified_user">verified_user</span>
              256-bit SSL
            </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-outline" data-icon="shield">shield</span>
              PCI-DSS Level 1
            </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-outline" data-icon="security">security</span>
              Razorpay Secured
            </span>
</div>
<div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-variant text-center">
<p className="text-micro font-micro text-on-surface-variant">
              Instant appointment confirmation · 100% money back if cancelled up to 2 hrs prior
            </p>
</div>
</div>
</div>
{/* Micro Helpdesk Anchor */}
<div className="text-center">
<p className="text-micro font-micro text-on-surface-variant">
          Need clinical or payment help? <Link className="text-primary font-semibold hover:underline" href="/">Chat with Curxx Support</Link> or call <strong className="text-on-surface">1800-266-1088</strong>
</p>
</div>
</aside>
</main>
<Footer />
{/* Micro-interaction logic for payment selection */}


    </>
  );
}
