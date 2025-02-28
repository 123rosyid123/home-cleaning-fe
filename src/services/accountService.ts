import httpClient from '@/lib/httpClient';
import { GetProfileResponse, UserProfile } from '@/types/accountType';

export const apiGetAccount = async (): Promise<GetProfileResponse> => {
  const response = await httpClient.get('/v1/account/profile');
  return response.data;
};

export const apiUpdateAccount = async (data: Partial<UserProfile>): Promise<GetProfileResponse> => {
  const response = await httpClient.put('/v1/account/profile', data);
  return response.data;
};
