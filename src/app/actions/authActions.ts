'use server';

import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { clearSession, createSession, createUserSession } from '@/lib/session';
import {
  apiForgotPassword,
  apiLogin,
  apiLogout,
  apiRegister,
  apiResetPassword,
} from '@/services/authService';
import { AxiosError } from 'axios';
import { LoginFormData } from '../auth/login/hook';
import { RegisterFormData } from '../auth/register/hook';

export async function actionForgotPassword(email: string) {
  try {
    const response = await apiForgotPassword(email);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export const actionLogin = async (formData: LoginFormData, redirectUrl?: string) => {
  try {
    const response = await apiLogin(formData.email, formData.password);
    
    await Promise.all([
      createSession(response.data.token),
      createUserSession(response.data.user),
    ]);

    return buildSuccessResponse(response.message, { 
      ...response.data,
      redirectUrl: redirectUrl || '/booking'
    });
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};

export const actionRegister = async (formData: RegisterFormData) => {
  try {
    const response = await apiRegister(
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    await createSession(response.data.token);

    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};

export async function actionResetPassword(
  token: string,
  email: string,
  password: string,
  passwordConfirmation: string
) {
  try {
    const response = await apiResetPassword(
      token,
      email,
      password,
      passwordConfirmation
    );
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export async function actionLogout() {
  try {
    await apiLogout();
    await clearSession();
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}       