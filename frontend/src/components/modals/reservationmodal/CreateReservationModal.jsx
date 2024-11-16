import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { addDays, format } from "date-fns";
import { RxCross2 } from "react-icons/rx";
import Loader from "../../home/loader";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteReservation,
  CreateReservation,
  UpdateReservation,
  GetSingleReservation,
} from "@/features/reservation/reservationReducer";

import CreateRoomTab from "./CreateRoomTab";
import CreateGuestTab from "./CreateGuestTab";
import toast from "react-hot-toast";
import { CreateNotifications } from "@/features/notification/notificationReducer";
import { RegisterUser } from "@/features/auth/authReducer";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../DeleteModal";
import { slideSidebarLeft } from "@/constants/utils/framer";
export default function CreateReservationModal({
  setModal,
  reservationid,
  modal,
}) {
  // console.log(reservation)
  const {
    createReservationisLoading,
    deleteReservationisLoading,
    updateReservationisLoading,
    reservation,
  } = useSelector((store) => store.reservation);

  const [price, setPrice] = useState(0);
  const [deletemodal, setDeleteModal] = useState(false);
  const [partpaymentprice, setPartPaymentPrice] = useState(0);
  const [discountprice, setDiscountPrice] = useState(0);
  const [room, setRoom] = useState(null);
  const [guests, setGuests] = useState(1);
  const [reservationtab, setReservationTab] = useState(1);
  const [user, setUser] = useState(null);
  const [totalreservationprice, setTotalReservationPrice] = useState(0);
  const [status, setStatus] = useState("PENDING");
  // new guests data form
  const [newguest, setNewGuests] = useState({
    newguestname: "",
    newguestusername: "",
    newgueststreet: "",
    newguesthousenumber: "",
    newguestapartmentnumber: "",
    newguestcity: "",
    newguestpostcode: "",
    newguestphone: "",
    newguestemail: "",
  });

  const today = new Date();
  const [date, setDate] = React.useState({
    from: today,
    to: addDays(today, 3),
  });
  const [statustab, setStatusTab] = useState(null);
  const dispatch = useDispatch();
  const handleClearAlert = () => {
    setModal(false);
  };

  // const room = {}
  const HandleStatus = ({ stat, tab }) => {
    // console.log({ stat, tab });
    setStatus(stat);
    setStatusTab(tab);
  };
  const handleDeleteRoom = useCallback(() => {}, []);

  const startdate = date?.from;
  const enddate = date?.to;
  let date1 = moment(startdate);
  let date2 = moment(enddate);
  const differenceInDays = date2?.diff(date1, "days");
  // console.log(room);

  const handleRoomId = (value) => {
    setRoom(value);
    localStorage.setItem("rooms", JSON.stringify(value));
    // console.log(value)
  };
  const roomValue = JSON.parse(localStorage.getItem("rooms"));
  // console.log(roomValue)
  const handleUserSelection = (value) => {
    setUser(value);
  };
  // useEffect(() => {
  //   if (reservationid && modal) {
  //     dispatch(GetSingleReservation(reservationid));
  //   }
  // }, [reservationid, modal]);
  // useEffect(() => {
  //   if (reservation) {
  //     setStatus(reservation?.status);
  //     setDate({
  //       from: new Date(reservation?.startDate),
  //       to: new Date(reservation?.endDate),
  //     });
  //     setTotalReservationPrice(reservation?.totalPrice);
  //     setPartPaymentPrice(reservation?.partpaymentPrice);
  //     setGuests(reservation?.guests);
  //     setNewGuests(reservation?.patchguests);
  //     setPrice(reservation?.roomprice);
  //     setUser(reservation?.user);
  //   }
  //   if (!reservation) {
  //     if (partpaymentprice !== 0) {
  //       setStatus("PARTPAYMENT");
  //     }
  //   }
  // }, [
  //   setStatus,
  //   setUser,
  //   partpaymentprice,
  //   setPrice,
  //   setNewGuests,
  //   setPartPaymentPrice,
  //   reservation,
  //   setDate,
  //   setTotalReservationPrice,
  //   setGuests,
  // ]);

  // console.log(reservationData)
  // console.log(new Date(startdate))

  const totalPrice =
    (reservation?.roomprice
      ? reservation?.roomprice
      : roomValue?.price - discountprice) < 0
      ? 0
      : Number(
          reservation?.roomprice ? reservation?.roomprice : roomValue?.price
        ) - discountprice;
  const totalBookingPrice =
    Number(totalPrice * differenceInDays) +
    Number(
      reservation?.roomcautionprice
        ? reservation?.roomcautionprice
        : room?.cautionfee
    );

  const RegisterNewGuest = () => {
    if (
      newguest?.newguestname &&
      newguest?.newguestemail &&
      newguest?.newguestusername
    ) {
      dispatch(
        RegisterUser({
          name: newguest?.newguestname,
          username: newguest?.newguestusername,
          email: newguest?.newguestemail,
          hashedPassword: "12345",
        })
      );
      // toast.success('Register User')
      // toast.success('Create Reservation for the User')
    } else {
      toast.success("Fill In Registration form for the User");
    }
  };
  const reservationData = {
    patchguests:
      newguest?.newguestname &&
      newguest?.newguestemail &&
      newguest?.newguestusername
        ? newguest
        : user,
    startDate: moment(startdate).format("MMMM Do YYYY"),
    endDate: moment(enddate).format("MMMM Do YYYY"),
    guests: guests,
    totalPrice:
      status === "UNAVAILABLE"
        ? 0
        : status === "PENDING"
        ? 0
        : totalBookingPrice,
    status: status,
    partpaymentPrice: Number(partpaymentprice),
  };
  const handleCreateReservation = () => {
    // toast.success('Create Notification for the User')
    if (user?.name === "Null Guest" || user === null) {
      RegisterNewGuest();
      dispatch(
        CreateReservation({
          roomid: room?.id,
          reservation: reservationData,
        })
      );
      dispatch(
        CreateNotifications({
          action: reservation
            ? "Updated the reservation"
            : "Created a reservation",
        })
      );
      // toast.success('Create Reservation')
      // toast.success('Create Notification')
    } else {
      // toast.success('Create Reservation')
      // toast.success('Create Notification')
      dispatch(
        CreateReservation({
          roomid: room?.id,
          reservation: reservationData,
        })
      );
      dispatch(
        CreateNotifications({
          action: reservation
            ? "Updated the reservation"
            : "Created a reservation",
        })
      );
      // toast.success('Create Reservation for the User')
    }
    // 2K2N2MUCWW
    // dispatch(
    //   CreateReservation({
    //     roomid: room?.id,
    //     reservation: reservationData,
    //   })
    // )
    // toast.success('Create Reservation for the User')
  };
  const handleNextTab = () => {
    // console.log('Hello world')
    if ((reservation || roomValue) && status !== undefined) {
      if (reservationtab === 2) {
        if (
          (newguest?.newguestname &&
            newguest?.newguestemail &&
            newguest?.newguestusername) ||
          (reservation?.user?.name &&
            reservation?.user?.email &&
            reservation?.user?.username) ||
          roomValue
        ) {
          if (reservation) {
            dispatch(
              UpdateReservation({
                reservationId: {
                  reservationid: reservation?.id,
                  roomid: reservation?.roomid,
                },
                reservation: {
                  patchguests:
                    newguest?.newguestname &&
                    newguest?.newguestemail &&
                    newguest?.newguestusername
                      ? newguest
                      : user,
                  startDate: moment(startdate).toISOString(),
                  endDate: moment(enddate).toISOString(),
                  guests: guests,
                  totalPrice:
                    status === "UNAVAILABLE"
                      ? 0
                      : status === "PENDING"
                      ? 0
                      : totalBookingPrice,
                  status: status,
                  partpaymentPrice: Number(partpaymentprice),
                },
              })
            );
          } else {
            handleCreateReservation();
            localStorage.removeItem("rooms");
          }
        } else {
          toast.error("Please complete all the required fields");
        }
      } else {
        setReservationTab(2);
      }
    } else {
      if (status === undefined) {
        toast.error("Please complete the status fields");
      } else {
        toast.error("Please select the room fields");
      }
    }
  };
  // console.log(reservation)
  return (
    <>
      {createReservationisLoading && <Loader />}
      {updateReservationisLoading && <Loader />}
      {deleteReservationisLoading && <Loader />}
      <AnimatePresence mode="wait">
        {deletemodal && (
          <DeleteModal
            reservation={reservation}
            setModal={setDeleteModal}
            modal={deletemodal}
            type={"reservation"}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.6,
          },
        }}
        animate={{ opacity: 1 }}
        className={`w-screen h-[100vh] left-0 fixed z-[600] top-0 bg-[rgba(0,0,0,0.2)]`}
      >
        <motion.div
          variants={slideSidebarLeft}
          initial="initial"
          animate={modal ? "enter" : "exit"}
          exit="exit"
          className={`w-[100%] lg:w-[600px] h-[100vh] flex flex-col gap-8 overflow-auto absolute top-0 bg-white z-30 sidebar_shadow`}
        >
          <div
            className="absolute z-50 right-4 top-4 w-12 h-12 rounded-full hover:bg-[#fafafa] flex items-center justify-center cursor-pointer"
            onClick={handleClearAlert}
          >
            <RxCross2 />
          </div>
          <div className="deleteCardTop w-full sticky top-0 left-0 border-b p-2 pb-0 md:px-8 flex flex-col gap-2">
            <h3 className="text-2xl md:text-2xl amily2">
              {reservation ? "  Update Reservation" : "  Add a Reservation"}
            </h3>
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`p-2 px-4 capitalize family2 rounded-[4px] 
              text-center ${
                status === "PENDING"
                  ? "bg-[#f9d955] text-[#000]"
                  : status === "UNAVAILABLE"
                  ? "bg-[#CECECE]"
                  : status === "PARTPAYMENT"
                  ? "bg-[#B691C1]"
                  : "bg-[#0e7b10] text-[#fff]"
              }  
               text-xs family2`}
                >
                  {status === "PENDING"
                    ? "Pending Payment"
                    : status === "UNAVAILABLE"
                    ? "Unavailable"
                    : status === "PARTPAYMENT"
                    ? "Part Payment"
                    : "Fully Paid"}
                  {/* Pending Payment */}
                </span>
              </div>
              {reservation && (
                <span
                  // disabled={room === null || user === null || createReservationisLoading}
                  onClick={() => setDeleteModal(true)}
                  className="w-12 h-12 hover:bg-[#eee] rounded-full flex items-center justify-center text-sm"
                  // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
                >
                  <FaTrash color="var(--red)" />
                </span>
              )}
            </div>
            <div className="grid pt-4 w-full gap-4 grid-cols-2 z-[200000000] bg-[#fff] lg:grid-cols-4">
              <div
                onClick={() => setReservationTab(1)}
                className={`w-full cursor-pointer ${
                  reservationtab === 1 ? "border-b-4 border-[#0e7b10]" : ""
                } text-[#000]  pb-3 text-base family2 family2`}
              >
                Booking Details
              </div>

              <div
                onClick={() => setReservationTab(2)}
                className={`w-full cursor-pointer ${
                  reservationtab === 2 ? "border-b-4 border-[#0e7b10]" : ""
                }    text-[#000] pb-3 text-base family2 family2`}
              >
                Client Profile
              </div>
            </div>
          </div>
          {reservationtab === 1 ? (
            <CreateRoomTab
              handleRoomId={handleRoomId}
              room={room}
              setDiscountPrice={setDiscountPrice}
              totalPrice={totalPrice}
              totalBookingPrice={totalBookingPrice}
              setGuests={setGuests}
              guests={guests}
              date={date}
              setDate={setDate}
              differenceInDays={differenceInDays}
              status={status}
              HandleStatus={HandleStatus}
              setPartPaymentPrice={setPartPaymentPrice}
              partpaymentprice={partpaymentprice}
              reservation={reservation}
              totalreservationprice={totalreservationprice}
            />
          ) : (
            <CreateGuestTab
              handleUserSelection={handleUserSelection}
              newguest={newguest}
              setNewGuests={setNewGuests}
              reservation={reservation}
              user={user}
            />
          )}

          <div className="deleteCardBottom py-2 w-full flex flex-row gap-2 items-center md:justify-end px-4">
            <button
              className="family1 font-booking_font family2 flex items-center justify-center text-sm"
              onClick={handleClearAlert}
            >
              Cancel
            </button>
            <button
              // disabled={room === null || user === null || createReservationisLoading}
              onClick={handleNextTab}
              className="btn px-4 text-[#fff] py-2 rounded-[10px] family1 font-booking_font family2 flex items-center justify-center text-sm"
              // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
            >
              {createReservationisLoading ? (
                <span className="flex text-[#Fff] items-center justify-center gap-2">
                  <Loader type="dots" />
                  Creating in progress
                </span>
              ) : (
                <span className="text-white">
                  {reservationtab === 2 ? (
                    <> {reservation ? `Update` : `Save`}</>
                  ) : (
                    `Next `
                  )}
                </span>
              )}
            </button>
          </div>
        </motion.div>
        <div
          style={{
            transition: "all .3s",
          }}
          onClick={() => setModal(false)}
          className={`${
            modal ? "opacity-100 right-[0%]" : "opacity-0 -right-[100%]"
          } w-full top-0 absolute bg-[rgba(0,0,0,.1)] h-full z-10`}
        ></div>
      </motion.div>
    </>
  );
}
