'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserProfile } from '@/types/accountType';
import { updateProfile } from '@/app/actions/accountActions';
import { toast } from 'sonner';

// Updated schema to only include name
const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  // Keep these fields in the schema but don't validate them
  mobile_number: z.string().optional(),
  email: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function useProfileContent(userData: UserProfile) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData?.name || '',
      mobile_number: userData?.mobile_number || '',
      email: userData?.email || '',
    },
  });

  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form when canceling edit
      reset({
        name: userData?.name || '',
        mobile_number: userData?.mobile_number || '',
        email: userData?.email || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSubmitting(true);
      // Only send the name field for updating
      const result = await updateProfile({ name: data.name });
      
      if (result.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        // We don't need to manually update userData as the page will refresh with new data
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating your profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEditing,
    isSubmitting,
    register,
    errors,
    handleSubmit,
    onSubmit,
    toggleEditMode,
  };
}