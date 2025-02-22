import { BadgeCheck, User } from 'lucide-react';
import { DetailBooking } from '@/types/bookingType';

interface SectionCleanerInfoProps {
  booking: DetailBooking;
}

export default function SectionCleanerInfo({ booking }: SectionCleanerInfoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Cleaner Information</h2>
      </div>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Cleaner Name</p>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-base md:text-lg">{booking.cleaner.name} </h3>
              <BadgeCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-gray-500 mt-1">Phone</p>
            <p className="font-medium text-base md:text-lg">{booking.cleaner.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
