'use server';

import { apiRegister } from '@/services/authService';
import { RegisterFormData } from './hook';
import { getErrorMessage } from '@/lib/utils';
import { AxiosError } from 'axios';
import { createSession } from '@/lib/session';
export const actionRegister = async (formData: RegisterFormData) => {
  try {
    const response = await apiRegister(
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    await createSession(response.data.token);

    return {
      success: true,
      message: 'Registration successful',
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error as Error | AxiosError),
    };
  }
};
