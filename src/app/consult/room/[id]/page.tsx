import type { Metadata } from 'next';
import { Suspense } from 'react';
import ConsultRoom from './ConsultRoom';

export const metadata: Metadata = { title: 'Consultation | Curxx', robots: { index: false } };

export default async function ConsultRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense>
      <ConsultRoom id={id} />
    </Suspense>
  );
}
