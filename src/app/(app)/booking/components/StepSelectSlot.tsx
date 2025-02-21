'use client';

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ButtonBack from "./ButtonBack";
import ButtonNext from "./ButtonNext";
import { useSelectSlot } from "./StepSelectSlotHook";

// Add custom styles for the calendar
const calendarStyles = `
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }
`;

export default function SelectSlot() {
  const {
    date,
    startTime,
    postalCode,
    timeSlots,
    isLoading,
    handleDateChange,
    handleTimeSelect,
    isNextDisabled
  } = useSelectSlot();

  return (
    <div className="w-full max-w-7xl mx-auto sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {/* Date Selection */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="bg-primary/10 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Appointment Date
            </h3>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-primary 
                  focus:outline-none transition-colors duration-200 bg-gray-50"
                placeholder="Enter your postal code"
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
                value={postalCode || ''}
                disabled={true}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Enter postal code to check service availability
            </p>
          </div>

          <div className="calendar-container max-w-[400px] mx-auto lg:max-w-none">
            <style>{calendarStyles}</style>
            <Calendar
              onChange={handleDateChange}
              value={date || new Date()}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
              className="w-full border-none"
              tileClassName="text-sm font-medium"
              prevLabel={<span className="text-gray-600">←</span>}
              nextLabel={<span className="text-gray-600">→</span>}
              navigationLabel={({ date }) => (
                <span className="text-base sm:text-lg font-semibold text-gray-800">
                  {date.toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
              )}
            />
          </div>
        </div>

        {/* Time Selection */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="bg-primary/10 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Appointment Time
            </h3>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading available times...</p>
              </div>
            </div>
          ) : timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.value}
                  className={`
                    px-2 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium 
                    transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer
                    ${startTime === slot.value
                      ? "bg-primary text-white shadow-lg ring-2 ring-primary ring-offset-2"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  onClick={() => handleTimeSelect(slot.value)}
                >
                  <div className="flex flex-col gap-1">
                    <span>{slot.display}</span>
                    <span className="text-xs font-semibold">
                      ${slot.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[200px]">
              <p className="text-gray-500">No available time slots for this date</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-4">
        <ButtonBack />
        <ButtonNext text="Book Appointment" disabled={isNextDisabled} />
      </div>
    </div>
  );
}
