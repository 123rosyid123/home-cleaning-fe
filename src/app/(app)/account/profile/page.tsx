import { cookies } from 'next/headers';
import ProfileContent from './ProfileContent';
import AddressContent from './AddressContent';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const userData = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-base-content/60">Manage your personal information and addresses</p>
        </div>

        <div role="tablist" className="tabs tabs-lifted">
          <input 
            type="radio" 
            name="profile_tabs" 
            role="tab" 
            className="tab" 
            aria-label="Profile" 
            defaultChecked
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <ProfileContent userData={userData} />
          </div>

          <input 
            type="radio" 
            name="profile_tabs" 
            role="tab" 
            className="tab" 
            aria-label="Addresses"
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <AddressContent />
          </div>
        </div>
      </div>
    </div>
  );
}
