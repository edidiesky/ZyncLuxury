"use client";

import { Search } from "lucide-react";
import { useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardTableProps } from "@/types";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ActionButtons from "./ActionButtons";
import ExportDropdown from "./ExportDropdown";
import Pagination from "./Pagination.jsx";
import TableHeader from "./TableHeader";
import TableCard from "./TableCard";

import { AnimatePresence } from "framer-motion";
import { renderStatus } from "@/utils/dashboardTableStatus";
import ContentLoader from "@/components/common/ContentLoader";
// import RemittanceModal from "../modals/RemittanceModal";
// import PaymentModal from "../../admin/_components/AdminDashboardTable/AdminDashboardActionsModal/PaymentModal";

export default function DashboardTable(props) {
  const {
    isDashboardActionsModal,
    isPaymentCardModal,
    isRemittancePaymentCardModal,
  } = useSelector((store) => store.modal);

  return (
    <>
      {/* REMITTANCE PAYMENT MODAL */}
      {/* <AnimatePresence mode="wait">
        {isRemittancePaymentCardModal && <RemittanceModal />}
        {isPaymentCardModal && <PaymentModal />}
      </AnimatePresence> */}
      <div className="relative">
        <Card className="bg-gray-50 border-none">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>
              <div>
                <p className="text-base lg:text-lg font-semibold text-gray-800">
                  {props?.title}
                </p>
                <h5 className="text-sm font-normal text-[#525866]">
                  {props?.description}
                </h5>
              </div>
            </CardTitle>
            <div className="flex gap-3">
              <div className="relative w-20 lg:w-[300px]">
                <Input
                  placeholder="Search..."
                  className="w-full h-10 rounded-md border-[#E5E7EB] bg-white text-sm pl-10"
                  value={props?.searchQuery || ""}
                  onChange={(e) => props?.handleSearchQuery?.(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              </div>
              <ExportDropdown />
            </div>
          </CardHeader>
          <ActionButtons
            actionButtons={props?.actionButtons || []}
            selectedAction={props?.selectedAction}
            setSelectedAction={props?.setSelectedAction}
            type={props?.type}
          />
          <CardContent className="p-0 w-full max-w-[1200px] mx-auto">
            <Table>
              <TableHeader tableHeaderData={props?.tableHeaderData} />

              <TableBody>
                {props?.loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={props?.tableHeaderData?.length}
                      className="text-center"
                    >
                      <ContentLoader type="dashboard" />
                    </TableCell>
                  </TableRow>
                ) : props?.tableRowData?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={props?.tableHeaderData?.length}
                      className="py-3 px-6 text-center"
                    >
                      <div className="w-full flex flex-col justify-center items-center gap-2">
                        {/* {props?.type !== 'overview' ? (
                          <img src="/assets/icons/stocks.png" alt="" />
                        ) : (
                          <img src="/assets/icons/card.png" alt="" />
                        )} */}
                        <div className="w-full flex flex-col justify-center items-center gap-2">
                          <img src="/assets/icons/stocks.png" alt="" />
                          <h4 className="text-md capitalize">
                            No{" "}
                            {props?.type === "employer_remittance"
                              ? "Employer Remittance"
                              : props?.type}{" "}
                            Record Available...
                          </h4>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  props?.tableRowData?.map((tableData, index) => {
                    return (
                      <TableCard
                        key={index}
                        renderStatus={renderStatus}
                        // getActionButtons={getActionButton}
                        tableData={tableData}
                        type={props?.type}
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
          <Pagination
            currentPage={props?.currentPage ?? 1}
            totalPages={props?.totalPages ?? 0}
            totalRows={props?.totalRows ?? 0}
            rowsPerPage={props?.rowsPerPage ?? 10}
            setCurrentPage={props?.setCurrentPage || (() => {})}
            setRowsPerPage={props?.setRowsPerPage || (() => {})}
          />
        </Card>
      </div>
    </>
  );
}
