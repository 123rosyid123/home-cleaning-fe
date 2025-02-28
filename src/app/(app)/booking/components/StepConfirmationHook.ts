import { useBookingStore } from '@/store/bookingStore';
import { CreateBookingRequest } from '@/types/bookingType';
import axios from 'axios';
import { useState } from 'react';
import { format } from 'date-fns';

export const useConfirmation = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    stepService: { frequency, duration, productVariantId },
    stepSlot: { date, price_gst, startTime, endTime, cleanerId, total_price_gst },
    stepAddress: {
      addressId,
      contactName,
      phoneNumber,
      email,
      address,
      postalCode,
      additionalNotes,
    },
  } = useBookingStore();

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);

      const payload: CreateBookingRequest = {
        product_variant_id: productVariantId,
        address_id: addressId,
        start_time: startTime,
        end_time: endTime,
        selected_date: format(date as Date, 'yyyy-MM-dd'),
        cleaner_id: cleanerId,
        additional_notes: additionalNotes,
      };
      const { data } = await axios.post('/api/bookings/create', payload);

      window.location.href = data.data.payment_url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    bookingData: {
      frequency,
      duration,
      date,
      startTime,
      endTime,
      contactName,
      phoneNumber,
      email,
      address,
      postalCode,
      additionalNotes,
      price_gst,      
      total_price_gst,
    },
    handleSubmit,
  };
};
