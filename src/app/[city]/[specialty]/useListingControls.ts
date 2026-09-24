'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { MouseEvent } from 'react';

export type ListingFilters = {
  mode?: 'clinic' | 'video';
  area?: string;
  language?: string;
  availability?: 'today' | 'tomorrow' | 'next-7-days';
  maxFee?: number;
  minExperience?: number;
  free?: boolean;
};

/** URL-driven filters, sort, pagination and card navigation for the doctor listing. */
export function useListingControls() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const page = Number(params.get('page')) || 1;
  const sort = params.get('sort') ?? 'relevance';

  const filters: ListingFilters = {
    mode: (params.get('mode') as ListingFilters['mode']) ?? undefined,
    area: params.get('area') ?? undefined,
    language: params.get('language') ?? undefined,
    availability: (params.get('availability') as ListingFilters['availability']) ?? undefined,
    maxFee: Number(params.get('maxFee')) || undefined,
    minExperience: Number(params.get('minExperience')) || undefined,
    free: params.get('free') === 'true' || undefined,
  };

  function navigate(mutate: (p: URLSearchParams) => void, { keepScroll = true } = {}) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: !keepScroll });
  }

  /** Sets a filter, or clears it when the same value is chosen again. Always resets paging. */
  function setParam(key: string, value: string | number | undefined) {
    navigate((p) => {
      const next = value === undefined || value === '' ? null : String(value);
      if (next === null || p.get(key) === next) p.delete(key);
      else p.set(key, next);
      p.delete('page');
    });
  }

  return {
    page,
    sort,
    filters,
    setParam,
    setSort: (value: string) => navigate((p) => { value === 'relevance' ? p.delete('sort') : p.set('sort', value); p.delete('page'); }),
    setAvailability: (value: string) => setParam('availability', value),
    // Keeps a search query (?q=fever) — it defines the page rather than filtering it.
    clearFilters: () => router.replace(params.get('q') ? `${pathname}?q=${encodeURIComponent(params.get('q')!)}` : pathname, { scroll: false }),
    goToPage: (n: number) => navigate((p) => (n <= 1 ? p.delete('page') : p.set('page', String(n))), { keepScroll: false }),

    /** Card-level navigation that ignores clicks on the card's own links and buttons. */
    openDoctor: (href: string) => (e: MouseEvent<HTMLElement>) => {
      if (!(e.target as HTMLElement).closest('a, button, input, label, select')) router.push(href);
    },
  };
}
