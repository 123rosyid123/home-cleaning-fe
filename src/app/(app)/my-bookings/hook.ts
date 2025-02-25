import {
  actionCancelBooking,
  actionListBooking,
} from '@/app/actions/bookingActions';
import { toastError } from '@/lib/toastFe';
import { useMyBookingStore } from '@/store/myBookingStore';
import { BookingStatus } from '@/types/bookingType';
import { format } from 'date-fns';
import { useCallback, useEffect, useRef } from 'react';

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
    totalPages,
  } = useMyBookingStore();

  // Memoize previous values with useRef to avoid re-renders
  const prevValues = useRef({
    selectedDays,
    statusFilter,
    currentPage,
  });

  // Set default date range only once on mount
  useEffect(() => {
    if (!selectedDays.from && !selectedDays.to) {
      const today = new Date();
      const next2Weeks = new Date(today);
      next2Weeks.setDate(today.getDate() + 14);
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);

      setSelectedDays({ from: lastWeek, to: next2Weeks });
    }
  }, [selectedDays, setSelectedDays]);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const result = await actionListBooking({
        start_date: selectedDays.from
          ? format(selectedDays.from, 'yyyy-MM-dd')
          : '',
        end_date: selectedDays.to ? format(selectedDays.to, 'yyyy-MM-dd') : '',
        status: statusFilter as BookingStatus,
        page: currentPage,
      });

      if (result.success) {
        const {
          data = [],
          last_page = 1,
          total = 0,
          per_page = 10,
        } = result.data || {};
        setBookings(data);
        setTotalPages(last_page);
        setTotal(total);
        setPerPage(per_page);
      } else {
        toastError(new Error(result.message));
      }
    } catch (error) {
      toastError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [
    selectedDays,
    statusFilter,
    currentPage,
    setBookings,
    setLoading,
    setTotalPages,
    setTotal,
    setPerPage,
  ]);

  useEffect(() => {
    const {
      selectedDays: prevSelectedDays,
      statusFilter: prevStatusFilter,
      currentPage: prevCurrentPage,
    } = prevValues.current;

    const filtersChanged =
      statusFilter !== prevStatusFilter ||
      selectedDays.from !== prevSelectedDays.from ||
      selectedDays.to !== prevSelectedDays.to;

    const hasChanged = filtersChanged || currentPage !== prevCurrentPage;

    if (!hasChanged) return;

    if (filtersChanged) {
      setCurrentPage(1);
    }

    fetchBookings();

    prevValues.current = {
      selectedDays,
      statusFilter,
      currentPage,
    };
  }, [selectedDays, statusFilter, currentPage, setCurrentPage, fetchBookings]);

  const cancelBooking = useCallback(
    async (bookingId: string) => {
      try {
        const result = await actionCancelBooking(bookingId);
        if (result.success) {
          setBookings(bookings.filter((booking) => booking.id !== bookingId));
          fetchBookings();
        }
      } catch (error) {
        toastError(error as Error);
      }
    },
    [bookings, setBookings, fetchBookings]
  );

  // Memoize pagination calculations
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
    totalPages,
    total,
    perPage,
    startIndex,
    endIndex,
  };
};
