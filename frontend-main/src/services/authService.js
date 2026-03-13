import api from './api';

export const authService = {
  login: (payload) => api.post('/auth/login', payload),
  signup: (payload) => api.post('/auth/signup', payload),
  profile: () => api.get('/auth/me'),
};
