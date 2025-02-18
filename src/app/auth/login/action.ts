'use server';

import { apiLogin } from '@/services/authService';
import { LoginFormData } from './hook';
import { getErrorMessage } from '@/lib/utils';
import { AxiosError } from 'axios';
import { createSession } from '@/lib/session';

export const actionLogin = async (formData: LoginFormData) => {
  try {
    const response = await apiLogin(formData.email, formData.password);
    await createSession(response.data.token);

    console.log(response);

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error as Error | AxiosError),
    };
  }
};
