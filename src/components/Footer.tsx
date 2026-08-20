import React from 'react';
import { Link } from 'react-router-dom';
import { LegalTabType } from './modals/LegalModal';
import { Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

interface Props {
  onOpenCalculator?: (toolId: string) => void;
  onOpenLegal?: (tab: LegalTabType) => void;
  onOpenContact?: () => void;
  onOpenSuggest?: () => void;
}

export const Footer: React.FC<Props> = ({
  onOpenSuggest,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                Σ
              </div>
              <div className="font-extrabold text-base text-white tracking-tight">
                OmniMetrics <span className="text-emerald-400">Hub</span>
              </div>
            </Link>
          </div>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
            High-precision financial calculators, fee gross-up engines, and merchant decision tools built for modern entrepreneurs, agencies, and online operators.
          </p>
          <div className="pt-2 flex items-center gap-2 text-slate-400 text-[11px]">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Inquiries: </span>
            <Link
              to="/contact"
              className="text-emerald-400 hover:underline font-semibold"
            >
              omnimetricshub@gmail.com
            </Link>
          </div>
        </div>

        {/* Calculators Quick Access */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Core Calculators (12 Tools)
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>
              <Link to="/tools/payment-gateway-fees" className="hover:text-white transition">
                Payment Gateway Fees
              </Link>
            </li>
            <li>
              <Link to="/tools/profit-margin" className="hover:text-white transition">
                Profit Margin & Markup
              </Link>
            </li>
            <li>
              <Link to="/tools/break-even" className="hover:text-white transition">
                Break-Even Point
              </Link>
            </li>
            <li>
              <Link to="/tools/roas-calculator" className="hover:text-white transition">
                ROAS & Ad Spend
              </Link>
            </li>
            <li>
              <Link to="/tools/conversion-rate-cpa" className="hover:text-white transition">
                Conversion Rate & CPA
              </Link>
            </li>
            <li>
              <Link to="/tools/landed-cost" className="hover:text-white transition">
                Landed Cost & Pricing
              </Link>
            </li>
            <li>
              <Link to="/tools/freelance-rate" className="hover:text-white transition">
                Freelance Rate Formula
              </Link>
            </li>
            <li>
              <Link to="/tools/late-payment-interest" className="hover:text-white transition">
                Invoice Late Interest
              </Link>
            </li>
            <li>
              <Link to="/tools/compound-interest" className="hover:text-white transition">
                Compound Interest
              </Link>
            </li>
            <li>
              <Link to="/tools/loan-emi" className="hover:text-white transition">
                Loan & Monthly EMI
              </Link>
            </li>
            <li>
              <Link to="/tools/customer-ltv" className="hover:text-white transition">
                Customer LTV (CLV)
              </Link>
            </li>
            <li>
              <Link to="/tools/salary-tax" className="hover:text-white transition">
                Net Salary & Tax Payout
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & About Navigation */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Company & Transparency
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link to="/about" className="hover:text-white transition flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                <span>About OmniMetrics Hub</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact & Feedback</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:text-white transition">
                Financial Disclaimer
              </Link>
            </li>
            {onOpenSuggest && (
              <li className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onOpenSuggest}
                  className="hover:text-white transition text-left text-emerald-400 font-semibold"
                >
                  + Suggest a Calculator
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
        <p>© 2026 OmniMetrics Hub. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>Client-side mathematical modeling • Zero server data tracking.</span>
        </p>
      </div>
    </footer>
  );
};
