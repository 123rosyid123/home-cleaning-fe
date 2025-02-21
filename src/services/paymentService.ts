import httpClient from "@/lib/httpClient";
import { PaymentStatusResponse } from "@/types/paymentType";

export const apiGetPaymentStatus = async (reference: string): Promise<PaymentStatusResponse> => {
    const response = await httpClient.get(`/v1/payments/${reference}/status`);
    return response.data;
}   