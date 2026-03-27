import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import KPIMetrics from '../components/dashboard/KPIMetrics';
import BinLocationsMap from '../components/dashboard/BinLocationsMap';
import AlertBinsPanel from '../components/dashboard/AlertBinsPanel';
import { useApp } from '../contexts/AppContext';
import { useAlertNotifications } from '../hooks/useAlertNotifications.jsx';


const fillColor  = (v) => v >= 90 ? 'text-red-500' : v >= 70 ? 'text-orange-500' : 'text-green-500';
const statusColor = (s) => s === 'Alert' ? 'text-red-500' : 'text-green-600';
const statusBg    = (s) => s === 'Alert' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20';

/* ── Card wrapper ── */
const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

/* ── Route Summary ── */
const RouteSummaryCard = ({ analytics = {} }) => (
  <Card className="p-5 flex-1">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-bold text-gray-900 dark:text-white">Route Summary</h3>
      <div className="flex gap-2">
        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full font-medium">-90%</span>
        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full font-medium">-90%</span>
      </div>
    </div>

    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
        <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
        </svg>
      </div>
      <div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.routeDistance ?? 0} km</span>
        <p className="text-xs text-gray-400 dark:text-gray-500">Total Distance</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Time: <span className="font-bold text-gray-800 dark:text-gray-200">{analytics.estimatedTime || '--'}</span></p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Round Trip: <span className="font-semibold text-gray-700 dark:text-gray-300">{(analytics.routeDistance ?? 0) * 2} km</span></p>
      </div>
    </div>

    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-3">
      <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Recommended Vehicle:</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <div>
          <p className="text-sm">
            <span className="text-teal-600 font-semibold">Electric Vehicle </span>
            <span className="text-teal-700 dark:text-teal-400 font-extrabold">(EV)</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Reason: Distance &gt; 100k threshold</p>
        </div>
      </div>
    </div>
  </Card>
);

/* ── Bin Detail ── */
const BinDetailCard = ({ selectedBin }) => (
  <Card className="p-5 flex-1">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-bold text-gray-900 dark:text-white">{selectedBin ? `Bin #${selectedBin.id}` : 'No Bin Selected'}</h3>
      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2.5 py-1.5">
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span className="text-xs text-gray-400 dark:text-gray-400">Search</span>
      </div>
    </div>

    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedBin?.address || 'Select a bin from the map'}</p>
        <div className="w-40 h-3 rounded-full mt-1.5" style={{ background: 'linear-gradient(to right, #22c55e, #84cc16, #eab308, #f97316, #ef4444)' }}/>
      </div>
    </div>

    <div className="space-y-2.5 border-t border-gray-100 dark:border-gray-700 pt-3">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Fill Level: <span className="font-bold text-blue-600">{selectedBin?.fillLevel ?? 0}%</span>
      </p>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Savings:</p>
        <span className="font-bold text-gray-800 dark:text-gray-200">{selectedBin?.status || 'Normal'}</span>
        <div className="w-px h-4 bg-gray-200 dark:bg-gray-600"/>
        <span className="font-bold text-gray-800 dark:text-gray-200">{selectedBin?.zone || 'Unknown'}</span>
      </div>
    </div>
  </Card>
);

/* ── Bin List Table ── */
const BinListTable = ({ bins = [] }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = bins.filter(b =>
    String(b.id).includes(search) || (b.address || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Bin List°</h3>
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2.5 py-1.5">
            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Filter</span>
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="text-xs border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 w-32"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing 1 to {filtered.length} of <span className="font-semibold">{bins.length} Bins</span>
        </p>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-700">
            {['Bin ID','Location','Fill %','Status','Priority','Action'].map(h => (
              <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((bin, i) => (
            <tr key={bin.id} className={`border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors`}>
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{bin.id}</span>
                </div>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span className="text-gray-700 dark:text-gray-300 text-xs">{bin.address || 'Unknown Location'}</span>
                </div>
              </td>
              <td className="py-3 px-3">
                <span className={`font-bold text-xs flex items-center gap-0.5 ${fillColor(bin.fillLevel)}`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z" transform="rotate(180 12 12)"/></svg>
                  {bin.fillLevel}%
                </span>
              </td>
              <td className="py-3 px-3">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${statusBg(bin.status || 'Normal')} ${statusColor(bin.status || 'Normal')}`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                  {bin.status || 'Normal'}
                </span>
              </td>
              <td className="py-3 px-3">
                <span className={`text-xs font-semibold ${bin.fillLevel >= 90 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>{bin.fillLevel >= 90 ? 'High' : 'Low'}</span>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  {bin.serving ? (
                    <button className="flex items-center gap-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium">
                      <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      Serving
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 text-xs bg-[#3b6ef5] hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                      Add to Route
                    </button>
                  )}
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 px-3 text-center text-sm text-gray-500 dark:text-gray-400">No bins available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-1 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        {[2,3,4,5].map(n => (
          <button key={n} onClick={() => setPage(n)}
            className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-colors ${page === n ? 'bg-[#3b6ef5] text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {n}
          </button>
        ))}
        <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </Card>
  );
};

/* ── Dashboard ── */
const Dashboard = () => {
  const { bins, analytics, selectedBin, selectBin } = useApp();
  useAlertNotifications(bins, 90, selectBin);

  return (
    <MainLayout>
      <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />
      <div className="p-4 pt-5 space-y-4">
        <KPIMetrics bins={bins} analytics={analytics} />
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <BinLocationsMap bins={bins} selectedBin={selectedBin} />
          </div>
          <AlertBinsPanel bins={bins} routeSummary={analytics} />
        </div>
        <div className="flex gap-3">
          <RouteSummaryCard analytics={analytics} />
          <BinDetailCard selectedBin={selectedBin} />
        </div>
        <BinListTable bins={bins} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
