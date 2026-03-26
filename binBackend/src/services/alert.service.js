const { get_all_alerts, get_alerts_by_bin_id, find_alert_by_id, update_alert_status } = require('../repositories/alert.repository');
const { find_bin_by_id } = require('../repositories/bin.repository');
const { AppError } = require('../utils/app_error');

async function list_alerts_service() {
  return get_all_alerts();
}

async function get_alerts_by_bin_id_service(bin_id) {
  const bin = await find_bin_by_id(bin_id);
  if (!bin) {
    throw new AppError('Bin not found', 404);
  }

  return get_alerts_by_bin_id(bin_id);
}

async function update_alert_status_service(alert_id, status) {
  const alert = await find_alert_by_id(alert_id);
  if (!alert) {
    throw new AppError('Alert not found', 404);
  }

  return update_alert_status(alert_id, status);
}

module.exports = {
  list_alerts_service,
  get_alerts_by_bin_id_service,
  update_alert_status_service
};
