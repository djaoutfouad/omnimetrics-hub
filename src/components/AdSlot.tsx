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

export const AdSlot: React.FC<Props> = ({ position, className = '' }) => {
  const getContainerClass = () => {
    switch (position) {
      case 'rail-left':
      case 'rail-right':
        return 'w-[160px] 2xl:w-[180px] h-[600px] min-h-[600px] p-4';
      case 'sidebar':
        return 'w-full h-[600px] min-h-[600px] p-4';
      case 'in-grid':
        return 'w-full min-h-[260px] p-6';
      case 'leaderboard':
      case 'in-content':
      case 'mid-page':
      case 'bottom':
      default:
        return 'w-full max-w-4xl min-h-[90px] p-4 my-6';
    }
  };

  return (
    <div
      className={`mx-auto bg-slate-50/90 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-center select-none shadow-2xs ${getContainerClass()} ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
        ADVERTISEMENT
      </span>
    </div>
  );
};

