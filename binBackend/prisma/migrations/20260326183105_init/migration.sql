-- CreateEnum
CREATE TYPE "bin_status" AS ENUM ('FULL', 'NORMAL');

-- CreateEnum
CREATE TYPE "complaint_status" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "alert_status" AS ENUM ('PENDING', 'RESOLVED');

-- CreateTable
CREATE TABLE "locations" (
    "location_id" SERIAL NOT NULL,
    "area_name" TEXT NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "bins" (
    "bin_id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "current_fill" INTEGER NOT NULL,
    "status" "bin_status" NOT NULL,
    "last_updated" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "bins_pkey" PRIMARY KEY ("bin_id")
);

-- CreateTable
CREATE TABLE "sensor_data" (
    "sensor_id" SERIAL NOT NULL,
    "bin_id" INTEGER NOT NULL,
    "fill_level" INTEGER NOT NULL,
    "temperature" DECIMAL(6,2) NOT NULL,
    "gas_level" DECIMAL(6,2) NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sensor_data_pkey" PRIMARY KEY ("sensor_id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "alert_id" SERIAL NOT NULL,
    "bin_id" INTEGER NOT NULL,
    "status" "alert_status" NOT NULL DEFAULT 'PENDING',
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("alert_id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "vehicle_id" SERIAL NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "is_ev" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "driver_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "license_number" TEXT NOT NULL,
    "vehicle_id" INTEGER NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("driver_id")
);

-- CreateTable
CREATE TABLE "routes" (
    "route_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "driver_id" INTEGER NOT NULL,
    "total_distance" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("route_id")
);

-- CreateTable
CREATE TABLE "collections" (
    "collection_id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "bin_id" INTEGER NOT NULL,
    "collected_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fill_level_before" INTEGER NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "complaints" (
    "complaint_id" SERIAL NOT NULL,
    "bin_id" INTEGER NOT NULL,
    "reported_by" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_path" TEXT,
    "status" "complaint_status" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("complaint_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "bins_location_id_idx" ON "bins"("location_id");

-- CreateIndex
CREATE INDEX "sensor_data_bin_id_idx" ON "sensor_data"("bin_id");

-- CreateIndex
CREATE INDEX "sensor_data_timestamp_idx" ON "sensor_data"("timestamp");

-- CreateIndex
CREATE INDEX "alerts_bin_id_idx" ON "alerts"("bin_id");

-- CreateIndex
CREATE INDEX "alerts_status_idx" ON "alerts"("status");

-- CreateIndex
CREATE INDEX "drivers_vehicle_id_idx" ON "drivers"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_vehicle_id_key" ON "drivers"("vehicle_id");

-- CreateIndex
CREATE INDEX "routes_vehicle_id_idx" ON "routes"("vehicle_id");

-- CreateIndex
CREATE INDEX "routes_driver_id_idx" ON "routes"("driver_id");

-- CreateIndex
CREATE INDEX "collections_route_id_idx" ON "collections"("route_id");

-- CreateIndex
CREATE INDEX "collections_bin_id_idx" ON "collections"("bin_id");

-- CreateIndex
CREATE INDEX "collections_collected_at_idx" ON "collections"("collected_at");

-- CreateIndex
CREATE INDEX "complaints_bin_id_idx" ON "complaints"("bin_id");

-- CreateIndex
CREATE INDEX "complaints_status_idx" ON "complaints"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bins" ADD CONSTRAINT "bins_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_bin_id_fkey" FOREIGN KEY ("bin_id") REFERENCES "bins"("bin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_bin_id_fkey" FOREIGN KEY ("bin_id") REFERENCES "bins"("bin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("route_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_bin_id_fkey" FOREIGN KEY ("bin_id") REFERENCES "bins"("bin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_bin_id_fkey" FOREIGN KEY ("bin_id") REFERENCES "bins"("bin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
