const to_number = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const adapt_bin = (bin) => {
  const id = bin.bin_id ?? bin.id;
  const fill_level = bin.current_fill ?? bin.fill_level ?? bin.fillLevel ?? 0;
  const latitude = to_number(bin.location?.latitude ?? bin.lat ?? bin.latitude);
  const longitude = to_number(bin.location?.longitude ?? bin.lng ?? bin.longitude);

  return {
    id,
    locationId: bin.location_id ?? bin.locationId ?? null,
    capacity: bin.capacity ?? 0,
    fillLevel: fill_level,
    status: fill_level >= 90 ? 'Alert' : 'Normal',
    lastUpdated: bin.last_updated ?? bin.lastUpdated ?? null,
    lat: latitude,
    lng: longitude,
    address: bin.location?.area_name ?? bin.address ?? '',
    zone: bin.location?.area_name ?? bin.zone ?? 'Unknown',
    name: `Bin #${id}`
  };
};

export const adapt_bins = (bins = []) => bins.map(adapt_bin);
