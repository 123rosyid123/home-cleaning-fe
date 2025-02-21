'use server';

import { 
  apiGetAddresses, 
  apiCreateAddress, 
  apiUpdateAddress, 
  apiDeleteAddress, 
  apiSetPrimaryAddress 
} from '@/services/addressService';
import { 
  Address,
  CreateAddressRequest, 
  UpdateAddressRequest 
} from '@/types/addressType';
import { revalidatePath } from 'next/cache';
import { buildSuccessResponse, buildErrorResponse, SuccessResponse, ErrorResponse } from '@/lib/apiResponse';
import { AxiosError } from 'axios';

export async function actionGetAddresses(): Promise<SuccessResponse<Address[]> | ErrorResponse> {
  try {
    const response = await apiGetAddresses();
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export async function actionCreateAddress(address: CreateAddressRequest) {
  try {
    const response = await apiCreateAddress(address);
    revalidatePath('/account/profile');
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export async function actionUpdateAddress(address: UpdateAddressRequest) {
  try {
    const response = await apiUpdateAddress(address);
    revalidatePath('/account/profile');
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export async function actionDeleteAddress(id: string) {
  try {
    await apiDeleteAddress(id);
    revalidatePath('/account/profile');
    return buildSuccessResponse('Address deleted successfully');
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
}

export async function actionSetPrimaryAddress(id: string) {
  try {
    await apiSetPrimaryAddress(id);
    revalidatePath('/account/profile');
    return buildSuccessResponse('Primary address set successfully');
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
} 