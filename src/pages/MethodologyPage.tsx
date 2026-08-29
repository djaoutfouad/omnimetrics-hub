import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { ContentWithRails } from '../components/ContentWithRails';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';
import {
  ShieldCheck,
  Calculator,
  ChevronRight,
  Code2,
  Lock,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const canonicalUrl = getAbsoluteUrl('/methodology');

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: 'Calculation Methodology & Quantitative Standards | OmniMetrics Hub',
        description:
          'Comprehensive overview of OmniMetrics Hub mathematical formulas, client-side privacy architecture, rounding conventions, and computational modeling standards.',
        url: canonicalUrl,
        publisher: {
          '@type': 'Organization',
          name: 'OmniMetrics Hub',
          url: `${SITE_URL}/`,
          logo: {
            '@type': 'ImageObject',
            url: SITE_CONFIG.logoUrl,
          },
        },
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
            name: 'Calculation Methodology',
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <ContentWithRails maxWidthClass="max-w-4xl 2xl:max-w-5xl">
      <SeoHead
        title="Calculation Methodology & Mathematical Standards | OmniMetrics Hub"
        description="Learn how OmniMetrics Hub approaches financial, e-commerce, and business mathematics. Transparent formulas, client-side calculation privacy, and strict precision standards."
        keywords={[
          'calculation methodology',
          'financial calculator formulas',
          'client side math',
          'business metrics standards',
          'rounding conventions',
          'precision finance tools',
        ]}
        canonicalPath="/methodology"
        schemaData={schemaData}
      />

      <div className="space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link to="/" className="hover:text-slate-800 transition font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-slate-900" aria-current="page">
            Methodology & Standards
          </span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Computational Standards
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Quantitative Architecture & Verification
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Calculation Methodology
          </h1>

          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            Every calculator on OmniMetrics Hub is built upon transparent, published mathematical formulas, executed entirely client-side, and verified against standard financial accounting conventions.
          </p>
        </header>

        {/* Core Pillars */}
        <section aria-labelledby="pillars-heading" className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <h2 id="pillars-heading" className="sr-only">
            Methodological Pillars
          </h2>
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">100% Client-Side</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculations occur locally in your browser’s JavaScript engine. Zero financial figures or user inputs are transmitted to external servers.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Deterministic Math</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every formula produces repeatable, verified outputs consistent with GAAP conventions, standard loan amortization schedules, and merchant fee schedules.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Zero Data Harvesting</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We do not track, store, or sell user calculations. Your financial model, profit figures, and personal rates remain strictly confidential.
            </p>
          </div>
        </section>

        {/* Detailed Standards Section */}
        <section aria-labelledby="standards-heading" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
          <h2 id="standards-heading" className="text-xl font-bold text-slate-900">
            Computational Precision & Rounding Conventions
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              To maintain accuracy across currency conversions and multi-step equations (such as compound interest and loan amortization), internal calculation pipelines retain full 64-bit floating-point precision throughout intermediate operations.
            </p>
            <p>
              Final user-facing values are rounded strictly at display-time to 2 decimal places (or integer units where applicable) following standard half-up arithmetic rounding rules.
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 my-4">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Standard Numerical Verification Checklist
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Intermediate variables are never truncated before compound calculations complete.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Division-by-zero safeguards and input bounds validation prevent non-finite display states.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tiered fee calculations (such as Stripe / PayPal merchant pricing) apply fixed and variable fee components independently.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formula Transparency Callout */}
        <section aria-labelledby="transparency-heading" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <h2 id="transparency-heading" className="text-xl font-bold">
              Formula Transparency & Peer Review
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We publish complete formula breakdowns and educational step-by-step guides for every single calculator in our Knowledge Base. If you notice any discrepancy or wish to propose an updated merchant rate schedule, contact our quantitative engineering team.
          </p>
        </section>

        {/* Browse Calculators CTA */}
        <section aria-labelledby="cta-heading" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h2 id="cta-heading" className="text-lg font-bold text-slate-900">
              Ready to calculate?
            </h2>
            <p className="text-xs text-slate-500">
              Explore all 12 precision tools built on these computational standards.
            </p>
          </div>
          <Link
            to="/calculators"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Open All Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Bottom Ad Placement */}
        <AdSlot position="bottom" />
      </div>
    </ContentWithRails>
  );
};
