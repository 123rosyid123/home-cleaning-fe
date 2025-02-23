import { apiGetBookingById } from '@/services/bookingService';
import { notFound, redirect } from 'next/navigation';
import { DetailBookingPage } from './DetailBookingPage';

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  try {
    const booking = await apiGetBookingById(id);

    if (!booking || !booking.data) {
      notFound();
    }

    return <DetailBookingPage booking={booking.data} />;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    redirect('/my-bookings');
  }
}
