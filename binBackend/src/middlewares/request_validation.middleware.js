const { AppError } = require('../utils/app_error');

function request_validation_middleware(schema) {
  return (req, res, next) => {
    const payload = {
      body: req.body,
      params: req.params,
      query: req.query
    };

    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return next(
        new AppError(
          'Validation failed',
          400,
          'VALIDATION_ERROR',
          error.details.map((detail) => detail.message)
        )
      );
    }

    req.body = value.body;
    req.params = value.params;
    req.query = value.query;

    return next();
  };
}

module.exports = { request_validation_middleware };
