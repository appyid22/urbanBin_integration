export const adapt_kpi = (kpi = {}) => ({
  totalBins: kpi.total_bins ?? 0,
  binsAbove90: kpi.bins_full ?? 0,
  avgFillLevel: kpi.avg_fill_level ?? 0,
  routeDistance: kpi.active_routes ?? 0,
  estimatedTime: '--',
  fuelSaved: 0,
  evPercentage: 0,
  activeRoutes: kpi.active_routes ?? 0,
  collectionsToday: kpi.collections_today ?? 0,
  totalVehicles: kpi.total_vehicles ?? 0
});
