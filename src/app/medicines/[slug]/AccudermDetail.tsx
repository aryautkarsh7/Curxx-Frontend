
'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import Toast, { useToast } from '@/components/Toast';
import { addToCart, cartItemFromCard } from '@/lib/cart';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const PRODUCT = { slug: 'accuderm-20mg', name: 'AccuDerm 20mg Soft Gelatin Capsule', price: 342 };

export default function CurxxMedicineProductDetailAccuderm20mgPage() {
  const [toast, showToast] = useToast();

  function addFromCard(e: MouseEvent<HTMLButtonElement>) {
    const item = cartItemFromCard(e.currentTarget);
    if (!item) return;
    addToCart(item);
    showToast(`${item.name} added to cart`);
  }
  const [qty, setQty] = useState(1);

  function addProduct() {
    addToCart(PRODUCT, qty);
    showToast(`${qty} × ${PRODUCT.name} added to cart`);
  }

  return (
    <>
      
<Header />
{/* 2. BREADCRUMB */}
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop pt-4 pb-2">
<nav aria-label="Breadcrumb" className="flex items-center text-caption text-on-surface-variant gap-2">
<Link href="/" className="hover:text-primary transition-colors">Home</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<Link href="/medicines" className="hover:text-primary transition-colors">Medicines</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<Link href="/medicines?category=skin-care" className="hover:text-primary transition-colors">Skin Care</Link>
<span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
<span className="text-[#C1121F] font-caption-strong">AccuDerm Gel (Isotretinoin 20mg)</span>
</nav>
</div>
<main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop pb-16 flex-1">
{/* 3. PRODUCT HERO */}
<section className="mt-4 bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
{/* LEFT COLUMN: Packaging and Image Matrix (55% -> 7 Cols) */}
<div className="lg:col-span-7 flex flex-col gap-4">
{/* Main Product Display Card */}
<div className="relative w-full aspect-[4/3] bg-surface-container-low border border-surface-variant rounded-2xl overflow-hidden flex items-center justify-center p-6 group">
{/* Prescription Required Rx Badge (Top-left overlay) */}
<div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#FFF1F2] border border-[#F9C6C9] px-3 py-1.5 rounded-md text-[#C1121F] text-caption font-caption-strong shadow-sm">
<span className="material-symbols-outlined text-[18px]" data-icon="description">description</span>
<span>Prescription Required (Rx)</span>
</div>
{/* Authentic Quality Watermark Icon */}
<div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-sm border border-surface-variant px-2.5 py-1 rounded-full text-[#047857] text-micro font-semibold">
<span className="material-symbols-outlined text-[15px]" data-icon="verified" data-weight="fill">verified</span>
<span>100% Genuine</span>
</div>
<img loading="lazy" decoding="async" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" data-alt="Clean clinical studio photography of AccuDerm 20mg blister pack and soft gelatin capsules on a neutral warm beige medical lab surface. Bright high-key lighting illuminates the crisp pharmaceutical box details, WHO-GMP certification holographic seal, and pristine red and white typography. The image evokes rigorous sterility, calm medical precision, and unwavering reliability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASq4I01DZXrh13SILgoWcSSVCXtUAV8_2gxN7IYn0eAYFWrHFQ4PrApDdvADTbg9xqU5h64VQmZ2JQjMcLFgckKaREwYEkaMoK-zPRGrwQ3bZhj_J_AZUWGZmbvDpob-uau0UuotcNSNk_1maEufHKEdDaTNF6uHoutANFHrapotHwRxlZGpHMc4NnwZe2mdPgki2RS7a19DRCH7o8H0JRAsxZ5v5XR8z-No6TS79fK-_gV0gmbrXs=w800"/>
</div>
{/* Thumbnails Row (4 items) */}
<div className="grid grid-cols-4 gap-3">
<Link href="/medicines/accuderm-20mg" className="aspect-square rounded-xl border-2 border-[#C1121F] bg-surface-container-lowest p-2 overflow-hidden flex items-center justify-center shadow-sm">
<img loading="lazy" decoding="async" className="w-full h-full object-contain" data-alt="Crisp front perspective of AccuDerm 20mg medicine carton showing clear typography and branding in high medical lighting on warm cream ground." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCm0lrOtHz_mImVQdEpJlwNfO7VIHSg6yP7ETYsUeAlx12yAcCMvq5Bx5y_m5wrqQ7kGYBJ0_NOmMZoL2MSEY3v0nKlHKXp-mlWHk9EOyhInQahq5rQ8nOSfdDoWC_qJAgB9M7g-oxOI2bv232pkhnpy6NfdAJxFRIgEFcCWpsNHWfR4i6DxzEL5eR8JP-CnWpknVz71Q5wtDSPe6HEi956zwl-NSeanEa8R7iVeodQHAH_5XyAwGn=w800"/>
</Link>
<button className="aspect-square rounded-xl border border-surface-variant bg-surface-container-lowest p-2 overflow-hidden flex items-center justify-center hover:border-outline transition">
<img loading="lazy" decoding="async" className="w-full h-full object-contain" data-alt="Macro close-up view of pharmaceutical blister strip back foil with batch numbers, expiry, and Cipla manufacturing details sharply visible." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQWM4THwV9WLog5sWhp8dy5Dj5bfZAcV1dAF0D14tzYiVMUqJw87hwxKyDD0ayUYJ-b8OJF00V4WKk9rJQ5vARIxvFZziBsN1kyGzfqisDO_rxzMPhaIy0717y-n5NtfFX0_wgBLeB7KWRxHKUBxpeNewaVpMbsTJCDUYsmagpqQNzA1eyuNwqrNFc_NcS_QBkA30s7BsASXXjaXIo9jCp4AmSfouHSfJX4zVDWicHSUZ2GfBGdxfA=w800"/>
</button>
<button className="aspect-square rounded-xl border border-surface-variant bg-surface-container-lowest p-2 overflow-hidden flex items-center justify-center hover:border-outline transition">
<img loading="lazy" decoding="async" className="w-full h-full object-contain" data-alt="Detailed view of salt composition table printed on pharmaceutical carton, clinical white lighting and high legible contrast." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGQf2pqhhJhaQyj4DfQx3wq8BvQOmlEeYRs8B1W5Z8b_Aj4FLgfv7DHSzfEr2DeeJDuNi_cNYLJAiomyoYJYVLZcmVd_RY2vWEs2L7zxVbAjcl1c_R-JyPzBATpp3aXMi4avZHREqthdHfaFySV9_PPO8q0iPuVOmfoVRF7j9Hsnw3aYndrPibU9WqJ2Ex_V1Ok4Bs05_INuQvy-xZvPcRCUGilthu_uunxC_ul0LPAwtj8XUoPYGJ=w800"/>
</button>
<button className="aspect-square rounded-xl border border-surface-variant bg-surface-container-lowest p-2 overflow-hidden flex items-center justify-center hover:border-outline transition">
<img loading="lazy" decoding="async" className="w-full h-full object-contain" data-alt="Microscopic inspection view of WHO-GMP certified holographic security seal glistening subtly on medicine packaging corner." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJa6CrCyWQEh_mmcHK7cc4ejzkuyI5EUrYKkFXU9Gtf1AdjQKM10hrvr3GY43BeCpiI7nG8PSCcUDr_nLEDKOHyqPaSW0nMa8_uw48GH1XRIf3vDkbesDdr8ltwUlem92HDLtC_20MmBUQss3V2qQg5oqN38sOmLWbKj3ZqVcEwWmuG1fmtBW85GYpAjmOG5rCrosLhmeQejta1kjiYiB84CBYD7aItaK-QNJKUaJOF2BXHOFN_yk7=w800"/>
</button>
</div>
</div>
{/* RIGHT COLUMN: Commercial Specs, Pricing & Actions (45% -> 5 Cols) */}
<div className="lg:col-span-5 flex flex-col">
{/* Category Chip */}
<div className="flex items-center gap-2 mb-2">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-micro font-semibold bg-surface-container-high text-on-surface-variant border border-surface-variant">
              Dermatologicals · Anti-Acne
            </span>
</div>
{/* Product Name & Salts */}
<h1 className="text-display font-display text-on-surface leading-snug">AccuDerm 20mg Soft Gelatin Capsule</h1>
<p className="text-body-default font-body-default text-[#78716C] mt-1">Isotretinoin IP 20mg · USP Grade</p>
<div className="flex items-center gap-1.5 mt-2 text-caption">
<span className="text-on-surface-variant">Manufactured by:</span>
<Link className="text-primary hover:underline font-caption-strong" href="/medicines?q=Cipla">Cipla Healthcare Ltd. (WHO-GMP Certified)</Link>
</div>
<div className="my-4 h-px bg-surface-variant"></div>
{/* Pack Size Selector */}
<div className="flex flex-col gap-2">
<span className="text-caption font-caption-strong text-on-surface">Select Pack Size:</span>
<div className="grid grid-cols-3 gap-2">
<button className="flex flex-col items-center py-2 px-1 rounded-lg bg-[#FFF1F2] border-2 border-[#C1121F] text-on-surface transition">
<span className="text-caption font-caption-strong text-[#C1121F]">10 Capsules</span>
<span className="text-[11px] text-[#78716C]">₹34.2 / cap</span>
</button>
<button className="flex flex-col items-center py-2 px-1 rounded-lg bg-surface-container-lowest border border-surface-variant hover:border-outline transition text-on-surface">
<span className="text-caption font-caption-strong">30 Capsules</span>
<span className="text-[11px] text-[#047857] font-semibold">Save 8%</span>
</button>
<button className="flex flex-col items-center py-2 px-1 rounded-lg bg-surface-container-lowest border border-surface-variant hover:border-outline transition text-on-surface">
<span className="text-caption font-caption-strong">60 Capsules</span>
<span className="text-[11px] text-[#047857] font-semibold">Save 15%</span>
</button>
</div>
</div>
{/* Price Block */}
<div className="mt-5 p-3.5 bg-surface-container-low rounded-xl border border-surface-variant">
<div className="flex items-baseline gap-3">
<span className="text-display font-display text-on-surface tracking-tight">₹342.00</span>
<span className="text-body-default text-[#78716C] line-through">₹450.00</span>
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                24% OFF
              </span>
</div>
<p className="text-micro text-[#78716C] mt-1">Inclusive of all taxes · Unit price: ₹34.2/capsule</p>
</div>
{/* Prescription Required Notice Card */}
<div className="mt-4 p-3 rounded-lg bg-[#FFF1F2] border border-[#F9C6C9] flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[#C1121F] text-[20px] mt-0.5" data-icon="info">info</span>
<div>
<p className="text-caption font-caption-strong text-on-surface">Valid doctor prescription required to dispense</p>
<p className="text-micro text-on-surface-variant">Upload now or share via WhatsApp after placing the order.</p>
</div>
</div>
<Link href="/medicines/upload" className="text-[#C1121F] hover:underline text-caption font-caption-strong whitespace-nowrap pt-0.5">
              Upload Rx
            </Link>
</div>
{/* Delivery Estimate Row */}
<div className="mt-4 flex flex-col gap-2">
<div className="flex items-center justify-between text-caption font-caption-strong text-on-surface">
<span>Delivery Availability:</span>
</div>
<div className="flex gap-2">
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline" data-icon="location_on">location_on</span>
<input className="w-full h-10 pl-9 pr-3 rounded-lg border border-surface-variant bg-surface-container-lowest text-caption text-on-surface focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F]/20" placeholder="Enter Pincode" type="text" value="560001"/>
</div>
<button className="h-10 px-4 rounded-lg border border-surface-variant bg-surface-container-lowest hover:bg-surface-container text-caption font-caption-strong text-on-surface transition">
                Check
              </button>
</div>
<div className="flex items-center gap-2 text-caption text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-2 rounded-lg mt-1">
<span className="material-symbols-outlined text-[18px]" data-icon="local_shipping">local_shipping</span>
<span className="font-semibold">Delivery by Tomorrow, 9 PM · Cold-Chain Assured</span>
</div>
</div>
{/* Order Action Row */}
<div className="mt-6 flex items-center gap-3">
{/* Stepper */}
<div className="flex items-center border border-surface-variant rounded-lg bg-surface-container-lowest h-12">
<button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-9 h-full flex items-center justify-center text-outline hover:text-on-surface text-lg font-bold">-</button>
<span className="w-8 text-center text-body-strong font-body-strong">{qty}</span>
<button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="w-9 h-full flex items-center justify-center text-outline hover:text-on-surface text-lg font-bold">+</button>
</div>
{/* Primary Add To Cart Button (Strict #C1121F) */}
<button type="button" onClick={addProduct} className="flex-1 h-12 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white text-body-strong font-body-strong flex items-center justify-center gap-2 transition duration-150 active:scale-[0.98] shadow-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="shopping_bag">shopping_bag</span>
<span>Add to Cart</span>
</button>
{/* Secondary Buy Now Button */}
<Link href="/book?type=medicine&product=accuderm-20mg" className="flex-1 h-12 rounded-lg bg-surface-container-lowest border border-surface-variant hover:bg-surface-container text-on-surface text-body-strong font-body-strong flex items-center justify-center transition duration-150 active:scale-[0.98]">
              Buy Now
            </Link>
</div>
{/* Assurance Strip */}
<div className="mt-6 pt-4 border-t border-surface-variant grid grid-cols-3 gap-2 text-center text-micro text-[#78716C]">
<div className="flex flex-col items-center gap-1">
<span className="material-symbols-outlined text-[20px] text-outline" data-icon="verified_user">verified_user</span>
<span>100% Genuine</span>
</div>
<div className="flex flex-col items-center gap-1">
<span className="material-symbols-outlined text-[20px] text-outline" data-icon="cached">cached</span>
<span>7-Day Return</span>
</div>
<div className="flex flex-col items-center gap-1">
<span className="material-symbols-outlined text-[20px] text-outline" data-icon="ac_unit">ac_unit</span>
<span>Cold-Chain Dispensed</span>
</div>
</div>
</div>
</div>
</section>
{/* 4. STICKY SUB-NAV ANCHOR BAR */}
<div className="sticky top-16 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-variant mt-8">
<nav className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3 text-caption font-caption-strong text-on-surface-variant">
<a className="text-[#C1121F] border-b-2 border-[#C1121F] pb-2 whitespace-nowrap" href="#description">Description</a>
<a className="hover:text-primary pb-2 whitespace-nowrap transition-colors" href="#benefits">Uses &amp; Benefits</a>
<a className="hover:text-primary pb-2 whitespace-nowrap transition-colors" href="#side-effects">Side Effects</a>
<a className="hover:text-primary pb-2 whitespace-nowrap transition-colors" href="#dosage">Dosage &amp; Usage</a>
<a className="hover:text-primary pb-2 whitespace-nowrap transition-colors" href="#safety-advice">Safety Advice</a>
<a className="hover:text-primary pb-2 whitespace-nowrap transition-colors" href="#substitutes">Substitutes</a>
<a className="hover:text-primary pb-2 whitespace-nowrap transition-colors" href="#faqs">FAQs</a>
</nav>
</div>
{/* 5. CONTENT SECTIONS (70% Content / 30% Sticky Consult CTA) */}
<div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
{/* MAIN CLINICAL INFO (70% -> 8 Cols) */}
<div className="lg:col-span-8 space-y-10">
{/* Description & Overview */}
<section className="scroll-mt-32" id="description">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-3 flex items-center gap-2">
<span className="w-1.5 h-5 bg-[#C1121F] rounded-full"></span>
            Description &amp; Clinical Overview
          </h2>
<div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-variant text-body-default text-on-surface leading-relaxed space-y-3">
<p>
<strong>AccuDerm 20mg Soft Gelatin Capsule</strong> contains <em>Isotretinoin IP 20mg</em>, a synthetic retinoid chemically related to Vitamin A. It is clinically indicated for severe recalcitrant nodulocystic acne that has proven unresponsive to conventional dermatological therapies, including systemic oral antibiotics and topical combinations.
            </p>
<p className="text-[#78716C]">
<strong>Mechanism of Action:</strong> Isotretinoin dramatically suppresses sebaceous gland activity, physically reducing sebaceous gland size by up to 90%. By suppressing excessive sebum secretion, it normalizes follicular keratinization, prevents the formation of comedones, and deprives <em>Cutibacterium acnes</em> of its primary lipid substrate.
            </p>
</div>
</section>
{/* Uses & Benefits */}
<section className="scroll-mt-32" id="benefits">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-3 flex items-center gap-2">
<span className="w-1.5 h-5 bg-[#C1121F] rounded-full"></span>
            Uses &amp; Verified Indications
          </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-variant flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[24px] mt-0.5" data-icon="check_circle" data-weight="fill">check_circle</span>
<div>
<h3 className="text-caption-strong font-caption-strong text-on-surface">Severe Cystic Acne</h3>
<p className="text-caption text-[#78716C] mt-1">Reduces deep, inflamed cysts under the dermis and prevents permanent post-inflammatory hyperpigmentation and tissue scarring.</p>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-variant flex items-start gap-3">
<span className="material-symbols-outlined text-[#047857] text-[24px] mt-0.5" data-icon="check_circle" data-weight="fill">check_circle</span>
<div>
<h3 className="text-caption-strong font-caption-strong text-on-surface">Treatment-Resistant Nodular Acne</h3>
<p className="text-caption text-[#78716C] mt-1">Induces long-term clinical remission in stubborn nodular lesions when tetracyclines and topical retinoids fail.</p>
</div>
</div>
</div>
</section>
{/* Side Effects */}
<section className="scroll-mt-32" id="side-effects">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-3 flex items-center gap-2">
<span className="w-1.5 h-5 bg-[#C1121F] rounded-full"></span>
            Side Effects &amp; Clinical Tolerability
          </h2>
<div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-variant space-y-4">
<p className="text-caption text-[#78716C]">Most adverse reactions correlate directly with retinoid pharmacological action and subside following dosage tapering or completion of course.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
<div className="p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<span className="inline-block px-2 py-0.5 rounded text-micro font-semibold bg-[#FFF1F2] text-[#C1121F] border border-[#F9C6C9] mb-2">
                  Common (&gt;10% patients)
                </span>
<ul className="text-caption space-y-1.5 text-on-surface">
<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Cheilitis (dry, severely cracked lips)</li>
<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Generalized cutaneous xerosis (dry skin)</li>
<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Epistaxis (dry nasal mucosa / nosebleeds)</li>
</ul>
</div>
<div className="p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<span className="inline-block px-2 py-0.5 rounded text-micro font-semibold bg-surface-container-high text-on-surface-variant border border-surface-variant mb-2">
                  Uncommon / Rare (&lt;2% patients)
                </span>
<ul className="text-caption space-y-1.5 text-on-surface">
<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Mild transient headache or visual fatigue</li>
<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Elevated transaminases &amp; triglycerides</li>
<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Musculoskeletal arthralgia following exercise</li>
</ul>
</div>
</div>
{/* Quick Tips Card */}
<div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#F9C6C9] flex items-start gap-3 mt-4">
<span className="material-symbols-outlined text-[#C1121F] text-[22px] mt-0.5" data-icon="tips_and_updates">tips_and_updates</span>
<div>
<h4 className="text-caption-strong font-caption-strong text-[#C1121F]">Clinical Administration Tip:</h4>
<p className="text-caption text-on-surface mt-0.5 leading-relaxed">
                  Take with or immediately after a meal rich in dietary fats for optimal gastrointestinal absorption. Strictly avoid elective UV sun exposure and apply a broad-spectrum SPF 50+ mineral sunscreen every 3 hours while outdoors.
                </p>
</div>
</div>
</div>
</section>
{/* Safety Advice Table */}
<section className="scroll-mt-32" id="safety-advice">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-3 flex items-center gap-2">
<span className="w-1.5 h-5 bg-[#C1121F] rounded-full"></span>
            Safety Guidance &amp; Contraindications
          </h2>
<div className="overflow-hidden rounded-xl border border-surface-variant bg-surface-container-lowest">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-surface-variant text-micro font-semibold text-on-surface-variant uppercase tracking-wider">
<th className="py-3 px-4">Parameter</th>
<th className="py-3 px-4">Safety Status</th>
<th className="py-3 px-4">Clinical Recommendation</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption">
{/* Alcohol */}
<tr>
<td className="py-3.5 px-4 font-caption-strong flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="liquor">liquor</span>
                    Alcohol
                  </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      Caution
                    </span>
</td>
<td className="py-3.5 px-4 text-[#78716C]">Concurrent intake may compound hepatic strain and trigger hypertriglyceridemia. Limit alcohol consumption.</td>
</tr>
{/* Pregnancy: Strict Contraindication */}
<tr className="bg-[#FFF1F2]/60">
<td className="py-3.5 px-4 font-caption-strong flex items-center gap-2 text-[#8E0E17]">
<span className="material-symbols-outlined text-[18px] text-[#8E0E17]" data-icon="pregnant_woman">pregnant_woman</span>
                    Pregnancy
                  </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-micro font-semibold bg-[#FFF1F2] text-[#8E0E17] border border-[#F9C6C9]">
<span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
                      Unsafe
                    </span>
</td>
<td className="py-3.5 px-4 text-[#8E0E17] font-medium">Strict contraindication. Highly teratogenic; causes severe life-threatening fetal craniofacial and cardiovascular defects. Two forms of contraception mandated.</td>
</tr>
{/* Breastfeeding */}
<tr className="bg-[#FFF1F2]/30">
<td className="py-3.5 px-4 font-caption-strong flex items-center gap-2 text-[#8E0E17]">
<span className="material-symbols-outlined text-[18px] text-[#8E0E17]" data-icon="child_care">child_care</span>
                    Breastfeeding
                  </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-[#FFF1F2] text-[#8E0E17] border border-[#F9C6C9]">
                      Unsafe
                    </span>
</td>
<td className="py-3.5 px-4 text-[#78716C]">Highly lipophilic molecule actively secreted into breast milk. Nursing must be paused throughout treatment.</td>
</tr>
{/* Driving */}
<tr>
<td className="py-3.5 px-4 font-caption-strong flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="directions_car">directions_car</span>
                    Driving
                  </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                      Safe
                    </span>
</td>
<td className="py-3.5 px-4 text-[#78716C]">Does not degrade psychomotor alertness. Be mindful if experiencing night-vision glare or xerophthalmia.</td>
</tr>
{/* Kidney */}
<tr>
<td className="py-3.5 px-4 font-caption-strong flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="vital_signs">vital_signs</span>
                    Kidney
                  </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                      Safe if prescribed
                    </span>
</td>
<td className="py-3.5 px-4 text-[#78716C]">No routine dose modifications in mild-to-moderate impairment. Follow nephrologist guidance.</td>
</tr>
{/* Liver */}
<tr>
<td className="py-3.5 px-4 font-caption-strong flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="medical_information">medical_information</span>
                    Liver
                  </td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      Caution
                    </span>
</td>
<td className="py-3.5 px-4 text-[#78716C]">Contraindicated in active hepatic insufficiency. Baseline and 6-week serum LFT tracking mandatory.</td>
</tr>
</tbody>
</table>
</div>
</section>
{/* Substitutes Comparison Table */}
<section className="scroll-mt-32" id="substitutes">
<div className="flex items-center justify-between mb-3">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface flex items-center gap-2">
<span className="w-1.5 h-5 bg-[#C1121F] rounded-full"></span>
              Substitute Medicines (Exact Equivalents)
            </h2>
<span className="text-caption text-[#047857] font-semibold">Same Salt: Isotretinoin 20mg</span>
</div>
<div className="overflow-hidden rounded-xl border border-surface-variant bg-surface-container-lowest">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-surface-variant text-micro font-semibold text-on-surface-variant uppercase tracking-wider">
<th className="py-3 px-4">Brand &amp; Manufacturer</th>
<th className="py-3 px-4">Pack Size</th>
<th className="py-3 px-4">Price (MRP)</th>
<th className="py-3 px-4">Savings vs AccuDerm</th>
<th className="py-3 px-4 text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant text-caption">
{/* Substitute 1 */}
<tr className="hover:bg-surface-container-low/50 transition">
<td className="py-3 px-4">
<div className="font-caption-strong text-on-surface">Isobest 20mg</div>
<div className="text-micro text-[#78716C]">Sun Pharma Laboratories</div>
</td>
<td className="py-3 px-4 text-[#78716C]">10 Capsules</td>
<td className="py-3 px-4 font-semibold text-on-surface">₹274.00</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                      Save ₹68 (20%)
                    </span>
</td>
<td className="py-3 px-4 text-right">
<button className="px-3 py-1 rounded border border-[#C1121F] text-[#C1121F] hover:bg-[#FFF1F2] text-caption-strong font-caption-strong transition">
                      Switch
                    </button>
</td>
</tr>
{/* Substitute 2 */}
<tr className="hover:bg-surface-container-low/50 transition">
<td className="py-3 px-4">
<div className="font-caption-strong text-on-surface">Tretiva 20mg</div>
<div className="text-micro text-[#78716C]">Intas Pharmaceuticals Ltd.</div>
</td>
<td className="py-3 px-4 text-[#78716C]">10 Capsules</td>
<td className="py-3 px-4 font-semibold text-on-surface">₹310.00</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                      Save ₹32 (9%)
                    </span>
</td>
<td className="py-3 px-4 text-right">
<button className="px-3 py-1 rounded border border-[#C1121F] text-[#C1121F] hover:bg-[#FFF1F2] text-caption-strong font-caption-strong transition">
                      Switch
                    </button>
</td>
</tr>
{/* Substitute 3 */}
<tr className="hover:bg-surface-container-low/50 transition">
<td className="py-3 px-4">
<div className="font-caption-strong text-on-surface">Sotret 20mg</div>
<div className="text-micro text-[#78716C]">Ranbaxy Laboratories</div>
</td>
<td className="py-3 px-4 text-[#78716C]">10 Capsules</td>
<td className="py-3 px-4 font-semibold text-on-surface">₹330.00</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-micro font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                      Save ₹12 (3%)
                    </span>
</td>
<td className="py-3 px-4 text-right">
<button type="button" onClick={addFromCard} className="px-3 py-1 rounded border border-surface-variant text-on-surface hover:bg-surface-container-low text-caption-strong font-caption-strong transition">
                      Add
                    </button>
</td>
</tr>
{/* Substitute 4 */}
<tr className="hover:bg-surface-container-low/50 transition">
<td className="py-3 px-4">
<div className="font-caption-strong text-on-surface">Accutane 20mg</div>
<div className="text-micro text-[#78716C]">Roche Products Ltd. (Originator)</div>
</td>
<td className="py-3 px-4 text-[#78716C]">30 Capsules</td>
<td className="py-3 px-4 font-semibold text-on-surface">₹1,240.00</td>
<td className="py-3 px-4 text-micro text-[#78716C]">
                    Benchmark Originator
                  </td>
<td className="py-3 px-4 text-right">
<button type="button" onClick={addFromCard} className="px-3 py-1 rounded border border-surface-variant text-on-surface hover:bg-surface-container-low text-caption-strong font-caption-strong transition">
                      Add
                    </button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
{/* Pharmacist Verification Card */}
<div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-variant flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#047857]">
<span className="material-symbols-outlined text-[20px]" data-icon="clinical_notes">clinical_notes</span>
</div>
<div>
<p className="text-caption font-caption-strong text-on-surface">Medically Reviewed &amp; Verified</p>
<p className="text-micro text-[#78716C]">Pharm. Rajesh Kulkarni, B.Pharm · Reg No. 58492/KA · Verified on 24 Oct 2025</p>
</div>
</div>
<span className="inline-flex items-center gap-1 text-micro font-semibold text-[#047857] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
<span className="material-symbols-outlined text-[14px]" data-icon="check_circle" data-weight="fill">check_circle</span>
            NHA Certified Content
          </span>
</div>
{/* FAQs Accordion */}
<section className="scroll-mt-32" id="faqs">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mb-3 flex items-center gap-2">
<span className="w-1.5 h-5 bg-[#C1121F] rounded-full"></span>
            Frequently Asked Questions
          </h2>
<div className="space-y-3">
<details className="group bg-surface-container-lowest border border-surface-variant rounded-xl p-4 [&amp;_summary::-webkit-details-marker]:hidden" open>
<summary className="flex items-center justify-between cursor-pointer font-caption-strong text-caption text-on-surface">
<span>How long does AccuDerm take to show visible improvements?</span>
<span className="material-symbols-outlined text-outline transition-transform duration-200 group-open:rotate-180" data-icon="expand_more">expand_more</span>
</summary>
<p className="text-caption text-[#78716C] mt-2 leading-relaxed">
                Initial purging or mild flares can occur in weeks 2–4 as follicular turnover accelerates. Consistent visible clearance typically begins between weeks 6 to 8, with a standard therapeutic course lasting 16 to 24 weeks as prescribed by your dermatologist.
              </p>
</details>
<details className="group bg-surface-container-lowest border border-surface-variant rounded-xl p-4 [&amp;_summary::-webkit-details-marker]:hidden">
<summary className="flex items-center justify-between cursor-pointer font-caption-strong text-caption text-on-surface">
<span>Can I undergo laser hair removal or waxing during this medication?</span>
<span className="material-symbols-outlined text-outline transition-transform duration-200 group-open:rotate-180" data-icon="expand_more">expand_more</span>
</summary>
<p className="text-caption text-[#78716C] mt-2 leading-relaxed">
                No. Waxing, chemical peels, and laser resurfacing are strictly contraindicated throughout therapy and for 6 months after discontinuation due to substantial risks of epidermal scarring and delayed wound healing.
              </p>
</details>
<details className="group bg-surface-container-lowest border border-surface-variant rounded-xl p-4 [&amp;_summary::-webkit-details-marker]:hidden">
<summary className="flex items-center justify-between cursor-pointer font-caption-strong text-caption text-on-surface">
<span>What baseline laboratory tests are mandatory before dispensing?</span>
<span className="material-symbols-outlined text-outline transition-transform duration-200 group-open:rotate-180" data-icon="expand_more">expand_more</span>
</summary>
<p className="text-caption text-[#78716C] mt-2 leading-relaxed">
                Your dermatologist will request a baseline Liver Function Test (SGOT/SGPT), fasting serum lipid profile (cholesterol and triglycerides), and a verified negative serum hCG pregnancy test for female patients of childbearing potential.
              </p>
</details>
<details className="group bg-surface-container-lowest border border-surface-variant rounded-xl p-4 [&amp;_summary::-webkit-details-marker]:hidden">
<summary className="flex items-center justify-between cursor-pointer font-caption-strong text-caption text-on-surface">
<span>Can I donate blood while taking Isotretinoin capsules?</span>
<span className="material-symbols-outlined text-outline transition-transform duration-200 group-open:rotate-180" data-icon="expand_more">expand_more</span>
</summary>
<p className="text-caption text-[#78716C] mt-2 leading-relaxed">
                Blood donation is prohibited during therapy and for 30 days after stopping, to prevent transfusing blood containing active Isotretinoin to a pregnant recipient.
              </p>
</details>
</div>
</section>
</div>
{/* RIGHT SIDEBAR: Sticky Doctor Consultation Card (30% -> 4 Cols) */}
<div className="lg:col-span-4 sticky top-32 space-y-4">
{/* Consultation Booking Card */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 shadow-sm">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1 text-micro font-semibold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
<span className="material-symbols-outlined text-[14px]" data-icon="verified" data-weight="fill">verified</span>
              Need a Prescription?
            </span>
<span className="text-caption text-[#78716C]">Online in 10 mins</span>
</div>
<h3 className="text-headline-h3 font-headline-h3 text-on-surface mt-2.5">Instant Dermatologist Consultation</h3>
<p className="text-caption text-[#78716C] mt-1 leading-normal">
            Consult a certified MD Dermatologist right now to review your skin history and receive an official ABHA-compliant e-prescription.
          </p>
{/* Doctor Mini Profile */}
<div className="flex items-center gap-3 my-4 p-3 bg-surface-container-low rounded-lg border border-surface-variant">
<div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center overflow-hidden">
<span className="material-symbols-outlined text-[24px] text-outline" data-icon="stethoscope">stethoscope</span>
</div>
<div>
<div className="text-caption-strong font-caption-strong text-on-surface">Dr. Preeti Sharma, MD</div>
<div className="text-micro text-[#78716C]">Consultant Dermatologist · 12 yrs exp.</div>
</div>
</div>
<div className="flex items-center justify-between py-2 border-t border-surface-variant">
<span className="text-caption text-[#78716C]">Consultation Fee</span>
<span className="text-body-strong font-body-strong text-on-surface">₹499.00</span>
</div>
<Link href="/consult/lobby/cx-88421" className="w-full mt-3 h-11 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] text-white text-caption-strong font-caption-strong transition duration-150 active:scale-95 shadow-sm">
            Book Audio / Video Call
          </Link>
</div>
{/* Cold Chain Dispense Assurance Card */}
<div className="bg-surface-container-low border border-surface-variant rounded-xl p-4 space-y-2">
<div className="flex items-center gap-2 text-on-surface font-caption-strong">
<span className="material-symbols-outlined text-[18px] text-[#00543c]" data-icon="thermostat">thermostat</span>
<span>Temperature Monitored Delivery</span>
</div>
<p className="text-micro text-[#78716C] leading-normal">
            Isotretinoin capsules degrade when exposed to heat above 25°C. Curxx guarantees insulated thermal courier dispatch with physical data-logger seal verification upon doorstep arrival.
          </p>
</div>
</div>
</div>
{/* 6. RELATED PRODUCTS CAROUSEL / GRID */}
<section className="mt-16 pt-8 border-t border-surface-variant">
<div className="flex items-center justify-between mb-6">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Often Bought Together / Recommended Skincare</h2>
<p className="text-caption text-[#78716C]">Dermatologist-recommended non-comedogenic barrier care routine</p>
</div>
<div className="flex items-center gap-2">
<button aria-label="Previous items" className="w-8 h-8 rounded-full border border-surface-variant flex items-center justify-center text-outline hover:text-on-surface transition">
<span className="material-symbols-outlined text-[18px]" data-icon="arrow_back">arrow_back</span>
</button>
<button aria-label="Next items" className="w-8 h-8 rounded-full border border-surface-variant flex items-center justify-center text-outline hover:text-on-surface transition">
<span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Cross-sell 1 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition">
<div>
<div className="relative aspect-square w-full rounded-lg bg-surface-container-low border border-surface-variant overflow-hidden mb-3 p-4 flex items-center justify-center">
<img loading="lazy" decoding="async" className="w-full h-full object-contain" data-alt="A minimalist white pump bottle of gentle hydrating clinical cleanser on a warm neutral surface with subtle water ripples, modern corporate medical studio photography, soft lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_dtcUfNoOrQFn4z_vGfFsCEyPdV5yoKznN8U32mPrYciGLsvU__BtEMXM8cdMO_1qpvSP0dVM3mOcKGy3a1hgSW2aBB4heLRtZo7vpQmk0ptkEzF3s1l10EjS1uQhNsO3dkrE1GtetMsy2xA4LE0Q5kvfTeNJQiUQzyGWSGK1jKyiM53ik3zWRONWqrbe0YWkm4Q5csVZ-U6cjEnUNbJ9N3iHZlWwZUcAISGj1mKYsBOqvSVQqnXj=w800"/>
</div>
<span className="text-micro font-semibold text-outline">HYDRATION</span>
<h3 className="text-caption-strong font-caption-strong text-on-surface mt-1">Gentle Hydrating Cleanser (150ml)</h3>
<p className="text-micro text-[#78716C] mt-0.5">Soap-free, pH 5.5 non-foaming formula</p>
<div className="flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[15px] text-amber-500" data-icon="star" data-weight="fill">star</span>
<span className="text-micro font-bold text-on-surface">4.8</span>
<span className="text-micro text-[#78716C]">(1,420)</span>
</div>
</div>
<div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-variant">
<div>
<span className="text-body-strong font-body-strong text-on-surface">₹299.00</span>
<span className="text-micro text-[#78716C] line-through ml-1">₹350.00</span>
</div>
<button type="button" onClick={addFromCard} className="h-8 px-3 rounded-lg border border-surface-variant hover:border-outline text-caption-strong font-caption-strong text-on-surface transition">
              + Add
            </button>
</div>
</div>
{/* Cross-sell 2 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition">
<div>
<div className="relative aspect-square w-full rounded-lg bg-surface-container-low border border-surface-variant overflow-hidden mb-3 p-4 flex items-center justify-center">
<img loading="lazy" decoding="async" className="w-full h-full object-contain" data-alt="A sleek medical sunscreen tube with SPF 50 rating, set in front of soft directional morning daylight on a clean limestone podium with minimalist red-accented packaging." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcKivfq6q8Zm-HTnUiTk3WMNcZ5lqXd69LqlUDNr48AMu-1nm8YsGsgb6gPOi16VtSujNfZdXLewzR_42PEIsPd9SxAh7H9lzEVY7wUNF-g1z4vjoKUmQYjaQtPx17p4Hmil_IXXKiElRZe_Rv5nABcZUd2bEK20SSDJYZvRLYkSs5dIzxs9LFjWdvlawhcPSBEdA81dP64XuCf4VM9xK6T__dnJ9-8Pdiy9aLypT_zAqM5dFsmUip=w800"/>
</div>
<span className="text-micro font-semibold text-outline">BARRIER DEFENSE</span>
<h3 className="text-caption-strong font-caption-strong text-on-surface mt-1">Ceramide Barrier Cream SPF 50 (50g)</h3>
<p className="text-micro text-[#78716C] mt-0.5">Broad spectrum PA++++ with Ceramide NP</p>
<div className="flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[15px] text-amber-500" data-icon="star" data-weight="fill">star</span>
<span className="text-micro font-bold text-on-surface">4.9</span>
<span className="text-micro text-[#78716C]">(890)</span>
</div>
</div>
<div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-variant">
<div>
<span className="text-body-strong font-body-strong text-on-surface">₹540.00</span>
<span className="text-micro text-[#78716C] line-through ml-1">₹600.00</span>
</div>
<button type="button" onClick={addFromCard} className="h-8 px-3 rounded-lg border border-surface-variant hover:border-outline text-caption-strong font-caption-strong text-on-surface transition">
              + Add
            </button>
</div>
</div>
{/* Cross-sell 3 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition">
<div>
<div className="relative aspect-square w-full rounded-lg bg-surface-container-low border border-surface-variant overflow-hidden mb-3 p-4 flex items-center justify-center">
<img loading="lazy" decoding="async" className="w-full h-full object-contain" data-alt="Clinical lip balm stick with SPF 30 sunscreen seal and shea butter icons in crisp focus against a calm off-white medical back-drop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOX_us1G7KV2PRVowKn_ZNUOa2jjSVrPC9MfC3yLAXbKy3pOiJfaElVJMs59vzUsIatYOE41SnjX8xXngJjQjWIhuxaQUVVuoW1g1S1SOwQaROwNG2-qEmZJvxvk32ufIYTE-DcHZuHUWQ4ppOVb8UeX-4KPtKbEkSuqj2biW1L-vi4e4hmq8en2mc8vIxv7YWasUFSMZL2kx76NEQebG7n_S8ThYM4fFSgDspZxlf05_aBosc61M9=w800"/>
</div>
<span className="text-micro font-semibold text-outline">LIP HYDRATION</span>
<h3 className="text-caption-strong font-caption-strong text-on-surface mt-1">Soothing Lip Balm SPF 30 (10g)</h3>
<p className="text-micro text-[#78716C] mt-0.5">Essential moisture for Isotretinoin cheilitis</p>
<div className="flex items-center gap-1 mt-2">
<span className="material-symbols-outlined text-[15px] text-amber-500" data-icon="star" data-weight="fill">star</span>
<span className="text-micro font-bold text-on-surface">4.7</span>
<span className="text-micro text-[#78716C]">(2,110)</span>
</div>
</div>
<div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-variant">
<div>
<span className="text-body-strong font-body-strong text-on-surface">₹185.00</span>
<span className="text-micro text-[#78716C] line-through ml-1">₹220.00</span>
</div>
<button type="button" onClick={addFromCard} className="h-8 px-3 rounded-lg border border-surface-variant hover:border-outline text-caption-strong font-caption-strong text-on-surface transition">
              + Add
            </button>
</div>
</div>
</div>
</section>
</main>
<Toast message={toast} />
{/* Mobile sticky action bar */}
<div className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-[#E7E5E4] px-margin py-3 flex items-center gap-3">
<div className="min-w-0">
<p className="font-micro text-micro text-[#78716C]">Total</p>
<p className="font-headline-h3 text-headline-h3 text-[#1C1917] leading-none">₹{(PRODUCT.price * qty).toLocaleString('en-IN')}</p>
</div>
<button type="button" onClick={addProduct} className="flex-1 h-12 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-body-strong text-body-strong flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">shopping_bag</span>
<span>Add to Cart</span>
</button>
</div>
<div className="h-20 lg:hidden" aria-hidden="true"></div>
<Footer />

    </>
  );
}
