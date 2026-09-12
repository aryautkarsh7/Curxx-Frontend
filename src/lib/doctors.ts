// Mock doctor directory backing /doctor/[slug]. The profile layout is Dr. Priya Sharma's Stitch design.
export type Doctor = {
  slug: string;
  name: string;
  qualification: string;
  title: string;
  specialty: string;
  fee: number;
};

export const DOCTORS: Doctor[] = [
  { slug: 'dr-priya-sharma', name: 'Dr. Priya Sharma', qualification: 'MBBS, MD - Dermatology, Fellow in Aesthetic Medicine', title: 'Senior Dermatologist & Dermatosurgeon · 14 Years Experience', specialty: 'dermatologist', fee: 650 },
  { slug: 'dr-rajeshwari-iyer', name: 'Dr. Rajeshwari Iyer', qualification: 'MBBS, MD - Dermatology, DNB (Dermatology)', title: 'Dermatologist & Trichologist · 16 Years Experience', specialty: 'dermatologist', fee: 700 },
  { slug: 'dr-ananya-sen', name: 'Dr. Ananya Sen', qualification: 'MBBS, DNB - Dermatology', title: 'Cosmetic Dermatologist · 11 Years Experience', specialty: 'dermatologist', fee: 649 },
  { slug: 'dr-arvind-swaminathan', name: 'Dr. Arvind Swaminathan', qualification: 'MBBS, MS - Orthopedics', title: 'Orthopedic Surgeon · 18 Years Experience', specialty: 'orthopedist', fee: 799 },
  { slug: 'dr-meera-nambiar', name: 'Dr. Meera Nambiar', qualification: 'MBBS, MD - General Medicine', title: 'General Physician · 12 Years Experience', specialty: 'general-physician', fee: 399 },
];

export function getDoctor(slug: string) {
  return DOCTORS.find((d) => d.slug === slug);
}
