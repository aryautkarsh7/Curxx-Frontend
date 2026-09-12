
'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import Toast, { useToast } from '@/components/Toast';
import { addToCart, cartItemFromCard } from '@/lib/cart';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const PRODUCT = { slug: 'augmentin-625', name: 'Augmentin 625 Duo Tablet', price: 201 };

export default function CurxxMedicineProductDetailAugmentin625DuoPage() {
  const [toast, showToast] = useToast();
  const [qty, setQty] = useState(1);

  function addFromCard(e: MouseEvent<HTMLButtonElement>) {
    const item = cartItemFromCard(e.currentTarget);
    if (!item) return;
    addToCart(item);
    showToast(`${item.name} added to cart`);
  }

  function addProduct() {
    addToCart(PRODUCT, qty);
    showToast(`${qty} × ${PRODUCT.name} added to cart`);
  }

  return (
    <>
      
<Header />
{/* MAIN CANVAS */}
<main className="flex-1 w-full max-w-[1200px] mx-auto px-margin-desktop py-space-base">
{/* BREADCRUMB */}
<nav aria-label="Breadcrumb" className="mb-space-base">
<ol className="flex items-center space-x-2 text-caption font-caption text-outline">
<li>
<Link href="/" className="hover:text-primary transition-colors duration-150">Home</Link>
</li>
<li><span className="text-surface-variant">/</span></li>
<li>
<Link href="/medicines" className="hover:text-primary transition-colors duration-150">Medicines</Link>
</li>
<li><span className="text-surface-variant">/</span></li>
<li>
<Link href="/medicines?category=antibiotics" className="hover:text-primary transition-colors duration-150">Antibiotics &amp; Infectious Disease</Link>
</li>
<li><span className="text-surface-variant">/</span></li>
<li aria-current="page" className="font-caption-strong text-caption-strong text-primary truncate">
          Augmentin 625 Duo Tablet
        </li>
</ol>
</nav>
{/* PRODUCT HERO: 2-COLUMN SPLIT (55% / 45%) */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-2xl items-start">
{/* LEFT COLUMN: Image Gallery & Certifications (55% -> 7 cols) */}
<div className="lg:col-span-7 flex flex-col gap-space-base">
{/* Main Image Card */}
<div className="relative bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg flex flex-col items-center justify-center overflow-hidden min-h-[440px]">
{/* Prescription Pill Tag */}
<div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container border border-outline-variant text-primary font-caption-strong text-caption">
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="prescriptions">prescriptions</span>
<span>Rx Prescription Required</span>
</div>
{/* Expand / Zoom Button */}
<button aria-label="Zoom product image" className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-surface-container-lowest border border-surface-variant text-outline hover:text-primary flex items-center justify-center transition-colors duration-150 shadow-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="zoom_in">zoom_in</span>
</button>
{/* Primary Medical Packaging Image */}
<div className="w-full max-w-[360px] h-[300px] flex items-center justify-center my-4">
<img className="max-h-full max-w-full object-contain" data-alt="High precision pharmaceutical product photograph of Augmentin 625 Duo tablets showing a silver foil blister strip and the white pharmaceutical box on an immaculate white reflective surface. Bright high-key studio lighting with subtle warm shadows, clinical hygiene atmosphere, crisp medical typography and red accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAuRZkiGACWQgPo8N6ktMBcyyswb1r40nPwEZHlVyBT2x5ujqkW7iXV5QDP4V1Yun_cYZYHHZtITJr4zD3WKaIJ2qtU1E4tNILg25Z4AmVuGR2jmxZC1maOU0db_hSoBaiRoWixpprksTSnkUr_tiPzO8SpKuFHDsbrzIwYy9YmyoxDDpnS0IuUuF4zHR0pWlEPrpa3NNB7GhNwJInBRyVCmiKEEsio7lsmD2gtxzQEweeEDCHk-Ad"/>
</div>
{/* Trust Badge micro watermark */}
<div className="absolute bottom-4 right-4 flex items-center gap-1 text-outline font-micro text-micro">
<span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="verified">verified</span>
<span>GSK Genuine Seal Verified</span>
</div>
</div>
{/* Gallery Thumbnails */}
<div className="grid grid-cols-4 gap-space-sm">
<Link href="/medicines/augmentin-625" className="bg-surface-container-lowest border-2 border-primary-container rounded-lg p-2 flex items-center justify-center h-20 transition-all">
<img className="h-full object-contain" data-alt="Front facing pack view of Augmentin 625 Duo pharmaceutical blister package on clean white background with soft hospital lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFFNHZfUqyk9hyafN2llL4bG2hgNhqzL4JdrPjV840D1TjD_ayRY-nTMvtOoohvv19DYdMUFIhVh1CVdgBKzhHhr6i-Jmdej2RA29LQK_c4L9d5iBF-K7b1OP6CJhxv3NLBqI5A9nqWqCcLa3stEHagv4X04UFTXDANVnvXTWjaEXziEXFXK9LM2zVJI-oHJ8tDUr0gaxCKkp5UUbZ1gITNAhHp0mPcLzFtxudyXjHLRDYFL0NA8y4"/>
</Link>
<button className="bg-surface-container-lowest border border-surface-variant hover:border-outline rounded-lg p-2 flex items-center justify-center h-20 transition-all">
<img className="h-full object-contain" data-alt="Back view of the silver foil blister pack showing batch details, expiry date, and composition stamps in crisp medical detail." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0zTyjXTsKGS-lnc0vISQmhJGlP7e6Q07aCDud0fw8via3E_q6Jh-TW6fk2i9BECZO-XL-GP8CN5gRTq516nLp8n-_y9jxGpMi4sS_eEaWeI8jl4TYOM2tq9joLbJn1SMYRpcLgNjPXolsIfNq23VJMxIi2nAQ3hJPNScaxz8GQBst3bqSv-Ktoon5YunYkXIOR8OAcuPiDOreQldmRniNoKQktyHt-2kUNjvqFPxLuLbENZVxAg4R"/>
</button>
<Link href="/medicines/augmentin-625" className="bg-surface-container-lowest border border-surface-variant hover:border-outline rounded-lg p-2 flex items-center justify-center h-20 transition-all">
<img className="h-full object-contain" data-alt="Detailed close-up shot of single white scored capsule-shaped Augmentin 625 Duo antibiotic tablet resting next to clinical blister packaging." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsU4U23OLIdgwUzz00V2wE73h-DCW7-d5q7lN9e3P9uDeRa98pOSSUu0fBP3YzrJc3-QvMD9l8umw4pHotLtm2aYlSY-gfpgEnukXNJXNJYphrTmeGebMFce5UaRB-fqTvqlsq4f2V5s1xmSvFGMUKcAmJ86pU2A03iKP3XHg6DmkIvdUOHlycDsZZZNbStGhqb31GBFH7nr4PNgVcH5EqecysR2UgUteodvwM1myREqXZmxQmQW2z"/>
</Link>
<Link href="/medicines/augmentin-625" className="bg-surface-container-lowest border border-surface-variant hover:border-outline rounded-lg p-2 flex items-center justify-center h-20 transition-all">
<img className="h-full object-contain" data-alt="Full cardboard pharmaceutical packaging box of Augmentin 625 Duo tablet showing GlaxoSmithKline official branding and certification codes." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYkv7XEo2rJAv2ThnHM6cfB_ilNEO6xx6qQ1HKMDtrSs8W80R6D0isSzG482tNKT4WNQFs9EoLlZo8sxO2dVTcZrRRS_f32J2QNV2eDJmDmezRB_XVu9JAzuOcItxeuindM0h1Cf-Lg8w4t18yocEPauOF5E5robdliuvbLvHbIW4wz5JhMLEz6j8uNCJYS-0KlURpSvaqpyLvkhjNgsJ1UAt1U6pSOXsfFI-1kcSDUBJSvzQQZ3pr"/>
</Link>
</div>
{/* Clinical Quality Assurance Seals Row */}
<div className="grid grid-cols-3 gap-space-sm pt-2">
<div className="p-3 bg-surface-container-lowest border border-surface-variant rounded-lg flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[18px]" data-icon="verified_user">verified_user</span>
</div>
<div>
<p className="font-caption-strong text-caption-strong text-on-surface">100% Genuine</p>
<p className="font-micro text-micro text-outline">Direct from GSK India</p>
</div>
</div>
<div className="p-3 bg-surface-container-lowest border border-surface-variant rounded-lg flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[18px]" data-icon="health_and_safety">health_and_safety</span>
</div>
<div>
<p className="font-caption-strong text-caption-strong text-on-surface">WHO-GMP Batch</p>
<p className="font-micro text-micro text-outline">Certified Standard</p>
</div>
</div>
<div className="p-3 bg-surface-container-lowest border border-surface-variant rounded-lg flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[18px]" data-icon="thermostat">thermostat</span>
</div>
<div>
<p className="font-caption-strong text-caption-strong text-on-surface">Cold-Chain Log</p>
<p className="font-micro text-micro text-outline">Kept at 15°C – 25°C</p>
</div>
</div>
</div>
</div>
{/* RIGHT COLUMN: Purchase Actions & Prescription Protocol (45% -> 5 cols) */}
<div className="lg:col-span-5 flex flex-col gap-space-md">
{/* Eyebrow & Brand */}
<div>
<span className="font-micro text-micro text-outline tracking-wider block mb-1">
            GLAXOSMITHKLINE PHARMACEUTICALS LTD · ANTIBIOTIC
          </span>
<h1 className="text-display font-display text-on-surface leading-tight">
            Augmentin 625 Duo Tablet
          </h1>
<p className="text-caption font-caption text-on-surface-variant mt-1">
            Salt Composition: <span className="text-on-surface font-caption-strong">Amoxycillin (500mg) + Clavulanic Acid (125mg)</span>
</p>
</div>
{/* Pack Size Selector */}
<div className="pt-2">
<label className="font-caption-strong text-caption-strong text-on-surface block mb-2">Select Packaging Size</label>
<div className="flex flex-wrap gap-2">
{/* Selected */}
<button className="px-3.5 py-2 rounded-lg bg-error-container border border-outline-variant text-primary font-caption-strong text-caption flex items-center gap-1.5 ring-1 ring-primary-container">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Strip of 10 Tablets
            </button>
<button className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-variant text-on-surface-variant hover:text-primary font-caption text-caption">
              Pack of 30 Tablets (3 Strips)
            </button>
<button className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-variant text-on-surface-variant hover:text-primary font-caption text-caption">
              Pack of 60 Tablets (Box)
            </button>
</div>
</div>
{/* Pricing Block */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col gap-1">
<div className="flex items-baseline gap-3">
<span className="text-display font-display text-on-surface">₹201.71</span>
<span className="text-caption font-caption text-outline line-through">MRP ₹237.31</span>
<span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-caption">
              15% OFF
            </span>
</div>
<p className="font-micro text-micro text-outline">Inclusive of all Indian taxes · Free delivery on orders above ₹499</p>
</div>
{/* Prescription Required Alert Card */}
<div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-3.5 flex items-start gap-3">
<div className="w-8 h-8 rounded-lg bg-[#FFE4E6] flex items-center justify-center text-primary shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[20px]" data-icon="medical_information">medical_information</span>
</div>
<div className="flex-1">
<h2 className="font-body-strong text-body-strong text-[#8E0E17]">Valid Prescription Required</h2>
<p className="font-caption text-caption text-on-surface-variant mt-0.5">
              Government regulations mandate a licensed practitioner&apos;s prescription before dispatch of scheduled antibiotic substances.
            </p>
<Link href="/medicines/upload" className="inline-flex items-center gap-1 mt-2 text-primary font-caption-strong text-caption underline decoration-primary underline-offset-2 hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined text-[16px]" data-icon="upload_file">upload_file</span>
              Upload Prescription Now
            </Link>
</div>
</div>
{/* Delivery Pincode Checker */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-3.5">
<div className="flex items-center justify-between gap-3">
<div className="flex items-center gap-2 flex-1">
<span className="material-symbols-outlined text-outline text-[20px]" data-icon="local_shipping">local_shipping</span>
<input className="w-24 bg-transparent border-0 border-b border-surface-variant focus:border-primary-container p-0 text-body-strong text-on-surface focus:ring-0" placeholder="Enter Pincode" type="text" value="560001"/>
<button className="text-primary font-caption-strong text-caption hover:underline">Check</button>
</div>
<span className="text-[#047857] font-caption-strong text-caption flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="bolt">bolt</span>
              Delivery by Tomorrow, 9:00 PM
            </span>
</div>
<p className="font-micro text-micro text-outline mt-1.5 pl-7">Standard Dispatch from Curxx Central Hub, Bengaluru</p>
</div>
{/* Quantity & CTA Actions */}
<div className="flex flex-col gap-3 pt-1">
<div className="flex items-center gap-3">
{/* Stepper */}
<div className="flex items-center border border-surface-variant rounded-lg bg-surface-container-lowest h-12 px-2">
<button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface">
<span className="material-symbols-outlined text-[18px]" data-icon="remove">remove</span>
</button>
<span className="w-8 text-center font-body-strong text-body-strong text-on-surface">{qty}</span>
<button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface">
<span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
</button>
</div>
{/* Primary CTA: Add to Cart */}
<button type="button" onClick={addProduct} className="flex-1 h-12 bg-primary-container text-on-primary rounded-lg font-body-strong text-body-strong flex items-center justify-center gap-2 hover:bg-[#8E0E17] transition-all duration-150 shadow-sm active:scale-95">
<span className="material-symbols-outlined text-[20px]" data-icon="shopping_cart">shopping_cart</span>
              Add to Cart
            </button>
</div>
{/* Secondary CTA: Buy Now */}
<Link href="/book?type=medicine&product=augmentin-625" className="w-full h-12 bg-surface-container-lowest border border-primary-container text-primary rounded-lg font-body-strong text-body-strong flex items-center justify-center hover:bg-[#FFF1F2] transition-colors duration-150">
            Buy Now
          </Link>
</div>
{/* Micro Assurance Badges */}
<div className="flex items-center justify-between border-t border-surface-variant pt-3 px-1 text-outline font-micro text-micro">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]" data-icon="lock">lock</span>
            100% Genuine &amp; Sealed
          </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]" data-icon="replay">replay</span>
            7-Day Returns (Unopened)
          </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]" data-icon="ac_unit">ac_unit</span>
            Cold-Chain Safe
          </span>
</div>
</div>
</section>
{/* STICKY CLINICAL SUB-NAVIGATION */}
<div className="sticky top-16 z-40 bg-surface border-b border-surface-variant mb-space-xl -mx-margin-desktop px-margin-desktop">
<div className="max-w-[1200px] mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
<a className="text-primary font-body-strong text-body-strong border-b-2 border-primary-container pb-2 whitespace-nowrap" href="#about">Description</a>
<a className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 whitespace-nowrap transition-colors" href="#indications">Uses &amp; Indications</a>
<a className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 whitespace-nowrap transition-colors" href="#side-effects">Side Effects</a>
<a className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 whitespace-nowrap transition-colors" href="#safety-advice">Safety Advice</a>
<a className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 whitespace-nowrap transition-colors" href="#substitutes">Substitute Medicines</a>
<a className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-2 whitespace-nowrap transition-colors" href="#pharmacist-review">Pharmacist Review</a>
</div>
</div>
{/* CLINICAL CONTENT SECTIONS (Bento / Modular Structure) */}
<div className="space-y-space-2xl">
{/* SECTION 1: Description & Uses */}
<section className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg" id="about">
<div className="max-w-4xl space-y-6">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">About Augmentin 625 Duo Tablet</h2>
<p className="text-body-default font-body-default text-on-surface-variant mt-2 leading-relaxed">
              Augmentin 625 Duo Tablet is a high-efficacy broad-spectrum antibiotic designed to treat severe bacterial infections across the respiratory tract, ear, nose, throat, skin, and urinary tract. It synergistically combines <strong>Amoxycillin</strong>, a penicillin-type antibiotic that disrupts bacterial cell wall synthesis, with <strong>Clavulanic Acid</strong>, a potent beta-lactamase inhibitor that neutralizes bacterial enzyme resistance mechanisms.
            </p>
</div>
<div className="pt-2" id="indications">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface mb-3">Key Medical Indications</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="respiratory_rate">respiratory_rate</span>
<div>
<p className="font-body-strong text-body-strong text-on-surface">Respiratory Tract Infections</p>
<p className="font-caption text-caption text-outline">Acute bronchitis, community-acquired pneumonia, and bronchopneumonia.</p>
</div>
</div>
<div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="hearing">hearing</span>
<div>
<p className="font-body-strong text-body-strong text-on-surface">ENT &amp; Sinus Infections</p>
<p className="font-caption text-caption text-outline">Severe otitis media (middle ear infection) and recurrent sinusitis.</p>
</div>
</div>
<div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="dermatology">dermatology</span>
<div>
<p className="font-body-strong text-body-strong text-on-surface">Skin &amp; Soft Tissue Infections</p>
<p className="font-caption text-caption text-outline">Cellulitis, animal bites, and acute dental abscesses with tissue involvement.</p>
</div>
</div>
<div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="water_drop">water_drop</span>
<div>
<p className="font-body-strong text-body-strong text-on-surface">Urinary Tract Infections (UTI)</p>
<p className="font-caption text-caption text-outline">Complicated cystitis, urethritis, and secondary bacterial complications.</p>
</div>
</div>
</div>
</div>
{/* Quick Tip Card */}
<div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#F9C6C9] flex items-start gap-3">
<span className="material-symbols-outlined text-[#8E0E17] text-[22px] shrink-0" data-icon="lightbulb">lightbulb</span>
<div>
<p className="font-caption-strong text-caption-strong text-[#8E0E17]">Clinical Prescription Tip</p>
<p className="font-caption text-caption text-on-surface-variant mt-0.5">
                Complete the full multi-day regimen prescribed by your practitioner, even if symptom relief occurs within 48 hours. Premature discontinuation fosters beta-lactamase bacterial resistance. Consume immediately after meals to mitigate gastrointestinal distress.
              </p>
</div>
</div>
</div>
</section>
{/* SECTION 2: Side Effects Breakdown */}
<section className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg" id="side-effects">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-2">Reported Side Effects</h2>
<p className="text-caption font-caption text-outline mb-6">Most adverse reactions are mild and transient as the body adapts to antimicrobial activity.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
{/* Common Mild Symptoms */}
<div className="p-4 rounded-lg bg-surface-container-low border border-surface-variant">
<div className="flex items-center gap-2 mb-3">
<span className="w-2.5 h-2.5 rounded-full bg-[#047857]"></span>
<h3 className="font-body-strong text-body-strong text-on-surface">Common Reactions (Usually Self-Limiting)</h3>
</div>
<ul className="space-y-2 text-caption font-caption text-on-surface-variant">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="check_circle">check_circle</span>
                Mild diarrhea or looser bowel movements (manage with oral hydration)
              </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="check_circle">check_circle</span>
                Nausea and minor gastric discomfort after dosing
              </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="check_circle">check_circle</span>
                Vomiting or decreased appetite during initial 24 hours
              </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="check_circle">check_circle</span>
                Oral or vaginal thrush (candidiasis) following prolonged therapy
              </li>
</ul>
</div>
{/* Rare / Serious Symptoms */}
<div className="p-4 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9]">
<div className="flex items-center gap-2 mb-3">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<h3 className="font-body-strong text-body-strong text-[#8E0E17]">Rare Alert Reactions (Require Medical Review)</h3>
</div>
<ul className="space-y-2 text-caption font-caption text-on-surface-variant">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="warning">warning</span>
                Acute erythematous skin rash, urticaria, or facial edema
              </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="warning">warning</span>
                Persistent watery diarrhea with fever (Clostridium difficile alert)
              </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="warning">warning</span>
                Jaundice or yellowing of sclera (cholestatic jaundice indicator)
              </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="warning">warning</span>
                Wheezing, chest tightness, or respiratory distress
              </li>
</ul>
</div>
</div>
</section>
{/* SECTION 3: Safety Advice Matrix */}
<section className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg" id="safety-advice">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-2">Comprehensive Safety Advice</h2>
<p className="text-caption font-caption text-outline mb-6">Review clinical contraindications before commencing therapy.</p>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-surface-variant text-caption-strong font-caption-strong text-outline">
<th className="py-3 px-4 w-1/4">Factor / Condition</th>
<th className="py-3 px-4 w-1/4">Safety Status</th>
<th className="py-3 px-4 w-1/2">Clinical Evaluation &amp; Guidance</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption font-caption">
{/* Alcohol */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="local_bar">local_bar</span>
                  Alcohol
                </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container border border-surface-variant text-on-surface-variant font-caption-strong text-micro">
                    Caution Advised
                  </span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">
                  Alcohol does not directly neutralize amoxycillin, but amplifies drowsiness and can aggravate gastrointestinal side effects.
                </td>
</tr>
{/* Pregnancy */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-[#047857]" data-icon="pregnant_woman">pregnant_woman</span>
                  Pregnancy
                </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-micro">
                    Safe if Prescribed
                  </span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">
                  Generally considered safe (FDA Category B). Prescribed when maternal clinical benefits outweigh theoretical risks.
                </td>
</tr>
{/* Breastfeeding */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-[#047857]" data-icon="child_care">child_care</span>
                  Breastfeeding
                </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-micro">
                    Safe if Prescribed
                  </span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">
                  Small quantities pass into breast milk. Monitor the nursing infant for candidiasis or mild diarrhea symptoms.
                </td>
</tr>
{/* Driving */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="directions_car">directions_car</span>
                  Driving &amp; Machinery
                </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container border border-surface-variant text-on-surface-variant font-caption-strong text-micro">
                    Caution Advised
                  </span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">
                  May induce dizziness or visual disturbances in sensitive individuals. Refrain until personal tolerance is established.
                </td>
</tr>
{/* Kidney */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="vital_signs">vital_signs</span>
                  Kidney Clearance
                </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container border border-surface-variant text-on-surface-variant font-caption-strong text-micro">
                    Dose Adjustment
                  </span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">
                  Amoxycillin is cleared through renal pathways. Patients with Glomerular Filtration Rate (GFR) &lt; 30 ml/min require titrated dosing.
                </td>
</tr>
{/* Liver */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary" data-icon="emergency">emergency</span>
                  Liver Dysfunction
                </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-micro">
                    Unsafe / High Caution
                  </span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">
                  Clavulanic acid has documented associations with cholestatic jaundice. Regular hepatic enzyme monitoring is recommended for extended regimens.
                </td>
</tr>
</tbody>
</table>
</div>
</section>
{/* SECTION 4: Generic Substitutes Comparison */}
<section className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg" id="substitutes">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Verified Salt Substitutes (Equivalent Generics)</h2>
<p className="text-caption font-caption text-outline">Exact chemical formulation: Amoxycillin (500mg) + Clavulanic Acid (125mg)</p>
</div>
<span className="mt-2 md:mt-0 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-caption">
            Bioequivalent Alternatives
          </span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-surface-variant text-caption-strong font-caption-strong text-outline">
<th className="py-3 px-4">Brand / Manufacturer</th>
<th className="py-3 px-4">Pack Composition</th>
<th className="py-3 px-4">Price (INR)</th>
<th className="py-3 px-4">Estimated Savings</th>
<th className="py-3 px-4 text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption font-caption">
{/* Current Reference */}
<tr className="bg-surface-container-low">
<td className="py-3.5 px-4 font-body-strong text-on-surface">
                  Augmentin 625 Duo
                  <span className="block font-micro text-micro text-outline">GlaxoSmithKline Pharmaceuticals</span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">10 Tablets Strip</td>
<td className="py-3.5 px-4 font-body-strong text-on-surface">₹201.71</td>
<td className="py-3.5 px-4 text-outline font-micro">Current Item</td>
<td className="py-3.5 px-4 text-right">
<span className="px-3 py-1 rounded-lg bg-surface-container border border-surface-variant text-outline font-caption-strong text-caption">Selected</span>
</td>
</tr>
{/* Moxikind-CV 625 */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface">
                  Moxikind-CV 625
                  <span className="block font-micro text-micro text-outline">Mankind Pharma Ltd</span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">10 Tablets Strip</td>
<td className="py-3.5 px-4 font-body-strong text-on-surface">₹152.40</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-micro">
                    Save 24% (₹49.31)
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded-lg bg-surface-container-lowest border border-primary-container text-primary hover:bg-[#FFF1F2] font-caption-strong text-caption transition-colors">
                    Select
                  </button>
</td>
</tr>
{/* Clavam 625 */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface">
                  Clavam 625
                  <span className="block font-micro text-micro text-outline">Alkem Laboratories</span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">10 Tablets Strip</td>
<td className="py-3.5 px-4 font-body-strong text-on-surface">₹189.20</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-micro">
                    Save 6% (₹12.51)
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded-lg bg-surface-container-lowest border border-primary-container text-primary hover:bg-[#FFF1F2] font-caption-strong text-caption transition-colors">
                    Select
                  </button>
</td>
</tr>
{/* Sensiclav 625 */}
<tr>
<td className="py-3.5 px-4 font-body-strong text-on-surface">
                  Sensiclav 625
                  <span className="block font-micro text-micro text-outline">Macleods Pharmaceuticals</span>
</td>
<td className="py-3.5 px-4 text-on-surface-variant">10 Tablets Strip</td>
<td className="py-3.5 px-4 font-body-strong text-on-surface">₹164.50</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-micro">
                    Save 18% (₹37.21)
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded-lg bg-surface-container-lowest border border-primary-container text-primary hover:bg-[#FFF1F2] font-caption-strong text-caption transition-colors">
                    Select
                  </button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
{/* SECTION 5: Pharmacist Review & Certification */}
<section className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-6" id="pharmacist-review">
<div className="flex items-center gap-4">
<img className="w-16 h-16 rounded-xl object-cover border border-surface-variant shrink-0" data-alt="Portrait photo of an experienced Indian male clinical pharmacist in a professional white medical coat with stethoscope on a warm beige background, bright ambient pharmacy lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRhCjpKLVW-hNRLNPH4jHBdLRgn3bis0eKGGmkXwpWRpnqNrCyHElVHeRx90Xq3M1oWsbdgCL9lCBBLxV7K6j_krXdTAtggy6UE16Vj6oDCRrrh-pa7-fkuzk3sTpqwgRB7QyLQu7kB2V6cgCEcmMxOI94lOaFES0EptiPUpXxTDYGmeoUuT1NDoBXxOb2yGfAZLBTJ40Glu5jCVMsf7tmKF2ir06VWDGFFZL0hzoYBi0F7waUfhrW"/>
<div>
<div className="flex items-center gap-2">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-micro">
<span className="material-symbols-outlined text-[12px]" data-icon="check_circle">check_circle</span>
                Clinically Verified
              </span>
<span className="font-micro text-micro text-outline">Updated: 18 Oct 2025</span>
</div>
<h3 className="font-headline-h3 text-headline-h3 text-on-surface mt-1">Pharm. Rajesh Kulkarni, M.Pharm</h3>
<p className="font-caption text-caption text-outline">
              Reg. #KA-389102 · Karnataka State Pharmacy Council (KSPC)
            </p>
</div>
</div>
<div className="border-t md:border-t-0 md:border-l border-surface-variant pt-4 md:pt-0 md:pl-6 text-on-surface-variant text-caption font-caption max-w-md">
<p>
            &quot;Curxx verified this batch under temperature logs adhering to Indian Pharmacopoeia standards. Please take Augmentin strictly with food to safeguard gastrointestinal mucosa.&quot;
          </p>
</div>
</section>
{/* SECTION 6: Related Supportive Health Products */}
<section className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Frequently Taken With Antibiotics</h2>
<span className="text-caption font-caption text-outline">Supportive Gut &amp; Fever Care</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
{/* Product Card 1: Probiotics */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between">
<div>
<div className="h-32 flex items-center justify-center mb-3 bg-surface-container-low rounded-lg p-2">
<img className="max-h-full object-contain" data-alt="Pharmaceutical box and blister pack of medical probiotic capsules containing Lactobacillus and Bifidobacterium on clean warm studio background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-gfQ0Xn4_omtr2tt2A2rMt3F55qZkdsBMUEfGvrE7bw3bCWdDv30oHfO4JU2O5QQKz8kH3xUAuhJxPHX2QoEbO23MMEdI6lX6yXU0Cilxzn0I_LeAymEwR042DO3EJdc1gTKq5KgSoY4GD2EzI7hot5SKJyRqF32JD9al4FtaQaGqDMoBT6HkDh9TLZLP_5Q_Eje9MR0qlUvcyNDU45-hk5brwogw5t6jDQDKI7p1NuRoPwh_Oj2n"/>
</div>
<span className="font-micro text-micro text-outline">GUT HEALTH</span>
<h3 className="font-body-strong text-body-strong text-on-surface mt-0.5">Econorm 250mg Capsule</h3>
<p className="font-micro text-micro text-outline">Restores microbiome after antibiotics</p>
</div>
<div className="pt-3 border-t border-surface-variant mt-3 flex items-center justify-between">
<div>
<span className="font-body-strong text-body-strong text-on-surface">₹328.00</span>
<span className="font-micro text-micro text-[#047857] block">10% OFF</span>
</div>
<button type="button" onClick={addFromCard} className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-primary-container text-primary font-caption-strong text-caption hover:bg-[#FFF1F2] transition-colors">
                + Add
              </button>
</div>
</div>
{/* Product Card 2: Vitamin C & Zinc */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between">
<div>
<div className="h-32 flex items-center justify-center mb-3 bg-surface-container-low rounded-lg p-2">
<img className="max-h-full object-contain" data-alt="Strip of chewable Vitamin C and Zinc supplements in orange packaging on clinical reflective white tabletop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoJjtXwHHUSz98HxcUg_KVI5Fh_1BWqiV1uK-toBbPP4VZKU0LnwVBHz3ElZqmd3r7GaJTIuYpWob-ax43WocsF9TMm1M0AOFCI0qSRo6ZGrgzgPNsxHBJ_oRgNb_1DalSzG2FuPVZQ1VeNd860RSQPRVkbUK0XCOgHqfS_mjMzQF-3GU6cvcy8t9psavzZWbvWuSSkyuC3EFs89qSocwQEmIRemo7nSgRbnxBjytnycUevp3W1bUI"/>
</div>
<span className="font-micro text-micro text-outline">IMMUNITY BOOSTER</span>
<h3 className="font-body-strong text-body-strong text-on-surface mt-0.5">Limcee 500mg Chewable</h3>
<p className="font-micro text-micro text-outline">Strip of 15 Orange Tablets</p>
</div>
<div className="pt-3 border-t border-surface-variant mt-3 flex items-center justify-between">
<div>
<span className="font-body-strong text-body-strong text-on-surface">₹24.50</span>
<span className="font-micro text-micro text-[#047857] block">12% OFF</span>
</div>
<button type="button" onClick={addFromCard} className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-primary-container text-primary font-caption-strong text-caption hover:bg-[#FFF1F2] transition-colors">
                + Add
              </button>
</div>
</div>
{/* Product Card 3: ORS Electrolytes */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between">
<div>
<div className="h-32 flex items-center justify-center mb-3 bg-surface-container-low rounded-lg p-2">
<img className="max-h-full object-contain" data-alt="Official WHO formula oral rehydration salt packet sachet in pharmaceutical blue and white design on light background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSNSSqrEa8OWcGGIWOn-_nWABGhs6Km2ny6GE_-jExHvqf3XED70hzru1pkTQBhPSpMEA-jN6omGfC4WLXxgR-I6w5uS7AXdx4ZzoT86RRTHosddjOhL4sTgptvN0qZzfDfHxIB1lyALY0dzgamLPvI665MWgn-2-vJfehuk3_mj_cRM4Iis9hcT69X97W6uj9q1jhHzpGJtn_9xmAK029CaEcdKKFI4_oqHxNgxh45rH6vCT3-DEE"/>
</div>
<span className="font-micro text-micro text-outline">HYDRATION CARE</span>
<h3 className="font-body-strong text-body-strong text-on-surface mt-0.5">Electral Powder 21.8g</h3>
<p className="font-micro text-micro text-outline">WHO Recommended Formula Sachet</p>
</div>
<div className="pt-3 border-t border-surface-variant mt-3 flex items-center justify-between">
<div>
<span className="font-body-strong text-body-strong text-on-surface">₹22.10</span>
<span className="font-micro text-micro text-[#047857] block">MRP ₹24.00</span>
</div>
<button type="button" onClick={addFromCard} className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-primary-container text-primary font-caption-strong text-caption hover:bg-[#FFF1F2] transition-colors">
                + Add
              </button>
</div>
</div>
{/* Product Card 4: Paracetamol 650mg */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between">
<div>
<div className="h-32 flex items-center justify-center mb-3 bg-surface-container-low rounded-lg p-2">
<img className="max-h-full object-contain" data-alt="Pharmaceutical blister strip of Dolo 650 paracetamol tablets showing green and white medical label on clinical surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX0kfIBrGpliIZPnrHbqpRu6EvIR6dl06nIvwimR0yEcJOGPcZIKyrBZJkALAts4ez-F23ZERlZvPa6jW5q62OZb0uBemuh5Zsg237Xyy-fFxjKGvxlTZcnI_WkSB1JpAOWYVZktdxUqCR7rca-b8rHXXtnoA9pWZxunlbe9IZ2YQUwJEEuOJEXwQmpWpIyz-Q76GCqhVqtTuT2GjvwkPfUhV3XxH-1HN1R-eIC7Q8Ao_x9U5fgwle"/>
</div>
<span className="font-micro text-micro text-outline">ANTIPYRETIC / PAIN</span>
<h3 className="font-body-strong text-body-strong text-on-surface mt-0.5">Dolo 650 Tablet</h3>
<p className="font-micro text-micro text-outline">Strip of 15 Tablets for Fever</p>
</div>
<div className="pt-3 border-t border-surface-variant mt-3 flex items-center justify-between">
<div>
<span className="font-body-strong text-body-strong text-on-surface">₹31.20</span>
<span className="font-micro text-micro text-[#047857] block">Standard Dispense</span>
</div>
<button type="button" onClick={addFromCard} className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-primary-container text-primary font-caption-strong text-caption hover:bg-[#FFF1F2] transition-colors">
                + Add
              </button>
</div>
</div>
</div>
</section>
</div>
</main>
<Toast message={toast} />
<Footer />

    </>
  );
}
