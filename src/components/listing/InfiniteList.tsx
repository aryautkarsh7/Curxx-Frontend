'use client';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

type Props<T> = {
  /** The server-rendered page (page `page` of `pages`). */
  initial: T[];
  page: number;
  pages: number;
  /** Loads one more page in the browser (same query, next page number). */
  load: (page: number) => Promise<T[]>;
  render: (items: T[]) => ReactNode;
  /** The address of a page, e.g. "/mumbai/dentist?page=3": crawlable links and the no-JavaScript fallback. */
  pageHref: (page: number) => string;
  /** "doctors", "hospitals"… */
  noun: string;
};

/**
 * Practo-style infinite scroll that stays crawlable: the first page is rendered on the server, the next
 * pages load as the reader nears the bottom, and "Load more" is a real link to ?page=N+1 (rel="next"), so
 * crawlers and readers without JavaScript page through normally. Pages after the first link back too.
 */
export default function InfiniteList<T>({
  initial,
  page,
  pages,
  load,
  render,
  pageHref,
  noun,
}: Props<T>) {
  const [items, setItems] = useState(initial);
  const [last, setLast] = useState(page);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const sentinel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  // New filters or a new page from the server: start again from it.
  useEffect(() => {
    setItems(initial);
    setLast(page);
    setState('idle');
  }, [initial, page]);

  const more = last < pages;
  const loadMore = useCallback(async () => {
    if (busy.current || last >= pages) return;
    busy.current = true;
    setState('loading');
    try {
      const next = await load(last + 1);
      setItems((xs) => [...xs, ...next]);
      setLast((n) => n + 1);
      setState('idle');
    } catch {
      setState('error');
    } finally {
      busy.current = false;
    }
  }, [last, pages, load]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !more || state !== 'idle' || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void loadMore();
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [more, state, loadMore]);

  return (
    <>
      {render(items)}
      <div ref={sentinel} aria-hidden="true" />
      {state === 'loading' && (
        <p
          role="status"
          className="flex items-center justify-center gap-2 py-4 text-caption font-caption text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
          Loading more {noun}…
        </p>
      )}
      {state === 'error' && (
        <p role="alert" className="py-3 text-center text-caption font-caption text-[#8E0E17]">
          Couldn’t load more {noun}.{' '}
          <button type="button" onClick={() => void loadMore()} className="underline">
            Try again
          </button>
        </p>
      )}
      {(more || page > 1) && (
        <nav aria-label="More results" className="flex items-center justify-center gap-3 pt-2">
          {page > 1 && (
            <a
              href={pageHref(page - 1)}
              rel="prev"
              className="h-10 px-4 rounded-lg border border-[#E7E5E4] text-caption-strong font-caption-strong text-on-surface-variant hover:bg-[#FAFAF9] inline-flex items-center"
            >
              Previous page
            </a>
          )}
          {more && state !== 'loading' && (
            <a
              href={pageHref(last + 1)}
              rel="next"
              onClick={(e) => {
                e.preventDefault();
                void loadMore();
              }}
              className="h-10 px-5 rounded-lg border border-[#C1121F] text-[#C1121F] text-caption-strong font-caption-strong hover:bg-[#FFF1F2] inline-flex items-center"
            >
              Load more {noun}
            </a>
          )}
        </nav>
      )}
    </>
  );
}

/** ?page=N on the current listing address (other parameters kept; page 1 has none). */
export function withPage(pathname: string, search: string, page: number) {
  const params = new URLSearchParams(search);
  if (page <= 1) params.delete('page');
  else params.set('page', String(page));
  const qs = params.toString();
  return `${pathname}${qs ? `?${qs}` : ''}`;
}
