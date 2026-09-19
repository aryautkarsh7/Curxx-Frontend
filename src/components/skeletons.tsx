import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// Page-shaped placeholders shown by each route's loading.tsx while server data is in flight.
const PULSE = 'bg-surface-container animate-pulse';

export function SkeletonLine({ className = 'w-full' }: { className?: string }) {
  return <div className={`h-3 rounded ${PULSE} ${className}`} />;
}

export function SkeletonBlock({ className = 'h-40 w-full' }: { className?: string }) {
  return <div className={`rounded-xl ${PULSE} ${className}`} />;
}

export function PageSkeleton({ children, label = 'Loading' }: { children: ReactNode; label?: string }) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-xl" aria-busy="true" aria-live="polite">
        <span className="sr-only">{label}…</span>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function CardGridSkeleton({ count = 6, columns = 'sm:grid-cols-2 lg:grid-cols-3' }: { count?: number; columns?: string }) {
  return (
    <div className={`grid grid-cols-1 ${columns} gap-4`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="p-5 rounded-xl border border-surface-variant space-y-3">
          <SkeletonBlock className="h-10 w-10" />
          <SkeletonLine className="w-3/4 h-4" />
          <SkeletonLine className="w-full" />
          <SkeletonLine className="w-1/2" />
          <div className="pt-3 border-t border-surface-variant flex items-center justify-between">
            <SkeletonLine className="w-20 h-4" />
            <SkeletonBlock className="h-9 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeadingSkeleton() {
  return (
    <div className="space-y-2 mb-8">
      <SkeletonLine className="w-32" />
      <SkeletonLine className="w-80 h-6" />
      <SkeletonLine className="w-64" />
    </div>
  );
}

/** Doctor / clinic listing: filter rail plus result rows. */
export function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-cols-[280px_1fr] gap-gutter-desktop">
      <aside className="hidden lg:block p-4 rounded-xl border border-surface-variant space-y-4 h-max">
        <SkeletonLine className="w-24 h-4" />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonLine className="w-28" />
            <SkeletonLine className="w-full" />
            <SkeletonLine className="w-5/6" />
          </div>
        ))}
      </aside>
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="p-4 rounded-xl border border-surface-variant flex gap-4">
            <SkeletonBlock className="h-[88px] w-[88px] rounded-full shrink-0" />
            <div className="flex-1 space-y-2.5">
              <SkeletonLine className="w-1/2 h-4" />
              <SkeletonLine className="w-3/4" />
              <SkeletonLine className="w-2/3" />
              <SkeletonLine className="w-1/3" />
            </div>
            <div className="w-40 hidden sm:flex flex-col justify-between">
              <SkeletonLine className="w-20 h-5 self-end" />
              <SkeletonBlock className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Doctor / clinic profile: hero, body sections, sticky booking rail. */
export function ProfileSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-gutter-desktop">
      <div className="flex-1 space-y-6">
        <div className="p-6 rounded-xl border border-surface-variant flex gap-5">
          <SkeletonBlock className="h-[120px] w-[120px]" />
          <div className="flex-1 space-y-3">
            <SkeletonLine className="w-1/2 h-6" />
            <SkeletonLine className="w-3/4" />
            <SkeletonLine className="w-2/3" />
            <div className="grid grid-cols-3 gap-3 pt-3">
              <SkeletonBlock className="h-14" />
              <SkeletonBlock className="h-14" />
              <SkeletonBlock className="h-14" />
            </div>
          </div>
        </div>
        <SkeletonBlock className="h-48" />
        <SkeletonBlock className="h-64" />
      </div>
      <aside className="w-full lg:w-full lg:w-[360px] lg:shrink-0 space-y-4">
        <div className="p-5 rounded-xl border border-surface-variant space-y-4">
          <SkeletonLine className="w-24 h-6" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }, (_, i) => <SkeletonBlock key={i} className="h-12" />)}
          </div>
          <SkeletonBlock className="h-12" />
        </div>
      </aside>
    </div>
  );
}

/** Records / reports tables. */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-surface-variant overflow-hidden">
      <div className="p-4 border-b border-surface-variant space-y-2">
        <SkeletonLine className="w-48 h-4" />
        <SkeletonLine className="w-64" />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-surface-variant last:border-0">
          <SkeletonBlock className="h-9 w-9" />
          <div className="flex-1 space-y-2">
            <SkeletonLine className="w-1/3 h-4" />
            <SkeletonLine className="w-1/2" />
          </div>
          <SkeletonLine className="w-20 hidden sm:block" />
          <SkeletonLine className="w-16 hidden md:block" />
        </div>
      ))}
    </div>
  );
}

/** Product / test detail: gallery plus sticky purchase rail. */
export function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
      <div className="lg:col-span-8 space-y-5">
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-24" />
        <SkeletonBlock className="h-72" />
      </div>
      <aside className="lg:col-span-4 p-5 rounded-xl border border-surface-variant space-y-4">
        <SkeletonLine className="w-28 h-7" />
        <SkeletonLine className="w-40" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }, (_, i) => <SkeletonBlock key={i} className="h-10" />)}
        </div>
        <SkeletonBlock className="h-12" />
      </aside>
    </div>
  );
}
