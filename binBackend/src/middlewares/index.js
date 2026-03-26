const { error_handler_middleware } = require('./error_handler.middleware');
const { not_found_middleware } = require('./not_found.middleware');
const { request_validation_middleware } = require('./request_validation.middleware');

module.exports = {
  error_handler_middleware,
  not_found_middleware,
  request_validation_middleware
};
