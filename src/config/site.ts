/**
 * Centralized Site Configuration
 * Single source of truth for base canonical domain and absolute URLs.
 * To change domain in the future, update VITE_SITE_URL in .env or modify the default fallback here.
 */
export const SITE_URL: string = (
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  'https://omnimetricshub.com'
).replace(/\/+$/, '');

export const SITE_CONFIG = {
  name: 'OmniMetrics Hub',
  siteUrl: SITE_URL,
  logoUrl: `${SITE_URL}/favicon.svg`,
  contactEmail: 'omnimetricshub@gmail.com',
  defaultOgImage: `${SITE_URL}/favicon.svg`,
  emailjs: {
    serviceId: 'service_qfoy2xa',
    templateId: 'template_rza5fvr',
    publicKey: 'EKAHPvvVCQPeT4Szb',
  },
};

/**
 * Generates an absolute URL from a given relative path using the centralized site URL.
 */
export function getAbsoluteUrl(path: string = ''): string {
  const cleanPath = path.trim();
  if (!cleanPath || cleanPath === '/') {
    return `${SITE_URL}/`;
  }
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `${SITE_URL}${normalizedPath}`;
}
