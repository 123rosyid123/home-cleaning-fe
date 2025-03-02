import { useBookingStore } from "@/store/bookingStore";
import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import { AvailableTimeRequest } from "@/types/bookingType";
import { format, addDays, startOfDay, isAfter } from "date-fns";

// Define TimeSlot interface
export interface TimeSlot {
  display: string;
  value: string;
  endTime: string;
  price: number;
  price_gst: number;
  cleanerId: string;
  total_price_gst: number;
  cleanerName: string;
  cleanerEmail: string;
}

export const useSelectSlot = () => {
  const { 
    ref,
    stepService: { durationId, productVariantId }, 
    stepSlot: { date, startTime, endTime, currentWeekStart: storedWeekStart },
    stepAddress: { addressId, postalCode },
    updateStepSlot,
    getAvailableTimes,
    setAvailableTimes
  } = useBookingStore();

  const [isLoading, setIsLoading] = useState(false);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    // If we have a stored week start date in the store, use that
    if (storedWeekStart) {
      // Ensure it's a Date object
      const storedDate = storedWeekStart instanceof Date 
        ? storedWeekStart 
        : new Date(storedWeekStart);
      
      // Don't use dates in the past
      return storedDate < startOfDay(new Date()) 
        ? startOfDay(new Date()) 
        : storedDate;
    }
    
    // Otherwise use today as the default
    return startOfDay(new Date());
  });
  const [initialLoad, setInitialLoad] = useState(true);
  
  // UI state for scroll control
  const timeColumnsRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // Calculate max date (exactly 14 days total including today)
  const maxDate = useMemo(() => {
    const today = startOfDay(new Date());
    return addDays(today, 13); 
  }, []);

  // Check if next week would exceed the 2-week limit
  const isNextWeekDisabled = useMemo(() => {
    if (!weekDates.length) return true;
    const nextWeekStart = addDays(currentWeekStart, 7);
    return isAfter(nextWeekStart, maxDate);
  }, [currentWeekStart, maxDate, weekDates.length]);

  // Update the store whenever currentWeekStart changes
  useEffect(() => {
    updateStepSlot({ currentWeekStart });
  }, [currentWeekStart, updateStepSlot]);

  // Check if scroll is needed
  useEffect(() => {
    const checkScrollable = () => {
      if (timeColumnsRef.current) {
        const { scrollWidth, clientWidth } = timeColumnsRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, [weekDates]);

  // Generate an array of 7 days starting from a given date
  const generateWeekDates = useCallback((startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(startDate), i));
    }
    return dates;
  }, []);

  // Function to fetch available times for a single date
  const fetchAvailableTimeForDate = useCallback(async (selectedDate: Date) => {
    if (!addressId || !productVariantId || !durationId) return null;

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    // Check if we already have the data
    const cachedTimes = getAvailableTimes(formattedDate, addressId, productVariantId, durationId);
    if (cachedTimes) return cachedTimes;

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
        return data.data;
      }
    } catch (error) {
      console.error(`Error fetching available times for ${formattedDate}:`, error);
    }
    return null;
  }, [addressId, productVariantId, durationId, getAvailableTimes, setAvailableTimes]);

  // Function to fetch available times for a week (only those not already cached)
  const fetchWeekAvailableTimes = useCallback(async (startDate: Date) => {
    if (!addressId || !productVariantId || !durationId) return;

    setIsLoading(true);
    const dates = generateWeekDates(startDate);
    
    try {
      // Check which dates need to be fetched (don't have cached data)
      const datesToFetch = dates.filter(date => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return !getAvailableTimes(formattedDate, addressId, productVariantId, durationId);
      });
      
      // Only fetch data for dates we don't already have
      if (datesToFetch.length > 0) {
        await Promise.all(datesToFetch.map(date => fetchAvailableTimeForDate(date)));
      }
    } catch (error) {
      console.error('Error fetching week available times:', error);
    } finally {
      setIsLoading(false);
    }
  }, [addressId, productVariantId, durationId, fetchAvailableTimeForDate, generateWeekDates, getAvailableTimes]);

  // Initialize dates and fetch times on mount or when dependencies change
  useEffect(() => {
    if (addressId && productVariantId && durationId) {
      const today = startOfDay(new Date());
      
      if (initialLoad) {
        // Generate week dates based on currentWeekStart
        setWeekDates(generateWeekDates(currentWeekStart));
        
        // If there's no date selection yet, default to today
        if (!date) {
          updateStepSlot({ date: today });
        }
        
        setInitialLoad(false);
      }
      
      // Check if we need to fetch time slots
      const dates = generateWeekDates(currentWeekStart);
      const needsFetch = dates.some(date => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return !getAvailableTimes(formattedDate, addressId, productVariantId, durationId);
      });
      
      if (needsFetch) {
        fetchWeekAvailableTimes(currentWeekStart);
      } else {
        // If we already have all the data, just update week dates
        setWeekDates(dates);
      }
    }
  }, [addressId, productVariantId, durationId, date, currentWeekStart, initialLoad, updateStepSlot, fetchWeekAvailableTimes, generateWeekDates, getAvailableTimes]);

  // Navigate to next week
  const goToNextWeek = useCallback(() => {
    if (isNextWeekDisabled) return;
    
    const nextWeekStart = addDays(currentWeekStart, 7);
    setCurrentWeekStart(nextWeekStart);
    
    const newWeekDates = generateWeekDates(nextWeekStart);
    setWeekDates(newWeekDates);
    
    // Check if we need to fetch time slots for any dates in the new week
    const needsFetch = newWeekDates.some(date => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      return !getAvailableTimes(formattedDate, addressId, productVariantId, durationId);
    });
    
    if (needsFetch) {
      fetchWeekAvailableTimes(nextWeekStart);
    }
  }, [currentWeekStart, addressId, productVariantId, durationId, fetchWeekAvailableTimes, generateWeekDates, getAvailableTimes, isNextWeekDisabled]);

  // Navigate to previous week
  const goToPreviousWeek = useCallback(() => {
    const today = startOfDay(new Date());
    const prevWeekStart = addDays(currentWeekStart, -7);
    
    // Don't go before today
    const effectiveStart = prevWeekStart < today ? today : prevWeekStart;
    
    setCurrentWeekStart(effectiveStart);
    
    const newWeekDates = generateWeekDates(effectiveStart);
    setWeekDates(newWeekDates);
    
    // Check if we need to fetch time slots for any dates in the new week
    const needsFetch = newWeekDates.some(date => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      return !getAvailableTimes(formattedDate, addressId, productVariantId, durationId);
    });
    
    if (needsFetch) {
      fetchWeekAvailableTimes(effectiveStart);
    }
  }, [currentWeekStart, addressId, productVariantId, durationId, fetchWeekAvailableTimes, generateWeekDates, getAvailableTimes]);

  // Get available times for the selected date
  const getTimeSlotsForDate = useCallback((selectedDate: Date) => {
    if (!selectedDate || !durationId) return [];

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const availableTimes = getAvailableTimes(formattedDate, addressId, productVariantId, durationId) || [];

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
  }, [addressId, productVariantId, durationId, getAvailableTimes]);

  // Map of dates to their available time slots
  const weekTimeSlots = useMemo(() => {
    const result = new Map();
    weekDates.forEach(date => {
      result.set(format(date, 'yyyy-MM-dd'), getTimeSlotsForDate(date));
    });
    return result;
  }, [weekDates, getTimeSlotsForDate, ref.availableTimes]);

  // Check if a day and time is currently selected
  const isDayTimeSelected = useCallback((checkDate: Date, timeValue: string) => {
    if (!date || !startTime) return false;
    return format(checkDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && startTime === timeValue;
  }, [date, startTime]);

  // Filter available dates (dates with time slots)
  const availableDates = useMemo(() => {
    return weekDates.filter(dayDate => {
      const dateKey = format(dayDate, 'yyyy-MM-dd');
      const timeSlots = weekTimeSlots.get(dateKey) || [];
      return timeSlots.length > 0 && !isAfter(dayDate, maxDate);
    });
  }, [weekDates, weekTimeSlots, maxDate]);

  const handleTimeSelect = (selectedDate: Date, timeValue: string) => {
    const timeSlots = getTimeSlotsForDate(selectedDate);
    const selectedSlot = timeSlots.find(slot => slot.value === timeValue);
    
    if (selectedSlot) {
      updateStepSlot({ 
        date: selectedDate,
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

  // Handle scrolling in the time columns
  const scrollTimeColumns = useCallback((direction: 'left' | 'right') => {
    if (timeColumnsRef.current) {
      timeColumnsRef.current.scrollBy({ 
        left: direction === 'left' ? -200 : 200, 
        behavior: 'smooth' 
      });
    }
  }, []);

  return {
    date,
    startTime,
    endTime,
    postalCode,
    weekDates,
    weekTimeSlots,
    currentWeekStart,
    isLoading,
    handleTimeSelect,
    goToNextWeek,
    goToPreviousWeek,
    timeColumnsRef,
    isScrollable,
    isDayTimeSelected,
    availableDates,
    maxDate,
    isNextWeekDisabled,
    scrollTimeColumns,
    isNextDisabled: !date || !startTime || !postalCode
  };
};

