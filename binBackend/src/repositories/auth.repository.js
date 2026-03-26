const { prisma } = require('../config/db');

async function find_user_by_email(email) {
  return prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive'
      }
    }
  });
}

async function create_user(payload) {
  return prisma.user.create({
    data: payload
  });
}

module.exports = {
  find_user_by_email,
  create_user
};
