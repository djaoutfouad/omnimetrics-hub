import React from 'react';
import { AdSlot } from './AdSlot';

interface ContentWithRailsProps {
  children: React.ReactNode;
  showRails?: boolean;
  showLeftRail?: boolean;
  showRightRail?: boolean;
  className?: string;
  mainClassName?: string;
  maxWidthClass?: string;
}

/**
 * Responsive Three-Column Layout Component for OmniMetrics Hub.
 *
 * Desktop (>= 1280px / xl):
 *   [LEFT AD RAIL (160px)] | [MAIN CONTENT (Flexible Priority)] | [RIGHT AD RAIL (160px)]
 *
 * Tablet & Mobile (< 1280px):
 *   [MAIN CONTENT (Full-width, comfortable padding, zero side-rail interference)]
 */
export const ContentWithRails: React.FC<ContentWithRailsProps> = ({
  children,
  showRails = true,
  showLeftRail = true,
  showRightRail = true,
  className = '',
  mainClassName = '',
  maxWidthClass = 'max-w-4xl 2xl:max-w-5xl',
}) => {
  return (
    <div
      className={`w-full max-w-[1480px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-6 flex justify-center items-start gap-6 2xl:gap-8 ${className}`}
    >
      {/* Left Ad Rail (Visible on xl / 1280px+ viewports only) */}
      {showRails && showLeftRail && (
        <aside
          aria-label="Left Side Advertisement"
          className="hidden xl:flex flex-col w-[160px] 2xl:w-[180px] shrink-0 sticky top-24 select-none"
        >
          <AdSlot position="rail-left" />
        </aside>
      )}

      {/* Main Content Area (Highest Priority, fluid and responsive) */}
      <div className={`flex-1 min-w-0 w-full ${maxWidthClass} ${mainClassName}`}>
        {children}
      </div>

      {/* Right Ad Rail (Visible on xl / 1280px+ viewports only) */}
      {showRails && showRightRail && (
        <aside
          aria-label="Right Side Advertisement"
          className="hidden xl:flex flex-col w-[160px] 2xl:w-[180px] shrink-0 sticky top-24 select-none"
        >
          <AdSlot position="rail-right" />
        </aside>
      )}
    </div>
  );
};
