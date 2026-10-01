import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import ProfileTypePicker from '../src/components/ProfileTypePicker';
import { partnerRole } from '../src/lib/api';

describe('Create account: profile type', () => {
  const html = renderToStaticMarkup(
    <ProfileTypePicker onPatient={() => undefined} onLogin={() => undefined} />,
  );

  it('shows the heading, five profile types and the log-in link', () => {
    expect(html).toContain('Create your account');
    expect(html).toContain('Select the profile type that best describes you');
    for (const title of [
      'Patient',
      'Doctor',
      'Hospital Owner',
      'Healthcare Professional',
      'Diagnostic Center',
    ])
      expect(html).toContain(title);
    expect(html).toContain('Already have an account?');
  });

  it('sends partners to the partner page with their type picked; patients stay for the OTP sign-up', () => {
    for (const role of ['doctor', 'hospital', 'professional', 'diagnostic'])
      expect(html).toContain(`href="/partner-with-us?role=${role}#enquiry"`);
    expect(html).not.toContain('role=patient');
  });

  it('only known profile types are read from the address', () => {
    expect(partnerRole('doctor')).toBe('doctor');
    expect(partnerRole('admin')).toBe('');
    expect(partnerRole(null)).toBe('');
  });
});
