import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';
import PrescriptionUploader from './PrescriptionUploader';

export const metadata: Metadata = { title: 'Upload Prescription | Curxx' };

export default function UploadPrescriptionPage() {
  return (
    <StaticPage title="Upload Prescription" intro="A licensed pharmacist will verify your prescription, add the medicines to your cart, and call you within 10 minutes to confirm.">
      <PrescriptionUploader />
    </StaticPage>
  );
}
