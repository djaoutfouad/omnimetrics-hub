import React, { useEffect } from 'react';
import { ToolItem, CurrencySymbol } from '../../types';
import { X } from 'lucide-react';
import { PaymentFeesCalc } from '../calculators/PaymentFeesCalc';
import { ProfitMarginCalc } from '../calculators/ProfitMarginCalc';
import { BreakEvenCalc } from '../calculators/BreakEvenCalc';
import { RoasCalc } from '../calculators/RoasCalc';
import { ConversionRateCpaCalc } from '../calculators/ConversionRateCpaCalc';
import { LandedCostCalc } from '../calculators/LandedCostCalc';
import { FreelanceRateCalc } from '../calculators/FreelanceRateCalc';
import { LatePaymentInterestCalc } from '../calculators/LatePaymentInterestCalc';
import { CompoundInterestCalc } from '../calculators/CompoundInterestCalc';
import { LoanEmiCalc } from '../calculators/LoanEmiCalc';
import { CustomerLtvCalc } from '../calculators/CustomerLtvCalc';
import { SalaryTaxCalc } from '../calculators/SalaryTaxCalc';

interface Props {
  tool: ToolItem | null;
  currency: CurrencySymbol;
  onClose: () => void;
}

export const CalculatorModal: React.FC<Props> = ({ tool, currency, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (tool) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tool, onClose]);

  if (!tool) return null;

  const renderCalculator = () => {
    switch (tool.id) {
      case 'calc-fees':
        return <PaymentFeesCalc currency={currency} />;
      case 'calc-margin':
        return <ProfitMarginCalc currency={currency} />;
      case 'calc-breakeven':
        return <BreakEvenCalc currency={currency} />;
      case 'calc-roas':
        return <RoasCalc currency={currency} />;
      case 'calc-cr-cpa':
        return <ConversionRateCpaCalc currency={currency} />;
      case 'calc-landed-cost':
        return <LandedCostCalc currency={currency} />;
      case 'calc-freelance':
        return <FreelanceRateCalc currency={currency} />;
      case 'calc-late-interest':
        return <LatePaymentInterestCalc currency={currency} />;
      case 'calc-compound':
        return <CompoundInterestCalc currency={currency} />;
      case 'calc-loan-emi':
        return <LoanEmiCalc currency={currency} />;
      case 'calc-ltv':
        return <CustomerLtvCalc currency={currency} />;
      case 'calc-salary':
        return <SalaryTaxCalc currency={currency} />;
      default:
        return <div className="text-xs text-slate-500 py-4">Calculator in active development.</div>;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] font-extrabold tracking-wider uppercase ${tool.tagColor}`}>
              {tool.category}
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              Live Interactive
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {tool.name}
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Calculator Body */}
        {renderCalculator()}
      </div>
    </div>
  );
};
