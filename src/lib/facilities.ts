// Mock hospital & clinic directory. `type` splits /bangalore/hospitals from /bangalore/clinics.
export type FacilityType = 'hospital' | 'clinic';

export type Facility = {
  slug: string;
  name: string;
  /** Heading used on listing and homepage cards. */
  listingName: string;
  area: string;
  type: FacilityType;
  speciality: string;
  distanceKm: number;
  rating: number;
  emergency: boolean;
};

export const FACILITIES: Facility[] = [
  { slug: 'manipal-hospital', name: 'Manipal Super Specialty Hospital - HAL Airport Road', listingName: 'Manipal Super Specialty Hospital', area: 'HAL Airport Road', type: 'hospital', speciality: 'Super specialty · 45+ departments', distanceKm: 1.8, rating: 4.8, emergency: true },
  { slug: 'aster-cmi-hospital', name: 'Aster CMI Hospital - Hebbal', listingName: 'Aster CMI Hospital', area: 'Hebbal', type: 'hospital', speciality: 'Multi-specialty quaternary care', distanceKm: 8.4, rating: 4.7, emergency: true },
  { slug: 'cloudnine-hospital', name: 'Cloudnine Hospital - Indiranagar', listingName: 'Cloudnine Hospital', area: 'Indiranagar', type: 'hospital', speciality: 'Maternity & child care', distanceKm: 0.9, rating: 4.9, emergency: true },
  { slug: 'apollo-clinic-koramangala', name: 'Apollo Clinic & Diagnostics - Koramangala', listingName: 'Apollo Clinic & Diagnostics', area: 'Koramangala 5th Block', type: 'clinic', speciality: 'Daycare polyclinic & diagnostics', distanceKm: 3.2, rating: 4.6, emergency: false },
  { slug: 'fortis-medical-centre', name: 'Fortis Medical Centre - Cunningham Road', listingName: 'Fortis Medical Centre', area: 'Vasanth Nagar', type: 'clinic', speciality: 'Specialty outpatient centre', distanceKm: 4.1, rating: 4.7, emergency: false },
];

/** Closest four centres, for the homepage "near you" section. */
export const NEARBY_FACILITIES = [...FACILITIES].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 4);

export function getFacility(slug: string) {
  return FACILITIES.find((f) => f.slug === slug);
}

export const mapsUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
