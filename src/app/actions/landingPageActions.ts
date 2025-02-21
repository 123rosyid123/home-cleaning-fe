import { apiGetProductVariants } from "@/services/productService";
import { buildErrorResponse, buildSuccessResponse, ErrorResponse, SuccessResponse } from '@/lib/apiResponse';
import { AxiosError } from 'axios';
import { ProductVariant } from "@/types/productType";   

export const actionGetProductVariants = async (): Promise<SuccessResponse<ProductVariant[]> | ErrorResponse> => {
  try {
    const response = await apiGetProductVariants(1);
    return buildSuccessResponse(response.message, response.data);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};