import Navbar from './components/Navbar';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';


export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getSession();

  if (!user) {
    return redirect('/auth/login');
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={JSON.parse(user)} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}