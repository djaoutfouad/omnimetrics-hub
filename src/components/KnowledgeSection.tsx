import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles';
import { ArticleItem } from '../types';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

interface Props {
  onSelectArticle: (article: ArticleItem) => void;
}

export const KnowledgeSection: React.FC<Props> = ({ onSelectArticle }) => {
  return (
    <section id="blog-section" className="mb-14 pt-10 border-t border-slate-200">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-extrabold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          KNOWLEDGE BASE
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
          Financial Guides & Merchant Insights
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
          Actionable mathematical breakdowns written for modern e-commerce founders and independent consultants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES_DATA.slice(0, 6).map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between"
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
                <Link to={`/blog/${article.slug || article.id}`}>
                  {article.title}
                </Link>
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                {article.snippet}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelectArticle(article)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                Quick Preview
              </button>
              <Link
                to={`/blog/${article.slug || article.id}`}
                className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 transition"
              >
                <span>Read full guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl transition shadow-xs"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Browse All {ARTICLES_DATA.length} Educational Guides</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
