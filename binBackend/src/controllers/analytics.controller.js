const { get_kpi_service, get_trends_service } = require('../services/analytics.service');

async function get_kpi_controller(req, res) {
  const data = await get_kpi_service();

  return res.status(200).json({
    success: true,
    data
  });
}

async function get_trends_controller(req, res) {
  const data = await get_trends_service();

  return res.status(200).json({
    success: true,
    data
  });
}

module.exports = {
  get_kpi_controller,
  get_trends_controller
};
