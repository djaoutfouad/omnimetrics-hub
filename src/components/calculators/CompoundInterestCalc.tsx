import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const CompoundInterestCalc: React.FC<Props> = ({ currency }) => {
  const [principal, setPrincipal] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [years, setYears] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  const safePrincipal = Number.isFinite(principal) ? Math.max(0, principal) : 0;
  const safeMonthly = Number.isFinite(monthlyContribution) ? Math.max(0, monthlyContribution) : 0;
  const safeRate = Number.isFinite(annualRate) ? Math.max(0, annualRate) : 0;
  const safeYears = Number.isFinite(years) ? Math.max(1, Math.min(60, years)) : 1;

  // Future value formula with regular monthly deposits:
  // FV = P * (1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
  const n = 12; // compounding frequency monthly
  const r = safeRate / 100;
  const t = safeYears;
  const r_over_n = r / n;
  const nt = n * t;

  let futureValue = 0;
  if (r === 0) {
    futureValue = safePrincipal + (safeMonthly * 12 * safeYears);
  } else {
    const compoundFactor = Math.pow(1 + r_over_n, nt);
    const principalFV = safePrincipal * compoundFactor;
    const annuityFV = r_over_n > 0 ? safeMonthly * ((compoundFactor - 1) / r_over_n) : 0;
    futureValue = principalFV + annuityFV;
  }

  if (!Number.isFinite(futureValue)) {
    futureValue = 0;
  }

  const totalDeposits = safePrincipal + (safeMonthly * 12 * safeYears);
  const totalInterestEarned = Number.isFinite(futureValue) ? Math.max(0, futureValue - totalDeposits) : 0;

  const handleCopy = () => {
    const text = `Compound Interest Projection:\n- Initial Principal: ${currency}${safePrincipal.toLocaleString()}\n- Monthly Deposit: ${currency}${safeMonthly.toLocaleString()}/mo\n- Annual Interest Rate: ${safeRate}%\n- Horizon: ${safeYears} years\n- Total Contributions: ${currency}${totalDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n- Total Interest Earned: ${currency}${totalInterestEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n- Projected Future Value: ${currency}${futureValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="ci-principal-input" className="text-xs font-bold text-slate-700 block mb-1">
            Initial Principal ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="ci-principal-input"
              type="number"
              min="0"
              step="any"
              value={principal === 0 ? '' : principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="ci-monthly-input" className="text-xs font-bold text-slate-700 block mb-1">
            Monthly Contribution ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="ci-monthly-input"
              type="number"
              min="0"
              step="any"
              value={monthlyContribution === 0 ? '' : monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="ci-rate-input" className="text-xs font-bold text-slate-700 block mb-1">
            Annual Return Rate (%)
          </label>
          <input
            id="ci-rate-input"
            type="number"
            min="0"
            max="40"
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="ci-years-input" className="text-xs font-bold text-slate-700 block mb-1">
            Time Horizon (Years)
          </label>
          <input
            id="ci-years-input"
            type="number"
            min="1"
            max="60"
            value={years === 0 ? '' : years}
            onChange={(e) => setYears(parseInt(e.target.value) || 1)}
            placeholder="10"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>
      </div>

      {/* Main Results */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300">Projected Balance:</div>
            <div className="text-[11px] text-slate-400">After {safeYears} years compounding</div>
          </div>
          <span className="font-black text-teal-400 text-2xl tracking-tight">
            {currency}{futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Total Deposits:</span>
            <span className="font-bold text-slate-200 text-sm">
              {currency}{totalDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Compound Interest Earned:</span>
            <span className="font-bold text-emerald-400 text-sm">
              +{currency}{totalInterestEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setPrincipal(5000);
            setMonthlyContribution(200);
            setAnnualRate(8);
            setYears(10);
          }}
          className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Summary'}
        </button>
      </div>
    </div>
  );
};
