'use server';

import { buildErrorResponse, buildSuccessResponse, ErrorResponse, SuccessResponse } from '@/lib/apiResponse';
import { apiGetPaymentStatus } from "@/services/paymentService";
import { PaymentStatus } from '@/types/paymentType';
import { AxiosError } from 'axios';
export const actionGetPaymentStatus = async (reference: string): Promise<SuccessResponse<PaymentStatus> | ErrorResponse> => {
    try {
        const response = await apiGetPaymentStatus(reference);
        return buildSuccessResponse(response.message, response.data);
    } catch (error) {
        return buildErrorResponse(error as Error | AxiosError);
    }
}