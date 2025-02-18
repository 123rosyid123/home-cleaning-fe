import httpClient from "@/lib/httpClient";
import { GetProfileResponse } from "@/types/accountType";

export const getAccount = async (): Promise<GetProfileResponse> => {
    const response = await httpClient.get('/v1/account');
    return response.data;
}