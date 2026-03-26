const jwt = require('jsonwebtoken');

const { env } = require('../config/env');
const { AppError } = require('../utils/app_error');

function auth_middleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt_secret);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
}

module.exports = {
  auth_middleware
};
