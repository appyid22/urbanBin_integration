const { prisma } = require('../config/db');

async function get_all_locations() {
  return prisma.location.findMany({
    orderBy: { location_id: 'asc' },
    include: { bins: true }
  });
}

async function find_location_by_id(location_id) {
  return prisma.location.findUnique({
    where: { location_id },
    include: { bins: true }
  });
}

async function create_location(payload) {
  return prisma.location.create({ data: payload });
}

async function update_location(location_id, payload) {
  return prisma.location.update({
    where: { location_id },
    data: payload
  });
}

async function delete_location(location_id) {
  return prisma.location.delete({ where: { location_id } });
}

module.exports = {
  get_all_locations,
  find_location_by_id,
  create_location,
  update_location,
  delete_location
};
