import httpClient from '@/lib/httpClient';
import { FAQ, ServiceInclusion, WhyChooseUs } from '@/types/landingPageType';

export const apiGetServiceInclusions = async (): Promise<ServiceInclusion[]> => {
  const response = await httpClient.get('/v1/landing-page/service-inclusions');
  return response.data;
};

export const apiGetWhyChooseUs = async (): Promise<WhyChooseUs> => {
  const response = await httpClient.get('/v1/landing-page/why-choose-us');
  return response.data;
};

export const apiGetFAQ = async (): Promise<FAQ> => {
  const response = await httpClient.get('/v1/landing-page/faq');
  return response.data;
};
