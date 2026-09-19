import { HeadingSkeleton, PageSkeleton, TableSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading appointments">
      <HeadingSkeleton />
      <TableSkeleton rows={3} />
    </PageSkeleton>
  );
}
