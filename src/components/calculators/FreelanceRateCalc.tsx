import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const FreelanceRateCalc: React.FC<Props> = ({ currency }) => {
  const [takeHome, setTakeHome] = useState<number>(60000);
  const [taxesAndBenefits, setTaxesAndBenefits] = useState<number>(15000);
  const [expenses, setExpenses] = useState<number>(5000);
  const [billableHours, setBillableHours] = useState<number>(1000);
  const [copied, setCopied] = useState(false);

  const safeTakeHome = Math.max(0, takeHome || 0);
  const safeTaxes = Math.max(0, taxesAndBenefits || 0);
  const safeExpenses = Math.max(0, expenses || 0);
  const safeBillableHours = Math.max(1, billableHours || 1);

  const totalGrossRequired = safeTakeHome + safeTaxes + safeExpenses;
  const hourlyRate = totalGrossRequired / safeBillableHours;
  const dayRate = hourlyRate * 8;
  const weeklyRate = hourlyRate * (safeBillableHours / 48); // 48 active billable weeks (4 weeks vacation/buffer)
  const monthlyGross = totalGrossRequired / 12;

  const presets = [
    { label: 'Part-Time / Light (800 hrs)', hrs: 800 },
    { label: 'Standard Solo (1,000 hrs)', hrs: 1000 },
    { label: 'High Capacity (1,250 hrs)', hrs: 1250 },
  ];

  const handleCopy = () => {
    const text = `Freelance Rate Pricing Formula:\n- Target Take-Home: ${currency}${safeTakeHome.toLocaleString()}/yr\n- Taxes, Healthcare & Buffers: ${currency}${safeTaxes.toLocaleString()}/yr\n- Operating Expenses: ${currency}${safeExpenses.toLocaleString()}/yr\n- Total Gross Revenue Required: ${currency}${totalGrossRequired.toLocaleString()}/yr\n- Billable Capacity: ${safeBillableHours} hrs/yr\n- Minimum Hourly Rate: ${currency}${hourlyRate.toFixed(2)} / hr\n- Day Rate (8 hrs): ${currency}${dayRate.toFixed(2)} / day`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-slate-800">
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Desired Annual Take-Home Income ({currency})
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">{currency}</span>
          <input
            type="number"
            min="0"
            step="any"
            value={takeHome === 0 ? '' : takeHome}
            onChange={(e) => setTakeHome(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Taxes & Self-Employed Healthcare ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={taxesAndBenefits === 0 ? '' : taxesAndBenefits}
              onChange={(e) => setTaxesAndBenefits(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Software & Business Overhead ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={expenses === 0 ? '' : expenses}
              onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-slate-700">Annual Billable Hours Target</label>
          <span className="text-[11px] text-slate-500 font-semibold">{safeBillableHours} hrs/yr (~{(safeBillableHours / 48).toFixed(1)} hrs/week)</span>
        </div>
        <input
          type="number"
          min="100"
          max="2500"
          step="50"
          value={billableHours === 0 ? '' : billableHours}
          onChange={(e) => setBillableHours(parseFloat(e.target.value) || 0)}
          placeholder="1000"
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-1.5"
        />
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.hrs}
              type="button"
              onClick={() => setBillableHours(p.hrs)}
              className={`text-[10px] py-1 px-2 rounded-lg border font-medium transition cursor-pointer ${
                billableHours === p.hrs
                  ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Rates Output */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline text-xs text-slate-400">
          <span>Gross Target Revenue:</span>
          <span className="font-bold text-indigo-300">
            {currency}{totalGrossRequired.toLocaleString()} / year ({currency}{monthlyGross.toFixed(0)}/mo)
          </span>
        </div>

        <div className="flex justify-between items-baseline border-t border-slate-800 pt-2.5">
          <div>
            <div className="text-xs font-bold text-slate-300">Minimum Hourly Rate:</div>
            <div className="text-[11px] text-slate-400">Base quote pricing baseline</div>
          </div>
          <span className="font-black text-indigo-400 text-2xl tracking-tight">
            {currency}{hourlyRate.toFixed(2)} <span className="text-sm font-semibold text-slate-400">/ hr</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Standard Day Rate (8h):</span>
            <span className="font-bold text-emerald-400 text-sm">{currency}{dayRate.toFixed(2)} / day</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Weekly Billable Pace:</span>
            <span className="font-bold text-blue-400 text-sm">{currency}{weeklyRate.toFixed(2)} / wk</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setTakeHome(60000);
            setTaxesAndBenefits(15000);
            setExpenses(5000);
            setBillableHours(1000);
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
