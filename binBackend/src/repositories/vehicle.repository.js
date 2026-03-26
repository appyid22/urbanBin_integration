const { prisma } = require('../config/db');

async function get_all_vehicles() {
  return prisma.vehicle.findMany({
    orderBy: { vehicle_id: 'asc' },
    include: {
      drivers: true
    }
  });
}

async function find_vehicle_by_id(vehicle_id) {
  return prisma.vehicle.findUnique({
    where: { vehicle_id },
    include: {
      drivers: true
    }
  });
}

async function create_vehicle(payload) {
  return prisma.vehicle.create({
    data: payload,
    include: {
      drivers: true
    }
  });
}

async function update_vehicle(vehicle_id, payload) {
  return prisma.vehicle.update({
    where: { vehicle_id },
    data: payload,
    include: {
      drivers: true
    }
  });
}

module.exports = {
  get_all_vehicles,
  find_vehicle_by_id,
  create_vehicle,
  update_vehicle
};
