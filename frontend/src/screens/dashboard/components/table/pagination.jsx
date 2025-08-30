import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
}) {
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goToNextPage = () =>
    setCurrentPage(Math.min(totalPages, currentPage + 1));

  return (
    <div className="flex justify-between items-center p-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <p className="md:text-sm text-xs text-[#6B7280]">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="p-2 text-[#6B7280] hover:text-gray-800 cursor-pointer"
          onClick={goToFirstPage}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="w-4 h-4 cursor-pointer" />
        </Button>
        <Button
          variant="ghost"
          className="p-2 text-[#6B7280] hover:text-gray-800 cursor-pointer"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 2 && page <= currentPage + 2)
          ) {
            return (
              <Button
                key={page}
                variant="ghost"
                className={`w-8 h-8 rounded-full text-sm ${
                  currentPage === page
                    ? "bg-white border text-gray-700"
                    : "text-[#6B7280] hover:text-gray-900"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          }
          if (
            (page === currentPage - 3 && currentPage > 4) ||
            (page === currentPage + 3 && currentPage < totalPages - 3)
          ) {
            return (
              <span key={page} className="text-sm text-gray-500">
                ...
              </span>
            );
          }
          return null;
        })}
        <Button
          variant="ghost"
          className="p-2 text-[#6B7280] hover:text-gray-800"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          className="p-2 text-[#6B7280] hover:text-gray-800"
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={rowsPerPage?.toString()}
          onValueChange={(value) => {
            setRowsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="h-10 px-2 text-xs md:text-sm text-gray-600 border cursor-pointer border-gray-200 rounded-md bg-white">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 / page</SelectItem>
            <SelectItem value="7">7 / page</SelectItem>
            <SelectItem value="10">10 / page</SelectItem>
            <SelectItem value="20">20 / page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
