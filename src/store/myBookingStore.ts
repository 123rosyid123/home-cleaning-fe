import { BookingStatus, ListBooking } from '@/types/bookingType';
import { create } from 'zustand';

type MyBookingState = {
  bookings: ListBooking[];
  loading: boolean;
  selectedDays: { from?: Date; to?: Date };
  statusFilter: BookingStatus | undefined;
  currentPage: number;
  totalPages: number;
  total: number;
  perPage: number;
  setBookings: (bookings: ListBooking[]) => void;
  setLoading: (loading: boolean) => void;
  setSelectedDays: (days: { from?: Date; to?: Date }) => void;
  setStatusFilter: (status: BookingStatus | undefined) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setTotal: (total: number) => void;
  setPerPage: (perPage: number) => void;
  reset: () => void;
};

export const useMyBookingStore = create<MyBookingState>()((set) => ({
  bookings: [],
  loading: true,
  selectedDays: {},
  statusFilter: undefined,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  perPage: 10,
  setBookings: (bookings) => set({ bookings }),
  setLoading: (loading) => set({ loading }),
  setSelectedDays: (days) => set({ selectedDays: days }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setTotal: (total) => set({ total }),
  setPerPage: (perPage) => set({ perPage }),
  reset: () => set({
    bookings: [],
    loading: true,
    selectedDays: {},
    statusFilter: undefined,
    currentPage: 1,
    totalPages: 1,
    total: 0,
    perPage: 10,
  }),
}));
