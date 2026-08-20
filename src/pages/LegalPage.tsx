import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Shield, FileText, AlertTriangle, ChevronRight, ArrowLeft } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let activeTab: 'privacy' | 'terms' | 'disclaimer' = 'privacy';
  if (path.includes('terms')) activeTab = 'terms';
  else if (path.includes('disclaimer')) activeTab = 'disclaimer';

  const getMetadata = () => {
    switch (activeTab) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          description: 'OmniMetrics Hub privacy policy. Learn about our 100% client-side calculation architecture with zero server logging and zero financial data tracking.',
          canonical: '/privacy',
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          description: 'Terms of service and acceptable use policy for OmniMetrics Hub business calculators and quantitative planning tools.',
          canonical: '/terms',
        };
      case 'disclaimer':
        return {
          title: 'Financial Disclaimer',
          description: 'Financial, tax, and legal disclaimer for OmniMetrics Hub calculators and educational guides.',
          canonical: '/disclaimer',
        };
    }
  };

  const meta = getMetadata();

  return (
    <div className="min-w-0 flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <SeoHead
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonical}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-800 transition font-medium">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
          Legal & Compliance
        </span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900">
          {meta.title}
        </span>
      </nav>

      {/* Main Legal Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-9 text-slate-800 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
          <Link
            to="/privacy"
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'privacy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'terms' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Terms of Service
          </Link>
          <Link
            to="/disclaimer"
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'disclaimer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Financial Disclaimer
          </Link>
        </div>

        {/* Content */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h1 className="text-2xl font-black text-slate-900">Privacy Policy</h1>
            <p className="text-slate-400 text-xs">Last Updated: January 2026</p>
            <p>
              At OmniMetrics Hub, we believe that your business metrics, revenue figures, pricing margins, and financial forecasts belong exclusively to you.
            </p>
            <h2 className="font-bold text-slate-900 text-base mt-4">1. Local Client-Side Execution</h2>
            <p>
              Every financial computation (including payment fee gross-ups, profit margins, ROAS, salary withholdings, and loan amortizations) executes entirely inside your client web browser using local JavaScript. No numeric values entered into calculator fields are transmitted, logged, stored, or analyzed on remote servers.
            </p>
            <h2 className="font-bold text-slate-900 text-base mt-4">2. Cookies & Local Storage</h2>
            <p>
              We do not track users across the web or sell personal data. Standard client-side local storage or cookies are used solely to remember interface preferences like your chosen currency symbol and language setting.
            </p>
            <h2 className="font-bold text-slate-900 text-base mt-4">3. Third-Party Integrations</h2>
            <p>
              When third-party advertising or analytics networks (such as Google AdSense) are deployed, they may use cookies to serve non-personalized or contextual advertisements based on general browsing criteria. You can manage or disable cookie preferences directly in your web browser settings.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h1 className="text-2xl font-black text-slate-900">Terms of Service</h1>
            <p className="text-slate-400 text-xs">Last Updated: January 2026</p>
            <p>
              By accessing and using OmniMetrics Hub, you agree to comply with and be bound by the following terms of use.
            </p>
            <h2 className="font-bold text-slate-900 text-base mt-4">1. Permitted Use & Free Access</h2>
            <p>
              OmniMetrics Hub provides free access to financial calculators, estimation tools, and educational guides for personal, educational, and commercial business planning purposes.
            </p>
            <h2 className="font-bold text-slate-900 text-base mt-4">2. Accuracy & Limitation of Liability</h2>
            <p>
              While all formulas reflect current industry standards (such as Stripe processing rates, standard reducing-balance EMI formulas, and keystone markup benchmarks), calculations are approximations. OmniMetrics Hub shall not be liable for any direct or indirect business decisions, losses, or tax discrepancies resulting from reliance on these mathematical simulations.
            </p>
          </div>
        )}

        {activeTab === 'disclaimer' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h1 className="text-2xl font-black text-slate-900">Financial Disclaimer</h1>
            <p className="text-slate-400 text-xs">Last Updated: January 2026</p>
            <div className="p-4 bg-amber-50 border border-amber-200/90 rounded-2xl text-amber-900 text-xs sm:text-sm space-y-1">
              <span className="font-bold block">Important Notice:</span>
              <p>
                OmniMetrics Hub is an independent mathematical simulation software platform and is not a registered investment advisor, certified public accountant (CPA), legal counsel, or financial fiduciary.
              </p>
            </div>
            <p>
              All computational outputs (including net payouts, estimated tax rates, break-even unit volumes, and investment projections) are mathematical approximations based strictly on parameters input by the user.
            </p>
            <p>
              Tax legislation, payment processor fee schedules, and loan interest regulations vary by jurisdiction and change frequently. You should always consult with a licensed CPA, tax professional, or legal counsel before signing commercial contracts or filing statutory tax returns.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Calculators</span>
          </Link>
          <span className="text-[11px] text-slate-400">
            OmniMetrics Hub Compliance • 2026
          </span>
        </div>
      </div>
    </div>
  );
};
