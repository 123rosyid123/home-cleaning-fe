import { create } from 'zustand';
import { ListBooking } from '@/types/bookingType';

type MyBookingState = {
  bookings: ListBooking[];
  loading: boolean;
  selectedDays: { from?: Date; to?: Date };
  statusFilter: string;
  setBookings: (bookings: ListBooking[]) => void;
  setLoading: (loading: boolean) => void;
  setSelectedDays: (days: { from?: Date; to?: Date }) => void;
  setStatusFilter: (status: string) => void;
};

export const useMyBookingStore = create<MyBookingState>()((set) => ({
  bookings: [],
  loading: true,
  selectedDays: {},
  statusFilter: '',
  setBookings: (bookings) => set({ bookings }),
  setLoading: (loading) => set({ loading }),
  setSelectedDays: (days) => set({ selectedDays: days }),
  setStatusFilter: (status) => set({ statusFilter: status }),
}));
