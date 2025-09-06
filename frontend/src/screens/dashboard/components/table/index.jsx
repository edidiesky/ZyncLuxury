;
import ContentLoader from "@/components/common/ContentLoader";
import TableCard from "@/screens/dashboard/components/table/TableCard";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { renderStatus } from "@/lib/tableStatus";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import Pagination from "./pagination";
import TableHeader from "./TableHeader";

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
  tableRowData
}) {
  const { isRemittancePaymentCardModal, isAssessmentCardModal } = useSelector(
    (store) => store.modal
  );

  return (
    <>
      {/* REMITTANCE PAYMENT MODAL */}
      {/* <AnimatePresence mode="wait">
        {isRemittancePaymentCardModal && <RemittanceReceiptModal />}
        {isAssessmentCardModal && <AssessmentReceiptModal />}
      </AnimatePresence> */}
      <div className="relative">
        <div className="flex flex-col max-w-[1200px] gap-4 border p-8 rounded-3xl">
          <div className="flex flex-col lg:flex-row md:justify-between lg:items-center gap-2 md:gap-4">
            <div>
              <p className="text-xl lg:text-2xl family2 text-gray-800">{title}</p>
              <p className="text-sm lg:text-base font-normal text-[#525866]">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full lg:w-[250px]">
                <Input
                  placeholder="Search..."
                  className="w-full h-10 rounded-full border-[#E5E7EB] bg-white text-sm pl-10"
                  value={searchQuery || ""}
                  aria-label="Search remittances"
                  onChange={(e) => handleSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              </div>
              {/* {type !== "payment_overview" && (
                <ExportDropdown handleCSVDownload={handleCSVDownload} />
              )} */}
            </div>
          </div>
          <div className="hidden lg:block">
            {/* <ActionButtons
              actionButtons={actionButtons || []}
              selectedAction={selectedAction}
              setSelectedAction={setSelectedAction}
              type={type}
            /> */}
          </div>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader tableHeaderData={tableHeaderData} />
              <TableBody className="overflow-x-auto">
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
                      colSpan={tableRowData?.length}
                      className="py-3 px-6"
                    >
                      <div className="w-full flex justify-center items-center gap-2">
                        <div className="w-full flex flex-col justify-center items-center gap-2">
                          <img className="w-36" src="/assests/icons/empty_payment.png" alt="" />
                          <h4 className="text-base font-semibold capitalize">
                            No {type} Record Available...
                          </h4>
                        </div>
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
