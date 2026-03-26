const {
  count_total_bins,
  count_full_bins,
  count_total_vehicles,
  count_active_routes,
  average_fill_level,
  count_collections_today,
  get_sensor_trends
} = require('../repositories/analytics.repository');

function get_start_of_day() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

async function get_kpi_service() {
  const start_of_day = get_start_of_day();

  const [
    total_bins,
    bins_full,
    total_vehicles,
    active_routes,
    avg_fill_result,
    collections_today
  ] = await Promise.all([
    count_total_bins(),
    count_full_bins(),
    count_total_vehicles(),
    count_active_routes(start_of_day),
    average_fill_level(),
    count_collections_today(start_of_day)
  ]);

  return {
    total_bins,
    bins_full,
    total_vehicles,
    active_routes,
    avg_fill_level: avg_fill_result._avg.current_fill || 0,
    collections_today
  };
}

async function get_trends_service() {
  const trends = await get_sensor_trends();

  return trends.map((item) => ({
    time_bucket: item.time_bucket,
    avg_fill_level: item.avg_fill_level,
    avg_temperature: item.avg_temperature,
    avg_gas_level: item.avg_gas_level,
    samples_count: Number(item.samples_count)
  }));
}

module.exports = {
  get_kpi_service,
  get_trends_service
};
