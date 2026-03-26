const {
  list_locations_service,
  get_location_by_id_service,
  create_location_service,
  update_location_service,
  delete_location_service
} = require('../services/location.service');

async function list_locations_controller(req, res) {
  const locations = await list_locations_service();
  return res.status(200).json({ success: true, data: locations });
}

async function get_location_by_id_controller(req, res) {
  const location = await get_location_by_id_service(Number(req.params.id));
  return res.status(200).json({ success: true, data: location });
}

async function create_location_controller(req, res) {
  const location = await create_location_service(req.body);
  return res.status(201).json({ success: true, data: location });
}

async function update_location_controller(req, res) {
  const location = await update_location_service(Number(req.params.id), req.body);
  return res.status(200).json({ success: true, data: location });
}

async function delete_location_controller(req, res) {
  await delete_location_service(Number(req.params.id));
  return res.status(200).json({ success: true, message: 'Location deleted successfully' });
}

module.exports = {
  list_locations_controller,
  get_location_by_id_controller,
  create_location_controller,
  update_location_controller,
  delete_location_controller
};
