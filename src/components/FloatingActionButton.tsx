import React from 'react';
import { Zap } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Suggest a new calculator"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 transition hover:scale-105 active:scale-95 cursor-pointer"
    >
      <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
      <span>Suggest a Calculator</span>
    </button>
  );
};
