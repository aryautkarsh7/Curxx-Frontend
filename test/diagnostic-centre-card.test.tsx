import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import DiagnosticCentreCard from '../src/components/labs/DiagnosticCentreCard';
import type { Facility } from '../src/lib/api';

const centre: Facility = {
  id: 'f1',
  slug: 'testcare-diagnostics-andheri',
  name: 'Testcare Diagnostics',
  shortName: 'Testcare Diagnostics',
  type: 'clinic',
  category: 'Diagnostic Center',
  city: 'mumbai',
  area: 'Andheri West',
  address: '1 Test Road, Andheri West, Mumbai',
  phone: '022 4000 0000',
  tagline: '',
  about: '',
  rating: 0,
  reviewCount: 0,
  distanceKm: 0,
  emergency24x7: false,
  nabh: false,
  beds: 0,
  openHours: '',
  departments: [],
  services: [],
  amenities: [],
  insurers: [],
  photoUrl: '',
  source: 'doctar',
};

describe('Diagnostic centre card', () => {
  it('shows Call and Directions, and no tests, prices or booking', () => {
    const html = renderToStaticMarkup(<DiagnosticCentreCard centre={centre} />);
    expect(html).toContain('href="tel:02240000000"');
    expect(html).toContain('Directions');
    expect(html).toContain('href="/clinic/testcare-diagnostics-andheri"');
    expect(html).not.toMatch(/₹|Book/);
  });

  it('hides Call when the centre has no number', () => {
    expect(
      renderToStaticMarkup(<DiagnosticCentreCard centre={{ ...centre, phone: '' }} />),
    ).not.toContain('tel:');
  });
});
