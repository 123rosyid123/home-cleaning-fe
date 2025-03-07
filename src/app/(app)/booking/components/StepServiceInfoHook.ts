import { useEffect } from 'react';
import axios from 'axios';
import { useBookingStore } from '@/store/bookingStore';
import { useAccountStore } from '@/store/accountStore';
import { GetAddressesResponse } from '@/types/addressType';

export const useServiceInfo = () => {
  const {
    stepAddress: {
      contactName,
      phoneNumber,
      email,
      address,
      address_floor,
      address_unit_number,
      additionalNotes,
      selectedAddressId,
      latitude,
      longitude,
    },
    ref: { addresses },
    updateStepAddress,
    setAddresses,
    selectAddress
  } = useBookingStore();

  const { account } = useAccountStore();

  useEffect(() => {
    if (account?.email && !email) {
      updateStepAddress({ email: account.email });
    }
  }, [account, email, updateStepAddress]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get<GetAddressesResponse>('/api/addresses');
        if (response.data.success && response.data.data) {
          setAddresses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    if (addresses.length === 0) {
      fetchAddresses();
    }
  }, [addresses.length, setAddresses]);

  const handleAdditionalNotesChange = (value: string) => {
    updateStepAddress({ additionalNotes: value });
  };

  return {
    contactName,
    phoneNumber,
    email,
    address,
    address_floor,
    address_unit_number,
    additionalNotes,
    addresses,
    selectedAddressId,
    latitude,
    longitude,
    isNextButtonDisabled: !contactName || !phoneNumber || !email || !address,
    selectAddress,
    handleAdditionalNotesChange,
  };
};
