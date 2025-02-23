'use server';

import { buildErrorResponse, buildSuccessResponse, ErrorResponse, SuccessResponse } from '@/lib/apiResponse';
import { apiGetProductVariants } from "@/services/productService";
import { ProductVariant } from "@/types/productType";
import { AxiosError } from 'axios';

export const actionGetProductVariants = async (productIdOrCode: string): Promise<SuccessResponse<ProductVariant[]> | ErrorResponse> => {
  try {
    const response = await apiGetProductVariants(productIdOrCode);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};