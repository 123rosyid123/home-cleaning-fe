import { BookingStatus } from '@/types/bookingType';
import { format } from 'date-fns';
import { Calendar, CheckCircle, Clock, DollarSign } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

interface BookingListItemProps {
  booking: {
    id: string;
    product_name: string;
    date: string;
    start_time: string;
    end_time: string;
    total_price: number;
    status: BookingStatus;
  };
  cancelBooking: (id: string) => void;
}

const BookingListItem: React.FC<BookingListItemProps> = ({ booking, cancelBooking }) => {
  const renderStatus = () => {
    const statusClass = booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.COMPLETED ? 'text-green-500' : 
                        booking.status === BookingStatus.PENDING ? 'text-yellow-500' : 
                        'text-red-500';
    return (
      <span className={`ml-2 font-bold ${statusClass}`}>
        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
      </span>
    );
  };

  const renderCancelButton = () => {
    if (booking.status === BookingStatus.PENDING) {
      return (
        <button 
          className="btn btn-secondary btn-sm hover:bg-red-700 transition duration-200 rounded-lg shadow w-full md:w-32" 
          onClick={() => cancelBooking(booking.id)}
        >
          Cancel Booking
        </button>
      );
    }
    return null;
  };

  return (
    <li key={booking.id} className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 w-full p-4 rounded-lg">
      <div className="card-body">
        <h2 className="font-semibold text-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          {booking.product_name}
        </h2>
        <div className='flex flex-col md:flex-row justify-between gap-3'>
          <div className="flex flex-col">
            <p className="flex items-center mt-1 text-lg text-gray-800">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              {format(new Date(booking.date), 'MMMM d, yyyy')}
            </p>
            <p className="flex items-center text-lg text-gray-800 mt-1">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              {booking.start_time} - {booking.end_time}
            </p>
            <p className="flex items-center text-lg text-gray-800 mt-1">
              <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
              SGD {booking.total_price.toFixed(2)}
            </p>
            <p className="flex items-center text-lg text-gray-800 mt-1">
              Status: {renderStatus()}
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-end mt-2 md:mt-0">
            <Link href={`/my-bookings/${booking.id}`} className="w-full md:w-auto">
              <button className="btn btn-primary btn-sm hover:bg-blue-700 transition duration-200 rounded-lg shadow w-full md:w-32">View Details</button>
            </Link>
            {renderCancelButton()}
          </div>
        </div>
      </div>
    </li>
  );
};

export default BookingListItem; 