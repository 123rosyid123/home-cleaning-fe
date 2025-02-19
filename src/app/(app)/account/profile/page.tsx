import { Metadata } from 'next';
import { cookies } from 'next/headers';
import ProfileContent from './ProfileContent';

export const metadata: Metadata = {
  title: 'Profile - Home Cleaning',
  description: 'Manage your personal information',
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const userData = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <ProfileContent userData={userData} />
  );
}
