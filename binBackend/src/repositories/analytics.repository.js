const { prisma } = require('../config/db');

async function count_total_bins() {
  return prisma.bin.count();
}

async function count_full_bins() {
  return prisma.bin.count({
    where: { status: 'FULL' }
  });
}

async function count_total_vehicles() {
  return prisma.vehicle.count();
}

async function count_active_routes(start_of_day) {
  return prisma.route.count({
    where: {
      created_at: {
        gte: start_of_day
      }
    }
  });
}

async function average_fill_level() {
  return prisma.bin.aggregate({
    _avg: {
      current_fill: true
    }
  });
}

async function count_collections_today(start_of_day) {
  return prisma.collection.count({
    where: {
      collected_at: {
        gte: start_of_day
      }
    }
  });
}

async function get_sensor_trends() {
  return prisma.$queryRaw`
    SELECT
      DATE_TRUNC('hour', timestamp) AS time_bucket,
      AVG(fill_level)::float8 AS avg_fill_level,
      AVG(temperature)::float8 AS avg_temperature,
      AVG(gas_level)::float8 AS avg_gas_level,
      COUNT(*)::int AS samples_count
    FROM sensor_data
    GROUP BY DATE_TRUNC('hour', timestamp)
    ORDER BY time_bucket ASC
  `;
}

module.exports = {
  count_total_bins,
  count_full_bins,
  count_total_vehicles,
  count_active_routes,
  average_fill_level,
  count_collections_today,
  get_sensor_trends
};
