import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function StatusNotFound() {
  return (
    <div className="max-w-3xl mx-auto mt-20 text-center">
      <div className="bg-gradient-to-b from-white to-gray-50 shadow-2xl rounded-3xl p-12 mb-8 border border-gray-100">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-gray-100 rounded-full"></div>
            <AlertCircle className="w-24 h-24 text-gray-500 relative" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-gray-500 bg-clip-text text-transparent">
          Booking Not Found
        </h1>
        
        <div className="max-w-xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            We couldn&apos;t find the booking you&apos;re looking for. This might be because the reference number is incorrect or the booking has been removed.
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Link 
            href="/"
            className="group px-8 py-4 rounded-xl bg-primary text-white font-medium 
              hover:bg-primary/90 transition-all duration-300 shadow-lg 
              hover:shadow-primary/30 inline-flex items-center gap-2 
              transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
          
          {/* <Link 
            href="/bookings"
            className="group px-8 py-4 rounded-xl bg-white text-primary font-medium 
              border-2 border-primary hover:bg-primary/5 transition-all duration-300
              inline-flex items-center gap-2 transform hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            <span>View Bookings</span>
          </Link> */}
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        If you believe this is an error, please contact our support team
      </div>
    </div>
  );
}
