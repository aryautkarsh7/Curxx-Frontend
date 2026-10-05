'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MedicineCard from '@/components/pharmacy/MedicineCard';
import type { Medicine, MedicineCategory, MedicineQuery, Paged } from '@/lib/api';
import { count } from '@/lib/plural';

type Props = {
  categories: MedicineCategory[];
  results: Paged<Medicine>;
  query: MedicineQuery;
  /** Editable in the admin panel (Page content → medicines). */
  popularSearches: string[];
};

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most popular' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];

export default function MedicineStore({ categories, results, query, popularSearches }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [search, setSearch] = useState(query.q ?? '');
  useEffect(() => {
    setSearch(query.q ?? '');
  }, [query.q]);

  const categoryName = (slug?: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
  const featured = categories.filter((c) => c.featured && c.slug !== 'deals');
  const conditions = categories.filter((c) => !c.featured && c.slug !== 'deals');
  const filtered = Boolean(query.category || query.q || query.rx);
  const heading = query.q
    ? `Results for “${query.q}”`
    : query.category
      ? categoryName(query.category)
      : 'All medicines';

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
      <main className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl space-y-space-2xl">
        {/* HERO */}
        <section className="bg-surface rounded-2xl border border-surface-variant p-space-lg sm:p-space-xl space-y-space-base shadow-sm">
          <div className="space-y-2">
            <h1 className="text-display font-display text-on-surface tracking-tight">
              Medicine information
            </h1>
            <p className="text-body-default font-body-default text-on-surface-variant max-w-2xl">
              Browse medicines and check their uses, side effects, composition and substitutes. This
              is an information page: Curxx does not sell or deliver medicines.
            </p>
          </div>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
            className="bg-surface-container-lowest border border-surface-variant rounded-xl p-2 flex items-center gap-2 shadow-sm focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/10 transition duration-150 max-w-2xl"
          >
            <span className="material-symbols-outlined text-outline ml-2 text-xl pointer-events-none">
              search
            </span>
            <input
              className="w-full min-w-0 h-11 bg-transparent border-none text-body-default font-body-default text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search medicines"
              placeholder="Search a medicine or salt, e.g. paracetamol"
              type="search"
            />
            <button
              type="submit"
              className="h-11 px-4 sm:px-6 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg shadow-sm transition duration-150 active:scale-95 shrink-0"
            >
              Search
            </button>
          </form>
          {popularSearches.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-caption font-caption text-outline">Popular searches:</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/medicines?q=${encodeURIComponent(term)}#results`}
                  className="px-3 py-1 bg-surface-container-lowest border border-surface-variant hover:border-outline-variant rounded-full text-caption font-caption text-on-surface transition duration-150"
                >
                  {term}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* CATEGORY GRID */}
        <section className="space-y-space-base">
          <div>
            <span className="text-micro font-micro text-outline uppercase tracking-wider font-semibold">
              BROWSE
            </span>
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
              Browse by category
            </h2>
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
                <p className="text-caption font-caption text-on-surface-variant">
                  {count(c.count, 'medicine')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="space-y-space-base scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-micro font-micro text-on-surface-variant uppercase tracking-wider font-semibold">
                {filtered ? 'RESULTS' : 'ALL MEDICINES'}
              </span>
              <h2 className="text-headline-h2 font-headline-h2 text-on-surface mt-0.5">
                {heading}
              </h2>
              <p className="text-caption font-caption text-on-surface-variant">
                {count(results.total, 'medicine')}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(['otc', 'required'] as const).map((rx) => (
                <button
                  key={rx}
                  type="button"
                  onClick={() =>
                    update((p) => (p.get('rx') === rx ? p.delete('rx') : p.set('rx', rx)))
                  }
                  aria-pressed={query.rx === rx}
                  className={`h-9 px-3 rounded-full border text-caption-strong font-caption-strong transition ${query.rx === rx ? 'bg-[#FFF1F2] border-primary-container text-primary-container' : 'bg-surface-container-lowest border-surface-variant text-on-surface-variant hover:border-outline'}`}
                >
                  {rx === 'otc' ? 'No prescription needed' : 'Rx medicines'}
                </button>
              ))}
              <label className="relative">
                <span className="sr-only">Sort medicines</span>
                <select
                  value={query.sort ?? 'popular'}
                  onChange={(e) =>
                    update((p) =>
                      e.target.value === 'popular'
                        ? p.delete('sort')
                        : p.set('sort', e.target.value),
                    )
                  }
                  className="h-9 appearance-none bg-surface-container-lowest border border-surface-variant rounded-full pl-3 pr-8 text-caption-strong font-caption-strong text-on-surface focus:outline-none focus:border-primary-container cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-[16px] text-outline absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  unfold_more
                </span>
              </label>
              {filtered && (
                <Link
                  href="/medicines#results"
                  className="h-9 px-3 inline-flex items-center rounded-full text-caption-strong font-caption-strong text-primary-container hover:underline"
                >
                  Clear filters
                </Link>
              )}
            </div>
          </div>

          {results.items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-surface-variant bg-surface-container-lowest p-8 text-center">
              <p className="text-body-strong font-body-strong text-on-surface">
                No medicines match {query.q ? `“${query.q}”` : 'these filters'}
              </p>
              <p className="text-caption font-caption text-on-surface-variant mt-1">
                Try the salt name, for example paracetamol, or browse all medicines.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Link
                  href="/medicines#results"
                  className="h-10 px-4 inline-flex items-center rounded-lg border border-surface-variant text-on-surface font-caption-strong text-caption-strong hover:bg-surface-container-low"
                >
                  Browse all
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {results.items.map((m) => (
                <MedicineCard key={m.slug} medicine={m} />
              ))}
            </div>
          )}

          {results.pages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex items-center justify-center gap-2 pt-2 flex-wrap"
            >
              <button
                type="button"
                disabled={results.page <= 1}
                onClick={() => goToPage(results.page - 1)}
                className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface-variant hover:bg-surface-container transition disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: results.pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-current={n === results.page ? 'page' : undefined}
                  className={
                    n === results.page
                      ? 'w-9 h-9 bg-primary-container text-white font-caption-strong text-caption rounded-lg'
                      : 'w-9 h-9 border border-surface-variant text-on-surface font-caption-strong text-caption rounded-lg hover:bg-surface-container'
                  }
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={results.page >= results.pages}
                onClick={() => goToPage(results.page + 1)}
                className="px-3.5 py-2 border border-surface-variant rounded-lg font-caption-strong text-caption text-on-surface hover:bg-surface-container transition disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </section>

        {/* BY HEALTH CONDITION */}
        <section className="space-y-space-base">
          <div>
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
              Browse by health condition
            </h2>
            <p className="text-caption font-caption text-on-surface-variant mt-0.5">
              Medicines grouped by the condition they are used for
            </p>
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

        <p className="text-caption font-caption text-outline max-w-3xl">
          The information here is for learning, not a substitute for medical advice. Talk to your
          doctor before you start, stop or change a medicine.
        </p>
      </main>

      <Footer />
    </>
  );
}
