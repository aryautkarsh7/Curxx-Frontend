import { DetailSkeleton, PageSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading medicine">
      <DetailSkeleton />
    </PageSkeleton>
  );
}
