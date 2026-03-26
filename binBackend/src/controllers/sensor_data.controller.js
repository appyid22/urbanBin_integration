const { create_sensor_data_service } = require('../services/sensor_data.service');

async function create_sensor_data_controller(req, res) {
  const result = await create_sensor_data_service(req.body);

  return res.status(201).json({
    success: true,
    data: result
  });
}

module.exports = {
  create_sensor_data_controller
};
