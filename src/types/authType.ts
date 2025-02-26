import { GenericResponse } from './genericResponse';

export interface User {
  email: string;
  updated_at: string;
  created_at: string;
  email_verified_at: string | null;
  name: string | null;
  id: number;
}

export interface AuthData {
  user: User;
  token: string;
}

export type RegisterResponse = GenericResponse<AuthData>;
export type LoginResponse = GenericResponse<AuthData>;
export type ForgotPasswordResponse = GenericResponse<null>;
export type ResetPasswordResponse = GenericResponse<null>;
export type LogoutResponse = GenericResponse<null>;
export type VerifyOtpResponse = GenericResponse<null>;
export type ResendOtpResponse = GenericResponse<null>;