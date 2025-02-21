'use server';

import {
  buildErrorResponse,
  buildSuccessResponse,
  ErrorResponse,
  SuccessResponse,
} from '@/lib/apiResponse';
import { apiCancelBooking, apiListBooking } from '@/services/bookingService';
import { ListBookingPagination, ListBookingRequest } from '@/types/bookingType';
import { AxiosError } from 'axios';

export const actionListBooking = async (
  query: ListBookingRequest
): Promise<SuccessResponse<ListBookingPagination> | ErrorResponse> => {
  try {
    const response = await apiListBooking(query);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};

export const actionCancelBooking = async (
  bookingId: string
): Promise<SuccessResponse<null> | ErrorResponse> => {
  try {
    const response = await apiCancelBooking(bookingId);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};
