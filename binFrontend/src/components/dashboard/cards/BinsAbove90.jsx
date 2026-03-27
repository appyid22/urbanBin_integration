const BinsAbove90 = ({ alertCount = 0, sinceYesterday = 0 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center shrink-0">
      <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Bins Above 90%</p>
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{alertCount}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Bins</span>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
        <span className={sinceYesterday < 0 ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
          {sinceYesterday > 0 ? '+' : ''}{sinceYesterday}
        </span>{' '}since yesterday
      </p>
    </div>
  </div>
);

export default BinsAbove90;
