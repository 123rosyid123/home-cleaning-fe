'use client';

import { UserProfile } from '@/types/accountType';
import { UserCircle, CheckCircle, Pencil, X, Save } from 'lucide-react';
import { useProfileContent } from './ProfileContentHook';
import { Toaster } from 'sonner';

interface ProfileContentProps {
  userData: UserProfile
}

export default function ProfileContent({ userData }: ProfileContentProps) {
  const {
    isEditing,
    isSubmitting,
    register,
    errors,
    handleSubmit,
    onSubmit,
    toggleEditMode
  } = useProfileContent(userData);

  return (
    <div className="card bg-base-100 shadow-xl mb-8">
      <Toaster position="top-center" />
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-center">
            <div className="avatar placeholder">
              <div className="bg-primary/10 text-primary rounded-full w-24 flex items-center justify-center">
                <UserCircle className="w-24 h-24" />
              </div>
            </div>
          </div>
          
          <button 
            onClick={toggleEditMode}
            className={`btn ${isEditing ? 'btn-ghost' : 'btn-primary'} btn-sm gap-2`}
            disabled={isSubmitting}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="border-b border-base-300 pb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input 
                type="text" 
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                {...register('name')} 
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                </label>
              )}
            </div>

            <div className="border-b border-base-300 pb-4">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <div className="flex flex-col">
                <input 
                  type="text" 
                  className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                  {...register('mobile_number')} 
                  readOnly
                  disabled
                />
                {userData?.is_mobile_verified === 1 && (
                  <span className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm overflow-hidden mt-2 self-start">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                    <span className="absolute inset-0 w-1/4 h-full bg-white/20 animate-[shine_2s_infinite]" 
                      style={{
                        animation: 'shine 2s infinite',
                        backgroundImage: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.5), transparent)',
                        transform: 'skewX(-20deg)'
                      }}
                    />
                  </span>
                )}
              </div>
            </div>

            <div className="border-b border-base-300 pb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                {...register('email')} 
                readOnly
                disabled
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="btn btn-primary gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="border-b border-base-300 pb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <p className="text-lg font-semibold">{userData?.name || 'Not available'}</p>
            </div>

            <div className="border-b border-base-300 pb-4">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{userData?.mobile_number || 'Not available'}</p>
                {userData?.is_mobile_verified === 1 && (
                  <span className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm overflow-hidden">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                    <span className="absolute inset-0 w-1/4 h-full bg-white/20 animate-[shine_2s_infinite]" 
                      style={{
                        animation: 'shine 2s infinite',
                        backgroundImage: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.5), transparent)',
                        transform: 'skewX(-20deg)'
                      }}
                    />
                  </span>
                )}
              </div>
            </div>

            <div className="border-b border-base-300 pb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <p className="text-lg font-semibold">{userData?.email || 'Not available'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
