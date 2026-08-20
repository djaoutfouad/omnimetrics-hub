import { useEffect } from 'react';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  schemaData?: Record<string, unknown> | null;
}

export const SeoHead = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  schemaData,
}: SeoProps) => {
  useEffect(() => {
    // Document Title
    const fullTitle = title.includes('OmniMetrics Hub')
      ? title
      : `${title} | OmniMetrics Hub`;
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description
    setMetaTag('name', 'description', description);

    // Meta Keywords
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }

    // Canonical Link
    const canonicalUrl = getAbsoluteUrl(canonicalPath);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // OpenGraph Tags
    setMetaTag('property', 'og:site_name', 'OmniMetrics Hub');
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', canonicalPath.startsWith('/guides/') ? 'article' : 'website');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    // JSON-LD Structured Data
    const scriptId = 'json-ld-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (schemaData) {
      scriptTag.textContent = JSON.stringify(schemaData);
    } else {
      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: 'OmniMetrics Hub',
            url: `${SITE_URL}/`,
            description: 'High-precision financial, e-commerce, freelance, and marketing calculators for founders and creators.',
          },
          {
            '@type': 'Organization',
            name: 'OmniMetrics Hub',
            url: `${SITE_URL}/`,
            logo: SITE_CONFIG.logoUrl,
            contactPoint: {
              '@type': 'ContactPoint',
              email: SITE_CONFIG.contactEmail,
              contactType: 'Customer Support',
            },
          },
        ],
      });
    }
  }, [title, description, keywords, canonicalPath, schemaData]);

  return null;
};
