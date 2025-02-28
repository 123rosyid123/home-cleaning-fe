import { GenericResponse } from './genericResponse';

export interface UserProfile {
  id: number;
  name: string | null;
  email: string;
  role: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  mobile_number: string;
  is_mobile_verified: number;
  mobile_verification_code: string | null;
  mobile_verification_code_expires_at: string | null;
}

// Type for get profile response
export type GetProfileResponse = GenericResponse<UserProfile>;
