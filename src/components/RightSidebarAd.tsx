import React from 'react';

export const RightSidebarAd: React.FC = () => {
  return (
    <aside
      aria-label="Sidebar Advertisement"
      className="fixed right-3 xl:right-5 2xl:right-8 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center justify-between w-40 h-[580px] bg-white/95 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 p-3.5 shadow-md text-center select-none"
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

      {/* Center Informational Content */}
      <div className="my-auto py-3 space-y-3 flex flex-col items-center w-full">
        <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
          AD
        </div>

        <div className="space-y-1 px-1 text-center">
          <div className="text-[11px] font-bold text-slate-700 leading-snug">
            Google AdSense Ready
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            Vertical skyscraper placement unit for desktop viewports.
          </p>
        </div>
      </div>

      {/* Bottom AdSense Tag */}
      <div className="w-full pt-2.5 border-t border-dashed border-slate-200 flex flex-col items-center gap-0.5 text-[9px] text-slate-400">
        <span className="font-semibold text-slate-500">
          Compliant Placement
        </span>
        <span className="text-[8px] text-slate-400 font-medium">Auto-responsive width</span>
      </div>
    </aside>
  );
};
