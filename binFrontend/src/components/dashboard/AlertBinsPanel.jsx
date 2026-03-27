import { useState, useMemo } from 'react';

const ZONES = ['All Zones', 'Zone A', 'Zone B', 'Zone C'];

const getLevel = (fill) => {
  if (fill >= 95) return 'urgent';
  if (fill >= 90) return 'warning';
  return 'normal';
};

const LEVEL_CONFIG = {
  urgent:  { label: 'Urgent',  dot: 'bg-red-500',    text: 'text-red-500',    badge: 'bg-red-50 dark:bg-red-900/20 text-red-500 border-red-200 dark:border-red-800' },
  warning: { label: 'Warning', dot: 'bg-orange-500', text: 'text-orange-500', badge: 'bg-orange-50 dark:bg-orange-900/20 text-orange-500 border-orange-200 dark:border-orange-800' },
  normal:  { label: 'Normal',  dot: 'bg-green-500',  text: 'text-green-500',  badge: 'bg-green-50 dark:bg-green-900/20 text-green-500 border-green-200 dark:border-green-800' },
};

const MiniBar = ({ fill }) => (
  <div className="flex items-end gap-px h-5 w-8 shrink-0">
    {[40, 60, 50, 80, 70, fill].map((v, i) => (
      <div key={i} className="flex-1 rounded-sm"
        style={{
          height: `${(v / 100) * 100}%`,
          background: v >= 95 ? '#ef4444' : v >= 90 ? '#f97316' : '#22c55e',
          opacity: i === 5 ? 1 : 0.35 + i * 0.1,
        }}
      />
    ))}
  </div>
);

const AlertBinsPanel = ({ bins = [], routeSummary }) => {
  const [search,    setSearch]    = useState('');
  const [zone,      setZone]      = useState('All Zones');
  const [level,     setLevel]     = useState('all');
  const [showZone,  setShowZone]  = useState(false);
  const [showLevel, setShowLevel] = useState(false);

  const source = useMemo(() => {
    return bins
      .filter((b) => (b.fillLevel ?? 0) >= 90)
      .map((b) => ({
        id: b.id ?? b.binId,
        address: b.address ?? b.location?.address ?? 'Unknown address',
        fillLevel: b.fillLevel ?? 0,
        change: b.change ?? 0,
        zone: b.zone ?? 'Unknown'
      }));
  }, [bins]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return source
      .filter(b => {
        const matchSearch = !q ||
          String(b.id).includes(q) ||
          b.address.toLowerCase().includes(q);
        const matchZone  = zone === 'All Zones' || b.zone === zone;
        const matchLevel = level === 'all' || getLevel(b.fillLevel) === level;
        return matchSearch && matchZone && matchLevel;
      })
      .sort((a, b) => b.fillLevel - a.fillLevel);
  }, [source, search, zone, level]);

  const totalDist = routeSummary?.routeDistance ?? 0;
  const estTime   = routeSummary?.estimatedTime ?? '--';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col w-[240px] shrink-0 overflow-hidden">

      {/* ── Header ── */}
      <div className="px-3 pt-3 pb-2 border-b border-gray-100 dark:border-gray-700 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wide">
            Alert Bins
            <span className="ml-1 px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-[10px] font-bold">
              {filtered.length}
            </span>
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
            <span className="font-bold text-gray-800 dark:text-gray-200">{totalDist} km</span>
            <span>·</span>
            <span>{estTime}</span>
          </div>
        </div>
        <p className="text-[9px] text-gray-400 dark:text-gray-500 mb-2">Round Trip</p>

        {/* Search */}
        <div className="relative mb-2">
          <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID or address..."
            className="w-full pl-6 pr-2 py-1.5 text-[10px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
          {/* Zone filter */}
          <div className="relative flex-1">
            <button
              onClick={() => { setShowZone(v => !v); setShowLevel(false); }}
              className="w-full flex items-center justify-between gap-1 px-2 py-1 text-[10px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:border-blue-400 transition-colors"
            >
              <span className="truncate">{zone}</span>
              <svg className={`w-2.5 h-2.5 shrink-0 transition-transform ${showZone ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            {showZone && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 overflow-hidden">
                {ZONES.map(z => (
                  <button key={z} onClick={() => { setZone(z); setShowZone(false); }}
                    className={`w-full text-left px-2.5 py-1.5 text-[10px] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${zone === z ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                    {z}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Level filter */}
          <div className="relative flex-1">
            <button
              onClick={() => { setShowLevel(v => !v); setShowZone(false); }}
              className="w-full flex items-center justify-between gap-1 px-2 py-1 text-[10px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:border-blue-400 transition-colors"
            >
              <span className="truncate capitalize">{level === 'all' ? 'All Levels' : level}</span>
              <svg className={`w-2.5 h-2.5 shrink-0 transition-transform ${showLevel ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            {showLevel && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 overflow-hidden">
                {[['all','All Levels'],['urgent','Urgent'],['warning','Warning'],['normal','Normal']].map(([val, lbl]) => (
                  <button key={val} onClick={() => { setLevel(val); setShowLevel(false); }}
                    className={`w-full text-left px-2.5 py-1.5 text-[10px] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 ${level === val ? 'font-bold' : ''}`}>
                    {val !== 'all' && <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_CONFIG[val].dot}`}/>}
                    <span className={val !== 'all' ? LEVEL_CONFIG[val].text : 'text-gray-700 dark:text-gray-300'}>{lbl}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── List ── */}
      <div className="flex-1 overflow-y-auto alert-bins-scroll" style={{ minHeight: 0 }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
            <svg className="w-8 h-8 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="text-[11px] font-medium">No bins found</p>
            <p className="text-[10px] mt-0.5">Try adjusting filters</p>
          </div>
        ) : (
          filtered.map(bin => {
            const lvl = getLevel(bin.fillLevel);
            const cfg = LEVEL_CONFIG[lvl];
            return (
              <div key={bin.id} className="flex items-center gap-2 px-3 py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
                {/* dot */}
                <span className={`w-2 h-2 rounded-full shrink-0 animate-pulse ${cfg.dot}`}/>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">#{bin.id}</span>
                    <span className={`text-[9px] font-bold px-1 py-0.5 rounded border ${cfg.badge}`}>{cfg.label}</span>
                  </div>
                  <p className="text-[9px] text-gray-400 dark:text-gray-500 truncate mt-0.5">{bin.address}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold text-red-500 flex items-center gap-0.5">
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
                      {bin.fillLevel}%
                    </span>
                    <span className="text-[10px] font-bold text-green-500 flex items-center gap-0.5">
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z"/></svg>
                      {bin.change}%
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500">{bin.zone}</span>
                  </div>
                </div>

                <MiniBar fill={bin.fillLevel}/>
              </div>
            );
          })
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-700 shrink-0 flex items-center justify-between">
        <span className="text-[9px] text-gray-400 dark:text-gray-500">Threshold ≥ 90%</span>
        <span className="flex items-center gap-1 text-[9px] text-green-500 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
          Live
        </span>
      </div>
    </div>
  );
};

export default AlertBinsPanel;
