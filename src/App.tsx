import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrencySymbol, CategoryType, ToolItem, ArticleItem, LanguageCode } from './types';
import { TOOLS_DATA } from './data/tools';
import { LANGUAGE_OPTIONS } from './data/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { ScrollToTop } from './components/ScrollToTop';
import { ConsentBanner } from './components/ConsentBanner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CalculatorsIndexPage } from './pages/CalculatorsIndexPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { GuidePage } from './pages/GuidePage';
import { AboutPage } from './pages/AboutPage';
import { MethodologyPage } from './pages/MethodologyPage';
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
  const [currency, setCurrency] = useState<CurrencySymbol>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('omni_preferred_currency') as CurrencySymbol;
        if (saved && ['$', '€', '£', 'C$', 'A$', '¥', '₹'].includes(saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return '$';
  });

  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('omni_preferred_language') as LanguageCode;
        if (saved && LANGUAGE_OPTIONS.some((opt) => opt.code === saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'US';
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCurrencyChange = (c: CurrencySymbol) => {
    setCurrency(c);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('omni_preferred_currency', c);
      } catch {
        // ignore
      }
    }
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('omni_preferred_language', lang);
      } catch {
        // ignore
      }
    }
  };

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

  const handleOpenToolById = (toolId: string) => {
    const tool = TOOLS_DATA.find((t) => t.id === toolId || t.slug === toolId);
    if (tool) {
      setActiveTool(tool);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative">
      <ScrollToTop />

      {/* Top Header */}
      <Header
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
        language={language}
        onLanguageChange={handleLanguageChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
        onOpenContact={() => navigate('/contact')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">
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
              path="/blog"
              element={<BlogIndexPage />}
            />
            <Route
              path="/guides"
              element={<BlogIndexPage />}
            />
            <Route
              path="/blog/:slugOrId"
              element={<GuidePage />}
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
            <Route path="/methodology" element={<MethodologyPage />} />
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
