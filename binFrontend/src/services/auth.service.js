import api from './api';

export const login_request = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data?.data ?? null;
};

export const logout_request = async () => {
  const response = await api.post('/auth/logout');
  return response.data?.data ?? response.data;
};
