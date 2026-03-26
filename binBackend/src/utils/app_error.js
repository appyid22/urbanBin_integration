class AppError extends Error {
  constructor(message, status_code = 500, error_code = 'APP_ERROR', errors = null) {
    super(message);
    this.name = 'AppError';
    this.status_code = status_code;
    this.error_code = error_code;
    this.errors = errors;
  }
}

module.exports = { AppError };
