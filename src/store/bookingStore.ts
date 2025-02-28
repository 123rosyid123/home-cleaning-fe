import { Address } from '@/types/addressType';
import { AvailableTime } from '@/types/bookingType';
import { Duration } from '@/types/durationType';
import { ProductVariant } from '@/types/productType';
import { create } from 'zustand';

type StepService = {
  durationId: string;
  productVariantId: string;
  frequency: string;
  duration: string;
};

type StepSlot = {
  date: Date | null;
  startTime: string;
  endTime: string;
  price_gst: number;
  price: number;
  cleanerId: string;
  total_price_gst: number;
};

type StepAddress = {
  addressId: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  additionalNotes: string;
  latitude: number | null;
  longitude: number | null;
  selectedAddressId: string | null;
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
  selectAddress: (addressId: string) => void;
  setProductVariants: (variants: ProductVariant[]) => void;
  setDurations: (durations: Duration[]) => void;
  setAvailableTimes: (
    date: string,
    addressId: string,
    productVariantId: string,
    durationId: string,
    times: AvailableTime[]
  ) => void;
  getAvailableTimes: (
    date: string,
    addressId: string,
    productVariantId: string,
    durationId: string
  ) => AvailableTime[] | null;
};

const initialState = {
  step: 1,
  stepService: {
    durationId: '',
    productVariantId: '',
    frequency: '',
    duration: '',
  },
  stepSlot: {
    date: null,
    startTime: '',
    endTime: '',
    price_gst: 0,
    total_price_gst: 0,
    price: 0,
    cleanerId: '',
  },
  stepAddress: {
    addressId: '',
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
            postalCode: primaryAddress.postal_code?.toString() || '',
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
