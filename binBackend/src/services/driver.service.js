const {
  get_all_drivers,
  find_driver_by_id,
  find_driver_by_vehicle_id,
  create_driver,
  update_driver,
  delete_driver
} = require('../repositories/driver.repository');
const { find_vehicle_by_id } = require('../repositories/vehicle.repository');
const { AppError } = require('../utils/app_error');

async function list_drivers_service() {
  return get_all_drivers();
}

async function get_driver_by_id_service(driver_id) {
  const driver = await find_driver_by_id(driver_id);
  if (!driver) {
    throw new AppError('Driver not found', 404);
  }
  return driver;
}

async function create_driver_service(payload) {
  const vehicle = await find_vehicle_by_id(payload.vehicle_id);
  if (!vehicle) {
    throw new AppError('vehicle_id does not exist', 400);
  }

  const existing = await find_driver_by_vehicle_id(payload.vehicle_id);
  if (existing) {
    throw new AppError('Vehicle already has a driver assigned', 409);
  }

  return create_driver(payload);
}

async function update_driver_service(driver_id, payload) {
  const driver = await find_driver_by_id(driver_id);
  if (!driver) {
    throw new AppError('Driver not found', 404);
  }

  if (payload.vehicle_id && payload.vehicle_id !== driver.vehicle_id) {
    const vehicle = await find_vehicle_by_id(payload.vehicle_id);
    if (!vehicle) {
      throw new AppError('vehicle_id does not exist', 400);
    }

    const existing = await find_driver_by_vehicle_id(payload.vehicle_id);
    if (existing && existing.driver_id !== driver_id) {
      throw new AppError('Vehicle already has a driver assigned', 409);
    }
  }

  return update_driver(driver_id, payload);
}

async function delete_driver_service(driver_id) {
  const driver = await find_driver_by_id(driver_id);
  if (!driver) {
    throw new AppError('Driver not found', 404);
  }
  return delete_driver(driver_id);
}

module.exports = {
  list_drivers_service,
  get_driver_by_id_service,
  create_driver_service,
  update_driver_service,
  delete_driver_service
};
