import {
  actionCancelBooking,
  actionListBooking,
} from '@/app/actions/bookingActions';
import { SuccessResponse } from '@/lib/apiResponse';
import { useMyBookingStore } from '@/store/myBookingStore';
import { BookingStatus, ListBookingPagination } from '@/types/bookingType';
import { format } from 'date-fns';
import { useEffect } from 'react';

export const useBookings = () => {
  const {
    bookings,
    loading,
    setBookings,
    setLoading,
    setSelectedDays,
    setStatusFilter,
    selectedDays,
    statusFilter,
  } = useMyBookingStore();

  // Set default date range to last week only if selectedDays is not set
  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    
    // Check if selectedDays.from or selectedDays.to is null
    if (!selectedDays.from && !selectedDays.to) {
      setSelectedDays({ from: lastWeek, to: today });
    }
  }, [selectedDays, setSelectedDays]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const formattedFrom = selectedDays.from
        ? format(new Date(selectedDays.from), 'yyyy-MM-dd')
        : '';
      const formattedTo = selectedDays.to
        ? format(new Date(selectedDays.to), 'yyyy-MM-dd')
        : '';
      const result = await actionListBooking({
        from_date: formattedFrom,
        end_date: formattedTo,
        status: statusFilter as BookingStatus,
      });
      if ((result as SuccessResponse<ListBookingPagination>).success) {
        const data = (result as SuccessResponse<ListBookingPagination>).data;
        setBookings(data?.data || []);
      } else {
        console.error('Failed to fetch bookings:', result);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [selectedDays, statusFilter]);

  const cancelBooking = async (bookingId: string) => {
    const result = await actionCancelBooking(bookingId);
    if (result.success) {
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setBookings(updatedBookings);
    }
  };

  return {
    bookings,
    loading,
    cancelBooking,
    selectedDays,
    setSelectedDays,
    statusFilter,
    setStatusFilter,
  };
};
