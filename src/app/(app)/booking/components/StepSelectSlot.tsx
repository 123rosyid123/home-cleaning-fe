'use client';

import { format } from "date-fns";
import ButtonBack from "./ButtonBack";
import ButtonNext from "./ButtonNext";
import { useSelectSlot, TimeSlot } from "./StepSelectSlotHook";

export default function SelectSlot() {
  const {
    postalCode,
    weekDates,
    weekTimeSlots,
    isLoading,
    handleTimeSelect,
    goToNextWeek,
    goToPreviousWeek,
    isNextDisabled,
    timeColumnsRef,
    isScrollable,
    isDayTimeSelected,
    availableDates,
    isNextWeekDisabled,
    scrollTimeColumns
  } = useSelectSlot();

  return (
    <div className="w-full max-w-7xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6">
        {/* Header with postal code */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="text-base sm:text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Schedule Your Appointment
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="text-xs sm:text-sm font-medium text-gray-700">Postal Code:</span>
            <span className="text-xs sm:text-sm font-bold text-primary">{postalCode || 'Not set'}</span>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-semibold text-gray-800">Available Times</h4>
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={goToPreviousWeek}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Previous week"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="text-xs sm:text-sm font-medium">
                {weekDates.length >= 7 ? (
                  <>
                    {format(weekDates[0], 'MMM d')} - {format(weekDates[6], 'MMM d, yyyy')}
                  </>
                ) : (
                  'Loading dates...'
                )}
              </span>
              <button 
                onClick={goToNextWeek}
                disabled={isNextWeekDisabled}
                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                  isNextWeekDisabled 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Next week"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs sm:text-sm text-gray-500">Loading available times...</p>
            </div>
          </div>
        ) : weekDates.length > 0 ? (
          <div>            
            {/* Available times section */}
            <div className="relative">
              {/* Horizontal scroll indicators - only shown when scrollable */}
              {isScrollable && (
                <>
                  <div className="hidden sm:flex absolute inset-y-0 left-0 items-center z-10">
                    <button 
                      onClick={() => scrollTimeColumns('left')}
                      className="w-8 h-8 flex items-center justify-center bg-white/60 backdrop-blur-sm shadow-md rounded-full ml-1 transition-opacity hover:bg-white/80"
                      aria-label="Scroll left"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="hidden sm:flex absolute inset-y-0 right-0 items-center z-10">
                    <button 
                      onClick={() => scrollTimeColumns('right')}
                      className="w-8 h-8 flex items-center justify-center bg-white/60 backdrop-blur-sm shadow-md rounded-full mr-1 transition-opacity hover:bg-white/80"
                      aria-label="Scroll right"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
              
              {/* Time columns */}
              <div 
                ref={timeColumnsRef} 
                className="overflow-x-auto pb-2 scrollbar-hide mask-fade-edges"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch' 
                }}
              >
                <div className={`flex ${!isScrollable ? 'md:justify-between lg:gap-4' : 'space-x-2 md:space-x-4'} min-w-max px-1`}>
                  {availableDates.map((dayDate) => {
                    const dateKey = format(dayDate, 'yyyy-MM-dd');
                    const timeSlots = weekTimeSlots.get(dateKey) || [];
                    
                    return (
                      <div 
                        key={dateKey} 
                        className={`
                          flex flex-col gap-1.5 flex-shrink-0
                          ${isScrollable 
                            ? 'min-w-[130px] max-w-[160px]' 
                            : 'md:flex-1 min-w-[120px]'
                          }
                        `}
                      >
                        <h6 className="text-xs sm:text-sm font-semibold text-gray-800 text-center mb-1 whitespace-nowrap">
                          {format(dayDate, 'EEE, MMM d')}
                        </h6>
                        
                        <div className="flex flex-col gap-2 md:gap-3">
                          {timeSlots.map((slot: TimeSlot) => (
                            <button
                              key={`${dateKey}-${slot.value}`}
                              className={`
                                p-3 rounded-xl text-sm font-medium w-full
                                transition-all duration-200 hover:scale-105 hover:shadow-md
                                border border-transparent
                                ${isDayTimeSelected(dayDate, slot.value)
                                  ? "bg-primary text-white shadow-lg ring-2 ring-primary ring-offset-2"
                                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-100 shadow-sm"
                                }
                              `}
                              onClick={() => handleTimeSelect(dayDate, slot.value)}
                            >
                              <div className="flex flex-col gap-2 items-center">
                                <span className="font-bold">{slot.display}</span>
                                <div className="flex flex-col w-full">
                                  <div className="text-center">
                                    <span className={`text-xs font-semibold ${isDayTimeSelected(dayDate, slot.value) ? "text-white" : "text-gray-800"}`}>
                                      ${slot.price}/hr
                                    </span>
                                  </div>
                                  <div className="text-center mt-1">
                                    <span className={`text-xs font-semibold ${isDayTimeSelected(dayDate, slot.value) ? "text-white" : "text-primary"}`}>
                                      ${slot.price_gst} w/GST
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Mobile scroll indicator - only show when scrollable */}
              {isScrollable && (
                <div className="flex sm:hidden justify-center mt-2">
                  <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px] bg-gray-50 rounded-xl p-4">
            <p className="text-xs sm:text-sm text-gray-500">No available time slots for this week</p>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mt-8 flex justify-between gap-4">
        <ButtonBack />
        <ButtonNext text="Book Appointment" disabled={isNextDisabled} />
      </div>
    </div>
  );
}
