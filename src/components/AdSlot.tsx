import React from 'react';

export type AdPosition = 'leaderboard' | 'in-content' | 'in-grid' | 'mid-page' | 'bottom' | 'sidebar';

interface Props {
  position: AdPosition;
  className?: string;
}

export const AdSlot: React.FC<Props> = ({ position, className = '' }) => {
  const getDetails = () => {
    switch (position) {
      case 'leaderboard':
        return {
          title: 'Advertisement Placement',
          dims: '728×90 / Responsive Leaderboard',
          type: 'Top Header Banner Slot',
          minH: 'min-h-[90px]',
        };
      case 'in-grid':
        return {
          title: 'Advertisement Placement',
          dims: '300×250 / Responsive Rectangle',
          type: 'Grid Native Placement Slot',
          minH: 'min-h-[260px]',
        };
      case 'in-content':
      case 'mid-page':
        return {
          title: 'Advertisement Placement',
          dims: '728×90 / 970×90 Responsive Banner',
          type: 'Mid-Content Placement Slot',
          minH: 'min-h-[90px]',
        };
      case 'bottom':
        return {
          title: 'Advertisement Placement',
          dims: '728×90 / Responsive Anchor Banner',
          type: 'Footer Placement Slot',
          minH: 'min-h-[90px]',
        };
      case 'sidebar':
        return {
          title: 'Advertisement Placement',
          dims: '160×600 / 300×600 Skyscraper',
          type: 'Sidebar Vertical Placement Slot',
          minH: 'min-h-[500px]',
        };
      default:
        return {
          title: 'Advertisement Placement',
          dims: 'Responsive Display Slot',
          type: 'AdSense Placement Slot',
          minH: 'min-h-[90px]',
        };
    }
  };

  const details = getDetails();

  if (position === 'in-grid') {
    return (
      <div
        className={`bg-slate-50/90 rounded-3xl border border-dashed border-slate-300 p-6 flex flex-col justify-between items-center text-center select-none ${details.minH} ${className}`}
        aria-label="Advertisement Slot"
      >
        <div className="w-full flex justify-between items-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          <span>ADVERTISEMENT</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 font-semibold text-[9px]">
            Slot 2
          </span>
        </div>

        <div className="my-auto py-4 space-y-1.5 max-w-xs text-center">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {details.dims}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Reserved space for compliant Google AdSense display unit
          </p>
        </div>

        <div className="w-full pt-3 border-t border-dashed border-slate-200 text-[10px] font-medium text-slate-400 flex justify-center items-center">
          <span>Google AdSense Ready</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-4xl mx-auto my-7 p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 backdrop-blur-xs text-center flex flex-col items-center justify-center select-none ${details.minH} ${className}`}
      aria-label="Advertisement Slot"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-extrabold text-slate-500 tracking-widest uppercase bg-slate-200/80 px-2 py-0.5 rounded-full">
          ADVERTISEMENT
        </span>
        <span className="text-[10px] font-semibold text-slate-400">
          • {details.type}
        </span>
      </div>
      <span className="text-xs text-slate-600 font-bold mt-0.5">
        {details.dims}
      </span>
      <span className="text-[10px] text-slate-400 font-medium mt-0.5">
        AdSense compliant placeholder slot (no tracking code active)
      </span>
    </div>
  );
};
