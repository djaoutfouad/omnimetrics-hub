import { TOOLS_DATA } from '../data/tools';
import { ARTICLES_DATA } from '../data/articles';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';

export interface RouteMeta {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  schemaData: Record<string, unknown> | null;
  ogType?: 'website' | 'article';
}

const ALIAS_MAP: Record<string, string> = {
  'loan-amortization-emi-guide': 'understanding-loan-amortization-emi',
  'compound-interest-growth-guide': 'compound-interest-explained',
  'late-payment-interest-guide': 'late-payment-interest-and-commercial-debt',
  'salary-take-home-pay-guide': 'salary-to-hourly-and-take-home-pay',
  'ecommerce-landed-cost-guide': 'landed-cost-and-tariffs-guide',
};

export function getRouteMetadata(rawPath: string): RouteMeta {
  const cleanPath = rawPath.replace(/\/+$/, '') || '/';

  // 1. Homepage
  if (cleanPath === '/') {
    return {
      title: 'OmniMetrics Hub | Precision Financial, E-Commerce & Business Calculators',
      description:
        'Free high-precision financial calculators for founders, freelancers, and marketers. Calculate payment gateway fees, profit margins, break-even point, ROAS, freelance rates, and loan EMI.',
      keywords: [
        'financial calculator',
        'payment fee calculator',
        'stripe fee calculator',
        'profit margin calculator',
        'break-even calculator',
        'roas calculator',
        'freelance rate calculator',
        'loan emi calculator',
        'customer ltv calculator',
        'ecommerce pricing',
      ],
      canonicalPath: '/',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: 'OmniMetrics Hub',
            url: `${SITE_URL}/`,
            description:
              'High-precision financial, e-commerce, freelance, and marketing calculators for founders and creators.',
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
      },
    };
  }

  // 2. Calculators Index (/calculators or /tools)
  if (cleanPath === '/calculators' || cleanPath === '/tools') {
    return {
      title: 'All Financial, E-Commerce & Business Calculators Directory | OmniMetrics Hub',
      description:
        'Explore our complete directory of 12 free financial, e-commerce, marketing, freelance, and investment calculators with real-time math, guides, and formula explanations.',
      keywords: [
        'financial tools directory',
        'free online business calculators',
        'ecommerce calculators',
        'marketing math tools',
        'freelance pricing calculators',
      ],
      canonicalPath: '/calculators',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'All Financial & Business Calculators Directory | OmniMetrics Hub',
        description:
          'Browse all 12 free financial, e-commerce, marketing, freelance, and investment calculators.',
        url: getAbsoluteUrl('/calculators'),
        hasPart: TOOLS_DATA.map((tool) => ({
          '@type': 'WebApplication',
          name: tool.fullTitle,
          url: getAbsoluteUrl(`/tools/${tool.slug}`),
        })),
      },
    };
  }

  // 2b. Blog & Knowledge Base Index (/blog or /guides)
  if (cleanPath === '/blog' || cleanPath === '/guides') {
    return {
      title: 'Financial & Business Math Knowledge Base & Educational Guides | OmniMetrics Hub',
      description:
        'Comprehensive, step-by-step mathematical guides to payment gateway fees, keystone pricing, break-even unit volumes, ROAS thresholds, loan amortization, and freelance rate planning.',
      keywords: [
        'financial guides',
        'pricing math',
        'payment fees guide',
        'roas calculation guide',
        'break-even formula',
        'loan amortization explained',
        'freelance pricing formula',
      ],
      canonicalPath: '/blog',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Financial & Business Mathematics Knowledge Base | OmniMetrics Hub',
            description:
              'In-depth mathematical guides, pricing formulas, payment gateway fee breakdowns, break-even methodologies, and unit economics benchmarks.',
            url: getAbsoluteUrl('/blog'),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Guides & Knowledge Base',
                item: getAbsoluteUrl('/blog'),
              },
            ],
          },
        ],
      },
    };
  }

  // 2c. Methodology Page (/methodology)
  if (cleanPath === '/methodology') {
    return {
      title: 'Calculation Methodology & Mathematical Standards | OmniMetrics Hub',
      description:
        'Learn how OmniMetrics Hub approaches financial, e-commerce, and business mathematics. Transparent formulas, client-side calculation privacy, and strict precision standards.',
      keywords: [
        'calculation methodology',
        'financial calculator formulas',
        'client side math',
        'business metrics standards',
        'rounding conventions',
        'precision finance tools',
      ],
      canonicalPath: '/methodology',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            name: 'Calculation Methodology & Quantitative Standards | OmniMetrics Hub',
            description:
              'Comprehensive overview of OmniMetrics Hub mathematical formulas, client-side privacy architecture, rounding conventions, and computational modeling standards.',
            url: getAbsoluteUrl('/methodology'),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Calculation Methodology',
                item: getAbsoluteUrl('/methodology'),
              },
            ],
          },
        ],
      },
    };
  }

  // 3. Calculator Detail (/tools/:slugOrId, /calculators/:slugOrId, /calculator/:slugOrId)
  if (
    cleanPath.startsWith('/tools/') ||
    cleanPath.startsWith('/calculators/') ||
    cleanPath.startsWith('/calculator/')
  ) {
    const slugOrId = cleanPath.split('/')[2];
    const tool = TOOLS_DATA.find((t) => t.slug === slugOrId || t.id === slugOrId);

    if (tool) {
      return {
        title: `${tool.fullTitle} | OmniMetrics Hub`,
        description: tool.metaDescription || tool.description,
        keywords: tool.keywords,
        canonicalPath: `/tools/${tool.slug}`,
        ogType: 'website',
        schemaData: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebApplication',
              name: tool.fullTitle,
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Any (Web Browser)',
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              offers: {
                '@type': 'Offer',
                price: '0.00',
                priceCurrency: 'USD',
              },
              description: tool.metaDescription,
              url: getAbsoluteUrl(`/tools/${tool.slug}`),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${SITE_URL}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: tool.category,
                  item: `${SITE_URL}/#${tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: tool.name,
                  item: getAbsoluteUrl(`/tools/${tool.slug}`),
                },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: tool.detailedGuide.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ],
        },
      };
    }
  }

  // 4. Guide / Blog Detail (/blog/:slugOrId, /guides/:slugOrId, or /articles/:slugOrId)
  if (
    cleanPath.startsWith('/blog/') ||
    cleanPath.startsWith('/guides/') ||
    cleanPath.startsWith('/articles/')
  ) {
    const rawSlugOrId = cleanPath.split('/')[2];
    const resolvedSlug = ALIAS_MAP[rawSlugOrId] || rawSlugOrId;
    const article = ARTICLES_DATA.find(
      (a) =>
        a.slug === resolvedSlug ||
        a.id === resolvedSlug ||
        a.slug === rawSlugOrId ||
        a.id === rawSlugOrId
    );

    if (article) {
      const canonicalUrl = getAbsoluteUrl(`/blog/${article.slug || article.id}`);
      return {
        title: `${article.title} | OmniMetrics Hub`,
        description: article.snippet,
        keywords: [
          article.category.toLowerCase(),
          'financial guide',
          'pricing formula',
          'merchant fees',
          'business math',
        ],
        canonicalPath: `/blog/${article.slug || article.id}`,
        ogType: 'article',
        schemaData: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: article.title,
              description: article.snippet,
              author: {
                '@type': 'Organization',
                name: 'OmniMetrics Hub Quantitative Research Team',
                url: `${SITE_URL}/`,
              },
              publisher: {
                '@type': 'Organization',
                name: 'OmniMetrics Hub',
                url: `${SITE_URL}/`,
                logo: {
                  '@type': 'ImageObject',
                  url: SITE_CONFIG.logoUrl,
                },
              },
              datePublished: '2026-01-15',
              dateModified: '2026-03-01',
              mainEntityOfPage: canonicalUrl,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${SITE_URL}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Guides & Knowledge Base',
                  item: `${SITE_URL}/blog`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: canonicalUrl,
                },
              ],
            },
          ],
        },
      };
    }
  }

  // 5. About Page
  if (cleanPath === '/about') {
    return {
      title: 'About Us & Quantitative Mission | OmniMetrics Hub',
      description:
        'Learn about OmniMetrics Hub: high-precision, client-side financial, e-commerce, and marketing calculation tools designed for founders, creators, and freelancers.',
      keywords: [
        'about omnimetrics hub',
        'financial calculation tools',
        'private client-side calculator',
        'pricing math',
        'business metrics',
      ],
      canonicalPath: '/about',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About OmniMetrics Hub',
        description:
          'Learn about OmniMetrics Hub, our quantitative mission, client-side privacy architecture, and open financial engineering calculators.',
        url: getAbsoluteUrl('/about'),
        mainEntity: {
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
      },
    };
  }

  // 6. Contact Page
  if (cleanPath === '/contact') {
    return {
      title: 'Contact Us & Feedback | OmniMetrics Hub',
      description:
        'Contact the OmniMetrics Hub team. Inquiries regarding financial calculation formulas, suggestions, or editorial feedback.',
      keywords: [
        'contact omnimetrics hub',
        'support email',
        'feedback',
        'calculator suggestions',
      ],
      canonicalPath: '/contact',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact OmniMetrics Hub',
        description:
          'Get in touch with the OmniMetrics Hub team for mathematical feedback, advertising inquiries, or calculation suggestions.',
        url: getAbsoluteUrl('/contact'),
        mainEntity: {
          '@type': 'Organization',
          name: 'OmniMetrics Hub',
          email: SITE_CONFIG.contactEmail,
          url: `${SITE_URL}/`,
        },
      },
    };
  }

  // 7. Legal Pages
  if (cleanPath === '/privacy') {
    return {
      title: 'Privacy Policy | OmniMetrics Hub',
      description:
        'OmniMetrics Hub Privacy Policy: Learn about our client-side mathematical execution, local storage preferences, EmailJS contact delivery, and zero financial tracking policy.',
      keywords: ['privacy policy', 'client side privacy', 'zero data collection', 'financial calculation security'],
      canonicalPath: '/privacy',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy | OmniMetrics Hub',
        description: 'OmniMetrics Hub Privacy Policy: Learn about our client-side mathematical execution, local storage preferences, EmailJS contact delivery, and zero financial tracking policy.',
        url: getAbsoluteUrl('/privacy'),
        publisher: {
          '@type': 'Organization',
          name: 'OmniMetrics Hub',
          url: `${SITE_URL}/`,
          logo: SITE_CONFIG.logoUrl,
        },
      },
    };
  }

  if (cleanPath === '/terms') {
    return {
      title: 'Terms of Service | OmniMetrics Hub',
      description:
        'OmniMetrics Hub Terms of Service: Understand our permitted use guidelines, calculation limitations, intellectual property terms, and service availability.',
      keywords: ['terms of service', 'acceptable use', 'calculation terms', 'financial tools license'],
      canonicalPath: '/terms',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Service | OmniMetrics Hub',
        description: 'OmniMetrics Hub Terms of Service: Understand our permitted use guidelines, calculation limitations, intellectual property terms, and service availability.',
        url: getAbsoluteUrl('/terms'),
        publisher: {
          '@type': 'Organization',
          name: 'OmniMetrics Hub',
          url: `${SITE_URL}/`,
          logo: SITE_CONFIG.logoUrl,
        },
      },
    };
  }

  if (cleanPath === '/disclaimer') {
    return {
      title: 'Financial & Mathematical Disclaimer | OmniMetrics Hub',
      description:
        'OmniMetrics Hub Financial Disclaimer: Information regarding mathematical approximations, educational scope, tax/accounting limitations, and professional advice recommendations.',
      keywords: ['financial disclaimer', 'mathematical estimates', 'not financial advice', 'cpa recommendation'],
      canonicalPath: '/disclaimer',
      ogType: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Financial & Mathematical Disclaimer | OmniMetrics Hub',
        description: 'OmniMetrics Hub Financial Disclaimer: Information regarding mathematical approximations, educational scope, tax/accounting limitations, and professional advice recommendations.',
        url: getAbsoluteUrl('/disclaimer'),
        publisher: {
          '@type': 'Organization',
          name: 'OmniMetrics Hub',
          url: `${SITE_URL}/`,
          logo: SITE_CONFIG.logoUrl,
        },
      },
    };
  }

  // Fallback 404
  return {
    title: 'Page Not Found (404) | OmniMetrics Hub',
    description: 'The requested page on OmniMetrics Hub does not exist.',
    canonicalPath: '/404',
    ogType: 'website',
    schemaData: null,
  };
}

export function getAllStaticRoutes(): string[] {
  const routes: string[] = [
    '/',
    '/calculators',
    '/tools',
    '/blog',
    '/guides',
    '/methodology',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/404',
  ];

  // Add all calculator routes (both /tools/ and /calculators/)
  for (const tool of TOOLS_DATA) {
    routes.push(`/tools/${tool.slug}`);
    routes.push(`/calculators/${tool.slug}`);
  }

  // Add all guide and blog routes (including /blog/, /guides/, /articles/)
  for (const article of ARTICLES_DATA) {
    if (article.slug) {
      routes.push(`/blog/${article.slug}`);
      routes.push(`/guides/${article.slug}`);
      routes.push(`/articles/${article.slug}`);
    }
  }

  return routes;
}
