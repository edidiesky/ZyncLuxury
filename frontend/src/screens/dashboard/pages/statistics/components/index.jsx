import React, { useEffect, useState } from "react";
import Statistics from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
import OverviewWidget from "@/screens/dashboard/components/widget/OverviewWidget";
import { chartData } from "@/constants/data/chartData";
import DashboardTable from "@/screens/dashboard/components/table";
import { OverviewTableHeaderList } from "@/constants/data/tableHeaders";
import { overviwActionButtons } from "@/constants/data/tableActionButtons";
const DashboardIndex = () => {
  const { getStatisLoading } = useSelector((store) => store.stat);
  const { rooms, getallRoomisLoading, page, totalCount } = useSelector(
    (store) => store.room
  );
  // rooms
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAction, setSelectedAction] = useState({
    "all-methods": "all-methods",
    "all-statuses": "all-statuses",
    "tax-type": "all-types",
    "date-range": "3-months",
    "remittance-date-range": "3-months",
    granularity: "day",
    taxOffices: "taxOffices",
    "revenue-lines": "all-revenue-lines",
    mdas: "all-mdas",
    "mda-revenue-lines": "all-mda-revenue-lines",
    "payment-provider": "all-methods",
    "payment-method": "all-methods",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminStat());
    dispatch(getAllRoomsForAdmin());
  }, []);

  const paymentChartConfig = {
    price: {
      label: "Total Price",
      color: "#0B6A41",
    },
    room: {
      label: "Total Rooms",
      color: "#dddbdb",
    },
  };
  const dataKeys = [
    { datakey: "price", color: "#C1D72F" },
    { datakey: "room", color: "#0B6A41" },
  ];

  const handleChartFilterChange = (value) => {
    setSelectedAction((prev) => ({
      ...prev,
      "date-range": value,
    }));
  };
  const handleActionChange = (value) => {
    setSelectedAction((prev) => ({
      ...prev,
      "payment-date-range": value,
    }));
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full grid items-start gap-12 lg:gap-4 lg:grid-cols-1">
          <OverviewWidget />
          <div className="w-full">
            <Statistics
              dataKeys={dataKeys}
              selectedAction={selectedAction}
              chartConfig={paymentChartConfig}
              handleChartFilterChange={handleChartFilterChange}
              chartData={chartData}
            />
          </div>
        </div>
        {/* widget */}

        <DashboardTable
          tableHeaderData={OverviewTableHeaderList}
          tableRowData={rooms?.slice(0, 5) || []}
          title="Recent Booking History"
          actionButtons={overviwActionButtons}
          type="rooms"
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
          description={"Display the recent bookings in the table below."}
        />

        {/* <RoomsCreated /> */}
      </div>
    </div>
  );
};

export default DashboardIndex;
