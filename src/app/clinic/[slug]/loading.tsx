import { PageSkeleton, ProfileSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <PageSkeleton label="Loading centre">
      <ProfileSkeleton />
    </PageSkeleton>
  );
}
