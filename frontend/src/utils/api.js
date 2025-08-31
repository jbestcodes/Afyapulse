import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

api.interceptors.request.use((config) => {
  // Do not send Authorization header for symptom analysis
  if (!config.url.includes('/api/symptom/analyze')) {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
