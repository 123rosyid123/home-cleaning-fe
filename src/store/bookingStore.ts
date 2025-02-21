import { Address } from '@/types/addressType';
import { AvailableTime } from '@/types/bookingType';
import { Duration } from '@/types/durationType';
import { ProductVariant } from '@/types/productType';
import { create } from 'zustand';

type StepService = {
  durationId: number;
  productVariantId: number;
  frequency: string;
  duration: string;
};

type StepSlot = {
  date: Date | null;
  startTime: string;
  endTime: string;
  price_gst: number;
  price: number;
  cleanerId: number;
};

type StepAddress = {
  addressId: number;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  additionalNotes: string;
  latitude: number | null;
  longitude: number | null;
  selectedAddressId: number | null;
};

type BookingState = {
  step: number;
  stepService: StepService;
  stepSlot: StepSlot;
  stepAddress: StepAddress;
  ref: {
    addresses: Address[];
    productVariants: ProductVariant[];
    durations: Duration[];
    availableTimes: {
      [key: string]: AvailableTime[]; // key will be `${date}_${addressId}_${productVariantId}_${durationId}`
    };
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateStepService: (data: Partial<StepService>) => void;
  updateStepSlot: (data: Partial<StepSlot>) => void;
  updateStepAddress: (data: Partial<StepAddress>) => void;
  resetBooking: () => void;
  setAddresses: (addresses: Address[]) => void;
  selectAddress: (addressId: number) => void;
  setProductVariants: (variants: ProductVariant[]) => void;
  setDurations: (durations: Duration[]) => void;
  setAvailableTimes: (
    date: string,
    addressId: number,
    productVariantId: number,
    durationId: number,
    times: AvailableTime[]
  ) => void;
  getAvailableTimes: (
    date: string,
    addressId: number,
    productVariantId: number,
    durationId: number
  ) => AvailableTime[] | null;
};

const initialState = {
  step: 1,
  stepService: {
    durationId: 0,
    productVariantId: 0,
    frequency: '',
    duration: '',
  },
  stepSlot: {
    date: null,
    startTime: '',
    endTime: '',
    price_gst: 0,
    price: 0,
    cleanerId: 0,
  },
  stepAddress: {
    addressId: 0,
    contactName: '',
    phoneNumber: '',
    email: '',
    address: '',
    postalCode: '',
    additionalNotes: '',
    selectedAddressId: null,
    latitude: null,
    longitude: null,
  },
  ref: {
    addresses: [],
    productVariants: [],
    durations: [],
    availableTimes: {},
  },
};

export const useBookingStore = create<BookingState>()((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  nextStep: () => set((state) => ({ step: state.step + 1 })),

  prevStep: () => set((state) => ({ step: state.step - 1 })),

  updateStepService: (data) =>
    set((state) => ({
      ...state,
      stepService: { ...state.stepService, ...data },
    })),

  updateStepSlot: (data) =>
    set((state) => ({
      ...state,
      stepSlot: { ...state.stepSlot, ...data },
    })),

  updateStepAddress: (data) =>
    set((state) => ({
      ...state,
      stepAddress: { ...state.stepAddress, ...data },
    })),

  resetBooking: () => set(initialState),

  setAddresses: (addresses) => {
    set((state) => {
      const primaryAddress = addresses.find((addr) => addr.is_primary);
      return {
        ...state,
        ref: {
          ...state.ref,
          addresses,
        },
        ...(primaryAddress && {
          stepAddress: {
            ...state.stepAddress,
            addressId: primaryAddress.id,
            selectedAddressId: primaryAddress.id,
            address: primaryAddress.address,
            postalCode: primaryAddress.postal_code.toString(),
            phoneNumber: primaryAddress.phone,
            contactName: primaryAddress.name,
            latitude: primaryAddress.latitude,
            longitude: primaryAddress.longitude,
          },
        }),
      };
    });
  },

  selectAddress: (addressId) => {
    set((state) => {
      const selectedAddress = state.ref.addresses.find(
        (addr) => addr.id === addressId
      );
      if (selectedAddress) {
        return {
          ...state,
          stepAddress: {
            ...state.stepAddress,
            addressId: addressId,
            selectedAddressId: addressId,
            address: selectedAddress.address,
            postalCode: selectedAddress.postal_code.toString(),
            phoneNumber: selectedAddress.phone,
            contactName: selectedAddress.name,
            latitude: selectedAddress.latitude,
            longitude: selectedAddress.longitude,
          },
        };
      }
      return state;
    });
  },

  setProductVariants: (variants: ProductVariant[]) => {
    set((state) => ({
      ...state,
      ref: {
        ...state.ref,
        productVariants: variants,
      },
    }));
  },

  setDurations: (durations: Duration[]) => {
    set((state) => ({
      ...state,
      ref: {
        ...state.ref,
        durations,
      },
    }));
  },

  setAvailableTimes: (date, addressId, productVariantId, durationId, times) => {
    const key = `${date}_${addressId}_${productVariantId}_${durationId}`;
    set((state) => ({
      ...state,
      ref: {
        ...state.ref,
        availableTimes: {
          ...state.ref.availableTimes,
          [key]: times,
        },
      },
    }));
  },

  getAvailableTimes: (date, addressId, productVariantId, durationId) => {
    const key = `${date}_${addressId}_${productVariantId}_${durationId}`;
    return get().ref.availableTimes[key] || null;
  },
}));
