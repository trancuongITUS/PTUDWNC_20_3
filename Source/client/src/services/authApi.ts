import { LoginInput } from '../models/Login';
import { RegisterInput } from '../models/Register';
import { GenericResponse, ILoginResponse, IUser } from './types';
import api from '../api';
import { ForgotPasswordInput } from '../models/ForgotPassword';

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await api.post<GenericResponse>('auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await api.post<ILoginResponse>('auth/login', user);
  return response.data;
};

export const forgotPasswordFn = async (mail: ForgotPasswordInput) => {
  const response = await api.post<ILoginResponse>('auth/forgot-password', mail);
  return response.data;
};

export const updateUserFn = async (user: IUser) => {
  const response = await api.post<ILoginResponse>('users/update', user);
  return response.data;
};

export const logoutUserFn = async (username?: string) => {
  const response = await api.post<GenericResponse>('auth/logout', {
    username,
  });
  return response.data;
};
