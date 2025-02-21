'use client';

import {
  actionCreateAddress,
  actionDeleteAddress,
  actionGetAddresses,
  actionSetPrimaryAddress,
  actionUpdateAddress
} from '@/app/actions/addressActions';
import { Address } from '@/types/addressType';
import { useBookingStore } from '@/store/bookingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Libraries } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ApiErrorResponse = {
  success: false;
  message: string;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const libraries: Libraries = ['places'];

const emptyAddress: Omit<Address, 'id' | 'user_id'> = {
  label: '',
  address: '',
  postal_code: '',
  latitude: null,
  longitude: null,
  phone: '',
  is_primary: false,
  name: '',
};

const addressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  address: z.string().min(1, 'Address is required'),
  postal_code: z.string().or(z.number())
    .transform(val => val.toString())
    .pipe(z.string().min(1, 'Postal code is required')),
  phone: z.string().min(1, 'Phone number is required'),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  is_primary: z.boolean(),
  name: z.string().min(1, 'Name is required'),
});

type AddressFormData = z.infer<typeof addressSchema>;

export function useAddressContent() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const setStoreAddresses = useBookingStore(state => state.setAddresses);

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
          setStoreAddresses(addressData);
        } else {
          toast.error(result.message);
          setError(result.message);
        }
      } catch (error: unknown) {
        console.error('Failed to load addresses:', error);
        toast.error('Failed to load addresses');
        setError('Failed to load addresses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [setStoreAddresses]);

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
      console.error('Geocoder failed:', error);
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

  const handleSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  }, []);

  const handlePlacesChanged = useCallback(() => {
    if (!searchBoxRef.current || !mapRef.current) return;

    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry?.location;

      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        const position = { lat, lng };

        setSelectedLocation(position);
        mapRef.current.panTo(position);
        mapRef.current.setZoom(15);

        let postalCode = '';
        // Extract postal code from address components
        place.address_components?.forEach((component) => {
          if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          }
        });

        const addressData = {
          address: place.formatted_address || '',
          postal_code: postalCode,
          latitude: lat,
          longitude: lng,
        };

        if (editingId !== null) {
          editAddressForm.setValue('address', addressData.address);
          editAddressForm.setValue('postal_code', addressData.postal_code);
          editAddressForm.setValue('latitude', addressData.latitude);
          editAddressForm.setValue('longitude', addressData.longitude);
        } else {
          newAddressForm.setValue('address', addressData.address);
          newAddressForm.setValue('postal_code', addressData.postal_code);
          newAddressForm.setValue('latitude', addressData.latitude);
          newAddressForm.setValue('longitude', addressData.longitude);
        }
      }
    }
  }, [editingId, editAddressForm, newAddressForm]);

  const handleGetCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const userLocation = { lat, lng };

        setSelectedLocation(userLocation);
        if (mapRef.current) {
          mapRef.current.panTo(userLocation);
          mapRef.current.setZoom(15);
        }

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
      },
      (error) => {
        setError('Error getting location: ' + error.message);
      }
    );
  }, [editingId, editAddressForm, newAddressForm]);

  const handleStartEdit = useCallback((address: Address) => {
    setEditingId(address.id);
    editAddressForm.reset({
      label: address.label,
      address: address.address,
      postal_code: address.postal_code,
      latitude: address.latitude,
      longitude: address.longitude,
      phone: address.phone,
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
      const result = await actionUpdateAddress({
        id: editingId,
        ...data
      }) as ApiResponse<Address>;

      if (result.success) {
        const updatedAddresses = addresses.map(address =>
          address.id === editingId
            ? result.data
            : address
        );
        setAddresses(updatedAddresses);
        setStoreAddresses(updatedAddresses);

        toast.success(result.message);
        setEditingId(null);
        editAddressForm.reset(emptyAddress);
        setSelectedLocation(null);
        setShowMap(false);
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (error: unknown) {
      console.error('Failed to update address:', error);
      toast.error('Failed to update address');
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
      const result = await actionCreateAddress(data) as ApiResponse<Address>;

      if (result.success) {
        const updatedAddresses = [...addresses, result.data];
        setAddresses(updatedAddresses);
        setStoreAddresses(updatedAddresses);
        
        toast.success(result.message);
        setIsAddingNew(false);
        newAddressForm.reset(emptyAddress);
        setSelectedLocation(null);
        setShowMap(false);
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (error: unknown) {
      console.error('Failed to add address:', error);
      toast.error('Failed to add address');
      setError('Failed to add address');
    } finally {
      setIsLoading(false);
    }
  }, [newAddressForm, addresses, setStoreAddresses]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      const result = await actionDeleteAddress(id.toString()) as ApiResponse<void>;

      if (result.success) {
        const updatedAddresses = addresses.filter(a => a.id !== id);
        setAddresses(updatedAddresses);
        setStoreAddresses(updatedAddresses);
        
        toast.success(result.message);
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (error: unknown) {
      console.error('Failed to delete address:', error);
      toast.error('Failed to delete address');
      setError('Failed to delete address');
    } finally {
      setIsLoading(false);
    }
  }, [addresses, setStoreAddresses]);

  const handleSetPrimary = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      const result = await actionSetPrimaryAddress(id.toString()) as ApiResponse<void>;

      if (result.success) {
        const updatedAddresses = addresses.map(address => ({
          ...address,
          is_primary: address.id === id,
        }));
        setAddresses(updatedAddresses);
        setStoreAddresses(updatedAddresses);
        
        toast.success(result.message);
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (error: unknown) {
      console.error('Failed to set primary address:', error);
      toast.error('Failed to set primary address');
      setError('Failed to set primary address');
    } finally {
      setIsLoading(false);
    }
  }, [addresses, setStoreAddresses]);

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

  return {
    addresses,
    isAddingNew,
    editingId,
    showMap,
    selectedLocation,
    error,
    isLoading,
    newAddressForm,
    editAddressForm,
    setIsAddingNew,
    setShowMap,
    handleMapLoad,
    handleSearchBoxLoad,
    handlePlacesChanged,
    handleGetCurrentLocation,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleAddNew,
    handleDelete,
    handleSetPrimary,
    handleMapClick,
  };
} 