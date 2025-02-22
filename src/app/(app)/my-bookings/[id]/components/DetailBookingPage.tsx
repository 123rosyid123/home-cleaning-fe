'use client';

import AddressMap from '@/app/(app)/booking/components/AddressMap';
import { BookingStatus, DetailBooking } from '@/types/bookingType';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  User
} from 'lucide-react';
import { useRouter } from 'next/navigation';

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
        {/* Service Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Service Details</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="font-medium text-base md:text-lg">{booking.product.name}</p>
                <p className="text-sm text-gray-600 mt-1">{booking.product_variant.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-base md:text-lg">{booking.start_time} - {booking.end_time}</p>
                <p className="text-sm text-gray-600 mt-1">Duration: 3 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-base md:text-lg">{new Date(booking.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Price Details</p>
                <p className="font-medium text-base md:text-lg">${booking.total_price.toFixed(2)}</p>
                {booking.discount && booking.discount > 0 && (
                  <p className="text-sm text-green-600 mt-1">Discount: ${booking.discount.toFixed(2)}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-base md:text-lg">CP NAME</p>
                <p className="text-sm text-gray-500 mt-1">Phone</p>
                <p className="font-medium text-base md:text-lg">{booking.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Location Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Location</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-base md:text-lg">{booking.address}</p>
                <p className="text-sm text-gray-500 mt-2">Postal Code</p>
                <p className="font-medium text-base md:text-lg">{booking.postal_code}</p>
              </div>
            </div>
            <AddressMap latitude={1.300542} longitude={103.839192} className="mt-4" />
          </div>
        </div>

        {/* Cleaner Information Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Cleaner Information</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{booking.cleaner.name}</h3>
                  <div className="hidden md:block">|</div>
                  <div className="flex items-center gap-2">
                    <span>{booking.cleaner.phone}</span>
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {booking.product_variant.metadata.cleanerInfo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        {(booking.comment || booking.additional_information) && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Additional Information</h2>
            </div>
            <div className="p-6">
              {booking.comment && (
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Comments</p>
                    <p className="font-medium text-base md:text-lg">{booking.comment}</p>
                  </div>
                </div>
              )}
              {booking.additional_information && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Additional Notes</p>
                    <p className="font-medium text-base md:text-lg">{booking.additional_information}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 