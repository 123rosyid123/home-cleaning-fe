import { actionLogout } from '@/app/actions/authActions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await actionLogout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    const response = NextResponse.redirect(
      new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')
    );
    response.cookies.delete('authenticated');
    response.cookies.delete('user');
    return response;
  }
}
