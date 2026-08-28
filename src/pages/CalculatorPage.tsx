import React, { useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { TOOLS_DATA } from '../data/tools';
import { CurrencySymbol, AppOutletContext } from '../types';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { SITE_URL, getAbsoluteUrl } from '../config/site';
import {
  ChevronRight,
  ArrowLeft,
  Share2,
  Check,
  HelpCircle,
  Lightbulb,
  Calculator,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';

// Import All 12 Calculators
import { PaymentFeesCalc } from '../components/calculators/PaymentFeesCalc';
import { ProfitMarginCalc } from '../components/calculators/ProfitMarginCalc';
import { BreakEvenCalc } from '../components/calculators/BreakEvenCalc';
import { RoasCalc } from '../components/calculators/RoasCalc';
import { ConversionRateCpaCalc } from '../components/calculators/ConversionRateCpaCalc';
import { LandedCostCalc } from '../components/calculators/LandedCostCalc';
import { FreelanceRateCalc } from '../components/calculators/FreelanceRateCalc';
import { LatePaymentInterestCalc } from '../components/calculators/LatePaymentInterestCalc';
import { CompoundInterestCalc } from '../components/calculators/CompoundInterestCalc';
import { LoanEmiCalc } from '../components/calculators/LoanEmiCalc';
import { CustomerLtvCalc } from '../components/calculators/CustomerLtvCalc';
import { SalaryTaxCalc } from '../components/calculators/SalaryTaxCalc';
import { CalculatorDisclaimer, DisclaimerDomain } from '../components/CalculatorDisclaimer';

interface Props {
  currency?: CurrencySymbol;
}

export const CalculatorPage: React.FC<Props> = (props) => {
  const context = useOutletContext<AppOutletContext | undefined>();
  const currency = props.currency ?? context?.currency ?? '$';
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const [copiedLink, setCopiedLink] = useState(false);

  // Match either by slug or by legacy ID
  const tool = TOOLS_DATA.find(
    (t) => t.slug === slugOrId || t.id === slugOrId
  );

  if (!tool) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Calculator Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The requested financial tool does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Calculators</span>
        </Link>
      </main>
    );
  }

  const renderCalculatorComponent = () => {
    switch (tool.id) {
      case 'calc-fees':
        return <PaymentFeesCalc currency={currency} />;
      case 'calc-margin':
        return <ProfitMarginCalc currency={currency} />;
      case 'calc-breakeven':
        return <BreakEvenCalc currency={currency} />;
      case 'calc-roas':
        return <RoasCalc currency={currency} />;
      case 'calc-cr-cpa':
        return <ConversionRateCpaCalc currency={currency} />;
      case 'calc-landed-cost':
        return <LandedCostCalc currency={currency} />;
      case 'calc-freelance':
        return <FreelanceRateCalc currency={currency} />;
      case 'calc-late-interest':
        return <LatePaymentInterestCalc currency={currency} />;
      case 'calc-compound':
        return <CompoundInterestCalc currency={currency} />;
      case 'calc-loan-emi':
        return <LoanEmiCalc currency={currency} />;
      case 'calc-ltv':
        return <CustomerLtvCalc currency={currency} />;
      case 'calc-salary':
        return <SalaryTaxCalc currency={currency} />;
      default:
        return <div className="p-4 text-xs text-slate-500">Calculator under maintenance.</div>;
    }
  };

  const getDisclaimerDomain = (toolId: string): DisclaimerDomain => {
    switch (toolId) {
      case 'calc-fees': return 'payment-fees';
      case 'calc-margin': return 'margin';
      case 'calc-breakeven': return 'breakeven';
      case 'calc-roas': return 'roas';
      case 'calc-cr-cpa': return 'cr-cpa';
      case 'calc-landed-cost': return 'landed-cost';
      case 'calc-freelance': return 'freelance';
      case 'calc-late-interest': return 'late-interest';
      case 'calc-compound': return 'compound';
      case 'calc-loan-emi': return 'loan-emi';
      case 'calc-ltv': return 'ltv';
      case 'calc-salary': return 'salary';
      default: return 'general';
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedTools = TOOLS_DATA.filter((t) =>
    tool.relatedToolIds.includes(t.id)
  );

  // Schema.org Structured Data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: tool.fullTitle,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description: tool.metaDescription,
        url: getAbsoluteUrl(`/tools/${tool.slug}`),
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
            name: tool.category,
            item: `${SITE_URL}/#${tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.name,
            item: getAbsoluteUrl(`/tools/${tool.slug}`),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: tool.detailedGuide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-w-0 flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <SeoHead
        title={tool.fullTitle}
        description={tool.metaDescription}
        keywords={tool.keywords}
        canonicalPath={`/tools/${tool.slug}`}
        schemaData={schemaData}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-800 transition font-medium">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/" className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] hover:text-slate-800 transition">
          {tool.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 truncate" aria-current="page">
          {tool.name}
        </span>
      </nav>

      {/* Page Header */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 ${tool.tagColor}`}>
              {tool.category}
            </span>
            <span className="text-[11px] bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              Instant Client-Side Math
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Copy shareable tool link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Calculator</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {tool.fullTitle}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {tool.description}
        </p>
      </header>

      {/* Top AdSlot */}
      <AdSlot position="leaderboard" />

      {/* Main Interactive Tool Container */}
      <section aria-labelledby="interactive-calc-heading" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl ${tool.iconBgColor} flex items-center justify-center ${tool.iconColor}`}>
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 id="interactive-calc-heading" className="font-extrabold text-base text-slate-900">
                Interactive Calculation Engine
              </h2>
              <p className="text-xs text-slate-400">
                Client-side processing • Instant real-time calculation • 100% Private
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            Active Currency: {currency}
          </span>
        </div>

        {/* Calculator Core */}
        <div className="max-w-xl mx-auto">
          {renderCalculatorComponent()}
          <CalculatorDisclaimer domain={getDisclaimerDomain(tool.id)} className="mt-6" />
        </div>
      </section>

      {/* Mid-Content Ad Placement */}
      <AdSlot position="mid-page" />

      {/* Comprehensive Educational Guide & Documentation */}
      <article className="space-y-8 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-9 text-slate-800">
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Understanding {tool.name}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {tool.detailedGuide.whatIsIt}
          </p>
          {tool.detailedGuide.howItWorks && (
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1 mt-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900">How the Engine Operates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{tool.detailedGuide.howItWorks}</p>
            </div>
          )}
        </section>

        {/* Section 2: Mathematical Formula Breakdown */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-600" />
            <span>Mathematical Formula & Variables</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {tool.detailedGuide.formulaExplanation}
          </p>

          <div className="p-4 sm:p-5 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
            <pre className="whitespace-pre-wrap">{tool.detailedGuide.formulaMath}</pre>
          </div>
        </section>

        {/* Section 3: Step-by-Step Example */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Step-by-Step Worked Example</span>
          </h3>
          <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
            {tool.detailedGuide.stepByStepExample}
          </div>
        </section>

        {/* Section 4: When to Use & Common Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          {tool.detailedGuide.whenToUse && tool.detailedGuide.whenToUse.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>When to Use This Tool</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                {tool.detailedGuide.whenToUse.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tool.detailedGuide.commonMistakes && tool.detailedGuide.commonMistakes.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Common Pitfalls to Avoid</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                {tool.detailedGuide.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Section 5: Practical Best Practices */}
        {tool.detailedGuide.practicalTips && tool.detailedGuide.practicalTips.length > 0 && (
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Practical Strategic Recommendations
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              {tool.detailedGuide.practicalTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section 6: Contextual FAQs */}
        {tool.detailedGuide.faqs && tool.detailedGuide.faqs.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-3">
              {tool.detailedGuide.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <section aria-labelledby="related-calculators-heading" className="space-y-4">
          <h3 id="related-calculators-heading" className="font-black text-xl text-slate-900 tracking-tight">
            Related Financial & Decision Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.id}
                to={`/tools/${relTool.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between group"
              >
                <div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider block mb-1 ${relTool.tagColor}`}>
                    {relTool.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-emerald-700 transition">
                    {relTool.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {relTool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-600 transition">
                  <span>Open Calculator</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Ad Placement */}
      <AdSlot position="bottom" />
    </main>
  );
};
