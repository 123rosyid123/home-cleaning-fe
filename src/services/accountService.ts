import httpClient from "@/lib/httpClient";
import { GetProfileResponse } from "@/types/accountType";

export const apiGetAccount = async (): Promise<GetProfileResponse> => {
    const response = await httpClient.get('/v1/account/profile');
    return response.data;
}
