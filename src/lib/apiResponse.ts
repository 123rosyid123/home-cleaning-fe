import { AxiosError } from 'axios';

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T | null;
};

export type ErrorResponse = {
  success: false;
  message: string;
  error: string;
};

export const getErrorMessage = (error: Error | AxiosError) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  return error.message;
};

const getErrorContext = (error: Error | AxiosError) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.errors || error.message;
  }
  return error.message;
};

export const buildSuccessResponse = <T>(
  message: string,
  data: T | null = null
): SuccessResponse<T> => {
  return {
    success: true,
    message: message,
    data: data,
  };
};

export const buildErrorResponse = (error: Error | AxiosError): ErrorResponse => {
  return {
    success: false,
    message: getErrorMessage(error),
    error: getErrorContext(error),
  };
};
