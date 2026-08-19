import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, Package } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const LandedCostCalc: React.FC<Props> = ({ currency }) => {
  const [unitCost, setUnitCost] = useState<number>(12.0);
  const [freightPerUnit, setFreightPerUnit] = useState<number>(3.5);
  const [tariffPercent, setTariffPercent] = useState<number>(5.0);
  const [packagingPerUnit, setPackagingPerUnit] = useState<number>(1.5);
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9);
  const [paymentFeeFixed, setPaymentFeeFixed] = useState<number>(0.3);
  const [targetMargin, setTargetMargin] = useState<number>(50.0);
  const [copied, setCopied] = useState(false);

  // Calculations
  const tariffCost = unitCost * (tariffPercent / 100);
  const totalLandedCost = unitCost + freightPerUnit + tariffCost + packagingPerUnit;

  const feeRate = paymentFeePercent / 100;
  const marginRate = targetMargin / 100;

  // Selling Price P such that P - Fee(P) - LandedCost = P * MarginRate
  // P - (P * FeeRate + FixedFee) - LandedCost = P * MarginRate
  // P * (1 - FeeRate - MarginRate) = LandedCost + FixedFee
  // P = (LandedCost + FixedFee) / (1 - FeeRate - MarginRate)
  const denominator = 1 - feeRate - marginRate;
  const recommendedPrice = denominator > 0 ? (totalLandedCost + paymentFeeFixed) / denominator : 0;

  const paymentFeeTotal = (recommendedPrice * feeRate) + paymentFeeFixed;
  const netProfitPerUnit = recommendedPrice - totalLandedCost - paymentFeeTotal;
  const markupPercent = totalLandedCost > 0 ? ((recommendedPrice - totalLandedCost) / totalLandedCost) * 100 : 0;

  // Break-even price (margin = 0%)
  const breakEvenDenominator = 1 - feeRate;
  const breakEvenPrice = breakEvenDenominator > 0 ? (totalLandedCost + paymentFeeFixed) / breakEvenDenominator : 0;

  const handleCopy = () => {
    const text = `E-Commerce Landed Cost & Pricing Summary:\n- Manufacturing Cost: ${currency}${unitCost.toFixed(2)}\n- Freight/Unit: ${currency}${freightPerUnit.toFixed(2)} | Tariff (${tariffPercent}%): ${currency}${tariffCost.toFixed(2)} | Packaging: ${currency}${packagingPerUnit.toFixed(2)}\n- Total Landed Cost per Unit: ${currency}${totalLandedCost.toFixed(2)}\n- Recommended Retail Price (${targetMargin}% Margin): ${currency}${recommendedPrice.toFixed(2)}\n- Payment Processor Fee: ${currency}${paymentFeeTotal.toFixed(2)}\n- Net Profit per Unit: ${currency}${netProfitPerUnit.toFixed(2)} (Markup: ${markupPercent.toFixed(1)}%)\n- Minimum Break-Even Price: ${currency}${breakEvenPrice.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-slate-800">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Manufacturing / FOB Cost ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={unitCost || ''}
              onChange={(e) => setUnitCost(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Freight & Shipping / Unit ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={freightPerUnit || ''}
              onChange={(e) => setFreightPerUnit(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Customs Duty / Tariff (%)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={tariffPercent || ''}
            onChange={(e) => setTariffPercent(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Packaging & Inspection ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={packagingPerUnit || ''}
              onChange={(e) => setPackagingPerUnit(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Desired Profit Margin (%)
          </label>
          <input
            type="number"
            min="1"
            max="95"
            step="1"
            value={targetMargin || ''}
            onChange={(e) => setTargetMargin(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Payment Processor Rate
          </label>
          <div className="flex gap-1.5">
            <input
              type="number"
              step="0.1"
              value={paymentFeePercent || ''}
              onChange={(e) => setPaymentFeePercent(parseFloat(e.target.value) || 0)}
              className="w-1/2 px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none text-xs"
              placeholder="2.9%"
            />
            <input
              type="number"
              step="0.05"
              value={paymentFeeFixed || ''}
              onChange={(e) => setPaymentFeeFixed(parseFloat(e.target.value) || 0)}
              className="w-1/2 px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none text-xs"
              placeholder="+ $0.30"
            />
          </div>
        </div>
      </div>

      {/* Main Scorecard */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-emerald-400" /> Recommended Retail Price:
            </div>
            <div className="text-[11px] text-slate-400">Yields exact {targetMargin}% margin after fees</div>
          </div>
          <span className="font-black text-emerald-400 text-2xl tracking-tight">
            {currency}{recommendedPrice.toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Total Landed Cost / Unit:</span>
            <span className="font-bold text-white text-sm">{currency}{totalLandedCost.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Net Profit / Unit:</span>
            <span className="font-bold text-emerald-400 text-sm">{currency}{netProfitPerUnit.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Break-Even Floor Price:</span>
            <span className="font-bold text-amber-300 text-sm">{currency}{breakEvenPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Required Markup:</span>
            <span className="font-bold text-blue-300 text-sm">{markupPercent.toFixed(1)}% on cost</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setUnitCost(12.0);
            setFreightPerUnit(3.5);
            setTariffPercent(5.0);
            setPackagingPerUnit(1.5);
            setPaymentFeePercent(2.9);
            setPaymentFeeFixed(0.3);
            setTargetMargin(50.0);
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
