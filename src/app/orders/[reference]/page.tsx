import type { Metadata } from 'next';
import OrderTracking from './OrderTracking';

export const metadata: Metadata = { title: 'Order Details | Curxx', robots: { index: false } };

export default async function OrderPage({ params }: { params: Promise<{ reference: string }> }) {
  return <OrderTracking reference={(await params).reference} />;
}
