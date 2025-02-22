import React from 'react';
import { format, addWeeks } from 'date-fns';

interface DateFiltersProps {
  selectedDays: { from?: Date; to?: Date };
  setSelectedDays: (days: { from?: Date; to?: Date }) => void;
}

const DateFilters: React.FC<DateFiltersProps> = ({ selectedDays, setSelectedDays }) => {
  const today = new Date();
  const maxDate = addWeeks(today, 2);
  const maxDateStr = format(maxDate, 'yyyy-MM-dd');

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value ? new Date(e.target.value) : undefined;
    
    // If to date exists and is before the new from date, reset it
    if (selectedDays.to && newFromDate && selectedDays.to < newFromDate) {
      setSelectedDays({ from: newFromDate, to: undefined });
    } else {
      setSelectedDays({ ...selectedDays, from: newFromDate });
    }
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value ? new Date(e.target.value) : undefined;
    setSelectedDays({ ...selectedDays, to: newToDate });
  };

  return (
    <div className="flex space-x-4 flex-row justify-between">
      <div className="flex flex-col w-full">
        <label htmlFor="from-date" className="text-sm font-medium">From</label>
        <input
          id="from-date"
          type="date"
          max={maxDateStr}
          value={selectedDays.from ? format(selectedDays.from, 'yyyy-MM-dd') : ''}
          onChange={handleFromDateChange}
          className="input input-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="to-date" className="text-sm font-medium">End Date</label>
        <input
          id="to-date"
          type="date"
          min={selectedDays.from ? format(selectedDays.from, 'yyyy-MM-dd') : ''}
          max={maxDateStr}
          value={selectedDays.to ? format(selectedDays.to, 'yyyy-MM-dd') : ''}
          onChange={handleToDateChange}
          className="input input-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default DateFilters; 