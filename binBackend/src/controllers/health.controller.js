function health_check_controller(req, res) {
  return res.status(200).json({
    status: 'ok',
    message: 'UrbanBin backend is running'
  });
}

module.exports = { health_check_controller };
