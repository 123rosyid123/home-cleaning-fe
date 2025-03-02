import { useEffect } from 'react';
import axios from 'axios';
import { useBookingStore } from '@/store/bookingStore';
import { GetProductVariantsResponse } from '@/types/productType';
import { DurationResponse } from '@/types/durationType';

export const useSelectService = () => {
  const { 
    stepService: { durationId, productVariantId }, 
    updateStepService, 
    ref, 
    setProductVariants, 
    setDurations 
  } = useBookingStore();

  useEffect(() => {
    const fetchProductVariants = async () => {
      if (!ref.productVariants || ref.productVariants.length === 0) {
        try {
          const { data } = await axios.get<GetProductVariantsResponse>('/api/product/HOME_CLEANING');
          if (data) {
            setProductVariants(data.data);
          }
        } catch (error) {
          console.error('Error fetching product variants:', error);
        }
      }
    };

    fetchProductVariants();
  }, [ref?.productVariants?.length, setProductVariants]);

  useEffect(() => {
    const fetchDurations = async () => {
      if (!ref.durations || ref.durations.length === 0) {
        try {
          const { data } = await axios.get<DurationResponse>('/api/duration');
          if (data) {
            setDurations(data.data);
          }
        } catch (error) {
          console.error('Error fetching durations:', error);
        }
      }
    };
    fetchDurations();
  }, [ref?.durations?.length, setDurations]);

  const frequencies = ref.productVariants?.map(variant => ({
    id: variant.id,
    name: variant.name,
    basePrice: variant.price_label,
    gstPrice: variant.price_after_gst_label,
    badge: variant.is_recurring ? "*Same Cleaner" : undefined
  })) || [];

  const durations = ref.durations?.map(dur => ({
    id: dur.id,
    name: `${dur.duration} Hours`,
    badge: dur.duration === 4
      ? 'Value For Money'
      : dur.duration === 3
      ? 'Efficient'
      : dur.duration === 2
      ? 'Fast'
      : undefined
  })) || [];

  const handleFrequencySelect = (selectedProductVariantId: string) => {
    const selectedVariant = ref.productVariants?.find(variant => variant.id === selectedProductVariantId);
    updateStepService({ productVariantId: selectedProductVariantId, frequency: selectedVariant?.name });
  };

  const handleDurationSelect = (selectedDurationId: string) => {
    const selectedDuration = ref.durations?.find(dur => dur.id === selectedDurationId);
    updateStepService({ durationId: selectedDurationId, duration: selectedDuration?.name });
  };

  const isNextButtonDisabled = !durationId || !productVariantId;

  return {
    durationId,
    productVariantId,
    frequencies,
    durations,
    handleFrequencySelect,
    handleDurationSelect,
    isNextButtonDisabled
  };
};
