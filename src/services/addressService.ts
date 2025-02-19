import httpClient from '@/lib/httpClient';
import {
  CreateAddressRequest,
  CreateAddressResponse,
  GetAddressesResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
} from '@/types/addressType';

export const apiGetAddresses = async (): Promise<GetAddressesResponse> => {
  const response = await httpClient.get('/v1/addresses');
  return response.data;
};

export const apiCreateAddress = async (
  address: CreateAddressRequest
): Promise<CreateAddressResponse> => {
  const response = await httpClient.post('/v1/addresses', address);
  return response.data;
};

export const apiUpdateAddress = async (
  address: UpdateAddressRequest
): Promise<UpdateAddressResponse> => {
  const response = await httpClient.put(
    `/v1/addresses/${address.id}`,
    address
  );
  return response.data;
};

export const apiDeleteAddress = async (id: string): Promise<void> => {
  await httpClient.delete(`/v1/addresses/${id}`);
};

export const apiSetPrimaryAddress = async (id: string): Promise<void> => {
  await httpClient.put(`/v1/addresses/${id}/set-primary`);
};
