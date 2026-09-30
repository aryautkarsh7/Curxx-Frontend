import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FacilityCard } from '../src/app/[city]/clinics/ClinicsListing';
import type { Facility } from '../src/lib/api';

const facility: Facility = {
  id: 'facility-1',
  slug: 'testcare-hospital',
  name: 'Testcare Hospital',
  shortName: 'Testcare Hospital',
  type: 'hospital',
  category: 'Multispecialty Hospital',
  city: 'kolkata',
  area: 'Salt Lake',
  address: '1 Test Road, Salt Lake, Kolkata',
  phone: '',
  tagline: '',
  about: '',
  rating: 0,
  reviewCount: 0,
  distanceKm: 0,
  emergency24x7: false,
  nabh: false,
  beds: 0,
  openHours: '',
  departments: ['Oral Surgeon', 'Ivf Specialist', 'Cardiology', 'Dentist'],
  services: [],
  amenities: [],
  insurers: [],
  photoUrl: '',
  doctorCount: 0,
  source: 'doctar',
};
/** The card's text, without markup. */
const text = (f: Facility) => renderToStaticMarkup(<FacilityCard f={f} />).replace(/<[^>]+>/g, '');

describe('FacilityCard', () => {
  it('with no doctors listed, shows only the specialities', () => {
    const card = text(facility);
    expect(card).not.toMatch(/doctors? listed/);
    expect(card).toContain('Specialities: Oral Surgeon, Ivf Specialist, Cardiology +1');
  });

  it('with doctors listed, shows the count and the specialities', () => {
    expect(text({ ...facility, doctorCount: 1 })).toContain(
      '1 doctor listed on Curxx · Specialities: Oral Surgeon',
    );
    expect(text({ ...facility, doctorCount: 12 })).toContain('12 doctors listed on Curxx');
  });

  it('with neither, shows no empty line', () => {
    const card = text({ ...facility, departments: [] });
    expect(card).not.toMatch(/doctors? listed|Specialities/);
  });
});
