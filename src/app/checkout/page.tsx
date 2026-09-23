import type { Metadata } from 'next';
import Checkout from './Checkout';

export const metadata: Metadata = { title: 'Checkout | Curxx', robots: { index: false } };

export default function CheckoutPage() {
  return <Checkout />;
}
