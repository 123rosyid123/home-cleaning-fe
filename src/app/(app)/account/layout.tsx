import { Metadata } from 'next';
import TabNavigation from './components/TabNavigation';

export const metadata: Metadata = {
  title: 'My Account - Home Cleaning',
  description: 'Manage your personal information and addresses',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">My Account</h1>
          <p className="text-base-content/60">Manage your personal information and addresses</p>
        </div>

        <TabNavigation />

        {children}
      </div>
    </div>
  );
} 