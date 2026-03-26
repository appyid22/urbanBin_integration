import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [{ v: 55 }, { v: 58 }, { v: 56 }, { v: 60 }, { v: 59 }, { v: 62 }, { v: 61 }, { v: 63 }];

const AvgFillLevel = ({ fillLevel = 0 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
      <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Avg Fill Level</p>
      <span className="text-2xl font-bold text-gray-900 dark:text-white">{fillLevel}%</span>
    </div>
    <div className="w-20 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AvgFillLevel;
