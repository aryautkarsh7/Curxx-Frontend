import { CardGridSkeleton, HeadingSkeleton, PageSkeleton, TableSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading health records">
      <HeadingSkeleton />
      <div className="space-y-6">
        <CardGridSkeleton count={4} columns="sm:grid-cols-2 lg:grid-cols-4" />
        <TableSkeleton rows={5} />
      </div>
    </PageSkeleton>
  );
}
