import httpClient from '@/lib/httpClient';
import {
  AvailableTimeRequest,
  AvailableTimeResponse,
  CreateBookingRequest,
  CreateBookingResponse,
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

export const apiCreateBooking = async (payload: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const response = await httpClient.post(
    '/v1/bookings',
    payload
  );
  return response.data;
};