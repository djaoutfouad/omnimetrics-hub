import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { getAllStaticRoutes, getRouteMetadata } from './utils/routeMetadata';
import { getAbsoluteUrl, SITE_URL, SITE_CONFIG } from './config/site';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

async function prerender() {
  console.log('🚀 Starting OmniMetrics Hub Static Pre-Rendering (SSG)...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(
      `Template index.html not found at ${TEMPLATE_PATH}. Please run "vite build" first.`
    );
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const routes = getAllStaticRoutes();
  console.log(`📄 Found ${routes.length} static routes to pre-render.`);

  let renderedCount = 0;

  for (const route of routes) {
    const meta = getRouteMetadata(route);
    const canonicalUrl = getAbsoluteUrl(meta.canonicalPath);

    // 1. Render App to static HTML string
    const appHtml = renderToString(
      React.createElement(
        MemoryRouter,
        { initialEntries: [route] },
        React.createElement(App)
      )
    );

    // 2. Prepare structured data
    const schemaData =
      meta.schemaData || {
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
      };

    // 3. Build head elements (note: <title> is replaced directly in the template at line 90)
    const headMetaTags = `
    <meta name="description" content="${escapeAttr(meta.description)}" />
    ${meta.keywords && meta.keywords.length > 0 ? `<meta name="keywords" content="${escapeAttr(meta.keywords.join(', '))}" />` : ''}
    <link rel="canonical" href="${canonicalUrl}" />
    <!-- OpenGraph Tags -->
    <meta property="og:site_name" content="OmniMetrics Hub" />
    <meta property="og:title" content="${escapeAttr(meta.title)}" />
    <meta property="og:description" content="${escapeAttr(meta.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="${meta.ogType || 'website'}" />
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(meta.title)}" />
    <meta name="twitter:description" content="${escapeAttr(meta.description)}" />
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json" id="json-ld-structured-data">${JSON.stringify(schemaData)}</script>
`;

    // 4. Inject metadata & rendered app into template
    let html = template;

    // Replace <title>...</title>
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);

    // Replace existing <meta name="description" ...>
    html = html.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, '');

    // Inject head tags before </head>
    html = html.replace('</head>', `${headMetaTags}</head>`);

    // Inject prerendered React HTML into root div
    html = html.replace(
      /<div id=["']root["']>[\s\S]*?<\/div>/,
      `<div id="root">${appHtml}</div>`
    );

    // 5. Determine target file path
    let outFilePath: string;
    if (route === '/') {
      outFilePath = path.join(DIST_DIR, 'index.html');
    } else if (route === '/404') {
      outFilePath = path.join(DIST_DIR, '404.html');
    } else {
      const routePath = route.startsWith('/') ? route.slice(1) : route;
      const targetDir = path.join(DIST_DIR, routePath);
      fs.mkdirSync(targetDir, { recursive: true });
      outFilePath = path.join(targetDir, 'index.html');
    }

    fs.writeFileSync(outFilePath, html, 'utf-8');
    renderedCount++;
  }

  // 6. Generate dynamic sitemap.xml in dist/ based on active SITE_URL
  const indexableRoutes = routes.filter((r) => r !== '/404');
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes
  .map((r) => {
    const loc = getAbsoluteUrl(r);
    const priority = r === '/' ? '1.0' : r.startsWith('/calculators/') || r.startsWith('/tools/') ? '0.9' : r.startsWith('/blog/') || r.startsWith('/guides/') ? '0.8' : '0.6';
    const changefreq = r === '/' || r === '/calculators' || r === '/blog' ? 'weekly' : 'monthly';
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml.trim() + '\n', 'utf-8');

  // 7. Generate dynamic robots.txt in dist/ referencing active SITE_URL
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${getAbsoluteUrl('/sitemap.xml')}
`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');

  console.log(`✅ Successfully pre-rendered ${renderedCount} pages into dist/`);
  console.log(`✅ Synchronized sitemap.xml and robots.txt with ${SITE_URL}`);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

prerender().catch((err) => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
