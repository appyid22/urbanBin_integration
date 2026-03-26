const { get_all_bins, find_bin_by_id, create_bin, update_bin, delete_bin } = require('../repositories/bin.repository');
const { find_location_by_id } = require('../repositories/location.repository');
const { AppError } = require('../utils/app_error');

function resolve_bin_status(current_fill, capacity) {
  return current_fill >= capacity ? 'FULL' : 'NORMAL';
}

async function list_bins_service() {
  return get_all_bins();
}

async function get_bin_by_id_service(bin_id) {
  const bin = await find_bin_by_id(bin_id);
  if (!bin) {
    throw new AppError('Bin not found', 404);
  }

  return bin;
}

async function create_bin_service(payload) {
  const location = await find_location_by_id(payload.location_id);
  if (!location) {
    throw new AppError('location_id does not exist', 400);
  }

  if (payload.current_fill > payload.capacity) {
    throw new AppError('current_fill cannot be greater than capacity', 400);
  }

  const status = resolve_bin_status(payload.current_fill, payload.capacity);

  return create_bin({
    location_id: payload.location_id,
    capacity: payload.capacity,
    current_fill: payload.current_fill,
    status,
    last_updated: payload.last_updated ? new Date(payload.last_updated) : new Date()
  });
}

async function update_bin_service(bin_id, payload) {
  const existing_bin = await find_bin_by_id(bin_id);
  if (!existing_bin) {
    throw new AppError('Bin not found', 404);
  }

  if (payload.location_id) {
    const location = await find_location_by_id(payload.location_id);
    if (!location) {
      throw new AppError('location_id does not exist', 400);
    }
  }

  const next_capacity = payload.capacity ?? existing_bin.capacity;
  const next_current_fill = payload.current_fill ?? existing_bin.current_fill;

  if (next_current_fill > next_capacity) {
    throw new AppError('current_fill cannot be greater than capacity', 400);
  }

  const status = resolve_bin_status(next_current_fill, next_capacity);

  return update_bin(bin_id, {
    ...payload,
    capacity: next_capacity,
    current_fill: next_current_fill,
    status,
    last_updated: payload.last_updated ? new Date(payload.last_updated) : new Date()
  });
}

async function delete_bin_service(bin_id) {
  const existing_bin = await find_bin_by_id(bin_id);
  if (!existing_bin) {
    throw new AppError('Bin not found', 404);
  }

  return delete_bin(bin_id);
}

module.exports = {
  list_bins_service,
  get_bin_by_id_service,
  create_bin_service,
  update_bin_service,
  delete_bin_service
};
