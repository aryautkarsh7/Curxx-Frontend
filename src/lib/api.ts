/**
 * Typed client for the Curxx API (Fastify, see ../../backend).
 * Server components call it directly; browser code goes through the same helpers
 * so the JWT and error shape are handled in one place.
 */
import type { CityInfo, ConditionInfo, FacilityTypeInfo, SpecialtyInfo, SurgeryInfo } from './catalogue-data';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');

export const TOKEN_KEY = 'curxx_token';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly code?: string,
    /** The request field the error is about, e.g. "address.pincode". */
    readonly field?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Human message for any thrown value — API errors carry their own copy. */
export const errorMessage = (error: unknown, fallback = 'Something went wrong. Please try again.') =>
  error instanceof ApiError ? error.message : error instanceof TypeError ? 'Can’t reach Curxx right now. Check your connection and try again.' : fallback;

// ---------------------------------------------------------------- Types

export type Paged<T> = { items: T[]; total: number; page: number; limit: number; pages: number };
export type Facet = { value: string; count: number };

export type Doctor = {
  id: string;
  slug: string;
  name: string;
  gender?: 'female' | 'male';
  qualification: string;
  title: string;
  specialty: string;
  city: string;
  area: string;
  clinicName: string;
  facilitySlug?: string;
  experienceYears: number;
  fee: number;
  videoFee: number;
  rating: number;
  reviewCount: number;
  recommendPercent: number;
  languages: string[];
  photoUrl: string;
  about: string;
  verified: boolean;
  registration?: string;
  education?: { degree: string; institute: string; year: number }[];
  /** Sub-specialty slugs this doctor treats, matching `Specialty.subSpecialties`. */
  focusAreas?: string[];
  /** Earliest open slot, computed by the listing query. */
  nextSlotAt?: string | null;
  /** That slot itself, so a card can deep-link straight to it. */
  nextSlot?: Slot | null;
  /** Offers a couple of free video consults every day. */
  freeVideo?: boolean;
  /** Online round the clock. */
  instant?: boolean;
  /** False for doctors who only see patients in person. */
  offersVideo?: boolean;
  /** Human summary of the weekly schedule, e.g. "Mon–Sat · 10:00 AM – 1:30 PM". */
  consultHours?: string;
  /** Direct numbers for the Call / WhatsApp buttons (empty = the clinic's, then Curxx's). */
  phone?: string;
  whatsapp?: string;
};

export type DoctorDetail = Doctor & {
  focusAreaNames: string[];
  specialtyName: string;
  specialtyPlural: string;
  cityName: string;
  services: (SubSpecialty & { focus: boolean })[];
  reviewSummary: { average: number; total: number };
};

export type SubSpecialty = { slug: string; name: string; description: string; icon: string };

export type Specialty = {
  slug: string;
  name: string;
  plural: string;
  icon: string;
  fromPrice: number;
  subSpecialties: SubSpecialty[];
  category?: string;
  description?: string;
  videoFrom?: number;
  video?: boolean;
  popular?: boolean;
  conditions?: string[];
  whenToSee?: string[];
  related?: string[];
  /** Doctors in the requested city. */
  doctorCount?: number;
  /** Doctors offering the requested mode. */
  availableDoctors?: number;
};

export type Slot = { id: string; startsAt: string; mode: 'clinic' | 'video'; fee: number; free?: boolean };

export type Faq = { question: string; answer: string };
export type LinkCount = { slug: string; name: string; count: number };

/** SEO content for a specialty listing, specific to specialty × city × locality. */
export type SpecialtyContent = {
  specialty: { slug: string; name: string; plural: string; icon: string; category: string; description: string; video: boolean; subSpecialties: SubSpecialty[] };
  city: { slug: string; name: string; state: string };
  locality: { slug: string; name: string; pincode: string } | null;
  place: string;
  stats: { doctors: number; minFee: number; maxFee: number; minVideoFee: number | null; video: number; free: number; female: number; rating: number | null; experience: number | null; reviews: number };
  intro: string;
  about: string[];
  conditions: string[];
  whenToSee: string[];
  faqs: Faq[];
  topDoctors: { slug: string; name: string; experienceYears: number; rating: number; reviewCount: number; area: string; fee: number }[];
  facilities: { slug: string; name: string; area: string; type: 'hospital' | 'clinic' }[];
  localities: LinkCount[];
  otherCities: LinkCount[];
  related: { slug: string; name: string; plural: string; icon: string }[];
  relatedConditions: { slug: string; name: string }[];
  surgeries: { slug: string; name: string }[];
};

