import { BookingStatus } from "@/types/bookingType";

export default function StatusFilter({ statusFilter, setStatusFilter }: { statusFilter: BookingStatus | undefined, setStatusFilter: (status: BookingStatus | undefined) => void }) {
  return (
    <div className="mb-4 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2">
      <div className="flex flex-col">
        <label htmlFor="status-filter" className="text-sm font-medium">Filter</label>
        <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BookingStatus)} className="select select-bordered rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto">
          <option value="">All Statuses</option>
          {Object.values(BookingStatus).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}