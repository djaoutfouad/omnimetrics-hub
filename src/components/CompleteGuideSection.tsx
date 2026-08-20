import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, TrendingUp, Scale, Briefcase } from 'lucide-react';

interface Props {
  onOpenCalculator?: (toolId: string) => void;
}

export const CompleteGuideSection: React.FC<Props> = ({ onOpenCalculator }) => {
  return (
    <section className="mb-14 pt-8 border-t border-slate-200/90">
      <div className="max-w-3xl mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          The Complete Guide to Financial Calculations
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
          Essential mathematical frameworks every online business owner, freelancer, and marketer should master.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic 1 */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Understanding Payment Gateway Cuts
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              When you sell online, the price a customer pays is not what lands in your account. Stripe and PayPal both charge a percentage plus a small fixed fee per transaction. Use the Payment Fees calculator to see the exact fee and net payout for any sale, or flip it around with the Reverse Invoice Target to find out what price to charge so you receive a specific amount after fees.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {onOpenCalculator && (
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-fees')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition"
              >
                Quick Calculator
              </button>
            )}
            <Link
              to="/tools/payment-gateway-fees"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
            >
              Open Full Guide & Math →
            </Link>
          </div>
        </div>

        {/* Topic 2 */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Markup vs. Profit Margin
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              These two numbers are easy to confuse but mean very different things. Margin is profit as a percentage of your selling price. Markup is profit as a percentage of your cost. A 50% markup on a $10 product is not the same as a 50% margin — use the Profit Margin & Markup tool to compare both instantly and avoid underpricing your products.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {onOpenCalculator && (
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-margin')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition"
              >
                Quick Calculator
              </button>
            )}
            <Link
              to="/tools/profit-margin"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              Open Full Guide & Math →
            </Link>
          </div>
        </div>

        {/* Topic 3 */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Finding Your Break-Even Point
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Before a product or service becomes profitable, it must first cover your fixed costs (rent, salaries, subscriptions) and variable costs (materials, per-unit fees). The Break-Even calculator tells you exactly how many units you need to sell — and the revenue that represents — before every additional sale becomes pure profit.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {onOpenCalculator && (
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-breakeven')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition"
              >
                Quick Calculator
              </button>
            )}
            <Link
              to="/tools/break-even"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
            >
              Open Full Guide & Math →
            </Link>
          </div>
        </div>

        {/* Topic 4 */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Setting a Sustainable Freelance Rate
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Many freelancers price hours without accounting for taxes, non-billable admin work, or time off. The Freelance Rate calculator works backward from your target annual income and realistic billable hours to recommend an hourly and daily rate that actually sustains your business.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {onOpenCalculator && (
              <button
                type="button"
                onClick={() => onOpenCalculator('calc-freelance')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition"
              >
                Quick Calculator
              </button>
            )}
            <Link
              to="/tools/freelance-rate"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
            >
              Open Full Guide & Math →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
