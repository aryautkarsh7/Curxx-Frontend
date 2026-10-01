import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import BookingWidget from '../src/components/BookingWidget';
import type { Doctor, Practice } from '../src/lib/api';

const doctor: Doctor = {
  id: 'd1',
  slug: 'dr-asha-testdoctor',
  name: 'Dr. Asha Testdoctor',
  qualification: 'MBBS',
  title: 'General Physician',
  specialty: 'general-physician',
  city: 'mumbai',
  area: 'Andheri West',
  clinicName: 'Testcare Hospital',
  experienceYears: 12,
  fee: 600,
  videoFee: 600,
  rating: 0,
  reviewCount: 0,
  recommendPercent: 0,
  languages: ['English'],
  photoUrl: '',
  about: '',
  verified: false,
  feeVerified: true,
  booking: 'none',
  source: 'doctar',
};
const practice: Practice = {
  facilitySlug: 'testcare-hospital-andheri',
  name: 'Testcare Hospital',
  area: 'Andheri West',
  address: '1 Test Road, Andheri West, Mumbai',
  city: 'mumbai',
  consultHours: 'Mon, Wed · 10:00 AM – 1:00 PM',
  fee: 700,
  feeFromSchedule: true,
  timings: [{ days: 'Mon, Wed', dayCount: 2, hours: ['10:00 AM – 1:00 PM'], allDay: false }],
};
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

describe('Booking card for doctors without online booking', () => {
  it('shows each place with its days, hours and fee', () => {
    const t = text(
      renderToStaticMarkup(<BookingWidget doctor={doctor} slots={[]} practices={[practice]} />),
    );
    expect(t).toContain('Timings &amp; fees');
    expect(t).toContain('Testcare Hospital');
    expect(t).toContain('Mon, Wed 10:00 AM – 1:00 PM');
    expect(t).toContain('Approx. ₹700');
  });

  it('without schedules, says to call', () => {
    const t = text(renderToStaticMarkup(<BookingWidget doctor={doctor} slots={[]} />));
    expect(t).toContain('Call to confirm timings');
  });
});

describe('Request an appointment', () => {
  it('is offered on Doctar listings, not when the team switched requests off', () => {
    const on = renderToStaticMarkup(
      <BookingWidget doctor={doctor} slots={[]} practices={[practice]} />,
    );
    expect(on).toContain('Request an appointment');
    const off = renderToStaticMarkup(
      <BookingWidget doctor={{ ...doctor, bookable: false }} slots={[]} practices={[practice]} />,
    );
    expect(off).not.toContain('Request an appointment');
  });

  it('offers the next 14 days in Indian time', async () => {
    const { nextDays } = await import('../src/components/profile/AppointmentRequestForm');
    const days = nextDays(new Date('2026-10-01T20:00:00.000Z'));
    expect(days).toHaveLength(14);
    expect(days[0]!.value).toBe('2026-10-02'); // 1:30 AM on 2 Oct in India
    expect(days[0]!.label).toMatch(/^Today, /);
  });
});
