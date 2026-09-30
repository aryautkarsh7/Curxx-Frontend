import { afterEach, describe, expect, it, vi } from 'vitest';
import robots from '../src/app/robots';

function rulesFor(env: { APP_ENV?: string; VERCEL_ENV?: string; NODE_ENV?: string }) {
  vi.stubEnv('APP_ENV', env.APP_ENV ?? '');
  vi.stubEnv('VERCEL_ENV', env.VERCEL_ENV ?? '');
  if (env.NODE_ENV) vi.stubEnv('NODE_ENV', env.NODE_ENV);
  const rules = robots().rules;
  return Array.isArray(rules) ? rules[0] : rules;
}

describe('robots.txt', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('allows crawling on production: APP_ENV=production, or VERCEL_ENV=production when APP_ENV is unset', () => {
    expect(rulesFor({ APP_ENV: 'production' })).toMatchObject({ userAgent: '*', allow: '/' });
    expect(rulesFor({ VERCEL_ENV: 'production' })).toMatchObject({ userAgent: '*', allow: '/' });
  });

  it('blocks crawling everywhere else', () => {
    const blocked = { userAgent: '*', disallow: '/' };
    expect(rulesFor({})).toEqual(blocked);
    expect(rulesFor({ NODE_ENV: 'production' })).toEqual(blocked);
    expect(rulesFor({ VERCEL_ENV: 'preview', NODE_ENV: 'production' })).toEqual(blocked);
    expect(rulesFor({ APP_ENV: 'staging' })).toEqual(blocked);
    // APP_ENV wins over VERCEL_ENV: this is how the Vercel Production site stays blocked before launch.
    expect(rulesFor({ APP_ENV: 'staging', VERCEL_ENV: 'production' })).toEqual(blocked);
  });
});
