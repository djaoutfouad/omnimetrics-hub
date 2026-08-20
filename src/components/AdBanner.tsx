import React from 'react';
import { AdSlot, AdPosition } from './AdSlot';

export type AdSlotType = 'leaderboard' | 'in-grid' | 'mid-page' | 'bottom';

interface Props {
  slot: AdSlotType;
  title?: string;
}

export const AdBanner: React.FC<Props> = ({ slot }) => {
  const positionMap: Record<AdSlotType, AdPosition> = {
    leaderboard: 'leaderboard',
    'in-grid': 'in-grid',
    'mid-page': 'mid-page',
    bottom: 'bottom',
  };

  return <AdSlot position={positionMap[slot] || 'mid-page'} />;
};
