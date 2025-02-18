'use client';

import { useEffect } from 'react';
import { logoutAction } from './action';

export default function LogoutPage() {
  useEffect(() => {
    logoutAction();
  }, []);

  return null;
}
