import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const BreakEvenCalc: React.FC<Props> = ({ currency }) => {
  const [fixedCosts, setFixedCosts] = useState<number>(2000);
  const [unitPrice, setUnitPrice] = useState<number>(50);
  const [variableCost, setVariableCost] = useState<number>(20);
  const [copied, setCopied] = useState(false);

  const safeFixedCosts = Number.isFinite(fixedCosts) ? Math.max(0, fixedCosts) : 0;
  const safeUnitPrice = Number.isFinite(unitPrice) ? Math.max(0, unitPrice) : 0;
  const safeVariableCost = Number.isFinite(variableCost) ? Math.max(0, variableCost) : 0;

  const contributionMargin = safeUnitPrice - safeVariableCost;
  const isViable = contributionMargin > 0;
  const contributionRatio = safeUnitPrice > 0 && Number.isFinite((contributionMargin / safeUnitPrice) * 100) ? (contributionMargin / safeUnitPrice) * 100 : 0;
  const breakEvenUnits = isViable && Number.isFinite(safeFixedCosts / contributionMargin) ? Math.ceil(safeFixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = Number.isFinite(breakEvenUnits * safeUnitPrice) ? breakEvenUnits * safeUnitPrice : 0;
  const safetyBufferUnits = Number.isFinite(breakEvenUnits * 1.25) ? Math.ceil(breakEvenUnits * 1.25) : 0; // 25% safety margin

  const handleCopy = () => {
    const text = `Break-Even Analysis:\n- Fixed Costs: ${currency}${safeFixedCosts.toLocaleString()}\n- Unit Selling Price: ${currency}${safeUnitPrice.toFixed(2)}\n- Variable Cost / Unit: ${currency}${safeVariableCost.toFixed(2)}\n- Unit Contribution Margin: ${currency}${contributionMargin.toFixed(2)} (${contributionRatio.toFixed(1)}%)\n- Break-Even Units Target: ${breakEvenUnits.toLocaleString()} units\n- Break-Even Revenue Target: ${currency}${breakEvenRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
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
            value={fixedCosts === 0 ? '' : fixedCosts}
            onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>
        <span className="text-[10px] text-slate-400 mt-1 block">Rent, software subscriptions, base salaries, insurance, hosting</span>
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
              value={unitPrice === 0 ? '' : unitPrice}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
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
              value={variableCost === 0 ? '' : variableCost}
              onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Results Card */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline text-xs text-slate-400">
          <span>Unit Contribution Margin:</span>
          <span className={`font-bold ${isViable ? 'text-amber-400' : 'text-rose-400'}`}>
            {currency}{contributionMargin.toFixed(2)} ({contributionRatio.toFixed(1)}%)
          </span>
        </div>

        {isViable ? (
          <>
            <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
              <div>
                <div className="text-xs font-bold text-slate-300">Break-Even Units:</div>
                <div className="text-[11px] text-slate-400">Minimum sales volume to cover total costs</div>
              </div>
              <span className="font-extrabold text-amber-400 text-2xl tracking-tight">
                {breakEvenUnits.toLocaleString()} <span className="text-sm font-semibold text-slate-400">units</span>
              </span>
            </div>

            <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
              <span className="text-xs font-bold text-slate-300">Break-Even Sales Revenue:</span>
              <span className="font-extrabold text-emerald-400 text-lg">
                {currency}{breakEvenRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </>
        ) : (
          <div className="border-t border-slate-800 pt-2.5 flex items-start gap-2 text-rose-400 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Unit selling price ({currency}{safeUnitPrice.toFixed(2)}) must exceed variable costs ({currency}{safeVariableCost.toFixed(2)}) to achieve break-even. Each sale currently generates a loss of {currency}{Math.abs(contributionMargin).toFixed(2)}.
            </span>
          </div>
        )}
      </div>

      {/* Recommended Safety Buffer */}
      {isViable && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
          <span className="text-amber-900 font-medium">
            Target with 25% safety cushion:
          </span>
          <span className="font-bold text-amber-800">
            {safetyBufferUnits.toLocaleString()} units ({currency}{(safetyBufferUnits * safeUnitPrice).toLocaleString()})
          </span>
        </div>
      )}

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
          className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Summary'}
        </button>
      </div>
    </div>
  );
};
