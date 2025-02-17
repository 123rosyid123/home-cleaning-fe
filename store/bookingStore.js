import { create } from 'zustand';

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

export const useBookingStore = create((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  
  updateBookingData: (data) => 
    set((state) => ({ ...state, ...data })),
  
  resetBooking: () => set(initialState),
}));
