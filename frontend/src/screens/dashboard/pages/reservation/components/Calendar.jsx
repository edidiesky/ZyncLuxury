
import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import { AnimatePresence } from "framer-motion";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CreateReservationModal from "@/components/modals/reservationmodal/CreateReservationModal";

const ReservationCalendar = () => {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const { reservations, getsingleReservationisLoading } = useSelector(
    (store) => store.reservation
  );
  const [reservationtab, setReservationTab] = useState({
    modal: false,
    data: null,
  });

  // Format the reservation data
  const newFormattedData = useMemo(() => {
    return (reservations || []).map((booking) => {
      return {
        id: booking?.id,
        booking: booking,
        label: {
          icon: booking?.images && booking?.images[0],
          title: booking?.title,
        },
        data: (booking?.reservations || []).map((data, index) => {
          const formattedStartDate = moment(data?.startDate);
          const formattedEndDate = moment(data?.endDate);
          const duration = formattedEndDate.diff(formattedStartDate, "hours");
          return {
            startDate: new Date(data?.startDate),
            endDate: new Date(data?.endDate),
            id: data?.id,
            occupancy: `${duration}`,
            roomprice: `${booking?.price}`,
            roomcautionprice: `${booking?.cautionfee}`,
            bgColor: `${data?.status === "PENDING" ? "#f9d955" :
              data?.status === 'UNAVAILABLE' ? "#CECECE" :
                data?.status === 'PARTPAYMENT' ? "#B691C1" : "#0e7b10"}`,
            subtitle: `${data?.patchguests?.username ? data?.patchguests?.username : data?.user?.name || "Unknown user"} has booked it`,
            title: `${booking?.title}`,
            ...data,
          };
        }),
      };
    });
  }, [reservations, range?.startDate, range?.endDate]);
  useEffect(() => {
    const today = new Date();
    setRange({ startDate: undefined, endDate: today });
  }, [setRange]);

  return (
    <>
      <AnimatePresence mode="wait">
        {reservationtab?.modal && (
          <CreateReservationModal
            modal={reservationtab?.modal}
            setModal={setReservationTab}
            reservation={reservationtab?.data}
          />
        )}
      </AnimatePresence>
      <ReservationCalendarStyle className="relative p4 bg-white overflow-hidden shadow-lg border border-[rgba(0,0,0,.2)] rounded-[10px] min-h-[530px]">

        <Scheduler
          data={newFormattedData}
          isLoading={getsingleReservationisLoading}
          onRangeChange={(newRange) => setRange(newRange)}
          onTileClick={(item) =>
            setReservationTab({
              modal: true,
              data: item,
            })
          }
          onFilterData={() => {
            // Some filtering logic...
            setFilterButtonState(1);
          }}
          onClearFilterData={() => {
            // Some clearing filters logic...
            setFilterButtonState(0);
          }}
          config={{
            zoom: 0,
            filterButtonState,
            initialDate: undefined, // Set the initial date to today's date
          }}
        />
      </ReservationCalendarStyle>
    </>
  );
};

const ReservationCalendarStyle = styled.section``;

export default ReservationCalendar;
