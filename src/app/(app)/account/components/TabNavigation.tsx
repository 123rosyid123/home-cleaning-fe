'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabNavigation() {
  const pathname = usePathname();

  return (
    <div role="tablist" className="tabs tabs-border">
      <Link 
        href="/account/profile"
        role="tab" 
        className={`tab ${pathname === '/account/profile' ? 'tab-active' : ''}`}
        aria-label="Profile"
      >
        Profile
      </Link>

      <Link 
        href="/account/address"
        role="tab" 
        className={`tab ${pathname === '/account/address' ? 'tab-active' : ''}`}
        aria-label="Addresses"
      >
        Addresses
      </Link>
    </div>
  );
} 