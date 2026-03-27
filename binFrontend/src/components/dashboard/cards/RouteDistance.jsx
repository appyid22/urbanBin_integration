const RouteDistance = ({ distance = 0, estimatedTime = '--' }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex items-center gap-3 h-full">
    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">Optimized Route Distance</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-gray-900 dark:text-white">{distance}</span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">km</span>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0"/>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 via-blue-300 to-orange-400 rounded-full"/>
        <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
        </svg>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
        ETA: <span className="text-gray-600 dark:text-gray-300 font-medium">{estimatedTime}</span>
      </p>
    </div>
  </div>
);

export default RouteDistance;
