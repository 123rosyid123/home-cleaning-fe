import { GenericResponse } from './genericResponse';

export interface Address {
  id: string;
  label: string;
  is_primary: boolean;
  user_id: string;
  address: string;
  address_unit_number: string | null;
  postal_code: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
}

// Type for get addresses response
export type GetAddressesResponse = GenericResponse<Address[]>;

// Type for create address request
export type CreateAddressRequest = Omit<
  Address,
  'id' | 'user_id' | 'is_primary'
>;
export type CreateAddressResponse = GenericResponse<Address>;

// Type for update address request
export type UpdateAddressRequest = Partial<Address>;
export type UpdateAddressResponse = GenericResponse<Address>;

// Type for delete address request
export type DeleteAddressRequest = Pick<Address, 'id'>;
export type DeleteAddressResponse = GenericResponse<void>;

// Type for set primary address request
export type SetPrimaryAddressRequest = Pick<Address, 'id'>;
export type SetPrimaryAddressResponse = GenericResponse<void>;
