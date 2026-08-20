import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { AdSlot } from '../components/AdSlot';
import { SITE_URL, getAbsoluteUrl, SITE_CONFIG } from '../config/site';
import {
  Mail,
  Copy,
  Check,
  ChevronRight,
  MessageSquare,
  Clock,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = SITE_CONFIG.contactEmail;
  const mailtoLink = `mailto:${email}?subject=OmniMetrics%20Hub%20Inquiry`;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact OmniMetrics Hub',
    description: 'Get in touch with the OmniMetrics Hub team for mathematical feedback, advertising inquiries, or calculation suggestions.',
    url: getAbsoluteUrl('/contact'),
    mainEntity: {
      '@type': 'Organization',
      name: 'OmniMetrics Hub',
      email: email,
      url: `${SITE_URL}/`,
    },
  };

  return (
    <main className="min-w-0 flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <SeoHead
        title="Contact Us & Feedback"
        description="Contact the OmniMetrics Hub team. Inquiries regarding financial calculation formulas, suggestions, or editorial feedback."
        keywords={['contact omnimetrics hub', 'support email', 'feedback', 'calculator suggestions']}
        canonicalPath="/contact"
        schemaData={schemaData}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-800 transition font-medium">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 truncate" aria-current="page">
          Contact Us
        </span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            Get in Touch
          </span>
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
            Direct Support
          </span>
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Contact OmniMetrics Hub
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          Have feedback on a specific financial formula, found an edge-case calculation discrepancy, or want to suggest a new tool? We welcome your input.
        </p>
      </header>

      {/* Leaderboard Ad */}
      <AdSlot position="leaderboard" />

      {/* Contact Card */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6 text-slate-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Direct Communication Channel
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
              Send an email directly to our editorial and engineering team.
            </p>
          </div>
        </div>

        {/* Email Copy Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Official Contact Email
            </span>
            <a
              href={mailtoLink}
              className="text-emerald-700 font-extrabold text-base hover:underline"
            >
              {email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyEmail}
              className={`px-3.5 py-2 rounded-xl border text-slate-700 flex items-center gap-1.5 font-bold text-xs transition shadow-2xs cursor-pointer ${
                copiedEmail
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
            </button>

            <a
              href={mailtoLink}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Support Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Response Standard</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              We respond to developer inquiries, formula feedback, and commercial partnership emails within 24–48 business hours.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Privacy Guarantee</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              We never sell or share your contact information. Messages are used solely to answer your questions and improve our tools.
            </p>
          </div>
        </div>

        {/* Common Topics */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Common Inquiries We Receive</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-5">
            <li>Suggestions for new industry-specific calculators (e.g. real estate yield, SaaS churn, inventory turnover).</li>
            <li>Requests for clarification or enhancements to existing mathematical documentation.</li>
            <li>Feedback on mobile responsiveness or accessibility improvements.</li>
          </ul>
        </div>
      </section>

      {/* Bottom Ad */}
      <AdSlot position="bottom" />
    </main>
  );
};
