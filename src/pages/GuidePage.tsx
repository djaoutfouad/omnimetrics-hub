import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles';
import { TOOLS_DATA } from '../data/tools';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';
import {
  ChevronRight,
  ArrowLeft,
  Clock,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const GuidePage: React.FC = () => {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const [copiedLink, setCopiedLink] = useState(false);

  const article = ARTICLES_DATA.find(
    (a) => a.slug === slugOrId || a.id === slugOrId
  );

  if (!article) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Guide Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The requested knowledge base article does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Hub</span>
        </Link>
      </main>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Find calculators that relate to this article's topic
  const relatedCalculators = TOOLS_DATA.filter((tool) => {
    if (article.slug?.includes('fee') && tool.id === 'calc-fees') return true;
    if (article.slug?.includes('margin') && (tool.id === 'calc-margin' || tool.id === 'calc-landed-cost')) return true;
    if (article.slug?.includes('roas') && (tool.id === 'calc-roas' || tool.id === 'calc-cr-cpa')) return true;
    if (article.slug?.includes('break-even') && (tool.id === 'calc-breakeven' || tool.id === 'calc-margin')) return true;
    if (article.slug?.includes('freelance') && (tool.id === 'calc-freelance' || tool.id === 'calc-late-interest')) return true;
    if (article.slug?.includes('ltv') && (tool.id === 'calc-ltv' || tool.id === 'calc-roas')) return true;
    if (article.slug?.includes('compound') && (tool.id === 'calc-compound' || tool.id === 'calc-loan-emi')) return true;
    return tool.category.toUpperCase().includes(article.category.toUpperCase());
  }).slice(0, 3);

  const fallbackCalculators = relatedCalculators.length > 0 ? relatedCalculators : TOOLS_DATA.slice(0, 3);

  const canonicalUrl = getAbsoluteUrl(`/guides/${article.slug || article.id}`);

  const schemaData = {
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
            name: 'Knowledge Base',
            item: `${SITE_URL}/#guides-section`,
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
  };

  return (
    <main className="min-w-0 flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <SeoHead
        title={article.title}
        description={article.snippet}
        keywords={[article.category.toLowerCase(), 'financial guide', 'pricing formula', 'merchant fees', 'business math']}
        canonicalPath={`/guides/${article.slug || article.id}`}
        schemaData={schemaData}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-800 transition font-medium">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/" className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] hover:text-slate-800 transition">
          Knowledge Base
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 truncate" aria-current="page">
          {article.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${article.tagColorClass}`}>
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Share this guide"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          {article.snippet}
        </p>
      </header>

      {/* Leaderboard AdSlot */}
      <AdSlot position="leaderboard" />

      {/* Article Content Container */}
      <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-9 space-y-8 text-slate-800">
        {article.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3.5">
            {sec.heading && (
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {sec.heading}
              </h2>
            )}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {sec.content}
            </p>

            {/* Formula Block */}
            {sec.formula && (
              <div className="p-4 sm:p-5 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                <pre className="whitespace-pre-wrap">{sec.formula}</pre>
              </div>
            )}

            {/* Data Table */}
            {sec.table && (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl my-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold text-[11px] uppercase tracking-wider">
                      {sec.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {sec.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80 transition">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 font-medium">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Key Bullet Takeaways */}
            {sec.bulletPoints && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2">
                <h3 className="font-bold text-xs text-emerald-950 uppercase tracking-wider">
                  Key Strategic Rules:
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-5">
                  {sec.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="leading-relaxed font-medium">
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* In-content Ad Placement */}
      <AdSlot position="mid-page" />

      {/* Suggested Interactive Calculators */}
      <section aria-labelledby="suggested-calcs-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 id="suggested-calcs-heading" className="font-black text-xl text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Apply These Formulas in Live Calculators</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {fallbackCalculators.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between group"
            >
              <div>
                <span className={`text-[9px] font-extrabold uppercase tracking-wider block mb-1 ${tool.tagColor}`}>
                  {tool.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-emerald-700 transition">
                  {tool.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-600 transition">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Ad Placement */}
      <AdSlot position="bottom" />
    </main>
  );
};
