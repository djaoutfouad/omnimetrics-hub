import React, { useState, useMemo } from 'react';
import { CurrencySymbol, CategoryType, ToolItem, ArticleItem, LanguageCode } from './types';
import { TOOLS_DATA } from './data/tools';
import { TRANSLATIONS } from './data/translations';
import { Header } from './components/Header';
import { DockNav } from './components/DockNav';
import { RightSidebarAd } from './components/RightSidebarAd';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { ValueProps } from './components/ValueProps';
import { CompleteGuideSection } from './components/CompleteGuideSection';
import { AdBanner } from './components/AdBanner';
import { KnowledgeSection } from './components/KnowledgeSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { CalculatorModal } from './components/modals/CalculatorModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { SuggestModal } from './components/modals/SuggestModal';
import { ContactModal } from './components/modals/ContactModal';
import { LegalModal, LegalTabType } from './components/modals/LegalModal';

export default function App() {
  const [currency, setCurrency] = useState<CurrencySymbol>('$');
  const [language, setLanguage] = useState<LanguageCode>('US');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.US;

  // Filter tools
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

  const handleReset = () => {
    setSelectedCategory('ALL');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchFocus = () => {
    const input = document.getElementById('header-search');
    if (input) {
      input.focus();
    }
    const toolsGrid = document.getElementById('tools-grid');
    if (toolsGrid) {
      toolsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTools = () => {
    const toolsGrid = document.getElementById('tools-grid');
    if (toolsGrid) {
      toolsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToKnowledge = () => {
    const section = document.getElementById('blog-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFaq = () => {
    const section = document.getElementById('faq-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenToolById = (toolId: string) => {
    const tool = TOOLS_DATA.find((t) => t.id === toolId);
    if (tool) {
      setActiveTool(tool);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative">
      {/* Left Quick-Dock Navigation (Desktop) */}
      <DockNav
        onHomeClick={handleReset}
        onSearchFocus={handleSearchFocus}
        onCalculatorsClick={scrollToTools}
        onKnowledgeClick={scrollToKnowledge}
        onFaqClick={scrollToFaq}
        onContactClick={() => setIsContactOpen(true)}
        onSuggestClick={() => setIsSuggestOpen(true)}
      />

      {/* Right Skyscraper Advertisement (Desktop 160x600 AdSense Ready) */}
      <RightSidebarAd />

      {/* 1. Top Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content following clean non-overlapping responsive layout */}
      <main className="max-w-5xl xl:max-w-[960px] 2xl:max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex-1 w-full pb-16">
        
        {/* Hero Section */}
        <Hero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          language={language}
        />

        {/* Calculators Grid (with In-Grid Ad Slot) */}
        <div
          id="tools-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 scroll-mt-24"
        >
          {filteredTools.map((tool, index) => (
            <React.Fragment key={tool.id}>
              <ToolCard
                tool={tool}
                onLaunch={setActiveTool}
              />
              {/* Slot 2: In-Grid native banner positioned between the calculator tools */}
              {index === 2 && (
                <AdBanner slot="in-grid" title="Corporate Treasury & Global FX" />
              )}
            </React.Fragment>
          ))}

          {filteredTools.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-slate-700">
                {t.noResults}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>

        {/* 2. Value Props Section (3 Cards) */}
        <ValueProps />

        {/* 3. The Complete Guide to Financial Calculations (2-Column SEO Text Grid) */}
        <CompleteGuideSection onOpenCalculator={handleOpenToolById} />

        {/* Mid-page Horizontal Ad Slot (Slot 3) */}
        <AdBanner slot="mid-page" />

        {/* Financial Guides & Merchant Insights (Knowledge Base Cards) */}
        <KnowledgeSection
          onSelectArticle={setActiveArticle}
          language={language}
        />

        {/* FAQ Section */}
        <FaqSection language={language} />

        {/* Bottom Horizontal Ad Slot (Slot 4) */}
        <AdBanner slot="bottom" />

      </main>

      {/* Footer */}
      <Footer
        onOpenCalculator={handleOpenToolById}
        onOpenLegal={setLegalModalTab}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSuggest={() => setIsSuggestOpen(true)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setIsSuggestOpen(true)} />

      {/* Calculator Modal */}
      <CalculatorModal
        tool={activeTool}
        currency={currency}
        onClose={() => setActiveTool(null)}
      />

      {/* Article Modal (Full Rich Guides, Math Breakdowns & Tables) */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      {/* Suggest Modal */}
      <SuggestModal
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Legal Modal */}
      <LegalModal
        initialTab={legalModalTab}
        onClose={() => setLegalModalTab(null)}
      />
    </div>
  );
}
