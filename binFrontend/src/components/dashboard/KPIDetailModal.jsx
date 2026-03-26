import { useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

/* ── per-card config ─────────────────────────────────────────────── */
const CONFIGS = {
  totalBins: {
    title: 'Total Bins',
    accent: '#22c55e',
    iconBg: 'bg-green-100 dark:bg-green-900/40',
    iconColor: 'text-green-600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
      </svg>
    ),
  },
  binsAbove90: {
    title: 'Bins Above 90%',
    accent: '#f97316',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    iconColor: 'text-orange-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
  },
  routeDistance: {
    title: 'Optimized Route Distance',
    accent: '#eab308',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
    iconColor: 'text-yellow-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
  },
  fuelSaved: {
    title: 'Fuel Saved',
    accent: '#f97316',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    iconColor: 'text-orange-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C7.81 18 6 15.21 6 12c0-4.08 3.05-7.44 7-7.93V2.05z"/>
      </svg>
    ),
  },
  avgFillLevel: {
    title: 'Avg Fill Level',
    accent: '#3b82f6',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    iconColor: 'text-blue-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
  },
  vehicleType: {
    title: 'Vehicle Type (EV)',
    accent: '#14b8a6',
    iconBg: 'bg-teal-100 dark:bg-teal-900/40',
    iconColor: 'text-teal-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
      </svg>
    ),
  },
};

