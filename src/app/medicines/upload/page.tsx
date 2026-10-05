import { permanentRedirect } from 'next/navigation';

/** Curxx does not take prescriptions or sell medicines: the medicines pages are information only. */
export default function UploadPrescriptionPage() {
  permanentRedirect('/medicines');
}
