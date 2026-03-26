const { prisma } = require('../config/db');

async function get_all_drivers() {
  return prisma.driver.findMany({
    orderBy: { driver_id: 'asc' },
    include: { vehicle: true }
  });
}

async function find_driver_by_id(driver_id) {
  return prisma.driver.findUnique({
    where: { driver_id },
    include: { vehicle: true }
  });
}

async function find_driver_by_vehicle_id(vehicle_id) {
  return prisma.driver.findUnique({
    where: { vehicle_id }
  });
}

async function create_driver(payload) {
  return prisma.driver.create({
    data: payload,
    include: { vehicle: true }
  });
}

async function update_driver(driver_id, payload) {
  return prisma.driver.update({
    where: { driver_id },
    data: payload,
    include: { vehicle: true }
  });
}

async function delete_driver(driver_id) {
  return prisma.driver.delete({
    where: { driver_id }
  });
}

async function assign_driver_to_vehicle(driver_id, vehicle_id) {
  return prisma.driver.update({
    where: { driver_id },
    data: { vehicle_id }
  });
}

module.exports = {
  get_all_drivers,
  find_driver_by_id,
  find_driver_by_vehicle_id,
  create_driver,
  update_driver,
  delete_driver,
  assign_driver_to_vehicle
};