export type ConditionDetail = {
  condition: { slug: string; name: string; specialty: string; focus: string; summary: string; symptoms: string[]; causes: string[]; treatments: string[]; selfCare: string[]; whenToSee: string[]; popular?: string };
  city: { slug: string; name: string };
  specialty: { slug: string; name: string; plural: string; icon: string; video: boolean } | null;
  focus: SubSpecialty | null;
  doctorCount: number;
  article: { id: string; slug: string; title: string; excerpt: string; readMinutes: number } | null;
  related: { slug: string; name: string; specialty: string; summary: string }[];
  otherCities: { slug: string; name: string }[];
  faqs: Faq[];
};

export type SurgerySummary = { slug: string; name: string; category: string; specialty: string; icon: string; popular: boolean; description: string; stay: string; recovery: string; cost: [number, number]; insurance: boolean };
export type SurgeryDetail = {
  surgery: SurgerySummary & { treats: string[]; techniques: string[]; durationMinutes: [number, number]; anaesthesia: string; steps: string[]; benefits: string[]; risks: string[]; departments: string[] };
  city: { slug: string; name: string };
  specialty: { slug: string; name: string; plural: string } | null;
  hospitals: { id: string; slug: string; name: string; area: string; category: string; rating: number; reviewCount: number; nabh: boolean; beds: number; insurers: string[]; emergency24x7: boolean }[];
  surgeons: Pick<Doctor, 'id' | 'slug' | 'name' | 'title' | 'experienceYears' | 'rating' | 'reviewCount' | 'area' | 'clinicName' | 'photoUrl' | 'qualification' | 'fee'>[];
  related: SurgerySummary[];
  otherCities: { slug: string; name: string }[];
  faqs: Faq[];
};

export type Suggestions = {
  q: string;
  city: string;
  specialties: { slug: string; name: string; plural: string; icon: string }[];
  conditions: { slug: string; name: string; specialty: string }[];
  doctors: { slug: string; name: string; specialty: string; area: string; photoUrl: string }[];
  facilities: { slug: string; name: string; area: string; category: string }[];
  surgeries: { slug: string; name: string; category: string }[];
  tests: { slug: string; name: string; kind: string; price: number }[];
};

export type SessionUser = {
  id: string;
  phone: string;
  name: string;
  email: string;
  gender: '' | 'female' | 'male' | 'other';
  dob: string | null;
  bloodGroup: string;
  abhaId: string;
};

/** How a consultation happens. `audio` is a phone teleconsultation on a video slot: the doctor calls the patient. */
export type ConsultMode = 'clinic' | 'video' | 'audio';

export type Appointment = {
  id: string;
  reference: string;
  doctorSlug: string;
  startsAt: string;
  mode: ConsultMode;
  amount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  focus?: string;
  notes?: string;
  patient: { name: string; age?: number; gender?: string; phone: string };
  doctor: Pick<Doctor, 'slug' | 'name' | 'title' | 'clinicName' | 'area' | 'photoUrl' | 'specialty' | 'facilitySlug' | 'fee' | 'videoFee'> | null;
  room: { opensAt: string; closesAt: string; canJoin: boolean };
  createdAt: string;
};

export type Message = { id: string; from: 'patient' | 'doctor' | 'system'; text: string; attachment?: { name: string; size: number }; createdAt: string };

export type Review = {
  id: string;
  doctorSlug: string;
  author: string;
  rating: number;
  text: string;
  mode: 'clinic' | 'video';
  tags: string[];
  helpful: number;
  verified: boolean;
  visitedFor: string;
  createdAt: string;
};
export type ReviewSummary = { average: number; total: number; breakdown: Record<'1' | '2' | '3' | '4' | '5', number>; byMode: { clinic: number; video: number } };

export type Facility = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  type: 'hospital' | 'clinic';
  /** One of the 19 facility types, e.g. "Eye Hospital". */
  category?: string;
  categoryInfo?: { name: string; slug: string; icon: string; description: string } | null;
  opdHours?: string;
  pincode?: string;
  specialties?: string[];
  city: string;
  area: string;
  address: string;
  phone: string;
  tagline: string;
  about: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  emergency24x7: boolean;
  nabh: boolean;
  beds: number;
  established?: number;
  openHours: string;
  departments: string[];
  services: string[];
  amenities: string[];
  insurers: string[];
  photoUrl: string;
  /** Extra photos (interior, equipment) beside the main one. */
  gallery?: string[];
  doctorCount?: number;
  whatsapp?: string;
};

