# ♻️ Smart Waste Management System

A full-stack web application for monitoring and optimizing waste collection using real-time data, analytics, and intelligent routing.

---

## 📌 Overview

This project demonstrates a complete end-to-end integration between a React frontend and a Node.js backend, powered by PostgreSQL and Prisma ORM.

It provides real-time insights into bin status, alerts, and optimized routes for efficient waste management.

---

## 🧠 Key Features

* 🔐 Secure Authentication (JWT-based)
* 📊 Real-time Dashboard with KPIs
* 🗑️ Bin Monitoring & Status Tracking
* 🚨 Alert System for Overfilled Bins
* 🗺️ Map-based Visualization
* ⚡ Real-time Updates using WebSockets
* 🔄 Optimized Route Estimation
* 🧩 Clean State Management using Context API

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Context API
* Axios / Fetch
* Tailwind CSS (or your styling)

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL

### Real-time

* WebSockets (Socket.io)

---

## 📂 Project Structure

```
SmartBin/
│
├── binFrontend/        # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── adapters/
│
├── backend/            # Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── prisma/
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User logs in via frontend
2. Credentials sent to backend API
3. Backend validates and returns JWT token
4. Token stored in frontend (localStorage)
5. All protected API calls use Bearer token

---

## 🔄 Data Flow (Frontend ↔ Backend)

* Frontend triggers API calls using `useEffect`
* Endpoints:

  * `/bins`
  * `/analytics`
* Responses are normalized using adapters
* Data stored in global state (Context API)
* Passed as props to UI components

---

## ⚡ Real-Time Updates

* WebSocket connection established after login
* Events handled:

  * Bin status updates
  * Sensor alerts
* UI updates instantly without refresh

---

## 🐞 Issue Faced & Fix

### Problem:

UI rendered but data was not showing (all values = 0)

### Root Cause:

Mismatch between backend response format and frontend consumption after merge conflicts

### Fix:

Updated service layer to extract actual data:

```js
return response.data;
```

Result:

* Correct state updates
* Dashboard populated successfully

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

Frontend:

```bash
cd binFrontend
npm install
```

Backend:

```bash
cd backend
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` in backend:

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
PORT=5000
```

---

### 4️⃣ Run Project

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## 📸 Demo

* Dashboard with live data
* Network requests showing successful API calls
* Real-time updates without refresh

---

## 👨‍💻 Author

**Arpit Singh**

---

## ⭐ Conclusion

This project demonstrates a scalable, production-ready architecture with secure authentication, efficient data flow, and real-time capabilities.
