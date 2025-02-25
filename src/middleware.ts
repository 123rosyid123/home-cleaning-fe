import { clearSession, createUserSession, getSession, renewCookiesFromStore } from '@/lib/session';
import { apiGetAccount } from '@/services/accountService';
import { NextRequest, NextResponse } from 'next/server';

// Configurable paths - could be moved to environment variables
const DEFAULT_REDIRECT = process.env.DEFAULT_REDIRECT_PATH || '/booking';
const LOGIN_PATH = process.env.LOGIN_PATH || '/auth/login';

// Authentication error types for better handling
enum AuthError {
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Handles redirection to login page with proper redirect parameters
 */
function redirectToLogin(request: NextRequest, error?: AuthError): NextResponse {
  const { pathname, search } = request.nextUrl;
  const loginUrl = new URL(LOGIN_PATH, request.url);

  // Add the current path as redirect parameter
  loginUrl.searchParams.set('redirect', pathname + search);

  // Add error information for the login page if available
  if (error) {
    loginUrl.searchParams.set('error', error);
  }

  return NextResponse.redirect(loginUrl);
}

/**
 * Handles authentication errors by clearing session and redirecting to login
 */
async function handleAuthError(
  error: unknown,
  request: NextRequest,
  context: string = 'middleware'
): Promise<NextResponse> {
  // Log error information
  console.error(`Error in ${context}:`, {
    url: request.nextUrl.pathname,
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
  });

  // Clear session
  await clearSession();

  // Determine error type
  let authError = AuthError.UNKNOWN_ERROR;
  if (error instanceof Error && error.message.includes('network')) {
    authError = AuthError.NETWORK_ERROR;
  }

  // Redirect to login with appropriate error
  return redirectToLogin(request, authError);
}

/**
 * Fetches user account information when session exists but user profile is missing
 */
async function fetchUserAccount(request: NextRequest): Promise<NextResponse> {
  try {
    const account = await apiGetAccount();

    if (account.success) {
      await createUserSession(account.data);
      const response = NextResponse.next();
      await renewCookiesFromStore(response.cookies);
      return response;
    } else {
      // Handle unsuccessful response but with no error thrown
      console.warn('Account API returned unsuccessful response:', account);
      return redirectToLogin(request, AuthError.SESSION_EXPIRED);
    }
  } catch (error) {
    return handleAuthError(error, request, 'account fetching');
  }
}

export default async function middleware(request: NextRequest) {
  // Skip middleware for static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Continue with response preparation
  const response = NextResponse.next();
  try {
    const { pathname } = request.nextUrl;
    const { authenticated, user } = await getSession();

    // Handle auth paths (login, register, etc.)
    if (pathname.startsWith('/auth')) {
      return authenticated
        ? NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url))
        : NextResponse.next();
    }

    // Handle unauthenticated requests
    if (!authenticated) {
      return redirectToLogin(request);
    }

    // Fetch user account if missing from session
    if (!user) {
      return await fetchUserAccount(request);
    }

    // Renew cookies and return response
    await renewCookiesFromStore(response.cookies);
    return response;
  } catch (error) {
    return handleAuthError(error, request);
  }
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
