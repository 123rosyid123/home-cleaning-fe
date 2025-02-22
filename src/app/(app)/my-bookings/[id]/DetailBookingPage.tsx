'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BookingStatus, DetailBooking } from '@/types/bookingType';
import SectionServiceDetail from './components/SectionServiceDetail';
import SectionScheduleDetail from './components/SectionScheduleDetail';
import SectionLocation from './components/SectionLocation';
import SectionCleanerInfo from './components/SectionCleanerInfo';
import SectionAdditionalInformation from './components/SectionAdditionalInformation';
import SectionPayment from './components/SectionPayment';

export function DetailBookingPage({ booking }: { booking: DetailBooking }) {
  const router = useRouter();

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return 'bg-green-100 text-green-800';
      case BookingStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case BookingStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      case BookingStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-row justify-between items-start">
        <div className="flex-1 text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Booking Details</h1>
          <div className="flex flex-col items-start gap-1">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status as BookingStatus)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="btn btn-primary btn-sm rounded-lg"
        >
          <span className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="md:block">Back</span>
          </span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 text-lg md:text-xl pb-6">
        <span className="text-gray-600 font-semibold">Booking ID:</span>
        <span className="text-gray-800 font-bold">
          {booking.id}
        </span>
      </div>

      <div className="grid gap-6">
        <SectionServiceDetail booking={booking} />
        <SectionScheduleDetail booking={booking} />
        <SectionLocation booking={booking} />
        <SectionCleanerInfo booking={booking} />
        <SectionAdditionalInformation booking={booking} />
        <SectionPayment booking={booking} />
      </div>
    </div>
  );
} 