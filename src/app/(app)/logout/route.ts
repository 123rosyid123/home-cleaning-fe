import { clearSession } from '@/lib/session';
import { apiLogout } from '@/services/authService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await apiLogout();
    await clearSession();
    return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  }
} 