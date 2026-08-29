import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const SalaryTaxCalc: React.FC<Props> = ({ currency }) => {
  const [grossAnnual, setGrossAnnual] = useState<number>(75000);
  const [taxRate, setTaxRate] = useState<number>(22);
  const [monthlyDeductions, setMonthlyDeductions] = useState<number>(150); // e.g. retirement/healthcare
  const [copied, setCopied] = useState(false);

  const safeGross = Number.isFinite(grossAnnual) ? Math.max(0, grossAnnual) : 0;
  const safeTaxRate = Number.isFinite(taxRate) ? Math.max(0, Math.min(80, taxRate)) : 0;
  const safeMonthlyDeductions = Number.isFinite(monthlyDeductions) ? Math.max(0, monthlyDeductions) : 0;

  const annualTax = Number.isFinite(safeGross * (safeTaxRate / 100)) ? safeGross * (safeTaxRate / 100) : 0;
  const annualDeductions = Number.isFinite(safeMonthlyDeductions * 12) ? safeMonthlyDeductions * 12 : 0;
  const annualNet = Number.isFinite(safeGross - annualTax - annualDeductions) ? Math.max(0, safeGross - annualTax - annualDeductions) : 0;
  const monthlyGross = Number.isFinite(safeGross / 12) ? safeGross / 12 : 0;
  const monthlyNet = Number.isFinite(annualNet / 12) ? annualNet / 12 : 0;
  const biWeeklyNet = Number.isFinite(annualNet / 26) ? annualNet / 26 : 0;
  const weeklyNet = Number.isFinite(annualNet / 52) ? annualNet / 52 : 0;
  const effectiveTaxPct = safeGross > 0 && Number.isFinite(((annualTax + annualDeductions) / safeGross) * 100) ? ((annualTax + annualDeductions) / safeGross) * 100 : 0;

  const handleCopy = () => {
    const text = `Net Salary & Tax Payout Breakdown:\n- Gross Annual Salary: ${currency}${safeGross.toLocaleString()}\n- Estimated Tax Rate: ${safeTaxRate}%\n- Annual Taxes Withheld: ${currency}${annualTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n- Annual Other Deductions: ${currency}${annualDeductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n- Annual Net Take-Home: ${currency}${annualNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n- Monthly Net Take-Home: ${currency}${monthlyNet.toLocaleString('en-US', { minimumFractionDigits: 2 })} / mo\n- Bi-Weekly Net: ${currency}${biWeeklyNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Gross Annual Salary ({currency})
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">{currency}</span>
          <input
            type="number"
            min="0"
            step="any"
            value={grossAnnual === 0 ? '' : grossAnnual}
            onChange={(e) => setGrossAnnual(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Estimated Effective Tax Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="70"
            step="0.5"
            value={taxRate}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Monthly Deductions / Benefits ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={monthlyDeductions === 0 ? '' : monthlyDeductions}
              onChange={(e) => setMonthlyDeductions(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Results */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300">Monthly Net Take-Home:</div>
            <div className="text-[11px] text-slate-400">Estimated direct deposit per month</div>
          </div>
          <span className="font-black text-pink-400 text-2xl tracking-tight">
            {currency}{monthlyNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-semibold text-slate-400">/ mo</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Annual Net Take-Home:</span>
            <span className="font-bold text-emerald-400 text-sm">
              {currency}{annualNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Bi-Weekly Paycheck:</span>
            <span className="font-bold text-blue-400 text-sm">
              {currency}{biWeeklyNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-2.5 flex justify-between text-xs text-slate-400">
          <span>Total Annual Withholdings:</span>
          <span className="font-bold text-rose-400">
            -{currency}{(annualTax + annualDeductions).toLocaleString('en-US', { minimumFractionDigits: 2 })} ({effectiveTaxPct.toFixed(1)}%)
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setGrossAnnual(75000);
            setTaxRate(22);
            setMonthlyDeductions(150);
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
