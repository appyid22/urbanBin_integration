const { logger } = require('../utils/logger');

function resolve_prisma_error(error) {
  if (!error || !error.code) {
    return null;
  }

  if (error.code === 'P2002') {
    return {
      status_code: 409,
      message: 'Unique constraint violation',
      error_code: 'UNIQUE_CONSTRAINT_ERROR'
    };
  }

  if (error.code === 'P2003') {
    return {
      status_code: 400,
      message: 'Foreign key constraint violation',
      error_code: 'FOREIGN_KEY_CONSTRAINT_ERROR'
    };
  }

  if (error.code === 'P2025') {
    return {
      status_code: 404,
      message: 'Record not found',
      error_code: 'RECORD_NOT_FOUND'
    };
  }

  return null;
}

function error_handler_middleware(error, req, res, next) {
  const prisma_error = resolve_prisma_error(error);

  const status_code = prisma_error?.status_code || error.status_code || 500;
  const message = prisma_error?.message || error.message || 'Internal server error';
  const error_code = prisma_error?.error_code || error.error_code || 'INTERNAL_ERROR';

  logger.error('Unhandled request error', {
    method: req.method,
    path: req.originalUrl,
    status_code,
    message,
    error_code
  });

  return res.status(status_code).json({
    success: false,
    message,
    error_code,
    errors: error.errors || null
  });
}

module.exports = { error_handler_middleware };
