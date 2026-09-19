
'use client';
import Link from 'next/link';
import { categoryName, filterProducts, formatINR, type Product } from '@/lib/medicines';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import Toast, { useToast } from '@/components/Toast';
import { addToCart, cartItemFromCard, useCart } from '@/lib/cart';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function MedicineStore({ category, query }: { category?: string; query?: string }) {
  const [toast, showToast] = useToast();

  function addFromCard(e: MouseEvent<HTMLButtonElement>) {
    const item = cartItemFromCard(e.currentTarget);
    if (!item) return;
    addToCart(item);
    showToast(`${item.name} added to cart`);
  }
  const cart = useCart();
  const router = useRouter();
  const [search, setSearch] = useState(query ?? '');

  const results = filterProducts({ category, query });
  const filterLabel = category ? categoryName(category) ?? category : query ? `“${query}”` : null;

  function addProduct(product: Product) {
    addToCart({ slug: product.slug, name: product.name, price: product.price });
    showToast(`${product.name} added to cart`);
  }

  function runSearch() {
    const q = search.trim();
    router.push(q ? `/medicines?q=${encodeURIComponent(q)}#results` : '/medicines');
  }

  return (
    <>
      
<Header />
{/* UTILITY DELIVERY BAR */}
<section className="bg-surface-container-low border-b border-surface-variant">
<div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop min-h-11 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-caption font-caption">
{/* Delivery Address Cluster */}
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-base" data-icon="location_on">location_on</span>
<span className="text-on-surface-variant">Deliver to</span>
<span className="font-body-strong text-caption-strong text-on-surface">560001 Bengaluru (Indiranagar)</span>
<button className="text-primary-container font-caption-strong hover:underline ml-1">Change</button>
</div>
{/* Right Dispatch status & Cart Button */}
<div className="flex items-center gap-3 sm:gap-space-lg">
<div className="hidden sm:flex items-center gap-2 text-tertiary font-caption-strong">
<span className="w-2 h-2 rounded-full bg-tertiary-container pulse-dot"></span>
<span>Express 2-Hour Delivery Active</span>
</div>
<button className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest border border-surface-variant rounded-lg text-on-surface hover:border-outline-variant transition duration-150 shadow-sm active:scale-95">
<span className="material-symbols-outlined text-base text-primary-container" data-icon="shopping_bag">shopping_bag</span>
<span className="font-caption-strong">{cart.count} {cart.count === 1 ? 'item' : 'items'} · ₹{cart.total.toLocaleString('en-IN')}</span>
</button>
</div>
</div>
</section>
{/* MAIN CANVAS CONTAINER */}
<main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl space-y-space-2xl">
{filterLabel && (
<section id="results" className="space-y-space-base scroll-mt-16">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
<div>
<span className="text-micro font-micro text-on-surface-variant uppercase tracking-wider font-semibold">CATALOGUE RESULTS</span>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface mt-0.5">{results.length} {results.length === 1 ? 'product' : 'products'} in {filterLabel}</h2>
</div>
<Link href="/medicines" className="text-caption-strong font-caption-strong text-primary-container hover:underline">Clear filter</Link>
</div>
{results.length === 0 ? (
<div className="rounded-xl border border-dashed border-surface-variant bg-surface-container-lowest p-8 text-center">
<p className="text-body-strong font-body-strong text-on-surface">Nothing in {filterLabel} yet</p>
<p className="text-caption font-caption text-on-surface-variant mt-1">Browse the full catalogue below, or upload a prescription and our pharmacist will source it for you.</p>
<Link href="/medicines/upload" className="inline-flex mt-4 h-10 px-4 items-center rounded-lg bg-primary-container hover:bg-primary text-on-primary font-caption-strong text-caption-strong">Upload Prescription</Link>
</div>
) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
{results.map((product) => (
<div key={product.slug} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col justify-between hover:border-outline-variant transition-colors">
<div className="space-y-3">
<div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[22px]">{product.icon}</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface leading-tight">
{product.detail ? <Link className="hover:text-primary-container transition-colors" href={`/medicines/${product.slug}`}>{product.name}</Link> : product.name}
</h3>
<p className="text-caption font-caption text-on-surface-variant mt-1">{product.subtitle}</p>
</div>
</div>
<div className="pt-4 mt-3 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP {formatINR(product.mrp)}</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface">{formatINR(product.price)}</p>
</div>
<button type="button" onClick={() => addProduct(product)} className="px-4 py-1.5 border border-surface-variant rounded-lg text-caption-strong font-caption-strong text-primary-container hover:bg-surface-container-low transition-colors">
              + Add
            </button>
</div>
</div>
))}
</div>
)}
</section>
)}

{/* HERO SECTION (Two-Column Layout) */}
<section className="bg-surface rounded-2xl border border-surface-variant p-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center shadow-sm">
{/* Left Column (60% Desktop) */}
<div className="lg:col-span-7 space-y-space-base">
{/* Eyebrow Badge */}
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/40 border border-outline-variant text-primary font-caption-strong text-micro">
<span className="material-symbols-outlined text-sm" data-icon="verified_user">verified_user</span>
<span>VERIFIED PHARMACY · 2-HR EXPRESS DISPATCH</span>
</div>
{/* Headline & Subtext */}
<div className="space-y-2">
<h1 className="text-display font-display text-on-surface tracking-tight">
            Genuine medicines, <br/><span className="text-primary-container">delivered in 2 hours.</span>
</h1>
<p className="text-body-default font-body-default text-on-surface-variant max-w-lg">
            Over 50,000+ authentic medicines, healthcare devices &amp; daily wellness essentials sourced directly from licensed manufacturers.
          </p>
</div>
{/* Primary Large Search Card */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-2 flex items-center gap-2 shadow-sm focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/10 transition duration-150">
<span className="material-symbols-outlined text-outline ml-2 text-xl pointer-events-none" data-icon="search">search</span>
<input className="w-full h-11 bg-transparent border-none text-body-default font-body-default text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }} aria-label="Search medicines" placeholder="Search for medicines, active salts, health products..." type="text"/>
<button type="button" onClick={runSearch} className="h-11 px-6 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg shadow-sm transition duration-150 active:scale-95 flex items-center justify-center">
            Search
          </button>
</div>
{/* Popular Searches Pill Tags */}
<div className="flex items-center gap-2 flex-wrap pt-1">
<span className="text-caption font-caption text-outline">Popular searches:</span>
<Link href="/medicines?q=Paracetamol#results" className="px-3 py-1 bg-surface-container-lowest border border-surface-variant hover:border-outline-variant rounded-full text-caption font-caption text-on-surface transition duration-150">Paracetamol</Link>
<Link href="/medicines?q=Metformin#results" className="px-3 py-1 bg-surface-container-lowest border border-surface-variant hover:border-outline-variant rounded-full text-caption font-caption text-on-surface transition duration-150">Metformin</Link>
<Link href="/medicines?q=Vitamin C#results" className="px-3 py-1 bg-surface-container-lowest border border-surface-variant hover:border-outline-variant rounded-full text-caption font-caption text-on-surface transition duration-150">Vitamin C</Link>
<Link href="/medicines?q=Minoxidil#results" className="px-3 py-1 bg-surface-container-lowest border border-surface-variant hover:border-outline-variant rounded-full text-caption font-caption text-on-surface transition duration-150">Minoxidil</Link>
<Link href="/medicines?q=Cetirizine#results" className="px-3 py-1 bg-surface-container-lowest border border-surface-variant hover:border-outline-variant rounded-full text-caption font-caption text-on-surface transition duration-150">Cetirizine</Link>
</div>
</div>
{/* Right Column (40% Desktop) - Prescription Quick Upload Card */}
<div className="lg:col-span-5 bg-surface-container-lowest border-2 border-dashed border-primary-container/40 rounded-2xl p-space-lg space-y-space-base shadow-sm">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-error-container/40 flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-2xl" data-icon="prescriptions">prescriptions</span>
</div>
<div>
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Upload prescription, we&apos;ll do the rest</h2>
<p className="text-caption font-caption text-on-surface-variant mt-1 leading-relaxed">
              Our licensed pharmacists will verify your Rx, add required items to cart, and call for confirmation in 10 mins.
            </p>
</div>
</div>
<div className="space-y-space-sm pt-2">
<Link href="/medicines/upload" className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg flex items-center justify-center gap-2 shadow-sm transition duration-150 active:scale-95">
<span className="material-symbols-outlined text-xl" data-icon="upload_file">upload_file</span>
<span>Upload Prescription</span>
</Link>
<p className="text-center text-micro font-micro text-outline">
            Supports JPG, PNG, PDF up to 15MB · 100% Confidential
          </p>
</div>
</div>
</section>
{/* FOUR-ITEM CLINICAL TRUST STRIP */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-base">
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex items-center gap-3 shadow-sm">
<div className="w-11 h-11 rounded-lg bg-tertiary-container/10 text-tertiary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-2xl" data-icon="verified_user">verified_user</span>
</div>
<div>
<h3 className="text-caption-strong font-caption-strong text-on-surface">100% Genuine Medicines</h3>
<p className="text-caption font-caption text-on-surface-variant">Direct from certified pharma brands</p>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex items-center gap-3 shadow-sm">
<div className="w-11 h-11 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-2xl" data-icon="ac_unit">ac_unit</span>
</div>
<div>
<h3 className="text-caption-strong font-caption-strong text-on-surface">Cold-Chain Delivery</h3>
<p className="text-caption font-caption text-on-surface-variant">Insulated vaccine &amp; insulin transport</p>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex items-center gap-3 shadow-sm">
<div className="w-11 h-11 rounded-lg bg-surface-container-high text-outline flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-2xl" data-icon="medical_services">medical_services</span>
</div>
<div>
<h3 className="text-caption-strong font-caption-strong text-on-surface">Licensed Pharmacy</h3>
<p className="text-caption font-caption text-on-surface-variant">CDSCO &amp; State Council approved</p>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex items-center gap-3 shadow-sm">
<div className="w-11 h-11 rounded-lg bg-surface-container-high text-outline flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-2xl" data-icon="keyboard_return">keyboard_return</span>
</div>
<div>
<h3 className="text-caption-strong font-caption-strong text-on-surface">Easy 7-Day Returns</h3>
<p className="text-caption font-caption text-on-surface-variant">Hassle-free pickups for sealed packs</p>
</div>
</div>
</section>
{/* CATEGORY GRID (8 Bento-Style Bordered Cards) */}
<section className="space-y-space-base">
<div className="flex items-end justify-between">
<div>
<span className="text-micro font-micro text-outline uppercase tracking-wider font-semibold">EXPLORE CATALOGUE</span>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Shop by Category</h2>
</div>
<Link href="/medicines" className="text-primary-container font-caption-strong text-caption hover:underline flex items-center gap-1">
<span>View All Categories</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-base">
{/* Category 1 */}
<Link href="/medicines?category=diabetes-care#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="bloodtype">bloodtype</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Diabetes Care</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Glucometers, strips, sugar substitutes</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">340+ items</span>
</Link>
{/* Category 2 */}
<Link href="/medicines?category=vitamins#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="medication">medication</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Vitamins &amp; Supplements</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Multivitamins, Omega 3, Calcium</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">520+ items</span>
</Link>
{/* Category 3 */}
<Link href="/medicines?category=skin-care#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="spa">spa</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Skin Care</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Dermatologist cleansers, serums</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">610+ items</span>
</Link>
{/* Category 4 */}
<Link href="/medicines?category=baby-care#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="child_care">child_care</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Baby Care</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Diapers, organic baby food &amp; rash care</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">280+ items</span>
</Link>
{/* Category 5 */}
<Link href="/medicines?category=pain-relief#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="personal_injury">personal_injury</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Pain Relief</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Sprays, gels, heating pads &amp; balms</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">190+ items</span>
</Link>
{/* Category 6 */}
<Link href="/medicines?category=ayurveda#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="eco">eco</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Ayurveda &amp; Herbs</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Ashwagandha, Chyawanprash, juices</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">430+ items</span>
</Link>
{/* Category 7 */}
<Link href="/medicines?category=devices#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="monitor_heart">monitor_heart</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Devices &amp; Equipment</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">BP monitors, Nebulizers, Oximeters</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">150+ items</span>
</Link>
{/* Category 8 */}
<Link href="/medicines?category=sexual-wellness#results" className="group bg-surface-container-lowest border border-surface-variant hover:border-primary-container/50 rounded-xl p-space-base transition duration-150 hover:shadow-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
<span className="material-symbols-outlined text-2xl" data-icon="favorite">favorite</span>
</div>
<h3 className="text-body-strong font-body-strong text-on-surface">Sexual Wellness</h3>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Supplements, protection, fertility tests</p>
<span className="inline-block mt-2 text-micro font-micro text-outline font-semibold">120+ items</span>
</Link>
</div>
</section>
{/* REORDER YOUR MEDICINES (Active Prescription Sync) */}
<section className="space-y-space-base">
<div className="flex items-end justify-between">
<div>
<div className="flex items-center gap-2">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Reorder Your Medicines</h2>
<span className="px-2 py-0.5 bg-tertiary-container/15 text-tertiary-container font-caption-strong text-micro rounded">Verified Rx Sync</span>
</div>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Quick 1-tap reordering based on your active clinical prescriptions</p>
</div>
<Link href="/records" className="text-primary-container font-caption-strong text-caption hover:underline flex items-center gap-1">
<span>View All Prescriptions</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
{/* Reorder Card 1 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative">
<span className="absolute top-3 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            20% OFF
          </span>
<div className="space-y-2">
<div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined" data-icon="pill">pill</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface leading-tight">Glycomet GP 1 Tablet</h3>
<p className="text-caption font-caption text-outline">Metformin 500mg + Glimepiride 1mg</p>
<p className="text-micro font-micro text-on-surface-variant mt-1">Pack of 15 tablets</p>
</div>
</div>
<div className="pt-4 mt-2 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹145</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹116</p>
</div>
{/* Quantity Stepper */}
<div className="flex items-center border border-primary-container rounded-lg bg-surface-container-lowest text-primary-container font-body-strong text-caption overflow-hidden">
<button className="px-2.5 py-1 hover:bg-surface-container transition-colors">-</button>
<span className="px-2 font-bold">2</span>
<button className="px-2.5 py-1 hover:bg-surface-container transition-colors">+</button>
</div>
</div>
</div>
{/* Reorder Card 2 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative">
<span className="absolute top-3 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            20% OFF
          </span>
<div className="space-y-2">
<div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined" data-icon="medication">medication</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface leading-tight">Shelcal 500 Tablet</h3>
<p className="text-caption font-caption text-outline">Calcium 500mg + Vitamin D3 250 IU</p>
<p className="text-micro font-micro text-on-surface-variant mt-1">Pack of 15 tablets</p>
</div>
</div>
<div className="pt-4 mt-2 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹131</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹105</p>
</div>
<button type="button" onClick={addFromCard} className="px-4 py-1.5 border border-surface-variant hover:border-primary-container text-primary-container font-caption-strong text-caption rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition duration-150">
              + Add
            </button>
</div>
</div>
{/* Reorder Card 3 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative">
<span className="absolute top-3 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            20% OFF
          </span>
<div className="space-y-2">
<div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined" data-icon="pill">pill</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface leading-tight">Telma 40 Tablet</h3>
<p className="text-caption font-caption text-outline">Telmisartan 40mg</p>
<p className="text-micro font-micro text-on-surface-variant mt-1">Pack of 30 tablets</p>
</div>
</div>
<div className="pt-4 mt-2 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹285</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹228</p>
</div>
<button type="button" onClick={addFromCard} className="px-4 py-1.5 border border-surface-variant hover:border-primary-container text-primary-container font-caption-strong text-caption rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition duration-150">
              + Add
            </button>
</div>
</div>
{/* Reorder Card 4 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative">
<span className="absolute top-3 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            15% OFF
          </span>
<div className="space-y-2">
<div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined" data-icon="vaccines">vaccines</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface leading-tight">Thyronorm 50mcg Tablet</h3>
<p className="text-caption font-caption text-outline">Thyroxine Sodium</p>
<p className="text-micro font-micro text-on-surface-variant mt-1">Bottle of 120 tablets</p>
</div>
</div>
<div className="pt-4 mt-2 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹195</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹165</p>
</div>
{/* Quantity Stepper */}
<div className="flex items-center border border-primary-container rounded-lg bg-surface-container-lowest text-primary-container font-body-strong text-caption overflow-hidden">
<button className="px-2.5 py-1 hover:bg-surface-container transition-colors">-</button>
<span className="px-2 font-bold">1</span>
<button className="px-2.5 py-1 hover:bg-surface-container transition-colors">+</button>
</div>
</div>
</div>
</div>
</section>
{/* DEALS OF THE DAY WITH COUNTDOWN TIMER */}
<section className="space-y-space-base">
<div className="flex items-center justify-between flex-wrap gap-2">
<div className="flex items-center gap-3">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Deals of the Day</h2>
{/* Countdown Chip */}
<div className="flex items-center gap-1.5 px-3 py-1 bg-error-container/50 border border-outline-variant rounded-full text-primary-container font-caption-strong text-caption">
<span className="material-symbols-outlined text-sm" data-icon="timer">timer</span>
<span>Ends in 05h : 23m : 14s</span>
</div>
</div>
<Link href="/medicines?category=deals#results" className="text-primary-container font-caption-strong text-caption hover:underline flex items-center gap-1">
<span>View All Deals</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
{/* Deal 1 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative overflow-hidden group">
<div className="absolute top-0 left-0 bg-primary-container text-on-primary text-micro font-micro font-bold px-2.5 py-0.5 rounded-br-lg">
            Deal of the Day
          </div>
<span className="absolute top-2 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            38% OFF
          </span>
<div className="space-y-3 pt-4">
<div className="w-full h-32 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-4xl" data-icon="speed">speed</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface">Accu-Chek Active Monitor Kit</h3>
<p className="text-caption font-caption text-outline">Includes 10 test strips + lancing pen</p>
</div>
</div>
<div className="pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹1,599</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹999</p>
</div>
<button type="button" onClick={addFromCard} className="h-9 px-3.5 bg-primary-container hover:bg-primary text-on-primary font-caption-strong text-caption rounded-lg transition duration-150 active:scale-95">
              Add to Cart
            </button>
</div>
</div>
{/* Deal 2 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative overflow-hidden group">
<span className="absolute top-3 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            25% OFF
          </span>
<div className="space-y-3">
<div className="w-full h-32 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-4xl" data-icon="sanitizer">sanitizer</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface">Cetaphil Gentle Skin Cleanser</h3>
<p className="text-caption font-caption text-outline">250ml · Dermatologist Recommended</p>
</div>
</div>
<div className="pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹625</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹468</p>
</div>
<button type="button" onClick={addFromCard} className="h-9 px-3.5 bg-primary-container hover:bg-primary text-on-primary font-caption-strong text-caption rounded-lg transition duration-150 active:scale-95">
              Add to Cart
            </button>
</div>
</div>
{/* Deal 3 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative overflow-hidden group">
<span className="absolute top-3 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            30% OFF
          </span>
<div className="space-y-3">
<div className="w-full h-32 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-4xl" data-icon="healing">healing</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface">Revital H Daily Health Supplement</h3>
<p className="text-caption font-caption text-outline">60 Capsules · Energy &amp; Immunity</p>
</div>
</div>
<div className="pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹550</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹385</p>
</div>
<button type="button" onClick={addFromCard} className="h-9 px-3.5 bg-primary-container hover:bg-primary text-on-primary font-caption-strong text-caption rounded-lg transition duration-150 active:scale-95">
              Add to Cart
            </button>
</div>
</div>
{/* Deal 4 */}
<div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex flex-col justify-between shadow-sm relative overflow-hidden group">
<span className="absolute top-3 right-3 text-micro font-micro text-tertiary-container font-bold bg-tertiary-container/10 px-2 py-0.5 rounded">
            30% OFF
          </span>
<div className="space-y-3">
<div className="w-full h-32 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-4xl" data-icon="monitor_heart">monitor_heart</span>
</div>
<div>
<h3 className="text-body-strong font-body-strong text-on-surface">Omron HEM 7120 Digital BP Monitor</h3>
<p className="text-caption font-caption text-outline">Fully Automatic with Intellisense</p>
</div>
</div>
<div className="pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-micro font-micro text-outline line-through">MRP ₹2,440</span>
<p className="text-headline-h3 font-headline-h3 text-on-surface font-bold">₹1,708</p>
</div>
<button type="button" onClick={addFromCard} className="h-9 px-3.5 bg-primary-container hover:bg-primary text-on-primary font-caption-strong text-caption rounded-lg transition duration-150 active:scale-95">
              Add to Cart
            </button>
</div>
</div>
</div>
</section>
{/* SHOP BY HEALTH CONDITION (Clinical Pill Wrap) */}
<section className="space-y-space-base">
<div>
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Shop by Health Condition</h2>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Targeted medicinal therapies &amp; daily protocols curated by clinical specialists</p>
</div>
<div className="flex flex-wrap gap-2.5">
<Link href="/medicines?category=diabetes#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="bloodtype">bloodtype</span>
<span>Diabetes</span>
</Link>
<Link href="/medicines?category=hypertension#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="cardiology">cardiology</span>
<span>Hypertension / BP</span>
</Link>
<Link href="/medicines?category=skin-acne-eczema#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="flare">flare</span>
<span>Skin Acne &amp; Eczema</span>
</Link>
<Link href="/medicines?category=hair-loss#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="face">face</span>
<span>Hair Loss &amp; Regrowth</span>
</Link>
<Link href="/medicines?category=bone-joint#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="accessibility_new">accessibility_new</span>
<span>Bone &amp; Joint Care</span>
</Link>
<Link href="/medicines?category=digestion#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="stomach">save_as</span>
<span>Digestion &amp; Gut Health</span>
</Link>
<Link href="/medicines?category=respiratory#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="pulmonology">pulmonology</span>
<span>Respiratory &amp; Asthma</span>
</Link>
<Link href="/medicines?category=anxiety-sleep#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="bedtime">bedtime</span>
<span>Anxiety &amp; Sleep</span>
</Link>
<Link href="/medicines?category=immunity#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="shield">shield</span>
<span>Immunity Boosters</span>
</Link>
<Link href="/medicines?category=kidney-care#results" className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-surface-variant hover:border-primary-container/60 rounded-full text-caption-strong text-on-surface hover:text-primary-container transition duration-150 shadow-sm">
<span className="material-symbols-outlined text-base text-outline" data-icon="nephrology">nephrology</span>
<span>Kidney Care</span>
</Link>
</div>
</section>
{/* FULL-WIDTH PRESCRIPTION CTA BANNER */}
<section className="bg-surface rounded-2xl border border-surface-variant p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg shadow-sm">
<div className="flex items-start gap-space-lg max-w-2xl">
<div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-3xl" data-icon="receipt_long">receipt_long</span>
</div>
<div className="space-y-1">
<h2 className="text-headline-h2 font-headline-h2 text-on-surface">Have a prescription? Order in 30 seconds</h2>
<p className="text-body-default font-body-default text-on-surface-variant leading-relaxed">
            Simply upload your doctor&apos;s note or ABHA e-prescription. Our registered pharmacists will review, prepare your cart, and coordinate doorstep delivery.
          </p>
</div>
</div>
<div className="flex items-center gap-3 shrink-0 w-full lg:w-auto flex-col sm:flex-row">
<Link href="/medicines/upload" className="w-full sm:w-auto h-12 px-6 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg shadow-sm transition duration-150 active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-xl" data-icon="upload_file">upload_file</span>
<span>Upload Prescription Now</span>
</Link>
<a className="w-full sm:w-auto h-12 px-5 bg-surface-container-lowest hover:bg-surface-container border border-surface-variant rounded-lg text-on-surface font-body-strong text-body-default flex items-center justify-center gap-2 transition duration-150" href="tel:18002879963">
<span className="material-symbols-outlined text-lg text-primary-container" data-icon="call">call</span>
<span>1800-CURXX-MED</span>
</a>
</div>
</section>
</main>
<Toast message={toast} />
<Footer />

    </>
  );
}
