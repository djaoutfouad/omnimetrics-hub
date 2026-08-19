import React, { useState } from 'react';
import { CurrencySymbol } from '../../types';
import { Copy, Check, RefreshCw, Landmark } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
}

export const LoanEmiCalc: React.FC<Props> = ({ currency }) => {
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [copied, setCopied] = useState(false);

  // Math
  const totalMonths = tenureYears * 12;
  const monthlyRate = interestRate > 0 ? (interestRate / 100) / 12 : 0;

  let monthlyEmi = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyEmi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else if (totalMonths > 0) {
    monthlyEmi = loanAmount / totalMonths;
  }

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 100;
  const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  const handleCopy = () => {
    const text = `Loan & Monthly EMI Amortization Summary:\n- Principal Loan Amount: ${currency}${loanAmount.toLocaleString()}\n- Interest Rate: ${interestRate}% p.a.\n- Loan Tenure: ${tenureYears} Years (${totalMonths} monthly payments)\n- Monthly EMI: ${currency}${monthlyEmi.toFixed(2)}/mo\n- Total Interest Payable: ${currency}${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${interestPercent.toFixed(1)}% of total)\n- Total Repayment Amount: ${currency}${totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-slate-800">
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Loan Principal Amount ({currency})
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">{currency}</span>
          <input
            type="number"
            min="500"
            step="1000"
            value={loanAmount || ''}
            onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
            className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            min="0.1"
            max="35"
            step="0.1"
            value={interestRate || ''}
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Loan Tenure (Years)
          </label>
          <input
            type="number"
            min="1"
            max="35"
            value={tenureYears || ''}
            onChange={(e) => setTenureYears(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>
      </div>

      {/* Main Scorecard */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5 text-teal-400" /> Monthly Payment (EMI):
            </div>
            <div className="text-[11px] text-slate-400">Fixed monthly installment for {totalMonths} months</div>
          </div>
          <span className="font-black text-teal-400 text-2xl tracking-tight">
            {currency}{monthlyEmi.toFixed(2)}<span className="text-xs font-normal text-slate-400">/mo</span>
          </span>
        </div>

        {/* Visual Share Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Principal: <strong className="text-white">{principalPercent.toFixed(0)}%</strong></span>
            <span>Total Interest: <strong className="text-amber-300">{interestPercent.toFixed(0)}%</strong></span>
          </div>
          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div
              className="bg-teal-500 h-full transition-all duration-300"
              style={{ width: `${principalPercent}%` }}
              title={`Principal: ${principalPercent.toFixed(1)}%`}
            />
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${interestPercent}%` }}
              title={`Interest: ${interestPercent.toFixed(1)}%`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2.5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Total Interest Cost:</span>
            <span className="font-bold text-amber-300 text-sm">{currency}{totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Total Repayment (P + I):</span>
            <span className="font-bold text-white text-sm">{currency}{totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setLoanAmount(50000);
            setInterestRate(6.5);
            setTenureYears(5);
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
