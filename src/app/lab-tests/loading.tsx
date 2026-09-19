import { CardGridSkeleton, HeadingSkeleton, PageSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading lab tests">
      <HeadingSkeleton />
      <CardGridSkeleton count={6} />
    </PageSkeleton>
  );
}
