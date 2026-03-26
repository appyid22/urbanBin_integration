const {
  get_all_vehicles,
  find_vehicle_by_id,
  create_vehicle,
  update_vehicle
} = require('../repositories/vehicle.repository');
const {
  find_driver_by_id,
  find_driver_by_vehicle_id,
  assign_driver_to_vehicle
} = require('../repositories/driver.repository');
const { AppError } = require('../utils/app_error');

async function list_vehicles_service() {
  return get_all_vehicles();
}

async function get_vehicle_by_id_service(vehicle_id) {
  const vehicle = await find_vehicle_by_id(vehicle_id);
  if (!vehicle) {
    throw new AppError('Vehicle not found', 404);
  }

  return vehicle;
}

async function create_vehicle_service(payload) {
  if (payload.capacity <= 0) {
    throw new AppError('capacity must be greater than 0', 400);
  }

  const { driver_id, ...vehicle_payload } = payload;

  if (driver_id) {
    const driver = await find_driver_by_id(driver_id);
    if (!driver) {
      throw new AppError('driver_id does not exist', 400);
    }
  }

  const vehicle = await create_vehicle(vehicle_payload);

  if (driver_id) {
    const existing_vehicle_driver = await find_driver_by_vehicle_id(vehicle.vehicle_id);
    if (existing_vehicle_driver && existing_vehicle_driver.driver_id !== driver_id) {
      throw new AppError('Vehicle already has a driver assigned', 400);
    }

    await assign_driver_to_vehicle(driver_id, vehicle.vehicle_id);
  }

  return get_vehicle_by_id_service(vehicle.vehicle_id);
}

async function update_vehicle_service(vehicle_id, payload) {
  const existing_vehicle = await find_vehicle_by_id(vehicle_id);
  if (!existing_vehicle) {
    throw new AppError('Vehicle not found', 404);
  }

  const { driver_id, ...vehicle_payload } = payload;
  const next_capacity = vehicle_payload.capacity ?? existing_vehicle.capacity;

  if (next_capacity <= 0) {
    throw new AppError('capacity must be greater than 0', 400);
  }

  if (driver_id) {
    const driver = await find_driver_by_id(driver_id);
    if (!driver) {
      throw new AppError('driver_id does not exist', 400);
    }
  }

  await update_vehicle(vehicle_id, {
    ...vehicle_payload,
    capacity: next_capacity
  });

  if (driver_id) {
    const existing_vehicle_driver = await find_driver_by_vehicle_id(vehicle_id);
    if (existing_vehicle_driver && existing_vehicle_driver.driver_id !== driver_id) {
      throw new AppError('Vehicle already has a different driver assigned', 400);
    }

    await assign_driver_to_vehicle(driver_id, vehicle_id);
  }

  return get_vehicle_by_id_service(vehicle_id);
}

module.exports = {
  list_vehicles_service,
  get_vehicle_by_id_service,
  create_vehicle_service,
  update_vehicle_service
};
