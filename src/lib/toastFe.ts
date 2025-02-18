import { toast } from 'sonner';

export type APIError = {
    message?: string;
    error?: Record<string, string | string[]>;
};

export const toastError = (error: Error | APIError) => {
    try {
        const errorObj = JSON.parse((error as Error)?.message);
        const firstError = Object.values(errorObj.error || {})[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : 'Something went wrong');
    } catch {
        toast.error((error as Error).message || 'Something went wrong');
    }
};
