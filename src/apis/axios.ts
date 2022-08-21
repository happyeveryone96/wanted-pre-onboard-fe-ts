import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production',
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
