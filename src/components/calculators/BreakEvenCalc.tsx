import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const BreakEvenCalc: React.FC<Props> = ({ currency }) => {
  const [fixedCosts, setFixedCosts] = useState<number>(2000);
  const [unitPrice, setUnitPrice] = useState<number>(50);
  const [variableCost, setVariableCost] = useState<number>(20);
  const [copied, setCopied] = useState(false);

  const contributionMargin = unitPrice - variableCost;
  const contributionRatio = unitPrice > 0 ? (contributionMargin / unitPrice) * 100 : 0;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * unitPrice;
  const safetyBufferUnits = Math.ceil(breakEvenUnits * 1.25); // 25% safety margin

  const handleCopy = () => {
    const text = `Break-Even Analysis:\n- Fixed Costs: ${currency}${fixedCosts.toLocaleString()}\n- Unit Selling Price: ${currency}${unitPrice.toFixed(2)}\n- Variable Cost / Unit: ${currency}${variableCost.toFixed(2)}\n- Unit Contribution Margin: ${currency}${contributionMargin.toFixed(2)} (${contributionRatio.toFixed(1)}%)\n- Break-Even Units Target: ${breakEvenUnits.toLocaleString()} units\n- Break-Even Revenue Target: ${currency}${breakEvenRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Total Fixed Overhead Costs ({currency})
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">{currency}</span>
          <input
            type="number"
            min="0"
            step="any"
            value={fixedCosts || ''}
            onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>
        <span className="text-[10px] text-slate-400 mt-1 block">Rent, software, monthly salaries, insurance, hosting</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Selling Price / Unit ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={unitPrice || ''}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Variable Cost / Unit ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={variableCost || ''}
              onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Results Card */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline text-xs text-slate-400">
          <span>Unit Contribution Margin:</span>
          <span className="font-bold text-amber-400">
            {currency}{contributionMargin.toFixed(2)} ({contributionRatio.toFixed(1)}%)
          </span>
        </div>

        <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
          <div>
            <div className="text-xs font-bold text-slate-300">Break-Even Units:</div>
            <div className="text-[11px] text-slate-400">Minimum sales to cover costs</div>
          </div>
          <span className="font-extrabold text-amber-400 text-2xl tracking-tight">
            {breakEvenUnits.toLocaleString()} <span className="text-sm font-semibold text-slate-400">units</span>
          </span>
        </div>

        <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
          <span className="text-xs font-bold text-slate-300">Break-Even Revenue:</span>
          <span className="font-extrabold text-emerald-400 text-lg">
            {currency}{breakEvenRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Recommended Safety Buffer */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
        <span className="text-amber-900 font-medium">
          Target with 25% safety cushion:
        </span>
        <span className="font-bold text-amber-800">
          {safetyBufferUnits.toLocaleString()} units ({currency}{(safetyBufferUnits * unitPrice).toLocaleString()})
        </span>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setFixedCosts(2000);
            setUnitPrice(50);
            setVariableCost(20);
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
