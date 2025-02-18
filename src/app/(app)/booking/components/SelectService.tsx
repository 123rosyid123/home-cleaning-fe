'use client';

import { useBookingStore } from '@/store/bookingStore';
import ButtonNext from './ButtonNext';

export default function SelectService() {
  const { frequency, duration, updateBookingData } = useBookingStore();

  const frequencies = [
    { 
      id: 'oneTime', 
      name: 'One Time Cleaning',
      basePrice: '$16-$25/hr',
      gstPrice: '$17.44-$27.25 w/GST'
    },
    { 
      id: 'everyOtherWeek', 
      name: 'Every other week',
      basePrice: '$18-$22/hr',
      gstPrice: '$19.62-$23.98 w/GST',
      badge: '*Same Cleaner'
    },
    { 
      id: 'oncePerWeek', 
      name: 'Once per Week',
      basePrice: '$18-$22/hr',
      gstPrice: '$19.62-$23.98 w/GST',
      badge: '*Same Cleaner'
    },
    { 
      id: 'moreThanOnce', 
      name: '> Once per Week',
      basePrice: '$18-$22/hr',
      gstPrice: '$19.62-$23.98 w/GST',
      badge: '*Same Cleaner'
    }
  ];

  const durations = [
    { id: '4hours', name: '4 Hours', badge: 'Value for money' },
    { id: '3hours', name: '3 Hours' }
  ];

  return (
    <div className="max-w-7xl mx-auto sm:py-8 space-y-8 sm:space-y-12">
      {/* Cleaning Frequency Section */}
      <div className="bg-white rounded-[32px] p-4 sm:p-6 md:p-10 shadow-xl border border-gray-200">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 p-2 rounded-2xl flex items-center justify-center transform transition-transform hover:rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            Cleaning Frequency
          </h2>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
          Select your preferred cleaning frequency, you can always change this again after the booking.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {frequencies.map((freq) => (
            <div 
              key={freq.id}
              className={`relative cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] rounded-[24px]
                ${frequency === freq.id 
                  ? 'ring-[3px] ring-primary shadow-xl bg-primary/5' 
                  : 'hover:ring-2 hover:ring-primary/30 hover:shadow-lg bg-white'}`}
              onClick={() => updateBookingData({ frequency: freq.id })}
            >
              <div className={`border rounded-[24px] p-4 sm:p-5 md:p-6 h-full flex flex-col
                ${frequency === freq.id ? 'border-primary/20' : 'border-gray-200'}`}>
                <div className="h-6 sm:h-8 mb-2 sm:mb-3">
                  {freq.badge && (
                    <span className="inline-block bg-primary/10 text-primary text-[10px] sm:text-xs md:text-sm px-2 py-1 sm:px-3 md:px-4 sm:py-1.5 rounded-full font-medium">
                      {freq.badge}
                    </span>
                  )}
                </div>
                <h3 className={`font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3
                  ${frequency === freq.id ? 'text-primary' : 'text-gray-800'}`}>
                  {freq.name}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">{freq.basePrice}</p>
                <p className="text-xs sm:text-sm text-gray-500">{freq.gstPrice}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6 md:mt-8 bg-primary/5 p-4 sm:p-5 md:p-6 rounded-[20px] border border-primary/20 leading-relaxed">
          *For weekly and fortnightly sessions, you will generally be assigned the same cleaner for every session so they already know your cleaning preferences.
        </p>
      </div>

      {/* Cleaning Duration Section */}
      <div className="bg-white rounded-[32px] p-4 sm:p-6 md:p-10 shadow-xl border border-gray-200">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 p-2 rounded-2xl flex items-center justify-center transform transition-transform hover:rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            Cleaning Duration
          </h2>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
          We recommend at least 3 hrs for up to 2 bedrooms, and 4 hrs and up for larger apartments. You can always change this again. (Min 3 hours)
        </p>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-7xl">
          {durations.map((dur) => (
            <div 
              key={dur.id}
              className={`relative cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] rounded-[24px]
                ${duration === dur.id 
                  ? 'ring-[3px] ring-primary shadow-xl bg-primary/5' 
                  : 'hover:ring-2 hover:ring-primary/30 hover:shadow-lg bg-white'}`}
              onClick={() => updateBookingData({ duration: dur.id, time: undefined })}
            >
              <div className={`border rounded-[24px] p-4 sm:p-5 md:p-6 h-full flex flex-col
                ${duration === dur.id ? 'border-primary/20' : 'border-gray-200'}`}>
                <div className="h-6 sm:h-8 mb-2 sm:mb-3">
                  {dur.badge && (
                    <span className="inline-block bg-primary/10 text-primary text-[10px] sm:text-xs md:text-sm px-2 py-1 sm:px-3 md:px-4 sm:py-1.5 rounded-full font-medium">
                      {dur.badge}
                    </span>
                  )}
                </div>
                <h3 className={`font-semibold text-base sm:text-lg md:text-xl
                  ${duration === dur.id ? 'text-primary' : 'text-gray-800'}`}>
                  {dur.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <ButtonNext text="Select Slot" disabled={!frequency || !duration} />
      </div>
    </div>
  );
}