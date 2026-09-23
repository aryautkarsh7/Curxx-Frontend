'use client';
import type { ListingFilters as Filters } from '@/app/[city]/[specialty]/useListingControls';

export const AVAILABILITY = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'next-7-days', label: 'Next 7 D' },
] as const;

export const MODES = [
  { value: 'clinic', label: 'In-Clinic Visit' },
  { value: 'video', label: 'Video Consultation' },
] as const;

export const EXPERIENCE = [
  { value: 5, label: '5+ Years' },
  { value: 10, label: '10+ Years' },
  { value: 15, label: '15+ Years' },
] as const;

export const AREAS = ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar', 'Hebbal', 'HAL Airport Road'];
export const LANGUAGES = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam'];

export type Chip = { key: string; label: string };

/** The active filters as removable chips, shared by the sidebar and the mobile sheet. */
export function toChips(filters: Filters): Chip[] {
  return [
    filters.availability && { key: 'availability', label: AVAILABILITY.find((a) => a.value === filters.availability)?.label ?? filters.availability },
    filters.mode && { key: 'mode', label: MODES.find((m) => m.value === filters.mode)?.label ?? filters.mode },
    filters.area && { key: 'area', label: filters.area },
    filters.language && { key: 'language', label: filters.language },
    filters.maxFee && { key: 'maxFee', label: `Under ₹${filters.maxFee.toLocaleString('en-IN')}` },
    filters.minExperience && { key: 'minExperience', label: `${filters.minExperience}+ years` },
  ].filter(Boolean) as Chip[];
}

type Props = {
  filters: Filters;
  activeChips: Chip[];
  setParam: (key: string, value: string | number | undefined) => void;
  setAvailability: (value: string) => void;
  /** Groups the instant video flow already decides for the patient, e.g. mode and availability. */
  hide?: ('mode' | 'availability')[];
};

/** Filter controls for the doctor listing — rendered in the desktop rail and in the mobile sheet. */
export default function ListingFilterGroups({ filters, activeChips, setParam, setAvailability, hide = [] }: Props) {
  return (
    <div className="space-y-5">

{/* Applied Chips */}
{activeChips.length > 0 && (
<div className="flex flex-wrap gap-1.5 pb-3 border-b border-[#E7E5E4]">
{activeChips.map((chip) => (
<button key={chip.key} type="button" onClick={() => setParam(chip.key, undefined)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#F9C6C9] font-micro text-micro text-[#8E0E17]">
{chip.label}
<span className="material-symbols-outlined text-[14px] hover:text-black">close</span>
</button>
))}
</div>
)}

{/* Availability Filter */}
{!hide.includes('availability') && (
<div className="space-y-2">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Availability</label>
<div className="grid grid-cols-3 gap-1.5">
{AVAILABILITY.map(({ value, label }) => (
<button key={value} type="button" onClick={() => setAvailability(value)} className={filters.availability === value ? 'px-2 py-1.5 rounded-lg font-caption-strong text-caption text-center border bg-[#FFF1F2] border-[#C1121F] text-[#C1121F]' : 'px-2 py-1.5 rounded-lg font-caption text-caption text-center border bg-[#FAFAF9] border-[#E7E5E4] text-[#78716C] hover:bg-surface-container'}>{label}</button>
))}
</div>
</div>
)}

{/* Consultation Mode */}
{!hide.includes('mode') && (
<div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Consultation Mode</label>
<div className="space-y-2 text-caption font-caption text-[#1C1917]">
{MODES.map(({ value, label }) => (
<label key={value} className="flex items-center gap-2.5 cursor-pointer">
<input type="checkbox" checked={filters.mode === value} onChange={() => setParam('mode', value)} className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" />
<span>{label}</span>
</label>
))}
</div>
</div>
)}

{/* Fee Range */}
<div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
<div className="flex justify-between items-center">
<label htmlFor="max-fee" className="font-caption-strong text-caption-strong text-[#1C1917]">Consultation Fee</label>
<span className="font-caption-strong text-caption-strong text-[#C1121F]">{filters.maxFee ? `Under ₹${filters.maxFee.toLocaleString('en-IN')}` : 'Any'}</span>
</div>
<input
  id="max-fee"
  type="range"
  min={200}
  max={1200}
  step={100}
  value={filters.maxFee ?? 1200}
  onChange={(e) => setParam('maxFee', Number(e.target.value) >= 1200 ? undefined : Number(e.target.value))}
  className="w-full accent-[#C1121F]"
/>
<div className="flex justify-between items-center text-micro font-micro text-[#78716C]">
<span>₹200</span>
<span>₹700</span>
<span>₹1,200+</span>
</div>
</div>

{/* Experience */}
<div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Experience</label>
<div className="space-y-2 text-caption font-caption text-[#1C1917]">
{EXPERIENCE.map(({ value, label }) => (
<label key={value} className="flex items-center gap-2.5 cursor-pointer">
<input type="checkbox" checked={filters.minExperience === value} onChange={() => setParam('minExperience', value)} className="w-[18px] h-[18px] rounded text-[#C1121F] focus:ring-[#C1121F] border-[#78716C]" />
<span>{label}</span>
</label>
))}
</div>
</div>

{/* Locality */}
<div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Locality</label>
<div className="max-h-40 overflow-y-auto space-y-1.5 text-caption font-caption text-[#1C1917] pr-1">
{AREAS.map((area) => (
<label key={area} className="flex items-center gap-2 cursor-pointer">
<input type="checkbox" checked={filters.area === area} onChange={() => setParam('area', area)} className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" />
{area}
</label>
))}
</div>
</div>

{/* Spoken Languages */}
<div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
<label className="font-caption-strong text-caption-strong text-[#1C1917] block">Spoken Languages</label>
<div className="grid grid-cols-2 gap-2 text-caption font-caption text-[#1C1917]">
{LANGUAGES.map((language) => (
<label key={language} className="flex items-center gap-2 cursor-pointer">
<input type="checkbox" checked={filters.language === language} onChange={() => setParam('language', language)} className="w-4 h-4 rounded text-[#C1121F] border-[#78716C]" />
{language}
</label>
))}
</div>
</div>
    </div>
  );
}
