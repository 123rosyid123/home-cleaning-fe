import { UserProfile } from '@/types/accountType';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import 'server-only';

// max age is 1 week
const maxAge = 7 * 24 * 60 * 60;

interface CookieStore {
  set: (
    name: string,
    value: string,
    options: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: 'lax' | 'strict' | 'none';
      path: string;
      maxAge: number;
    }
  ) => void;
  delete: (name: string) => void;
  get: (name: string) => { value: string } | undefined;
}

interface SessionData {
  authenticated: string | undefined;
  user: string | undefined;
}

const setCookie = (
  cookieStore: CookieStore,
  name: string,
  value: string,
  maxAge: number,
  httpOnly = true
) => {
  cookieStore.set(name, value, {
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
};

export async function renewCookiesFromStore(cookieStore: CookieStore) {
  const { authenticated, user } = await getSession();

  if (authenticated) {
    setCookie(cookieStore, 'authenticated', authenticated, maxAge);
  }

  if (user) {
    setCookie(cookieStore, 'user', user, maxAge, false);
  }
}

export async function createSession(token: string) {
  const cookieStore = await cookies();
  setCookie(cookieStore, 'authenticated', token, maxAge);
}

export async function createUserSession(payload: UserProfile) {
  const cookieStore = await cookies();
  setCookie(cookieStore, 'user', JSON.stringify(payload), maxAge, false);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('authenticated');
  cookieStore.delete('user');
}

export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();

  const authenticated = cookieStore.get('authenticated')?.value;
  const user = cookieStore.get('user')?.value;

  return {
    authenticated,
    user,
  };
}

interface TokenResponse {
  access_token: string;
}

export function setTokens(response: NextResponse, { access_token }: TokenResponse) {
  setCookie(response.cookies, 'authenticated', access_token, maxAge);
  return response;
}
