import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, AlertCircle, AlertTriangle } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const ProfitMarginCalc: React.FC<Props> = ({ currency }) => {
  const [cost, setCost] = useState<number>(50);
  const [price, setPrice] = useState<number>(100);
  const [targetMargin, setTargetMargin] = useState<number>(40);
  const [copied, setCopied] = useState(false);

  const safeCost = Number.isFinite(cost) ? Math.max(0, cost) : 0;
  const safePrice = Number.isFinite(price) ? Math.max(0, price) : 0;
  const safeTargetMargin = Number.isFinite(targetMargin) ? Math.max(0, Math.min(99.9, targetMargin)) : 0;

  const grossProfit = Number.isFinite(safePrice - safeCost) ? safePrice - safeCost : 0;
  const isLoss = safeCost > safePrice;
  const marginPct = safePrice > 0 && Number.isFinite((grossProfit / safePrice) * 100) ? (grossProfit / safePrice) * 100 : 0;
  const markupPct = safeCost > 0 && Number.isFinite((grossProfit / safeCost) * 100) ? (grossProfit / safeCost) * 100 : 0;
  const priceMultiplier = safeCost > 0 && Number.isFinite(safePrice / safeCost) ? safePrice / safeCost : 0;

  // Price for target margin: Price = Cost / (1 - targetMargin/100)
  const isTargetValid = safeTargetMargin < 100;
  const targetRequiredPrice = isTargetValid && Number.isFinite(safeCost / (1 - (safeTargetMargin / 100))) ? safeCost / (1 - (safeTargetMargin / 100)) : 0;

  const handleCopy = () => {
    const text = `Profit Margin & Markup Breakdown:\n- Cost Price: ${currency}${safeCost.toFixed(2)}\n- Selling Price: ${currency}${safePrice.toFixed(2)}\n- ${isLoss ? 'Gross Loss' : 'Gross Profit'}: ${currency}${grossProfit.toFixed(2)}\n- Profit Margin: ${marginPct.toFixed(1)}%\n- Markup: ${markupPct.toFixed(1)}%\n- Price Multiplier: ${priceMultiplier.toFixed(2)}x`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-slate-800">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="margin-cost-input" className="text-xs font-bold text-slate-700 block mb-1">
            Cost Price ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="margin-cost-input"
              type="number"
              min="0"
              step="any"
              value={cost === 0 ? '' : cost}
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="margin-price-input" className="text-xs font-bold text-slate-700 block mb-1">
            Selling Price ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              id="margin-price-input"
              type="number"
              min="0"
              step="any"
              value={price === 0 ? '' : price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Visual Revenue Share Bar */}
      {safePrice > 0 && (
        <div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
            <span>Cost Share ({isLoss ? '100%+' : `${(100 - Math.max(0, marginPct)).toFixed(1)}%`})</span>
            <span className={isLoss ? 'text-rose-600 font-bold' : ''}>
              {isLoss ? 'Deficit' : `Profit Share (${Math.max(0, marginPct).toFixed(1)}%)`}
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            {isLoss ? (
              <div className="bg-rose-500 w-full transition-all duration-300" title="Deficit / Loss" />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}

      {/* Negative Margin / Gross Loss Warning */}
      {isLoss && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Operational Loss Alert:</span> Cost price ({currency}{safeCost.toFixed(2)}) exceeds selling price ({currency}{safePrice.toFixed(2)}). Every unit sold results in a gross loss of {currency}{Math.abs(grossProfit).toFixed(2)} ({Math.abs(marginPct).toFixed(1)}% negative margin).
          </div>
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className={`p-3 rounded-2xl text-center border ${isLoss ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isLoss ? 'text-rose-800' : 'text-emerald-800'}`}>
            {isLoss ? 'Gross Loss' : 'Gross Profit'}
          </span>
          <div className={`text-base font-extrabold mt-0.5 ${isLoss ? 'text-rose-600' : 'text-emerald-700'}`}>
            {grossProfit < 0 ? `-${currency}${Math.abs(grossProfit).toFixed(2)}` : `${currency}${grossProfit.toFixed(2)}`}
          </div>
        </div>
        <div className={`p-3 rounded-2xl text-center border ${isLoss ? 'bg-rose-50 border-rose-200' : 'bg-blue-50 border-blue-200'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isLoss ? 'text-rose-800' : 'text-blue-800'}`}>Margin</span>
          <div className={`text-base font-extrabold mt-0.5 ${isLoss ? 'text-rose-600' : 'text-blue-700'}`}>
            {marginPct.toFixed(1)}%
          </div>
        </div>
        <div className={`p-3 rounded-2xl text-center border ${isLoss ? 'bg-rose-50 border-rose-200' : 'bg-purple-50 border-purple-200'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isLoss ? 'text-rose-800' : 'text-purple-800'}`}>Markup</span>
          <div className={`text-base font-extrabold mt-0.5 ${isLoss ? 'text-rose-600' : 'text-purple-700'}`}>
            {markupPct.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Target Margin Helper */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="margin-target-input" className="text-xs font-bold text-slate-700">Target Margin Goal:</label>
          <div className="flex items-center gap-1">
            <input
              id="margin-target-input"
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
          {isTargetValid ? (
            <button
              type="button"
              onClick={() => setPrice(parseFloat(targetRequiredPrice.toFixed(2)))}
              className="font-extrabold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              title="Click to apply to selling price input"
            >
              {currency}{targetRequiredPrice.toFixed(2)} (Apply)
            </button>
          ) : (
            <span className="text-rose-500 font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Margin must be &lt; 100%
            </span>
          )}
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
