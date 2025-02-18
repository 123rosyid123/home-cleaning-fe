'use server';

import { createSession } from '@/lib/session';
import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiRegister } from '@/services/authService';
import { AxiosError } from 'axios';
import { RegisterFormData } from './hook';

export const actionRegister = async (formData: RegisterFormData) => {
  try {
    const response = await apiRegister(
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    await createSession(response.data.token);

    return buildSuccessResponse('Registration successful', response.data);
  } catch (error) {
    return buildErrorResponse('Registration failed', error as Error | AxiosError);
  }
};
