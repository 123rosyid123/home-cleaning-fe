'use server';

import {
  buildErrorResponse,
  buildSuccessResponse,
  ErrorResponse,
  SuccessResponse,
} from '@/lib/apiResponse';
import { clearSession, createSession, createUserSession } from '@/lib/session';
import {
  apiForgotPassword,
  apiLogin,
  apiLogout,
  apiRegister,
  apiResetPassword,
} from '@/services/authService';
import { AuthData, User } from '@/types/authType';
import { AxiosError } from 'axios';
import { LoginFormData } from '../auth/login/hook';
import { RegisterFormData } from '../auth/register/hook';

export async function actionForgotPassword(email: string): Promise<SuccessResponse<null> | ErrorResponse> {
  try {
    const response = await apiForgotPassword(email);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export const actionLogin = async (
  formData: LoginFormData
): Promise<SuccessResponse<User> | ErrorResponse> => {
  try {
    const response = await apiLogin(formData.email, formData.password);

    await Promise.all([
      createSession(response.data.token),
      createUserSession(response.data.user),
    ]);

    return buildSuccessResponse(response.message, response.data.user);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};

export const actionRegister = async (
  formData: RegisterFormData
): Promise<SuccessResponse<AuthData> | ErrorResponse> => {
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
): Promise<SuccessResponse<null> | ErrorResponse> {
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

export async function actionLogout(): Promise<ErrorResponse | void> {
  try {
    await apiLogout();
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  } finally {
    await clearSession();
  }
}
