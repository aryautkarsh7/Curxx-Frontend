'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent, MouseEvent } from 'react';

const toSlug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** URL-driven filters, availability, pagination and card navigation for the doctor listing. */
export function useListingControls() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const page = Number(params.get('page')) || 1;

  function navigate(mutate: (p: URLSearchParams) => void, { keepScroll = true } = {}) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: !keepScroll });
  }

  // Delegated from the filter sidebar: every checkbox/radio/select change becomes a ?filter= value.
  function onFilterChange(e: FormEvent<HTMLElement>) {
    const input = e.target as HTMLInputElement | HTMLSelectElement;
    const label = input.closest('label')?.textContent?.trim() || input.value;
    if (!label) return;
    const value = toSlug(label);
    const checked = input instanceof HTMLInputElement && (input.type === 'checkbox' || input.type === 'radio') ? input.checked : true;
    navigate((p) => {
      const values = p.getAll('filter').filter((v) => v !== value);
      p.delete('filter');
      p.delete('page');
      for (const v of checked ? [...values, value] : values) p.append('filter', v);
    });
  }

  const setAvailability = (value: string) => navigate((p) => { p.set('availability', value); p.delete('page'); });
  const clearFilters = () => router.replace(pathname, { scroll: false });
  const goToPage = (n: number) => navigate((p) => (n <= 1 ? p.delete('page') : p.set('page', String(n))), { keepScroll: false });

  /** Card-level navigation that ignores clicks on the card's own links and buttons. */
  const openDoctor = (href: string) => (e: MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest('a, button, input, label, select')) router.push(href);
  };

  return { page, onFilterChange, setAvailability, clearFilters, goToPage, openDoctor };
}
