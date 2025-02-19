'use client';

import { UserCircle } from 'lucide-react';

interface ProfileContentProps {
  userData: {
    name: string;
    email: string;
  } | null;
}

export default function ProfileContent({ userData }: ProfileContentProps) {
  return (
    <div className="card bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <div className="flex justify-center mb-6">
          <div className="avatar placeholder">
            <div className="bg-primary/10 text-primary rounded-full w-24 flex items-center justify-center">
              <UserCircle className="w-24 h-24" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-base-300 pb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <p className="text-lg font-semibold">{userData?.name || 'Not available'}</p>
          </div>

          <div className="border-b border-base-300 pb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <p className="text-lg font-semibold">{userData?.email || 'Not available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
