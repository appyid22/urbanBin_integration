# SmartBin Frontend-Backend Integration README

This document explains how the integration between the frontend (`binFrontend`) and backend (`binBackend`) was implemented.

## 1. Integration Goal

Connect React + Vite frontend to Node.js + Express + Prisma backend with:

- Real login via backend API
- Token-based protected API calls
- Real bins and KPI data loading
- Socket.IO realtime connection
- Adapter layer to isolate frontend from backend field naming

## 2. Final Architecture

### Backend base

- Host: `http://localhost:5000`
- API base: `http://localhost:5000/api/v1`

### Frontend base

- Host: `http://localhost:5173`

### Data flow

1. User logs in from frontend.
2. Frontend sends `POST /api/v1/auth/login`.
3. Backend returns JWT token + user.
4. Frontend stores token in localStorage.
5. Axios interceptor attaches Bearer token to protected requests.
6. Frontend fetches bins and KPI data.
7. Frontend adapts backend snake_case fields into frontend camelCase fields.
8. Frontend opens Socket.IO connection for realtime events.

## 3. Environment Configuration

### Frontend env

- `VITE_API_URL=http://localhost:5000/api/v1`
- `VITE_WS_URL=http://localhost:5000`
- `VITE_ENABLE_WS=true`

### Backend env (required)

- `APP_PORT=5000`
- `DATABASE_URL=<postgres_connection_string>`
- `JWT_SECRET=<non_empty_secret>`

## 4. API Client Integration

Frontend API client was configured to:

- Use `VITE_API_URL` as base URL
- Attach `Authorization: Bearer <token>` automatically if token exists
- Normalize server errors into a common error shape
- Redirect to login on `401`

## 5. Authentication Integration

Frontend auth now uses real backend login:

- Endpoint: `POST /auth/login`
- Payload:

```json
{
  "email": "admin@urbanbin.com",
  "password": "Admin@123"
}
```

On success:

- token is stored in localStorage (`token`)
- user is stored in localStorage (`user`)
- state is updated in `AuthContext`
- user is navigated to dashboard

## 6. Removed Mock Data

Mock and sample dashboard data paths were removed from runtime flow.
Dashboard now depends on backend data for:

- bins list
- map markers
- alert panel source
- KPI values

## 7. Bins Integration

### API

- `GET /api/v1/bins` (protected)

### Adapter mapping

Backend to frontend mapping example:

- `bin_id -> id`
- `current_fill -> fillLevel`
- `location.latitude -> lat`
- `location.longitude -> lng`
- `last_updated -> lastUpdated`

### Backend update for map support

Bins repository includes location relation so coordinates are available for frontend map rendering.

## 8. Analytics Integration

### API

- `GET /api/v1/analytics/kpi` (protected)

### Adapter

KPI response is transformed into frontend KPI shape using adapter files, so UI remains decoupled from backend naming.

## 9. Realtime Integration

STOMP/SockJS was replaced with Socket.IO client to match backend implementation.

### Frontend listens to

- `binUpdate`
- `sensorOffline`

### Backend emits

- `binUpdate`
- `sensorOffline`

## 10. Folder-Level Integration Structure

Added integration-specific structure in frontend:

- `src/services/`
  - auth service
  - bins service
  - analytics service
- `src/adapters/`
  - bin adapter
  - analytics adapter

This keeps UI components independent from backend schema details.

## 11. Verification Steps

### Step A: Backend health

`GET http://localhost:5000/api/v1/health`

Expected:

```json
{"status":"ok","message":"UrbanBin backend is running"}
```

### Step B: Login

`POST http://localhost:5000/api/v1/auth/login`

Expected:

- Status `200`
- `data.token` exists

### Step C: Protected bins call

`GET http://localhost:5000/api/v1/bins`

Headers:

- `Authorization: Bearer <token>`

Expected:

- Status `200`

### Step D: Protected KPI call

`GET http://localhost:5000/api/v1/analytics/kpi`

Headers:

- `Authorization: Bearer <token>`

Expected:

- Status `200`

### Step E: Browser verification

- Open frontend dashboard
- Check Network tab for successful calls to `/api/v1/bins` and `/api/v1/analytics/kpi`
- Confirm Authorization header is attached on protected calls

## 12. Common Issues and Fixes

### 401 Unauthorized on `/bins`

Cause: Missing Bearer token.

Fix: Login first and ensure token is attached in request headers.

### Validation failed on `/auth/login`

Cause: Postman body not sent as JSON.

Fix:

- Method `POST`
- Body type `raw`
- JSON selected
- Payload includes both `email` and `password`

### Route not found on `/auth/login`

Cause: Request made via browser URL bar (GET), but login route expects POST.

Fix: Use Postman/curl/axios with POST.

## 13. Run Commands

### Backend

```bash
cd binBackend
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
cd binFrontend
npm install
npm run dev
```

## 14. Integration Status

Current integration is implemented and validated at API level:

- Login works
- Protected API calls work with token
- Frontend uses backend base URL
- Frontend uses adapter/service structure
- Socket.IO client is integrated

For final UAT, verify full dashboard behavior in browser with backend + database running.
