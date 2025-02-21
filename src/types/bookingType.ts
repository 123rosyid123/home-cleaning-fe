import { GenericResponse } from './genericResponse';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
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

export type AvailableTimeResponse = GenericResponse<AvailableTime[]>;
export type CreateBookingResponse = GenericResponse<CreateBooking>;
export type ListBookingResponse = GenericResponse<ListBookingPagination>;
export type CancelBookingResponse = GenericResponse<null>;
