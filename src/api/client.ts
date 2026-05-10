import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:8000/api/v1',
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
