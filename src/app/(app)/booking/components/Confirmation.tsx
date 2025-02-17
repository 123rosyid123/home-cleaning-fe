'use client';

import { useBookingStore } from '@/store/bookingStore';
import {
  CalendarDays,
  Clock,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  Phone,
  RepeatIcon,
  Timer,
  User
} from 'lucide-react';
import { useState } from 'react';

type FrequencyType = 'oneTime' | 'everyOtherWeek' | 'oncePerWeek' | 'moreThanOnce';
type DurationType = '4hours' | '3hours';

export default function Confirmation() {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    frequency,
    duration,
    date,
    time,
    contactName,
    phoneNumber,
    email,
    address,
    postalCode,
    additionalNotes,
    prevStep,
  } = useBookingStore();

  const frequencies = {
    oneTime: { name: 'One Time Cleaning', price: '$16-$25/hr' },
    everyOtherWeek: { name: 'Every Other Week', price: '$18-$22/hr' },
    oncePerWeek: { name: 'Once per Week', price: '$18-$22/hr' },
    moreThanOnce: { name: '> Once per Week', price: '$18-$22/hr' }
  };

  const durations = {
    '4hours': '4 Hours',
    '3hours': '3 Hours'
  };

  const calculateAmount = () => {
    // Calculate based on frequency and duration
    const baseRate = frequency === 'oneTime' ? 25 : 22; // highest rate for one-time
    const hours = duration === '4hours' ? 4 : 3;
    return baseRate * hours;
  };

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);

      // Create unique reference for the booking
      const reference_number = `BOOKING-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create payment request
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateAmount(),
          currency: 'SGD',
          email,
          name: contactName,
          phone: phoneNumber,
          reference_number,
          redirect_url: `${window.location.origin}/booking/success?ref=${reference_number}`
        }),
      });

      if (!response.ok) {
        throw new Error('Payment creation failed');
      }

      const { url } = await response.json();

      // Redirect to HitPay payment page
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 p-2 rounded-2xl flex items-center justify-center transform transition-transform hover:rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
          Confirm Your Booking
        </h2>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 space-y-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            Booking Summary
          </h3>
        </div>

        <div className="grid gap-6">
          {/* Service Details Section */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-gray-700 mb-4">Service Details</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <RepeatIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Frequency</p>
                  <p className="font-medium">{frequencies[frequency as FrequencyType]?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Timer className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{durations[duration as DurationType]}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">{frequencies[frequency as FrequencyType]?.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{date?.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-gray-700 mb-4">Contact Information</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{contactName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Location</p>
                <p className="font-medium mt-1">{address}</p>
                <p className="font-medium">Postal Code: {postalCode}</p>
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
          {additionalNotes && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Additional Notes</p>
                  <p className="font-medium mt-1">{additionalNotes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium 
            hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          onClick={prevStep}
          disabled={isProcessing}
        >
          Back
        </button>
        <button
          className="px-8 py-3 rounded-xl bg-primary text-white font-medium 
            hover:bg-primary/90 transition-all duration-200 shadow-lg 
            hover:shadow-primary/30 flex items-center gap-2 disabled:opacity-50
            disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
}