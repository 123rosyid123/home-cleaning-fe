'use client';
import { useState } from 'react';
import SelectService from './components/SelectService';
import SelectSlot from './components/SelectSlot';
import ServiceInfo from './components/ServiceInfo';
import Confirmation from './components/Confirmation';

export default function Booking() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    rooms: '',
    address: '',
    notes: ''
  });

  const updateBookingData = (data) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="max-w-3xl mx-auto">
        <ul className="steps w-full mb-8">
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Select Service</li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Select Slot</li>
          <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Service Info</li>
          <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>Confirmation</li>
        </ul>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            {step === 1 && <SelectService data={bookingData} updateData={updateBookingData} nextStep={nextStep} />}
            {step === 2 && <SelectSlot data={bookingData} updateData={updateBookingData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <ServiceInfo data={bookingData} updateData={updateBookingData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <Confirmation data={bookingData} prevStep={prevStep} />}
          </div>
        </div>
      </div>
    </div>
  );
}