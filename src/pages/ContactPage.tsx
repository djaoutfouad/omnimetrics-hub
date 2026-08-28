import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
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
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = SITE_CONFIG.contactEmail;
  const mailtoLink = `mailto:${email}?subject=OmniMetrics%20Hub%20Inquiry`;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry / Feedback',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        user_name: formData.name,
        email: formData.email,
        user_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'OmniMetrics Hub Support',
      };

      await emailjs.send(
        SITE_CONFIG.emailjs.serviceId,
        SITE_CONFIG.emailjs.templateId,
        templateParams,
        SITE_CONFIG.emailjs.publicKey
      );

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry / Feedback',
        message: '',
      });
    } catch (err: any) {
      console.error('EmailJS transmission error:', err);
      setStatus('error');
      setErrorMessage(
        err?.text || 'Failed to dispatch your message through the server. Please try sending a direct email instead.'
      );
    }
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact OmniMetrics Hub',
    description:
      'Get in touch with the OmniMetrics Hub team for mathematical feedback, advertising inquiries, or calculation suggestions.',
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
          Have feedback on a specific financial formula, found an edge-case calculation discrepancy, or want to suggest a new tool? Send us a message below.
        </p>
      </header>

      {/* Leaderboard Ad */}
      <AdSlot position="leaderboard" />

      {/* Main Contact Form & Direct Card */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-8 text-slate-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Send a Message
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
              Fill out the form below to reach our mathematical research and engineering team.
            </p>
          </div>
        </div>

        {/* EmailJS Contact Form */}
        {status === 'success' ? (
          <div className="p-6 sm:p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-emerald-950">Message Sent Successfully!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you for contacting OmniMetrics Hub. Our quantitative analysts and support team have received your transmission and will review it promptly.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Send Another Message</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Transmission issue encountered</p>
                  <p className="text-[11px] leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Name <span className="text-emerald-600">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Email Address <span className="text-emerald-600">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                Topic / Subject <span className="text-emerald-600">*</span>
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition"
              >
                <option value="General Inquiry / Feedback">General Inquiry / Feedback</option>
                <option value="Formula Discrepancy / Bug Report">Formula Discrepancy / Bug Report</option>
                <option value="New Financial Calculator Suggestion">New Financial Calculator Suggestion</option>
                <option value="Partnership & Advertising Inquiry">Partnership & Advertising Inquiry</option>
                <option value="Data Privacy & Legal Question">Data Privacy & Legal Question</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Message <span className="text-emerald-600">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please describe your formula inquiry, bug report, or calculation requirements with any relevant input variables..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium resize-y transition"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Protected by EmailJS service</span>
              </span>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white transition shadow-sm flex items-center gap-2 ${
                  status === 'sending'
                    ? 'bg-emerald-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] cursor-pointer'
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Email Copy Box */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Or Reach Us Directly
          </h3>
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
        </div>

        {/* Support Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Response Standard</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              We respond to formula inquiries, edge-case bug reports, and commercial emails within 24–48 business hours.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Privacy Guarantee</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              We never sell or share your contact information. Messages are processed securely and used exclusively to answer inquiries.
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
