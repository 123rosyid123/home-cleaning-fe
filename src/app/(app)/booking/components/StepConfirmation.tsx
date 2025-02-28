'use client';

import {
  CalendarDays,
  Clock,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  Phone,
  RepeatIcon,
  User
} from 'lucide-react';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';
import { useConfirmation } from './StepConfirmationHook';

export default function Confirmation() {
  const { isProcessing, bookingData, handleSubmit } = useConfirmation();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 p-2 rounded-2xl flex items-center justify-center transform transition-transform hover:rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
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
          <h3 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            Booking Summary
          </h3>
        </div>

        <div className="grid gap-6">
          {/* Service Details Section */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-base sm:text-lg text-gray-700 mb-4">Service Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <RepeatIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Frequency</p>
                  <p className="text-sm sm:text-base font-medium">
                    {bookingData.frequency}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Time</p>
                  <p className="text-sm sm:text-base font-medium">
                    {bookingData.startTime} - {bookingData.endTime} ({bookingData.duration})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Price (GST Inclusive)</p>
                  <p className="text-sm sm:text-base font-medium">
                    ${bookingData.total_price_gst}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Date</p>
                  <p className="text-sm sm:text-base font-medium">{bookingData.date?.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-base sm:text-lg text-gray-700 mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Name</p>
                  <p className="text-sm sm:text-base font-medium">{bookingData.contactName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                  <p className="text-sm sm:text-base font-medium">{bookingData.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-1 sm:col-span-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Email</p>
                  <p className="text-sm sm:text-base font-medium">{bookingData.email}</p>
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
                <p className="text-xs sm:text-sm text-gray-500">Service Location</p>
                <p className="text-sm sm:text-base font-medium mt-1">{bookingData.address}</p>
                <p className="text-sm sm:text-base font-medium">Postal Code: {bookingData.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
          {bookingData.additionalNotes && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Additional Notes</p>
                  <p className="text-sm sm:text-base font-medium mt-1">{bookingData.additionalNotes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-4">
        <ButtonBack />
        <ButtonNext text="Proceed to Payment" disabled={isProcessing} onClick={handleSubmit} />
      </div>
    </div>
  );
}