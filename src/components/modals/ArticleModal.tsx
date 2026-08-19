import React, { useEffect, useState } from 'react';
import { ArticleItem } from '../../types';
import { X, Clock, ChevronRight, Copy, Check, BookOpen } from 'lucide-react';

interface Props {
  article: ArticleItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<Props> = ({ article, onClose }) => {
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const copyFormulaText = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[88vh] overflow-y-auto shadow-2xl relative border border-slate-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition shadow-2xs"
          aria-label="Close guide"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category & Read Time */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${article.tagColorClass}`}>
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-5 pr-8 tracking-tight">
          {article.title}
        </h2>

        {/* Structured Sections */}
        <div className="space-y-6 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2.5">
              {sec.heading && (
                <h3 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-1">
                  {sec.heading}
                </h3>
              )}
              <p className="whitespace-pre-line text-slate-700">{sec.content}</p>

              {/* Table rendering if present */}
              {sec.table && (
                <div className="my-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50 shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-bold text-[11px]">
                        {sec.table.headers.map((h, hidx) => (
                          <th key={hidx} className="p-3 border-b border-slate-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {sec.table.rows.map((row, ridx) => (
                        <tr key={ridx} className="hover:bg-white transition-colors">
                          {row.map((cell, cidx) => (
                            <td
                              key={cidx}
                              className={`p-3 text-slate-800 ${
                                cidx === 0 ? 'font-bold text-slate-900 bg-slate-100/50' : ''
                              } ${cidx === row.length - 1 ? 'font-semibold text-emerald-700' : ''}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Copyable Formula Box */}
              {sec.formula && (
                <div className="relative p-4 bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm rounded-2xl shadow-inner my-3 border border-slate-800 flex justify-between items-center group">
                  <span className="whitespace-pre-line pr-6 leading-relaxed font-semibold">{sec.formula}</span>
                  <button
                    type="button"
                    onClick={() => copyFormulaText(sec.formula!)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0"
                    title="Copy formula"
                  >
                    {copiedFormula === sec.formula ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}

              {/* Bullet Points */}
              {sec.bulletPoints && (
                <ul className="space-y-1.5 pl-1 my-2">
                  {sec.bulletPoints.map((bp, bidx) => (
                    <li key={bidx} className="flex items-start gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <BookOpen className="w-3.5 h-3.5" /> OmniMetrics Knowledge Base • 2026 Edition
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
