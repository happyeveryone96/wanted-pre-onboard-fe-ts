import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  config.headers!['Content-Type'] = 'application/json; charset=utf-8';
  return config;
});

export default instance;
