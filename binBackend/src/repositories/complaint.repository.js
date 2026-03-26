const { prisma } = require('../config/db');

async function create_complaint(payload) {
  return prisma.complaint.create({
    data: payload
  });
}

module.exports = {
  create_complaint
};
