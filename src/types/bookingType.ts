import { GenericResponse } from './genericResponse';
import { PaymentStatusEnum } from './paymentType';
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
  cleaner_id: string;
}

export interface AvailableTimeRequest {
  selected_date: string;
  address_id: string;
  product_variant_id: string;
  duration_id: string;
}

export interface CreateBookingRequest {
  product_variant_id: string;
  address_id: string;
  start_time: string;
  end_time: string;
  selected_date: string;
  cleaner_id: string;
  additional_notes?: string;
}

export interface CreateBooking {
  booking_id: string;
  date: string;
  start_time: string;
  end_time: string;
  total_price: string;
  status: string;
  payment_url: string;
}

export interface ListBookingRequest {
  start_date: string;
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
  master_product_id: string;
  product_variant_id: string;
  address: string;
  postal_code: string;
  phone: string;
  name: string;
  status: BookingStatus;
  comment: string | null;
  additional_information: string | null;
  date: string;
  start_time: string;
  end_time: string;
  latitude: string;
  longitude: string;
  total_price: number;
  promo_code: string;
  discount: number | null;
  cleaner: Cleaner;
  product: Product;
  product_variant: ProductVariant;
  payments: Payment[] | null;
}

export interface Cleaner {
  id: string;
  name: string;
  postal_code: string;
  latitude: string;
  longitude: string;
  is_active: boolean;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  peak_price: number;
  offpeak_price: number;
  is_recurring: boolean;
  metadata: ProductMetadata;
}

export interface ProductMetadata {
  type: string;
  inclusions: string[];
  priceRange: PriceRange;
  cleanerInfo: string;
  isRecommended: boolean;
}

export interface PriceRange {
  max: number;
  min: number;
  gstRange: string;
}

export interface Payment {
  id: string;
  reference_id: string;
  user_id: string;
  booking_id: string;
  raw_response: string;
  status: PaymentStatusEnum;
  amount: number;
  checkout_url: string;
  pivot: PaymentPivot;
}

export interface PaymentPivot {
  booking_id: string;
  payment_id: number;
}

export type AvailableTimeResponse = GenericResponse<AvailableTime[]>;
export type CreateBookingResponse = GenericResponse<CreateBooking>;
export type ListBookingResponse = GenericResponse<ListBookingPagination>;
export type CancelBookingResponse = GenericResponse<null>;
export type DetailBookingResponse = GenericResponse<DetailBooking>;
