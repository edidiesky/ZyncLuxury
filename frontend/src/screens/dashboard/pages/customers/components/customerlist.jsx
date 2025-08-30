import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardTable from "@/screens/dashboard/components/table";
import { customersTableHeaderList } from "@/constants/data/tableHeaders";
import { overviwActionButtons } from "@/constants/data/tableActionButtons";
const UserList = () => {
  const { users, getallRoomisLoading, page, totalCount } = useSelector(
    (store) => store.auth
  );
  // users
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedAction, setSelectedAction] = useState({
    "all-methods": "all-methods",
    "all-statuses": "all-statuses",
    "date-range": "3-months",
    "payment-provider": "all-methods",
    "payment-method": "all-methods",
  });
  const dispatch = useDispatch();
  const handleActionChange = (value) => {
    setSelectedAction((prev) => ({
      ...prev,
      "payment-date-range": value,
    }));
  };
  return (
    <div className="w-full">
      <DashboardTable
        tableHeaderData={customersTableHeaderList}
        tableRowData={users?.slice(0, 5) || []}
        title="Recent Customers History"
        actionButtons={overviwActionButtons}
        type="customerlist"
        loading={getallRoomisLoading}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
        selectedAction={selectedAction}
        setSelectedAction={handleActionChange}
        currentPage={currentPage}
        totalPages={page}
        totalRows={totalCount}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        description={"Display the recent customer list in the table below."}
      />
    </div>
  );
};

export default UserList;
