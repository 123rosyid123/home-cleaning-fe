import httpClient from "@/lib/httpClient";
import { DurationResponse } from "@/types/durationType";

export const apiGetDurations = async (): Promise<DurationResponse> => {
    const response = await httpClient.get('/v1/master/durations');
    return response.data;
  };