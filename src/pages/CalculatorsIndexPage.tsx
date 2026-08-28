import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA } from '../data/tools';
import { CategoryType, CurrencySymbol } from '../types';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { getAbsoluteUrl } from '../config/site';
import {
  Calculator,
  Search,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Filter,
} from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const CalculatorsIndexPage: React.FC<Props> = ({ currency }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: string; value: CategoryType }[] = [
    { label: 'All 12 Calculators', value: 'ALL' },
    { label: 'E-Commerce', value: 'E-COMMERCE' },
    { label: 'Finance & Margins', value: 'FINANCE & MARGINS' },
    { label: 'Marketing & Ads', value: 'MARKETING & ADS' },
    { label: 'Freelance', value: 'FREELANCE' },
    { label: 'Investing', value: 'INVESTING' },
    { label: 'Payroll', value: 'PAYROLL' },
  ];

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'ALL' || tool.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Financial & Business Calculators Directory | OmniMetrics Hub',
    description: 'Browse all 12 free financial, e-commerce, marketing, freelance, and investment calculators.',
    url: getAbsoluteUrl('/calculators'),
    hasPart: TOOLS_DATA.map((tool) => ({
      '@type': 'WebApplication',
      name: tool.fullTitle,
      url: getAbsoluteUrl(`/tools/${tool.slug}`),
      applicationCategory: 'FinanceApplication',
    })),
  };

  return (
    <main className="min-w-0 flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <SeoHead
        title="All Calculators Directory (12 Free Tools)"
        description="Explore the complete suite of 12 free financial, profit margin, ROAS, break-even, payment gateway fee, and freelance calculators on OmniMetrics Hub."
        keywords={['all calculators', 'financial calculator directory', 'business calculators', 'online profit calculator']}
        canonicalPath="/calculators"
        schemaData={schemaData}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-800 transition font-medium">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 truncate" aria-current="page">
          Calculators Directory
        </span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            12 Active Tools
          </span>
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
            Active Currency: {currency}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Financial & Business Calculators Directory
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Access our complete collection of client-side financial, e-commerce, advertising, and freelance calculation utilities. Fast, privacy-focused, and completely free.
        </p>
      </header>

      {/* Leaderboard Ad */}
      <AdSlot position="leaderboard" />

      {/* Controls & Category Filter Bar */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculators by name, metric, or tag (e.g., Stripe, ROAS, Margin, Loan)..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Calculators Directory Grid */}
      <section aria-labelledby="tools-directory-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="tools-directory-heading" className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>Available Tools ({filteredTools.length})</span>
          </h2>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 ${tool.tagColor}`}>
                    {tool.category}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
                </div>

                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-2">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                <span>Launch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}

          {filteredTools.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <p className="text-sm font-bold text-slate-700">No calculators match your current query.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Ad */}
      <AdSlot position="bottom" />
    </main>
  );
};
