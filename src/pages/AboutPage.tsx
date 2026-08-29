import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { ContentWithRails } from '../components/ContentWithRails';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';
import {
  ShieldCheck,
  Zap,
  Calculator,
  Lock,
  ChevronRight,
  Target,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About OmniMetrics Hub',
    description: 'Learn about OmniMetrics Hub, our quantitative mission, client-side privacy architecture, and open financial engineering calculators.',
    url: getAbsoluteUrl('/about'),
    mainEntity: {
      '@type': 'Organization',
      name: 'OmniMetrics Hub',
      url: `${SITE_URL}/`,
      logo: SITE_CONFIG.logoUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        email: SITE_CONFIG.contactEmail,
        contactType: 'Customer Support',
      },
    },
  };

  return (
    <ContentWithRails maxWidthClass="max-w-4xl 2xl:max-w-5xl">
      <SeoHead
        title="About Us & Quantitative Mission"
        description="Learn about OmniMetrics Hub: high-precision, client-side financial, e-commerce, and marketing calculation tools designed for founders, creators, and freelancers."
        keywords={['about omnimetrics hub', 'financial calculation tools', 'private client-side calculator', 'pricing math', 'business metrics']}
        canonicalPath="/about"
        schemaData={schemaData}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-800 transition font-medium">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 truncate" aria-current="page">
          About Us
        </span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            Our Mission & Architecture
          </span>
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
            Established 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Empowering Founders with Transparent Mathematical Precision
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
          OmniMetrics Hub provides clean, client-side financial, e-commerce, marketing, and freelance calculation utilities. We eliminate guesswork by turning complex mathematical formulas into intuitive, real-time decision tools.
        </p>
      </header>

      {/* Leaderboard Ad */}
      <AdSlot position="leaderboard" />

      {/* Core Values Grid */}
      <section aria-labelledby="core-values-heading" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 id="core-values-heading" className="text-base font-extrabold text-slate-900">
            100% Client-Side Privacy
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All arithmetic, revenue models, and salary inputs are computed exclusively inside your browser runtime. No financial figures or sensitive data are ever stored or transmitted to external servers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-extrabold text-slate-900">
            Zero Guesswork Math
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every calculator is accompanied by transparent, verifiable mathematical formulas, variable definitions, and step-by-step worked examples so you understand the exact mechanics behind your numbers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-base font-extrabold text-slate-900">
            Built for Operators
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Designed specifically for independent consultants, digital store owners, media buyers, and startup founders who need fast, dependable answers to critical unit economics questions.
          </p>
        </div>
      </section>

      {/* In-Depth Philosophy */}
      <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-9 space-y-6 text-slate-800">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <span>Why We Built OmniMetrics Hub</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Running a modern business requires constant numerical decisions: quoting hourly rates that cover self-employment tax, calculating invoice gross-up amounts to avoid merchant fee erosion, understanding true landed costs when importing overseas inventory, and measuring break-even ROAS on paid ad channels.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Too many online tools are either clunky, ad-cluttered, or hide their formulas behind opaque black-box interfaces. OmniMetrics Hub was built to provide a clean, fast, transparent alternative where every calculation is open, documented, and verified against standard financial accounting standards.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Who Uses Our Suite</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
            <li>
              <strong>E-Commerce Merchants:</strong> Calculating product landed costs, import tariffs, payment processing fees, and keystone margin pricing.
            </li>
            <li>
              <strong>Freelancers & Solopreneurs:</strong> Calculating hourly rates factoring non-billable overhead, statutory late payment interest, and paycheck withholdings.
            </li>
            <li>
              <strong>Growth Marketers & Media Buyers:</strong> Evaluating campaign ROAS, Customer Lifetime Value (LTV:CAC), and conversion funnel efficiency.
            </li>
            <li>
              <strong>Startup Founders & Investors:</strong> Modeling business break-even milestones, compound interest projections, and commercial loan amortization schedules.
            </li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Financial Modeling & Professional Disclaimer</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The calculators and educational guides provided on OmniMetrics Hub are designed exclusively for informational, planning, and educational purposes. While we strive to ensure that all formulas reflect mathematical best practices, they do not constitute formal tax, legal, accounting, or certified financial advice. For complex regulatory, tax filing, or lending decisions, we always recommend consulting a licensed Certified Public Accountant (CPA) or financial advisor.
          </p>
        </section>
      </article>

      {/* Explore Tools CTA */}
      <section className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-extrabold text-base text-slate-100">
            Transparent Formulas & Full Tool Directory
          </h3>
          <p className="text-xs text-slate-400">
            Read our verified methodology or explore all 12 interactive financial tools.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/methodology"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition border border-slate-700 flex items-center gap-1.5 whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Our Methodology</span>
          </Link>
          <Link
            to="/calculators"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-1.5 whitespace-nowrap"
          >
            <Calculator className="w-4 h-4" />
            <span>All 12 Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Bottom Ad */}
      <AdSlot position="bottom" />
    </div>
  </ContentWithRails>
);
};
