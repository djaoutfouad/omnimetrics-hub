import React from 'react';

export type AdPosition =
  | 'leaderboard'
  | 'in-content'
  | 'in-grid'
  | 'mid-page'
  | 'bottom'
  | 'sidebar'
  | 'rail-left'
  | 'rail-right';

interface Props {
  position: AdPosition;
  className?: string;
  slotLabel?: string;
}

export const AdSlot: React.FC<Props> = ({ position, className = '', slotLabel }) => {
  const getDetails = () => {
    switch (position) {
      case 'rail-left':
        return {
          title: 'Advertisement',
          dims: '160×600 Skyscraper',
          type: 'Left Rail Placement Unit',
          minH: 'min-h-[600px]',
          containerClass: 'w-[160px] 2xl:w-[180px] h-[600px] p-3.5',
        };
      case 'rail-right':
        return {
          title: 'Advertisement',
          dims: '160×600 Skyscraper',
          type: 'Right Rail Placement Unit',
          minH: 'min-h-[600px]',
          containerClass: 'w-[160px] 2xl:w-[180px] h-[600px] p-3.5',
        };
      case 'sidebar':
        return {
          title: 'Advertisement',
          dims: '160×600 / 300×600 Skyscraper',
          type: 'Vertical Sidebar Placement',
          minH: 'min-h-[600px]',
          containerClass: 'w-full h-[600px] p-3.5',
        };
      case 'leaderboard':
        return {
          title: 'Advertisement',
          dims: '728×90 / Responsive Leaderboard',
          type: 'Header Banner Placement',
          minH: 'min-h-[90px]',
          containerClass: 'w-full max-w-4xl p-3.5 my-6',
        };
      case 'in-grid':
        return {
          title: 'Advertisement',
          dims: '300×250 / Responsive Rectangle',
          type: 'Native Grid Placement',
          minH: 'min-h-[260px]',
          containerClass: 'w-full p-6',
        };
      case 'in-content':
      case 'mid-page':
        return {
          title: 'Advertisement',
          dims: '728×90 / 970×90 Responsive Display',
          type: 'Mid-Content Placement',
          minH: 'min-h-[90px]',
          containerClass: 'w-full max-w-4xl p-3.5 my-6',
        };
      case 'bottom':
        return {
          title: 'Advertisement',
          dims: '728×90 / Responsive Display',
          type: 'Footer Anchor Placement',
          minH: 'min-h-[90px]',
          containerClass: 'w-full max-w-4xl p-3.5 my-6',
        };
      default:
        return {
          title: 'Advertisement',
          dims: 'Responsive Display Unit',
          type: 'AdSense Compliant Placement',
          minH: 'min-h-[90px]',
          containerClass: 'w-full max-w-4xl p-3.5 my-6',
        };
    }
  };

  const details = getDetails();

  // Vertical Rails (160x600 Skyscrapers)
  if (position === 'rail-left' || position === 'rail-right' || position === 'sidebar') {
    return (
      <div
        className={`bg-slate-50/90 rounded-3xl border border-dashed border-slate-300 flex flex-col justify-between items-center text-center select-none shadow-2xs ${details.containerClass} ${className}`}
        aria-hidden="true"
        role="presentation"
      >
        {/* Top Header */}
        <div className="w-full flex flex-col items-center gap-1 border-b border-dashed border-slate-200 pb-2.5">
          <span className="text-[9px] font-extrabold text-slate-500 tracking-widest uppercase bg-slate-200/80 px-2 py-0.5 rounded-full">
            ADVERTISEMENT
          </span>
          <span className="text-[10px] font-bold text-slate-700 leading-tight">
            {details.dims}
          </span>
        </div>

        {/* Center Informational Content */}
        <div className="my-auto py-3 space-y-2.5 flex flex-col items-center w-full">
          <div className="w-9 h-9 rounded-xl bg-slate-200/70 border border-slate-300/80 text-slate-500 flex items-center justify-center font-extrabold text-xs">
            AD
          </div>
          <div className="space-y-1 px-1 text-center">
            <div className="text-[11px] font-bold text-slate-700 leading-snug">
              Google AdSense Ready
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Standard IAB skyscraper placement unit for desktop viewports.
            </p>
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="w-full pt-2.5 border-t border-dashed border-slate-200 flex flex-col items-center gap-0.5 text-[9px] text-slate-400">
          <span className="font-semibold text-slate-500">
            {slotLabel || (position === 'rail-left' ? 'Left Ad Rail' : 'Right Ad Rail')}
          </span>
          <span className="text-[8px] text-slate-400 font-medium">Non-intrusive placement</span>
        </div>
      </div>
    );
  }

  // Native In-Grid Card
  if (position === 'in-grid') {
    return (
      <div
        className={`bg-slate-50/90 rounded-3xl border border-dashed border-slate-300 flex flex-col justify-between items-center text-center select-none ${details.containerClass} ${className}`}
        aria-hidden="true"
        role="presentation"
      >
        <div className="w-full flex justify-between items-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          <span>ADVERTISEMENT</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 font-semibold text-[9px]">
            {slotLabel || 'Native Grid Slot'}
          </span>
        </div>

        <div className="my-auto py-4 space-y-1.5 max-w-xs text-center">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
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

  // Horizontal Banner (Leaderboard, Mid-Page, Bottom)
  return (
    <div
      className={`mx-auto rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 backdrop-blur-xs text-center flex flex-col items-center justify-center select-none ${details.containerClass} ${className}`}
      aria-hidden="true"
      role="presentation"
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
        Google AdSense compliant display slot (space reserved to prevent layout shift)
      </span>
    </div>
  );
};
