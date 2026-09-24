'use client';
import FilterPillSheet from '@/components/FilterPillSheet';
import ListingFilterGroups, { type Chip } from '@/components/ListingFilterGroups';
import type { ListingFilters as Filters } from '@/app/[city]/[specialty]/useListingControls';

type Props = {
  filters: Filters;
  activeChips: Chip[];
  total: number;
  noun: string;
  setParam: (key: string, value: string | number | undefined) => void;
  setAvailability: (value: string) => void;
  clearFilters: () => void;
  hide?: ('mode' | 'availability' | 'area' | 'free')[];
  areas?: { value: string; count: number }[];
  languages?: { value: string; count: number }[];
};

/** Doctor-listing filters inside the floating pill sheet. */
export default function MobileFilterSheet({ filters, activeChips, total, noun, setParam, setAvailability, clearFilters, hide, areas, languages }: Props) {
  return (
    <FilterPillSheet activeCount={activeChips.length} total={total} noun={noun} onClear={clearFilters}>
      <ListingFilterGroups filters={filters} activeChips={activeChips} setParam={setParam} setAvailability={setAvailability} hide={hide} areas={areas} languages={languages} />
    </FilterPillSheet>
  );
}
