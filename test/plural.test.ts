import { describe, expect, it } from 'vitest';
import { count, nounFor, singular } from '../src/lib/plural';

describe('plural helpers', () => {
  it('agrees the noun with the count', () => {
    expect(count(1, 'surgeon')).toBe('1 surgeon');
    expect(count(2, 'surgeon')).toBe('2 surgeons');
    expect(count(0, 'hospital')).toBe('0 hospitals');
    expect(count(12345, 'doctor')).toBe('12,345 doctors');
    expect(count(1, 'city', 'cities')).toBe('1 city');
    expect(count(3, 'city', 'cities')).toBe('3 cities');
    expect(nounFor(1, 'clinic')).toBe('clinic');
    expect(singular('General Surgeons')).toBe('General Surgeon');
  });
});
