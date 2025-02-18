import { apiResetPassword } from '@/services/authService';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const userEmail = searchParams.get('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: userEmail || '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error('Reset token is missing');
      return;
    }

    try {
      const response = await apiResetPassword(
        token,
        data.email,
        data.password,
        data.passwordConfirmation
      );
      toast.success(response.message || 'Password has been reset successfully');
      router.push('/auth/login');
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        toast.error(errorData.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordConfirmationVisibility = () => setShowPasswordConfirmation(!showPasswordConfirmation);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    showPassword,
    showPasswordConfirmation,
    togglePasswordVisibility,
    togglePasswordConfirmationVisibility,
  };
}; 