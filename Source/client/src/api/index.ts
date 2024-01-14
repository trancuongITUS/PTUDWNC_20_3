import { IGenericResponse } from './../services/types';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshAccessTokenFn = async () => {
  const response = await api.post<IGenericResponse>('auth/refresh');
  return response.data;
};

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.data.isAccessTokenExpired) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return api(originalRequest);
    }
    if (error.response.data.isAccessTokenExpired) {
      document.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
