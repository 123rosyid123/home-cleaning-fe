'use client';

import { actionRegister } from '@/app/actions/authActions';
// Commented out since we're not using it for now
// import { actionRegister } from '@/app/actions/authActions';
import { APIError, toastError } from '@/lib/toastFe';
import { useRegisterStore } from '@/store/registerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    phone: z.string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be at most 15 digits')
      .regex(/^\+?[0-9]+$/, 'Phone number must contain only digits'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const {
    phone,
    email,
    password,
    confirmPassword,
    setRegistrationData
  } = useRegisterStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Pre-fill the form with data from the store if available
  useEffect(() => {
    if (email) setValue('email', email);
    if (phone) setValue('phone', phone);
    if (password) setValue('password', password);
    if (confirmPassword) setValue('confirmPassword', confirmPassword);
  }, [email, phone, password, confirmPassword, setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      console.log('Registration data:', data);

      // Store all form data in the register store
      setRegistrationData({
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword
      });


      const response = await actionRegister(data);

      if (!response.success) {
        return toastError(new Error(response.message));
      }

      router.push('/auth/verify-otp');
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
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
