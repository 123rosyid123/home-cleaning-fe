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
  apiResendOtp,
  apiResetPassword,
  apiVerifyOtp,
} from '@/services/authService';
import { UserProfile } from '@/types/accountType';
import { AuthData } from '@/types/authType';
import { AxiosError } from 'axios';
import { LoginFormData } from '../auth/login/hook';
import { RegisterFormData } from '../auth/register/hook';
export async function actionForgotPassword(
  email: string
): Promise<SuccessResponse<null> | ErrorResponse> {
  try {
    const response = await apiForgotPassword(email);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export const actionLogin = async (
  formData: LoginFormData
): Promise<SuccessResponse<UserProfile> | ErrorResponse> => {
  try {
    const response = await apiLogin(formData.email, formData.password);

    await Promise.all([
      createSession(response.data.token),
      createUserSession(response.data.user as UserProfile),
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
      formData.confirmPassword,
      formData.phone
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
    const response = await apiResetPassword(token, email, password, passwordConfirmation);
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

export async function actionVerifyOtp(
  email: string,
  otp: string
): Promise<SuccessResponse<null> | ErrorResponse> {
  try {
    const response = await apiVerifyOtp(email, otp);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export async function actionResendOtp(
  email: string
): Promise<SuccessResponse<null> | ErrorResponse> {
  try {
    const response = await apiResendOtp(email);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}
