'use client';

import {
  actionCreateAddress,
  actionDeleteAddress,
  actionGetAddresses,
  actionSetPrimaryAddress,
  actionUpdateAddress
} from '@/app/actions/addressActions';
import { toastError } from '@/lib/toastFe';
import { useBookingStore } from '@/store/bookingStore';
import { Address } from '@/types/addressType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Libraries } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Format phone number to E.164 format
export const formatPhoneToE164 = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit characters except the leading +
  let formattedPhone = phone.replace(/[^\d+]/g, '').replace(/\s+/g, '');
  
  // Add + at the beginning if it doesn't exist
  if (!formattedPhone.startsWith('+')) {
    formattedPhone = '+' + formattedPhone;
  }
  
  return formattedPhone;
};

// We only need geocoding, not places anymore
export const libraries: Libraries = ['places'];

const emptyAddress: Omit<Address, 'id' | 'user_id'> = {
  label: '',
  address: '',
  address_unit_number: null,
  address_floor: null,
  postal_code: '',
  latitude: 0,
  longitude: 0,
  is_primary: false,
  name: '',
  phone: '',
};

const addressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  address: z.string().min(1, 'Address is required'),
  address_unit_number: z.string().nullable(),
  address_floor: z.string().nullable(),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid international phone number'),
  postal_code: z.string().or(z.number())
    .transform(val => val.toString())
    .pipe(z.string().min(1, 'Postal code is required')),
  latitude: z.number()
    .min(-90, 'Latitude must be between -90 and 90 degrees')
    .max(90, 'Latitude must be between -90 and 90 degrees')
    .refine((val) => val !== null, 'Latitude is required')
    .refine((val) => val !== 0, 'Please enter a postal code to set location'),
  longitude: z.number()
    .min(-180, 'Longitude must be between -180 and 180 degrees')
    .max(180, 'Longitude must be between -180 and 180 degrees')
    .refine((val) => val !== null, 'Longitude is required')
    .refine((val) => val !== 0, 'Please enter a postal code to set location'),
  is_primary: z.boolean(),
  name: z.string().min(1, 'Name is required'),
});

type AddressFormData = z.infer<typeof addressSchema>;

