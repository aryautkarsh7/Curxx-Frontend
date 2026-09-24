'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MedicineCard from '@/components/pharmacy/MedicineCard';
import Toast, { useToast } from '@/components/Toast';
import { api, type Address, type Medicine, type MedicineCategory, type MedicineQuery, type Paged } from '@/lib/api';
import { useCart } from '@/lib/cart';
import type { Feature } from '@/lib/content-types';
import { getToken, useSession } from '@/lib/session';

type Props = {
  categories: MedicineCategory[];
  results: Paged<Medicine>;
  deals: Medicine[];
  query: MedicineQuery;
  /** Editable in the admin panel (Page content → medicines). */
  popularSearches: string[];
  trust: Feature[];
};

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most popular' },
  { value: 'discount', label: 'Biggest discount' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];
/** Trust strip icon colours, by the tone set in the admin panel. */
const TONES: Record<NonNullable<Feature['tone']>, string> = {
  tertiary: 'bg-tertiary-container/10 text-tertiary-container',
  primary: 'bg-surface-container-high text-primary-container',
  neutral: 'bg-surface-container-high text-outline',
};

/** Deals refresh at midnight, so the countdown runs to the end of today. */
function useMidnightCountdown() {
  const [left, setLeft] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
      const pad = (n: number) => String(n).padStart(2, '0');
      setLeft(`${pad(Math.floor(s / 3600))}h : ${pad(Math.floor((s % 3600) / 60))}m : ${pad(s % 60)}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export default function MedicineStore({ categories, results, deals, query, popularSearches, trust }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const cart = useCart();
  const session = useSession();
  const [toast, showToast] = useToast();
  const [search, setSearch] = useState(query.q ?? '');
  const [address, setAddress] = useState<Address | null>(null);
  const [reorder, setReorder] = useState<Medicine[]>([]);
  const countdown = useMidnightCountdown();

  useEffect(() => {
    setSearch(query.q ?? '');
  }, [query.q]);

  // Signed-in extras: default delivery address and "buy again" from past orders.
  useEffect(() => {
    const token = getToken();
    if (!session.signedIn || !token) {
      setAddress(null);
      setReorder([]);
      return;
    }
    let live = true;
    api.addresses(token).then(({ addresses }) => live && setAddress(addresses.find((a) => a.isDefault) ?? addresses[0] ?? null)).catch(() => {});
    api.orders(token, 'pharmacy').then(async ({ orders }) => {
      const slugs = [...new Set(orders.flatMap((o) => o.items.map((i) => i.slug)))].slice(0, 4);
      const products = await Promise.all(slugs.map((slug) => api.medicine(slug).then((r) => r.medicine).catch(() => null)));
      if (live) setReorder(products.filter((p): p is Medicine => p !== null));
    }).catch(() => {});
    return () => {
      live = false;
    };
  }, [session.signedIn]);

  const categoryName = (slug?: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
  const featured = categories.filter((c) => c.featured);
  const conditions = categories.filter((c) => !c.featured && c.slug !== 'deals');
  const filtered = Boolean(query.category || query.q || query.rx);
  const heading = query.q ? `Results for “${query.q}”` : query.category ? categoryName(query.category) : 'All medicines & essentials';

  function update(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    next.delete('page');
    const qs = next.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}#results`, { scroll: false });
  }

  function runSearch() {
    const q = search.trim();
    update((p) => {
      if (q) p.set('q', q);
      else p.delete('q');
    });
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  }

  function goToPage(page: number) {
    const next = new URLSearchParams(params.toString());
    if (page <= 1) next.delete('page');
    else next.set('page', String(page));
    router.push(`${pathname}?${next.toString()}#results`);
  }

  return (
    <>
      <Header />
      {/* UTILITY DELIVERY BAR */}
      <section className="bg-surface-container-low border-b border-surface-variant">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop min-h-11 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-caption font-caption">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-outline text-base">location_on</span>
            <span className="text-on-surface-variant">Deliver to</span>
            <span className="font-body-strong text-caption-strong text-on-surface truncate">
              {address ? `${address.pincode} ${address.area || address.city || 'Bengaluru'}` : 'Bengaluru'}
            </span>
            <Link href="/account?tab=addresses" className="text-primary-container font-caption-strong hover:underline ml-1 shrink-0">
              {address ? 'Change' : 'Add address'}
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-space-lg">
            <div className="hidden sm:flex items-center gap-2 text-tertiary font-caption-strong">
              <span className="w-2 h-2 rounded-full bg-tertiary-container pulse-dot"></span>
              <span>Express 2-Hour Delivery Active</span>
            </div>
            <Link href="/cart" className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest border border-surface-variant rounded-lg text-on-surface hover:border-outline-variant transition duration-150 shadow-sm active:scale-95">
              <span className="material-symbols-outlined text-base text-primary-container">shopping_bag</span>
              <span className="font-caption-strong">{cart.count} {cart.count === 1 ? 'item' : 'items'} · ₹{cart.total.toLocaleString('en-IN')}</span>
            </Link>
          </div>
        </div>
      </section>

      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl space-y-space-2xl">
        {/* HERO */}
        <section className="bg-surface rounded-2xl border border-surface-variant p-space-lg sm:p-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center shadow-sm">
          <div className="lg:col-span-7 space-y-space-base">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/40 border border-outline-variant text-primary font-caption-strong text-micro">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>VERIFIED PHARMACY · 2-HR EXPRESS DISPATCH</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-display font-display text-on-surface tracking-tight">
                Genuine medicines, <br /><span className="text-primary-container">delivered in 2 hours.</span>
              </h1>
              <p className="text-body-default font-body-default text-on-surface-variant max-w-lg">
                Authentic medicines, healthcare devices &amp; daily wellness essentials sourced directly from licensed manufacturers.
              </p>
            </div>
            <form
              role="search"
              onSubmit={(e) => { e.preventDefault(); runSearch(); }}
              className="bg-surface-container-lowest border border-surface-variant rounded-xl p-2 flex items-center gap-2 shadow-sm focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/10 transition duration-150"
            >
              <span className="material-symbols-outlined text-outline ml-2 text-xl pointer-events-none">search</span>
              <input
                className="w-full min-w-0 h-11 bg-transparent border-none text-body-default font-body-default text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search medicines"
                placeholder="Search medicines, salts, health products…"
                type="search"
              />
              <button type="submit" className="h-11 px-4 sm:px-6 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg shadow-sm transition duration-150 active:scale-95 shrink-0">
                Search
              </button>
            </form>
            {popularSearches.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-caption font-caption text-outline">Popular searches:</span>
              {popularSearches.map((term) => (
                <Link key={term} href={`/medicines?q=${encodeURIComponent(term)}#results`} className="px-3 py-1 bg-surface-container-lowest border border-surface-variant hover:border-outline-variant rounded-full text-caption font-caption text-on-surface transition duration-150">
                  {term}
                </Link>
              ))}
            </div>
            )}
          </div>
          <div className="lg:col-span-5 bg-surface-container-lowest border-2 border-dashed border-primary-container/40 rounded-2xl p-space-lg space-y-space-base shadow-sm">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-error-container/40 flex items-center justify-center text-primary-container shrink-0">
                <span className="material-symbols-outlined text-2xl">prescriptions</span>
              </div>
              <div>
                <h2 className="text-headline-h3 font-headline-h3 text-on-surface">Upload prescription, we&apos;ll do the rest</h2>
                <p className="text-caption font-caption text-on-surface-variant mt-1 leading-relaxed">
                  A licensed pharmacist verifies your Rx, adds the medicines to your cart and calls to confirm within 10 minutes.
                </p>
              </div>
            </div>
            <div className="space-y-space-sm pt-2">
              <Link href="/medicines/upload" className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg flex items-center justify-center gap-2 shadow-sm transition duration-150 active:scale-95">
                <span className="material-symbols-outlined text-xl">upload_file</span>
                <span>Upload Prescription</span>
              </Link>
              <p className="text-center text-micro font-micro text-outline">JPG, PNG, HEIC or PDF up to 10MB · 100% confidential</p>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        {trust.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
          {trust.map((t) => (
            <div key={t.title} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-space-base flex items-center gap-3 shadow-sm">
              <div className={`w-11 h-11 rounded-lg ${TONES[t.tone ?? 'neutral'] ?? TONES.neutral} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-2xl">{t.icon}</span>
              </div>
              <div>
                <h3 className="text-caption-strong font-caption-strong text-on-surface">{t.title}</h3>
                <p className="text-caption font-caption text-on-surface-variant">{t.body}</p>
              </div>
            </div>
          ))}
        </section>
        )}

        {/* CATEGORY GRID */}
        <section className="space-y-space-base">
          <div>
            <span className="text-micro font-micro text-outline uppercase tracking-wider font-semibold">EXPLORE CATALOGUE</span>
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-base">
            {featured.map((c) => (
              <Link
                key={c.slug}
                href={`/medicines?category=${c.slug}#results`}
                aria-current={query.category === c.slug ? 'page' : undefined}
                className={`group bg-surface-container-lowest border rounded-xl p-space-base transition duration-150 hover:shadow-sm ${query.category === c.slug ? 'border-primary-container ring-1 ring-primary-container' : 'border-surface-variant hover:border-primary-container/50'}`}
              >
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-3 group-hover:scale-105 transition-transform duration-150">
                  <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                </div>
                <h3 className="text-body-strong font-body-strong text-on-surface">{c.name}</h3>
                <p className="text-caption font-caption text-on-surface-variant">{c.count} {c.count === 1 ? 'product' : 'products'}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="space-y-space-base scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-micro font-micro text-on-surface-variant uppercase tracking-wider font-semibold">{filtered ? 'CATALOGUE RESULTS' : 'BROWSE'}</span>
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface mt-0.5">{heading}</h2>
              <p className="text-caption font-caption text-on-surface-variant">{results.total} {results.total === 1 ? 'product' : 'products'}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(['otc', 'required'] as const).map((rx) => (
                <button
                  key={rx}
                  type="button"
                  onClick={() => update((p) => (p.get('rx') === rx ? p.delete('rx') : p.set('rx', rx)))}
                  aria-pressed={query.rx === rx}
                  className={`h-9 px-3 rounded-full border text-caption-strong font-caption-strong transition ${query.rx === rx ? 'bg-[#FFF1F2] border-primary-container text-primary-container' : 'bg-surface-container-lowest border-surface-variant text-on-surface-variant hover:border-outline'}`}
                >
                  {rx === 'otc' ? 'No prescription needed' : 'Rx medicines'}
                </button>
              ))}
              <label className="relative">
                <span className="sr-only">Sort products</span>
                <select
                  value={query.sort ?? 'popular'}
                  onChange={(e) => update((p) => (e.target.value === 'popular' ? p.delete('sort') : p.set('sort', e.target.value)))}
                  className="h-9 appearance-none bg-surface-container-lowest border border-surface-variant rounded-full pl-3 pr-8 text-caption-strong font-caption-strong text-on-surface focus:outline-none focus:border-primary-container cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <span className="material-symbols-outlined text-[16px] text-outline absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">unfold_more</span>
              </label>
              {filtered && (
                <Link href="/medicines#results" className="h-9 px-3 inline-flex items-center rounded-full text-caption-strong font-caption-strong text-primary-container hover:underline">Clear filters</Link>
              )}
            </div>
          </div>

          {results.items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-surface-variant bg-surface-container-lowest p-8 text-center">
              <p className="text-body-strong font-body-strong text-on-surface">No products match {query.q ? `“${query.q}”` : 'these filters'}</p>
              <p className="text-caption font-caption text-on-surface-variant mt-1">Try a salt name (e.g. paracetamol) or upload your prescription and our pharmacist will source it for you.</p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Link href="/medicines/upload" className="h-10 px-4 inline-flex items-center rounded-lg bg-primary-container hover:bg-primary text-on-primary font-caption-strong text-caption-strong">Upload Prescription</Link>
                <Link href="/medicines#results" className="h-10 px-4 inline-flex items-center rounded-lg border border-surface-variant text-on-surface font-caption-strong text-caption-strong hover:bg-surface-container-low">Browse all</Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {results.items.map((m) => <MedicineCard key={m.slug} medicine={m} onAdded={(n) => showToast(`${n} added to cart`)} />)}
            </div>
          )}

          {results.pages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-2 flex-wrap">
              <button type="button" disabled={results.page <= 1} onClick={() => goToPage(results.page - 1)} className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface-variant hover:bg-surface-container transition disabled:opacity-40">Previous</button>
              {Array.from({ length: results.pages }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" onClick={() => goToPage(n)} aria-current={n === results.page ? 'page' : undefined} className={n === results.page ? 'w-9 h-9 bg-primary-container text-white font-caption-strong text-caption rounded-lg' : 'w-9 h-9 border border-surface-variant text-on-surface font-caption-strong text-caption rounded-lg hover:bg-surface-container'}>{n}</button>
              ))}
              <button type="button" disabled={results.page >= results.pages} onClick={() => goToPage(results.page + 1)} className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface hover:bg-surface-container transition disabled:opacity-40">Next</button>
            </nav>
          )}
        </section>

        {/* BUY AGAIN (signed in, from past orders) */}
        {reorder.length > 0 && (
          <section className="space-y-space-base">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Reorder Your Medicines</h2>
                  <span className="px-2 py-0.5 bg-tertiary-container/15 text-tertiary-container font-caption-strong text-micro rounded">From your orders</span>
                </div>
                <p className="text-caption font-caption text-on-surface-variant mt-0.5">One-tap reordering from your recent purchases</p>
              </div>
              <Link href="/orders" className="text-primary-container font-caption-strong text-caption hover:underline flex items-center gap-1">
                <span>View all orders</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-space-base">
              {reorder.map((m) => <MedicineCard key={m.slug} medicine={m} onAdded={(n) => showToast(`${n} added to cart`)} />)}
            </div>
          </section>
        )}

        {/* DEALS OF THE DAY */}
        {deals.length > 0 && (
          <section className="space-y-space-base">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Deals of the Day</h2>
                {countdown && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-error-container/50 border border-outline-variant rounded-full text-primary-container font-caption-strong text-caption tabular-nums" role="timer">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span>Ends in {countdown}</span>
                  </div>
                )}
              </div>
              <Link href="/medicines?category=deals#results" className="text-primary-container font-caption-strong text-caption hover:underline flex items-center gap-1">
                <span>View All Deals</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-space-base">
              {deals.map((m) => <MedicineCard key={m.slug} medicine={m} variant="deal" onAdded={(n) => showToast(`${n} added to cart`)} />)}
            </div>
          </section>
        )}

        {/* SHOP BY HEALTH CONDITION */}
        <section className="space-y-space-base">
          <div>
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Shop by Health Condition</h2>
            <p className="text-caption font-caption text-on-surface-variant mt-0.5">Therapies and daily essentials, grouped the way doctors prescribe them</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {conditions.map((c) => (
              <Link
                key={c.slug}
                href={`/medicines?category=${c.slug}#results`}
                className={`flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border rounded-full text-caption-strong transition duration-150 shadow-sm ${query.category === c.slug ? 'border-primary-container text-primary-container' : 'border-surface-variant text-on-surface hover:border-primary-container/60 hover:text-primary-container'}`}
              >
                <span className="material-symbols-outlined text-base text-outline">{c.icon}</span>
                <span>{c.name}</span>
                <span className="text-micro font-micro text-outline">{c.count}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* PRESCRIPTION CTA */}
        <section className="bg-surface rounded-2xl border border-surface-variant p-space-lg sm:p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg shadow-sm">
          <div className="flex items-start gap-space-lg max-w-2xl">
            <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-3xl">receipt_long</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Have a prescription? Order in 30 seconds</h2>
              <p className="text-body-default font-body-default text-on-surface-variant leading-relaxed">
                Upload your doctor&apos;s note or ABHA e-prescription. A registered pharmacist reviews it, prepares your cart and coordinates doorstep delivery.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto flex-col sm:flex-row">
            <Link href="/medicines/upload" className="w-full sm:w-auto h-12 px-6 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg shadow-sm transition duration-150 active:scale-95 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">upload_file</span>
              <span>Upload Prescription Now</span>
            </Link>
            <a className="w-full sm:w-auto h-12 px-5 bg-surface-container-lowest hover:bg-surface-container border border-surface-variant rounded-lg text-on-surface font-body-strong text-body-default flex items-center justify-center gap-2 transition duration-150" href="tel:18002879963">
              <span className="material-symbols-outlined text-lg text-primary-container">call</span>
              <span>1800-287-9963</span>
            </a>
          </div>
        </section>
      </main>

      {/* Floating cart bar on phones once something is in the cart */}
      {cart.count > 0 && (
        <Link href="/cart" className="lg:hidden fixed bottom-20 inset-x-4 z-40 h-12 rounded-xl bg-primary-container text-white shadow-[0_6px_20px_rgba(28,25,23,0.28)] flex items-center justify-between px-4 active:scale-[0.99] transition">
          <span className="font-caption-strong text-caption-strong">{cart.count} {cart.count === 1 ? 'item' : 'items'} · ₹{cart.total.toLocaleString('en-IN')}</span>
          <span className="flex items-center gap-1 font-body-strong text-body-strong">View cart <span className="material-symbols-outlined text-[18px]">arrow_forward</span></span>
        </Link>
      )}
      <Toast message={toast} />
      <Footer />
    </>
  );
}
