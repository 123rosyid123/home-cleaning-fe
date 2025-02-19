'use server';

import { apiLogin } from '@/services/authService';
import { LoginFormData } from '../auth/login/hook';
import { AxiosError } from 'axios';
import { createSession, createUserSession } from '@/lib/session';
import { buildSuccessResponse, buildErrorResponse } from '@/lib/apiResponse';

export const actionLogin = async (formData: LoginFormData) => {
  try {
    const response = await apiLogin(formData.email, formData.password);
    await Promise.all([
      createSession(response.data.token),
      createUserSession(response.data.user),
    ]);

    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};
