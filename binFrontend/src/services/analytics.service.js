import api from './api';

export const get_kpi_request = async () => {
  const response = await api.get('/analytics/kpi');
  return response.data?.data ?? {};
};
