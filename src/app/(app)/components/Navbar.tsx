'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
export default function Navbar() {
  const pathname = usePathname();
  const developerName = "Developer"; // This could come from your auth context/state
  const initials = developerName.charAt(0).toUpperCase();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-white/20 text-white' : 'hover:bg-yellow-100/30 text-white';
  };

  return (
    <div className="navbar bg-blue-800 text-white">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl hover:bg-gray-50/20 hover:border-transparent hover:text-white">
          <Image src="/logo-only.png" alt="Home Cleaning SG" height={30} width={30}/>
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
                {initials}
              </div>
              <span>{developerName}</span>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-sky-700 rounded-box w-52">
            <li><Link href="/booking" className="text-white hover:bg-yellow-100/30">Booking</Link></li>
            <li><Link href="/upcoming" className="text-white hover:bg-yellow-100/30">Upcoming</Link></li>
            <li><Link href="/history" className="text-white hover:bg-yellow-100/30">History</Link></li>
            <li><Link href="/rewards" className="text-white hover:bg-yellow-100/30">Rewards</Link></li>
            <li><Link href="/invoices" className="text-white hover:bg-yellow-100/30">Invoices</Link></li>
            <li className="divider"></li>
            <li>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                  {initials}
                </div>
                <span>{developerName}</span>
              </div>
            </li>
            <li><Link href="/profile" className="text-white hover:bg-yellow-100/30">Profile</Link></li>
            <li><Link href="/settings" className="text-white hover:bg-yellow-100/30">Settings</Link></li>
            <li><Link href="/logout" className="text-white hover:bg-yellow-100/30">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
