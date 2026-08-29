import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles';
import { TOOLS_DATA } from '../data/tools';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { ContentWithRails } from '../components/ContentWithRails';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Calculator,
  ChevronRight,
  Layers,
} from 'lucide-react';

const CATEGORIES = [
  'ALL',
  'PAYMENTS',
  'PRICING',
  'MARKETING',
  'FINANCE',
  'FREELANCE',
  'INVESTING',
  'E-COMMERCE',
  'PAYROLL',
] as const;

export const BlogIndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesCat =
        selectedCategory === 'ALL' ||
        article.category.toUpperCase() === selectedCategory.toUpperCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.snippet.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const canonicalUrl = getAbsoluteUrl('/blog');

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Financial & Business Mathematics Knowledge Base | OmniMetrics Hub',
        description:
          'In-depth mathematical guides, pricing formulas, payment gateway fee breakdowns, break-even methodologies, and unit economics benchmarks.',
        url: canonicalUrl,
      },
      {
        '@type': 'ItemList',
        itemListElement: ARTICLES_DATA.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: getAbsoluteUrl(`/blog/${article.slug || article.id}`),
          name: article.title,
        })),
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
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <ContentWithRails maxWidthClass="max-w-5xl 2xl:max-w-6xl">
      <SeoHead
        title="Knowledge Base & Mathematical Guides | OmniMetrics Hub"
        description="Comprehensive, peer-audited educational guides on financial calculation, unit economics, fee structures, and business formulas."
        keywords={[
          'financial guides',
          'pricing formulas',
          'fee breakdowns',
          'freelance pricing guide',
          'roas calculation guide',
          'break-even math',
        ]}
        canonicalPath="/blog"
        schemaData={schemaData}
      />

      <div className="space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link to="/" className="hover:text-slate-800 transition font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-slate-900" aria-current="page">
            Guides & Knowledge Base
          </span>
        </nav>

        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
              Knowledge Base
            </span>
            <span className="text-xs text-slate-400 font-medium">
              12 In-Depth Mathematical Guides
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Financial & Business Mathematics Guides
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Rigorous, step-by-step documentation detailing the exact mathematical models, unit economics formulas, and industry benchmarks powering our interactive calculation tools.
          </p>
        </header>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides by title, mathematical term, or topic (e.g. Stripe, Margin, EMI, ROAS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Guides' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No articles match your search query.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <section aria-labelledby="articles-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h2 id="articles-heading" className="sr-only">
              Guides
            </h2>
            {filteredArticles.map((article) => {
              const matchingTool = article.relatedToolIds
                .map((id) => TOOLS_DATA.find((t) => t.id === id))
                .find((t) => Boolean(t));

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between p-6 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${article.tagColorClass}`}>
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      <Link to={`/blog/${article.slug || article.id}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.snippet}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                    {matchingTool && (
                      <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-semibold text-slate-600 flex items-center gap-1.5 truncate">
                          <Calculator className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{matchingTool.name}</span>
                        </span>
                        <Link
                          to={`/tools/${matchingTool.slug}`}
                          className="text-emerald-700 hover:underline font-bold shrink-0 text-[10px]"
                        >
                          Launch
                        </Link>
                      </div>
                    )}

                    <Link
                      to={`/blog/${article.slug || article.id}`}
                      className="flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Bottom Ad Placement */}
        <AdSlot position="bottom" />
      </div>
    </ContentWithRails>
  );
};
