'use server';

import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiForgotPassword } from '@/services/authService';
import { AxiosError } from 'axios';

export async function actionForgotPassword(email: string) {
  try {
    const response = await apiForgotPassword(email);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}
