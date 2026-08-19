import React from 'react';
import { Home, Search, LayoutGrid, BookOpen, HelpCircle, Mail, Plus } from 'lucide-react';

interface Props {
  onHomeClick: () => void;
  onSearchFocus: () => void;
  onCalculatorsClick: () => void;
  onKnowledgeClick: () => void;
  onFaqClick: () => void;
  onContactClick: () => void;
  onSuggestClick: () => void;
}

export const DockNav: React.FC<Props> = ({
  onHomeClick,
  onSearchFocus,
  onCalculatorsClick,
  onKnowledgeClick,
  onFaqClick,
  onContactClick,
  onSuggestClick,
}) => {
  return (
    <aside className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 py-4 px-2 bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 text-slate-400">
      <button
        type="button"
        onClick={onHomeClick}
        title="Home"
        className="p-2 hover:text-white transition hover:scale-110"
      >
        <Home className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onSearchFocus}
        title="Search"
        className="p-2 hover:text-white transition hover:scale-110"
      >
        <Search className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onCalculatorsClick}
        title="All Calculators"
        className="p-2 hover:text-white transition hover:scale-110"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onKnowledgeClick}
        title="Knowledge Base"
        className="p-2 hover:text-white transition hover:scale-110"
      >
        <BookOpen className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onFaqClick}
        title="FAQ"
        className="p-2 hover:text-white transition hover:scale-110"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onContactClick}
        title="Contact"
        className="p-2 hover:text-white transition hover:scale-110"
      >
        <Mail className="w-4 h-4" />
      </button>

      <div className="w-6 h-px bg-slate-800 my-0.5" />

      <button
        type="button"
        onClick={onSuggestClick}
        title="Suggest a Calculator"
        className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition hover:scale-105"
      >
        <Plus className="w-4 h-4" />
      </button>
    </aside>
  );
};
