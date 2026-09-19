import { CardGridSkeleton, HeadingSkeleton, PageSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading medicines">
      <HeadingSkeleton />
      <CardGridSkeleton count={8} columns="sm:grid-cols-2 lg:grid-cols-4" />
    </PageSkeleton>
  );
}
