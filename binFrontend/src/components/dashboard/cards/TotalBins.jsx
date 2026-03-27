const TotalBins = ({ totalBins = 0, normalBins = 0, alertBins = 0 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center shrink-0">
      <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Bins</span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalBins}</span>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-sm font-bold text-green-500">{normalBins} <span className="font-normal text-gray-500 dark:text-gray-400">Normal</span></span>
        <span className="text-sm font-bold text-red-500">{alertBins} <span className="font-normal text-gray-500 dark:text-gray-400">Alert</span></span>
      </div>
    </div>
  </div>
);

export default TotalBins;
