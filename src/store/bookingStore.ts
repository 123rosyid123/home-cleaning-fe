import { create } from 'zustand';

type BookingState = {
  step: number;
  frequency: string;
  duration: string;
  date: Date | null;
  time: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  additionalNotes: string;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateBookingData: (data: Partial<BookingState>) => void;
  resetBooking: () => void;
}

const initialState = {
  step: 1,
  frequency: '',
  duration: '',
  date: null,
  time: '',
  contactName: '',
  phoneNumber: '',
  email: '',
  address: '',
  postalCode: '',
  additionalNotes: '',
};

export const useBookingStore = create<BookingState>()((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  
  updateBookingData: (data) => 
    set((state) => ({ ...state, ...data })),
  
  resetBooking: () => set(initialState),
}));
