# Smart Waste Management System - Frontend

A modern React application for managing smart waste bins with real-time monitoring and analytics.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd smart-bin-management
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your backend API URLs
```

4. Start development server
```bash
npm run dev
```

5. Open browser at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/               # Static assets (icons, images)
├── components/
│   ├── layout/          # Layout components (Header, Sidebar, MainLayout)
│   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   └── ProtectedRoute.jsx
├── contexts/
│   ├── AuthContext.jsx  # Authentication state management
│   └── AppContext.jsx   # Global app state (bins, alerts, analytics)
├── hooks/
│   └── index.js         # Custom hooks (useApi, useDebounce)
├── pages/
│   ├── Login.jsx        # Login page
│   ├── Dashboard.jsx    # Main dashboard
│   └── OtherPages.jsx   # Analytics, DriverRoutes, Settings
├── services/
│   ├── api.js           # Axios instance with interceptors
│   └── websocket.js     # STOMP WebSocket client
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles with Tailwind
```

## 🔐 Authentication

### Login Flow
1. User enters credentials on `/login`
2. `AuthContext.login()` is called
3. Token is saved to localStorage
4. User is redirected to `/dashboard`

### Protected Routes
- All routes except `/login` are protected
- `ProtectedRoute` component checks authentication
- Unauthenticated users are redirected to `/login`

### Logout
- Click user avatar → Logout
- Token and user data are cleared
- Redirected to `/login`

## 🌐 API Integration

### Using the API Service

```javascript
import api from './services/api';

// GET request
const response = await api.get('/bins');

// POST request
const response = await api.post('/bins', { name: 'Bin 1' });

// PUT request
const response = await api.put('/bins/1', { status: 'active' });

// DELETE request
const response = await api.delete('/bins/1');
```

### API Configuration
- Base URL: Set in `.env` as `VITE_API_URL`
- Auto-adds `Authorization: Bearer <token>` header
- Auto-handles 401 errors (logout and redirect)

## 🔌 WebSocket Integration

### Connection
WebSocket connects automatically when user logs in (in `AppContext`).

### Subscribing to Topics

```javascript
import * as websocket from './services/websocket';

// Subscribe to a topic
websocket.subscribe('/topic/bins', (data) => {
  console.log('Received bins update:', data);
});

// Subscribe to alerts
websocket.subscribe('/topic/alerts', (data) => {
  console.log('New alert:', data);
});
```

### Available Topics (Backend should implement these)
- `/topic/bins` - Real-time bin updates
- `/topic/alerts` - System alerts
- `/topic/analytics` - Analytics data

## 📊 State Management

### AuthContext
Manages authentication state:
```javascript
const { user, token, isAuthenticated, loading, login, logout } = useAuth();
```

### AppContext
Manages global app state:
```javascript
const { bins, setBins, alerts, setAlerts, analytics, setAnalytics, wsConnected } = useApp();
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- Responsive design (mobile-first)
- Dark sidebar with light content area
- Consistent color scheme (blue primary)

### Customizing Tailwind
Edit `tailwind.config.js` to customize theme, colors, etc.

## 🛣️ Available Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/login` | Login | No | Login page |
| `/dashboard` | Dashboard | Yes | Main dashboard with KPIs and map |
| `/analytics` | Analytics | Yes | Analytics page (placeholder) |
| `/driver-routes` | DriverRoutes | Yes | Driver routes page (placeholder) |
| `/settings` | Settings | Yes | Settings page (placeholder) |
| `/` | - | - | Redirects to `/dashboard` |

## 🔧 Custom Hooks

### useApi
Fetch data from API with loading and error states:
```javascript
const { data, loading, error } = useApi('/bins');
```

### useDebounce
Debounce a value (useful for search inputs):
```javascript
const debouncedSearch = useDebounce(searchTerm, 500);
```

## 🧪 Testing the Setup

1. **Login**: Use any username/password (mock authentication)
2. **Check WebSocket**: Open browser console, should see "WebSocket Connected"
3. **Navigate**: Click sidebar links to test routing
4. **Logout**: Click user avatar → Logout

## 📝 Next Steps for Team

### For Backend Integration
1. Replace mock login in `AuthContext.jsx` with real API call
2. Update API base URL in `.env`
3. Implement WebSocket topics on backend
4. Test with real data

### For Frontend Development
1. **Map Integration**: Add Google Maps or Leaflet to Dashboard
2. **Analytics Page**: Build charts and graphs
3. **Driver Routes**: Implement route optimization UI
4. **Settings Page**: Add user preferences, system config
5. **UI Components**: Create reusable Button, Card, Modal components in `components/ui/`

## 🐛 Troubleshooting

### WebSocket not connecting
- Check `VITE_WS_URL` in `.env`
- Ensure backend WebSocket endpoint is running
- Check browser console for errors

### API calls failing
- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check network tab in browser DevTools

### Routing issues
- Clear localStorage: `localStorage.clear()`
- Restart dev server: `npm run dev`

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request

## 📄 License

MIT License

---

**Built with ❤️ using React + Vite + Tailwind CSS**
