import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DoctorCard, { slotLabel } from '../src/components/DoctorCard';
import {
  DOCTOR_PLACEHOLDER,
  doctorPhoto,
  hasReviews,
  photo,
  rupees,
  type Doctor,
} from '../src/lib/api';

const doctor: Doctor = {
  id: 'doctor-1',
  slug: 'dr-asha-rao',
  name: 'Dr. Asha Rao',
  qualification: 'MBBS, MD',
  title: 'Dermatologist',
  specialty: 'dermatology',
  city: 'Bengaluru',
  area: 'Indiranagar',
  clinicName: 'Curxx Clinic',
  experienceYears: 12,
  fee: 750,
  videoFee: 600,
  rating: 0,
  reviewCount: 0,
  recommendPercent: 0,
  languages: ['English', 'Hindi'],
  photoUrl: '',
  about: '',
  verified: false,
  feeVerified: false,
};

afterEach(() => vi.useRealTimers());

describe('API display helpers', () => {
  it('formats rupees and portraits without making requests', () => {
    expect(rupees(125000)).toBe('₹1,25,000');
    expect(photo('https://lh3.googleusercontent.com/a/profile', 176)).toBe(
      'https://lh3.googleusercontent.com/a/profile=w176',
    );
    expect(photo('https://lh3.googleusercontent.com/a/profile=w80', 176)).toBe(
      'https://lh3.googleusercontent.com/a/profile=w80',
    );
    expect(doctorPhoto(undefined, 176)).toBe(DOCTOR_PLACEHOLDER);
    expect(doctorPhoto('', 176, 'female')).toBe('/images/doctor-female.svg');
    expect(doctorPhoto(null, 176, 'male')).toBe('/images/doctor-male.svg');
    expect(DOCTOR_PLACEHOLDER).toBe('/images/doctor-neutral.svg');
    expect(doctorPhoto('https://example.com/a.jpg', 176, 'male')).toBe('https://example.com/a.jpg');
    expect(hasReviews({ reviewCount: 0 })).toBe(false);
    expect(hasReviews({ reviewCount: 1 })).toBe(true);
  });

  it('labels upcoming slots relative to today', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-30T06:00:00.000Z'));

    expect(slotLabel(new Date('2026-09-30T07:00:00.000Z').toISOString())).toMatch(/^Today,/);
    expect(slotLabel(new Date('2026-10-01T07:00:00.000Z').toISOString())).toMatch(/^Tomorrow,/);
  });
});

describe('DoctorCard', () => {
  it('shows new and approximate-fee states', () => {
    const markup = renderToStaticMarkup(<DoctorCard doctor={doctor} onOpen={() => undefined} />);

    expect(markup).toContain('New on Curxx');
    expect(markup).toContain('Approx.');
    expect(markup).toContain('₹750');
  });
});

describe('one doctor card everywhere', () => {
  it('works without a card-wide click (server-rendered lists): the name links to the profile', () => {
    const markup = renderToStaticMarkup(<DoctorCard doctor={doctor} />);
    expect(markup).toContain('href="/doctor/dr-asha-rao"');
    expect(markup).not.toContain('cursor-pointer');
  });

  it('lists each doctor once', async () => {
    const { uniqueDoctors } = await import('../src/lib/api');
    const twin = { ...doctor, slug: 'asha-rao-dermatologist-bengaluru' };
    const other = { ...doctor, slug: 'dr-asha-rao-2', experienceYears: 3 };
    expect(uniqueDoctors([doctor, twin, doctor, other]).map((d) => d.slug)).toEqual([
      'dr-asha-rao',
      'dr-asha-rao-2',
    ]);
  });
});
