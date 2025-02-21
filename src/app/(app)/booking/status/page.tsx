import StatusCancelled from './StatusCancelled';
import StatusCompleted from './StatusCompleted';
import StatusPending from './StatusPending';
import StatusNotFound from './StatusNotFound';
import { redirect } from 'next/navigation';
import { actionGetPaymentStatus } from '@/app/actions/paymentActions';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BookingStatusPage({ searchParams }: { searchParams: SearchParams }) {
  const { reference } = await searchParams;
  if (!reference) {
    redirect('/booking');
  }
  
  // Ensure we have a single string reference
  const singleReference = Array.isArray(reference) ? reference[0] : reference;
  if (!singleReference) {
    redirect('/booking');
  }

  let paymentStatus = 'not_found';
  try {
    const paymentResponse = await actionGetPaymentStatus(singleReference);
    if (paymentResponse.success) {
      paymentStatus = paymentResponse.data?.status || 'not_found';
    }
  } catch {
    paymentStatus = 'not_found';
  }

  switch (paymentStatus) {
    case 'pending':
      return <StatusPending />;
    case 'canceled':
      return <StatusCancelled />;
    case 'completed':
      return <StatusCompleted />;
    default:
      return <StatusNotFound />;
  }
} 