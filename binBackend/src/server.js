const http = require('http');

const app = require('./app');
const { env } = require('./config/env');
const { connect_db, disconnect_db } = require('./config/db');
const { logger } = require('./utils/logger');
const { initialize_socket } = require('./sockets/socket');
const { start_offline_sensor_monitor } = require('./sockets/offline_sensor.monitor');

async function bootstrap() {
  try {
    await connect_db();
  } catch (db_error) {
    logger.warn('Database connection failed. Server will start but DB operations will fail.', {
      error_message: db_error.message
    });
  }

  const http_server = http.createServer(app);
  initialize_socket(http_server);
  const stop_offline_monitor = start_offline_sensor_monitor(env);
  let is_shutting_down = false;

  const server = http_server.listen(env.app_port, env.app_host, () => {
    logger.info(`Server running at http://${env.app_host}:${env.app_port}`);
  });

  server.on('error', async (error) => {
    if (is_shutting_down) {
      return;
    }

    is_shutting_down = true;
    if (error.code === 'EADDRINUSE') {
      logger.error('Server failed to start: port already in use', {
        app_host: env.app_host,
        app_port: env.app_port,
      });
    } else {
      logger.error('Server failed to start', { error_message: error.message });
    }

    stop_offline_monitor();
    await disconnect_db();
    process.exit(1);
  });

  const graceful_shutdown = async (signal) => {
    if (is_shutting_down) {
      return;
    }

    is_shutting_down = true;
    logger.info(`${signal} received. Closing server...`);
    stop_offline_monitor();
    server.close(async () => {
      await disconnect_db();
      logger.info('Server closed cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => graceful_shutdown('SIGINT'));
  process.on('SIGTERM', () => graceful_shutdown('SIGTERM'));
}

bootstrap().catch(async (error) => {
  logger.error('Application bootstrap failed', { error_message: error.message });
  await disconnect_db();
  process.exit(1);
});
