const {
  list_vehicles_service,
  get_vehicle_by_id_service,
  create_vehicle_service,
  update_vehicle_service
} = require('../services/vehicle.service');

async function list_vehicles_controller(req, res) {
  const vehicles = await list_vehicles_service();

  return res.status(200).json({
    success: true,
    data: vehicles
  });
}

async function get_vehicle_by_id_controller(req, res) {
  const vehicle_id = Number(req.params.id);
  const vehicle = await get_vehicle_by_id_service(vehicle_id);

  return res.status(200).json({
    success: true,
    data: vehicle
  });
}

async function create_vehicle_controller(req, res) {
  const vehicle = await create_vehicle_service(req.body);

  return res.status(201).json({
    success: true,
    data: vehicle
  });
}

async function update_vehicle_controller(req, res) {
  const vehicle_id = Number(req.params.id);
  const vehicle = await update_vehicle_service(vehicle_id, req.body);

  return res.status(200).json({
    success: true,
    data: vehicle
  });
}

module.exports = {
  list_vehicles_controller,
  get_vehicle_by_id_controller,
  create_vehicle_controller,
  update_vehicle_controller
};
