import React from 'react';
import { LegalTabType } from './modals/LegalModal';
import { Mail } from 'lucide-react';

interface Props {
  onOpenCalculator: (toolId: string) => void;
  onOpenLegal: (tab: LegalTabType) => void;
  onOpenContact: () => void;
  onOpenSuggest: () => void;
}

export const Footer: React.FC<Props> = ({
  onOpenCalculator,
  onOpenLegal,
  onOpenContact,
  onOpenSuggest,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              Σ
            </div>
            <div className="font-extrabold text-base text-white tracking-tight">
              OmniMetrics <span className="text-emerald-400">Hub</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
            High-precision financial calculators, fee gross-up engines, and merchant decision tools built for modern entrepreneurs, agencies, and online operators.
          </p>
          <div className="pt-2 flex items-center gap-2 text-slate-400 text-[11px]">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Contact: </span>
            <button
              type="button"
              onClick={onOpenContact}
              className="text-emerald-400 hover:underline font-semibold"
            >
              omnimetricshub@gmail.com
            </button>
          </div>
        </div>

        {/* Calculators Quick Access */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Core Calculators (12 Tools)
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-fees')}
                className="hover:text-white transition text-left"
              >
                Payment Gateway Fees
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-margin')}
                className="hover:text-white transition text-left"
              >
                Profit Margin & Markup
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-cr-cpa')}
                className="hover:text-white transition text-left"
              >
                Conversion Rate & CPA
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-landed-cost')}
                className="hover:text-white transition text-left"
              >
                Landed Cost & Pricing
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-late-interest')}
                className="hover:text-white transition text-left"
              >
                Invoice Late Interest
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-loan-emi')}
                className="hover:text-white transition text-left"
              >
                Loan & Monthly EMI
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Help */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Legal & Support
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button
                type="button"
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-white transition text-left"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegal('terms')}
                className="hover:text-white transition text-left"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegal('disclaimer')}
                className="hover:text-white transition text-left"
              >
                Financial Disclaimer
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenSuggest}
                className="hover:text-white transition text-left text-emerald-400 font-semibold"
              >
                + Suggest a Calculator
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
        <p>© 2026 OmniMetrics Hub. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>Client-side execution with 0% data tracking.</span>
        </p>
      </div>
    </footer>
  );
};
