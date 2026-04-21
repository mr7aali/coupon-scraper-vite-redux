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
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  // Logic to generate page numbers (e.g., 1, 2, 3...)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-t border-gray-50 bg-white",
        className,
      )}
    >
      {/* Results Summary */}
      <p className="text-sm text-gray-500">
        Showing page{" "}
        <span className="font-medium text-gray-900">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-900">{totalPages}</span>
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
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
