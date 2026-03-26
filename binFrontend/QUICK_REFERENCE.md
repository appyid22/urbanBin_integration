# Quick Reference Guide

## 🚀 Run the App
```bash
npm run dev
```

## 🔑 Login
- Username: any
- Password: any
- Demo mode enabled

## 📂 Key Files

### Add New Page
1. Create in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/layout/Sidebar.jsx`

### API Call
```javascript
import api from './services/api';
const response = await api.get('/endpoint');
```

### WebSocket Subscribe
```javascript
import { subscribe } from './services/websocket';
subscribe('/topic/name', (data) => console.log(data));
```

### Use Auth
```javascript
import { useAuth } from './contexts/AuthContext';
const { user, logout } = useAuth();
```

### Use App State
```javascript
import { useApp } from './contexts/AppContext';
const { bins, alerts } = useApp();
```

## 🎨 Common Tailwind Classes
- Container: `bg-white rounded-lg shadow p-6`
- Button: `bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700`
- Input: `border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`

## 📁 Folder Purpose
- `components/layout/` - Header, Sidebar, MainLayout
- `components/ui/` - Reusable buttons, cards, modals
- `contexts/` - Global state (Auth, App)
- `hooks/` - Custom hooks
- `pages/` - Page components
- `services/` - API and WebSocket

## 🔧 Environment Variables
Edit `.env`:
```
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=http://localhost:8080/ws
```
