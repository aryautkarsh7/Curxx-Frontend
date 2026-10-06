import { ApiError } from './api';

/**
 * Loads the figures behind a generated-copy block. A client error (404, 400: no such city or specialty)
 * means "no block here" and returns null. Anything else (API down, 503 while the directory loads, a
 * timeout) is thrown: swallowing it would render the page without its SEO content and let Next keep
 * that empty page until the next revalidation. Thrown, Next keeps serving the last good page.
 */
export async function loadFigures<T>(load: () => Promise<T>): Promise<T | null> {
  try {
    return await load();
  } catch (error) {
    if (error instanceof ApiError && error.status >= 400 && error.status < 500) return null;
    throw error;
  }
}
