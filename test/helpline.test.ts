import { describe, expect, it } from 'vitest';
import { HELPLINE, HELPLINE_HREF } from '../src/lib/helpline';

describe('helpline', () => {
  it('shows +91 85850 84840 and dials the same number', () => {
    expect(HELPLINE.display).toBe('+91 85850 84840');
    expect(HELPLINE_HREF).toBe('tel:+918585084840');
    expect(HELPLINE.display.replace(/\D/g, '')).toBe(HELPLINE.tel.replace(/\D/g, ''));
  });
});
