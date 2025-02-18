'use client';

import { useBookingStore } from '@/store/bookingStore';

interface ButtonNextProps {
  text?: string;
  disabled?: boolean;
}

export default function ButtonNext({ text = "Next", disabled = false, onClick }: ButtonNextProps & { onClick?: () => void }) {
  const { nextStep } = useBookingStore();

  return (
    <button 
      className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-primary text-white text-sm sm:text-base font-medium 
        hover:bg-primary/90 transition-all duration-200 shadow-lg 
        hover:shadow-primary/30 flex items-center gap-2 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick || nextStep}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
