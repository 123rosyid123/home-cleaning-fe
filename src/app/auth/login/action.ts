'use server';

import { apiLogin } from '@/services/authService';
import { LoginFormData } from './hook';
import { AxiosError } from 'axios';
import { createSession } from '@/lib/session';
import { buildSuccessResponse, buildErrorResponse } from '@/lib/apiResponse';

export const actionLogin = async (formData: LoginFormData) => {
  try {
    const response = await apiLogin(formData.email, formData.password);
    await createSession(response.data.token);

    return buildSuccessResponse('Login successful', response.data);
  } catch (error) {
    return buildErrorResponse('Login failed', error as Error | AxiosError);
  }
};
