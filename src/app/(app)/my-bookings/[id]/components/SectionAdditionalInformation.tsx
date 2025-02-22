import { FileText } from 'lucide-react';
import { DetailBooking } from '@/types/bookingType';

interface SectionAdditionalInformationProps {
  booking: DetailBooking;
}

export default function SectionAdditionalInformation({ booking }: SectionAdditionalInformationProps) {
  if (!booking.additional_information) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Additional Information</h2>
      </div>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Additional Notes</p>
            <p className="font-medium text-base md:text-lg">{booking.additional_information}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