/* ── chart data per card ─────────────────────────────────────────── */
const getChartData = (type, data) => {
  switch (type) {
    case 'totalBins':
      return {
        weekly: [
          { day: 'Mon', normal: 105, alert: 32 },
          { day: 'Tue', normal: 108, alert: 35 },
          { day: 'Wed', normal: 102, alert: 38 },
          { day: 'Thu', normal: 110, alert: 40 },
          { day: 'Fri', normal: 107, alert: 36 },
          { day: 'Sat', normal: 112, alert: 42 },
          { day: 'Sun', normal: 110, alert: 40 },
        ],
        pie: [
          { name: 'Normal', value: data.normalBins || 110 },
          { name: 'Alert',  value: data.alertBins  || 40  },
        ],
        stats: [
          { label: 'Total Bins',    value: data.totalBins || 150,  unit: '',   color: 'text-gray-900 dark:text-white' },
          { label: 'Normal',        value: data.normalBins || 110, unit: '',   color: 'text-green-500' },
          { label: 'Alert',         value: data.alertBins || 40,   unit: '',   color: 'text-red-500'   },
          { label: 'Alert Rate',    value: '26.7',                 unit: '%',  color: 'text-orange-500'},
          { label: 'Capacity Used', value: '78',                   unit: '%',  color: 'text-blue-500'  },
          { label: 'Zones Covered', value: '12',                   unit: '',   color: 'text-purple-500'},
        ],
        insight: 'Alert bins increased by 3 since yesterday. Zone 4 has the highest concentration of alert bins (8 bins). Recommend immediate dispatch to Sector 12 and Market Area.',
      };

    case 'binsAbove90':
      return {
        weekly: [
          { day: 'Mon', count: 12 },
          { day: 'Tue', count: 14 },
          { day: 'Wed', count: 11 },
          { day: 'Thu', count: 16 },
          { day: 'Fri', count: 15 },
          { day: 'Sat', count: 19 },
          { day: 'Sun', count: 18 },
        ],
        pie: [
          { name: '90–95%', value: 8  },
          { name: '95–99%', value: 7  },
          { name: '100%',   value: 3  },
        ],
        stats: [
          { label: 'Critical (≥95%)', value: 10,    unit: '',  color: 'text-red-600'    },
          { label: 'High (90–95%)',   value: 8,     unit: '',  color: 'text-orange-500' },
          { label: 'Avg Fill',        value: '93',  unit: '%', color: 'text-yellow-500' },
          { label: 'Since Yesterday', value: '-1',  unit: '',  color: 'text-green-500'  },
          { label: 'Zones Affected',  value: 6,     unit: '',  color: 'text-blue-500'   },
          { label: 'Est. Overflow',   value: '2 hr',unit: '',  color: 'text-red-500'    },
        ],
        insight: '18 bins are above 90% fill level. 10 are critical (≥95%) and risk overflow within 2 hours. Sector 62 and Sector 15 are hotspots. Immediate collection recommended.',
      };

    case 'routeDistance':
      return {
        weekly: [
          { day: 'Mon', km: 91 },
          { day: 'Tue', km: 88 },
          { day: 'Wed', km: 85 },
          { day: 'Thu', km: 84 },
          { day: 'Fri', km: 83 },
          { day: 'Sat', km: 82 },
          { day: 'Sun', km: 82 },
        ],
        pie: [
          { name: 'Completed', value: 54 },
          { name: 'Remaining', value: 28 },
        ],
        stats: [
          { label: 'Total Distance',  value: '82',       unit: ' km',  color: 'text-yellow-500' },
          { label: 'Est. Time',       value: '2 hr 5',   unit: ' min', color: 'text-blue-500'   },
          { label: 'Round Trip',      value: '164',      unit: ' km',  color: 'text-gray-700 dark:text-gray-300' },
          { label: 'Stops',           value: 18,         unit: '',     color: 'text-purple-500' },
          { label: 'Optimized By',    value: '11',       unit: '%',    color: 'text-green-500'  },
          { label: 'Fuel Est.',       value: '12.3',     unit: ' L',   color: 'text-orange-500' },
        ],
        insight: 'Route optimized using TSP algorithm. Distance reduced by 11% vs yesterday (92 km). 18 alert bins covered. EV recommended — distance under 100 km threshold.',
      };

    case 'fuelSaved':
      return {
        weekly: [
          { day: 'Mon', saved: 12 },
          { day: 'Tue', saved: 13 },
          { day: 'Wed', saved: 11 },
          { day: 'Thu', saved: 14 },
          { day: 'Fri', saved: 15 },
          { day: 'Sat', saved: 16 },
          { day: 'Sun', saved: 15 },
        ],
        pie: [
          { name: 'EV Savings',   value: 60 },
          { name: 'Route Opt.',   value: 25 },
          { name: 'Load Opt.',    value: 15 },
        ],
        stats: [
          { label: 'Fuel Saved',    value: '15',   unit: '%',  color: 'text-orange-500' },
          { label: 'Litres Saved',  value: '18.4', unit: ' L', color: 'text-green-500'  },
          { label: 'CO₂ Reduced',   value: '43',   unit: ' kg',color: 'text-teal-500'   },
          { label: 'Cost Saved',    value: '₹1,840',unit: '',  color: 'text-blue-500'   },
          { label: 'Monthly Avg',   value: '13.2', unit: '%',  color: 'text-purple-500' },
          { label: 'YoY Growth',    value: '+4.1', unit: '%',  color: 'text-green-500'  },
        ],
        insight: 'Fuel savings of 15% achieved this week through EV usage (60%), route optimization (25%), and load balancing (15%). Monthly trend is upward — projected 18% next month.',
      };

    case 'avgFillLevel':
      return {
        weekly: [
          { day: 'Mon', fill: 58 },
          { day: 'Tue', fill: 60 },
          { day: 'Wed', fill: 59 },
          { day: 'Thu', fill: 62 },
          { day: 'Fri', fill: 61 },
          { day: 'Sat', fill: 64 },
          { day: 'Sun', fill: 63 },
        ],
        pie: [
          { name: 'Low (<50%)',    value: 45 },
          { name: 'Mid (50–80%)', value: 65 },
          { name: 'High (>80%)',  value: 40 },
        ],
        stats: [
          { label: 'Avg Fill',      value: '63',  unit: '%', color: 'text-blue-500'   },
          { label: 'Max Fill',      value: '97',  unit: '%', color: 'text-red-500'    },
          { label: 'Min Fill',      value: '12',  unit: '%', color: 'text-green-500'  },
          { label: 'Low (<50%)',    value: 45,    unit: '',  color: 'text-teal-500'   },
          { label: 'Mid (50–80%)', value: 65,    unit: '',  color: 'text-yellow-500' },
          { label: 'High (>80%)',  value: 40,    unit: '',  color: 'text-orange-500' },
        ],
        insight: 'Average fill level is 63% — moderate. 40 bins are above 80% and need attention. Fill levels peak on weekends. Consider increasing collection frequency on Saturdays.',
      };

    case 'vehicleType':
      return {
        weekly: [
          { day: 'Mon', ev: 52, gas: 48 },
          { day: 'Tue', ev: 54, gas: 46 },
          { day: 'Wed', ev: 53, gas: 47 },
          { day: 'Thu', ev: 55, gas: 45 },
          { day: 'Fri', ev: 56, gas: 44 },
          { day: 'Sat', ev: 57, gas: 43 },
          { day: 'Sun', ev: 56, gas: 44 },
        ],
        pie: [
          { name: 'Electric (EV)', value: data.evPercentage || 56 },
          { name: 'Gas/Diesel',    value: 100 - (data.evPercentage || 56) },
        ],
        stats: [
          { label: 'EV Usage',      value: `${data.evPercentage || 56}`, unit: '%',  color: 'text-teal-500'   },
          { label: 'EV Vehicles',   value: 8,    unit: '',   color: 'text-teal-600'  },
          { label: 'Gas Vehicles',  value: 6,    unit: '',   color: 'text-gray-500'  },
          { label: 'Total Fleet',   value: 14,   unit: '',   color: 'text-blue-500'  },
          { label: 'EV Range Avg',  value: '180',unit: ' km',color: 'text-green-500' },
          { label: 'CO₂ Saved',     value: '62', unit: ' kg',color: 'text-emerald-500'},
        ],
        insight: '56% of fleet is electric. EV adoption increased by 4% this week. All routes under 100 km are assigned to EVs. Gas vehicles handle long-distance and overflow routes only.',
      };

    default:
      return { weekly: [], pie: [], stats: [], insight: '' };
  }
};

