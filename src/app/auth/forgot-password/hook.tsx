'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { actionForgotPassword } from '@/app/actions/authForgotPasswordActions';
import { APIError, toastError } from '@/lib/toastFe';

const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .max(255, 'Email is too long')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      const response = await actionForgotPassword(data.email);
      if (!response.success) {
        throw new Error(JSON.stringify(response));
      }

      toast.success(response.message || 'Reset password link has been sent to your email');
      reset();
    } catch (error) {
      toastError(error as APIError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    isLoading,
  };
}; 