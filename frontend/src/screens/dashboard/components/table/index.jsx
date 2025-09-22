import ContentLoader from "@/components/common/ContentLoader";
import TableCard from "@/screens/dashboard/components/table/TableCard";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { renderStatus } from "@/lib/tableStatus";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import Pagination from "./pagination";
import TableHeader from "./TableHeader";
import { onListingModal } from "@/features/modals/modalSlice";
import { showCustomToast } from "@/components/common/CustomToast";

export default function DashboardTable({
  title,
  description,
  searchQuery,
  handleSearchQuery,
  handleCSVDownload,
  actionButtons,
  selectedAction,
  setSelectedAction,
  type,
  tableHeaderData,
  loading,
  currentPage,
  totalPages,
  totalRows,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  tableRowData,
}) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="relative">
        <div className="flex flex-col max-w-[1200px] gap-4 border p-8 rounded-3xl">
          <div className="flex w-full flex-col lg:flex-row md:justify-between lg:items-center gap-2 md:gap-4">
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">
                {title}
              </h3>
              <p className="text-sm lg:text-base font-normal text-[#525866]">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[200px] lg:w-[250px]">
                <Input
                  placeholder="Search..."
                  className="w-full h-10 rounded-full border-[#E5E7EB] bg-white text-sm pl-10"
                  value={searchQuery || ""}
                  aria-label="Search remittances"
                  onChange={(e) => handleSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              </div>
              {type === "rooms" && (
                <button
                  onClick={() => dispatch(onListingModal())}

                  data-test="create_listings_button"
                  type="submit"
                  className="p-3 px-8 hover:opacity-[.5] text-[#fff] flex btn items-center justify-center cursor-pointer bg-[#000] rounded-full regular"
                >
                  Create Listings
                </button>
              )}
            </div>
          </div>
          <div className="hidden lg:block"></div>
          <div className=" w-full">
            <Table className="w-full">
              <TableHeader tableHeaderData={tableHeaderData} />
              <TableBody className="w-full">
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={tableRowData?.length}
                      className="text-center"
                    >
                      <ContentLoader type="dashboard" />
                    </TableCell>
                  </TableRow>
                ) : tableRowData?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={tableHeaderData?.length || 1}
                      className="text-center h-[200px] p-0"
                    >
                      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                        <img
                          className="w-36"
                          src="/assests/icons/empty_payment.png"
                          alt="No data available"
                        />
                        <h4 className="text-base font-semibold capitalize">
                          No {type} Data Available...
                        </h4>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  tableRowData?.map((tableData, index) => {
                    return (
                      <TableCard
                        key={index}
                        renderStatus={renderStatus}
                        tableData={tableData}
                        type={type}
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage ?? 1}
            totalPages={totalPages ?? 0}
            totalRows={totalRows ?? 0}
            rowsPerPage={rowsPerPage ?? 10}
            setCurrentPage={setCurrentPage || (() => {})}
            setRowsPerPage={setRowsPerPage || (() => {})}
          />
        </div>
      </div>
    </>
  );
}
