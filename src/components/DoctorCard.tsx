'use client';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { photo, rupees, type Doctor, type Slot } from '@/lib/api';

/** Human label for the next open slot, e.g. "Today, 4:30 PM". */
export function slotLabel(startsAt: string) {
  const date = new Date(startsAt);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const time = date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (sameDay(date, today)) return `Today, ${time}`;
  if (sameDay(date, tomorrow)) return `Tomorrow, ${time}`;
  return `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, ${time}`;
}

type Props = {
  doctor: Doctor;
  /** Earliest open slot from /doctors/:slug/slots, when the listing has loaded it. */
  nextSlot?: Slot | null;
  onOpen: (e: MouseEvent<HTMLElement>) => void;
};

export default function DoctorCard({ doctor, nextSlot, onOpen }: Props) {
  const href = `/doctor/${doctor.slug}`;
  return (
    <div onClick={onOpen} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl p-5 hover:border-neutral-300 transition duration-150 relative cursor-pointer">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left Portrait & Verified Badge */}
        <div className="relative flex-shrink-0">
          <img
            loading="lazy"
            decoding="async"
            alt={`${doctor.name}, ${doctor.title}`}
            className="w-[88px] h-[88px] rounded-full object-cover border border-[#E7E5E4]"
            src={photo(doctor.photoUrl, 176)}
          />
          {doctor.verified && (
            <span className="absolute bottom-0 right-0 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded-full p-0.5 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </span>
          )}
        </div>

        {/* Middle Info */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <h3 className="font-headline-h2 text-headline-h2 text-[#1C1917] truncate">{doctor.name}</h3>
            {doctor.verified && (
              <span className="material-symbols-outlined text-[#047857] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            )}
          </div>
          <p className="font-caption text-caption text-[#78716C] mt-0.5">{doctor.qualification}</p>
          <p className="font-caption-strong text-caption-strong text-[#1C1917] mt-1">
            {doctor.title} · {doctor.experienceYears} Years Experience
          </p>
          <div className="flex items-center gap-1 text-caption font-caption text-[#78716C] mt-1.5">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            <span className="truncate">{doctor.clinicName} · {doctor.area}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {doctor.languages.slice(0, 3).map((language) => (
              <span key={language} className="px-2 py-0.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-micro font-micro text-[#78716C]">{language}</span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[#047857] font-caption-strong text-caption-strong">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
            <span>{doctor.recommendPercent}%</span>
            <span className="text-[#78716C] font-caption text-caption">({doctor.reviewCount.toLocaleString('en-IN')} Patient Stories)</span>
          </div>
        </div>

        {/* Right Rail (Price & Booking) */}
        <div className="w-full sm:w-40 flex flex-row sm:flex-col justify-between items-end sm:border-l border-[#E7E5E4] sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 gap-3">
          <div className="text-left sm:text-right">
            <span className="font-caption text-caption text-[#78716C] block">Consultation fee</span>
            <div className="font-headline-h2 text-headline-h2 text-[#1C1917] font-bold">{rupees(doctor.fee)}</div>
          </div>
          <div className="w-full max-w-[180px] sm:max-w-none space-y-2 sm:mt-3">
            {nextSlot && (
              <div className="bg-[#FFF1F2] border border-[#F9C6C9] rounded px-2 py-1 flex items-center justify-center gap-1 text-micro font-micro text-[#8E0E17]">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>{slotLabel(nextSlot.startsAt)}</span>
              </div>
            )}
            <Link href={`${href}?mode=clinic`} className="w-full h-10 bg-[#C1121F] hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95 shadow-sm">
              Book Clinic Visit
            </Link>
            <Link href={`${href}?mode=video`} className="w-full h-9 bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption-strong rounded-lg flex items-center justify-center transition active:scale-95">
              Video {rupees(doctor.videoFee)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
