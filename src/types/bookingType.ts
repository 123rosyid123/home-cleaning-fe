import { GenericResponse } from './genericResponse';

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

export type AvailableTimeResponse = GenericResponse<AvailableTime[]>;
export type CreateBookingResponse = GenericResponse<CreateBooking>;