'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAccountStore } from '@/store/accountStore';
import { UserProfile } from '@/types/accountType';
import { useEffect } from 'react';

export default function Navbar({ user }: { user: UserProfile }) {
  const pathname = usePathname();

  const { account, setAccount } = useAccountStore();
  const isActive = (path: string) => {
    return pathname === path ? 'bg-white/20 text-white' : 'hover:bg-yellow-100/30 text-white';
  };

  useEffect(() => {
    setAccount(user);
  }, [user, setAccount]);

  return (
    <div className="navbar bg-blue-800 text-white">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl hover:bg-gray-50/20 hover:border-transparent hover:text-white">
          <Image src="/logo-only.png" alt="Home Cleaning SG" height={30} width={30} />
          <span className=" font-bold">Home Cleaning SG</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link href="/booking" className={`rounded-lg ${isActive('/booking')}`}>
              Booking
            </Link>
          </li>
          <li>
            <Link href="/upcoming" className={`rounded-lg ${isActive('/upcoming')}`}>
              Upcoming
            </Link>
          </li>
          <li>
            <Link href="/history" className={`rounded-lg ${isActive('/history')}`}>
              History
            </Link>
          </li>
          <li>
            <Link href="/rewards" className={`rounded-lg ${isActive('/rewards')}`}>
              Rewards
            </Link>
          </li>
          <li>
            <Link href="/invoices" className={`rounded-lg ${isActive('/invoices')}`}>
              Invoices
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* Desktop Account Menu */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                {account?.name?.charAt(0).toUpperCase() || account?.email?.charAt(0).toUpperCase()}
              </div>
              <span>{account?.name || account?.email?.split('@')[0]}</span>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-700 rounded-box w-52">
              <li><Link href="/profile" className="text-white hover:bg-yellow-100/30">Profile</Link></li>
              <li><Link href="/settings" className="text-white hover:bg-yellow-100/30">Settings</Link></li>
              <li><Link href="/logout" className="text-white hover:bg-yellow-100/30">Logout</Link></li>
            </ul>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-blue-800 rounded-xl w-72">
            {/* User Profile Section */}
            <li className="mb-2">
              <div className="flex items-center gap-3 px-2 py-3 bg-blue-700/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-semibold">
                  {account?.name?.charAt(0).toUpperCase() || account?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{account?.name || account?.email?.split('@')[0]}</span>
                  <span className="text-xs text-gray-300">{account?.email}</span>
                </div>
              </div>
            </li>
            
            {/* Navigation Links */}
            <li><Link href="/booking" className="text-white hover:bg-blue-700/50 active:bg-blue-600/50 py-3 mb-1 rounded-lg">Booking</Link></li>
            <li><Link href="/upcoming" className="text-white hover:bg-blue-700/50 active:bg-blue-600/50 py-3 mb-1 rounded-lg">Upcoming</Link></li>
            <li><Link href="/history" className="text-white hover:bg-blue-700/50 active:bg-blue-600/50 py-3 mb-1 rounded-lg">History</Link></li>
            <li><Link href="/rewards" className="text-white hover:bg-blue-700/50 active:bg-blue-600/50 py-3 mb-1 rounded-lg">Rewards</Link></li>
            <li><Link href="/invoices" className="text-white hover:bg-blue-700/50 active:bg-blue-600/50 py-3 mb-1 rounded-lg">Invoices</Link></li>
            
            <div className="divider my-1"></div>
            
            {/* Account Management */}
            <li><Link href="/profile" className="text-white hover:bg-blue-700/50 active:bg-blue-600/50 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link></li>
            <li><Link href="/settings" className="text-white hover:bg-blue-700/50 active:bg-blue-600/50 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link></li>
            <li><Link href="/logout" className="text-white hover:bg-red-500/30 active:bg-red-600/30 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
