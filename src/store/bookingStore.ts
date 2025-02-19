import { create } from 'zustand';
import { Address } from '@/types/addressType';

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
  addresses: Address[];
  selectedAddressId: number | null;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateBookingData: (data: Partial<BookingState>) => void;
  resetBooking: () => void;
  setAddresses: (addresses: Address[]) => void;
  selectAddress: (addressId: number) => void;
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
  addresses: [],
  selectedAddressId: null,
};

export const useBookingStore = create<BookingState>()((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  
  updateBookingData: (data) => 
    set((state) => ({ ...state, ...data })),
  
  resetBooking: () => set(initialState),

  setAddresses: (addresses) => {
    set({ addresses });
    // Set default address if there's a primary one
    const primaryAddress = addresses.find(addr => addr.is_primary);
    if (primaryAddress) {
      set({
        selectedAddressId: primaryAddress.id,
        address: primaryAddress.address,
        postalCode: primaryAddress.postal_code.toString(),
        phoneNumber: primaryAddress.phone,
        contactName: primaryAddress.name
      });
    }
  },

  selectAddress: (addressId) => {
    set((state) => {
      const selectedAddress = state.addresses.find(addr => addr.id === addressId);
      if (selectedAddress) {
        return {
          selectedAddressId: addressId,
          address: selectedAddress.address,
          postalCode: selectedAddress.postal_code.toString(),
          phoneNumber: selectedAddress.phone,
          contactName: selectedAddress.name
        };
      }
      return state;
    });
  }
}));
