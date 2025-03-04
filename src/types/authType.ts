import { UserProfile } from './accountType';
import { GenericResponse } from './genericResponse';

export interface AuthData {
  user: UserProfile;
  token: string;
}

export type RegisterResponse = GenericResponse<AuthData>;
export type LoginResponse = GenericResponse<AuthData>;
export type ForgotPasswordResponse = GenericResponse<null>;
export type ResetPasswordResponse = GenericResponse<null>;
export type LogoutResponse = GenericResponse<null>;
export type VerifyOtpResponse = GenericResponse<AuthData>;
export type ResendOtpResponse = GenericResponse<null>;