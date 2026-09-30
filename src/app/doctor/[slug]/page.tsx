import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiError, api, canBook } from '@/lib/api';
import { lower } from '@/lib/seo-content';
import DoctorProfile from './DoctorProfile';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Rendered per request: the page reads ?slot= / ?mode= and shows live, bookable slots.
// (Static params here made Next render it statically and fail with DYNAMIC_SERVER_USAGE.)
export const dynamic = 'force-dynamic';

async function load(slug: string) {
  try {
    return await api.doctor(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { doctor } = data;
  const title = `${doctor.name} — ${doctor.title} in ${doctor.area}, ${doctor.cityName ?? 'Bengaluru'} | Curxx`;
  // Say only what's true for this doctor: online booking, video, and whether the fee is confirmed.
  const bookable = canBook(doctor);
  const video = doctor.offersVideo !== false;
  const from = video ? Math.min(doctor.fee, doctor.videoFee) : doctor.fee;
  const description = [
    `${bookable ? 'Book ' : ''}${doctor.name}, ${lower(doctor.title)} at ${doctor.clinicName}, ${doctor.area}.`,
    doctor.experienceYears > 0 ? `${doctor.experienceYears} years of experience.` : '',
    from > 0
      ? `Consultation ${doctor.feeVerified === false ? 'approx. ' : 'from '}₹${from.toLocaleString('en-IN')}.`
      : '',
    bookable
      ? video
        ? 'Video consult or in-clinic visit on Curxx.'
        : 'In-clinic visits on Curxx.'
      : 'Timings, fees and clinic contact on Curxx.',
  ]
    .filter(Boolean)
    // Keep it within 155 characters by dropping whole trailing sentences.
    .reduce(
      (out, part) => (out && `${out} ${part}`.length > 155 ? out : out ? `${out} ${part}` : part),
      '',
    );
  return {
    title,
    description,
    alternates: { canonical: `/doctor/${doctor.slug}` },
    openGraph: { title, description, type: 'profile' },
  };
}

export default async function DoctorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();

  const query = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const wanted = first(query.mode);
  const mode = wanted === 'video' || wanted === 'audio' ? wanted : 'clinic';
  const [{ slots }, { videos }, { settings }] = await Promise.all([
    api.slots(slug).catch(() => ({ slots: [] })),
    api.videos({ doctor: slug, limit: 12 }).catch(() => ({ videos: [] })),
    api.siteSettings().catch(() => ({ settings: {} as Record<string, string> })),
  ]);
  const contact = {
    phone: settings['contact-phone'] ?? '',
    whatsapp: settings['contact-whatsapp'] ?? '',
  };

  return (
    <DoctorProfile
      doctor={data.doctor}
      facility={data.facility}
      similar={data.similar}
      slots={slots}
      mode={mode}
      slotId={first(query.slot)}
      videos={videos}
      contact={contact}
    />
  );
}
