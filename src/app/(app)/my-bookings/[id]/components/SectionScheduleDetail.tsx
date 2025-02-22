import { CalendarDays, Clock } from 'lucide-react';
import { DetailBooking } from '@/types/bookingType';

interface SectionScheduleDetailProps {
  booking: DetailBooking;
}

export default function SectionScheduleDetail({ booking }: SectionScheduleDetailProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Schedule Details</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium text-base md:text-lg">{booking.start_time} - {booking.end_time}</p>
            <p className="text-sm text-gray-600 mt-1">Duration: 3 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