export type Medicine = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  manufacturer: string;
  composition: string;
  form: string;
  packSize: string;
  price: number;
  mrp: number;
  categories: string[];
  rxRequired: boolean;
  stock: number;
  icon: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  discountPct?: number;
  description?: string;
  uses?: string[];
  sideEffects?: string[];
  howToUse?: string;
  safetyAdvice?: string[];
  storage?: string;
};
export type MedicineCategory = { id: string; slug: string; name: string; icon: string; featured: boolean; count: number };

export type LabParameterGroup = { name: string; icon: string; count: number; parameters: string[] };
export type LabTest = {
  id: string;
  slug: string;
  name: string;
  kind: 'package' | 'test' | 'scan' | 'procedure';
  /** False for scans and procedures that need a visit to the centre. */
  homeCollection?: boolean;
  department?: string;
  testsIncluded: number;
  fastingHours: string | null;
  fastingLabel: string;
  covers: string;
  highlights: string[];
  price: number;
  mrp: number;
  discount: number;
  turnaround: string;
  reportTime: string;
  sampleType: string;
  categories: string[];
  parameterGroups: LabParameterGroup[];
};
export type LabCategory = { id: string; slug: string; name: string; icon: string; packages: number; tests: number; group?: 'concern' | 'department' };
export type CollectionDay = { date: string; closed?: boolean; windows: { window: string; remaining: number; available: boolean }[] };
export type CollectionMode = 'home' | 'lab';

/** A partner lab as listed; `distanceKm`/`canCollect` are relative to the pincode asked about. */
export type LabSummary = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  type: 'reference' | 'centre' | 'imaging';
  city?: string;
  area: string;
  address: string;
  pincode: string;
  geo: { lat: number; lng: number };
  phone: string;
  tagline: string;
  accreditations: string[];
  rating: number;
  reviewCount: number;
  openHours: string;
  sundayHours: string;
  homeCollection: boolean;
  walkIn: boolean;
  collectionRadiusKm: number;
  reportTat: string;
  testCount: number;
  photoUrl: string;
  distanceKm: number;
  canCollect: boolean;
  whatsapp?: string;
};
export type Lab = LabSummary & {
  about: string;
  nablCertificate: string;
  established?: number;
  phlebotomists: number;
  pathologist?: { name: string; qualification: string; registration: string };
  tests: string[];
  equipment: string[];
  amenities: string[];
};
export type LabMatch = {
  place: { pincode: string; area: string; approximate: boolean; city?: string } | null;
  serviceable: boolean;
  /** Tests in the booking that need a visit to the centre. */
  visitOnly?: string[];
  reason: string | null;
  recommended: string | null;
  labs: (LabSummary & { offersAll: boolean; missingTests: string[]; canVisit: boolean; eligible: boolean })[];
};
export type Near = { pincode: string; area: string; approximate?: boolean; city?: string };

export type Address = { id?: string; label: string; name?: string; line1: string; line2?: string; area?: string; city?: string; pincode: string; phone: string; isDefault?: boolean };

