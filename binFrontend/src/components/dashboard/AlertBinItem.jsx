import { useState } from 'react';

/**
 * Priority badge colors and labels
 */
const PRIORITY_CONFIG = {
  critical: { label: 'CRITICAL', bg: 'bg-red-600', text: 'text-white', ring: 'ring-red-300' },
  high: { label: 'HIGH', bg: 'bg-orange-500', text: 'text-white', ring: 'ring-orange-300' },
  medium: { label: 'MEDIUM', bg: 'bg-yellow-500', text: 'text-white', ring: 'ring-yellow-200' },
  low: { label: 'LOW', bg: 'bg-blue-400', text: 'text-white', ring: 'ring-blue-200' },
};

const getPriority = (fillLevel) => {
  if (fillLevel >= 95) return 'critical';
  if (fillLevel >= 90) return 'high';
  if (fillLevel >= 80) return 'medium';
  return 'low';
};

const getFillBarColor = (fillLevel) => {
  if (fillLevel >= 95) return 'bg-red-600';
  if (fillLevel >= 90) return 'bg-orange-500';
  if (fillLevel >= 80) return 'bg-yellow-500';
  return 'bg-blue-400';
};

const getStatusDotColor = (fillLevel) => {
  if (fillLevel >= 95) return 'bg-red-500 animate-pulse';
  if (fillLevel >= 90) return 'bg-orange-500 animate-pulse';
  if (fillLevel >= 80) return 'bg-yellow-500';
  return 'bg-blue-400';
};

const AlertBinItem = ({ bin, isSelected, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const fillLevel = bin.fillLevel ?? 0;
  const priority = getPriority(fillLevel);
  const config = PRIORITY_CONFIG[priority];

  const handleClick = () => {
    onSelect?.(bin);
  };

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative border-2 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden
        ${isSelected
          ? 'border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg shadow-red-200 ring-2 ring-red-300 scale-105'
          : 'border-gray-200 bg-white hover:border-red-400 hover:shadow-md hover:bg-gradient-to-br hover:from-red-50/50 hover:to-orange-50/30 hover:scale-102'
        }
      `}
    >
      {/* Main Row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Status Dot */}
        <div className={`w-3 h-3 rounded-full shrink-0 shadow-lg ${getStatusDotColor(fillLevel)}`} />

        {/* Bin Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800 truncate">
              {bin.name || `Bin #${bin.id}`}
            </span>
            {/* Priority Badge */}
            <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${config.bg} ${config.text} ring-2 ${config.ring} shadow-sm`}>
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            {/* Fill Level Bar */}
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-24 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getFillBarColor(fillLevel)} shadow-sm`}
                style={{ width: `${Math.min(fillLevel, 100)}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-gray-800 tabular-nums">{fillLevel}%</span>
          </div>
        </div>

        {/* Change Arrow */}
        <div className="flex items-center gap-1">
          {bin.change != null && (
            <span className={`flex items-center text-xs font-bold ${bin.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {bin.change > 0 ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {Math.abs(bin.change)}%
            </span>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={handleToggleExpand}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expandable Details Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-3 pt-2 border-t-2 border-gray-100 space-y-2.5 bg-gradient-to-b from-gray-50/50 to-transparent">
          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{bin.address || bin.location?.address || 'Location not available'}</span>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{bin.lastUpdated ? new Date(bin.lastUpdated).toLocaleTimeString() : 'Recently'}</span>
          </div>

          {/* Waste Type */}
          {bin.wasteType && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="capitalize">{bin.wasteType}</span>
            </div>
          )}

          {/* Capacity */}
          {bin.capacity && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>{bin.capacity}L</span>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleClick}
            className="w-full mt-2 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-2 border-red-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Show on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBinItem;
