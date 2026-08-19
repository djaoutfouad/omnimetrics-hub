import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, AlertTriangle } from 'lucide-react';

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
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 mb-6 mr-8">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'privacy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Privacy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'terms' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Terms
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'disclaimer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Disclaimer
          </button>
        </div>

        {/* Content */}
        {activeTab === 'privacy' && (
          <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-lg font-black text-slate-900">Privacy Policy</h3>
            <p className="text-slate-400 text-[11px]">Last Updated: 2026</p>
            <p>
              At OmniMetrics Hub, we believe that your business metrics, revenue data, and financial forecasts belong exclusively to you.
            </p>
            <h4 className="font-bold text-slate-900 text-xs mt-3">1. Local Execution (Zero Server Transmission)</h4>
            <p>
              Every financial computation (rates, invoices, profit margins, ROAS, salary withholdings) executes entirely inside your client browser via local JavaScript. No numeric values entered into the input fields are collected, logged, or forwarded to external servers.
            </p>
            <h4 className="font-bold text-slate-900 text-xs mt-3">2. Cookies & Analytics</h4>
            <p>
              We do not use tracking pixels or aggressive marketing beacons. Standard browser cookies may be used solely for caching basic interface preferences like selected currency symbols.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-lg font-black text-slate-900">Terms of Service</h3>
            <p className="text-slate-400 text-[11px]">Last Updated: 2026</p>
            <p>
              By accessing and using OmniMetrics Hub, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h4 className="font-bold text-slate-900 text-xs mt-3">1. Informational & Estimation Utility</h4>
            <p>
              The tools and formulas provided on this platform are designed for estimation, mathematical modeling, and planning purposes only. While formulas reflect standard financial and industry benchmarks, variations in real-world tax codes, merchant processors, and bank fees may apply.
            </p>
            <h4 className="font-bold text-slate-900 text-xs mt-3">2. License & Fair Use</h4>
            <p>
              OmniMetrics Hub grants you a revocable, non-exclusive, non-transferable license to use our calculators for personal and commercial planning without fees.
            </p>
          </div>
        )}

        {activeTab === 'disclaimer' && (
          <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-lg font-black text-slate-900">Financial Disclaimer</h3>
            <p className="text-slate-400 text-[11px]">Last Updated: 2026</p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1">
              <span className="font-bold block">Important Notice:</span>
              <p>
                OmniMetrics Hub is an independent mathematical simulation tool and is not a certified public accounting firm, licensed broker-dealer, or legal advisor.
              </p>
            </div>
            <p>
              All calculation outputs (including net payouts, estimated tax rates, break-even unit volumes, and investment projections) are mathematical estimates based strictly on parameters input by the user.
            </p>
            <p>
              You should always verify tax strategies, merchant contracts, and business capitalization plans with licensed CPAs, tax counsel, and financial professionals in your local jurisdiction.
            </p>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
