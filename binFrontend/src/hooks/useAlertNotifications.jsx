import { useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * useAlertNotifications
 *
 * Watches a list of bins for real-time fill-level changes and fires
 * toast notifications when a bin crosses a critical threshold.
 *
 * @param {Array}  bins          – current bin list from AppContext
 * @param {number} threshold     – fill % that triggers a toast (default 90)
 * @param {Function} onSelectBin – optional callback to highlight bin on map
 */
export const useAlertNotifications = (bins = [], threshold = 90, onSelectBin) => {
  // Keep a ref of previous fill-levels so we only fire on *new* threshold crossings
  const prevFillRef = useRef(new Map());

  const showBinToast = useCallback(
    (bin) => {
      const fillLevel = bin.fillLevel ?? bin.fillPercentage ?? 0;
      const name = bin.name ?? bin.binName ?? `Bin #${bin.id}`;
      const isCritical = fillLevel >= 95;

      toast(
        (t) => (
          <div
            className="flex items-start gap-3 cursor-pointer"
            onClick={() => {
              onSelectBin?.(bin);
              toast.dismiss(t.id);
            }}
          >
            {/* Icon */}
            <div
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                isCritical ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{name}</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Fill level reached <span className={`font-bold ${isCritical ? 'text-red-600' : 'text-orange-600'}`}>{fillLevel}%</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Click to view on map</p>
            </div>
          </div>
        ),
        {
          duration: 5000,
          position: 'top-right',
          style: {
            border: isCritical ? '1px solid #FCA5A5' : '1px solid #FED7AA',
            background: isCritical ? '#FEF2F2' : '#FFFBEB',
            padding: '12px',
            borderRadius: '10px',
            maxWidth: '360px',
          },
          icon: null,
        }
      );
    },
    [onSelectBin]
  );

  useEffect(() => {
    if (!bins || bins.length === 0) return;

    const prevMap = prevFillRef.current;

    bins.forEach((bin) => {
      const id = bin.id ?? bin.binId;
      if (!id) return;

      const fillLevel = bin.fillLevel ?? bin.fillPercentage ?? 0;
      const prevLevel = prevMap.get(id);

      // Fire toast if:
      //   1. Bin is new and already above threshold
      //   2. Bin crossed the threshold upward
      if (fillLevel >= threshold) {
        if (prevLevel === undefined || prevLevel < threshold) {
          showBinToast(bin);
        }
      }

      prevMap.set(id, fillLevel);
    });
  }, [bins, threshold, showBinToast]);
};

export default useAlertNotifications;
