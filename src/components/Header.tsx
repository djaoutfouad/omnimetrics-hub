import React from 'react';
import { Link } from 'react-router-dom';
import { CurrencySymbol } from '../types';
import { Search, CheckCircle, ArrowUpRight } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
  onCurrencyChange: (c: CurrencySymbol) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onReset: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<Props> = ({
  currency,
  onCurrencyChange,
  searchQuery,
  onSearchChange,
  onReset,
  onOpenContact,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* LOGO */}
        <div
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          onClick={onReset}
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 flex items-center justify-center text-white font-extrabold text-xl shadow-sm transition">
            Σ
          </div>
          <div>
            <div className="font-extrabold text-[15px] text-slate-900 tracking-tight leading-none flex items-center gap-1">
              OmniMetrics <span className="text-emerald-600">Hub</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Finance & Decision Tools</div>
          </div>
        </div>

        {/* 2026 BADGE */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 shrink-0">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          Updated for 2026 Financial & Business Models
        </div>

        {/* PRIMARY NAV LINKS */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600 shrink-0">
          <Link
            to="/calculators"
            className="px-2.5 py-1.5 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition"
          >
            Calculators
          </Link>
          <Link
            to="/blog"
            className="px-2.5 py-1.5 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition"
          >
            Guides & Blog
          </Link>
          <Link
            to="/methodology"
            className="px-2.5 py-1.5 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition hidden lg:inline"
          >
            Methodology
          </Link>
        </nav>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-xs mx-1 sm:mx-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              id="header-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search calculators (e.g. fees, margin, roas, loan)..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100/90 text-xs rounded-full border-0 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 font-medium transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* CURRENCY & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs font-semibold text-slate-700 shrink-0">
          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as CurrencySymbol)}
            className="bg-slate-100 hover:bg-slate-200/90 rounded-xl py-1.5 px-2.5 border border-slate-200/60 cursor-pointer outline-none font-bold text-slate-800 text-xs transition"
            title="Select Currency"
          >
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
            <option value="£">£ GBP</option>
            <option value="C$">C$ CAD</option>
            <option value="A$">A$ AUD</option>
            <option value="¥">¥ JPY</option>
            <option value="₹">₹ INR</option>
          </select>

          {/* Contact Button */}
          <button
            type="button"
            onClick={onOpenContact}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 sm:px-4 py-1.5 rounded-full transition shadow-xs flex items-center gap-1"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
};
