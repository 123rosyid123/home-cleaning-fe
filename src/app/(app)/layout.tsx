import Navbar from './components/Navbar';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { UserProfile } from '@/types/accountType';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getSession();

  if (!user) {
    return redirect('/auth/login');
  }

  try {
    const userData = JSON.parse(user) as UserProfile;
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={userData} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error parsing user data:', error);
    return redirect('/auth/login');
  }
}