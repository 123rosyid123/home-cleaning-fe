'use client';

import { actionLogin } from '@/app/actions/authActions';
import { APIError, toastError } from '@/lib/toastFe';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: 'test@example.com',
      password: 'password'
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const redirectUrl = searchParams.get('redirect');

      const response = await actionLogin(data);
      if (!response.success) {
        throw new Error(JSON.stringify(response));
      }

      router.push(redirectUrl || '/booking');
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
    isLoading,
    onSubmit,
    showPassword,
    setShowPassword,
  };
};
