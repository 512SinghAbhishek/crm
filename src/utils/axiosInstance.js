import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/crm/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Token expired or unauthorized. Logging out.');
      store.dispatch(logout());
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