/* ── Stat tile ───────────────────────────────────────────────────── */
const StatTile = ({ label, value, unit, color }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex flex-col gap-1">
    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{label}</span>
    <span className={`text-lg font-extrabold ${color}`}>{value}<span className="text-sm font-semibold">{unit}</span></span>
  </div>
);

/* ── Modal ───────────────────────────────────────────────────────── */
const KPIDetailModal = ({ type, data = {}, onClose }) => {
  const cfg      = CONFIGS[type];
  const chartData = getChartData(type, data);

  /* close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const PIE_COLORS = [cfg.accent, '#e5e7eb', '#94a3b8'];

  /* chart by type */
  const renderMainChart = () => {
    if (type === 'totalBins') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData.weekly} barSize={14}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700"/>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }}/>
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }}/>
            <Tooltip contentStyle={{ background: 'var(--tooltip-bg,#fff)', border: 'none', borderRadius: 8, fontSize: 12 }}/>
            <Legend wrapperStyle={{ fontSize: 11 }}/>
            <Bar dataKey="normal" name="Normal" fill="#22c55e" radius={[4,4,0,0]}/>
            <Bar dataKey="alert"  name="Alert"  fill="#ef4444" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      );
    }
    if (type === 'vehicleType') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData.weekly}>
            <defs>
              <linearGradient id="evGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }}/>
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }}/>
            <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 8, fontSize: 12 }}/>
            <Legend wrapperStyle={{ fontSize: 11 }}/>
            <Area type="monotone" dataKey="ev"  name="EV %"  stroke="#14b8a6" fill="url(#evGrad)" strokeWidth={2}/>
            <Area type="monotone" dataKey="gas" name="Gas %" stroke="#94a3b8" fill="none" strokeWidth={2} strokeDasharray="4 2"/>
          </AreaChart>
        </ResponsiveContainer>
      );
    }
    /* default: area/line */
    const key = { binsAbove90: 'count', routeDistance: 'km', fuelSaved: 'saved', avgFillLevel: 'fill' }[type] || 'v';
    return (
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData.weekly}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={cfg.accent} stopOpacity={0.25}/>
              <stop offset="95%" stopColor={cfg.accent} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }}/>
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }}/>
          <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 8, fontSize: 12 }}/>
          <Area type="monotone" dataKey={key} stroke={cfg.accent} fill="url(#areaGrad)" strokeWidth={2.5} dot={{ r: 3, fill: cfg.accent }}/>
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      {/* drawer panel — slide up */}
      <div
        className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl overflow-hidden"
        style={{ animation: 'slideUp 0.35s cubic-bezier(0.32,0.72,0,1) both', maxHeight: '88vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"/>
        </div>

        {/* scrollable content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(88vh - 20px)' }}>
          {/* header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${cfg.iconBg} ${cfg.iconColor} rounded-xl flex items-center justify-center`}>
                {cfg.icon}
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{cfg.title}</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500">7-day analytics overview</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="px-6 py-5 space-y-6">
            {/* stat tiles */}
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Key Metrics</p>
              <div className="grid grid-cols-3 gap-3">
                {chartData.stats.map(s => (
                  <StatTile key={s.label} {...s}/>
                ))}
              </div>
            </div>

            {/* main chart */}
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">7-Day Trend</p>
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4">
                {renderMainChart()}
              </div>
            </div>

            {/* pie + insight row */}
            <div className="grid grid-cols-2 gap-4">
              {/* pie */}
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Distribution</p>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={chartData.pie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                        {chartData.pie.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i] || '#e5e7eb'}/>
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 8, fontSize: 11 }}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1">
                    {chartData.pie.map((p, i) => (
                      <span key={p.name} className="flex items-center gap-1 text-[11px] text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: PIE_COLORS[i] || '#e5e7eb' }}/>
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* insight */}
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">AI Insight</p>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4 h-[calc(100%-28px)] flex flex-col justify-between">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: cfg.accent + '22' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: cfg.accent }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{chartData.insight}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">Live data · Updated just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDetailModal;
