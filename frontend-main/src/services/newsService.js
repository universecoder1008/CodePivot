import api from './api';

export const newsService = {
  fetchNews: (params) => api.get('/news', { params }),
};
