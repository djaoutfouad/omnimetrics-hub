import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const RoasCalc: React.FC<Props> = ({ currency }) => {
  const [adSpend, setAdSpend] = useState<number>(1000);
  const [revenue, setRevenue] = useState<number>(3500);
  const [conversions, setConversions] = useState<number>(50);
  const [cogs, setCogs] = useState<number>(1000);
  const [copied, setCopied] = useState(false);

  const safeAdSpend = Math.max(0, adSpend || 0);
  const safeRevenue = Math.max(0, revenue || 0);
  const safeConversions = Math.max(0, conversions || 0);
  const safeCogs = Math.max(0, cogs || 0);

  const roasMultiplier = safeAdSpend > 0 ? safeRevenue / safeAdSpend : 0;
  const roasPercent = roasMultiplier * 100;
  const netAdProfit = safeRevenue - safeAdSpend;
  const cpa = safeConversions > 0 ? safeAdSpend / safeConversions : 0;
  const netTrueProfit = safeRevenue - safeAdSpend - safeCogs;
  const totalCostBasis = safeAdSpend + safeCogs;
  const trueRoi = totalCostBasis > 0 ? (netTrueProfit / totalCostBasis) * 100 : 0;

  const handleCopy = () => {
    const text = `ROAS & Ad Spend Summary:\n- Total Ad Spend: ${currency}${safeAdSpend.toLocaleString()}\n- Revenue Generated: ${currency}${safeRevenue.toLocaleString()}\n- ROAS: ${roasMultiplier.toFixed(2)}x (${roasPercent.toFixed(0)}%)\n- Net Ad Profit: ${currency}${netAdProfit.toFixed(2)}\n- Cost Per Acquisition (CPA): ${currency}${cpa.toFixed(2)} (${safeConversions} conversions)\n- True Net Profit (after COGS): ${currency}${netTrueProfit.toFixed(2)} (ROI: ${trueRoi.toFixed(1)}%)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
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
              value={adSpend === 0 ? '' : adSpend}
              onChange={(e) => setAdSpend(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Attributed Revenue ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={revenue === 0 ? '' : revenue}
              onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Total Conversions / Orders</label>
          <input
            type="number"
            min="0"
            step="1"
            value={conversions === 0 ? '' : conversions}
            onChange={(e) => setConversions(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Product COGS / Fulfillment ({currency})</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={cogs === 0 ? '' : cogs}
              onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main ROAS Score Card */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300">ROAS Multiplier:</div>
            <div className="text-[11px] text-slate-400">Attributed return per {currency}1.00 spent</div>
          </div>
          <span className="font-black text-rose-400 text-2xl tracking-tight">
            {roasMultiplier.toFixed(2)}x <span className="text-sm font-semibold text-slate-400">({roasPercent.toFixed(0)}%)</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Net Ad Profit:</span>
            <span className={`font-bold ${netAdProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'} text-sm`}>
              {currency}{netAdProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Cost Per Acquisition (CPA):</span>
            <span className="font-bold text-blue-400 text-sm">{currency}{cpa.toFixed(2)}</span>
          </div>
        </div>

        {safeCogs > 0 && (
          <div className="border-t border-slate-800 pt-2.5 flex justify-between items-baseline text-xs">
            <span className="text-slate-300">True Net Profit (After COGS):</span>
            <span className={`font-bold ${netTrueProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {currency}{netTrueProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({trueRoi.toFixed(1)}% ROI)
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setAdSpend(1000);
            setRevenue(3500);
            setConversions(50);
            setCogs(1000);
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
