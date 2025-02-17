'use client';

import { useBookingStore } from '@/store/bookingStore';
import SelectService from './components/SelectService';
import SelectSlot from './components/SelectSlot';
import ServiceInfo from './components/ServiceInfo';
import Confirmation from './components/Confirmation';

export default function Booking() {
  const { step } = useBookingStore();

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="max-w-7xl mx-auto">
        <ul className="steps w-full mb-8">
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Select Service</span>
            <span className="sm:hidden">Service</span>
          </li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Select Slot</span>
            <span className="sm:hidden">Slot</span>
          </li>
          <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Service Info</span>
            <span className="sm:hidden">Info</span>
          </li>
          <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>
            <span className="hidden sm:inline">Confirmation</span>
            <span className="sm:hidden">Confirm</span>
          </li>
        </ul>

        <div>
          {step === 1 && <SelectService />}
          {step === 2 && <SelectSlot />}
          {step === 3 && <ServiceInfo />}
          {step === 4 && <Confirmation />}
        </div>
      </div>
    </div>
  );
}