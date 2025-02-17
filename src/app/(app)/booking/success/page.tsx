'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className="max-w-3xl mx-auto mt-20 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your booking. We have received your payment and will be in touch shortly with further details.
        </p>
        
        <Link 
          href="/"
          className="px-8 py-3 rounded-xl bg-primary text-white font-medium 
            hover:bg-primary/90 transition-all duration-200 shadow-lg 
            hover:shadow-primary/30 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 