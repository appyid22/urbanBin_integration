import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const features = [
  { icon: '🌐', text: 'Real-time bin monitoring across all zones' },
  { icon: '⚡', text: 'AI-optimized collection routes' },
  { icon: '🛡️', text: 'Enterprise-grade security & analytics' },
];

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) setError(result.error || 'Login failed. Please try again.');
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0d1117', fontFamily: 'inherit' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
          }}>♻️</div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>SmartWaste</span>
        </div>

        {/* Headline */}
        <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px' }}>
          Intelligent Waste<br />
          <span style={{ color: '#34d399' }}>Management</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: 16, maxWidth: 420, lineHeight: 1.6, margin: '0 0 48px' }}>
          Monitor, optimize, and transform waste collection with AI-powered route planning and real-time bin monitoring.
        </p>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {features.map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
              }}>{icon}</div>
              <span style={{ color: '#9ca3af', fontSize: 15 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: 420, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#161b22', padding: '40px 48px', flexDirection: 'column'
      }}>
        <div style={{ width: '100%' }}>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>Welcome back</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 36px' }}>Sign in to access your dashboard</p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 20
              }}>{error}</div>
            )}

            <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@smartwaste.com"
              required
              style={{
                width: '100%', marginTop: 8, marginBottom: 20, padding: '14px 16px',
                background: '#0d1117', border: '1px solid #30363d', borderRadius: 8,
                color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box'
              }}
            />

            <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', marginTop: 8, marginBottom: 28, padding: '14px 16px',
                background: '#0d1117', border: '1px solid #30363d', borderRadius: 8,
                color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box'
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', borderRadius: 8, border: 'none',
                background: loading ? '#059669' : '#10b981', color: '#fff',
                fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              🔐 {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 28, borderTop: '1px solid #21262d', paddingTop: 24 }}>
            <p style={{ color: '#6b7280', fontSize: 12, margin: '0 0 6px', fontWeight: 600 }}>Demo Mode</p>
            <p style={{ color: '#4b5563', fontSize: 12, margin: 0 }}>Enter any email &amp; password to explore the dashboard</p>
          </div>
        </div>

        <p style={{ color: '#374151', fontSize: 11, marginTop: 40, textAlign: 'center' }}>
          SmartWaste v2.0 · Intelligent Waste Management Platform
        </p>
      </div>
    </div>
  );
};

export default Login;
