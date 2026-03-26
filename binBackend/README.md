# UrbanBin Backend

Production-ready backend for the UrbanBin waste management platform.

This README is designed to help you quickly understand the system in the future: architecture, modules, database design, APIs, setup, testing, and common troubleshooting.

## 1. Tech Stack

- Runtime: Node.js (CommonJS)
- Framework: Express.js
- Database: PostgreSQL
- ORM: Prisma
- Auth: JWT + bcrypt
- Validation: Joi
- File Upload: Multer
- Realtime: Socket.IO
- Logging: Morgan + custom logger

## 2. High-Level Architecture

Request flow:

Client -> Route -> Validation Middleware -> Auth Middleware (if protected) -> Controller -> Service -> Repository -> Prisma -> PostgreSQL

Error flow:

Thrown errors -> Global error middleware -> Standard JSON error response

Realtime flow:

Sensor data insert -> service logic -> update bin/alerts -> emit Socket.IO events

Offline monitor flow:

Background interval checks stale bins -> emits sensorOffline event

## 3. Project Structure

Key folders in src:

- config: environment parsing and Prisma client setup
- controllers: HTTP handlers (thin layer)
- services: business logic and rules
- repositories: data access using Prisma
- routes: endpoint mapping
- middlewares: auth, validation, error handling, uploads
- validations: Joi schemas per module
- sockets: socket initialization and offline monitor
- utils: logger, custom error, async handler

Other important folders:

- prisma: schema.prisma (database schema)
- scripts: utility scripts like dummy data seeding
- postman: ready-to-import Postman files
- docs: testing guides and project docs

## 4. Layer Responsibilities

### Controller Layer

- Reads params/body/query
- Calls service function
- Returns consistent JSON response

### Service Layer

- Applies domain rules
- Validates business constraints
- Coordinates multi-step operations/transactions

### Repository Layer

- Handles database operations only
- Keeps Prisma queries separate from business logic

### Middleware Layer

- Authentication (JWT verification)
- Joi request validation
- Not found handling
- Global error normalization (including Prisma errors)

## 5. Database Schema Overview

Prisma models:

1. Location
2. Bin
3. SensorData
4. Alert
5. Vehicle
6. Driver
7. Route
8. Collection
9. Complaint
10. User

Enums:

- bin_status: FULL, NORMAL
- complaint_status: OPEN, CLOSED
- alert_status: PENDING, RESOLVED

Important relations:

- Location 1 -> many Bins
- Bin 1 -> many SensorData / Alerts / Complaints / Collections
- Vehicle 1 -> many Routes and linked Driver(s) (driver has unique vehicle_id)
- Driver + Vehicle -> Route
- Route -> many Collections

Schema source:

- prisma/schema.prisma

## 6. Environment Variables

Reference file:

- .env.example

Main values used by backend:

- NODE_ENV
- APP_PORT
- APP_HOST
- DATABASE_URL
- LOG_LEVEL
- JWT_SECRET
- JWT_EXPIRES_IN
- BIN_FULL_THRESHOLD
- SENSOR_OFFLINE_MINUTES
- SENSOR_OFFLINE_CHECK_INTERVAL_SECONDS

DATABASE_URL format:

	postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public

Example:

	postgresql://postgres:010200@127.0.0.1:5432/urbanbin_db?schema=public

## 7. Installation and Setup

1. Install dependencies

	npm install

2. Configure environment

	Copy .env.example to .env and update DATABASE_URL with your PostgreSQL password.

3. Generate Prisma client

	npx prisma generate

4. Create database and sync schema

	npx prisma db push

	This will automatically create the urbanbin_db database and all tables.

5. Seed dummy data

	npm run seed:dummy

6. Start server

	npm run dev

Default server URL:

- http://localhost:5000

## 8. Authentication

Signup endpoint creates a new user and returns JWT token.
Login endpoint returns JWT token for existing users.
Use token in all protected APIs:

	Authorization: Bearer <token>

Seeded admin user credentials:

- email: admin@urbanbin.com
- password: Admin@123

## 9. API Catalog

Base path: /api/v1

### Public Endpoints

1. GET /health
2. POST /auth/signup
3. POST /auth/login

### Protected Endpoints

Auth:

1. POST /auth/logout

Locations:

1. GET /locations
2. GET /locations/:id
3. POST /locations
4. PUT /locations/:id
5. DELETE /locations/:id

Bins:

1. GET /bins
2. GET /bins/:id
3. POST /bins
4. PUT /bins/:id
5. DELETE /bins/:id

Sensor Data:

1. POST /sensor-data

Alerts:

1. GET /alerts
2. GET /alerts/:bin_id
3. PATCH /alerts/:id

Vehicles:

1. GET /vehicles
2. GET /vehicles/:id
3. POST /vehicles
4. PUT /vehicles/:id

