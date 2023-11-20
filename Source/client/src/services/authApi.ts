import axios from 'axios';
import { LoginInput } from '../pages/Login.page';
import { RegisterInput } from '../pages/Register.page';
import { GenericResponse, ILoginResponse, IUser } from './types';

const BASE_URL = 'http://127.0.0.1:8080/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAccessTokenFn = async () => {
  const response = await authApi.post<ILoginResponse>('auth/refresh');
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.isAccessTokenExpired) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return authApi(originalRequest);
    }
    if (error.response.data.isAccessTokenExpired) {      
      document.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>('auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>('auth/login', user);
  return response.data;
};

export const updateUserFn = async (user: IUser) => {
  const response = await authApi.post<ILoginResponse>('users/update', user);
  return response.data;
};

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const logoutUserFn = async (username?: string) => {
  const response = await authApi.post<GenericResponse>('auth/logout', { username } );
  return response.data;
};
