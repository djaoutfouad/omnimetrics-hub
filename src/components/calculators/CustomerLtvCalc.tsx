import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const CustomerLtvCalc: React.FC<Props> = ({ currency }) => {
  const [aov, setAov] = useState<number>(65);
  const [purchaseFrequency, setPurchaseFrequency] = useState<number>(4);
  const [lifespanYears, setLifespanYears] = useState<number>(3);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(60);
  const [copied, setCopied] = useState(false);

  const safeAov = Number.isFinite(aov) ? Math.max(0, aov) : 0;
  const safeFrequency = Number.isFinite(purchaseFrequency) ? Math.max(0, purchaseFrequency) : 0;
  const safeLifespan = Number.isFinite(lifespanYears) ? Math.max(0, lifespanYears) : 0;
  const safeMargin = Number.isFinite(grossMarginPct) ? Math.max(0, Math.min(100, grossMarginPct)) : 0;

  const annualCustomerRevenue = Number.isFinite(safeAov * safeFrequency) ? safeAov * safeFrequency : 0;
  const grossLtv = Number.isFinite(annualCustomerRevenue * safeLifespan) ? annualCustomerRevenue * safeLifespan : 0;
  const profitLtv = Number.isFinite(grossLtv * (safeMargin / 100)) ? grossLtv * (safeMargin / 100) : 0;
  const recommendedMaxCac = Number.isFinite(profitLtv / 3) ? profitLtv / 3 : 0; // Standard SaaS/eCom 3:1 LTV:CAC target

  const handleCopy = () => {
    const text = `Customer Lifetime Value (LTV) Summary:\n- Average Order Value (AOV): ${currency}${safeAov.toFixed(2)}\n- Purchase Frequency: ${safeFrequency} orders/yr\n- Customer Lifespan: ${safeLifespan} years\n- Gross Margin: ${safeMargin}%\n- Annual Value / Customer: ${currency}${annualCustomerRevenue.toFixed(2)}/yr\n- Gross Lifetime Revenue: ${currency}${grossLtv.toFixed(2)}\n- Net Lifetime Profit: ${currency}${profitLtv.toFixed(2)}\n- Recommended Max CAC (3:1 ratio): ${currency}${recommendedMaxCac.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
      <div>
        <label htmlFor="ltv-aov-input" className="text-xs font-bold text-slate-700 block mb-1">
          Average Order Value (AOV) ({currency})
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">{currency}</span>
          <input
            id="ltv-aov-input"
            type="number"
            min="0"
            step="any"
            value={aov === 0 ? '' : aov}
            onChange={(e) => setAov(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="ltv-freq-input" className="text-xs font-bold text-slate-700 block mb-1">
            Orders per Year
          </label>
          <input
            id="ltv-freq-input"
            type="number"
            min="0.1"
            step="0.5"
            value={purchaseFrequency === 0 ? '' : purchaseFrequency}
            onChange={(e) => setPurchaseFrequency(parseFloat(e.target.value) || 0)}
            placeholder="4"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="ltv-lifespan-input" className="text-xs font-bold text-slate-700 block mb-1">
            Customer Lifespan (Years)
          </label>
          <input
            id="ltv-lifespan-input"
            type="number"
            min="0.1"
            step="0.5"
            value={lifespanYears === 0 ? '' : lifespanYears}
            onChange={(e) => setLifespanYears(parseFloat(e.target.value) || 0)}
            placeholder="3"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="ltv-margin-slider" className="text-xs font-bold text-slate-700">Gross Margin Percentage (%)</label>
          <span className="text-xs font-bold text-purple-700">{safeMargin}%</span>
        </div>
        <input
          id="ltv-margin-slider"
          type="range"
          min="5"
          max="100"
          value={grossMarginPct}
          onChange={(e) => setGrossMarginPct(parseInt(e.target.value) || 0)}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
      </div>

      {/* Main Results */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline text-xs text-slate-400">
          <span>Annual Revenue / Customer:</span>
          <span className="font-bold text-slate-300">
            {currency}{annualCustomerRevenue.toFixed(2)} / year
          </span>
        </div>

        <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
          <div>
            <div className="text-xs font-bold text-slate-300">Gross Lifetime Revenue:</div>
            <div className="text-[11px] text-slate-400">Cumulative customer spend</div>
          </div>
          <span className="font-black text-purple-400 text-2xl tracking-tight">
            {currency}{grossLtv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Net Profit LTV ({safeMargin}%):</span>
            <span className="font-bold text-emerald-400 text-sm">
              {currency}{profitLtv.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Recommended Max CAC (3:1):</span>
            <span className="font-bold text-blue-400 text-sm">
              {currency}{recommendedMaxCac.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setAov(65);
            setPurchaseFrequency(4);
            setLifespanYears(3);
            setGrossMarginPct(60);
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
