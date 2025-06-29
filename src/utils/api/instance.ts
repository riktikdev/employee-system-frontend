import fetches from '@siberiacancode/fetches';
import { getCookie } from '@siberiacancode/reactuse';

export const api = fetches.create({
  baseURL: 'http://localhost:5133',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie('token');

  if (config.headers && token) {
    config.headers['X-Session-Token'] = token;
  }

  return config;
});
