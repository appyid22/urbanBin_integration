const dotenv = require('dotenv');

dotenv.config();

const env = {
  node_env: process.env.NODE_ENV || 'development',
  app_port: Number(process.env.APP_PORT || 5000),
  app_host: process.env.APP_HOST || '0.0.0.0',
  database_url: process.env.DATABASE_URL || '',
  log_level: process.env.LOG_LEVEL || 'info',
  jwt_secret: process.env.JWT_SECRET || '',
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '1d',
  bin_full_threshold: Number(process.env.BIN_FULL_THRESHOLD || 80),
  sensor_offline_minutes: Number(process.env.SENSOR_OFFLINE_MINUTES || 30),
  sensor_offline_check_interval_seconds: Number(process.env.SENSOR_OFFLINE_CHECK_INTERVAL_SECONDS || 60)
};

if (!env.database_url) {
  console.warn('[WARN] DATABASE_URL is not set. DB operations will fail.');
}

if (!env.jwt_secret) {
  throw new Error('JWT_SECRET is required');
}

if (Number.isNaN(env.bin_full_threshold) || env.bin_full_threshold < 0) {
  throw new Error('BIN_FULL_THRESHOLD must be a non-negative number');
}

if (Number.isNaN(env.sensor_offline_minutes) || env.sensor_offline_minutes <= 0) {
  throw new Error('SENSOR_OFFLINE_MINUTES must be greater than 0');
}

if (
  Number.isNaN(env.sensor_offline_check_interval_seconds) ||
  env.sensor_offline_check_interval_seconds <= 0
) {
  throw new Error('SENSOR_OFFLINE_CHECK_INTERVAL_SECONDS must be greater than 0');
}

module.exports = { env };
