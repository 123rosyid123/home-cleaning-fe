'use client';

import { actionResendOtp, actionVerifyOtp } from '@/app/actions/authActions';
import { APIError, toastError } from '@/lib/toastFe';
import { useRegisterStore } from '@/store/registerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const otpSchema = z.object({
  otp: z.string()
    .min(6, 'Please enter all 6 digits of the OTP')
    .max(6, 'OTP cannot be more than 6 digits')
    .regex(/^[0-9]+$/, 'OTP must contain only digits')
});

type OtpFormData = z.infer<typeof otpSchema>;

export const useVerifyOtpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const { phone, email } = useRegisterStore();

  const formAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Update hidden input value when individual OTP digits change
  useEffect(() => {
    const combinedOtp = otpValues.join('');
    setValue('otp', combinedOtp);
    // Validate OTP when all digits are filled
    if (combinedOtp.length === 6) {
      trigger('otp');
    }
  }, [otpValues, setValue, trigger]);

  // Check if registration data exists in store, if not redirect to register
  useEffect(() => {
    if (!phone || !email) {
      router.push('/auth/register');
    }
  }, [phone, email, router]);

  const handleOtpInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    // Only allow one digit per input
    if (value.length > 1) {
      e.target.value = value.slice(0, 1);
    }

    // Update the OTP value at the current index
    setOtpValue(index, e.target.value);

    // Move focus to the next input when digit is entered
    if (value.length === 1 && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace - move to previous input when current is empty
    if (e.key === 'Backspace') {
      if (index > 0 && otpValues[index] === '') {
        otpRefs.current[index - 1].focus();
      }
    }

    // Handle arrow keys for better navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      otpRefs.current[index - 1].focus();
    }

    if (e.key === 'ArrowRight' && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Set OTP value for a specific index
  const setOtpValue = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const onSubmit = async (data: OtpFormData) => {
    try {
      setIsLoading(true);
      console.log('Verifying OTP:', data.otp);
      console.log('Registration data:', { phone, email });

      const response = await actionVerifyOtp(email, data.otp);
      console.log('Response:', response);
      if (!response.success) {
        toastError(new Error(response.message));
      }

      if (response.success) {
        toast.success(response.message);
        router.push('/booking');
      }
    } catch (error) {
      toastError(error as APIError);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await actionResendOtp(email);
      if (!response.success) {
        return toastError(new Error(JSON.stringify(response)));
      }
      
      toast.success(response.message);
    } catch (error) {
      toastError(error as APIError);
    }
  };

  const goToRegister = () => {
    router.push('/auth/register');
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    resendOtp,
    goToRegister,
    phone,
    otpValues,
    setOtpValue,
    otpRefs,
    formAnimation,
    itemAnimation,
    handleOtpInput,
    handleKeyDown
  };
};
