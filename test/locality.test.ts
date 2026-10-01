import { describe, expect, it } from 'vitest';
import { localityHref, thinLocality } from '../src/lib/locality';

describe('locality pages and tables', () => {
  it('pages with fewer than 3 doctors are thin (noindex, follow)', () => {
    expect(thinLocality(0)).toBe(true);
    expect(thinLocality(2)).toBe(true);
    expect(thinLocality(3)).toBe(false);
  });

  it('every table row links: the locality page, else the filtered listing', () => {
    expect(localityHref('delhi', 'general-physician', { name: 'Saket', slug: 'saket' })).toBe(
      '/delhi/general-physician/saket',
    );
    expect(localityHref('delhi', 'doctors', { name: 'Vasant Kunj Sector C', slug: null })).toBe(
      '/delhi/doctors?area=Vasant%20Kunj%20Sector%20C',
    );
  });
});
