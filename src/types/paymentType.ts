import { GenericResponse } from "./genericResponse";

export type PaymentStatus = {
    status: string;
    payment_url: string;
};

export type PaymentStatusResponse = GenericResponse<PaymentStatus>;
