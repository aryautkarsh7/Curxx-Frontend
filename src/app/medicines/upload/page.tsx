import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';
import UploadFlow from './UploadFlow';

export const metadata: Metadata = {
  title: 'Upload Prescription | Curxx',
  description: 'Upload a doctor’s prescription and a licensed Curxx pharmacist will verify it and prepare your order.',
};

export default function UploadPrescriptionPage() {
  return (
    <StaticPage title="Upload Prescription" intro="A licensed pharmacist will verify your prescription, add the medicines to your cart, and call you within 10 minutes to confirm.">
      <UploadFlow />
    </StaticPage>
  );
}
