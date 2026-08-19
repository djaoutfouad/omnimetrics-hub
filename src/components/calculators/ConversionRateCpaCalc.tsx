import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, Target } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const ConversionRateCpaCalc: React.FC<Props> = ({ currency }) => {
  const [visitors, setVisitors] = useState<number>(5000);
  const [conversions, setConversions] = useState<number>(150);
  const [adSpend, setAdSpend] = useState<number>(600);
  const [aov, setAov] = useState<number>(45);
  const [copied, setCopied] = useState(false);

  // Formulas
  const crPercent = visitors > 0 ? (conversions / visitors) * 100 : 0;
  const cpa = conversions > 0 ? adSpend / conversions : 0;
  const cpc = visitors > 0 ? adSpend / visitors : 0;
  const grossRevenue = conversions * aov;
  const roas = adSpend > 0 ? grossRevenue / adSpend : 0;
  const visitorsPer100Conversions = crPercent > 0 ? Math.round(100 / (crPercent / 100)) : 0;

  const handleCopy = () => {
    const text = `Conversion Rate & CPA Analysis:\n- Visitors / Clicks: ${visitors.toLocaleString()}\n- Total Conversions: ${conversions.toLocaleString()}\n- Conversion Rate (CR): ${crPercent.toFixed(2)}%\n- Ad Spend: ${currency}${adSpend.toLocaleString()}\n- Cost Per Acquisition (CPA): ${currency}${cpa.toFixed(2)}\n- Cost Per Click (CPC): ${currency}${cpc.toFixed(2)}\n- Est. Revenue (AOV ${currency}${aov}): ${currency}${grossRevenue.toLocaleString()} (${roas.toFixed(2)}x ROAS)\n- Traffic needed per 100 sales: ${visitorsPer100Conversions.toLocaleString()} visitors`;
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
        <span className="text-[11px] font-bold text-slate-400 shrink-0">Presets:</span>
        <button
          type="button"
          onClick={() => setPreset(5000, 125, 500, 60)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition"
        >
          E-Com Store (2.5% CR)
        </button>
        <button
          type="button"
          onClick={() => setPreset(2000, 100, 800, 150)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition"
        >
          B2B Lead Gen (5.0% CR)
        </button>
        <button
          type="button"
          onClick={() => setPreset(1000, 100, 300, 25)}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition"
        >
          Landing Page (10% CR)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Total Visitors / Clicks
          </label>
          <input
            type="number"
            min="1"
            value={visitors || ''}
            onChange={(e) => setVisitors(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Total Conversions / Orders
          </label>
          <input
            type="number"
            min="0"
            value={conversions || ''}
            onChange={(e) => setConversions(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Total Ad Spend ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={adSpend || ''}
              onChange={(e) => setAdSpend(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Average Order Value (AOV)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={aov || ''}
              onChange={(e) => setAov(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Scorecard */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-rose-400" /> Conversion Rate (CR):
            </div>
            <div className="text-[11px] text-slate-400">Orders per 100 website visitors</div>
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
          className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Summary'}
        </button>
      </div>
    </div>
  );
};
