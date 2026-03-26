const {
  list_alerts_service,
  get_alerts_by_bin_id_service,
  update_alert_status_service
} = require('../services/alert.service');

async function list_alerts_controller(req, res) {
  const alerts = await list_alerts_service();

  return res.status(200).json({
    success: true,
    data: alerts
  });
}

async function get_alerts_by_bin_id_controller(req, res) {
  const bin_id = Number(req.params.bin_id);
  const alerts = await get_alerts_by_bin_id_service(bin_id);

  return res.status(200).json({
    success: true,
    data: alerts
  });
}

async function update_alert_status_controller(req, res) {
  const alert_id = Number(req.params.id);
  const updated = await update_alert_status_service(alert_id, req.body.status);

  return res.status(200).json({
    success: true,
    data: updated
  });
}

module.exports = {
  list_alerts_controller,
  get_alerts_by_bin_id_controller,
  update_alert_status_controller
};
