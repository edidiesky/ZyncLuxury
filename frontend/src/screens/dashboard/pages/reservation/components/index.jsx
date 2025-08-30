 
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllReservations,
} from "@/features/reservation/reservationReducer";
import { BiSearch, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import {  AnimatePresence } from "framer-motion";
import Loader from "@/components/home/loader";
import { Table } from "@/components/common/styles";
import TableCard from "@/screens/dashboard/components/table/TableCard";
import { handlePage } from "@/features/reservation/reservationSlice";
import CreateReservationModal from "@/components/modals/reservationmodal/CreateReservationModal";
const DashboardIndex = () => {
  const [reservationdetailsidebar, setReservationDetailSidebar] = useState(false);
  const [reservationid, setReservationId] =
    useState("");
  const dispatch = useDispatch();
  const { reservations, getsingleReservationisLoading, page } =
    useSelector((store) => store.reservation);

  useEffect(() => {
    // dispatch(GetAllRoomAndReservations());
    dispatch(GetAllReservations());
  }, [page]);
  if (getsingleReservationisLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full flex flex-col gap-6 md:gap-12">
      <AnimatePresence mode="wait">
        {reservationdetailsidebar && (
          <CreateReservationModal
            reservationid={reservationid}
            modal={reservationdetailsidebar}
            setModal={setReservationDetailSidebar}
          />
        )}
      </AnimatePresence>
      {/*    onClick={() => setReservationDetailSidebar(true)} */}
      <div className="w-full"></div>
    </div>
  );
};

export default DashboardIndex;
