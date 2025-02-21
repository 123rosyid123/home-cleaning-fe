'use client';

import { useBookingStore } from '@/store/bookingStore';
import StepSelectService from './components/StepSelectService';
import StepSelectSlot from './components/StepSelectSlot';
import StepServiceInfo from './components/StepServiceInfo';
import StepConfirmation from './components/StepConfirmation';
import { useEffect } from 'react';

export default function Booking() {
  const { step } = useBookingStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="max-w-7xl mx-auto">
        <ul className="steps w-full mb-8">
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Select Service</span>
            <span className="sm:hidden">Service</span>
          </li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Service Info</span>
            <span className="sm:hidden">Info</span>
          </li>
          <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Select Slot</span>
            <span className="sm:hidden">Slot</span>
          </li>
          <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Confirmation</span>
            <span className="sm:hidden">Confirm</span>
          </li>
        </ul>

        <div>
          {step === 1 && <StepSelectService />}
          {step === 2 && <StepServiceInfo />}
          {step === 3 && <StepSelectSlot />}
          {step === 4 && <StepConfirmation />}
        </div>
      </div>
    </div>
  );
}