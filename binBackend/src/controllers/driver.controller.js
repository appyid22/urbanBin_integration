const {
  list_drivers_service,
  get_driver_by_id_service,
  create_driver_service,
  update_driver_service,
  delete_driver_service
} = require('../services/driver.service');

async function list_drivers_controller(req, res) {
  const drivers = await list_drivers_service();
  return res.status(200).json({ success: true, data: drivers });
}

async function get_driver_by_id_controller(req, res) {
  const driver = await get_driver_by_id_service(Number(req.params.id));
  return res.status(200).json({ success: true, data: driver });
}

async function create_driver_controller(req, res) {
  const driver = await create_driver_service(req.body);
  return res.status(201).json({ success: true, data: driver });
}

async function update_driver_controller(req, res) {
  const driver = await update_driver_service(Number(req.params.id), req.body);
  return res.status(200).json({ success: true, data: driver });
}

async function delete_driver_controller(req, res) {
  await delete_driver_service(Number(req.params.id));
  return res.status(200).json({ success: true, message: 'Driver deleted successfully' });
}

module.exports = {
  list_drivers_controller,
  get_driver_by_id_controller,
  create_driver_controller,
  update_driver_controller,
  delete_driver_controller
};
