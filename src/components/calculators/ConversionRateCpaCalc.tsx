import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, Target, AlertCircle } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const ConversionRateCpaCalc: React.FC<Props> = ({ currency }) => {
  const [visitors, setVisitors] = useState<number>(5000);
  const [conversions, setConversions] = useState<number>(150);
  const [adSpend, setAdSpend] = useState<number>(600);
  const [aov, setAov] = useState<number>(45);
  const [copied, setCopied] = useState(false);

  const safeVisitors = Number.isFinite(visitors) ? Math.max(0, visitors) : 0;
  const safeConversions = Number.isFinite(conversions) ? Math.max(0, conversions) : 0;
  const safeAdSpend = Number.isFinite(adSpend) ? Math.max(0, adSpend) : 0;
  const safeAov = Number.isFinite(aov) ? Math.max(0, aov) : 0;

  const isConversionExceeded = safeVisitors > 0 && safeConversions > safeVisitors;

  // Formulas
  const crPercent = safeVisitors > 0 && Number.isFinite((safeConversions / safeVisitors) * 100) ? (safeConversions / safeVisitors) * 100 : 0;
  const cpa = safeConversions > 0 && Number.isFinite(safeAdSpend / safeConversions) ? safeAdSpend / safeConversions : 0;
  const cpc = safeVisitors > 0 && Number.isFinite(safeAdSpend / safeVisitors) ? safeAdSpend / safeVisitors : 0;
  const grossRevenue = Number.isFinite(safeConversions * safeAov) ? safeConversions * safeAov : 0;
  const roas = safeAdSpend > 0 && Number.isFinite(grossRevenue / safeAdSpend) ? grossRevenue / safeAdSpend : 0;
  const visitorsPer100Conversions = crPercent > 0 && Number.isFinite(100 / (crPercent / 100)) ? Math.round(100 / (crPercent / 100)) : 0;

  const handleCopy = () => {
    const text = `Conversion Rate & CPA Analysis:\n- Visitors / Clicks: ${safeVisitors.toLocaleString()}\n- Total Conversions: ${safeConversions.toLocaleString()}\n- Conversion Rate (CR): ${crPercent.toFixed(2)}%\n- Ad Spend: ${currency}${safeAdSpend.toLocaleString()}\n- Cost Per Acquisition (CPA): ${currency}${cpa.toFixed(2)}\n- Cost Per Click (CPC): ${currency}${cpc.toFixed(2)}\n- Est. Revenue (AOV ${currency}${safeAov}): ${currency}${grossRevenue.toLocaleString()} (${roas.toFixed(2)}x ROAS)\n- Traffic needed per 100 sales: ${visitorsPer100Conversions.toLocaleString()} visitors`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setPreset = (v: number, c: number, s: number, a: number) => {
    setVisitors(v);
    setConversions(c);
    setAdSpend(s);
    setAov(a);
  };

  return (
    <div className="space-y-5 text-slate-800">
      {/* Preset Quick Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">Industry Benchmarks:</span>
        <button
          type="button"
          onClick={() => setPreset(5000, 125, 500, 60)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition cursor-pointer"
        >
          E-Com Store (2.5% CR)
        </button>
        <button
          type="button"
          onClick={() => setPreset(2000, 100, 800, 150)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition cursor-pointer"
        >
          B2B Lead Gen (5.0% CR)
        </button>
        <button
          type="button"
          onClick={() => setPreset(1000, 100, 300, 25)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition cursor-pointer"
        >
          High-Intent Landing (10% CR)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="cpa-visitors-input" className="text-xs font-bold text-slate-700 block mb-1">
            Total Unique Visitors / Clicks
          </label>
          <input
            id="cpa-visitors-input"
            type="number"
            min="1"
            value={visitors === 0 ? '' : visitors}
            onChange={(e) => setVisitors(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="cpa-conversions-input" className="text-xs font-bold text-slate-700 block mb-1">
            Total Conversions / Orders
          </label>
          <input
            id="cpa-conversions-input"
            type="number"
            min="0"
            value={conversions === 0 ? '' : conversions}
            onChange={(e) => setConversions(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="cpa-adspend-input" className="text-xs font-bold text-slate-700 block mb-1">
            Total Ad Campaign Spend ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="cpa-adspend-input"
              type="number"
              min="0"
              step="any"
              value={adSpend === 0 ? '' : adSpend}
              onChange={(e) => setAdSpend(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cpa-aov-input" className="text-xs font-bold text-slate-700 block mb-1">
            Average Order Value (AOV) ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="cpa-aov-input"
              type="number"
              min="0"
              step="any"
              value={aov === 0 ? '' : aov}
              onChange={(e) => setAov(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>
      </div>

      {isConversionExceeded && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Note: Recorded conversions ({safeConversions}) exceed total visitors ({safeVisitors}). Verify that conversions are unique per visitor.</span>
        </div>
      )}

      {/* Main Scorecard */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-rose-400" /> Conversion Rate (CR):
            </div>
            <div className="text-[11px] text-slate-400">Orders per 100 unique store visitors</div>
          </div>
          <span className="font-black text-rose-400 text-2xl tracking-tight">
            {crPercent.toFixed(2)}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Cost Per Acquisition (CPA):</span>
            <span className="font-bold text-emerald-400 text-sm">{currency}{cpa.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Cost Per Click (CPC):</span>
            <span className="font-bold text-blue-400 text-sm">{currency}{cpc.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Gross Revenue Generated:</span>
            <span className="font-bold text-white text-sm">{currency}{grossRevenue.toLocaleString()} ({roas.toFixed(2)}x ROAS)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Traffic per 100 Sales:</span>
            <span className="font-bold text-amber-300 text-sm">{visitorsPer100Conversions.toLocaleString()} clicks</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setPreset(5000, 150, 600, 45)}
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
