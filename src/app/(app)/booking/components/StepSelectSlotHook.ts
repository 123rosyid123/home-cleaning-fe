import { useBookingStore } from "@/store/bookingStore";
import { useEffect, useMemo, useCallback, useState } from "react";
import { AvailableTimeRequest } from "@/types/bookingType";
import { format } from "date-fns";

export const useSelectSlot = () => {
  const { 
    ref,
    stepService: { durationId, productVariantId }, 
    stepSlot: { date, startTime },
    stepAddress: { addressId, postalCode },
    updateStepSlot,
    getAvailableTimes,
    setAvailableTimes
  } = useBookingStore();

  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch available times from API
  const fetchAvailableTimes = useCallback(async (selectedDate: Date) => {
    if (!addressId || !productVariantId || !durationId) return;

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    // Check if we already have the data
    const cachedTimes = getAvailableTimes(formattedDate, addressId, productVariantId, durationId);
    if (cachedTimes) return;

    setIsLoading(true);
    try {
      const payload: AvailableTimeRequest = {
        selected_date: formattedDate,
        address_id: addressId,
        product_variant_id: productVariantId,
        duration_id: durationId
      };

      const response = await fetch('/api/bookings/available-times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.data) {
        setAvailableTimes(formattedDate, addressId, productVariantId, durationId, data.data);
      }
    } catch (error) {
      console.error('Error fetching available times:', error);
    } finally {
      setIsLoading(false);
    }
  }, [addressId, productVariantId, durationId, getAvailableTimes, setAvailableTimes]);

  // Set initial date and fetch times on mount
  useEffect(() => {
    if (addressId && productVariantId && durationId) {
      const initialDate = new Date();
      updateStepSlot({ date: initialDate });
      fetchAvailableTimes(initialDate);
    }
  }, [addressId, productVariantId, durationId, updateStepSlot, fetchAvailableTimes]);

  // Fetch available times when date or dependencies change
  useEffect(() => {
    if (date) {
      fetchAvailableTimes(date);
    }
  }, [date, fetchAvailableTimes]);

  // Get available times for current selection
  /**
   * Memoized computation of available times based on the current date, address, product variant, and duration.
   * 
   * Note: The dependency array includes `ref.availableTimes` to ensure that when the data in the store updates,
   * the `availableTimes` will automatically update as well. This is crucial for keeping the UI in sync with the
   * latest available times from the store.
   */
  const availableTimes = useMemo(() => {
    if (!date || !durationId) return [];

    const formattedDate = format(date, 'yyyy-MM-dd');
    return getAvailableTimes(formattedDate, addressId, productVariantId, durationId) || [];
  }, [date, addressId, productVariantId, durationId, getAvailableTimes, ref.availableTimes]);

  // Transform available times to time slots
  const timeSlots = useMemo(() => {
    return availableTimes.map(slot => ({
      display: `${slot.start_time} - ${slot.end_time}`,
      value: slot.start_time,
      endTime: slot.end_time,
      price: slot.price,
      price_gst: slot.price_gst,
      cleanerId: slot.cleaner_id,
      total_price_gst: slot.total_price_gst,
      cleanerName: slot.cleanerName, 
      cleanerEmail: slot.cleanerEmail
    }));
  }, [availableTimes]);

  const handleDateChange = (value: Date | Date[] | [Date | null, Date | null] | null) => {
    if (value instanceof Date) {
      updateStepSlot({ date: value, startTime: '', endTime: '' });
    }
  };

  const handleTimeSelect = (timeValue: string) => {
    const selectedSlot = timeSlots.find(slot => slot.value === timeValue);
    if (selectedSlot) {
      updateStepSlot({ 
        startTime: selectedSlot.value,
        endTime: selectedSlot.endTime,
        price_gst: selectedSlot.price_gst,
        price: selectedSlot.price,
        cleanerId: selectedSlot.cleanerId,
        total_price_gst: selectedSlot.total_price_gst,
        cleanerName: selectedSlot.cleanerName, 
        cleanerEmail: selectedSlot.cleanerEmail
      });
    }
  };

  return {
    date,
    startTime,
    postalCode,
    timeSlots,
    isLoading,
    handleDateChange,
    handleTimeSelect,
    isNextDisabled: !date || !startTime || !postalCode
  };
};
