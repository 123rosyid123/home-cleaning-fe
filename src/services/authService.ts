import httpClient from '@/lib/httpClient';
import {
  ForgotPasswordResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  ResetPasswordResponse,
} from '@/types/authType';

export const apiLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await httpClient.post('/v1/auth/login', { email, password });
  return response.data;
};

export const apiRegister = async (
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<RegisterResponse> => {
  const response = await httpClient.post('/v1/auth/register', {
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
  return response.data;
};

export const apiForgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  const response = await httpClient.post('/v1/auth/forgot-password', { email });
  return response.data;
};

export const apiResetPassword = async (
  token: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<ResetPasswordResponse> => {
  const response = await httpClient.post('/v1/auth/reset-password', {
    token,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
  return response.data;
};

export const apiLogout = async (): Promise<LogoutResponse> => {
  const response = await httpClient.post('/v1/auth/logout');
  return response.data;
};
  