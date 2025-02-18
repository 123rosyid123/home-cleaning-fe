import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

const DEFAULT_REDIRECT = '/booking';
const LOGIN_PATH = '/auth/login';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { authenticated } = await getSession();

  if (pathname.startsWith('/auth')) {
    if (authenticated) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/booking',
    '/auth/:path*',
  ],
};
