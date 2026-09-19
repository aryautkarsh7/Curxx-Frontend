import { CardGridSkeleton, HeadingSkeleton, PageSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading triage result">
      <HeadingSkeleton />
      <CardGridSkeleton count={3} />
    </PageSkeleton>
  );
}
