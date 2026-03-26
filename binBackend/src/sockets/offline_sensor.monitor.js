const { prisma } = require('../config/db');
const { logger } = require('../utils/logger');
const { emit_sensor_offline } = require('./socket');

function start_offline_sensor_monitor(config) {
  const { sensor_offline_minutes, sensor_offline_check_interval_seconds } = config;
  const emitted_offline_bins = new Set();

  const check_offline_sensors = async () => {
    try {
      const threshold_time = new Date(Date.now() - sensor_offline_minutes * 60 * 1000);

      const offline_bins = await prisma.bin.findMany({
        where: {
          last_updated: {
            lt: threshold_time
          }
        },
        select: {
          bin_id: true
        }
      });

      const current_offline_bin_ids = new Set(offline_bins.map((bin) => bin.bin_id));

      for (const bin of offline_bins) {
        if (!emitted_offline_bins.has(bin.bin_id)) {
          emit_sensor_offline({ bin_id: bin.bin_id });
          emitted_offline_bins.add(bin.bin_id);
        }
      }

      for (const tracked_bin_id of emitted_offline_bins) {
        if (!current_offline_bin_ids.has(tracked_bin_id)) {
          emitted_offline_bins.delete(tracked_bin_id);
        }
      }
    } catch (error) {
      logger.error('Offline sensor monitor failed', { error_message: error.message });
    }
  };

  const interval_id = setInterval(check_offline_sensors, sensor_offline_check_interval_seconds * 1000);
  interval_id.unref();

  logger.info('Offline sensor monitor started', {
    sensor_offline_minutes,
    sensor_offline_check_interval_seconds
  });

  check_offline_sensors();

  return () => {
    clearInterval(interval_id);
    logger.info('Offline sensor monitor stopped');
  };
}

module.exports = {
  start_offline_sensor_monitor
};
