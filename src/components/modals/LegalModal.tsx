import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, AlertTriangle, Lock, Mail, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { Link } from 'react-router-dom';

export type LegalTabType = 'privacy' | 'terms' | 'disclaimer';

interface Props {
  initialTab: LegalTabType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<Props> = ({ initialTab, onClose }) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>('privacy');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!initialTab) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
          aria-label="Close legal modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 mb-6 mr-8" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'privacy'}
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'privacy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> Privacy
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'terms'}
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'terms' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" /> Terms
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'disclaimer'}
            onClick={() => setActiveTab('disclaimer')}
            className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'disclaimer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Disclaimer
          </button>
        </div>

        {/* Content */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div>
              <h3 className="text-lg font-black text-slate-900">Privacy Policy</h3>
              <p className="text-slate-400 text-[11px]">Effective Date: January 1, 2025 • Reviewed: March 2026</p>
            </div>
            
            <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-emerald-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Client-Side Calculations</span>
              </div>
              <p className="text-[11px] text-emerald-900">
                All numbers, pricing variables, salaries, and interest figures input into our calculators run strictly in your web browser. No calculation data is ever collected, recorded, or sent to external servers.
              </p>
            </div>

            <h4 className="font-bold text-slate-900 text-xs mt-3">1. Contact & Inquiries</h4>
            <p>
              When you send a message through our Contact form, your name, email, and message are securely transmitted via EmailJS directly to our support inbox ({SITE_CONFIG.contactEmail}) solely to respond to your inquiry. We never sell or share contact details with third-party data brokers.
            </p>

            <h4 className="font-bold text-slate-900 text-xs mt-3">2. Local Storage</h4>
            <p>
              We use <code>localStorage</code> exclusively for essential interface preferences (such as remembering your consent status via <code>omni_privacy_consent</code> and currency via <code>omni_preferred_currency</code>). We do not deploy tracking pixels or marketing beacons.
            </p>

            <h4 className="font-bold text-slate-900 text-xs mt-3">3. Advertising Notice</h4>
            <p>
              Third-party advertising is not currently active. Any future advertising integration will comply with Google AdSense policies and include required consent management controls.
            </p>

            <div className="pt-2">
              <Link to="/privacy" onClick={onClose} className="text-emerald-600 hover:underline font-bold inline-flex items-center gap-1">
                <span>View Full Privacy Policy Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div>
              <h3 className="text-lg font-black text-slate-900">Terms of Service</h3>
              <p className="text-slate-400 text-[11px]">Effective Date: January 1, 2025 • Reviewed: March 2026</p>
            </div>

            <p>
              By accessing and using OmniMetrics Hub, you agree to comply with and be bound by these terms.
            </p>

            <h4 className="font-bold text-slate-900 text-xs mt-3">1. Informational & Estimation Utility</h4>
            <p>
              All computational engines, models, formulas, and guides are provided strictly for preliminary informational and educational planning. Real-world business outcomes depend on third-party agreements, tax legislation, and market conditions.
            </p>

            <h4 className="font-bold text-slate-900 text-xs mt-3">2. Permitted Use & IP</h4>
            <p>
              OmniMetrics Hub grants you a revocable, non-exclusive license to use our tools. Automated scraping, bulk extraction, or unauthorized mirroring of our software code is prohibited.
            </p>

            <h4 className="font-bold text-slate-900 text-xs mt-3">3. Limitation of Liability</h4>
            <p>
              The service is provided "as is". OmniMetrics Hub and its authors are not liable for any financial, tax, or commercial outcomes resulting from calculations.
            </p>

            <div className="pt-2">
              <Link to="/terms" onClick={onClose} className="text-emerald-600 hover:underline font-bold inline-flex items-center gap-1">
                <span>View Full Terms of Service Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'disclaimer' && (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div>
              <h3 className="text-lg font-black text-slate-900">Financial Disclaimer</h3>
              <p className="text-slate-400 text-[11px]">Effective Date: January 1, 2025 • Reviewed: March 2026</p>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-2xl text-amber-950 text-xs space-y-1">
              <span className="font-bold block">Important Notice:</span>
              <p>
                OmniMetrics Hub is an independent mathematical computation platform and is NOT a certified public accounting firm, licensed broker-dealer, or legal advisor.
              </p>
            </div>

            <p>
              All calculation outputs (including net payouts, estimated tax rates, break-even unit volumes, and investment projections) are mathematical approximations based on user inputs.
            </p>

            <p>
              You should always verify tax strategies, commercial contracts, and capitalization plans with licensed CPAs, tax counsel, and financial professionals in your local jurisdiction.
            </p>

            <div className="pt-2">
              <Link to="/disclaimer" onClick={onClose} className="text-emerald-600 hover:underline font-bold inline-flex items-center gap-1">
                <span>View Full Financial Disclaimer Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

