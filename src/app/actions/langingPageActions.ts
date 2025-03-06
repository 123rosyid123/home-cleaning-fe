'use server';

import { buildErrorResponse, buildSuccessResponse, ErrorResponse, SuccessResponse } from '@/lib/apiResponse';
import { apiGetFAQ, apiGetFooter, apiGetServiceInclusions, apiGetWhyChooseUs } from "@/services/landingPageService";
import { FAQ, Footer, ServiceInclusion, WhyChooseUs } from '@/types/landingPageType';
import { AxiosError } from 'axios';

export const actionGetServiceInclusions  = async (): Promise<SuccessResponse<ServiceInclusion[]> | ErrorResponse> => {
  try {
    const response = await apiGetServiceInclusions();
    return buildSuccessResponse('Service inclusions fetched successfully', response);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};

export const actionGetWhyChooseUs = async (): Promise<SuccessResponse<WhyChooseUs> | ErrorResponse> => {
  try {
    const response = await apiGetWhyChooseUs();
    return buildSuccessResponse('Why choose us fetched successfully', response);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};

export const actionGetFAQ = async (): Promise<SuccessResponse<FAQ> | ErrorResponse> => {
  try {
    const response = await apiGetFAQ();
    return buildSuccessResponse('FAQ fetched successfully', response);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};

export const actionGetFooter = async (): Promise<SuccessResponse<Footer> | ErrorResponse> => {
  try {
    const response = await apiGetFooter();
    return buildSuccessResponse('Footer fetched successfully', response);
  } catch (error) {
    return buildErrorResponse(error as Error | AxiosError);
  }
};
