import { GenericResponse } from './genericResponse';

export interface UserProfile {
  id: number;
  name: string | null;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// Type for get profile response
export type GetProfileResponse = GenericResponse<UserProfile>;
