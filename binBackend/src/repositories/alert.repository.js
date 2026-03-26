const { prisma } = require('../config/db');

async function get_all_alerts() {
  return prisma.alert.findMany({
    orderBy: { alert_id: 'desc' },
    include: {
      bin: true
    }
  });
}

async function get_alerts_by_bin_id(bin_id) {
  return prisma.alert.findMany({
    where: { bin_id },
    orderBy: { alert_id: 'desc' },
    include: {
      bin: true
    }
  });
}

async function find_alert_by_id(alert_id) {
  return prisma.alert.findUnique({
    where: { alert_id }
  });
}

async function update_alert_status(alert_id, status) {
  return prisma.alert.update({
    where: { alert_id },
    data: { status }
  });
}

async function find_pending_alert_for_bin_tx(tx, bin_id) {
  return tx.alert.findFirst({
    where: {
      bin_id,
      status: 'PENDING'
    }
  });
}

async function create_alert_tx(tx, payload) {
  return tx.alert.create({
    data: payload
  });
}

module.exports = {
  get_all_alerts,
  get_alerts_by_bin_id,
  find_alert_by_id,
  update_alert_status,
  find_pending_alert_for_bin_tx,
  create_alert_tx
};
