import React from 'react';
import { ARTICLES_DATA } from '../data/articles';
import { ArticleItem, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

interface Props {
  onSelectArticle: (article: ArticleItem) => void;
  language: LanguageCode;
}

export const KnowledgeSection: React.FC<Props> = ({ onSelectArticle, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="blog-section" className="mb-14 pt-10 border-t border-slate-200">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-extrabold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          KNOWLEDGE BASE
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
          {t.knowledgeBaseTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
          {t.knowledgeBaseSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES_DATA.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="cursor-pointer bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${article.tagColorClass}`}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="font-extrabold text-[15px] text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-2">
                {article.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                {article.snippet}
              </p>
            </div>

            <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 mt-5 flex items-center gap-1 transition">
              <span>{t.readGuide}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
