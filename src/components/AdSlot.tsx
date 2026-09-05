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
  position?: AdPosition;
  className?: string;
  slotLabel?: string;
}

export const AdSlot: React.FC<Props> = () => {
  // Returns null unconditionally: zero placeholders or empty boxes before official approval
  return null;
};


