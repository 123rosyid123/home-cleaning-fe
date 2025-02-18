'use server';

import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiResetPassword } from '@/services/authService';
import { AxiosError } from 'axios';

export async function actionResetPassword(token: string, email: string, password: string, passwordConfirmation: string) {
  try {
    const response = await apiResetPassword(token, email, password, passwordConfirmation);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}
