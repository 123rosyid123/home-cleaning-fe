'use client';

import { useBookingStore } from '@/store/bookingStore';

interface ButtonBackProps {
  text?: string;
}

export default function ButtonBack({ text = 'Back' }: ButtonBackProps) {
  const { prevStep } = useBookingStore();

  return (
    <button 
      className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gray-100 text-gray-700 text-sm sm:text-base font-medium 
        hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
      onClick={prevStep}
    >
      {text}
    </button>
  );
}
