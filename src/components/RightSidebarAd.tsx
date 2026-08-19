import React from 'react';
import { ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';

export const RightSidebarAd: React.FC = () => {
  return (
    <aside
      aria-label="Sidebar Advertisement"
      className="fixed right-3 xl:right-5 2xl:right-8 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center justify-between w-40 h-[580px] bg-white/95 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 p-3.5 shadow-xl text-center transition-all hover:border-slate-400 select-none"
    >
      {/* Top Tag */}
      <div className="w-full flex flex-col items-center gap-1 border-b border-dashed border-slate-200 pb-2.5">
        <span className="text-[9px] font-extrabold text-slate-400 tracking-widest uppercase bg-slate-100 px-2.5 py-0.5 rounded-full">
          ADVERTISEMENT
        </span>
        <span className="text-[10px] font-bold text-slate-700 leading-tight">
          160×600 Skyscraper
        </span>
      </div>

      {/* Center Visual & Placeholder */}
      <div className="my-auto py-3 space-y-3 flex flex-col items-center w-full">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="space-y-1.5 px-0.5">
          <div className="text-[11px] font-black text-slate-900 leading-snug">
            Global Banking & FX Gateway
          </div>
          <p className="text-[10px] text-slate-500 leading-normal">
            Zero-markup currency conversion & high-yield corporate accounts.
          </p>
        </div>

        <div className="w-full py-2 px-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] font-bold text-emerald-800 flex items-center justify-center gap-1 shadow-2xs hover:bg-emerald-100 transition cursor-pointer">
          <span>Instant API Payouts</span>
          <ArrowUpRight className="w-3 h-3 text-emerald-600" />
        </div>
      </div>

      {/* Bottom AdSense Tag */}
      <div className="w-full pt-2.5 border-t border-dashed border-slate-200 flex flex-col items-center gap-1 text-[9px] text-slate-400">
        <span className="font-bold text-slate-600 flex items-center gap-1">
          <span>AdSense Ready</span>
          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
        </span>
        <span className="text-[8px] text-slate-400 font-medium">Responsive Vertical Rail</span>
      </div>
    </aside>
  );
};
