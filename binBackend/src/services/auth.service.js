const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { env } = require('../config/env');
const { find_user_by_email, create_user } = require('../repositories/auth.repository');
const { AppError } = require('../utils/app_error');

async function signup_service(payload) {
  const { email, password, role = 'admin' } = payload;

  const existing = await find_user_by_email(email);
  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = await create_user({ email, password_hash, role });

  const token = jwt.sign(
    { user_id: user.user_id, email: user.email, role: user.role },
    env.jwt_secret,
    { expiresIn: env.jwt_expires_in }
  );

  return {
    token,
    user: { user_id: user.user_id, email: user.email, role: user.role }
  };
}

async function login_service(payload) {
  const email = payload.email.trim().toLowerCase();
  const password = payload.password;

  const user = await find_user_by_email(email);
  console.log('QUERY EMAIL:', email);
  console.log('QUERY RESULT:', user);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const is_password_valid = await bcrypt.compare(password, user.password_hash);
  if (!is_password_valid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      role: user.role
    },
    env.jwt_secret,
    { expiresIn: env.jwt_expires_in }
  );

  return {
    token,
    user: {
      user_id: user.user_id,
      email: user.email,
      role: user.role
    }
  };
}

function logout_service() {
  return {
    message: 'Logout successful. Please delete token on client side.'
  };
}

module.exports = {
  signup_service,
  login_service,
  logout_service
};
