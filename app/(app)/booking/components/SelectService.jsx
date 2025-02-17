import { useBookingStore } from '@/store/bookingStore';

export default function SelectService() {
  const { frequency, duration, updateBookingData, nextStep } = useBookingStore();

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
    <div className="space-y-8 md:space-y-16 max-w-7xl mx-auto px-4 py-4 md:py-8">
      {/* Cleaning Frequency Section */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Cleaning Frequency
          </h2>
        </div>
        <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
          Select your preferred cleaning frequency, you can always change this again after the booking.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {frequencies.map((freq) => (
            <div 
              key={freq.id}
              className={`relative cursor-pointer
                ${frequency === freq.id 
                  ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50' 
                  : 'hover:ring-1 hover:ring-blue-300 hover:shadow-md bg-white'}`}
              onClick={() => updateBookingData({ frequency: freq.id })}
            >
              <div className="border rounded-lg md:rounded-xl p-4 md:p-6 h-full flex flex-col">
                <div className="h-6 md:h-7 mb-1.5 md:mb-2">
                  {freq.badge && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-medium">
                      {freq.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base md:text-lg text-blue-900 mb-1.5 md:mb-2">{freq.name}</h3>
                <p className="text-lg md:text-xl font-bold text-gray-900 mb-0.5 md:mb-1">{freq.basePrice}</p>
                <p className="text-xs md:text-sm text-gray-500">{freq.gstPrice}</p>
                <div 
                  className={`absolute top-2.5 md:top-3 right-2.5 md:right-3 w-3.5 md:w-4 h-3.5 md:h-4 rounded-full border-2 
                    ${frequency === freq.id 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'}`}
                >
                  {frequency === freq.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full"/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6 bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
          *For weekly and fortnightly sessions, you will generally be assigned the same cleaner for every session so they already know your cleaning preferences.
        </p>
      </div>

      {/* Cleaning Duration Section */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Cleaning Duration
          </h2>
        </div>
        <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
          We recommend at least 3 hrs for up to 2 bedrooms, and 4 hrs and up for larger apartments. You can always change this again. (Min 3 hours)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6 max-w-7xl">
          {durations.map((dur) => (
            <div 
              key={dur.id}
              className={`relative cursor-pointer
                ${duration === dur.id 
                  ? 'ring-2 ring-green-500 shadow-lg bg-green-50' 
                  : 'hover:ring-1 hover:ring-green-300 hover:shadow-md bg-white'}`}
              onClick={() => updateBookingData({ duration: dur.id, time: null })}
            >
              <div className="border rounded-lg md:rounded-xl p-4 md:p-6 h-full flex flex-col">
                <div className="h-6 md:h-7 mb-1.5 md:mb-2">
                  {dur.badge && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-medium">
                      {dur.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900">{dur.name}</h3>
                <div 
                  className={`absolute top-2.5 md:top-3 right-2.5 md:right-3 w-3.5 md:w-4 h-3.5 md:h-4 rounded-full border-2 
                    ${duration === dur.id 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'}`}
                >
                  {duration === dur.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full"/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-6 md:mt-0">
        <button 
          className={`w-full md:w-auto px-6 md:px-8 py-3 rounded-lg md:rounded-xl font-semibold text-base md:text-lg
            ${(!frequency || !duration)
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
          onClick={nextStep}
          disabled={!frequency || !duration}
        >
          Select Slot
        </button>
      </div>
    </div>
  );
}