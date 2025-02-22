import { FileText } from 'lucide-react';
import { DetailBooking } from '@/types/bookingType';
import AddressMap from '@/app/(app)/booking/components/AddressMap';

interface SectionLocationProps {
  booking: DetailBooking;
}

export default function SectionLocation({ booking }: SectionLocationProps) {
  return (
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
        <AddressMap latitude={parseFloat(booking.latitude)} longitude={parseFloat(booking.longitude)} className="mt-4" />
      </div>
    </div>
  );
}
