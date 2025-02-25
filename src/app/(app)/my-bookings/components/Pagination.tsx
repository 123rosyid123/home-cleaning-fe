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
  // Function to generate page numbers to display
  const getPageNumbers = () => {
    // Always show first page, last page, current page, and one page before and after current
    const pages = new Set<number>();
    pages.add(1); // First page
    pages.add(totalPages); // Last page
    
    // Current page and neighbors
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.add(i);
    }
    
    // Convert to sorted array
    return Array.from(pages).sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <div className="join">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="join-item btn btn-sm"
        >
          «
        </button>
        
        {pageNumbers.map((page, index) => {
          // Add ellipsis indicator
          if (index > 0 && page > pageNumbers[index - 1] + 1) {
            return (
              <React.Fragment key={`ellipsis-${page}`}>
                <button className="join-item btn btn-sm btn-disabled">...</button>
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`join-item btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
                >
                  {page}
                </button>
              </React.Fragment>
            );
          }
          
          return (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`join-item btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
            >
              {page}
            </button>
          );
        })}
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="join-item btn btn-sm"
        >
          »
        </button>
      </div>
      
      <span className="text-xs text-gray-500">
        Displaying {startIndex} to {endIndex} of {total} total
      </span>
    </div>
  );
};

export default Pagination;