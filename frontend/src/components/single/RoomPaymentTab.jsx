"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  BiCheck,
  BiPlus,
  BiMinus,
  BiStar,
  BiPhone,
  BiMessage,
} from "react-icons/bi";
import moment from "moment";
import { addDays, format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../home/loader";
import { onLoginModal } from "@/features/modals/modalSlice";
import AnimateText from "@/animations/AnimateText";
import { CreateNotifications } from "@/features/notification/notificationReducer";
export default function RoomPaymentTab({ room, differenceinDays }) {
  // states of the reservation booking either loading or
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookingloading, setBookingLoading] = useState(false);
  const [bookingdata, setBookingData] = useState(null);
  const [guests, setGuests] = useState(1);

  // console.log(moment(startdate).format("MMMM Do"));
  const { currentUser, token } = useSelector((store) => store.auth);

  // console.log(token)

  const today = new Date();
  const [date, setDate] = React.useState({
    from: today,
    to: addDays(today, 3),
  });
  const startdate = date?.from;
  const enddate = date?.to;
  let date1 = moment(startdate);
  let date2 = moment(enddate);

  const differenceInDays = date2?.diff(date1, "days"); // Convert milliseconds to days
  // console.log(moment(startdate)?.date());
  let mainDiff = differenceInDays ? differenceInDays : differenceinDays;
  const price =
    room && room?.price ? parseInt(room?.price.replace(/,/g, "")) : 0;
  const cautionFee =
    room && room?.cautionfee ? parseInt(room?.cautionfee.replace(/,/g, "")) : 0;

  // Calculate total price
  const totalPrice = price * mainDiff + cautionFee;

  // console.log("price:", price);
  // console.log("cautionFee:", cautionFee);
  // console.log("totalPrice:", totalPrice);
  const reservationData = {
    totalPrice: totalPrice,
    startDate: moment(startdate).format("MMMM Do YYYY"),
    endDate: moment(enddate).format("MMMM Do YYYY"),
    guests: guests,
    status: "PENDING",
  };

  // console.log(reservationData);
  const handleReservationBooking = async () => {
    if (currentUser) {
      // console.log('Reservation has been booked')
      // window.location.href = `/reservation/payment`;
      if (mainDiff < 2) {
        toast.error("Minimum reservation is 2 nights");
      } else {
        // toast.success("Reservation date is fine");

        try {
          setBookingLoading(true);
          const config = {
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URLS}/reservation/${room?.id}`,
            reservationData,
            config
          );
          dispatch(
            CreateNotifications({
              action: `has booked ${room?.title}`,
            })
          );
          toast.success("Room has been succesfully booked!!");
          setBookingData(data);
        } catch (error) {
          const erroMessage =
            error?.response?.data?.message || "An error occurred";
          toast.error(erroMessage);
        } finally {
          setBookingLoading(false);
        }
      }
    } else {
      dispatch(onLoginModal());
    }
  };
  useEffect(() => {
    if (bookingdata !== null) {
      const interval = setTimeout(() => {
        navigate(`/reservation/payment/${bookingdata?.id}`);
      }, 3000);
      return () => clearTimeout(interval);
    }
  }, [bookingdata]);

  return (
    <>
      <div
        style={{
          backdropFilter: "blur(54px)",
        }}
        className="w-full fixed bottom-0 left-0 h-20 flex lg:hidden items-center 
        justify-center family1 border-t bg-[#ffffff9a] z-[50000]"
      >
        <div className="w-[90%] mx-auto flex items-center justify-between">
          <div className="flex flex-1 flex-col">
            <h4 className="text-lg family2">
              ₦{room?.price} <span className="font-normal text-xs">/night</span>
            </h4>
            <div className="">
              <Popover>
                <PopoverTrigger>
                  <div className="flex items-center underline gap-1">
                    <span className="text-sm family2 leading-[1.5] text-center text-dark">
                      {moment(startdate).format("DD MMM")}
                    </span>{" "}
                    {/* <span>-</span> */}
                    <span className="text-sm family2 leading-[1.5] text-center text-dark">
                      {moment(enddate).format("DD MMM")}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex items-center justify-end">
            {currentUser ? (
              <button
                type="submit"
                disabled={bookingloading}
                onClick={handleReservationBooking}
                className="btn flex items-center justify-center text-sm family2 text-white py-3 px-8 w-full"
              >
                {bookingloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader type="dots" />
                    Reserve ...
                  </span>
                ) : (
                  "Reserve"
                )}{" "}
              </button>
            ) : (
              <button
                onClick={handleReservationBooking}
                className="btn flex items-center justify-center text-lg text-white py-4 px-8 w-full"
              >
                Sign in to Reserve
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-[100%] lg:sticky top-[10%] hidden lg:flex flex-col">
        <div className="w-full border rounded-lg py-8 px-2 flex flex-col gap-4 md:w-[380px] bg-[#fff]">
          <h4 className="text-3xl family1 px-6 family2">
            ₦{room?.price} <span className="font-normal text-sm">/night</span>
          </h4>
          <div className="w-[90%] family1 mx-auto grid grid-cols-1">
            <Popover>
              <PopoverTrigger>
                <div className="grid rounded-t-xl px-3 border border-[rgba(0,0,0,.4)] min-h-[80px]  w-full grid-cols-2 gap-4">
                  <div className="cursor-pointer flex items-start py-3 border-r border-[rgba(0,0,0,.4)] justify-center flex-col gap-2">
                    <span className="text-xs text-dark uppercase">
                      CHECK-IN
                    </span>
                    <div className="flex items-start gap-2">
                      <span className="text-sm family2 leading-[1.5] text-center text-dark">
                        {moment(startdate).format("DD MMMM YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="cursor-pointer flex items-start py-3 justify-center flex-col gap-2">
                    <span className="text-xs text-dark uppercase">
                      CHECK-Out
                    </span>
                    <div className="flex items-start gap-2">
                      <span className="text-sm family2 leading-[1.5] text-center text-dark">
                        {moment(enddate).format("DD MMMM YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <div className="w-full rounded-b-xl border border-t-0 border-[rgba(0,0,0,.4)] min-h-[40px] grid grid-cols-1 gap-4">
              <div className="flex p-3 flex-col">
                <span className="text-xs text-dark">GUESTS</span>
                <div className="flex items-center gap-2">
                  <span className="text-base family2 leading-[1.5] text-center text-dark">
                    {guests} guests
                  </span>
                  <span className="text-[8px] leading-[1.5] flex items-center justify-end flex-1 gap-[4px] text-dark font-normal">
                    <button
                      disabled={guests === room?.guests}
                      onClick={() => setGuests(guests + 1)}
                      className="w-8 hover:bg-[#eeeeeec6] bg-[#eeee]  rounded-full cursor-pointer h-8 flex items-center justify-center"
                    >
                      <BiPlus fontSize={"16px"} />
                    </button>
                    <button
                      disabled={guests === 1}
                      onClick={() => setGuests(guests - 1)}
                      className="w-8 hover:bg-[#eeeeeec6] bg-[#eeee]  rounded-full cursor-pointer h-8 flex items-center justify-center"
                    >
                      <BiMinus fontSize={"16px"} />
                    </button>
                    {/* <BiMinus fontSize={"16px"} /> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[90%] family1 mx-auto">
            {currentUser ? (
              <button
                type="submit"
                disabled={bookingloading}
                onClick={handleReservationBooking}
                className="btn flex items-center justify-center text-base family2 text-white py-4 px-8 w-full"
              >
                {bookingloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader type="dots" />
                    Placing Reservation
                  </span>
                ) : (
                  "Place Reservation"
                )}{" "}
              </button>
            ) : (
              <button
                onClick={handleReservationBooking}
                className="btn flex items-center justify-center text-lg text-white py-4 px-8 w-full"
              >
                Sign in to Reserve
              </button>
            )}
          </div>
          <div className="w-[90%] family1 py-2 mx-auto flex flex-col gap-2">
            <div className="w-full flex flex-col gap-2">
              {/* price */}
              <div className="w-full text-lg family2 flex items-center justify-between">
                <span className="text-dark text-base block font-booking_font font-normal">
                  ₦ {room?.price} x {mainDiff} nights
                </span>
                <span>
                  <span className="text-base">₦</span>{" "}
                  {Number(price * mainDiff).toLocaleString()}{" "}
                </span>
              </div>
              {/* taxes */}
              <div className="w-full text-lg family2 flex items-center justify-between">
                <span className="text-dark text-base block font-booking_font font-normal">
                  Caution Fees
                </span>
                <span> ₦ {room?.cautionfee?room?.cautionfee:0}</span>
              </div>
              {/* total */}
              <div className="w-full text-lg family2 flex items-center justify-between">
                <span className="text-dark text-base block font-booking_font font-normal">
                  Total
                </span>
                <span> ₦ {Number(totalPrice).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex items-start flex-col border-t gap-4 rounded-b-xl px-4 py-4 bg-[#fff]">
            <div className="flex items-center gap-3">
              {room?.user?.image ? (
                <img
                  src={room?.user?.image}
                  alt=""
                  className="w-16 h-16 object-cover rounded-full"
                />
              ) : room?.user?.username ? (
                // <div className="w-16 h-16 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
                //   {currentUser?.username[0]}{" "}
                // </div>
                <img
                  src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                  alt=""
                  className="w-16 h-16 object-cover rounded-full"
                />
              ) : (
                <img
                  src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                  alt=""
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
              <span className="text-dark text-lg family2">
                {room?.user?.name}
                <span className="text-[var(--primary)] block font-normal text-base">
                  Verifed Agents
                </span>
              </span>
            </div>
            <span className="text-dark text-sm w-full font-normal">
              {room?.user?.name} is a dedicated real estate agent specializing
              in managing and overseeing properties with a keen eye for detail
              and a commitment for excellence
            </span>
            <div className="flex w-full">
              <div
                style={{
                  transition: "all .3s",
                }}
                className="rounded-full cursor-pointer hover:bg-[#000] hover:text-[#fff] py-3 flex items-center gap-2 border px-6 text-dark font-normal text-base"
              >
                <BiMessage /> Message Agent
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
