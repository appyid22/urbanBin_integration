import api from './api';

export const get_bins_request = async () => {
  const response = await api.get('/bins');
  return response.data;
};
