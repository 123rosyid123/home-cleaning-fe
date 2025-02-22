import { GenericResponse } from './genericResponse';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface AvailableTime {
  start_time: string;
  end_time: string;
  price: number;
  price_gst: number;
  cleaner_id: number;
}

export interface AvailableTimeRequest {
  selected_date: string;
  address_id: number;
  product_variant_id: number;
  duration_id: number;
}

export interface CreateBookingRequest {
  product_variant_id: number;
  address_id: number;
  start_time: string;
  end_time: string;
  selected_date: string;
  cleaner_id: number;
  additional_notes?: string;
}

export interface CreateBooking {
  booking_id: number;
  date: string;
  start_time: string;
  end_time: string;
  total_price: string;
  status: string;
  payment_url: string;
}

export interface ListBookingRequest {
  from_date: string;
  end_date: string;
  status: BookingStatus;
  page?: number;
}

export interface ListBooking {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  total_price: number;
  product_name: string;
}

export interface ListBookingPagination {
  current_page: number;
  data: ListBooking[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface DetailBooking {
  id: string;
  user_id: string;
  cleaner_id: string;
  master_product_id: number;
  product_variant_id: string;
  address: string;
  postal_code: string;
  phone: string;
  status: BookingStatus;
  comment: string | null;
  additional_information: string | null;
  date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  promo_code: string;
  discount: number | null;
  cleaner: {
    id: string;
    name: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    is_active: boolean;
    phone: string;
  };
  product: {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
  };
  product_variant: {
    id: string;
    product_id: string;
    name: string;
    peak_price: number;
    offpeak_price: number;
    is_recurring: boolean;
    metadata: {
      type: string;
      inclusions: string[];
      priceRange: {
        max: number;
        min: number;
        gstRange: string;
      };
      cleanerInfo: string;
      isRecommended: boolean;
    };
  };
  payment: null;
}

export type AvailableTimeResponse = GenericResponse<AvailableTime[]>;
export type CreateBookingResponse = GenericResponse<CreateBooking>;
export type ListBookingResponse = GenericResponse<ListBookingPagination>;
export type CancelBookingResponse = GenericResponse<null>;
export type DetailBookingResponse = GenericResponse<DetailBooking>;