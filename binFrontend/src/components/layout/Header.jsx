import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const NOTIFS = [
  { id: 1, text: 'Bin #102 reached 95% fill level', time: '2 min ago',  dot: 'bg-red-500'    },
  { id: 2, text: 'Route optimized — saved 11 km',   time: '8 min ago',  dot: 'bg-green-500'  },
  { id: 3, text: 'Bin #87 status changed to Alert', time: '15 min ago', dot: 'bg-orange-500' },
  { id: 4, text: 'EV Fleet charged to 100%',        time: '1 hr ago',   dot: 'bg-blue-500'   },
];

const Header = () => {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();

  const [showUserMenu,  setShowUserMenu]  = useState(false);
  const [showNotifs,    setShowNotifs]    = useState(false);
  const [unread,        setUnread]        = useState(NOTIFS.length);
  const [refreshing,    setRefreshing]    = useState(false);
  const [live,          setLive]          = useState(true);
  const [time,          setTime]          = useState(new Date());

  /* live clock */
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const openNotifs = () => {
    setShowNotifs(v => !v);
    setShowUserMenu(false);
    setUnread(0);
  };

  const openUser = () => {
    setShowUserMenu(v => !v);
    setShowNotifs(false);
  };

  /* close dropdowns on outside click */
  useEffect(() => {
    const handler = () => { setShowUserMenu(false); setShowNotifs(false); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : 'Admin';

  const roleColor = {
    admin:    'bg-blue-500/20 text-blue-300 border-blue-500/30',
    manager:  'bg-purple-500/20 text-purple-300 border-purple-500/30',
    operator: 'bg-green-500/20 text-green-300 border-green-500/30',
  }[user?.role] ?? 'bg-blue-500/20 text-blue-300 border-blue-500/30';

  /* header bg: always dark navy in light mode, slightly different in dark */
  const headerBg = dark ? 'bg-[#0d1526]' : 'bg-[#1a2456]';

  return (
    <header className={`${headerBg} h-16 flex items-center justify-between px-5 shrink-0 border-b border-white/5`}>

      {/* ── LEFT: logo + title ── */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#00b8a9] rounded-lg flex items-center justify-center shrink-0 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <div>
          <span className="text-white font-bold text-base tracking-wide leading-none">Smart Waste Management</span>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {time.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            {' · '}
            {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
      </div>

      {/* ── RIGHT: controls ── */}
      <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>

        {/* Live toggle */}
        <button
          onClick={() => setLive(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
            live
              ? 'bg-green-500/15 border-green-500/40 text-green-400 hover:bg-green-500/25'
              : 'bg-gray-500/15 border-gray-500/30 text-gray-400 hover:bg-gray-500/25'
          }`}
          title={live ? 'Pause live updates' : 'Resume live updates'}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}/>
          {live ? 'Live' : 'Paused'}
        </button>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          title="Refresh data"
        >
          <svg
            className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          title={dark ? 'Light mode' : 'Dark mode'}
        >
          {dark ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1"/>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={openNotifs}
            className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Notifications"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-72 bg-[#1e2d4a] dark:bg-gray-800 rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Notifications</span>
                <span className="text-[10px] text-gray-400">{NOTIFS.length} total</span>
              </div>
              {NOTIFS.map(n => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-200 leading-snug">{n.text}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
              <div className="px-4 py-2 text-center">
                <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1"/>

        {/* User profile */}
        <div className="relative">
          <button
            onClick={openUser}
            className="flex items-center gap-2.5 pl-1 pr-2 py-1 hover:bg-white/10 rounded-xl transition-colors"
          >
            {/* Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            {/* Info */}
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-white leading-none">{user?.name || 'Admin User'}</p>
              <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full border mt-0.5 ${roleColor}`}>
                {roleLabel}
              </span>
            </div>
            <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1e2d4a] dark:bg-gray-800 rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden">
              {/* User info block */}
              <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user?.name || 'Admin User'}</p>
                    <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${roleColor}`}>
                      {roleLabel}
                    </span>
                  </div>
                </div>
                {/* Stats row */}
                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/10">
                  <div className="text-center flex-1">
                    <p className="text-xs font-bold text-white">150</p>
                    <p className="text-[9px] text-gray-400">Bins</p>
                  </div>
                  <div className="w-px h-6 bg-white/10"/>
                  <div className="text-center flex-1">
                    <p className="text-xs font-bold text-white">18</p>
                    <p className="text-[9px] text-gray-400">Alerts</p>
                  </div>
                  <div className="w-px h-6 bg-white/10"/>
                  <div className="text-center flex-1">
                    <p className="text-xs font-bold text-green-400">Live</p>
                    <p className="text-[9px] text-gray-400">Status</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              {[
                { label: 'My Profile',   icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { label: 'Settings',     icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
                { label: 'Activity Log', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              ].map(item => (
                <button key={item.label} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon}/>
                  </svg>
                  {item.label}
                </button>
              ))}

              <div className="border-t border-white/10 my-1"/>
              <button
                onClick={() => { setShowUserMenu(false); logout(); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
