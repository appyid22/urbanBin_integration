const { prisma } = require('../config/db');

async function get_all_routes() {
  return prisma.route.findMany({
    orderBy: { route_id: 'asc' },
    include: {
      vehicle: true,
      driver: true,
      collections: true
    }
  });
}

async function find_route_by_id(route_id) {
  return prisma.route.findUnique({
    where: { route_id },
    include: {
      vehicle: true,
      driver: true,
      collections: true
    }
  });
}

async function create_route(payload) {
  return prisma.route.create({
    data: payload,
    include: {
      vehicle: true,
      driver: true,
      collections: true
    }
  });
}

async function delete_route(route_id) {
  return prisma.route.delete({
    where: { route_id }
  });
}

module.exports = {
  get_all_routes,
  find_route_by_id,
  create_route,
  delete_route
};
