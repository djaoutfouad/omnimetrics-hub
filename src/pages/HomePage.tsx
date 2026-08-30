import React, { useMemo } from 'react';
import { CurrencySymbol, CategoryType, ToolItem, ArticleItem } from '../types';
import { TOOLS_DATA } from '../data/tools';
import { Hero } from '../components/Hero';
import { ToolCard } from '../components/ToolCard';
import { ValueProps } from '../components/ValueProps';
import { CompleteGuideSection } from '../components/CompleteGuideSection';
import { KnowledgeSection } from '../components/KnowledgeSection';
import { FaqSection } from '../components/FaqSection';
import { AdSlot } from '../components/AdSlot';
import { ContentWithRails } from '../components/ContentWithRails';
import { SeoHead } from '../components/SeoHead';

interface Props {
  currency: CurrencySymbol;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onResetSearch: () => void;
  onLaunchTool: (tool: ToolItem) => void;
  onSelectArticle: (article: ArticleItem) => void;
  onOpenToolById: (id: string) => void;
}

export const HomePage: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onResetSearch,
  onLaunchTool,
  onSelectArticle,
  onOpenToolById,
}) => {
  // Filtered tools
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

  return (
    <ContentWithRails maxWidthClass="max-w-5xl 2xl:max-w-6xl">
      <SeoHead
        title="OmniMetrics Hub | Precision Financial, E-Commerce & Business Calculators"
        description="Free high-precision financial calculators for founders, freelancers, and marketers. Calculate payment gateway fees, profit margins, break-even point, ROAS, freelance rates, and loan EMI."
        keywords={[
          'financial calculators',
          'business calculator',
          'payment gateway fees',
          'profit margin calculator',
          'roas calculator',
          'break even calculator',
          'freelance rate formula',
          'loan emi calculator',
        ]}
        canonicalPath="/"
      />

      <div className="space-y-12">
        {/* Hero Section */}
        <Hero
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

        {/* Top Header Leaderboard Ad */}
        <AdSlot position="leaderboard" />

        {/* Calculators Grid */}
        <section id="tools-grid" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <React.Fragment key={tool.id}>
                <ToolCard tool={tool} onLaunch={onLaunchTool} />
                {/* Native In-Grid Ad Slot */}
                {index === 2 && <AdSlot position="in-grid" />}
              </React.Fragment>
            ))}

            {filteredTools.length === 0 && (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <p className="text-sm font-bold text-slate-700">No calculators found matching your search.</p>
                <button
                  type="button"
                  onClick={onResetSearch}
                  className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                >
                  Clear Search Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Value Propositions (3 Clean Trust Cards) */}
        <ValueProps />

        {/* Complete Guide to Financial Calculations */}
        <CompleteGuideSection onOpenCalculator={onOpenToolById} />

        {/* Financial Guides & Knowledge Base */}
        <KnowledgeSection onSelectArticle={onSelectArticle} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Bottom Ad Placement */}
        <AdSlot position="bottom" />
      </div>
    </ContentWithRails>
  );
};
