function not_found_middleware(req, res) {
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  });
}

module.exports = { not_found_middleware };
