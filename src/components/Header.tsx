import React, { useState, useRef, useEffect } from 'react';
import { CurrencySymbol, LanguageCode } from '../types';
import { TRANSLATIONS, LANGUAGE_OPTIONS } from '../data/translations';
import { Search, CheckCircle, ArrowUpRight, ChevronDown, Check } from 'lucide-react';

interface Props {
  currency: CurrencySymbol;
  onCurrencyChange: (c: CurrencySymbol) => void;
  language: LanguageCode;
  onLanguageChange: (l: LanguageCode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onReset: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<Props> = ({
  currency,
  onCurrencyChange,
  language,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  onReset,
  onOpenContact,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.US;

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              {t.appName}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">{t.appSubtitle}</div>
          </div>
        </div>

        {/* 2026 BADGE */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 shrink-0">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          {t.badge2026}
        </div>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-xs mx-1 sm:mx-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              id="header-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100/90 text-xs rounded-full border-0 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 font-medium transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* LANGUAGE, CURRENCY & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs font-semibold text-slate-700 shrink-0">
          {/* Custom Floating Language Dropdown Card */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/90 px-3 py-1.5 rounded-xl text-slate-800 text-xs font-bold transition shadow-2xs border border-slate-200/60"
            >
              <span className="text-[13px]">{currentOption.flag}</span>
              <span className="font-extrabold text-[11px] text-slate-500">{currentOption.countryCode}</span>
              <span className="hidden sm:inline font-bold">{currentOption.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Select Language
                </div>
                <div className="max-h-64 overflow-y-auto space-y-0.5 px-1">
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const isSelected = language === opt.code;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => {
                          onLanguageChange(opt.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{opt.flag}</span>
                          <span className="font-extrabold text-[10px] text-slate-400 px-1 py-0.5 bg-slate-100 rounded">
                            {opt.countryCode}
                          </span>
                          <span className="text-slate-800">{opt.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
            <span>{t.contactBtn}</span>
            <ArrowUpRight className="w-3 h-3 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
};
