import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, CalendarClock, Info } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

const getUkStatutoryCompensation = (amount: number): number => {
  if (amount <= 0) return 0;
  if (amount < 1000) return 40;
  if (amount < 10000) return 70;
  return 100;
};

export const LatePaymentInterestCalc: React.FC<Props> = ({ currency }) => {
  const [principal, setPrincipal] = useState<number>(3500);
  const [daysOverdue, setDaysOverdue] = useState<number>(45);
  const [annualRate, setAnnualRate] = useState<number>(12.75); // UK Statutory default: BoE 4.75% + 8.0% = 12.75%
  const [statutoryFee, setStatutoryFee] = useState<number>(70);
  const [activePreset, setActivePreset] = useState<'uk' | 'us' | 'eu' | 'custom'>('uk');
  const [copied, setCopied] = useState(false);

  const safePrincipal = Number.isFinite(principal) ? Math.max(0, principal) : 0;
  const safeDays = Number.isFinite(daysOverdue) ? Math.max(0, daysOverdue) : 0;
  const safeRate = Number.isFinite(annualRate) ? Math.max(0, annualRate) : 0;
  const safeFee = Number.isFinite(statutoryFee) ? Math.max(0, statutoryFee) : 0;

  // Calculations
  const dailyInterest = Number.isFinite((safePrincipal * (safeRate / 100)) / 365) ? (safePrincipal * (safeRate / 100)) / 365 : 0;
  const totalInterest = Number.isFinite(dailyInterest * safeDays) ? dailyInterest * safeDays : 0;
  const totalDue = Number.isFinite(safePrincipal + totalInterest + safeFee) ? safePrincipal + totalInterest + safeFee : safePrincipal;

  const handleCopy = () => {
    const text = `Invoice Late Payment & Interest Summary:\n- Principal Invoice Amount: ${currency}${safePrincipal.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n- Days Overdue: ${safeDays} days\n- Annual Statutory/Contract Rate: ${safeRate}%\n- Accrued Late Interest: ${currency}${totalInterest.toFixed(2)} (${currency}${dailyInterest.toFixed(2)} / day)\n- Statutory Recovery / Admin Compensation: ${currency}${safeFee.toFixed(2)}\n- TOTAL OUTSTANDING DEBT DUE: ${currency}${totalDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrincipalChange = (val: number) => {
    setPrincipal(val);
    if (activePreset === 'uk') {
      setStatutoryFee(getUkStatutoryCompensation(val));
    }
  };

  const applyUkStatutoryPreset = () => {
    setActivePreset('uk');
    setAnnualRate(12.75); // Bank of England Base Rate 4.75% + statutory 8.0%
    setStatutoryFee(getUkStatutoryCompensation(safePrincipal));
  };

  const applyUsCommercialPreset = () => {
    setActivePreset('us');
    setAnnualRate(10.0);
    setStatutoryFee(0);
  };

  const applyEuPreset = () => {
    setActivePreset('eu');
    setAnnualRate(10.5); // ECB Ref + 8.0% benchmark
    setStatutoryFee(40); // Standard EU Directive flat fee (~€40)
  };

  return (
    <div className="space-y-4 text-slate-800">
      {/* Jurisdiction Standard Presets */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          Statutory & Commercial Benchmarks
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={applyUkStatutoryPreset}
            className={`text-left p-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              activePreset === 'uk'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-[11px]">UK Statutory</div>
            <div className="text-[10px] text-slate-500 mt-0.5">BoE 4.75% + 8% (12.75%)</div>
          </button>

          <button
            type="button"
            onClick={applyUsCommercialPreset}
            className={`text-left p-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              activePreset === 'us'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-[11px]">US Commercial</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Standard 10.0% simple</div>
          </button>

          <button
            type="button"
            onClick={applyEuPreset}
            className={`text-left p-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              activePreset === 'eu'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-[11px]">EU Commercial</div>
            <div className="text-[10px] text-slate-500 mt-0.5">ECB Ref + 8% (10.5%)</div>
          </button>

          <button
            type="button"
            onClick={() => setActivePreset('custom')}
            className={`text-left p-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              activePreset === 'custom'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-[11px]">Custom Rate</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Contract Agreement</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="late-principal-input" className="text-xs font-bold text-slate-700 block mb-1">
            Original Invoice Principal ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="late-principal-input"
              type="number"
              min="0"
              step="any"
              value={principal === 0 ? '' : principal}
              onChange={(e) => handlePrincipalChange(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="late-days-input" className="text-xs font-bold text-slate-700 block mb-1">
            Days Past Due Date (Overdue)
          </label>
          <input
            id="late-days-input"
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
          <label htmlFor="late-rate-input" className="text-xs font-bold text-slate-700 block mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            id="late-rate-input"
            type="number"
            min="0"
            step="0.05"
            value={annualRate}
            onChange={(e) => {
              setAnnualRate(parseFloat(e.target.value) || 0);
              setActivePreset('custom');
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="late-fee-input" className="text-xs font-bold text-slate-700">
              Recovery Admin Fee ({currency})
            </label>
            {activePreset === 'uk' && (
              <span className="text-[10px] text-amber-700 font-semibold">UK Tier: {currency}{getUkStatutoryCompensation(safePrincipal)}</span>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="late-fee-input"
              type="number"
              min="0"
              step="any"
              value={statutoryFee === 0 ? '' : statutoryFee}
              onChange={(e) => {
                setStatutoryFee(parseFloat(e.target.value) || 0);
                setActivePreset('custom');
              }}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* UK Statutory Compensation Reference Notice */}
      <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">UK Statutory Commercial Debt Tiers:</span> &lt;£1,000 = £40 fee | £1,000–£9,999.99 = £70 fee | £10,000+ = £100 fee. Statutory interest = Bank of England Base Rate + 8.0% simple per annum.
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
            applyUkStatutoryPreset();
          }}
          className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium transition cursor-pointer"
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
