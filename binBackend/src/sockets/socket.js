const { Server } = require('socket.io');

let io_instance = null;

function initialize_socket(server) {
  io_instance = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io_instance.on('connection', (socket) => {
    socket.on('disconnect', () => {
      return null;
    });
  });

  return io_instance;
}

function get_io() {
  return io_instance;
}

function emit_bin_update(payload) {
  if (!io_instance) {
    return;
  }

  io_instance.emit('binUpdate', payload);
}

function emit_sensor_offline(payload) {
  if (!io_instance) {
    return;
  }

  io_instance.emit('sensorOffline', payload);
}

module.exports = {
  initialize_socket,
  get_io,
  emit_bin_update,
  emit_sensor_offline
};
