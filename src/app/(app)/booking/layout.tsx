import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Home Cleaning Service in Singapore | Easy Online Booking',
  description: 'Schedule your home cleaning service in Singapore in just a few clicks. Choose your preferred service, date, and time. Secure online booking with instant confirmation.',
  keywords: 'book home cleaning, cleaning service booking, online booking Singapore, house cleaning appointment, schedule home cleaning',
  openGraph: {
    title: 'Book Home Cleaning Service in Singapore | Easy Online Booking',
    description: 'Schedule your home cleaning service in Singapore in just a few clicks. Choose your preferred service, date, and time. Secure online booking with instant confirmation.',
    type: 'website',
    locale: 'en_SG',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 