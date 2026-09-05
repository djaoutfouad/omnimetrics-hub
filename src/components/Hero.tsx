import React from 'react';
import { CategoryType } from '../types';

interface Props {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
}

const CATEGORIES: { label: string; value: CategoryType }[] = [
  { label: 'ALL TOOLS', value: 'ALL' },
  { label: 'E-COMMERCE', value: 'E-COMMERCE' },
  { label: 'FINANCE & MARGINS', value: 'FINANCE & MARGINS' },
  { label: 'MARKETING & ADS', value: 'MARKETING & ADS' },
  { label: 'FREELANCE', value: 'FREELANCE' },
  { label: 'INVESTING', value: 'INVESTING' },
  { label: 'PAYROLL', value: 'PAYROLL' },
];

export const Hero: React.FC<Props> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <section className="relative rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl p-8 sm:p-12 md:p-14 text-center max-w-5xl mx-auto mb-8">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=2000&q=80"
        alt="Fintech data analytics and financial workspace"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        loading="eager"
        referrerPolicy="no-referrer"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-slate-950" />

      {/* Atmospheric lighting accents */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
          Instant clarity for every{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
            financial decision
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed mb-8">
          12 real-time calculators for freelancers, founders, and digital marketers — no spreadsheets or signups required.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition shadow-xs whitespace-nowrap cursor-pointer backdrop-blur-md ${
                  isActive
                    ? 'bg-emerald-500 text-white border border-emerald-400 shadow-md shadow-emerald-950/50'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
