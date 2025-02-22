import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  startIndex: number;
  endIndex: number;
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage, startIndex, endIndex, total }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-circle btn-sm"
      >
        &lt;
      </button>
      <span className="text-sm">
        Displaying {startIndex} to {endIndex} of {total} total
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="btn btn-circle btn-sm"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination; 