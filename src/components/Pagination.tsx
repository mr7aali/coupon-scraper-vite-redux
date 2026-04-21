import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for clean class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  totalItems?: number;
  pageSize?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  totalItems,
  pageSize,
}: PaginationProps) => {
  const safeTotalPages = Math.max(totalPages, 1);
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(safeTotalPages, startPage + 4);
  const firstVisiblePage = Math.max(1, endPage - 4);
  const pages = Array.from(
    { length: endPage - firstVisiblePage + 1 },
    (_, i) => firstVisiblePage + i,
  );
  const startItem = totalItems && totalItems > 0 && pageSize
    ? (currentPage - 1) * pageSize + 1
    : null;
  const endItem = totalItems && totalItems > 0 && pageSize
    ? Math.min(currentPage * pageSize, totalItems)
    : null;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-t border-gray-50 bg-white",
        className,
      )}
    >
      {/* Results Summary */}
      <p className="text-sm text-gray-500">
        {startItem !== null && endItem !== null && totalItems !== undefined ? (
          <>
            Showing <span className="font-medium text-gray-900">{startItem}</span>-<span className="font-medium text-gray-900">{endItem}</span> of{" "}
            <span className="font-medium text-gray-900">{totalItems}</span>
          </>
        ) : (
          <>
            Showing page <span className="font-medium text-gray-900">{currentPage}</span> of{" "}
            <span className="font-medium text-gray-900">{safeTotalPages}</span>
          </>
        )}
      </p>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1">
          {firstVisiblePage > 1 ? (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="h-9 w-9 rounded-lg text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-[#00A1BF]"
              >
                1
              </button>
              {firstVisiblePage > 2 ? (
                <span className="px-1 text-sm text-gray-400">...</span>
              ) : null}
            </>
          ) : null}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "h-9 w-9 text-sm font-medium rounded-lg transition-all",
                currentPage === page
                  ? "bg-[#00A1BF] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#00A1BF]",
              )}
            >
              {page}
            </button>
          ))}

          {endPage < safeTotalPages ? (
            <>
              {endPage < safeTotalPages - 1 ? (
                <span className="px-1 text-sm text-gray-400">...</span>
              ) : null}
              <button
                onClick={() => onPageChange(safeTotalPages)}
                className="h-9 w-9 rounded-lg text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-[#00A1BF]"
              >
                {safeTotalPages}
              </button>
            </>
          ) : null}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === safeTotalPages}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
