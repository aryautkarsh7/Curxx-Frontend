import type { Faq } from './home-content';

/** The FAQ block rendered on every doctor listing page — kept here so the page can also emit FAQPage schema. */
export const LISTING_FAQS: Faq[] = [
  {
    question: 'What is the consultation fee of a top dermatologist in Bangalore?',
    answer:
      'Consultation fees typically range between ₹500 to ₹1,200 depending on the specialist\'s clinical experience, hospital affiliation, and locality. Virtual video consultations on Curxx start from ₹349.',
  },
  {
    question: 'Can I consult a dermatologist online via Curxx?',
    answer:
      'Yes. Curxx offers instant and scheduled teleconsultations with HD video, allowing secure digital image upload for skin lesions, automated e-prescriptions, and continuous chat follow-up for 7 days.',
  },
  {
    question: 'How soon can I get an in-person clinic appointment?',
    answer:
      'Most participating clinics in prime Bengaluru localities like Indiranagar, Koramangala, and HSR Layout feature same-day walk-in tokens or guaranteed appointment slots within 2 to 4 hours.',
  },
  {
    question: 'Are dermatologist consultations covered under ABHA or health insurance?',
    answer:
      'Yes. Curxx natively links with your 14-digit ABHA (Ayushman Bharat Health Account) ID. OPD consultations and minor procedures can be processed via leading OPD health insurance plans and corporate flexi-benefits.',
  },
  {
    question: 'How does Curxx verify doctor credentials?',
    answer:
      'Our clinical compliance cell validates every doctor against Karnataka Medical Council (KMC) registries, verified postgraduate medical degrees (MD/DVD/DNB), and clinic ownership certificates prior to onboarding.',
  },
  {
    question: 'Does a consultation include a free follow-up?',
    answer:
      'Every booking on Curxx provides a complimentary 7-day text chat follow-up with the doctor, enabling patients to clarify lab test results or dosage changes without an additional consultation fee.',
  },
];
