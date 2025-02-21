import httpClient from '@/lib/httpClient';
import {
  GetProductVariantsResponse,
  GetProductsResponse,
} from '@/types/productType';

export const apiGetProducts = async (): Promise<GetProductsResponse> => {
  const response = await httpClient.get('/v1/master/products');
  return response.data;
};

export const apiGetProductVariants = async (
  productId: number
): Promise<GetProductVariantsResponse> => {
  const response = await httpClient.get(`/v1/master/products/${productId}/variants`);
  return response.data;
};
