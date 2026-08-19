import React from 'react';

export type AdSlotType = 'leaderboard' | 'in-grid' | 'mid-page' | 'bottom';

interface Props {
  slot: AdSlotType;
  title?: string;
}

export const AdBanner: React.FC<Props> = ({ slot, title }) => {
  if (slot === 'in-grid') {
    return (
      <div className="tool-card bg-slate-50/90 rounded-3xl border border-dashed border-slate-300 p-6 flex flex-col justify-between items-center text-center shadow-2xs hover:bg-white transition-all min-h-[300px]">
        <div className="w-full flex justify-between items-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          <span>SPONSORED</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 font-semibold">Slot 2</span>
        </div>

        <div className="my-auto py-6 space-y-2 max-w-xs">
          <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-500 mx-auto flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <h4 className="font-extrabold text-slate-800 text-sm">
            {title || 'Enterprise Merchant Solutions'}
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Targeted business banking, zero-fee FX transfers, and corporate payroll integration.
          </p>
        </div>

        <div className="w-full pt-3 border-t border-dashed border-slate-200 text-[10px] font-medium text-slate-400 flex justify-between items-center">
          <span>Google AdSense Native 300×250</span>
          <span className="font-bold text-emerald-600 hover:underline cursor-pointer">Learn More ↗</span>
        </div>
      </div>
    );
  }

  const getSlotConfig = () => {
    switch (slot) {
      case 'leaderboard':
        return {
          slotLabel: 'Slot 1: Top Leaderboard',
          dimension: '728 × 90 Responsive Banner',
          description: 'High-visibility premium placement above calculator tools',
          bg: 'bg-white/80',
        };
      case 'mid-page':
        return {
          slotLabel: 'Slot 3: Mid-Page Content Leaderboard',
          dimension: '970 × 90 / 728 × 90 Responsive Leaderboard',
          description: 'Engaged user transition placement before Financial Knowledge Guides',
          bg: 'bg-slate-100/70',
        };
      case 'bottom':
        return {
          slotLabel: 'Slot 4: Bottom Display Banner',
          dimension: '728 × 90 / Responsive Anchor Banner',
          description: 'Footer transition placement above FAQ & Legal specifications',
          bg: 'bg-white/90',
        };
      default:
        return {
          slotLabel: 'Sponsored Placement',
          dimension: '728 × 90 Responsive',
          description: 'Google AdSense Ready',
          bg: 'bg-white/80',
        };
    }
  };

  const config = getSlotConfig();

  return (
    <div
      className={`w-full max-w-4xl mx-auto my-8 p-4 sm:p-5 rounded-2xl border border-dashed border-slate-300 ${config.bg} backdrop-blur-xs text-center flex flex-col items-center justify-center transition hover:border-slate-400`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold text-slate-500 tracking-widest uppercase bg-slate-200/80 px-2.5 py-0.5 rounded-full">
          ADVERTISEMENT
        </span>
        <span className="text-[10px] font-semibold text-slate-400">
          • {config.slotLabel}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-slate-600 font-bold mt-0.5">
        {config.dimension}
      </span>
      <span className="text-[11px] text-slate-400 font-medium mt-0.5">
        {config.description} (Google AdSense Responsive Unit)
      </span>
    </div>
  );
};
