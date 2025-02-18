import { AxiosError } from "axios";

export const getErrorMessage = (error: Error|AxiosError) => {
    if (error instanceof AxiosError) {
        return error.response?.data?.message || error.message;
    }
    return error.message;
}