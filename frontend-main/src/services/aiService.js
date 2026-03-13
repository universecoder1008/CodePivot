import api from './api';

export const aiService = {
  sendPrompt: (payload) => api.post('/ai/chat', payload),
  getHistory: () => api.get('/ai/history'),
};
