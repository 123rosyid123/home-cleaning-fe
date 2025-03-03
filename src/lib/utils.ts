import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 

export const formatPhoneToE164 = (phone: string): string => {
  if (!phone) return '';

  // Remove all non-digit characters except the leading +
  let formattedPhone = phone.replace(/[^\d+]/g, '').replace(/\s+/g, '');

  // Add + at the beginning if it doesn't exist
  if (!formattedPhone.startsWith('+')) {
    formattedPhone = '+' + formattedPhone;
  }

  return formattedPhone;
};