"use client";
import { Button } from "@/components/ui/button";
import SortBySelect from "./SortBySelect";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AssessmentProps,
  FilingDocument,
  IPayment,
  RemittanceProps,
  EmployeeListDocument,
} from "@/types";
import { CheckCircle2, History, XCircle } from "lucide-react";
import moment from "moment";
import React, { JSX, useCallback } from "react";
import {
  onAssessmentCardModal,
  onFilingCardModal,
  onPaymentCardModal,
  onRemittancePaymentCardModal,
  onTaxPayerModal,
} from "@/redux/slices/modalSlice";
import Link from "next/link";
import ActionRowBtn from "./ActionRowBtn";
import { useDispatch } from "react-redux";

type tableDataProp =
  | RemittanceProps
  | AssessmentProps
  | IPayment
  | FilingDocument
  | EmployeeListDocument;

export default function TableCard({
  tableData,
  type,
  renderStatus,
}: {
  tableData: tableDataProp;
  type?: string;
  renderStatus: (status: string) => JSX.Element;
}) {
  const dispatch = useDispatch();
  const startDate = moment(tableData?.createdAt).format("DD MMM YYYY");

  const handleAction = useCallback((action: string, transaction: any) => {
    console.log(`${action} clicked for transaction:`, transaction);
  }, []);

  if (type === "remittance") {
    const remittance = tableData as RemittanceProps;

    return (
      <TableRow
        key={remittance?._id}
        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
      >
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?._id?.slice(0, 10)}...
        </TableCell>
        {/* <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.currency}
        </TableCell> */}
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.paymentPeriod}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.taxType}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.revenueLines}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(remittance?.amount).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(remittance?.amountUnPaid).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6">
          {remittance?.remittanceStatus
            ? renderStatus(remittance?.remittanceStatus)
            : "-"}
        </TableCell>
        <TableCell className="flex gap-2">
          {remittance?.remittanceStatus === "PENDING" ||
          remittance?.remittanceStatus === "FAILED" ? (
            <Button
              onClick={() => dispatch(onPaymentCardModal(remittance?._id))}
              className={`inline-flex bg-[#CBF5E5] hover:bg-[#b9e0d1cc] cursor-pointer items-center text-xs font-medium border text-[#176448] rounded-sm py-1 px-3 border-gray-100`}
            >
              Pay Now
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch(onRemittancePaymentCardModal(remittance?._id))
              }
              variant="ghost"
              className="text-[#6B7280] cursor-pointer border rounded-md text-xs py-[2px] px-[8px] hover:text-[#000000]"
            >
              View Receipt
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }

  if (type === "employer_remittance") {
    const remittance = tableData as RemittanceProps;

    return (
      <TableRow
        key={remittance?._id}
        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
      >
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?._id?.slice(0, 10)}...
        </TableCell>
        {/* <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.currency}
        </TableCell> */}
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.paymentPeriod}
        </TableCell>
        {/* <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.taxOffices}
        </TableCell> */}
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {remittance?.revenueLines}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(remittance?.amount).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(remittance?.amountUnPaid).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6">
          {remittance?.remittanceStatus
            ? renderStatus(remittance?.remittanceStatus)
            : "-"}
        </TableCell>
        <TableCell className="flex gap-2">
          {remittance?.remittanceStatus === "PENDING" ||
          remittance?.remittanceStatus === "FAILED" ? (
            <Button
              className={`inline-flex bg-[#CBF5E5] hover:bg-[#b9e0d1cc] items-center text-xs font-medium text-[#176448] rounded-sm py-1 px-3 border-gray-100`}
            >
              Not Paid
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch(onRemittancePaymentCardModal(remittance?._id))
              }
              variant="ghost"
              className="text-[#6B7280] cursor-pointer border rounded-md text-xs py-[2px] px-[8px] hover:text-[#000000]"
            >
              View Receipt
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }

  if (type === "payment") {
    const payment = tableData as IPayment;
    //  const startDate = moment(tableData?.startDate).format("DD MMM YYYY");
    return (
      <TableRow
        key={payment?._id}
        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
      >
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {payment?._id?.slice(0, 12)}...
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`${startDate}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {payment?.transactionId || "_"}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(payment?.price).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {payment?.paymentChannel}
        </TableCell>
        <TableCell className="py-3 px-6">
          {payment?.paymentStatus ? renderStatus(payment?.paymentStatus) : "-"}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {payment?.remittanceId?.slice(0, 15)}...
        </TableCell>
        <TableCell className="py-3 px-6 text-sm">
          <button
            onClick={() => dispatch(onPaymentCardModal(tableData?._id))}
            className="py-2 px-3 rounded h-auto cursor-pointer border shadow-custom-light bg-white btn_2"
          >
            View Details
          </button>
        </TableCell>
      </TableRow>
    );
  }

  if (type === "assessment") {
    const assessment = tableData as AssessmentProps;
    return (
      <TableRow
        key={assessment._id}
        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
      >
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {assessment._id?.slice(0, 13)}...
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(assessment.taxPayable).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {assessment.assessmentYear}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(assessment.totalIncome || 0).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(assessment.totalReliefs || 0).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`₦ ${Number(assessment.chargeableIncome || 0).toLocaleString()}`}
        </TableCell>
        <TableCell className="py-3 px-6">
          {renderStatus(assessment.status)}
        </TableCell>
        <TableCell className="py-3 px-6">
          <button
            onClick={() => dispatch(onAssessmentCardModal(tableData?._id))}
            className="py-2 px-3 rounded h-auto cursor-pointer border shadow-custom-light bg-white btn_2"
          >
            View Details
          </button>
        </TableCell>
      </TableRow>
    );
  }

  if (type === "filings") {
    const filings = tableData as FilingDocument;
    return (
      <TableRow
        key={filings._id}
        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
      >
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {filings._id}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`${filings.returnType}`}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {filings.employeeType}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          <Link
            href={`${filings?.csvUrl}`}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#eee]"
          >
            <img src="/assets/icons/csv_2.png" alt="" className="w-8" />
          </Link>
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {`${Number(filings.yearInView)}`}
        </TableCell>
        <TableCell className="py-3 px-6">
          {renderStatus(filings.status)}
        </TableCell>
        {/* <TableCell className="py-3 px-6">
          <button
            onClick={() => dispatch(onFilingCardModal(tableData?._id))}
            className="py-2 px-3 rounded h-auto cursor-pointer border shadow-custom-light bg-white btn_2"
          >
            View Details
          </button>
        </TableCell> */}
      </TableRow>
    );
  }

  if (type === "employee_list") {
    const employeeList = tableData as EmployeeListDocument;
    return (
      <TableRow
        key={employeeList._id}
        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
      >
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {employeeList._id?.slice(0, 10)}...
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {employeeList?.tin}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {employeeList?.firstName} {employeeList?.lastName}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {employeeList?.email}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {employeeList?.gender}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {employeeList?.position}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm text-gray-800">
          {startDate}
        </TableCell>
        <TableCell className="py-3 px-6 text-sm">
          <button
            onClick={() => dispatch(onTaxPayerModal(employeeList?._id))}
            className="py-2 px-3 rounded h-auto cursor-pointer border shadow-custom-light bg-white btn_2"
          >
            View Details
          </button>
        </TableCell>
      </TableRow>
    );
  }

  return null;
}
