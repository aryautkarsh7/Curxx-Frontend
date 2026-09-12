// Specialties we list doctors for, keyed by URL slug (/bangalore/{slug}).
export type Specialty = { slug: string; name: string; plural: string; icon: string; fromPrice: number };

export const SPECIALTIES: Specialty[] = [
  { slug: 'general-physician', name: 'General Physician', plural: 'General Physicians', icon: 'stethoscope', fromPrice: 399 },
  { slug: 'cardiologist', name: 'Cardiologist', plural: 'Cardiologists', icon: 'cardiology', fromPrice: 799 },
  { slug: 'dermatologist', name: 'Dermatologist', plural: 'Dermatologists', icon: 'dermatology', fromPrice: 599 },
  { slug: 'pediatrician', name: 'Pediatrician', plural: 'Pediatricians', icon: 'child_care', fromPrice: 499 },
  { slug: 'gynecologist', name: 'Gynecologist', plural: 'Gynecologists', icon: 'female', fromPrice: 649 },
  { slug: 'orthopedist', name: 'Orthopedist', plural: 'Orthopedists', icon: 'accessibility_new', fromPrice: 699 },
  { slug: 'psychiatrist', name: 'Psychiatrist', plural: 'Psychiatrists', icon: 'psychiatry', fromPrice: 899 },
  { slug: 'ent-specialist', name: 'ENT Specialist', plural: 'ENT Specialists', icon: 'hearing', fromPrice: 499 },
  { slug: 'gastroenterologist', name: 'Gastroenterologist', plural: 'Gastroenterologists', icon: 'gastroenterology', fromPrice: 749 },
  { slug: 'neurologist', name: 'Neurologist', plural: 'Neurologists', icon: 'neurology', fromPrice: 999 },
  { slug: 'ophthalmologist', name: 'Ophthalmologist', plural: 'Ophthalmologists', icon: 'visibility', fromPrice: 499 },
  { slug: 'dentist', name: 'Dentist', plural: 'Dentists', icon: 'dentistry', fromPrice: 349 },
  { slug: 'trichologist', name: 'Trichologist', plural: 'Trichologists', icon: 'face', fromPrice: 599 },
  { slug: 'cosmetic-surgeon', name: 'Cosmetic Surgeon', plural: 'Cosmetic Surgeons', icon: 'face_retouching_natural', fromPrice: 999 },
  { slug: 'venereologist', name: 'Venereologist', plural: 'Venereologists', icon: 'vaccines', fromPrice: 599 },
  { slug: 'pediatric-dermatologist', name: 'Pediatric Dermatologist', plural: 'Pediatric Dermatologists', icon: 'child_care', fromPrice: 699 },
  { slug: 'allergist', name: 'Allergist & Immunologist', plural: 'Allergists & Immunologists', icon: 'coronavirus', fromPrice: 699 },
];

/** `/bangalore/doctors` lists every specialty. */
export const ALL_DOCTORS = { slug: 'doctors', name: 'Doctor', plural: 'Doctors' } as const;

/** Specialties that have doctor listings in the mock data; the rest render the zero-results state. */
export const LISTED_SPECIALTIES = new Set(['dermatologist', ALL_DOCTORS.slug]);

export function getSpecialty(slug: string) {
  return SPECIALTIES.find((s) => s.slug === slug);
}
