import { createUserSession, getSession, renewCookiesFromStore } from '@/lib/session';
import { apiGetAccount } from '@/services/accountService';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_REDIRECT = '/booking';
const LOGIN_PATH = '/auth/login';

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { authenticated, user } = await getSession();

  if (pathname.startsWith('/auth')) {
    return authenticated
      ? NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url))
      : NextResponse.next();
  }

  if (!authenticated) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();

  if (!user) {
    try {
      const account = await apiGetAccount();
      if (account.success) {
        await createUserSession(account.data);
      }
    } catch (error) {
      console.error('Error getting account:', error);
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
  }

  await renewCookiesFromStore(response.cookies);
  return response;
}

export const config = {
  matcher: [
    '/booking/:path*',
    '/my-bookings/:path*',
    '/auth/:path*',
    '/account/:path*',
    '/logout',
    '/api/addresses',
    '/api/bookings/:path*',
  ],
};
