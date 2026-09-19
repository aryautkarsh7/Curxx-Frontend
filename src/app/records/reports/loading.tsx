import { PageSkeleton, TableSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading diagnostic reports">
      <TableSkeleton rows={6} />
    </PageSkeleton>
  );
}
