/**
 * Doctor profile copy from Diksha's "bio + faq dynamic" template (docs/content-templates), filled from the
 * doctor's own record. It replaces imported (Doctar) bios; a bio hand-written in the admin panel still wins.
 * Accuracy edits (see CHANGES-FOR-DIKSHA.md): no invented praise, "approx." for unconfirmed fees, real
 * weekly hours, and Call wording for doctors without online booking. Sections without data are left out.
 */
import type { DoctorDetail, Facility, Faq } from './api';

export type ProfileSection = { heading: string; paragraphs?: string[]; list?: string[] };

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const list = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`);
/** "Dermatologist" → "dermatologist"; acronyms such as "ENT Specialist" keep their capitals. */
const lowerTitle = (s: string) => s.split(' ').map((w) => (/^[A-Z]{2,}/.test(w) ? w : w.toLowerCase())).join(' ');
/** "a"/"an" by sound: an orthopedist, an ENT specialist, but a urologist. */
const article = (word: string) => (/^(uni|uro|use|usu|eu)/i.test(word) ? 'a' : /^[aeiou]/i.test(word) || /^[AEFHILMNORSX][A-Z]/.test(word) ? 'an' : 'a');
const clean = (s?: string | null) => (s ?? '').trim();

/** "Mon–Fri from 9:00 AM to 1:00 PM and 5:00 PM to 8:00 PM, and Sat from 10:00 AM to 1:00 PM". */
export function timingsText(timings: DoctorDetail['timings']) {
  if (!timings?.length) return '';
  return list(
    timings.map((t) => (t.allDay ? `${t.days}, 24 hours` : `${t.days} from ${list(t.hours.map((h) => h.replace(' – ', ' to ')))}`)),
  );
}

export function doctorProfileContent(d: DoctorDetail, facility: Facility | null, opts: { bookable: boolean }) {
  const name = d.name;
  const speciality = lowerTitle(clean(d.specialtyName) || clean(d.title) || 'doctor');
  const city = clean(d.cityName);
  const locality = clean(d.area);
  const place = [locality, city].filter((p, i, all) => p && all.indexOf(p) === i).join(', ');
  const hospital = clean(facility?.name) || clean(d.clinicName);
  const exp = d.experienceYears > 0 ? d.experienceYears : 0;
  const qualification = clean(d.qualification);
  const languages = (d.languages ?? []).filter(Boolean);
  const video = d.offersVideo !== false;
  const approxFee = d.feeVerified === false;
  const fee = d.fee > 0 ? `${approxFee ? 'approx. ' : ''}${inr(d.fee)}` : '';
  const reviews = d.reviewSummary?.total ?? 0;
  const rating = d.reviewSummary?.average ?? 0;
  const hours = timingsText(d.timings);
  const experienced = exp >= 5 ? 'experienced ' : '';

  // A hand-written bio (admin panel) stays; generated and imported bios use the template.
  const about =
    d.managed && clean(d.about)
      ? clean(d.about)
      : [
          `${name} is ${article(experienced || speciality)} ${experienced}${speciality}${place ? ` in ${place}` : ''}${exp ? `, with ${exp}+ years of clinical experience` : ''}.`,
          qualification ? `${name} holds ${qualification}.` : '',
          hospital && city ? `Patients looking for ${article(speciality)} ${speciality} in ${city} can consult ${name} at ${hospital}${locality ? `, ${locality}` : ''}.` : '',
        ]
          .filter(Boolean)
          .join(' ');

  // First complaint of each service ("Ear ache, blocked ear…" → "ear ache"): reads as a reason, unlike the category label.
  const reasons = (d.services ?? []).slice(0, 4).map((s) => lowerTitle(clean(s.description).split(/,\s*/)[0] ?? '')).filter(Boolean);
  const candidates: (ProfileSection | null)[] = [
    qualification || exp
      ? {
          heading: 'Qualification & Expertise',
          paragraphs: [
            [
              qualification
                ? `${name} has completed ${qualification} and practises as ${article(speciality)} ${speciality}${exp ? `, with ${exp} years of practice` : ''}.`
                : `${name} practises as ${article(speciality)} ${speciality}, with ${exp} years of practice.`,
              d.focusAreaNames?.length ? `Areas of special interest include ${list(d.focusAreaNames.map(lowerTitle))}.` : '',
              reasons.length ? `Common reasons to see ${article(speciality)} ${speciality} include ${list(reasons)}.` : '',
            ]
              .filter(Boolean)
              .join(' '),
          ],
        }
      : null,
    hospital
      ? {
          heading: 'Practice Location',
          paragraphs: [
            [
              `${name} practises at ${hospital}${place ? ` in ${place}` : ''}.`,
              clean(facility?.address) ? `Address: ${clean(facility?.address)}.` : '',
              city ? `Patients from nearby areas of ${city} can ${opts.bookable ? 'book a visit here' : 'visit or call the clinic'}.` : '',
            ]
              .filter(Boolean)
              .join(' '),
          ],
        }
      : null,
    hours
      ? {
          heading: 'Clinic Timings',
          paragraphs: [`${name} is available ${hours}. ${opts.bookable ? 'Patients are advised to book an appointment in advance to avoid waiting time.' : 'Please call the clinic to confirm timings before you visit.'}`],
        }
      : null,
    languages.length
      ? { heading: 'Languages Spoken', paragraphs: [`${name} speaks ${list(languages)}, so patients can explain their symptoms comfortably and understand the treatment plan without any language barrier.`] }
      : null,
    fee
      ? {
          heading: 'Consultation Fee',
          paragraphs: [`The consultation fee for ${name} is ${fee}.${approxFee ? ' Please confirm the exact fee with the clinic.' : ''} Fees may vary depending on the type of visit or follow-up.`],
        }
      : null,
    video
      ? {
          heading: 'Online Video Consultation',
          paragraphs: [`Can’t visit the clinic? ${name} also offers video consultation. You can consult ${article(speciality)} ${speciality} from home, share your reports online and get guidance without travelling. Online consultation is helpful for follow-ups, second opinions and non-emergency concerns.`],
        }
      : hospital
        ? {
            heading: 'Consultation Mode',
            paragraphs: [`${name} currently consults in person only at ${hospital}. Video consultation is not available at the moment, so please ${opts.bookable ? 'book an in-clinic appointment' : 'call the clinic to arrange a visit'}.`],
          }
        : null,
    {
      heading: 'Patient Reviews',
      paragraphs: [
        reviews > 0 && rating > 0
          ? `${name} has a rating of ${rating.toFixed(1)}/5 based on ${reviews.toLocaleString('en-IN')} patient ${reviews === 1 ? 'review' : 'reviews'} on Curxx.`
          : `Patient reviews for ${name} are not available yet.${opts.bookable ? ' Be the first to share your experience after your visit.' : ''}`,
      ],
    },
    {
      heading: `Why Choose ${name}?`,
      list: [
        exp ? `${exp}+ years of experience as ${article(speciality)} ${speciality}` : '',
        qualification ? `${qualification} qualified` : '',
        hospital ? `Practising at ${[hospital, place].filter(Boolean).join(', ')}` : '',
        languages.length ? `Consults in ${list(languages)}` : '',
        fee ? `Fee: ${fee}` : '',
        video ? 'Video consultation available' : '',
        reviews > 0 && rating > 0 ? `Rated ${rating.toFixed(1)}/5 by patients` : '',
      ].filter(Boolean),
    },
    {
      heading: `How to Book an Appointment with ${name}`,
      paragraphs: [
        opts.bookable
          ? `Booking is simple: choose a suitable date and time slot in the booking panel, ${video ? 'select clinic visit or video consultation, ' : ''}and confirm your appointment with your mobile number.`
          : `Online booking isn’t available for ${name} yet. Call ${hospital || 'the clinic'} to book a visit.`,
      ],
    },
  ];
  const sections = candidates.filter((s): s is ProfileSection => s !== null && (Boolean(s.paragraphs?.length) || Boolean(s.list?.length)));

  const faqs: Faq[] = [
    { question: `Who is ${name}?`, answer: `${name} is ${article(speciality)} ${speciality}${city ? ` in ${city}` : ''}${exp ? ` with ${exp}+ years of experience` : ''}${qualification ? `${exp ? ' and' : ' with'} ${qualification} qualification` : ''}.` },
    hospital ? { question: `Where does ${name} practise?`, answer: `At ${[hospital, place].filter(Boolean).join(', ')}.` } : null,
    hours ? { question: `What are ${name}’s timings?`, answer: `${hours.charAt(0).toUpperCase()}${hours.slice(1)}.${opts.bookable ? '' : ' Please call the clinic to confirm before you visit.'}` } : null,
    fee ? { question: 'What is the consultation fee?', answer: `${fee.charAt(0).toUpperCase()}${fee.slice(1)}.${approxFee ? ' Please confirm the exact fee with the clinic.' : ''}` } : null,
    languages.length ? { question: `Which languages does ${name} speak?`, answer: `${list(languages)}.` } : null,
    { question: `Does ${name} offer video consultation?`, answer: video ? `Yes, ${name} offers online video consultation.` : 'No, currently only in-clinic consultation is available.' },
    opts.bookable ? { question: 'Can I cancel or reschedule?', answer: 'Yes, from My Appointments, free of charge up to 2 hours before the slot. Any payment is refunded to the original method within 5–7 working days.' } : null,
  ].filter(Boolean) as Faq[];

  return { about, sections, faqs };
}
