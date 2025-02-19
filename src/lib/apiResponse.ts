import { AxiosError } from 'axios';

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
  result: T | null = null
) => {
  return {
    success: true,
    message: message,
    result: result,
  };
};

export const buildErrorResponse = (
  error: Error | AxiosError
) => {
  return {
    success: false,
    message: getErrorMessage(error),
    error: getErrorContext(error),
  };
};
