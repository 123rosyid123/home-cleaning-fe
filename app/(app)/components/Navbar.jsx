'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const developerName = "Developer"; // This could come from your auth context/state
  const initials = developerName.charAt(0).toUpperCase();

  const isActive = (path) => {
    return pathname === path ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white';
  };

  return (
    <div className="navbar bg-sky-700 text-white">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          <span className="text-white font-bold">luce</span>
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
                {initials}
              </div>
              <span>{developerName}</span>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-sky-700 rounded-box w-52">
              <li><Link href="/profile" className="text-white hover:bg-white/10">Profile</Link></li>
              <li><Link href="/settings" className="text-white hover:bg-white/10">Settings</Link></li>
              <li><Link href="/logout" className="text-white hover:bg-white/10">Logout</Link></li>
            </ul>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-sky-700 rounded-box w-52">
            <li><Link href="/booking" className="text-white hover:bg-white/10">Booking</Link></li>
            <li><Link href="/upcoming" className="text-white hover:bg-white/10">Upcoming</Link></li>
            <li><Link href="/history" className="text-white hover:bg-white/10">History</Link></li>
            <li><Link href="/rewards" className="text-white hover:bg-white/10">Rewards</Link></li>
            <li><Link href="/invoices" className="text-white hover:bg-white/10">Invoices</Link></li>
            <li className="divider"></li>
            <li>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                  {initials}
                </div>
                <span>{developerName}</span>
              </div>
            </li>
            <li><Link href="/profile" className="text-white hover:bg-white/10">Profile</Link></li>
            <li><Link href="/settings" className="text-white hover:bg-white/10">Settings</Link></li>
            <li><Link href="/logout" className="text-white hover:bg-white/10">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
