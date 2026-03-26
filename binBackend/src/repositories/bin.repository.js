const { prisma } = require('../config/db');

async function get_all_bins() {
  return prisma.bin.findMany({
    orderBy: { bin_id: 'asc' },
    include: {
      location: {
        select: {
          location_id: true,
          area_name: true,
          latitude: true,
          longitude: true
        }
      }
    }
  });
}

async function find_bin_by_id(bin_id) {
  return prisma.bin.findUnique({
    where: { bin_id },
    include: {
      location: {
        select: {
          location_id: true,
          area_name: true,
          latitude: true,
          longitude: true
        }
      }
    }
  });
}

async function create_bin(payload) {
  return prisma.bin.create({
    data: payload
  });
}

async function update_bin(bin_id, payload) {
  return prisma.bin.update({
    where: { bin_id },
    data: payload
  });
}

async function delete_bin(bin_id) {
  return prisma.bin.delete({
    where: { bin_id }
  });
}

module.exports = {
  get_all_bins,
  find_bin_by_id,
  create_bin,
  update_bin,
  delete_bin
};
