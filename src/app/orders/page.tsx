import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';
import OrderList from './OrderList';

export const metadata: Metadata = { title: 'My Orders | Curxx', robots: { index: false } };

export default function OrdersPage() {
  return (
    <StaticPage title="My orders" intro="Medicine deliveries and home lab collections, with live status.">
      <OrderList />
    </StaticPage>
  );
}
