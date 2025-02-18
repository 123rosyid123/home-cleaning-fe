import httpClient from "@/lib/httpClient";
import { RegisterResponse, LoginResponse } from "@/types/authType";

export const apiLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await httpClient.post('/v1/auth/login', { email, password });
  return response.data;
};

export const apiRegister = async (email: string, password: string, passwordConfirmation: string): Promise<RegisterResponse> => {
  const response = await httpClient.post('/v1/auth/register', { email, password, password_confirmation: passwordConfirmation });
  return response.data;
};
