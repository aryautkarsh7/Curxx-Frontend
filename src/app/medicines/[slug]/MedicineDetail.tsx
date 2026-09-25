'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Footer from '@/components/Footer';
import ReportIssue from '@/components/profile/ReportIssue';
import Header from '@/components/Header';
import MedicineCard from '@/components/pharmacy/MedicineCard';
import Toast, { useToast } from '@/components/Toast';
import { discountPct, rupees, type Medicine, photo } from '@/lib/api';
import { addToCart, useCart } from '@/lib/cart';

type Props = { medicine: Medicine; substitutes: Medicine[]; similar: Medicine[]; categoryName: string | null };

/** Bengaluru pincodes get express delivery; the rest of India standard courier. */
function deliveryEstimate(pincode: string): { ok: boolean; text: string } {
  if (!/^[1-9]\d{5}$/.test(pincode)) return { ok: false, text: 'Enter a valid 6-digit pincode' };
  if (pincode.startsWith('560')) return { ok: true, text: 'Express delivery in 2 hours' };
  return { ok: true, text: 'Delivery in 2–4 working days' };
}

export default function MedicineDetail({ medicine: m, substitutes, similar, categoryName }: Props) {
  const router = useRouter();
  const cart = useCart();
  const [toast, showToast] = useToast();
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [delivery, setDelivery] = useState<{ ok: boolean; text: string } | null>(null);
  const off = discountPct(m.price, m.mrp);
  const outOfStock = m.stock <= 0;
  const maxQty = Math.min(10, m.stock);
  const inCart = cart.qtyOf(m.slug);

  function add(goToCart = false) {
    addToCart({ slug: m.slug, name: m.name, price: m.price, mrp: m.mrp, rxRequired: m.rxRequired, subtitle: m.subtitle }, qty);
    if (goToCart) router.push('/cart');
    else showToast(`${qty} × ${m.name} added to cart`);
  }

  const sections = [
    { id: 'about', label: 'Description' },
    (m.uses?.length ?? 0) > 0 && { id: 'uses', label: 'Uses' },
    m.howToUse && { id: 'how-to-use', label: 'How to use' },
    (m.sideEffects?.length ?? 0) > 0 && { id: 'side-effects', label: 'Side effects' },
    (m.safetyAdvice?.length ?? 0) > 0 && { id: 'safety-advice', label: 'Safety advice' },
    { id: 'substitutes', label: 'Substitutes' },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-base pb-28 lg:pb-space-base">
        <nav aria-label="Breadcrumb" className="mb-space-base">
          <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 text-caption font-caption text-outline">
            <li><Link href="/" className="hover:text-primary transition-colors duration-150">Home</Link></li>
            <li><span className="text-surface-variant">/</span></li>
            <li><Link href="/medicines" className="hover:text-primary transition-colors duration-150">Medicines</Link></li>
            {categoryName && (
              <>
                <li><span className="text-surface-variant">/</span></li>
                <li><Link href={`/medicines?category=${m.categories[0]}#results`} className="hover:text-primary transition-colors duration-150">{categoryName}</Link></li>
              </>
            )}
            <li><span className="text-surface-variant">/</span></li>
            <li aria-current="page" className="font-caption-strong text-caption-strong text-primary truncate max-w-[60vw]">{m.name}</li>
          </ol>
        </nav>

        {/* PRODUCT HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-2xl items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-base">
            <div className="relative bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg flex flex-col items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[400px]">
              {m.rxRequired && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] text-[#8E0E17] font-caption-strong text-micro">
                  <span className="material-symbols-outlined text-[14px]">prescriptions</span>Rx required
                </span>
              )}
              {m.imageUrl ? (
                <img src={photo(m.imageUrl, 900)} alt={m.name} className="max-h-[360px] w-auto object-contain rounded-lg" />
              ) : (
                <div className="w-40 h-40 rounded-3xl bg-surface-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[88px]">{m.icon}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              {[
                { icon: 'verified_user', title: '100% Genuine', body: `Direct from ${m.manufacturer}` },
                { icon: 'health_and_safety', title: 'WHO-GMP Batch', body: 'Certified manufacturing' },
                { icon: 'thermostat', title: 'Stored Right', body: m.storage ?? 'Below 30°C' },
              ].map((s) => (
                <div key={s.title} className="p-3 bg-surface-container-lowest border border-surface-variant rounded-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-caption-strong text-caption-strong text-on-surface">{s.title}</p>
                    <p className="font-micro text-micro text-outline line-clamp-2">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div>
              <span className="font-micro text-micro text-outline tracking-wider block mb-1 uppercase">{m.manufacturer} · {m.form}</span>
              <h1 className="text-display font-display text-on-surface leading-tight">{m.name}</h1>
              <p className="text-caption font-caption text-on-surface-variant mt-1">
                Composition: <span className="text-on-surface font-caption-strong">{m.composition}</span>
              </p>
              <div className="flex items-center gap-2 mt-2 text-caption font-caption text-on-surface-variant">
                <span className="inline-flex items-center gap-1 text-[#047857] font-caption-strong">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>{m.rating}
                </span>
                <span>({m.reviewCount.toLocaleString('en-IN')} ratings)</span>
                <ReportIssue targetType="medicine" slug={m.slug} name={m.name} className="ml-2" />
              </div>
            </div>

            <div>
              <span className="font-caption-strong text-caption-strong text-on-surface block mb-2">Pack size</span>
              <span className="inline-flex px-3.5 py-2 rounded-lg bg-error-container border border-outline-variant text-primary font-caption-strong text-caption items-center gap-1.5 ring-1 ring-primary-container">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>{m.packSize}
              </span>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-4 flex flex-col gap-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-display font-display text-on-surface">{rupees(m.price)}</span>
                {m.mrp > m.price && <span className="text-caption font-caption text-outline line-through">MRP {rupees(m.mrp)}</span>}
                {off > 0 && <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-caption-strong text-caption">{off}% OFF</span>}
              </div>
              <p className="font-micro text-micro text-outline">Inclusive of all taxes · Free delivery on orders above ₹499</p>
              <p className={`font-caption-strong text-caption mt-1 ${outOfStock ? 'text-[#8E0E17]' : m.stock < 15 ? 'text-[#B45309]' : 'text-[#047857]'}`}>
                {outOfStock ? 'Out of stock' : m.stock < 15 ? `Only ${m.stock} left` : 'In stock'}
              </p>
            </div>

            {m.rxRequired && (
              <div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFE4E6] flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">medical_information</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-body-strong text-body-strong text-[#8E0E17]">Valid prescription required</h2>
                  <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                    You can add it to your cart now; we&apos;ll ask for a prescription from your health locker or a new upload at checkout.
                  </p>
                  <Link href="/medicines/upload" className="inline-flex items-center gap-1 mt-2 text-primary font-caption-strong text-caption underline decoration-primary underline-offset-2 hover:opacity-80">
                    <span className="material-symbols-outlined text-[16px]">upload_file</span>Upload prescription now
                  </Link>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); setDelivery(deliveryEstimate(pincode)); }}
              className="bg-surface-container-lowest border border-surface-variant rounded-xl p-3.5"
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <label className="flex items-center gap-2 flex-1 min-w-[180px]">
                  <span className="material-symbols-outlined text-outline text-[20px]">local_shipping</span>
                  <span className="sr-only">Delivery pincode</span>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setDelivery(null); }}
                    className="w-28 bg-transparent border-0 border-b border-surface-variant focus:border-primary-container p-0 text-body-strong text-on-surface focus:ring-0 focus:outline-none tabular-nums"
                    placeholder="Pincode"
                  />
                  <button type="submit" className="text-primary font-caption-strong text-caption hover:underline">Check</button>
                </label>
                {delivery && (
                  <span className={`font-caption-strong text-caption flex items-center gap-1 ${delivery.ok ? 'text-[#047857]' : 'text-[#8E0E17]'}`} role="status">
                    <span className="material-symbols-outlined text-[16px]">{delivery.ok ? 'bolt' : 'error'}</span>{delivery.text}
                  </span>
                )}
              </div>
            </form>

            <div className="hidden lg:flex flex-col gap-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-surface-variant rounded-lg bg-surface-container-lowest h-12 px-2">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <span className="w-8 text-center font-body-strong text-body-strong text-on-surface tabular-nums">{qty}</span>
                  <button type="button" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty} aria-label="Increase quantity" className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface disabled:opacity-40">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
                <button type="button" onClick={() => add(false)} disabled={outOfStock} className="flex-1 h-12 bg-primary-container text-on-primary rounded-lg font-body-strong text-body-strong flex items-center justify-center gap-2 hover:bg-[#8E0E17] disabled:bg-[#A8A29E] transition-all duration-150 shadow-sm active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>Add to Cart
                </button>
              </div>
              <button type="button" onClick={() => add(true)} disabled={outOfStock} className="w-full h-12 bg-surface-container-lowest border border-primary-container text-primary rounded-lg font-body-strong text-body-strong hover:bg-[#FFF1F2] disabled:opacity-50 transition-colors duration-150">
                Buy Now
              </button>
              {inCart > 0 && (
                <Link href="/cart" className="text-center font-caption-strong text-caption text-primary-container hover:underline">{inCart} in your cart · Go to cart</Link>
              )}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 border-t border-surface-variant pt-3 px-1 text-outline font-micro text-micro">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">lock</span>Genuine &amp; sealed</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">replay</span>7-day returns (unopened)</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">ac_unit</span>Cold-chain safe</span>
            </div>
          </div>
        </section>

        {/* SUB-NAVIGATION */}
        <nav aria-label="On this page" className="sticky top-16 z-30 bg-surface border-b border-surface-variant mb-space-xl -mx-margin sm:-mx-margin-desktop px-margin sm:px-margin-desktop">
          <div className="max-w-[1200px] mx-auto flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-on-surface-variant hover:text-primary font-body-default text-body-default pb-1 whitespace-nowrap transition-colors">{s.label}</a>
            ))}
          </div>
        </nav>

        <div className="space-y-space-xl">
          <section id="about" className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32">
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">About {m.name}</h2>
            <p className="text-body-default font-body-default text-on-surface-variant mt-2 leading-relaxed max-w-4xl">{m.description}</p>
            {(m.uses?.length ?? 0) > 0 && (
              <div id="uses" className="mt-6 scroll-mt-32">
                <h3 className="text-headline-h3 font-headline-h3 text-on-surface">Uses</h3>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {m.uses!.map((u) => (
                    <li key={u} className="flex items-start gap-2 text-body-default font-body-default text-on-surface">
                      <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5">check_circle</span>{u}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {m.howToUse && (
            <section id="how-to-use" className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">How to use</h2>
              <p className="text-body-default font-body-default text-on-surface-variant mt-2 leading-relaxed max-w-4xl">{m.howToUse}</p>
              {m.storage && <p className="text-caption font-caption text-outline mt-3">Storage: {m.storage}</p>}
            </section>
          )}

          {(m.sideEffects?.length ?? 0) > 0 && (
            <section id="side-effects" className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Side effects</h2>
              <p className="text-caption font-caption text-on-surface-variant mt-1">Most are mild and settle as your body adjusts. Contact your doctor if they persist or worsen.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {m.sideEffects!.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-variant text-caption-strong font-caption-strong text-on-surface">{s}</span>
                ))}
              </div>
            </section>
          )}

          {(m.safetyAdvice?.length ?? 0) > 0 && (
            <section id="safety-advice" className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Safety advice</h2>
              <ul className="mt-3 space-y-2">
                {m.safetyAdvice!.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-body-default font-body-default text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-[#B45309] mt-0.5">warning</span>{s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="substitutes" className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg scroll-mt-32">
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Substitute medicines</h2>
            <p className="text-caption font-caption text-on-surface-variant mt-1">Same composition, strength and form. Always check with your doctor or pharmacist before switching.</p>
            {substitutes.length === 0 ? (
              <p className="text-body-default font-body-default text-on-surface-variant mt-3">No substitutes with this exact composition are stocked right now.</p>
            ) : (
              <div className="mt-4 divide-y divide-surface-variant border border-surface-variant rounded-lg">
                {substitutes.map((s) => (
                  <Link key={s.slug} href={`/medicines/${s.slug}`} className="flex items-center justify-between gap-3 p-3 hover:bg-surface-container-low">
                    <div className="min-w-0">
                      <p className="font-body-strong text-body-strong text-on-surface truncate">{s.name}</p>
                      <p className="font-caption text-caption text-outline truncate">{s.manufacturer}</p>
                    </div>
                    <span className="font-body-strong text-body-strong text-on-surface shrink-0">{rupees(s.price)}</span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {similar.length > 0 && (
            <section className="space-y-space-base">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Frequently bought in {categoryName ?? 'this category'}</h2>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-space-base">
                {similar.slice(0, 4).map((s) => <MedicineCard key={s.slug} medicine={s} onAdded={(n) => showToast(`${n} added to cart`)} />)}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile sticky action bar */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-surface-container-lowest border-t border-surface-variant px-4 py-3 flex items-center gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="min-w-0">
          <p className="font-headline-h3 text-headline-h3 text-on-surface">{rupees(m.price)}</p>
          {inCart > 0 ? <Link href="/cart" className="font-micro text-micro text-primary-container underline">{inCart} in cart</Link> : m.mrp > m.price && <p className="font-micro text-micro text-outline line-through">MRP {rupees(m.mrp)}</p>}
        </div>
        <button type="button" onClick={() => add(false)} disabled={outOfStock} className="flex-1 h-11 border border-primary-container text-primary rounded-lg font-body-strong text-body-strong disabled:opacity-50">Add</button>
        <button type="button" onClick={() => add(true)} disabled={outOfStock} className="flex-1 h-11 bg-primary-container text-on-primary rounded-lg font-body-strong text-body-strong disabled:bg-[#A8A29E]">Buy now</button>
      </div>
      <Toast message={toast} />
      <Footer />
    </>
  );
}
