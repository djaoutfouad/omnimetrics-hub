import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { ContentWithRails } from '../components/ContentWithRails';
import { SITE_CONFIG, getAbsoluteUrl } from '../config/site';
import { Shield, FileText, AlertTriangle, ChevronRight, ArrowLeft, Mail, Lock, Database, CheckCircle2, Globe, Server } from 'lucide-react';

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
          description: 'OmniMetrics Hub Privacy Policy: Learn about our client-side mathematical execution, local storage preferences, EmailJS contact delivery, and zero financial tracking policy.',
          canonical: '/privacy',
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          description: 'OmniMetrics Hub Terms of Service: Understand our permitted use guidelines, calculation limitations, intellectual property terms, and service availability.',
          canonical: '/terms',
        };
      case 'disclaimer':
        return {
          title: 'Financial & Mathematical Disclaimer',
          description: 'OmniMetrics Hub Financial Disclaimer: Information regarding mathematical approximations, educational scope, tax/accounting limitations, and professional advice recommendations.',
          canonical: '/disclaimer',
        };
    }
  };

  const meta = getMetadata();

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${meta.title} | OmniMetrics Hub`,
    description: meta.description,
    url: getAbsoluteUrl(meta.canonical),
    publisher: {
      '@type': 'Organization',
      name: 'OmniMetrics Hub',
      url: SITE_CONFIG.siteUrl,
      logo: SITE_CONFIG.logoUrl,
    },
  };

  return (
    <ContentWithRails maxWidthClass="max-w-4xl 2xl:max-w-5xl">
      <SeoHead
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonical}
        schemaData={schemaData}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link to="/" className="hover:text-slate-800 transition font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
            Trust & Legal
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-slate-900" aria-current="page">
            {meta.title}
          </span>
        </nav>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3" role="tablist" aria-label="Legal documents">
          <Link
            to="/privacy"
            role="tab"
            aria-selected={activeTab === 'privacy'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'privacy'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Privacy Policy</span>
          </Link>
          <Link
            to="/terms"
            role="tab"
            aria-selected={activeTab === 'terms'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'terms'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Terms of Service</span>
          </Link>
          <Link
            to="/disclaimer"
            role="tab"
            aria-selected={activeTab === 'disclaimer'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'disclaimer'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Financial Disclaimer</span>
          </Link>
        </div>

        {/* Content Box */}
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-10 space-y-8 text-slate-800">
          <header className="border-b border-slate-100 pb-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Official Compliance Document
              </span>
              <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-bold">
                Updated March 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {meta.title}
            </h1>
            <p className="text-xs text-slate-500">
              Effective Date: January 1, 2025 • Last Reviewed: March 2026
            </p>
          </header>

          {/* ========================================================================= */}
          {/* PRIVACY POLICY CONTENT */}
          {/* ========================================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-emerald-950 space-y-1">
                <div className="flex items-center gap-2 font-extrabold text-xs">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>Privacy Summary: 100% Client-Side Computation</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  OmniMetrics Hub computes all financial, e-commerce, and business calculations directly inside your web browser. No numbers, rates, salaries, or financial figures entered into any calculator are ever collected, logged, or transmitted to any server.
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-600" />
                  <span>1. Information We Do NOT Collect</span>
                </h2>
                <p>
                  When you use any of the 12 calculators on OmniMetrics Hub (such as Payment Gateway Fees, Profit Margins, Break-Even, ROAS, Freelance Rates, Loan EMI, Compound Interest, or Salary Tax), your computational inputs and results are processed exclusively in your device’s local JavaScript runtime. Contact Form submissions are sent securely via EmailJS solely to answer user inquiries.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>We do not record your revenues, invoice amounts, profit margins, or ad spend figures.</li>
                  <li>We do not create user tracking profiles based on your calculations.</li>
                  <li>We do not require user accounts, logins, credit card numbers, or passwords to access our calculation suite.</li>
                </ul>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>2. Information You Voluntarily Provide (Contact & Feedback)</span>
                </h2>
                <p>
                  If you contact us via our Contact form, suggestion modal, or direct email, you voluntarily provide your name, email address, inquiry topic, and message content.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    <strong>Third-Party Delivery Provider:</strong> Contact form submissions are securely transmitted using <strong>EmailJS</strong> (an API delivery service) to route messages directly to our support inbox (<a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-emerald-600 font-semibold underline">{SITE_CONFIG.contactEmail}</a>).
                  </li>
                  <li>
                    <strong>Purpose of Use:</strong> We use your contact information solely to respond to your technical questions, formula inquiries, or feedback.
                  </li>
                  <li>
                    <strong>No Data Selling or Sharing:</strong> We never sell, rent, or distribute your email address or contact details to advertisers or third-party marketing brokers.
                  </li>
                </ul>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>3. Local Storage & Cookie Preferences</span>
                </h2>
                <p>
                  OmniMetrics Hub does not deploy tracking pixels, third-party user fingerprinting, or invasive analytics cookies. We use browser <code>localStorage</code> solely for essential user preferences:
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs">
                  <div className="font-bold text-slate-800">Local Storage Keys Used:</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <code>omni_privacy_consent</code>: Remembers your interaction with our transparency notice (stores <code>'accepted'</code> or <code>'essential_only'</code>).
                    </li>
                    <li>
                      <code>omni_preferred_language</code>: Remembers your selected interface language preference (e.g. English, Spanish, German, French, etc.).
                    </li>
                    <li>
                      <code>omni_preferred_currency</code>: Remembers your active currency symbol preference across calculators.
                    </li>
                  </ul>
                  <p className="text-slate-500 text-[11px]">
                    You can clear this storage at any time through your browser settings without affecting the core mathematical calculators.
                  </p>
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">
                  4. Advertising Policy & Future Monetization
                </h2>
                <p>
                  Third-party advertising (such as Google AdSense) is <strong>not currently active</strong> on OmniMetrics Hub. In the future, to support the free availability and maintenance of our mathematical tools, we may implement non-intrusive, policy-compliant advertising. When activated, any advertising service and its associated cookie/consent requirements (including Google-certified Consent Management Platforms for GDPR/TCF v2.2 and CCPA compliance) will be fully disclosed in this Privacy Policy.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">
                  5. Server Logging & Hosting Infrastructure
                </h2>
                <p>
                  Like all web services, our global content delivery network (CDN) and hosting infrastructure (such as Cloudflare Pages) automatically record standard technical log data (including client IP addresses, browser user-agent strings, and request timestamps) strictly for technical routing, security monitoring, and DDoS defense. These logs are not combined with personal identifying information.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">
                  6. User Rights (GDPR & CCPA/CPRA)
                </h2>
                <p>
                  Depending on your jurisdiction, you may have statutory privacy rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>The right to know what personal information has been collected through voluntary correspondence.</li>
                  <li>The right to request the deletion of any previous email correspondence sent to our support inbox.</li>
                  <li>The right to non-discrimination for exercising your privacy rights.</li>
                </ul>
                <p className="pt-1">
                  Because we do not store user accounts or personal calculation data in databases, most user rights are satisfied by default through our client-side architecture. To request deletion of email correspondence, please contact us at <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-emerald-600 font-semibold underline">{SITE_CONFIG.contactEmail}</a>.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">
                  7. Children's Online Privacy Protection
                </h2>
                <p>
                  OmniMetrics Hub provides financial and business calculation tools intended for general adult audiences, professionals, and entrepreneurs. We do not knowingly collect personal information from children under the age of 16.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">
                  8. Changes to This Policy & Contact Information
                </h2>
                <p>
                  We may periodically update this Privacy Policy to reflect technical enhancements or regulatory developments. Any revisions will be published on this page with an updated Effective Date.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1 text-xs">
                  <div className="font-bold text-slate-800">Privacy Inquiries:</div>
                  <p className="text-slate-600">
                    If you have questions regarding this Privacy Policy or our data practices, please email us directly at:{' '}
                    <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-emerald-600 font-semibold underline">
                      {SITE_CONFIG.contactEmail}
                    </a>
                  </p>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TERMS OF SERVICE CONTENT */}
          {/* ========================================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-base font-extrabold text-slate-900">1. Acceptance of Terms</h2>
                <p>
                  By accessing, browsing, or using OmniMetrics Hub (including our calculators, educational guides, articles, and methodology documentation), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should discontinue use of the website.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">2. Informational & Estimation Purpose</h2>
                <p>
                  All computational engines, models, formulas, and educational guides on OmniMetrics Hub are provided strictly for informational, educational, and preliminary planning purposes. While our formulas follow established accounting and quantitative standards, real-world business outcomes are subject to external variables, contract terms, market volatility, and jurisdictional tax laws.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">3. User Responsibility & Input Accuracy</h2>
                <p>
                  You are solely responsible for the accuracy, completeness, and appropriateness of all numerical data, percentages, and variables you input into our tools. You acknowledge that calculation outputs represent mathematical models based strictly on your chosen inputs and do not represent guaranteed financial returns or official accounting audits.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">4. Permitted Use & Intellectual Property</h2>
                <p>
                  OmniMetrics Hub grants you a personal, non-exclusive, non-transferable, revocable license to use our calculators and view our educational content for personal and business evaluation.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    <strong>Prohibited Activities:</strong> You may not engage in automated scraping, bulk data harvesting, denial-of-service attacks, reverse engineering of client scripts, or unauthorized iframe framing of our tools without prior written consent.
                  </li>
                  <li>
                    <strong>Copyright:</strong> All editorial text, guide explanations, user interface designs, custom graphics, and software code are the intellectual property of OmniMetrics Hub and protected by copyright and intellectual property laws.
                  </li>
                </ul>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">5. Disclaimer of Warranties</h2>
                <p>
                  OmniMetrics Hub is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or accuracy of calculations.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">6. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall OmniMetrics Hub, its authors, operators, or contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages (including, but not limited to, loss of profits, loss of business revenue, tax penalties, investment losses, or data errors) arising from your use of or inability to use our tools, even if advised of the possibility of such damages.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">7. Modifications to the Service and Terms</h2>
                <p>
                  We reserve the right to modify, update, enhance, or discontinue any calculator, guide, or feature of OmniMetrics Hub at any time without prior notice. Continued use of the platform following any modifications constitutes acceptance of the revised Terms of Service.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">8. Inquiries & Contact</h2>
                <p>
                  For questions regarding these Terms of Service, please reach out to us at:{' '}
                  <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-emerald-600 font-semibold underline">
                    {SITE_CONFIG.contactEmail}
                  </a>
                </p>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* FINANCIAL & MATHEMATICAL DISCLAIMER CONTENT */}
          {/* ========================================================================= */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-extrabold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Important Financial Notice</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  OmniMetrics Hub is an independent mathematical computation and educational website. It does NOT provide certified public accounting (CPA), licensed legal counsel, investment advice, or regulated tax advisory services.
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-base font-extrabold text-slate-900">1. Mathematical Estimates & Approximations</h2>
                <p>
                  All figures generated by OmniMetrics Hub (such as net payout amounts, effective tax rates, break-even unit volumes, ROAS thresholds, landed product costs, and loan amortization schedules) are mathematical approximations based on the formulas and input values provided.
                </p>
                <p>
                  Actual real-world business and financial outcomes will vary depending on factors such as specific banking fees, merchant contract terms, domestic and international tax brackets, statutory payroll rules, exchange rate spreads, and customs classifications.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">2. Domain-Specific Disclaimers</h2>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <strong className="text-slate-900 block">Payment Gateway Fees & Invoicing:</strong>
                    <p className="text-slate-600">
                      Merchant processor rates (e.g. Stripe, PayPal, Square, Shopify) depend on merchant classification, international card fees, currency conversion margins, and custom negotiated enterprise rates. Verify exact billing schedules with your payment service provider.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <strong className="text-slate-900 block">Salary & Payroll Taxation:</strong>
                    <p className="text-slate-600">
                      Payroll calculations provide generalized withholding estimates. Actual take-home pay depends on filing status, local/state tax brackets, FICA limits, pre-tax health deductions, and W-4 elections. This tool does not replace official IRS or statutory tax returns.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <strong className="text-slate-900 block">Customs & Landed Costs:</strong>
                    <p className="text-slate-600">
                      Import duty rates depend strictly on Harmonized Tariff Schedule (HTS/HS) codes, trade agreements, and port-specific handling fees. Consult a licensed customs broker for commercial shipments.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <strong className="text-slate-900 block">Loan EMI & Compound Interest:</strong>
                    <p className="text-slate-600">
                      Loan amortization schedules and compound interest projections assume constant rates and uninterrupted schedules. Lender origination fees, compounding conventions, and inflation will impact actual borrowing or investment returns.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">3. Always Seek Professional Advice</h2>
                <p>
                  Before making significant commercial investments, signing binding vendor agreements, adjusting legal hourly billing rates, or submitting statutory tax filings, we strongly recommend consulting a licensed Certified Public Accountant (CPA), chartered tax advisor, or legal attorney qualified in your jurisdiction.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-base font-extrabold text-slate-900">4. Editorial & Formula Inquiries</h2>
                <p>
                  We are committed to mathematical accuracy and transparency. If you identify a formula edge case, typographical issue, or have a suggestion for improving our documentation, please contact our research team at:{' '}
                  <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-emerald-600 font-semibold underline">
                    {SITE_CONFIG.contactEmail}
                  </a>
                </p>
              </section>
            </div>
          )}

          <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to All Calculators</span>
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>OmniMetrics Hub Trust & Compliance • 2026</span>
            </div>
          </footer>
        </article>
      </div>
    </ContentWithRails>
  );
};

