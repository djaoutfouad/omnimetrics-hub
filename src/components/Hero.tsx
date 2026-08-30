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
    <section className="text-center max-w-3xl mx-auto mb-8 pt-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-3">
        Instant clarity for every{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
          financial decision
        </span>
      </h1>
      <p className="text-slate-500 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed mb-8">
        12 real-time calculators for freelancers, founders, and digital marketers — no spreadsheets or signups required.
      </p>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition shadow-2xs whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100/80 text-slate-600 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
