async function create_sensor_data(tx, payload) {
  return tx.sensorData.create({
    data: payload
  });
}

module.exports = {
  create_sensor_data
};
