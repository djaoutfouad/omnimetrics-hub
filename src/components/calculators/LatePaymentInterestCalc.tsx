import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, CalendarClock } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const LatePaymentInterestCalc: React.FC<Props> = ({ currency }) => {
  const [principal, setPrincipal] = useState<number>(3500);
  const [daysOverdue, setDaysOverdue] = useState<number>(45);
  const [annualRate, setAnnualRate] = useState<number>(8.0);
  const [statutoryFee, setStatutoryFee] = useState<number>(70);
  const [copied, setCopied] = useState(false);

  const safePrincipal = Math.max(0, principal || 0);
  const safeDays = Math.max(0, daysOverdue || 0);
  const safeRate = Math.max(0, annualRate || 0);
  const safeFee = Math.max(0, statutoryFee || 0);

  // Calculations
  const dailyInterest = (safePrincipal * (safeRate / 100)) / 365;
  const totalInterest = dailyInterest * safeDays;
  const totalDue = safePrincipal + totalInterest + safeFee;

  const handleCopy = () => {
    const text = `Invoice Late Payment & Interest Summary:\n- Principal Invoice Amount: ${currency}${safePrincipal.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n- Days Overdue: ${safeDays} days\n- Annual Statutory/Contract Rate: ${safeRate}%\n- Accrued Late Interest: ${currency}${totalInterest.toFixed(2)} (${currency}${dailyInterest.toFixed(2)} / day)\n- Statutory Recovery / Admin Compensation: ${currency}${safeFee.toFixed(2)}\n- TOTAL OUTSTANDING DEBT DUE: ${currency}${totalDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setJurisdictionPreset = (rate: number, fee: number) => {
    setAnnualRate(rate);
    setStatutoryFee(fee);
  };

  return (
    <div className="space-y-4 text-slate-800">
      {/* Jurisdiction Standard Presets */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">Jurisdictions:</span>
        <button
          type="button"
          onClick={() => setJurisdictionPreset(8.0, 70)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition cursor-pointer"
        >
          UK / EU Statutory (8% + £70)
        </button>
        <button
          type="button"
          onClick={() => setJurisdictionPreset(18.0, 50)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition cursor-pointer"
        >
          US Commercial (1.5%/mo = 18%)
        </button>
        <button
          type="button"
          onClick={() => setJurisdictionPreset(10.0, 0)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition cursor-pointer"
        >
          Standard 10% Flat Rate
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Original Invoice Principal ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={principal === 0 ? '' : principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Days Past Due Date (Overdue)
          </label>
          <input
            type="number"
            min="0"
            max="3650"
            value={daysOverdue === 0 ? '' : daysOverdue}
            onChange={(e) => setDaysOverdue(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            min="0"
            step="0.25"
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Late Recovery Admin Fee ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={statutoryFee === 0 ? '' : statutoryFee}
              onChange={(e) => setStatutoryFee(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Scorecard */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <CalendarClock className="w-3.5 h-3.5 text-amber-400" /> Total Outstanding Debt Due:
            </div>
            <div className="text-[11px] text-slate-400">Principal + {safeDays} days interest + recovery fee</div>
          </div>
          <span className="font-black text-amber-400 text-2xl tracking-tight">
            {currency}{totalDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Accrued Interest:</span>
            <span className="font-bold text-rose-400 text-sm">{currency}{totalInterest.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Daily Accrual Rate:</span>
            <span className="font-bold text-amber-300 text-sm">{currency}{dailyInterest.toFixed(2)} / day</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Original Principal:</span>
            <span className="font-bold text-white text-sm">{currency}{safePrincipal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Recovery Compensation:</span>
            <span className="font-bold text-emerald-400 text-sm">{currency}{safeFee.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setPrincipal(3500);
            setDaysOverdue(45);
            setAnnualRate(8.0);
            setStatutoryFee(70);
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
