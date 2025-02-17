import { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useBookingStore } from "@/store/bookingStore";

export default function SelectSlot() {
  const { duration, date, time, updateBookingData, nextStep, prevStep } = useBookingStore();

  // Set default date to today when component mounts
  useEffect(() => {
    if (!date) {
      updateBookingData({ date: new Date() });
    }
  }, []);

  // Function to generate time slots based on duration
  const timeSlots = useMemo(() => {
    const slots = [];
    const durationHours = duration === "4hours" ? 4 : 3; // Duration in hours

    // Start time: 9 AM (9 * 60 = 540 minutes)
    // End time: 10 PM (22 * 60 = 1320 minutes)
    let currentTime = 540;
    const endTime = 1320;

    while (currentTime + durationHours * 60 <= endTime) {
      const startHours = Math.floor(currentTime / 60);
      const startMinutes = currentTime % 60;
      const startPeriod = startHours >= 12 ? "PM" : "AM";
      const startDisplayHours = startHours > 12 ? startHours - 12 : startHours;

      const endTimeValue = currentTime + durationHours * 60;
      const endHours = Math.floor(endTimeValue / 60);
      const endMinutes = endTimeValue % 60;
      const endPeriod = endHours >= 12 ? "PM" : "AM";
      const endDisplayHours = endHours > 12 ? endHours - 12 : endHours;

      const timeString = {
        display: `${String(startDisplayHours).padStart(2, "0")}.${String(startMinutes).padStart(
          2,
          "0"
        )} ${startPeriod} - ${String(endDisplayHours).padStart(2, "0")}.${String(endMinutes).padStart(
          2,
          "0"
        )} ${endPeriod}`,
        value: `${String(startDisplayHours).padStart(2, "0")}.${String(startMinutes).padStart(2, "0")} ${startPeriod}`,
      };

      slots.push(timeString);
      currentTime += durationHours * 60; // Add duration in minutes
    }

    return slots;
  }, [duration]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Date Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">Appointment Date</h3>
          <div className="calendar-container max-w-[400px] mx-auto lg:max-w-none">
            <Calendar
              onChange={(newDate) => updateBookingData({ date: newDate })}
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
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">Appointment Time</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.value}
                className={`
                  px-2 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium 
                  transition-all duration-200 hover:scale-105 hover:shadow-md
                  ${
                    time === slot.value
                      ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-600 ring-offset-2"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }
                `}
                onClick={() => updateBookingData({ time: slot.value })}
              >
                {slot.display}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button 
          className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium 
            hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          onClick={prevStep}
        >
          Back
        </button>
        <button 
          className="px-8 py-3 rounded-xl bg-primary text-white font-medium 
            hover:bg-primary/90 transition-all duration-200 shadow-lg 
            hover:shadow-primary/30 flex items-center gap-2"
          onClick={nextStep}
          disabled={!date || !time}
        >
          Book Appointment
        </button>
      </div>

      <style jsx global>{`
        .calendar-container .react-calendar {
          border: none;
          width: 100%;
          background: transparent;
          font-family: inherit;
        }
        .react-calendar__tile--active {
          background: var(--primary-color, #2563eb) !important;
          border-radius: 0.5rem;
        }
        .react-calendar__tile--now {
          background: #f3f4f6;
          border-radius: 0.5rem;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #e5e7eb;
          border-radius: 0.5rem;
        }
        .react-calendar__tile {
          padding: 0.6rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .react-calendar__tile {
            padding: 0.75rem;
            font-size: 1rem;
          }
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #f3f4f6;
          border-radius: 0.5rem;
        }
        .react-calendar__navigation {
          margin-bottom: 0.5rem;
        }
        @media (max-width: 640px) {
          .react-calendar__navigation button {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