Drivers:

1. GET /drivers
2. GET /drivers/:id
3. POST /drivers
4. PUT /drivers/:id
5. DELETE /drivers/:id

Routes:

1. GET /routes
2. GET /routes/:id
3. POST /routes
4. DELETE /routes/:id

Analytics:

1. GET /analytics/kpi
2. GET /analytics/trends

Complaints:

1. POST /complaints (multipart/form-data, image optional)

### Request Body Examples

POST /auth/signup:

	{
	  "email": "user@example.com",
	  "password": "Pass@123",
	  "role": "admin"
	}

POST /auth/login:

	{
	  "email": "admin@urbanbin.com",
	  "password": "Admin@123"
	}

POST /locations:

	{
	  "area_name": "Downtown Sector",
	  "latitude": 28.6139,
	  "longitude": 77.2090
	}

POST /bins:

	{
	  "location_id": 1,
	  "capacity": 120,
	  "current_fill": 40
	}

POST /sensor-data:

	{
	  "bin_id": 1,
	  "fill_level": 85,
	  "temperature": 32.5,
	  "gas_level": 4.2,
	  "status": "OK"
	}

POST /vehicles:

	{
	  "vehicle_type": "Mini Truck",
	  "capacity": 500,
	  "is_ev": true,
	  "status": "ACTIVE"
	}

POST /drivers:

	{
	  "name": "Aman Singh",
	  "phone": "9000012345",
	  "license_number": "DL-1234",
	  "vehicle_id": 1
	}

POST /routes:

	{
	  "vehicle_id": 1,
	  "driver_id": 1,
	  "total_distance": 12.5
	}

POST /complaints (multipart/form-data):

	bin_id: 1
	description: Bad smell near bin
	reported_by: Resident A
	image: (optional file)

PATCH /alerts/:id:

	{
	  "status": "RESOLVED"
	}

## 10. Realtime Events (Socket.IO)

Server-side emits:

1. binUpdate
	- Trigger: sensor data ingestion updates bin state
	- Payload: { bin_id, fill_level, status }

2. sensorOffline
	- Trigger: offline monitor detects stale bins
	- Payload: { bin_id }

Socket files:

- src/sockets/socket.js
- src/sockets/offline_sensor.monitor.js

## 11. Validation and Error Handling

Validation:

- Joi schemas in src/validations
- request_validation.middleware validates body/params/query before controller execution

Error handling:

- AppError for domain errors
- Global error middleware maps known Prisma errors and returns uniform JSON shape

Typical error status codes:

- 400 validation/domain rule
- 401 unauthorized/invalid login
- 404 not found
- 409 conflict (duplicate email, vehicle already has driver)
- 500 internal server error

## 12. Seed and Test Data

Dummy seeding script:

- scripts/seed_dummy_data.cjs

Run command:

- npm run seed:dummy

It inserts linked data across all tables for API testing.

Seeded credentials:

- Admin: admin@urbanbin.com / Admin@123
- Operator: operator_<timestamp>@urbanbin.com / Operator@123

## 13. Postman and Testing Docs

Postman files:

- postman/UrbanBin_API.postman_collection.json
- postman/UrbanBin_Local.postman_environment.json

Testing guide:

- docs/API_TESTING_GUIDE.md

## 14. Useful Commands

- npm run dev
- npm start
- npm run prisma:generate
- npm run prisma:migrate
- npm run prisma:deploy
- npm run seed:dummy

Direct Prisma commands:

- npx prisma studio
- npx prisma db push
- npx prisma migrate dev --name <name>

## 15. Common Troubleshooting

### App says port already in use

- Stop old node process using that port or change APP_PORT.

### DB auth failed (P1000)

- Recheck DATABASE_URL username/password/port/database name.
- In pgAdmin run: ALTER USER postgres WITH PASSWORD 'your_password';
- Use 127.0.0.1 instead of localhost in DATABASE_URL.
- Restart PostgreSQL service: net stop postgresql-x64-18 && net start postgresql-x64-18

### Table does not exist

- Run npx prisma db push or run migrations.

### Login fails with invalid email/password

- Ensure user exists in users table and password hash is valid.
- Run npm run seed:dummy to create default admin user.

### Protected API returns 401

- Check Authorization header format: Bearer <token>
- Check token expiry (default 1d).

### Complaint image upload fails

- Image is optional. If sending multipart/form-data, field name must be "image".

## 16. What To Read First Later

If you revisit this project after a long time, read in this order:

1. prisma/schema.prisma
2. src/routes/index.routes.js
3. One complete module flow (example: bin.routes -> bin.controller -> bin.service -> bin.repository)
4. src/middlewares/error_handler.middleware.js
5. src/server.js

This gives you the fastest full-picture refresh.
