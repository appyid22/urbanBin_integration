const {
  get_all_routes,
  find_route_by_id,
  create_route,
  delete_route
} = require('../repositories/route.repository');
const { find_vehicle_by_id } = require('../repositories/vehicle.repository');
const { find_driver_by_id } = require('../repositories/driver.repository');
const { AppError } = require('../utils/app_error');

async function list_routes_service() {
  return get_all_routes();
}

async function get_route_by_id_service(route_id) {
  const route = await find_route_by_id(route_id);
  if (!route) {
    throw new AppError('Route not found', 404);
  }

  return route;
}

async function create_route_service(payload) {
  if (Number(payload.total_distance) <= 0) {
    throw new AppError('total_distance must be greater than 0', 400);
  }

  const vehicle = await find_vehicle_by_id(payload.vehicle_id);
  if (!vehicle) {
    throw new AppError('vehicle_id does not exist', 400);
  }

  const driver = await find_driver_by_id(payload.driver_id);
  if (!driver) {
    throw new AppError('driver_id does not exist', 400);
  }

  if (driver.vehicle_id !== payload.vehicle_id) {
    throw new AppError('driver_id is not mapped to vehicle_id', 400);
  }

  return create_route({
    vehicle_id: payload.vehicle_id,
    driver_id: payload.driver_id,
    total_distance: payload.total_distance,
    created_at: payload.created_at ? new Date(payload.created_at) : new Date()
  });
}

async function delete_route_service(route_id) {
  const route = await find_route_by_id(route_id);
  if (!route) {
    throw new AppError('Route not found', 404);
  }

  if (route.collections && route.collections.length > 0) {
    throw new AppError('Route cannot be deleted because it has linked collections', 400);
  }

  return delete_route(route_id);
}

module.exports = {
  list_routes_service,
  get_route_by_id_service,
  create_route_service,
  delete_route_service
};
