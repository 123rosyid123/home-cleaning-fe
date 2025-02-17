'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';

export default function AppLayout({ children }) {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? 'bg-primary text-primary-content' : 'hover:bg-base-200';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}