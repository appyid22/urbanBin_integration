const VehicleType = ({ evPercentage = 0 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex items-center gap-3 h-full">
    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Vehicle Type</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-bold text-gray-900 dark:text-white">{evPercentage}%</span>
        <span className="text-xs font-bold text-teal-600 dark:text-teal-400">EV</span>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <svg className="w-4 h-4 text-teal-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
        </svg>
        <span className="text-xs text-gray-500 dark:text-gray-400">Electric Vehicle</span>
      </div>
    </div>
  </div>
);

export default VehicleType;
