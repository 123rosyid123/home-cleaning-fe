'use server';

import {
  ErrorResponse,
  SuccessResponse,
  buildSuccessResponse,
  buildErrorResponse,
} from '@/lib/apiResponse';
import { apiUpdateAccount } from '@/services/accountService';
import { UserProfile } from '@/types/accountType';
import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function updateProfile(
  data: Partial<UserProfile>
): Promise<SuccessResponse<UserProfile> | ErrorResponse> {
  try {
    // Server-side validation to ensure only name is updated
    const sanitizedData: Partial<UserProfile> = {
      name: data.name
    };
    
    const response = await apiUpdateAccount(sanitizedData);

    if (response.success) {
      // Update the user cookie with the new data
      const cookieStore = await cookies();
      const userCookie = cookieStore.get('user');

      if (userCookie) {
        const userData = JSON.parse(userCookie.value);
        const updatedUserData = {
          ...userData,
          ...sanitizedData,
        };

        // Set the updated user data in the cookie
        cookieStore.set('user', JSON.stringify(updatedUserData), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
        });
      }

      // Revalidate the profile page to reflect the changes
      revalidatePath('/account/profile');

      return buildSuccessResponse(response.message, response.data);
    }

    return buildErrorResponse(new Error(response.message));
  } catch (error) {
    console.error('Error updating profile:', error);
    return buildErrorResponse(error as Error | AxiosError);
  }
}
