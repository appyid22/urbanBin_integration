const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const suffix = Date.now();

  // Users
  const adminHash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@urbanbin.com' },
    update: { password_hash: adminHash, role: 'admin' },
    create: { email: 'admin@urbanbin.com', password_hash: adminHash, role: 'admin' }
  });

  const operatorEmail = `operator_${suffix}@urbanbin.com`;
  const operatorHash = await bcrypt.hash('Operator@123', 10);
  await prisma.user.create({
    data: {
      email: operatorEmail,
      password_hash: operatorHash,
      role: 'operator'
    }
  });

  // Locations
  const loc1 = await prisma.location.create({
    data: {
      area_name: `Downtown Sector ${suffix}`,
      latitude: 28.6139,
      longitude: 77.209
    }
  });

  const loc2 = await prisma.location.create({
    data: {
      area_name: `Riverside Block ${suffix}`,
      latitude: 28.5355,
      longitude: 77.391
    }
  });

  // Bins
  const bin1 = await prisma.bin.create({
    data: {
      location_id: loc1.location_id,
      capacity: 120,
      current_fill: 75,
      status: 'NORMAL',
      last_updated: new Date(now.getTime() - 10 * 60 * 1000)
    }
  });

  const bin2 = await prisma.bin.create({
    data: {
      location_id: loc2.location_id,
      capacity: 100,
      current_fill: 100,
      status: 'FULL',
      last_updated: new Date(now.getTime() - 40 * 60 * 1000)
    }
  });

  // Sensor Data
  await prisma.sensorData.createMany({
    data: [
      {
        bin_id: bin1.bin_id,
        fill_level: 75,
        temperature: 30.5,
        gas_level: 3.2,
        status: 'OK',
        timestamp: new Date(now.getTime() - 8 * 60 * 1000)
      },
      {
        bin_id: bin2.bin_id,
        fill_level: 100,
        temperature: 34.1,
        gas_level: 6.8,
        status: 'ALERT',
        timestamp: new Date(now.getTime() - 35 * 60 * 1000)
      }
    ]
  });

  // Alerts
  const alert1 = await prisma.alert.create({
    data: {
      bin_id: bin2.bin_id,
      status: 'PENDING',
      message: `Bin ${bin2.bin_id} is full and requires collection`
    }
  });

  await prisma.alert.create({
    data: {
      bin_id: bin1.bin_id,
      status: 'RESOLVED',
      message: `Routine check completed for bin ${bin1.bin_id}`
    }
  });

  // Vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      vehicle_type: 'Mini Truck',
      capacity: 500,
      is_ev: true,
      status: 'ACTIVE'
    }
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      vehicle_type: 'Compactor Van',
      capacity: 700,
      is_ev: false,
      status: 'ACTIVE'
    }
  });

  // Drivers (vehicle_id is unique in schema)
  const driver1 = await prisma.driver.create({
    data: {
      name: `Aman Driver ${suffix}`,
      phone: `90000${String(suffix).slice(-5)}`,
      license_number: `LIC-${suffix}-A`,
      vehicle_id: vehicle1.vehicle_id
    }
  });

  const driver2 = await prisma.driver.create({
    data: {
      name: `Riya Driver ${suffix}`,
      phone: `91111${String(suffix).slice(-5)}`,
      license_number: `LIC-${suffix}-B`,
      vehicle_id: vehicle2.vehicle_id
    }
  });

  // Routes
  const route1 = await prisma.route.create({
    data: {
      vehicle_id: vehicle1.vehicle_id,
      driver_id: driver1.driver_id,
      total_distance: 12.5,
      created_at: new Date(now.getTime() - 6 * 60 * 60 * 1000)
    }
  });

  const route2 = await prisma.route.create({
    data: {
      vehicle_id: vehicle2.vehicle_id,
      driver_id: driver2.driver_id,
      total_distance: 18.2,
      created_at: new Date(now.getTime() - 2 * 60 * 60 * 1000)
    }
  });

  // Collections
  await prisma.collection.createMany({
    data: [
      {
        route_id: route1.route_id,
        bin_id: bin1.bin_id,
        collected_at: new Date(now.getTime() - 5 * 60 * 60 * 1000),
        fill_level_before: 78
      },
      {
        route_id: route2.route_id,
        bin_id: bin2.bin_id,
        collected_at: new Date(now.getTime() - 90 * 60 * 1000),
        fill_level_before: 100
      }
    ]
  });

  // Complaints
  await prisma.complaint.createMany({
    data: [
      {
        bin_id: bin1.bin_id,
        reported_by: 'Resident A',
        description: 'Bad smell near the bin area',
        image_path: null,
        status: 'OPEN'
      },
      {
        bin_id: bin2.bin_id,
        reported_by: 'Shop Owner B',
        description: 'Bin overflowed during evening',
        image_path: null,
        status: 'CLOSED'
      }
    ]
  });

  const counts = {
    users: await prisma.user.count(),
    locations: await prisma.location.count(),
    bins: await prisma.bin.count(),
    sensor_data: await prisma.sensorData.count(),
    alerts: await prisma.alert.count(),
    vehicles: await prisma.vehicle.count(),
    drivers: await prisma.driver.count(),
    routes: await prisma.route.count(),
    collections: await prisma.collection.count(),
    complaints: await prisma.complaint.count()
  };

  console.log('DUMMY_DATA_INSERTED');
  console.table(counts);
  console.log('LATEST_IDS', {
    location_ids: [loc1.location_id, loc2.location_id],
    bin_ids: [bin1.bin_id, bin2.bin_id],
    vehicle_ids: [vehicle1.vehicle_id, vehicle2.vehicle_id],
    driver_ids: [driver1.driver_id, driver2.driver_id],
    route_ids: [route1.route_id, route2.route_id],
    pending_alert_id: alert1.alert_id,
    operator_email: operatorEmail,
    operator_password: 'Operator@123'
  });
}

main()
  .catch((error) => {
    console.error('SEED_FAILED', error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
