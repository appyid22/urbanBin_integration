const {
  get_all_locations,
  find_location_by_id,
  create_location,
  update_location,
  delete_location
} = require('../repositories/location.repository');
const { AppError } = require('../utils/app_error');

async function list_locations_service() {
  return get_all_locations();
}

async function get_location_by_id_service(location_id) {
  const location = await find_location_by_id(location_id);
  if (!location) {
    throw new AppError('Location not found', 404);
  }
  return location;
}

async function create_location_service(payload) {
  return create_location(payload);
}

async function update_location_service(location_id, payload) {
  const location = await find_location_by_id(location_id);
  if (!location) {
    throw new AppError('Location not found', 404);
  }
  return update_location(location_id, payload);
}

async function delete_location_service(location_id) {
  const location = await find_location_by_id(location_id);
  if (!location) {
    throw new AppError('Location not found', 404);
  }
  if (location.bins && location.bins.length > 0) {
    throw new AppError('Location cannot be deleted because it has linked bins', 400);
  }
  return delete_location(location_id);
}

module.exports = {
  list_locations_service,
  get_location_by_id_service,
  create_location_service,
  update_location_service,
  delete_location_service
};
