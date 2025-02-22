'use client';

import BookingEmpty from './components/BookingEmpty';
import BookingListItem from './components/BookingListItem';
import DateFilters from './components/DateFilters';
import Pagination from './components/Pagination';
import Skeleton from './components/Skeleton';
import StatusFilter from './components/StatusFilter';
import { useBookings } from './hook';

export default function MyBookings() {
  const {
    bookings,
    cancelBooking,
    selectedDays,
    setSelectedDays,
    statusFilter,
    setStatusFilter,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    total,
    startIndex,
    endIndex,
  } = useBookings();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center md:hidden">My Bookings</h1>
      <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2">
        <DateFilters selectedDays={selectedDays} setSelectedDays={(days) => setSelectedDays(days)} />
        <StatusFilter statusFilter={statusFilter} setStatusFilter={(status) => setStatusFilter(status)} />
      </div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {bookings.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <BookingEmpty />
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-4 mb-4">
                {bookings.map((booking) => (
                  <BookingListItem key={booking.id} booking={booking} cancelBooking={cancelBooking} />
                ))}
              </ul>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  total={total}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}