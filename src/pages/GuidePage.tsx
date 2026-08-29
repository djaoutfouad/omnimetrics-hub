import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles';
import { TOOLS_DATA } from '../data/tools';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { ContentWithRails } from '../components/ContentWithRails';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';
import {
  ChevronRight,
  ArrowLeft,
  Clock,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileText,
  AlertTriangle,
} from 'lucide-react';

const ALIAS_MAP: Record<string, string> = {
  'loan-amortization-emi-guide': 'understanding-loan-amortization-emi',
  'compound-interest-growth-guide': 'compound-interest-explained',
  'late-payment-interest-guide': 'late-payment-interest-and-commercial-debt',
  'salary-take-home-pay-guide': 'salary-to-hourly-and-take-home-pay',
  'ecommerce-landed-cost-guide': 'landed-cost-and-tariffs-guide',
};

export const GuidePage: React.FC = () => {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const [copiedLink, setCopiedLink] = useState(false);

  const resolvedSlugOrId = slugOrId ? ALIAS_MAP[slugOrId] || slugOrId : '';

  const article = ARTICLES_DATA.find(
    (a) =>
      a.id === resolvedSlugOrId ||
      a.slug === resolvedSlugOrId ||
      a.id === slugOrId ||
      a.slug === slugOrId
  );

  if (!article) {
    return (
      <ContentWithRails maxWidthClass="max-w-4xl 2xl:max-w-5xl">
        <SeoHead
          title="Guide Not Found | OmniMetrics Hub"
          description="The financial guide or article you are looking for could not be found."
          canonicalPath="/blog"
        />
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h1 className="text-2xl font-black text-slate-900">Guide Not Found</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We could not find the educational guide you were looking for. It may have been updated or moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Knowledge Base
          </Link>
        </div>
      </ContentWithRails>
    );
  }

  // Cross-linked tools
  const relatedTools = TOOLS_DATA.filter((tool) =>
    (article.relatedToolIds || []).includes(tool.id)
  );

  // Cross-linked articles
  const relatedArticles = ARTICLES_DATA.filter(
    (a) => a.id !== article.id && a.category === article.category
  ).slice(0, 2);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch {
        // clipboard fallback
      }
    }
  };

  const articleCanonicalUrl = getAbsoluteUrl(
    `/blog/${article.slug || article.id}`
  );

  const schemaGraph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      '@id': `${articleCanonicalUrl}#article`,
      headline: article.title,
      description: article.snippet,
      url: articleCanonicalUrl,
      datePublished: '2025-01-15',
      dateModified: '2026-03-01',
      inLanguage: 'en-US',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleCanonicalUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'OmniMetrics Hub',
        url: `${SITE_URL}/`,
        logo: SITE_CONFIG.logoUrl,
      },
      author: {
        '@type': 'Organization',
        name: 'OmniMetrics Hub Quantitative Research & Financial Architecture Team',
        url: `${SITE_URL}/about`,
      },
      about: {
        '@type': 'Thing',
        name: article.category,
      },
    },
  ];

  if (article.faqs && article.faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      '@id': `${articleCanonicalUrl}#faq`,
      mainEntity: article.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  };

  return (
    <ContentWithRails maxWidthClass="max-w-4xl 2xl:max-w-5xl">
      <SeoHead
        title={article.title}
        description={article.snippet}
        keywords={[
          article.category.toLowerCase(),
          'financial guide',
          'pricing formula',
          'merchant fees',
          'business math',
          'break-even analysis',
        ]}
        canonicalPath={`/blog/${article.slug || article.id}`}
        schemaData={schemaData}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link to="/" className="hover:text-slate-800 transition font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blog" className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] hover:text-slate-800 transition">
            Guides & Knowledge Base
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

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-200/80 py-3">
            <div>
              <span className="font-medium text-slate-400">Author: </span>
              <span className="font-bold text-slate-700">OmniMetrics Quantitative Research Team</span>
            </div>
            <div>
              <span className="font-medium text-slate-400">Published: </span>
              <span className="font-semibold text-slate-700">January 2025</span>
            </div>
            <div>
              <span className="font-medium text-slate-400">Audited: </span>
              <span className="font-semibold text-emerald-700">March 2026</span>
            </div>
          </div>
        </header>

        {/* Article Content Container */}
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
          {/* Introduction Snippet */}
          <div className="bg-slate-50 rounded-2xl p-5 border-l-4 border-slate-900">
            <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
              {article.snippet}
            </p>
          </div>

          {/* Render Sections */}
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-600 shrink-0" />
                  <span>{section.heading}</span>
                </h2>
              )}

              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>

              {section.formula && (
                <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
                  <span className="text-emerald-400 font-bold block mb-1">Mathematical Formula:</span>
                  <code>{section.formula}</code>
                </div>
              )}

              {section.table && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 my-4">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-slate-600 font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  {section.bulletPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Detailed FAQs if present */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-3">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/70">
                    <h3 className="font-bold text-xs text-slate-900 mb-1.5">{faq.q}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Educational Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs leading-relaxed">
            <span className="font-bold text-slate-700">Financial Disclaimer: </span>
            This guide is published for educational and analytical purposes only. OmniMetrics Hub is not a licensed financial advisor, CPA, or registered broker. Always verify your specific business figures with a qualified professional.
          </div>
        </article>

        {/* In-content Ad Placement (Between article and interactive tools) */}
        <AdSlot position="in-content" />

        {/* Suggested Interactive Calculators */}
        {relatedTools.length > 0 && (
          <section aria-labelledby="guide-related-tools" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 id="guide-related-tools" className="text-lg font-bold text-slate-900">
                Interactive Calculators for This Topic
              </h3>
              <Link to="/calculators" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition">
                All 12 Tools →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.slug}`}
                  className="group block p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${tool.iconBgColor} ${tool.iconColor} flex items-center justify-center font-bold text-sm shrink-0`}>
                      {tool.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className={`text-[10px] font-extrabold uppercase ${tool.tagColor}`}>
                        {tool.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-slate-700 transition">
                        {tool.name}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>Calculate Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Educational Guides */}
        {relatedArticles.length > 0 && (
          <section aria-labelledby="guide-related-articles" className="space-y-4">
            <h3 id="guide-related-articles" className="text-lg font-bold text-slate-900">
              Related Knowledge Base Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((relArticle) => (
                <Link
                  key={relArticle.id}
                  to={`/blog/${relArticle.slug || relArticle.id}`}
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition"
                >
                  <div className="space-y-2">
                    <span className={`text-[10px] font-extrabold uppercase ${relArticle.tagColorClass}`}>
                      {relArticle.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                      {relArticle.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {relArticle.snippet}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Ad Placement */}
        <AdSlot position="bottom" />
      </div>
    </ContentWithRails>
  );
};
