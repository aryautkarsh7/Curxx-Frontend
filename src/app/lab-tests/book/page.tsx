import type { Metadata } from 'next';
import LabBooking from './LabBooking';

export const metadata: Metadata = { title: 'Book Lab Tests — Home Collection or Lab Visit | Curxx', robots: { index: false } };

export default function LabBookingPage() {
  return <LabBooking />;
}
