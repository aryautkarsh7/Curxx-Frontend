import { HeadingSkeleton, ListingSkeleton, PageSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading doctors and centres">
      <HeadingSkeleton />
      <ListingSkeleton />
    </PageSkeleton>
  );
}
