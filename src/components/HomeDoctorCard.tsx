'use client';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { slotLabel } from '@/components/DoctorCard';
import { photo, rupees, type Doctor } from '@/lib/api';

/** "MBBS, MD - Dermatology" → "MD", for the verification chip. */
function degree(qualification: string) {
  const match = qualification.match(/\b(MD|MS|DNB|DM|MCh|DDVL|MRCP|MBBS)\b/g);
  return match?.find((d) => d !== 'MBBS') ?? 'MBBS';
}

export default function HomeDoctorCard({ doctor, onOpen }: { doctor: Doctor; onOpen: (e: MouseEvent<HTMLElement>) => void }) {
  return (
    <div onClick={onOpen} className="p-5 rounded-xl border border-surface-variant bg-surface-container-lowest flex flex-col justify-between space-y-4 shadow-sm hover:border-outline transition cursor-pointer">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 border border-surface-variant">
            <img loading="lazy" decoding="async" alt={doctor.name} className="w-full h-full object-cover" src={photo(doctor.photoUrl, 112)} />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-tertiary-fixed/30 border border-tertiary-fixed text-tertiary text-micro font-micro font-semibold">
              <span className="material-symbols-outlined text-[12px]">check_circle</span>
              <span>Verified {degree(doctor.qualification)}</span>
            </div>
            <h3 className="text-headline-h3 font-headline-h3 text-on-surface mt-1">{doctor.name}</h3>
            <div className="text-caption font-caption text-on-surface-variant">{doctor.qualification}</div>
          </div>
        </div>
        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-surface-container-low rounded-lg text-center border border-surface-variant/60">
          <div>
            <div className="text-micro font-micro text-on-surface-variant">Experience</div>
            <div className="text-caption-strong font-caption-strong text-on-surface">{doctor.experienceYears} Yrs</div>
          </div>
          <div>
            <div className="text-micro font-micro text-on-surface-variant">Rating</div>
            <div className="text-caption-strong font-caption-strong text-tertiary">{doctor.recommendPercent}% ({doctor.reviewCount.toLocaleString('en-IN')})</div>
          </div>
          <div>
            <div className="text-micro font-micro text-on-surface-variant">Fee</div>
            <div className="text-caption-strong font-caption-strong text-on-surface">{rupees(doctor.videoFee)}</div>
          </div>
        </div>
        <div className="text-caption font-caption text-on-surface-variant flex items-center space-x-1">
          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
          <span className="truncate">{doctor.clinicName} · {doctor.area}</span>
        </div>
      </div>
      <div className="space-y-3 pt-2">
        {doctor.nextSlotAt && (
          <div className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-variant flex items-center space-x-2 text-micro font-micro text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>
            <span>Next slot: <strong className="text-on-surface">{slotLabel(doctor.nextSlotAt)}</strong></span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/doctor/${doctor.slug}?mode=clinic`} className="py-2.5 px-3 rounded-lg border border-surface-variant bg-surface-container-lowest text-on-surface text-caption-strong font-caption-strong hover:bg-surface-container-low transition text-center">
            Clinic Visit
          </Link>
          <Link href={`/doctor/${doctor.slug}?mode=video`} className="py-2.5 px-3 rounded-lg bg-primary-container text-on-primary text-caption-strong font-caption-strong hover:bg-primary transition text-center">
            Consult Now
          </Link>
        </div>
      </div>
    </div>
  );
}
