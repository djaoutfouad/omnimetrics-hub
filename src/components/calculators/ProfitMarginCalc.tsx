import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const ProfitMarginCalc: React.FC<Props> = ({ currency }) => {
  const [cost, setCost] = useState<number>(50);
  const [price, setPrice] = useState<number>(100);
  const [targetMargin, setTargetMargin] = useState<number>(40);
  const [copied, setCopied] = useState(false);

  const grossProfit = price - cost;
  const marginPct = price > 0 ? (grossProfit / price) * 100 : 0;
  const markupPct = cost > 0 ? (grossProfit / cost) * 100 : 0;
  const priceMultiplier = cost > 0 ? price / cost : 0;

  // Price for target margin: Price = Cost / (1 - targetMargin/100)
  const targetRequiredPrice = targetMargin < 100 ? cost / (1 - (targetMargin / 100)) : 0;

  const handleCopy = () => {
    const text = `Profit Margin & Markup Breakdown:\n- Cost Price: ${currency}${cost.toFixed(2)}\n- Selling Price: ${currency}${price.toFixed(2)}\n- Gross Profit: ${currency}${grossProfit.toFixed(2)}\n- Profit Margin: ${marginPct.toFixed(1)}%\n- Markup: ${markupPct.toFixed(1)}%\n- Price Multiplier: ${priceMultiplier.toFixed(2)}x`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Cost Price ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={cost || ''}
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Selling Price ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={price || ''}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Visual Revenue Share Bar */}
      {price > 0 && (
        <div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
            <span>Cost Share ({(100 - Math.max(0, marginPct)).toFixed(1)}%)</span>
            <span>Profit Share ({Math.max(0, marginPct).toFixed(1)}%)</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="bg-slate-300 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, 100 - marginPct))}%` }}
              title="Cost"
            />
            <div
              className="bg-emerald-500 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, marginPct))}%` }}
              title="Profit"
            />
          </div>
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Gross Profit</span>
          <div className="text-base font-extrabold text-emerald-700 mt-0.5">
            {currency}{grossProfit.toFixed(2)}
          </div>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">Margin</span>
          <div className="text-base font-extrabold text-blue-700 mt-0.5">
            {marginPct.toFixed(1)}%
          </div>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">Markup</span>
          <div className="text-base font-extrabold text-purple-700 mt-0.5">
            {markupPct.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Target Margin Helper */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Target Margin Goal:</span>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min="1"
              max="99"
              value={targetMargin}
              onChange={(e) => setTargetMargin(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-center outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-xs font-bold text-slate-500">%</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
          <span className="text-slate-500">Required Selling Price:</span>
          <button
            type="button"
            onClick={() => setPrice(parseFloat(targetRequiredPrice.toFixed(2)))}
            className="font-extrabold text-blue-600 hover:underline flex items-center gap-1"
            title="Click to apply"
          >
            {currency}{targetRequiredPrice.toFixed(2)} (Apply)
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setCost(50);
            setPrice(100);
            setTargetMargin(40);
          }}
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
