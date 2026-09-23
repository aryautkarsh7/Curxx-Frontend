import { DetailSkeleton } from '@/components/skeletons';

/** Shown while the selected doctor and their open slots load. */
export default function BookingSkeleton() {
  return (
    <main className="w-full max-w-[900px] mx-auto px-4 py-8 pb-36" aria-busy="true" aria-label="Loading booking">
      <DetailSkeleton />
    </main>
  );
}
