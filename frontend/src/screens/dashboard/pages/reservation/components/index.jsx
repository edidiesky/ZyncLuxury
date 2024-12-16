 
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllReservations,
} from "@/features/reservation/reservationReducer";
import { BiSearch, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import {  AnimatePresence } from "framer-motion";
import Loader from "@/components/home/loader";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
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
    <div className="w-full flex flex-col gap-8 lg:gap-16  md:gap-12">
      <AnimatePresence mode="wait">
        {reservationdetailsidebar && (
          <CreateReservationModal
            reservationid={reservationid}
            modal={reservationdetailsidebar}
            setModal={setReservationDetailSidebar}
          />
        )}
      </AnimatePresence>
      <div className="w-full grid md:grid-cols-2 lg:items-center gap-8 lg:gap-16  justify-between">
        <div className="w-full flex flex-col gap-1">
          <h3 className="text-2xl block lg:text-4xl text-dark family2">
            Reservations Created
          </h3>
          <span className="block family1 text-base lg:text-lg font-normal">
            Overview of your listings reservations created by your clients
          </span>
        </div>

        <div className="flex items-center md:justify-end gap-2">
          <div
            onClick={() => setReservationDetailSidebar(true)}
            className="p-4 btn cursor-pointer text-sm
             bg-[#000] px-6 font-booking_font rounded-[10px] family2 text-white"
          >
            Add a reservation
          </div>
        </div>
      </div>
      <div className="w-full py-8 border bg-[#fff] rounded-lg px-6">
        <Table>
          <div className="TableContainer">
            <table className="tableWrapper">
              <thead>
                <tr>
                  {/* <th>Description</th> */}
                  <th>Home Title</th>
                  <th className="hidden lg:table-cell">User</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {reservations?.map((x, _) => {
                  return (
                    <TableCard
                      handleModal={() => {
                        setReservationDetailSidebar(true);
                        setReservationId(x?.id);
                      }}
                      x={x}
                      type={"Reservation"}
                      key={x?.id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </Table>
        {reservations?.length > 0 ? (
          <div className="w-full mt-4 family1 flex items-center justify-end gap-4">
            <div
              onClick={() => dispatch(handlePage("prev"))}
              className="p-2 rounded-md text-lg family2 family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.2)]"
            >
              <BiChevronLeft />
            </div>
            {page}
            <div
              onClick={() => dispatch(handlePage("next"))}
              className="p-2 rounded-md text-lg family2 family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
            >
              {" "}
              <BiChevronRight />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* <ReservationCalendar /> */}
      </div>
    </div>
  );
};

export default DashboardIndex;
