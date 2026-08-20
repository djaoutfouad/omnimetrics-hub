import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToolItem, CurrencySymbol } from '../../types';
import { X, ExternalLink } from 'lucide-react';
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
import { CalculatorDisclaimer, DisclaimerDomain } from '../CalculatorDisclaimer';

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

  const getDisclaimerDomain = (toolId: string): DisclaimerDomain => {
    switch (toolId) {
      case 'calc-fees': return 'payment-fees';
      case 'calc-margin': return 'margin';
      case 'calc-breakeven': return 'breakeven';
      case 'calc-roas': return 'roas';
      case 'calc-cr-cpa': return 'cr-cpa';
      case 'calc-landed-cost': return 'landed-cost';
      case 'calc-freelance': return 'freelance';
      case 'calc-late-interest': return 'late-interest';
      case 'calc-compound': return 'compound';
      case 'calc-loan-emi': return 'loan-emi';
      case 'calc-ltv': return 'ltv';
      case 'calc-salary': return 'salary';
      default: return 'general';
    }
  };

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
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
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

        {/* Modal Footer with Guide Link & Disclaimer */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          <Link
            to={`/tools/${tool.slug}`}
            onClick={onClose}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition group"
          >
            <span className="flex items-center gap-1.5">
              <span>View Full Educational Guide & Formula Proofs</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition" />
          </Link>

          <CalculatorDisclaimer domain={getDisclaimerDomain(tool.id)} />
        </div>
      </div>
    </div>
  );
};
