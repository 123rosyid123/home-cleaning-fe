import { create } from 'zustand';

type RegisterState = {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setRegistrationData: (data: { 
    phone: string;
    email: string; 
    password: string;
    confirmPassword: string;
  }) => void;
  reset: () => void;
};

export const useRegisterStore = create<RegisterState>((set) => ({
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setRegistrationData: (data) => set({ 
    phone: data.phone,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword
  }),
  reset: () => set({ phone: '', email: '', password: '', confirmPassword: '' }),
})); 