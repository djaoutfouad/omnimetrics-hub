import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA } from '../data/tools';
import { CategoryType, CurrencySymbol } from '../types';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { ContentWithRails } from '../components/ContentWithRails';
import { getAbsoluteUrl } from '../config/site';
import {
  Calculator,
  Search,
  ChevronRight,
  ArrowRight,
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
    <ContentWithRails maxWidthClass="max-w-5xl 2xl:max-w-6xl">
      <SeoHead
        title="All Calculators Directory (12 Free Tools)"
        description="Explore the complete suite of 12 free financial, profit margin, ROAS, break-even, payment gateway fee, and freelance calculators on OmniMetrics Hub."
        keywords={['all calculators', 'financial calculator directory', 'business calculators', 'online profit calculator']}
        canonicalPath="/calculators"
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
            All Calculators Directory
          </span>
        </nav>

        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Complete Directory
            </span>
            <span className="text-xs text-slate-400 font-medium">
              12 Free Tools • Instant Math • Currency: {currency}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Financial & Business Calculators Directory
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Browse our complete collection of mathematically rigorous calculators. Every tool operates 100% in your browser without tracking or data harvesting.
          </p>
        </header>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search calculators by name, keyword, or use-case (e.g. Stripe, Margin, EMI, ROAS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <section aria-labelledby="directory-heading" className="space-y-4">
          <h2 id="directory-heading" className="sr-only">
            Available Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.slug}`}
                className="group flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-200/90 hover:border-slate-400 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 ${tool.tagColor}`}>
                      {tool.category}
                    </span>
                    <div className={`w-8 h-8 rounded-xl ${tool.iconBgColor} ${tool.iconColor} flex items-center justify-center font-bold text-xs`}>
                      <Calculator className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-slate-700 transition">
                      {tool.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
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
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Ad */}
        <AdSlot position="bottom" />
      </div>
    </ContentWithRails>
  );
};
