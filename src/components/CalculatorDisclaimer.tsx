import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

export type DisclaimerDomain =
  | 'payment-fees'
  | 'margin'
  | 'breakeven'
  | 'roas'
  | 'cr-cpa'
  | 'landed-cost'
  | 'freelance'
  | 'late-interest'
  | 'compound'
  | 'loan-emi'
  | 'ltv'
  | 'salary'
  | 'general';

interface Props {
  domain: DisclaimerDomain;
  className?: string;
}

export const CalculatorDisclaimer: React.FC<Props> = ({ domain, className = '' }) => {
  const getDisclaimerText = (): { title: string; body: string } => {
    switch (domain) {
      case 'payment-fees':
        return {
          title: 'Payment Gateway Fee Estimate',
          body: 'Actual merchant fees depend on your specific processor contract, domestic vs. international card origin, American Express assessment surcharges, chargeback reserves, and currency conversion margins. Verify current fee schedules with your merchant service provider.',
        };
      case 'margin':
        return {
          title: 'Pricing & Margin Estimate',
          body: 'Gross margin calculations do not account for unallocated operational overhead, payment processing fees, product return allowances, or variable sales tax/VAT. Results should be evaluated alongside your complete income statement.',
        };
      case 'breakeven':
        return {
          title: 'Break-Even Analysis Estimate',
          body: 'This model assumes linear variable costs and static selling prices. In practice, tiered supplier volume discounts, seasonal demand fluctuations, and semi-variable overhead can shift your operational break-even point.',
        };
      case 'roas':
        return {
          title: 'Advertising Performance Estimate',
          body: 'Attributed ad revenue and platform-reported ROAS are subject to tracking attribution windows, privacy constraints, and cross-channel overlap. Ensure you track blended store-wide Marketing Efficiency Ratios (MER).',
        };
      case 'cr-cpa':
        return {
          title: 'Conversion Funnel Estimate',
          body: 'Traffic conversion rates and Cost Per Acquisition vary by traffic source quality, device type, geographic location, and seasonal intent. Historical results do not guarantee future ad performance.',
        };
      case 'landed-cost':
        return {
          title: 'Landed Cost & Tariff Estimate',
          body: 'Customs duties and import tariffs depend on the precise Harmonized System (HS / HTS) tariff classification code, origin country, port drayage fees, and customs broker charges. Verify classifications with a licensed customs broker.',
        };
      case 'freelance':
        return {
          title: 'Freelance Rate Planning Estimate',
          body: 'This calculation is for professional planning purposes. Actual earnings depend on client acquisition velocity, market demand for your specialty, contract negotiation terms, and local self-employment tax liabilities.',
        };
      case 'late-interest':
        return {
          title: 'Statutory & Contractual Interest Notice',
          body: 'Late payment interest rights and statutory debt recovery fees vary by jurisdiction (e.g. UK/EU Late Payment acts vs. US state usury laws) and signed contract terms. Consult qualified legal counsel before initiating formal debt collection.',
        };
      case 'compound':
        return {
          title: 'Investment Growth Projection',
          body: 'Projections assume constant annual returns and uninterrupted monthly contributions. Real market investments fluctuate with market volatility, inflation, expense ratios, and capital gain taxes. Past performance does not guarantee future results.',
        };
      case 'loan-emi':
        return {
          title: 'Loan Amortization Estimate',
          body: 'Actual monthly EMI payments and total borrowing costs may differ based on lender origination fees, processing charges, insurance requirements, compounding conventions, and variable interest rate adjustments.',
        };
      case 'ltv':
        return {
          title: 'Customer Lifetime Value (LTV) Notice',
          body: 'LTV models rely on estimated average customer retention lifespans and historical purchase frequency. Cohort churn rates and market shifts can alter real-world customer lifetime value over multi-year horizons.',
        };
      case 'salary':
        return {
          title: 'Payroll & Tax Estimation Notice',
          body: 'This tool provides general take-home salary estimates. Actual net pay depends on your specific filing status, state/local income taxes, standard/itemized deductions, W-4 elections, and employer benefit plan contributions. It is not an official tax filing calculation.',
        };
      case 'general':
      default:
        return {
          title: 'Financial & Calculation Notice',
          body: 'This calculator is provided for informational and educational planning purposes only. Results are mathematical estimates and do not constitute certified financial, tax, accounting, or legal advice.',
        };
    }
  };

  const { title, body } = getDisclaimerText();

  return (
    <div
      role="note"
      aria-label="Calculator Disclaimer"
      className={`p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-slate-600 text-xs leading-relaxed space-y-1 ${className}`}
    >
      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px] uppercase tracking-wider">
        <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span>{title}</span>
      </div>
      <p className="text-[11px] text-slate-500 leading-normal pl-5">
        {body}
      </p>
    </div>
  );
};
