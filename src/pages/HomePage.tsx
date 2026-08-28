import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CurrencySymbol, CategoryType, ToolItem, ArticleItem, LanguageCode, AppOutletContext } from '../types';
import { TOOLS_DATA } from '../data/tools';
import { TRANSLATIONS } from '../data/translations';
import { Hero } from '../components/Hero';
import { ToolCard } from '../components/ToolCard';
import { ValueProps } from '../components/ValueProps';
import { CompleteGuideSection } from '../components/CompleteGuideSection';
import { KnowledgeSection } from '../components/KnowledgeSection';
import { FaqSection } from '../components/FaqSection';
import { AdSlot } from '../components/AdSlot';
import { SeoHead } from '../components/SeoHead';

interface Props {
  currency?: CurrencySymbol;
  language?: LanguageCode;
  selectedCategory?: CategoryType;
  onSelectCategory?: (cat: CategoryType) => void;
  searchQuery?: string;
  onResetSearch?: () => void;
  onLaunchTool?: (tool: ToolItem) => void;
  onSelectArticle?: (article: ArticleItem) => void;
  onOpenToolById?: (id: string) => void;
}

export const HomePage: React.FC<Props> = (props) => {
  const context = useOutletContext<AppOutletContext | undefined>();
  const language = props.language ?? context?.language ?? 'US';
  const selectedCategory = props.selectedCategory ?? context?.selectedCategory ?? 'ALL';
  const onSelectCategory = props.onSelectCategory ?? context?.setSelectedCategory ?? (() => {});
  const searchQuery = props.searchQuery ?? context?.searchQuery ?? '';
  const onResetSearch = props.onResetSearch ?? context?.handleReset ?? (() => {});
  const onLaunchTool = props.onLaunchTool ?? context?.setActiveTool ?? (() => {});
  const onSelectArticle = props.onSelectArticle ?? context?.setActiveArticle ?? (() => {});
  const onOpenToolById = props.onOpenToolById ?? context?.handleOpenToolById ?? (() => {});

  const t = TRANSLATIONS[language] || TRANSLATIONS.US;

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
    <div className="space-y-12">
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

      {/* Hero Section */}
      <Hero
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        language={language}
      />

      {/* Leaderboard Ad Placement (Slot 1) */}
      <AdSlot position="leaderboard" />

      {/* Calculators Grid */}
      <section id="tools-grid" className="scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <React.Fragment key={tool.id}>
              <ToolCard tool={tool} onLaunch={onLaunchTool} />
              {/* In-Grid Ad Slot (Slot 2) */}
              {index === 2 && <AdSlot position="in-grid" />}
            </React.Fragment>
          ))}

          {filteredTools.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-slate-700">{t.noResults}</p>
              <button
                type="button"
                onClick={onResetSearch}
                className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Value Propositions (3 Clean Trust Cards) */}
      <ValueProps />

      {/* Complete Guide to Financial Calculations */}
      <CompleteGuideSection onOpenCalculator={onOpenToolById} />

      {/* Mid-Page Horizontal Ad Placement (Slot 3) */}
      <AdSlot position="mid-page" />

      {/* Financial Guides & Knowledge Base */}
      <KnowledgeSection onSelectArticle={onSelectArticle} language={language} />

      {/* Frequently Asked Questions */}
      <FaqSection language={language} />

      {/* Bottom Horizontal Ad Placement (Slot 4) */}
      <AdSlot position="bottom" />
    </div>
  );
};