export function useAddressContent() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const setStoreAddresses = useBookingStore(state => state.setAddresses);
  const step = useBookingStore(state => state.step);
  const router = useRouter();

  const newAddressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: emptyAddress,
  });

  const editAddressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: emptyAddress,
  });

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const result = await actionGetAddresses();
        if (result.success) {
          const addressData = result.data || [];
          setAddresses(addressData);
        } else {
          toastError(new Error(result.message));
          setError(result.message);
        }
      } catch (error: unknown) {
        toastError(error as Error);
        setError('Failed to load addresses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const getAddressFromLatLng = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    try {
      const response = await geocoder.geocode({
        location: { lat, lng },
      });

      if (response.results[0]) {
        let postalCode = '';
        // Extract postal code from address components
        response.results[0].address_components?.forEach((component) => {
          if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          }
        });

        return {
          address: response.results[0].formatted_address,
          postal_code: postalCode,
        };
      }
    } catch (error) {
      toastError(error as Error);
      setError('Failed to get address from location');
    }
    return { address: '', postal_code: '' };
  };

  const handleMapClick = useCallback(async (position: { lat: number; lng: number }) => {
    const { lat, lng } = position;
    setSelectedLocation(position);

    const { address, postal_code } = await getAddressFromLatLng(lat, lng);

    if (editingId !== null) {
      editAddressForm.setValue('address', address);
      editAddressForm.setValue('postal_code', postal_code);
      editAddressForm.setValue('latitude', lat);
      editAddressForm.setValue('longitude', lng);
    } else {
      newAddressForm.setValue('address', address);
      newAddressForm.setValue('postal_code', postal_code);
      newAddressForm.setValue('latitude', lat);
      newAddressForm.setValue('longitude', lng);
    }
  }, [editingId, editAddressForm, newAddressForm]);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleStartEdit = useCallback((address: Address) => {
    setEditingId(address.id);
    editAddressForm.reset({
      label: address.label,
      address: address.address,
      phone: formatPhoneToE164(address.phone),
      address_unit_number: address.address_unit_number,
      address_floor: address.address_floor,
      postal_code: address.postal_code,
      latitude: address.latitude,
      longitude: address.longitude,
      is_primary: address.is_primary,
      name: address.name,
    });
    if (address.latitude && address.longitude) {
      setSelectedLocation({ lat: address.latitude, lng: address.longitude });
    }
  }, [editAddressForm]);

  const handleSaveEdit = useCallback(async (data: AddressFormData) => {
    if (editingId === null) return;

    try {
      setIsLoading(true);
      // Ensure phone is in E.164 format
      const requestData = {
        id: editingId,
        ...data,
        phone: formatPhoneToE164(data.phone)
      };

      const result = await actionUpdateAddress(requestData);
      if (!result.success) {
        throw new Error(JSON.stringify(result));
      }

      // Add floor property for display consistency
      const addressWithFloor = {
        ...result.data,
        address_floor: result.data?.address_floor || null
      };
      const updatedAddresses = addresses.map(address =>
        address.id === editingId
          ? addressWithFloor
          : address
      );
      setAddresses(updatedAddresses as Address[]);
      setStoreAddresses(updatedAddresses as Address[]);

      toast.success(result.message);
      setEditingId(null);
      editAddressForm.reset(emptyAddress);
      setSelectedLocation(null);
      setShowMap(false);

    } catch (error: unknown) {
      toastError(error as Error);
      setError('Failed to update address');
    } finally {
      setIsLoading(false);
    }
  }, [editingId, editAddressForm, addresses, setStoreAddresses]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    editAddressForm.reset(emptyAddress);
    setSelectedLocation(null);
    setShowMap(false);
  }, [editAddressForm]);

  const handleAddNew = useCallback(async (data: AddressFormData) => {
    try {
      setIsLoading(true);
      // Ensure phone is in E.164 format
      const requestData = { 
        ...data,
        phone: formatPhoneToE164(data.phone)
      };
      const result = await actionCreateAddress(requestData);

      if (result.success) {
        // Add floor property for display consistency
        const addressWithFloor = {
          ...result.data,
          address_floor: result.data?.address_floor || null
        };
        const updatedAddresses = [...addresses, addressWithFloor];
        setAddresses(updatedAddresses as Address[]);
        setStoreAddresses(updatedAddresses as Address[]);

        toast.success(result.message);
        setIsAddingNew(false);
        newAddressForm.reset(emptyAddress);
        setSelectedLocation(null);
        setShowMap(false);

        // If this is the first address being added, redirect to booking page
        if (addresses.length === 0 && step === 2) {
          router.push('/booking');
        }
      } else {
        toastError(new Error(JSON.stringify(result)));
        setError(result.message);
      }
    } catch (error: unknown) {
      toastError(error as Error);
      setError('Failed to add address');
    } finally {
      setIsLoading(false);
    }
  }, [newAddressForm, addresses, setStoreAddresses, router, step]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const result = await actionDeleteAddress(id);

      if (result.success) {
        const updatedAddresses = addresses.filter(a => a.id !== id);
        setAddresses(updatedAddresses);
        setStoreAddresses(updatedAddresses as Address[]);
        setAddressToDelete(null);

        toast.success(result.message);
      } else {
        toastError(new Error(JSON.stringify(result)));
        setError(result.message);
      }
    } catch (error: unknown) {
      toastError(error as Error);
      setError('Failed to delete address');
    } finally {
      setIsLoading(false);
    }
  }, [addresses, setStoreAddresses]);

  const handleSetPrimary = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const result = await actionSetPrimaryAddress(id);

      if (result.success) {
        const updatedAddresses = addresses.map(address => ({
          ...address,
          is_primary: address.id === id,
        }));
        setAddresses(updatedAddresses);

        toast.success(result.message);
      } else {
        toastError(new Error(JSON.stringify(result)));
        setError(result.message);
      }
    } catch (error: unknown) {
      toastError(error as Error);
      setError('Failed to set primary address');
    } finally {
      setIsLoading(false);
    }
  }, [addresses]);

  // Update form values when location is selected
  useEffect(() => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      if (editingId !== null) {
        editAddressForm.setValue('latitude', lat);
        editAddressForm.setValue('longitude', lng);
      } else {
        newAddressForm.setValue('latitude', lat);
        newAddressForm.setValue('longitude', lng);
      }
    }
  }, [selectedLocation, editingId, editAddressForm, newAddressForm]);

  // New function to lookup coordinates from postal code
  const getCoordinatesFromPostalCode = useCallback(async (postalCode: string) => {
    if (!postalCode) return null;

    const geocoder = new google.maps.Geocoder();
    try {
      const response = await geocoder.geocode({
        address: `${postalCode}, Singapore`
      });

      if (response.results[0]?.geometry?.location) {
        const location = response.results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        // get real address from full address
        const { address: fullAddress } = await getAddressFromLatLng(lat, lng);

        return {
          lat,
          lng,
          address: fullAddress,
        };
      }
    } catch (error) {
      toastError(error as Error);
      setError('Failed to get location from postal code');
    }
    return null;
  }, []);

  // Handle postal code change to update map
  const handlePostalCodeChange = useCallback(async (postalCode: string) => {
    if (postalCode && postalCode.length >= 4) {
      try {
        const locationData = await getCoordinatesFromPostalCode(postalCode);
        if (locationData) {
          const { lat, lng, address } = locationData;
          setSelectedLocation({ lat, lng });
          if (mapRef.current) {
            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(15);
          }

          if (editingId !== null) {
            editAddressForm.setValue('address', address);
            editAddressForm.setValue('latitude', lat);
            editAddressForm.setValue('longitude', lng);
          } else {
            newAddressForm.setValue('address', address);
            newAddressForm.setValue('latitude', lat);
            newAddressForm.setValue('longitude', lng);
          }
        }
      } catch (error) {
        console.error('Error updating map from postal code:', error);
      }
    }
  }, [editingId, editAddressForm, newAddressForm, getCoordinatesFromPostalCode]);

  // Watch for postal code changes in both forms with debounce
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const subscription = newAddressForm.watch((value, { name }) => {
      if (name === 'postal_code' && value.postal_code) {
        // Clear existing timer
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        // Set new timer to delay API call
        debounceTimer = setTimeout(() => {
          if (value.postal_code) {
            handlePostalCodeChange(value.postal_code);
          }
        }, 500); // 500ms debounce
      }
    });

    return () => {
      subscription.unsubscribe();
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [newAddressForm, handlePostalCodeChange]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const subscription = editAddressForm.watch((value, { name }) => {
      if (name === 'postal_code' && value.postal_code) {
        // Clear existing timer
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        // Set new timer to delay API call
        debounceTimer = setTimeout(() => {
          if (value.postal_code) {
            handlePostalCodeChange(value.postal_code);
          }
        }, 500); // 500ms debounce
      }
    });

    return () => {
      subscription.unsubscribe();
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [editAddressForm, handlePostalCodeChange]);

  return {
    addresses,
    isAddingNew,
    editingId,
    showMap,
    selectedLocation,
    error,
    isLoading,
    addressToDelete,
    newAddressForm,
    editAddressForm,
    setIsAddingNew,
    setShowMap,
    setAddressToDelete,
    handleMapLoad,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleAddNew,
    handleDelete,
    handleSetPrimary,
    handleMapClick,
    handlePostalCodeChange,
  };
} 