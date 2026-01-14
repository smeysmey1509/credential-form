import React from "react";

interface DetailPaginationProps {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limitPerPage?: number; // default items per page
  onPageChange: (page: number) => void;
}

const DetailPagination: React.FC<DetailPaginationProps> = ({
  totalItems,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  limitPerPage = 10,
  onPageChange,
}) => {
  // Calculate item range
  const startItem = (currentPage - 1) * limitPerPage + 1;
  const endItem = Math.min(currentPage * limitPerPage, totalItems);

  // Generate visible page numbers (max 5 pages around current)
  const generatePageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <nav
      className="relative w-full h-fit flex items-center flex-wrap justify-between pt-4"
      aria-label="Pagination"
    >
      {/* Showing x - y of total */}
      <span className="text-sm font-normal text-gray-500 dark:text-[#fff] mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems === 0 ? 0 : startItem} - {endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>

      {/* Page buttons */}
      <ul className="inline-flex -space-x-px text-sm h-8">
        {/* Previous */}
        <li>
          <button
            onClick={() =>
              hasPrevPage && onPageChange(currentPage - 1)
            }
            disabled={!hasPrevPage}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-[#19191C] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>

        {/* Dynamic pages */}
        {generatePageNumbers().map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`w-10 flex items-center justify-center px-3 h-8 leading-tight border ${
                currentPage === page
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-[#19191C] dark:text-white"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-[#19191C] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              } border-gray-300 dark:border-gray-700`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() =>
              hasNextPage && onPageChange(currentPage + 1)
            }
            disabled={!hasNextPage}
            className="flex items-center justify-center px-3 h-8 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-[#19191C] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DetailPagination;
