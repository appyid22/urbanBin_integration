# UrbanBin API Testing Guide (Postman)

## 1. Prerequisites
- Backend running: `npm run dev`
- Server URL: `http://localhost:5001`
- Database connected and schema synced
- At least one valid user in `users` table for login

## 2. Import Files in Postman
1. Open Postman.
2. Click Import.
3. Import collection file: `postman/UrbanBin_API.postman_collection.json`.
4. Import environment file: `postman/UrbanBin_Local.postman_environment.json`.
5. Select environment `UrbanBin Local` from top-right environment selector.

## 3. Recommended Test Order
Run requests in this order to avoid dependency errors:
1. Health > Health Check
2. Auth > Login
3. Bins > Create Bin
4. Bins > List Bins
5. Bins > Get Bin By Id
6. Bins > Update Bin
7. Sensor Data > Create Sensor Data
8. Alerts > List Alerts
9. Vehicles > Create Vehicle
10. Vehicles > List Vehicles
11. Vehicles > Get Vehicle By Id
12. Vehicles > Update Vehicle
13. Analytics > Get KPI
14. Analytics > Get Trends
15. Complaints > Create Complaint
16. Auth > Logout

## 4. Token Handling
- The Login request includes a test script that stores JWT token automatically in collection variable `token`.
- All protected APIs use `Authorization: Bearer {{token}}`.

## 5. Important Data Requirements
- `Bins > Create Bin` requires an existing `location_id`.
- `Sensor Data > Create Sensor Data` requires an existing `bin_id`.
- `Routes > Create Route` requires valid `vehicle_id` and matching `driver_id`.
- `Complaints > Create Complaint` expects `multipart/form-data` and requires `image` file.

## 6. Common Status Codes
- `200`: Success (GET/PUT/PATCH/Logout)
- `201`: Created (POST create endpoints)
- `400`: Validation error / domain rule violation
- `401`: Missing or invalid token / invalid login credentials
- `404`: Resource not found
- `409`: Conflict (e.g., unique constraints)

## 7. Troubleshooting
- `EADDRINUSE`: Another process is using app port; stop old process or keep using port `5001`.
- `Authentication failed against database`: Check `DATABASE_URL` credentials in `.env`.
- `table does not exist`: Run Prisma schema sync (`npx prisma db push` or migrations).
- `location_id does not exist`: Create seed data for `locations` first.

## 8. Quick Smoke Test
1. Run Login and ensure token is set.
2. Run Create Bin and confirm `bin_id` gets stored.
3. Run Create Vehicle and confirm `vehicle_id` gets stored.
4. Run List Bins and List Vehicles; both should return `success: true`.

## 9. Optional Cleanup
- Run `Bins > Delete Bin` using created `bin_id` if you want to clean test data.
- For vehicles, update status (or remove manually via DB if needed).
