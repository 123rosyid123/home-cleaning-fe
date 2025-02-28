import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';
import React from 'react';
import DatePicker from 'react-datepicker';

interface DateFiltersProps {
  selectedDays: { from?: Date; to?: Date };
  setSelectedDays: (days: { from?: Date; to?: Date }) => void;
}

const DateFilters: React.FC<DateFiltersProps> = ({ selectedDays, setSelectedDays }) => {
  const today = new Date();
  // const maxDate = addWeeks(today, 2);

  // Format the display value for the input
  const formatDateRange = () => {
    if (selectedDays.from && selectedDays.to) {
      return `${format(selectedDays.from, 'MMM d, yyyy')} - ${format(selectedDays.to, 'MMM d, yyyy')}`;
    } else if (selectedDays.from) {
      return format(selectedDays.from, 'MMM d, yyyy');
    }
    return '';
  };

  // Handle date range selection
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setSelectedDays({
      from: start || undefined,
      to: end || undefined
    });
  };

  // Quick select options
  const setToday = () => {
    setSelectedDays({ from: today, to: today });
  };

  const setThisWeek = () => {
    setSelectedDays({
      from: startOfWeek(today),
      to: endOfWeek(today)
    });
  };

  const setNextWeek = () => {
    const nextWeekStart = addDays(startOfWeek(today), 7);
    setSelectedDays({
      from: nextWeekStart,
      to: addDays(nextWeekStart, 6)
    });
  };

  const clearDates = () => {
    setSelectedDays({ from: undefined, to: undefined });
  };

  // Calendar icon component
  const CalendarIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col w-full">
        <label htmlFor="date-range" className="text-sm font-medium mb-1">Date Range</label>
        <div className="date-picker-wrapper calendar-icon-wrapper">
          <DatePicker
            id="date-range"
            selectsRange={true}
            startDate={selectedDays.from}
            endDate={selectedDays.to}
            onChange={handleDateRangeChange}
            // maxDate={maxDate}
            dateFormat="MMM d, yyyy"
            placeholderText="Select date range"
            className="date-picker-input"
            showPopperArrow={false}
            calendarStartDay={1}
            popperClassName="date-picker-popper"
            popperPlacement="bottom-start"
            isClearable={false}
            monthsShown={2}
            customInput={
              <input 
                type="text" 
                value={formatDateRange()}
                readOnly 
                placeholder="Select date range"
                className="date-picker-input"
              />
            }
          />
          <span className="calendar-icon"><CalendarIcon /></span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          type="button"
          onClick={setToday}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
          Today
        </button>
        <button
          type="button"
          onClick={setThisWeek}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
          This Week
        </button>
        <button
          type="button"
          onClick={setNextWeek}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
          Next Week
        </button>
        <button
          type="button"
          onClick={clearDates}
          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors ml-auto"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DateFilters;