import React from 'react';
import { AdSlot } from './AdSlot';

export const RightSidebarAd: React.FC = () => {
  return (
    <aside
      aria-label="Right Side Advertisement"
      className="hidden xl:flex flex-col w-[160px] 2xl:w-[180px] shrink-0 sticky top-24 select-none"
    >
      <AdSlot position="rail-right" />
    </aside>
  );
};
