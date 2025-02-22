import React from 'react';

interface DateFiltersProps {
  selectedDays: { from?: Date; to?: Date };
  setSelectedDays: (days: { from?: Date; to?: Date }) => void;
}

const DateFilters: React.FC<DateFiltersProps> = ({ selectedDays, setSelectedDays }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <label htmlFor="from-date" className="text-sm font-medium">From</label>
        <input
          id="from-date"
          type="date"
          value={selectedDays.from ? selectedDays.from.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            const newFromDate = e.target.value ? new Date(e.target.value) : undefined;
            setSelectedDays({ ...selectedDays, from: newFromDate });
          }}
          className="input input-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="to-date" className="text-sm font-medium">End Date</label>
        <input
          id="to-date"
          type="date"
          value={selectedDays.to ? selectedDays.to.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            const newToDate = e.target.value ? new Date(e.target.value) : undefined;
            setSelectedDays({ ...selectedDays, to: newToDate });
          }}
          className="input input-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default DateFilters; 