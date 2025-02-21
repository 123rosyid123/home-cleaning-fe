import { actionResetPassword } from '@/app/actions/authActions';
import { APIError, toastError } from '@/lib/toastFe';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string(),
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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const searchParams = useSearchParams();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: searchParams.get('token') || '',
      email: searchParams.get('email') || '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await actionResetPassword(
        data.token,
        data.email,
        data.password,
        data.passwordConfirmation
      );
      toast.success(response.message || 'Password has been reset successfully');
      router.push('/auth/login');
    } catch (error) {
      toastError(error as APIError);
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