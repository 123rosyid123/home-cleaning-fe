import { toast } from 'sonner';

export type APIError = {
  message?: string;
  error?: Record<string, string | string[]>;
};

export const toastError = (error: Error | APIError) => {
  const UNAUTHENTICATED_ERROR = 'Unauthenticated.';
  try {
    const errorObj = JSON.parse((error as Error)?.message);
    const firstError = Object.values(errorObj.error || {})[0];

    // Check if error message is "Unauthenticated"
    if (errorObj.message === UNAUTHENTICATED_ERROR) {
      window.location.href = '/logout';
      return;
    }

    toast.error(Array.isArray(firstError) ? firstError[0] : 'Something went wrong');
  } catch {
    const errorMessage = (error as Error).message || 'Something went wrong';

    // Check if error message is "Unauthenticated"
    if (errorMessage === UNAUTHENTICATED_ERROR) {
      window.location.href = '/logout';
      return;
    }

    toast.error(errorMessage);
  }
};
