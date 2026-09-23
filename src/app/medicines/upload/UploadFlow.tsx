'use client';
import Link from 'next/link';
import { useState } from 'react';
import PrescriptionUploader from '@/components/pharmacy/PrescriptionUploader';
import RequireSignIn from '@/components/RequireSignIn';
import type { HealthRecord } from '@/lib/api';
import { useCart } from '@/lib/cart';

export default function UploadFlow() {
  const cart = useCart();
  const [uploaded, setUploaded] = useState<HealthRecord[] | null>(null);

  return (
    <RequireSignIn title="Sign in to upload your prescription" body="Prescriptions are stored in your private health locker so a pharmacist can verify them and you can reuse them for refills." icon="prescriptions">
      {uploaded ? (
        <div className="p-6 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] space-y-3">
          <h2 className="text-headline-h3 font-headline-h3 text-[#047857]">Prescription received</h2>
          <p className="text-body-default font-body-default text-on-surface-variant">
            {uploaded.length === 1 ? 'It’s' : `All ${uploaded.length} files are`} saved to your health locker. A pharmacist will call you within 10 minutes to confirm the medicines{cart.needsPrescription ? ' — or you can check out right away.' : '.'}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            {cart.count > 0 ? (
              <Link href="/checkout" className="h-11 px-5 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">Continue to checkout</Link>
            ) : (
              <Link href="/medicines" className="h-11 px-5 inline-flex items-center rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong">Browse medicines</Link>
            )}
            <Link href="/records?kind=prescription" className="h-11 px-5 inline-flex items-center rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] font-caption-strong text-caption-strong hover:bg-[#FAFAF9]">View in health locker</Link>
          </div>
        </div>
      ) : (
        <PrescriptionUploader onUploaded={setUploaded} />
      )}
    </RequireSignIn>
  );
}
