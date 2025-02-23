'use client';

import { useEffect } from "react";
import { actionLogout } from "@/app/actions/authActions";
import { useMyBookingStore } from '@/store/myBookingStore';
import { useBookingStore } from '@/store/bookingStore';

export default function Logout() {
  const resetMyBooking = useMyBookingStore((state) => state.reset);
  const resetBooking = useBookingStore((state) => state.resetBooking);

  useEffect(() => {
    resetMyBooking();
    resetBooking();
    actionLogout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-700">Logging out...</h2>
        <p className="text-gray-500 mt-2">Thank you for using Home Cleaning SG</p>
      </div>
    </div>
  );
}