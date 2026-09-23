/**
 * Typed client for the Curxx API (Fastify, see ../../backend).
 * Server components call it directly; browser code goes through the same helpers
 * so the JWT and error shape are handled in one place.
 */
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
};

export type DoctorDetail = Doctor & {
  focusAreaNames: string[];
  specialtyName: string;
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
  /** Doctors with an open slot this week, returned only when the catalogue is asked for a mode. */
  availableDoctors?: number;
};

export type Slot = { id: string; startsAt: string; mode: 'clinic' | 'video'; fee: number };

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

export type Appointment = {
  id: string;
  reference: string;
  doctorSlug: string;
  startsAt: string;
  mode: 'clinic' | 'video';
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
  doctorCount?: number;
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
  kind: 'package' | 'test';
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
export type LabCategory = { id: string; slug: string; name: string; icon: string; packages: number; tests: number };
export type CollectionDay = { date: string; closed?: boolean; windows: { window: string; remaining: number; available: boolean }[] };
export type CollectionMode = 'home' | 'lab';

/** A partner lab as listed; `distanceKm`/`canCollect` are relative to the pincode asked about. */
export type LabSummary = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  type: 'reference' | 'centre';
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
  place: { pincode: string; area: string; approximate: boolean } | null;
  serviceable: boolean;
  reason: string | null;
  recommended: string | null;
  labs: (LabSummary & { offersAll: boolean; missingTests: string[]; canVisit: boolean; eligible: boolean })[];
};
export type Near = { pincode: string; area: string; approximate?: boolean };

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
  specialties: Pick<Specialty, 'slug' | 'name' | 'plural' | 'icon' | 'fromPrice'>[];
  doctors: Doctor[];
  medicines: Pick<Medicine, 'id' | 'slug' | 'name' | 'subtitle' | 'price' | 'mrp' | 'icon' | 'imageUrl' | 'rxRequired'>[];
  labTests: Pick<LabTest, 'id' | 'slug' | 'name' | 'kind' | 'price' | 'mrp' | 'testsIncluded'>[];
  facilities: Pick<Facility, 'id' | 'slug' | 'name' | 'type' | 'area' | 'rating'>[];
  articles: Pick<Article, 'id' | 'slug' | 'title' | 'category' | 'readMinutes'>[];
};

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
  availability?: 'today' | 'tomorrow' | 'next-7-days';
  maxFee?: number;
  minExperience?: number;
  sort?: 'relevance' | 'fee_asc' | 'fee_desc' | 'experience' | 'rating';
  page?: number;
  limit?: number;
};

export type DoctorList = { doctors: Doctor[]; page: number; limit: number; total: number; pages: number; facets?: { areas: Facet[]; languages: Facet[] } };

export type FacilityQuery = { type?: 'hospital' | 'clinic'; area?: string; department?: string; emergency?: boolean; q?: string; sort?: 'distance' | 'rating' | 'reviews'; page?: number; limit?: number };
export type MedicineQuery = { category?: string; q?: string; rx?: 'required' | 'otc'; sort?: 'popular' | 'price_asc' | 'price_desc' | 'discount' | 'rating'; page?: number; limit?: number };
export type LabQuery = { category?: string; kind?: 'package' | 'test'; q?: string; sort?: 'popular' | 'price_asc' | 'price_desc' | 'discount'; page?: number; limit?: number };

export type PharmacyOrderInput = { kind: 'pharmacy'; items: { slug: string; qty: number }[]; address: Address; prescriptionId?: string; paymentMethod: 'upi' | 'card' | 'cod' };
export type LabDirectoryQuery = { pincode?: string; area?: string; q?: string; test?: string; accreditation?: 'NABL' | 'CAP' | 'ISO 15189'; homeCollection?: boolean; walkIn?: boolean; sort?: 'distance' | 'rating' | 'reviews'; page?: number; limit?: number };
export type LabOrderInput = { kind: 'lab'; items: { slug: string }[]; collectionMode: CollectionMode; labSlug: string; address?: Address; patient: { name: string; age?: number; gender?: string; phone: string }; pickup: { date: string; window: string }; paymentMethod: 'upi' | 'card' | 'cod' };

