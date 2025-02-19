'use server';

import { clearSession } from '@/lib/session';
import { apiLogout } from '@/services/authService';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  try {
    await apiLogout();
    await clearSession();
    redirect('/auth/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
}
