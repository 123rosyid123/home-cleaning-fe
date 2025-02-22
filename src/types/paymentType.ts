import { GenericResponse } from "./genericResponse";

export type PaymentStatus = {
    status: string;
    payment_url: string;
};

export enum PaymentStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  EXPIRED = 'expired',
}

export type PaymentStatusResponse = GenericResponse<PaymentStatus>;
