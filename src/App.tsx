import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrencySymbol, CategoryType, ToolItem, ArticleItem, LanguageCode } from './types';
import { TOOLS_DATA } from './data/tools';
import { Header } from './components/Header';
import { DockNav } from './components/DockNav';
import { RightSidebarAd } from './components/RightSidebarAd';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { ScrollToTop } from './components/ScrollToTop';
import { ConsentBanner } from './components/ConsentBanner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CalculatorsIndexPage } from './pages/CalculatorsIndexPage';
import { GuidePage } from './pages/GuidePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Modals
import { CalculatorModal } from './components/modals/CalculatorModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { SuggestModal } from './components/modals/SuggestModal';
import { ContactModal } from './components/modals/ContactModal';
import { LegalModal, LegalTabType } from './components/modals/LegalModal';

export default function App() {
  const navigate = useNavigate();
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

  const handleReset = () => {
    setSelectedCategory('ALL');
    setSearchQuery('');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchFocus = () => {
    navigate('/');
    setTimeout(() => {
      const input = document.getElementById('header-search');
      if (input) input.focus();
      const toolsGrid = document.getElementById('tools-grid');
      if (toolsGrid) toolsGrid.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTools = () => {
    navigate('/calculators');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToKnowledge = () => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('blog-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToFaq = () => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('faq-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenToolById = (toolId: string) => {
    const tool = TOOLS_DATA.find((t) => t.id === toolId || t.slug === toolId);
    if (tool) {
      setActiveTool(tool);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative">
      <ScrollToTop />

      {/* Left Quick-Dock Navigation (Desktop) */}
      <DockNav
        onHomeClick={handleReset}
        onSearchFocus={handleSearchFocus}
        onCalculatorsClick={scrollToTools}
        onKnowledgeClick={scrollToKnowledge}
        onFaqClick={scrollToFaq}
        onContactClick={() => navigate('/contact')}
        onSuggestClick={() => setIsSuggestOpen(true)}
      />

      {/* Right Skyscraper Advertisement (Desktop 160x600 AdSense Ready) */}
      <RightSidebarAd />

      {/* Top Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
        onOpenContact={() => navigate('/contact')}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl xl:max-w-[960px] 2xl:max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex-1 w-full pb-16">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  currency={currency}
                  language={language}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onResetSearch={handleReset}
                  onLaunchTool={setActiveTool}
                  onSelectArticle={setActiveArticle}
                  onOpenToolById={handleOpenToolById}
                />
              }
            />
            <Route
              path="/calculators"
              element={<CalculatorsIndexPage currency={currency} />}
            />
            <Route
              path="/tools"
              element={<CalculatorsIndexPage currency={currency} />}
            />
            <Route
              path="/tools/:slugOrId"
              element={<CalculatorPage currency={currency} />}
            />
            <Route
              path="/calculators/:slugOrId"
              element={<CalculatorPage currency={currency} />}
            />
            <Route
              path="/calculator/:slugOrId"
              element={<CalculatorPage currency={currency} />}
            />
            <Route
              path="/guides/:slugOrId"
              element={<GuidePage />}
            />
            <Route
              path="/articles/:slugOrId"
              element={<GuidePage />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/disclaimer" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer
        onOpenCalculator={handleOpenToolById}
        onOpenLegal={setLegalModalTab}
        onOpenContact={() => navigate('/contact')}
        onOpenSuggest={() => setIsSuggestOpen(true)}
      />

      {/* Privacy Consent Banner */}
      <ConsentBanner />

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setIsSuggestOpen(true)} />

      {/* Calculator Modal */}
      <CalculatorModal
        tool={activeTool}
        currency={currency}
        onClose={() => setActiveTool(null)}
      />

      {/* Article Modal */}
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
