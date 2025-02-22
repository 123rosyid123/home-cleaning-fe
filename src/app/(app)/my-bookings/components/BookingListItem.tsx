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
  const [showModal, setShowModal] = React.useState(false);

  const renderStatus = () => {
    const statusClass = booking.status === BookingStatus.COMPLETED ? 'text-blue-500' :
      booking.status === BookingStatus.CONFIRMED ? 'text-green-500' :
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
          className="btn btn-secondary hover:bg-red-600 transition duration-200 rounded-lg shadow w-full md:w-32 md:btn-sm btn-sm"
          onClick={() => setShowModal(true)}
        >
          Cancel Booking
        </button>
      );
    }
    return null;
  };

  return (
    <li key={booking.id} className="card bg-white shadow-md hover:shadow-lg transition-shadow duration-200 w-full p-2 rounded-lg">
      <div className="p-4 md:card-body">
        <h2 className="font-semibold text-sm flex items-center">
          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
          {booking.product_name}
        </h2>
        <div className='flex flex-col md:flex-row justify-between gap-2'>
          <div className="flex flex-col">
            <p className="flex items-center mt-1 text-sm text-gray-800">
              <Calendar className="w-4 h-4 mr-1 text-blue-500" />
              {format(new Date(booking.date), 'MMM d, yyyy')}
            </p>
            <p className="flex items-center text-sm text-gray-800 mt-1">
              <Clock className="w-4 h-4 mr-1 text-blue-500" />
              {booking.start_time} - {booking.end_time}
            </p>
            <p className="flex items-center text-sm text-gray-800 mt-1">
              <DollarSign className="w-4 h-4 mr-1 text-blue-500" />
              SGD {booking.total_price.toFixed(2)}
            </p>
            <p className="flex items-center text-sm text-gray-800 mt-1">
              Status: {renderStatus()}
            </p>
          </div>

          <div className="flex flex-col gap-1 justify-end mt-2 md:mt-0">
            <Link href={`/my-bookings/${booking.id}`} className="w-full md:w-auto">
              <button className="btn btn-primary hover:bg-blue-600 transition duration-200 rounded-lg shadow w-full md:w-32 md:btn-sm btn-sm">View Details</button>
            </Link>
            {renderCancelButton()}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-200 border border-base-300 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Cancel Booking</h2>
            <p className="mt-2">Are you sure you want to cancel this booking?</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>No, Keep</button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  cancelBooking(booking.id);
                  setShowModal(false);
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default BookingListItem;