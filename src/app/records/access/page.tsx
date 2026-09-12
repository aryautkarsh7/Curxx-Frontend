'use client';
import Link from 'next/link';
import { useState } from 'react';
import StaticPage from '@/components/StaticPage';

const INITIAL_GRANTS = [
  { id: 'priya', who: 'Dr. Priya Sharma', where: 'Dermatology · Manipal Hospital', what: 'Comprehensive Lipid Profile & HbA1c', expires: 'Tomorrow, 11:30 AM' },
  { id: 'murthy', who: 'Curxx Diagnostic Labs', where: 'Indiranagar (NABL)', what: 'All lab reports', expires: '30 Sep 2026' },
  { id: 'star', who: 'Star Health Insurance', where: 'Cashless claim desk', what: 'Discharge summary · Hospital bills', expires: '15 Oct 2026' },
];

export default function RecordsAccessPage() {
  const [grants, setGrants] = useState(INITIAL_GRANTS);

  return (
    <StaticPage title="Manage Access" intro="Everyone who can currently see your health records. Revoking access takes effect immediately.">
      {grants.length === 0 ? (
        <p className="text-body-default font-body-default text-on-surface-variant">No one has access to your records right now.</p>
      ) : (
        <ul className="divide-y divide-[#E7E5E4] rounded-xl border border-[#E7E5E4] bg-white">
          {grants.map((g) => (
            <li key={g.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
              <div className="flex-1 min-w-0">
                <p className="font-body-strong text-body-strong text-[#1C1917]">{g.who}</p>
                <p className="font-caption text-caption text-[#78716C]">{g.where} · {g.what}</p>
                <p className="font-micro text-micro text-[#B45309] mt-0.5">Expires {g.expires}</p>
              </div>
              <button type="button" onClick={() => setGrants((prev) => prev.filter((x) => x.id !== g.id))} className="h-9 px-4 rounded-lg border border-[#F9C6C9] bg-[#FFF1F2] text-[#8E0E17] font-caption-strong text-caption-strong hover:bg-[#FEE2E2]">
                Revoke
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link href="/records" className="inline-flex items-center gap-1 text-caption-strong font-caption-strong text-[#D92D3A] hover:underline">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Health Records
      </Link>
    </StaticPage>
  );
}
