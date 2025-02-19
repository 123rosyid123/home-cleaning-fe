import { getSession } from '@/lib/session';
import { apiGetAccount } from '@/services/accountService';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_REDIRECT = '/booking';
const LOGIN_PATH = '/auth/login';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { authenticated, user } = await getSession();

  if (pathname.startsWith('/auth')) {
    if (authenticated) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    const intendedUrl = pathname + request.nextUrl.search;
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set('redirect', intendedUrl);
    return NextResponse.redirect(loginUrl);
  }

  // Create a new headers object
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${authenticated}`);

  // Create the response with modified headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!user) {
    try {
      const account = await apiGetAccount();
      if (account.success) {
        response.cookies.set('user', JSON.stringify(account.data));
      }
    } catch (error) {
      console.error('Error getting account:', error);
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
  }

  response.cookies.set('authenticated', authenticated);
  return response;
}

export const config = {
  matcher: ['/booking', '/auth/:path*', '/account/:path*', '/logout'],
};