export type OrderStatus = 'placed' | 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered' | 'sample_scheduled' | 'sample_collected' | 'report_ready' | 'cancelled';
export type Order = {
  id: string;
  reference: string;
  kind: 'pharmacy' | 'lab';
  items: { slug: string; name: string; price: number; mrp: number; qty: number; rxRequired: boolean }[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  /** Absent on walk-in lab visits. */
  address?: Address;
  patient?: { name: string; age?: number; gender?: string; phone: string };
  pickup?: { date: string; window: string };
  collectionMode?: CollectionMode;
  lab?: { slug: string; name: string; area: string; address: string; phone: string; lat: number; lng: number; pathologist?: string };
  payment: { method: string; status: string };
  etaAt?: string;
  createdAt: string;
};

export type RecordKind = 'prescription' | 'lab_report' | 'imaging' | 'discharge' | 'vaccination' | 'invoice';
export type HealthRecord = {
  id: string;
  kind: RecordKind;
  title: string;
  doctorName: string;
  facility: string;
  date: string;
  summary: string;
  tags: string[];
  source: 'curxx' | 'upload' | 'abha';
  fileName: string;
  fileSize: number;
  mimeType: string;
  findings: { name: string; value: string; unit: string; range: string; flag: 'normal' | 'high' | 'low' }[];
  medicines: { name: string; dosage: string; duration: string }[];
  createdAt: string;
};
export type AccessGrant = {
  id: string;
  grantee: { name: string; kind: 'doctor' | 'hospital' | 'family' | 'insurer'; detail: string };
  scope: 'all' | 'prescriptions' | 'lab_reports' | 'selected';
  permission: 'view' | 'download';
  records: string[];
  expiresAt: string;
  status: 'active' | 'revoked' | 'expired';
  lastAccessedAt?: string;
  createdAt: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  coverUrl: string;
  author: { name: string; slug: string; title: string };
  publishedAt: string;
  featured: boolean;
  tags: string[];
  keyTakeaways?: string[];
  sections?: { heading: string; body: string }[];
};

export type Notification = { id: string; icon: string; title: string; body: string; href: string; at: string; tone: 'info' | 'success' | 'warning' };

export type TriageResult = {
  urgency: 'emergency' | 'urgent' | 'soon' | 'routine';
  headline: string;
  redFlags: string[];
  reasons?: string[];
  advice: string[];
  specialty: Pick<Specialty, 'slug' | 'name' | 'plural' | 'icon' | 'fromPrice'> | null;
  focus: Pick<SubSpecialty, 'slug' | 'name' | 'description'> | null;
  matched: string[];
  doctors: Doctor[];
};

export type SearchResults = {
  q: string;
  city?: string;
  conditions?: { slug: string; name: string; specialty: string; summary: string }[];
  specialties: Pick<Specialty, 'slug' | 'name' | 'plural' | 'icon' | 'fromPrice'>[];
  doctors: Doctor[];
  medicines: Pick<Medicine, 'id' | 'slug' | 'name' | 'subtitle' | 'price' | 'mrp' | 'icon' | 'imageUrl' | 'rxRequired'>[];
  labTests: Pick<LabTest, 'id' | 'slug' | 'name' | 'kind' | 'price' | 'mrp' | 'testsIncluded'>[];
  facilities: Pick<Facility, 'id' | 'slug' | 'name' | 'type' | 'area' | 'rating'>[];
  articles: Pick<Article, 'id' | 'slug' | 'title' | 'category' | 'readMinutes'>[];
};

// ---------------------------------------------------------------- Editable website data

/** Editable single values (claims, links, images), keyed by setting slug. */
export type SiteSettings = Record<string, string>;

/** Counts the website shows about itself, computed from the database. */
export type SiteStats = {
  doctors: number;
  verifiedDoctors: number;
  instantDoctors: number;
  facilities: number;
  hospitals: number;
  clinics: number;
  accreditedFacilities: number;
  emergencyFacilities: number;
  labs: number;
  labTests: number;
  specialties: number;
  cities: number;
  conditions: number;
  surgeries: number;
  reviews: number;
  averageRating: number | null;
};

/** One editable page section; `items` has a section-specific shape. */
export type ContentSection<T = unknown> = { title: string; intro: string; items: T[] };

export type Testimonial = {
  slug: string;
  audience: 'patient' | 'provider';
  name: string;
  initials: string;
  location: string;
  city: string;
  rating: number;
  text: string;
  doctorSlug?: string;
  badge?: { icon: string; label: string };
};

export type Plan = {
  slug: string;
  audience: 'plus' | 'provider';
  name: string;
  tagline: string;
  price: number;
  period: string;
  members: string;
  highlight: boolean;
  badge: string;
  perks: string[];
  excluded: string[];
  ctaLabel: string;
};

export type RoutingCatalogue = {
  cities: (CityInfo & { popularOrder: number })[];
  specialtyCategories: string[];
  specialties: (SpecialtyInfo & { homeOrder: number })[];
  specialtyAliases: Record<string, string>;
  conditions: (ConditionInfo & { popularOrder: number })[];
  surgeryCategories: string[];
  surgeries: SurgeryInfo[];
  facilityTypes: FacilityTypeInfo[];
};

export type Registration = { name: string; email?: string; gender?: 'female' | 'male' | 'other' | ''; dob?: string };

// ---------------------------------------------------------------- Transport

type Options = RequestInit & { token?: string | null };

async function request<T>(path: string, options: Options = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const response = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: {
      ...(rest.body ? { 'content-type': 'application/json' } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const payload = await response.json().catch(() => null);
  // A rejected token means the session is over everywhere, not just for this call.
  if (response.status === 401 && token && typeof window !== 'undefined') window.dispatchEvent(new Event('curxx:unauthorized'));
  if (!response.ok) {
    const body = payload as { message?: string; error?: string; field?: string } | null;
    throw new ApiError(response.status, body?.message ?? `Request failed (${response.status})`, body?.error, body?.field);
  }
  return payload as T;
}

/** What a Call / WhatsApp tap or a wrong-info report is about. */
export type ProfileType = 'doctor' | 'facility' | 'lab' | 'lab-test' | 'medicine' | 'site';

/** A reel or video added in the admin panel; `embedUrl` is ready for an iframe (or a <video> for files). */
export type Video = {
  id: string;
  slug: string;
  title: string;
  kind: 'reel' | 'video';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  doctorSlug?: string;
  provider: 'youtube' | 'instagram' | 'file' | 'link';
  embedUrl: string;
};

/** Catalogue reads are safe to cache briefly; everything else must be fresh. */
const cached = (seconds: number): RequestInit => ({ next: { revalidate: seconds } } as RequestInit);
const fresh: RequestInit = { cache: 'no-store' };
const send = (method: string, body: unknown, token?: string | null): Options => ({ method, body: JSON.stringify(body ?? {}), token, ...fresh });

function qs(query: Record<string, string | number | boolean | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '' && value !== false) params.set(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : '';
}

// ---------------------------------------------------------------- Queries

export type DoctorQuery = {
  city?: string;
  specialty?: string;
  focus?: string;
  q?: string;
  mode?: 'clinic' | 'video';
  area?: string;
  language?: string;
  availability?: 'now' | 'today' | 'tomorrow' | 'next-7-days';
  /** Only doctors with a free video consult. */
  free?: boolean;
  maxFee?: number;
  minExperience?: number;
  sort?: 'relevance' | 'fee_asc' | 'fee_desc' | 'experience' | 'rating' | 'soonest';
  page?: number;
  limit?: number;
};

export type DoctorList = { doctors: Doctor[]; page: number; limit: number; total: number; pages: number; facets?: { areas: Facet[]; languages: Facet[] }; matchedSpecialties?: string[] };

export type FacilityQuery = {
  city?: string;
  type?: 'hospital' | 'clinic';
  category?: string;
  /** Facility type slugs to leave out, comma-separated. */
  excludeCategory?: string;
  specialty?: string;
  area?: string;
  department?: string;
  emergency?: boolean;
  q?: string;
  sort?: 'distance' | 'rating' | 'reviews';
  /** With sort=distance: measure from this point instead of the listed distance. */
  lat?: number;
  lng?: number;
  /** …or from a known pincode (the patient's locality). */
  pincode?: string;
  page?: number;
  limit?: number;
};
export type MedicineQuery = { category?: string; q?: string; rx?: 'required' | 'otc'; sort?: 'popular' | 'price_asc' | 'price_desc' | 'discount' | 'rating'; page?: number; limit?: number };
export type LabQuery = { category?: string; kind?: LabTest['kind']; department?: string; homeCollection?: boolean; q?: string; sort?: 'popular' | 'price_asc' | 'price_desc' | 'discount'; page?: number; limit?: number };

export type PharmacyOrderInput = { kind: 'pharmacy'; items: { slug: string; qty: number }[]; address: Address; prescriptionId?: string; paymentMethod: 'upi' | 'card' | 'cod' };
export type LabDirectoryQuery = { city?: string; pincode?: string; area?: string; q?: string; test?: string; accreditation?: 'NABL' | 'CAP' | 'ISO 15189'; homeCollection?: boolean; walkIn?: boolean; sort?: 'distance' | 'rating' | 'reviews'; page?: number; limit?: number };
export type LabOrderInput = { kind: 'lab'; items: { slug: string }[]; collectionMode: CollectionMode; labSlug: string; address?: Address; patient: { name: string; age?: number; gender?: string; phone: string }; pickup: { date: string; window: string }; paymentMethod: 'upi' | 'card' | 'cod' };

export const api = {
  // Catalogue — doctors
  specialties: (mode?: 'clinic' | 'video', city?: string) => request<{ specialties: Specialty[]; categories?: string[] }>(`/specialties${qs({ mode, city })}`, cached(mode ? 60 : 300)),
  specialtyContent: (slug: string, city: string, area?: string) => request<SpecialtyContent>(`/specialties/${slug}${qs({ city, area })}`, cached(300)),
  cities: () => request<{ cities: { slug: string; name: string; state: string; tier: number; doctorCount: number; localities: { slug: string; name: string; pincode: string }[] }[] }>('/cities', cached(600)),
  conditions: () => request<{ conditions: { slug: string; name: string; specialty: string; summary: string; popular: string | null }[] }>('/conditions', cached(600)),
  condition: (slug: string, city: string) => request<ConditionDetail>(`/conditions/${slug}${qs({ city })}`, cached(300)),
  surgeries: (city: string) => request<{ categories: string[]; city: { slug: string; name: string }; surgeries: SurgerySummary[] }>(`/surgeries${qs({ city })}`, cached(300)),
  surgery: (slug: string, city: string) => request<SurgeryDetail>(`/surgeries/${slug}${qs({ city })}`, cached(300)),
  suggest: (q: string, city: string) => request<Suggestions>(`/search/suggest${qs({ q, city })}`, cached(60)),
  doctors: (query: DoctorQuery = {}) => request<DoctorList>(`/doctors${qs({ city: 'bangalore', ...query })}`, cached(60)),
  doctor: (slug: string) => request<{ doctor: DoctorDetail; facility: Facility | null; similar: Doctor[] }>(`/doctors/${slug}`, cached(60)),
  slots: (slug: string, mode?: 'clinic' | 'video') => request<{ slots: Slot[] }>(`/doctors/${slug}/slots${qs({ mode })}`, fresh),
  reviews: (slug: string, query: { sort?: string; mode?: 'clinic' | 'video'; page?: number; limit?: number } = {}) =>
    request<Paged<Review> & { summary: ReviewSummary }>(`/doctors/${slug}/reviews${qs(query)}`, fresh),
  writeReview: (slug: string, body: { rating: number; text: string; mode: 'clinic' | 'video'; visitedFor?: string; tags?: string[] }, token: string) =>
    request<{ review: Review }>(`/doctors/${slug}/reviews`, send('POST', body, token)),
  markHelpful: (reviewId: string, token: string) => request<{ helpful: number; counted: boolean }>(`/reviews/${reviewId}/helpful`, send('POST', {}, token)),

  // Catalogue — facilities
  facilities: (query: FacilityQuery = {}) =>
    request<Paged<Facility> & { city?: string; facets: { areas: Facet[]; departments?: Facet[]; categories?: { value: string; label: string; group: string; icon: string; count: number }[] } }>(`/facilities${qs(query)}`, cached(60)),
  facility: (slug: string) => request<{ facility: Facility; doctors: Doctor[]; similar?: Facility[] }>(`/facilities/${slug}`, cached(60)),

  // Catalogue — pharmacy & labs
  medicineCategories: () => request<{ categories: MedicineCategory[] }>('/medicine-categories', cached(300)),
  medicines: (query: MedicineQuery = {}) => request<Paged<Medicine>>(`/medicines${qs(query)}`, cached(60)),
  medicine: (slug: string) => request<{ medicine: Medicine; substitutes: Medicine[]; similar: Medicine[] }>(`/medicines/${slug}`, cached(60)),
  labCategories: () => request<{ categories: LabCategory[] }>('/lab-categories', cached(300)),
  labTests: (query: LabQuery = {}) => request<Paged<LabTest>>(`/lab-tests${qs(query)}`, cached(60)),
  labTest: (slug: string, pincode?: string, city?: string) =>
    request<{ test: LabTest; related: LabTest[]; availability: { labCount: number; near: Near; nearest: (LabSummary & { canCollect: boolean }) | null } }>(`/lab-tests/${slug}${qs({ pincode, city })}`, cached(60)),
  collectionSlots: (lab?: string, mode: CollectionMode = 'home') => request<{ lab: string; mode: CollectionMode; days: CollectionDay[] }>(`/lab-collection-slots${qs({ lab, mode })}`, fresh),
  labs: (query: LabDirectoryQuery = {}) => request<Paged<LabSummary> & { near: Near; facets: { areas: Facet[]; accreditations: Facet[] } }>(`/labs${qs(query)}`, cached(60)),
  lab: (slug: string, pincode?: string) => request<{ lab: Lab; near: Near; tests: LabTest[]; nearby: LabSummary[] }>(`/labs/${slug}${qs({ pincode })}`, cached(60)),
  labMatch: (query: { pincode?: string; city?: string; tests: string[]; mode: CollectionMode }) => request<LabMatch>(`/labs/match${qs({ ...query, tests: query.tests.join(',') })}`, fresh),

  // Editable website data (admin panel → Website)
  // Engagement
  track: (body: { kind: 'call' | 'whatsapp'; targetType: ProfileType; targetSlug: string; number: string; page: string }, token?: string | null) =>
    // keepalive: the tap usually navigates away (tel:, wa.me) — let the request finish anyway.
    request<{ ok: true }>('/track', { ...send('POST', body, token), keepalive: true }),
  report: (body: { targetType: ProfileType; targetSlug: string; issues: string[]; details: string; contact: string; page: string }, token?: string | null) =>
    request<{ report: { id: string } }>('/reports', send('POST', body, token)),
  videos: (query: { doctor?: string; specialty?: string; city?: string; featured?: boolean; limit?: number }) =>
    request<{ videos: Video[] }>(`/videos${qs({ ...query, featured: query.featured ? 'true' : undefined })}`, cached(120)),

  siteSettings: () => request<{ settings: SiteSettings }>('/site/settings', cached(300)),
  siteStats: () => request<{ stats: SiteStats }>('/site/stats', cached(300)),
  /** Sections of one or more pages, keyed "page/section". */
  content: (...pages: string[]) => request<{ sections: Record<string, ContentSection> }>(`/content/${pages.join(',')}`, cached(300)),
  testimonials: (audience: Testimonial['audience'] = 'patient') => request<{ testimonials: Testimonial[] }>(`/testimonials${qs({ audience })}`, cached(300)),
  plans: (audience: Plan['audience'] = 'plus') => request<{ plans: Plan[] }>(`/plans${qs({ audience })}`, cached(300)),
  routing: () => request<RoutingCatalogue>('/catalogue/routing', cached(300)),

  // Content
  articles: (query: { category?: string; featured?: boolean; page?: number; limit?: number } = {}) =>
    request<Paged<Article> & { categories: Facet[] }>(`/articles${qs(query)}`, cached(120)),
  article: (slug: string) => request<{ article: Article; author: Doctor | null; related: Article[] }>(`/articles/${slug}`, cached(120)),
  search: (q: string, city?: string) => request<SearchResults>(`/search${qs({ q, city })}`, fresh),
  triage: (body: { symptoms: string; age?: number; durationDays?: number; severity?: 'mild' | 'moderate' | 'severe'; forWhom?: 'self' | 'child' | 'parent' | 'other'; city?: string }) =>
    request<TriageResult>('/triage', send('POST', body)),
  lead: (body: { kind: 'provider' | 'hospital' | 'corporate' | 'callback' | 'newsletter' | 'surgery' | 'plus'; surgery?: string; name?: string; phone?: string; email?: string; organisation?: string; city?: string; specialty?: string; message?: string; source?: string }) =>
    request<{ lead: { id: string; kind: string } }>('/leads', send('POST', body)),

  // Auth & profile
  requestOtp: (phone: string, intent: 'login' | 'register' | 'any' = 'any') =>
    request<{ phone: string; registered?: boolean; expiresInSeconds: number; devCode?: string }>('/auth/otp/request', send('POST', { phone, intent })),
  verifyOtp: (phone: string, code: string, registration?: Registration) =>
    request<{ token: string; user: SessionUser }>('/auth/otp/verify', send('POST', { phone, code, registration })),
  me: (token: string) => request<{ user: SessionUser }>('/auth/me', { token, ...fresh }),
  updateProfile: (patch: Partial<Omit<SessionUser, 'id' | 'phone'>>, token: string) => request<{ user: SessionUser }>('/auth/me', send('PATCH', patch, token)),

  // Booking & consults
  holdSlot: (slotId: string, token: string) => request<{ slotId: string; expiresAt: string; holdSeconds: number }>(`/slots/${slotId}/hold`, send('POST', {}, token)),
  book: (body: { slotId: string; patient: Appointment['patient']; focus?: string; notes?: string; mode?: ConsultMode }, token: string) =>
    request<{ appointment: Appointment }>('/appointments', send('POST', body, token)),
  appointments: (token: string) => request<{ appointments: Appointment[] }>('/appointments', { token, ...fresh }),
  appointment: (idOrRef: string, token: string) => request<{ appointment: Appointment }>(`/appointments/${idOrRef}`, { token, ...fresh }),
  cancel: (id: string, token: string) => request<{ appointment: Appointment }>(`/appointments/${id}/cancel`, send('PATCH', {}, token)),
  reschedule: (id: string, slotId: string, token: string) => request<{ appointment: Appointment }>(`/appointments/${id}/reschedule`, send('PATCH', { slotId }, token)),
  messages: (id: string, token: string) => request<{ messages: Message[] }>(`/appointments/${id}/messages`, { token, ...fresh }),
  sendMessage: (id: string, body: { text: string; attachment?: { name: string; size: number } }, token: string) =>
    request<{ messages: Message[] }>(`/appointments/${id}/messages`, send('POST', body, token)),

  // Orders
  placeOrder: (body: PharmacyOrderInput | LabOrderInput, token: string) => request<{ order: Order }>('/orders', send('POST', body, token)),
  orders: (token: string, kind?: 'pharmacy' | 'lab') => request<{ orders: Order[] }>(`/orders${qs({ kind })}`, { token, ...fresh }),
  order: (reference: string, token: string) => request<{ order: Order }>(`/orders/${reference}`, { token, ...fresh }),
  cancelOrder: (reference: string, token: string) => request<{ order: Order }>(`/orders/${reference}/cancel`, send('PATCH', {}, token)),

  // Records & consent
  records: (token: string, query: { kind?: RecordKind; q?: string } = {}) =>
    request<{ records: HealthRecord[]; counts: Partial<Record<RecordKind, number>> }>(`/records${qs(query)}`, { token, ...fresh }),
  record: (id: string, token: string) => request<{ record: HealthRecord }>(`/records/${id}`, { token, ...fresh }),
  uploadRecord: (body: { kind: RecordKind; title: string; doctorName?: string; facility?: string; date: string; summary?: string; fileName: string; fileSize: number; mimeType: string }, token: string) =>
    request<{ record: HealthRecord }>('/records', send('POST', body, token)),
  deleteRecord: (id: string, token: string) => request<{ ok: true }>(`/records/${id}`, { method: 'DELETE', token, ...fresh }),
  grants: (token: string) => request<{ grants: AccessGrant[] }>('/access', { token, ...fresh }),
  grantAccess: (body: { granteeName: string; granteeKind: AccessGrant['grantee']['kind']; granteeDetail?: string; scope: AccessGrant['scope']; recordIds?: string[]; hours: number; permission: AccessGrant['permission'] }, token: string) =>
    request<{ grant: AccessGrant }>('/access', send('POST', body, token)),
  revokeAccess: (id: string, token: string) => request<{ grant: AccessGrant }>(`/access/${id}/revoke`, send('PATCH', {}, token)),

  // Account
  saved: (token: string) => request<{ doctors: Doctor[]; articles: Article[]; slugs: { doctors: string[]; articles: string[] } }>('/me/saved', { token, ...fresh }),
  save: (kind: 'doctors' | 'articles', slug: string, token: string) => request<{ saved: boolean; slugs: { doctors: string[]; articles: string[] } }>(`/me/saved/${kind}/${slug}`, send('PUT', {}, token)),
  unsave: (kind: 'doctors' | 'articles', slug: string, token: string) => request<{ saved: boolean; slugs: { doctors: string[]; articles: string[] } }>(`/me/saved/${kind}/${slug}`, { method: 'DELETE', token, ...fresh }),
  addresses: (token: string) => request<{ addresses: Address[] }>('/me/addresses', { token, ...fresh }),
  addAddress: (body: Omit<Address, 'id'>, token: string) => request<{ addresses: Address[] }>('/me/addresses', send('POST', body, token)),
  setDefaultAddress: (id: string, token: string) => request<{ addresses: Address[] }>(`/me/addresses/${id}/default`, send('PATCH', {}, token)),
  deleteAddress: (id: string, token: string) => request<{ addresses: Address[] }>(`/me/addresses/${id}`, { method: 'DELETE', token, ...fresh }),
  notifications: (token: string) => request<{ notifications: Notification[] }>('/me/notifications', { token, ...fresh }),
  summary: (token: string) => request<{ upcomingAppointments: number; orders: number; records: number; activeGrants: number }>('/me/summary', { token, ...fresh }),
};

/** lh3 portrait URLs take a `=w<px>` size suffix; keep requests as small as they render. Other URLs are used as they are. */
export const photo = (url: string, width: number) => (!url ? '' : url.includes('googleusercontent.com/') && !/=w\d+$/.test(url) ? `${url}=w${width}` : url);

export const rupees = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

export const discountPct = (price: number, mrp: number) => (mrp > price ? Math.round((1 - price / mrp) * 100) : 0);
