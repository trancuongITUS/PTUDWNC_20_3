import { LoginInput } from '../models/Login';
import { RegisterInput } from '../models/Register';
import { IGenericResponse } from './types';
import api from '../api';
import { ForgotPasswordInput } from '../models/ForgotPassword';
import { ChangePasswordInput } from '../models/ChangePassword';
import { UpdateUserInput } from '../models/UpdateUser';

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await api.post<IGenericResponse>('auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await api.post<IGenericResponse>('auth/login', user);
  return response.data;
};

export const forgotPasswordFn = async (mail: ForgotPasswordInput) => {
  const response = await api.post<IGenericResponse>('auth/forgot-password', mail);
  return response.data;
};

export const updateUserFn = async (user: UpdateUserInput) => {
  const response = await api.post<IGenericResponse>('users/update', user);
  return response.data;
};

export const changePasswordFn = async (pass: ChangePasswordInput) => {
  const response = await api.post<IGenericResponse>('auth/change-password ', pass);
  return response.data;
};

export const logoutUserFn = async (username?: string) => {
  const response = await api.post<IGenericResponse>('auth/logout', {
    username,
  });
  console.log(response.data)
  return response.data;
};

export const googleOAuthFn = async () => {
  const response = await api.get<IGenericResponse>('auth/google');
  return response.data;
}
