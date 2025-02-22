import { Calendar } from "lucide-react";
import Link from "next/link";

export default function BookingEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Calendar className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
      <p className="text-gray-600 text-center max-w-sm">
        You don&apos;t have any bookings for the selected period. Try adjusting your date range or status filter.
      </p>
      <div className="mt-4">
        <Link href="/booking" className="btn btn-primary">
          Book Now
        </Link>
      </div>
    </div>
  );
}
