import axios from 'axios';
import { refreshJWT } from '@/service/auth';
import { getJWTCookie, setJWTCookie } from '@/service/cookie';

const instance = axios.create({
  baseURL: 'https://api.dimigo.in',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getJWTCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const status = error.response.status;

      console.error(`Error ${status}: ${error.response.data.message || 'No error message provided'}`);

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const data = await refreshJWT();
          if (data.access_token) {
            setJWTCookie(data.access_token);
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error('JWT refresh failed:', refreshError);
        }
        window.location.href = '/login';
        return Promise.reject(new Error('Authentication failed'));
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  },
);

export default instance;