import { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#193CB8',
};

export const metadata: Metadata = {
  title: 'Professional Home Cleaning Services in Singapore | Book Online',
  description: 'Expert home cleaning services in Singapore. Professional cleaners, flexible scheduling, and satisfaction guaranteed. Book your home cleaning service online today.',
  keywords: 'home cleaning Singapore, house cleaning services, professional cleaners, domestic cleaning, part time maid, cleaning company Singapore',
  openGraph: {
    title: 'Professional Home Cleaning Services in Singapore | Book Online',
    description: 'Expert home cleaning services in Singapore. Professional cleaners, flexible scheduling, and satisfaction guaranteed. Book your home cleaning service online today.',
    type: 'website',
    locale: 'en_SG',
    siteName: 'Home Cleaning Services Singapore',
    url: process.env.NEXT_PUBLIC_CANONICAL_URL,
    images: [
      {
        url: '/logo-only-ori.png',
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_CANONICAL_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}