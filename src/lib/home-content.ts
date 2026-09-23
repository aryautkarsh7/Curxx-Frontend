/** Homepage and Partner copy from the SEO content spec. Wording here is deliberate — it is the indexed text. */

export type Faq = { question: string; answer: string };

export const HOME_FAQS: Faq[] = [
  { question: 'How much does a video consultation cost on Curxx?', answer: 'Fees vary by doctor and specialty and are shown upfront on each doctor’s profile before you book — there are no hidden charges added at checkout.' },
  { question: 'Will I get a valid prescription after an online consultation?', answer: 'Yes. Every video, audio, or chat consultation ends with a digitally signed e-prescription that’s valid for pharmacy purchase and stored in your health locker.' },
  { question: 'What happens if the doctor doesn’t join the video call on time?', answer: 'If a doctor misses the scheduled slot, you’re automatically offered a free rebooking or a full refund, whichever you prefer.' },
  { question: 'Can I cancel or reschedule a clinic visit after booking?', answer: 'Yes, both video consults and clinic visits can be rescheduled or cancelled from your bookings page, subject to the clinic’s cancellation window (usually up to a few hours before the slot).' },
  { question: 'Do I need an ABHA ID to use Curxx?', answer: 'No, ABHA is optional but recommended — it lets you carry your prescriptions and reports across any doctor or hospital in India, not just those on Curxx.' },
  { question: 'Is my health data safe on Curxx?', answer: 'Curxx is ISO 27001 certified and ABDM certified, and all health records are encrypted and shared only with your explicit consent.' },
  { question: 'Can I use my insurance or corporate health plan on Curxx?', answer: 'Yes, if your employer has a Curxx corporate health plan, cashless OPD consultations (both online and in-clinic) are available directly through your linked account.' },
  { question: 'How fast can I get medicines delivered?', answer: 'Prescription medicines from verified partner pharmacies are typically delivered within 2 hours in serviceable areas.' },
  { question: 'Are the lab tests and health checkups accurate if the sample is collected at home?', answer: 'Yes, samples are collected by certified phlebotomists following standard cold-chain protocols and processed at NABL-accredited partner labs, same as an in-clinic draw.' },
  { question: 'Can Curxx be used for a medical emergency?', answer: 'No — Curxx is for scheduled consultations and non-emergency care. In a medical emergency, call local emergency services or go directly to the nearest hospital.' },
];

export type Band = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  icon: string;
  cta: { label: string; href: string };
  points?: string[];
};

/** Consumer sections 2, 5, 6 and 7 of the spec. */
export const HOME_BANDS: Band[] = [
  {
    id: 'teleconsultation',
    eyebrow: '24/7 Teleconsultation',
    heading: '24/7 Video, Audio & Chat Consultations',
    body: 'Connect with a certified doctor over secure, encrypted video, audio, or chat — any time, day or night. A 60-second connect time for general physicians and specialists alike.',
    icon: 'video_chat',
    cta: { label: 'Start a video consult', href: '/consult/video' },
    points: ['60-second average connect', 'Encrypted, ABDM-compliant rooms', 'Digitally signed e-prescription'],
  },
  {
    id: 'pharmacy',
    eyebrow: 'E-Pharmacy & Medicine Delivery',
    heading: 'Upload a Prescription, Get Medicines at Your Doorstep',
    body: 'Order 100% authentic medicines from verified pharmacies, dispensed against your e-prescription and delivered within 2 hours.',
    icon: 'medication',
    cta: { label: 'Upload prescription', href: '/medicines/upload' },
    points: ['Verified partner pharmacies', '2-hour express delivery', 'Cold-chain handling where needed'],
  },
  {
    id: 'lab-tests',
    eyebrow: 'At-Home Diagnostic Tests',
    heading: 'Lab Tests & Health Checkups, Sample Collected From Home',
    body: 'Book blood tests and full health checkup packages through partner labs. A certified phlebotomist collects your sample at home, with digital reports ready in 6 hours.',
    icon: 'science',
    cta: { label: 'Book a lab test', href: '/lab-tests' },
    points: ['NABL-accredited partner labs', 'Free home sample collection', 'Digital reports in 6 hours'],
  },
  {
    id: 'curxx-plus',
    eyebrow: 'Curxx Plus (Subscription)',
    heading: 'Curxx Plus: Unlimited Consultations for Your Whole Family',
    body: 'One family plan, unlimited online consultations for every member, plus priority booking on in-clinic appointments and discounted lab tests.',
    icon: 'family_restroom',
    cta: { label: 'See Curxx Plus', href: '/account' },
    points: ['Unlimited online consults', 'Priority in-clinic booking', 'Discounted lab packages'],
  },
];

/** B2B sections 8, 9 and 10 — shown on the homepage and on Partner With Us. */
export type PartnerSection = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  icon: string;
  points: string[];
  cta: { label: string; href: string };
};

export const PARTNER_SECTIONS: PartnerSection[] = [
  {
    id: 'doctors-clinics',
    eyebrow: 'For Doctors & Clinics',
    heading: 'Grow Your Practice with Curxx Pro & Curxx Desk',
    body: 'Manage scheduling, digital billing, and automated patient SMS reminders from one dashboard. Build your digital footprint and offer patients the choice to book online or in person.',
    icon: 'stethoscope',
    points: ['Online + in-clinic scheduling', 'Digital billing and receipts', 'Automated SMS reminders'],
    cta: { label: 'Create your clinical profile', href: '/for-providers#signup-form' },
  },
  {
    id: 'hospitals',
    eyebrow: 'For Hospitals',
    heading: 'A Complete Hospital Information Management System — Curxx Insta',
    body: 'Cloud-based HIMS to sync OPD scheduling, lab interfaces, pharmacy inventory, and bed management — built for hospitals running both walk-in and teleconsultation OPDs.',
    icon: 'local_hospital',
    points: ['OPD and teleconsultation in one queue', 'Lab and pharmacy interfaces', 'Bed and inventory management'],
    cta: { label: 'Talk to the HIMS team', href: 'mailto:partners@curxx.example?subject=Curxx%20Insta%20for%20hospitals' },
  },
  {
    id: 'corporates',
    eyebrow: 'For Corporates',
    heading: 'Corporate Health Benefit Plans for Your Employees',
    body: 'Deploy customizable health coverage for your workforce — cashless OPD (online and in-clinic), mental wellness webinars, and family coverage — managed from a single HR dashboard.',
    icon: 'work',
    points: ['Cashless OPD, online and in-clinic', 'Mental wellness webinars', 'Single HR dashboard'],
    cta: { label: 'Get a corporate plan', href: 'mailto:partners@curxx.example?subject=Corporate%20health%20plan' },
  },
];

export const TRUST_BADGES = ['NABH Partner Network', 'ISO 27001 Certified', 'HIPAA Compliant', 'ABDM Certified'];
