'use client';
import { registerCities, type CityInfo } from '@/lib/cities';

/**
 * Registers cities that differ from the generated snapshot (added or edited in the admin panel) before
 * the rest of the page renders, so client code — the city picker, header, links — knows about them.
 */
export default function LiveCities({ cities }: { cities: CityInfo[] }) {
  if (cities.length) registerCities(cities);
  return null;
}
