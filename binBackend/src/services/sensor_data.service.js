const { prisma } = require('../config/db');
const { env } = require('../config/env');
const { create_sensor_data } = require('../repositories/sensor_data.repository');
const { find_pending_alert_for_bin_tx, create_alert_tx } = require('../repositories/alert.repository');
const { AppError } = require('../utils/app_error');
const { emit_bin_update } = require('../sockets/socket');

async function create_sensor_data_service(payload) {
  const result = await prisma.$transaction(async (tx) => {
    const bin = await tx.bin.findUnique({
      where: { bin_id: payload.bin_id }
    });

    if (!bin) {
      throw new AppError('bin_id does not exist', 400);
    }

    const resolved_status = payload.fill_level >= env.bin_full_threshold ? 'FULL' : 'NORMAL';
    const event_timestamp = payload.timestamp ? new Date(payload.timestamp) : new Date();

    const sensor_row = await create_sensor_data(tx, {
      bin_id: payload.bin_id,
      fill_level: payload.fill_level,
      temperature: payload.temperature,
      gas_level: payload.gas_level,
      status: payload.status,
      timestamp: event_timestamp
    });

    const updated_bin = await tx.bin.update({
      where: { bin_id: payload.bin_id },
      data: {
        current_fill: payload.fill_level,
        status: resolved_status,
        last_updated: event_timestamp
      }
    });

    if (resolved_status === 'FULL') {
      const existing_pending_alert = await find_pending_alert_for_bin_tx(tx, payload.bin_id);

      if (!existing_pending_alert) {
        await create_alert_tx(tx, {
          bin_id: payload.bin_id,
          status: 'PENDING',
          message: `Bin ${payload.bin_id} is FULL`
        });
      }
    }

    return {
      sensor_data: sensor_row,
      bin: updated_bin,
      status: resolved_status
    };
  });

  emit_bin_update({
    bin_id: result.bin.bin_id,
    fill_level: result.sensor_data.fill_level,
    status: result.status
  });

  return result;
}

module.exports = {
  create_sensor_data_service
};
