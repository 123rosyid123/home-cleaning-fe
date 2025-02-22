import { DetailBookingPage } from './components/DetailBookingPage';
import { apiGetBookingById } from '@/services/bookingService';

export default async function BookingDetailPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    const booking = await apiGetBookingById(id);

    return <DetailBookingPage booking={booking.data} />;
}
