'use client';

import { useBookings } from './hook';
import { Calendar, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { BookingStatus } from '@/types/bookingType';

export default function MyBookings() {
  const { bookings, cancelBooking, selectedDays, setSelectedDays, statusFilter, setStatusFilter } = useBookings();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">My Bookings</h1>
      <div className="mb-4 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="from-date" className="text-sm font-medium">From</label>
            <input
              id="from-date"
              type="date"
              value={selectedDays.from ? selectedDays.from.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const newFromDate = e.target.value ? new Date(e.target.value) : undefined;
                setSelectedDays({ ...selectedDays, from: newFromDate });
              }}
              className="input input-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="to-date" className="text-sm font-medium">End Date</label>
            <input
              id="to-date"
              type="date"
              value={selectedDays.to ? selectedDays.to.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const newToDate = e.target.value ? new Date(e.target.value) : undefined;
                setSelectedDays({ ...selectedDays, to: newToDate });
              }}
              className="input input-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="status-filter" className="text-sm font-medium">Filter</label>
          <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select select-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto">
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 w-full p-4 rounded-lg">
            <div className="card-body">
              <h2 className="font-semibold text-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                {booking.product_name}
              </h2>
              <div className='flex flex-col md:flex-row justify-between gap-3'>
                <div className="flex flex-col">
                  <p className="flex items-center mt-1 text-lg text-gray-800"><Calendar className="w-5 h-5 mr-2 text-blue-500" />{format(new Date(booking.date), 'MMMM d, yyyy')}</p>
                  <p className="flex items-center text-lg text-gray-800 mt-1"><Clock className="w-5 h-5 mr-2 text-blue-500" />{booking.start_time} - {booking.end_time}</p>
                  <p className="flex items-center text-lg text-gray-800 mt-1"><DollarSign className="w-5 h-5 mr-2 text-blue-500" />SGD {booking.total_price.toFixed(2)}</p>
                  <p className="flex items-center text-lg text-gray-800 mt-1">Status: <span className={`ml-2 font-bold ${booking.status === BookingStatus.CONFIRMED ? 'text-green-500' : booking.status === BookingStatus.PENDING ? 'text-yellow-500' : 'text-red-500'}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></p>
                </div>

                <div className="flex flex-col gap-2 justify-end mt-2 md:mt-0">
                  <button className="btn btn-primary btn-sm hover:bg-blue-700 transition duration-200 rounded-lg shadow">View Details</button>
                  {booking.status === BookingStatus.PENDING && <button className="btn btn-secondary btn-sm hover:bg-red-700 transition duration-200 rounded-lg shadow" onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}