import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [{ v: 10 }, { v: 12 }, { v: 11 }, { v: 14 }, { v: 13 }, { v: 16 }, { v: 15 }, { v: 18 }];

const FuelSaved = ({ percentage = 0 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center shrink-0">
      <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C7.81 18 6 15.21 6 12c0-4.08 3.05-7.44 7-7.93V2.05z"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Fuel Saved</p>
      <span className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}%</span>
    </div>
    <div className="w-20 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default FuelSaved;