export const api = {
  // Catalogue — doctors
  specialties: (mode?: 'clinic' | 'video') => request<{ specialties: Specialty[] }>(`/specialties${qs({ mode })}`, cached(mode ? 60 : 300)),
  doctors: (query: DoctorQuery = {}) => request<DoctorList>(`/doctors${qs({ city: 'bangalore', ...query })}`, cached(60)),
  doctor: (slug: string) => request<{ doctor: DoctorDetail; facility: Facility | null; similar: Doctor[] }>(`/doctors/${slug}`, cached(60)),
  slots: (slug: string, mode?: 'clinic' | 'video') => request<{ slots: Slot[] }>(`/doctors/${slug}/slots${qs({ mode })}`, fresh),
  reviews: (slug: string, query: { sort?: string; mode?: 'clinic' | 'video'; page?: number; limit?: number } = {}) =>
    request<Paged<Review> & { summary: ReviewSummary }>(`/doctors/${slug}/reviews${qs(query)}`, fresh),
  writeReview: (slug: string, body: { rating: number; text: string; mode: 'clinic' | 'video'; visitedFor?: string; tags?: string[] }, token: string) =>
    request<{ review: Review }>(`/doctors/${slug}/reviews`, send('POST', body, token)),
  markHelpful: (reviewId: string, token: string) => request<{ helpful: number; counted: boolean }>(`/reviews/${reviewId}/helpful`, send('POST', {}, token)),

  // Catalogue — facilities
  facilities: (query: FacilityQuery = {}) => request<Paged<Facility> & { facets: { areas: Facet[] } }>(`/facilities${qs(query)}`, cached(60)),
  facility: (slug: string) => request<{ facility: Facility; doctors: Doctor[] }>(`/facilities/${slug}`, cached(60)),

  // Catalogue — pharmacy & labs
  medicineCategories: () => request<{ categories: MedicineCategory[] }>('/medicine-categories', cached(300)),
  medicines: (query: MedicineQuery = {}) => request<Paged<Medicine>>(`/medicines${qs(query)}`, cached(60)),
  medicine: (slug: string) => request<{ medicine: Medicine; substitutes: Medicine[]; similar: Medicine[] }>(`/medicines/${slug}`, cached(60)),
  labCategories: () => request<{ categories: LabCategory[] }>('/lab-categories', cached(300)),
  labTests: (query: LabQuery = {}) => request<Paged<LabTest>>(`/lab-tests${qs(query)}`, cached(60)),
  labTest: (slug: string, pincode?: string) =>
    request<{ test: LabTest; related: LabTest[]; availability: { labCount: number; near: Near; nearest: (LabSummary & { canCollect: boolean }) | null } }>(`/lab-tests/${slug}${qs({ pincode })}`, cached(60)),
  collectionSlots: (lab?: string, mode: CollectionMode = 'home') => request<{ lab: string; mode: CollectionMode; days: CollectionDay[] }>(`/lab-collection-slots${qs({ lab, mode })}`, fresh),
  labs: (query: LabDirectoryQuery = {}) => request<Paged<LabSummary> & { near: Near; facets: { areas: Facet[]; accreditations: Facet[] } }>(`/labs${qs(query)}`, cached(60)),
  lab: (slug: string, pincode?: string) => request<{ lab: Lab; near: Near; tests: LabTest[]; nearby: LabSummary[] }>(`/labs/${slug}${qs({ pincode })}`, cached(60)),
  labMatch: (query: { pincode?: string; tests: string[]; mode: CollectionMode }) => request<LabMatch>(`/labs/match${qs({ ...query, tests: query.tests.join(',') })}`, fresh),

  // Content
  articles: (query: { category?: string; featured?: boolean; page?: number; limit?: number } = {}) =>
    request<Paged<Article> & { categories: Facet[] }>(`/articles${qs(query)}`, cached(120)),
  article: (slug: string) => request<{ article: Article; author: Doctor | null; related: Article[] }>(`/articles/${slug}`, cached(120)),
  search: (q: string) => request<SearchResults>(`/search${qs({ q })}`, fresh),
  triage: (body: { symptoms: string; age?: number; durationDays?: number; severity?: 'mild' | 'moderate' | 'severe'; forWhom?: 'self' | 'child' | 'parent' | 'other' }) =>
    request<TriageResult>('/triage', send('POST', body)),
  lead: (body: { kind: 'provider' | 'hospital' | 'corporate' | 'callback' | 'newsletter'; name?: string; phone?: string; email?: string; organisation?: string; city?: string; specialty?: string; message?: string; source?: string }) =>
    request<{ lead: { id: string; kind: string } }>('/leads', send('POST', body)),

  // Auth & profile
  requestOtp: (phone: string) => request<{ phone: string; expiresInSeconds: number; devCode?: string }>('/auth/otp/request', send('POST', { phone })),
  verifyOtp: (phone: string, code: string) => request<{ token: string; user: SessionUser }>('/auth/otp/verify', send('POST', { phone, code })),
  me: (token: string) => request<{ user: SessionUser }>('/auth/me', { token, ...fresh }),
  updateProfile: (patch: Partial<Omit<SessionUser, 'id' | 'phone'>>, token: string) => request<{ user: SessionUser }>('/auth/me', send('PATCH', patch, token)),

  // Booking & consults
  holdSlot: (slotId: string, token: string) => request<{ slotId: string; expiresAt: string; holdSeconds: number }>(`/slots/${slotId}/hold`, send('POST', {}, token)),
  book: (body: { slotId: string; patient: Appointment['patient']; focus?: string; notes?: string }, token: string) =>
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

/** lh3 portrait URLs take a `=w<px>` size suffix; keep requests as small as they render. */
export const photo = (url: string, width: number) => (url ? `${url}=w${width}` : '');

export const rupees = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

export const discountPct = (price: number, mrp: number) => (mrp > price ? Math.round((1 - price / mrp) * 100) : 0);
