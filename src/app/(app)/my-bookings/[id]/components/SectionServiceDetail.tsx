import { CheckCircle2, DollarSign, User } from 'lucide-react';
import { DetailBooking } from '@/types/bookingType';

interface SectionServiceDetailProps {
  booking: DetailBooking;
}

export default function SectionServiceDetail({ booking }: SectionServiceDetailProps) {
  return (
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
            <p className="font-medium text-base md:text-lg">{booking.name}</p>
            <p className="text-sm text-gray-500 mt-1">Phone</p>
            <p className="font-medium text-base md:text-lg">{booking.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
