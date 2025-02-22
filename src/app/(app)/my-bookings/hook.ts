import {
  actionCancelBooking,
  actionListBooking,
} from '@/app/actions/bookingActions';
import { useMyBookingStore } from '@/store/myBookingStore';
import { BookingStatus } from '@/types/bookingType';
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
    currentPage,
    setCurrentPage,
    setTotalPages,
    setTotal,
    setPerPage,
    perPage,
    total,
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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, selectedDays.from, selectedDays.to, setCurrentPage]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const result = await actionListBooking({
        from_date: selectedDays.from ? format(new Date(selectedDays.from), 'yyyy-MM-dd') : '',
        end_date: selectedDays.to ? format(new Date(selectedDays.to), 'yyyy-MM-dd') : '',
        status: statusFilter as BookingStatus,
        page: currentPage,
      });

      if (result.success) {
        setBookings(result.data?.data || []);
        setTotalPages(result.data?.last_page || 1);
        setTotal(result.data?.total || 0);
        setPerPage(result.data?.per_page || 10);
      } else {
        console.error('Failed to fetch bookings:', result);
      }
      setLoading(false);
    };

    if (selectedDays.from && selectedDays.to) {
      fetchBookings();
    }
  }, [selectedDays, statusFilter, currentPage, setBookings, setLoading, setTotalPages, setTotal, setPerPage]);

  const cancelBooking = async (bookingId: string) => {
    const result = await actionCancelBooking(bookingId);
    if (result.success) {
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setBookings(updatedBookings);
    }
  };

  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, total);

  return {
    bookings,
    loading,
    cancelBooking,
    selectedDays,
    setSelectedDays,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages: useMyBookingStore((state) => state.totalPages),
    total: useMyBookingStore((state) => state.total),
    perPage: useMyBookingStore((state) => state.perPage),
    startIndex,
    endIndex,
  };
};
