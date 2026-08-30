import React, { useState } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="mb-14 pt-10 border-t border-slate-200 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[11px] font-extrabold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 inline-flex items-center gap-1.5 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          HELP & FORMULAS
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Clear answers regarding calculation accuracy, client-side data security, and formulas.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-slate-700 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4.5 pb-4.5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
