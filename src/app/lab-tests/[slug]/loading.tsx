import { DetailSkeleton, PageSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading test package">
      <DetailSkeleton />
    </PageSkeleton>
  );
}
