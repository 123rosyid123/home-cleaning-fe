import axios from 'axios';
import { cookies } from 'next/headers';

const httpClient = axios.create({
  baseURL: process.env.BACKEND_URL,
});

// Add a request interceptor
httpClient.interceptors.request.use(async (config) => {
  // Only in server-side code
  if (typeof window === 'undefined') {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('authenticated')?.value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Handle error or just continue without token
      console.error('Error accessing cookies:', error);
    }
  }
  return config;
});

export default httpClient;
