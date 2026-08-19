import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const PaymentFeesCalc: React.FC<Props> = ({ currency }) => {
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(100);
  const [targetNet, setTargetNet] = useState<number>(100);
  const [feePercent, setFeePercent] = useState<number>(2.9);
  const [fixedFee, setFixedFee] = useState<number>(0.30);
  const [copied, setCopied] = useState(false);

  const presets = [
    { name: 'Stripe Standard', pct: 2.9, fix: 0.30 },
    { name: 'PayPal Checkout', pct: 3.49, fix: 0.49 },
    { name: 'Square POS', pct: 2.6, fix: 0.10 },
    { name: 'Stripe Invoicing', pct: 3.4, fix: 0.30 },
  ];

  // Forward calculations
  const forwardCut = (amount * (feePercent / 100)) + fixedFee;
  const forwardNet = Math.max(0, amount - forwardCut);
  const forwardEffectiveFeePercent = amount > 0 ? (forwardCut / amount) * 100 : 0;

  // Reverse calculations: Invoice = (Target + Fixed) / (1 - (pct/100))
  const rateFraction = feePercent / 100;
  const reverseInvoice = rateFraction < 1 ? (targetNet + fixedFee) / (1 - rateFraction) : 0;
  const reverseCut = reverseInvoice - targetNet;

  const handleCopy = () => {
    let text = '';
    if (mode === 'forward') {
      text = `Payment Fee Calculation:\n- Invoice Amount: ${currency}${amount.toFixed(2)}\n- Processing Fee (${feePercent}% + ${currency}${fixedFee.toFixed(2)}): ${currency}${forwardCut.toFixed(2)}\n- Net Payout: ${currency}${forwardNet.toFixed(2)} (${(100 - forwardEffectiveFeePercent).toFixed(1)}% of total)`;
    } else {
      text = `Reverse Gross-Up Fee Calculation:\n- Target Net Payout: ${currency}${targetNet.toFixed(2)}\n- Processing Rate: ${feePercent}% + ${currency}${fixedFee.toFixed(2)}\n- Required Invoice Amount: ${currency}${reverseInvoice.toFixed(2)}\n- Total Fee Deducted: ${currency}${reverseCut.toFixed(2)}`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
      {/* Mode toggle */}
      <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setMode('forward')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            mode === 'forward' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Forward (Invoice → Net)
        </button>
        <button
          type="button"
          onClick={() => setMode('reverse')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            mode === 'reverse' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Reverse (Target Net → Invoice)
        </button>
      </div>

      {/* Preset pills */}
      <div>
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          Quick Preset Rates
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {presets.map((p) => {
            const isSelected = feePercent === p.pct && fixedFee === p.fix;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setFeePercent(p.pct);
                  setFixedFee(p.fix);
                }}
                className={`text-[11px] py-1 px-2 rounded-lg font-medium border text-left transition ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="truncate">{p.name}</div>
                <div className="text-[10px] text-slate-400">
                  {p.pct}% + {currency}{p.fix.toFixed(2)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3.5">
        {mode === 'forward' ? (
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Invoice Amount ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">{currency}</span>
              <input
                type="number"
                min="0"
                step="any"
                value={amount || ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Desired Take-Home Net Payout ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">{currency}</span>
              <input
                type="number"
                min="0"
                step="any"
                value={targetNet || ''}
                onChange={(e) => setTargetNet(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Percentage Fee (%)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={feePercent}
              onChange={(e) => setFeePercent(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Fixed Fee ({currency})</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={fixedFee}
                onChange={(e) => setFixedFee(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Box */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        {mode === 'forward' ? (
          <>
            <div className="flex justify-between items-baseline text-xs text-slate-400">
              <span>Processor Fee Cut:</span>
              <span className="font-bold text-rose-400 text-sm">
                -{currency}{forwardCut.toFixed(2)} ({forwardEffectiveFeePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
              <span className="text-xs font-bold text-slate-300">Net Settled Payout:</span>
              <span className="font-extrabold text-emerald-400 text-xl tracking-tight">
                {currency}{forwardNet.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-baseline text-xs text-slate-400">
              <span>Processor Fee Deduction:</span>
              <span className="font-bold text-rose-400 text-sm">
                -{currency}{reverseCut.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
              <span className="text-xs font-bold text-slate-300">Charge Client (Invoice):</span>
              <span className="font-extrabold text-emerald-400 text-xl tracking-tight">
                {currency}{reverseInvoice.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setAmount(100);
            setTargetNet(100);
            setFeePercent(2.9);
            setFixedFee(0.30);
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
          {copied ? 'Copied to Clipboard!' : 'Copy Summary'}
        </button>
      </div>
    </div>
  );
};
