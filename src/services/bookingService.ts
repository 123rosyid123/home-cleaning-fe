import httpClient from '@/lib/httpClient';
import {
  AvailableTimeRequest,
  AvailableTimeResponse,
  CancelBookingResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  ListBookingRequest,
  ListBookingResponse,
} from '@/types/bookingType';

export const apiAvailableTimes = async (
  payload: AvailableTimeRequest
): Promise<AvailableTimeResponse> => {
  const response = await httpClient.post(
    '/v1/bookings/available-times',
    payload
  );
  return response.data;
};

export const apiCreateBooking = async (
  payload: CreateBookingRequest
): Promise<CreateBookingResponse> => {
  const response = await httpClient.post('/v1/bookings', payload);
  return response.data;
};

export const apiListBooking = async (
  query: ListBookingRequest | undefined
): Promise<ListBookingResponse> => {
  const response = await httpClient.get('/v1/bookings', { params: query });
  return response.data;
};

export const apiCancelBooking = async (
  bookingId: string
): Promise<CancelBookingResponse> => {
  const response = await httpClient.post(`/v1/bookings/${bookingId}/cancel`);
  return response.data;
};
