import React from 'react'
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from 'moment';
import { FaCalendarAlt } from "react-icons/fa";
import { BiMinus, BiPlus, BiCheck } from "react-icons/bi";
import RoomModalSelection from './RoomModalSelection';
export default function CreateRoomTab({
  handleRoomId,
  room,
  setDiscountPrice,
  totalPrice,
  totalBookingPrice,
  setGuests,
  guests,
  date,
  status,
  setDate,
  differenceInDays,
  HandleStatus,
  setPartPaymentPrice,
  partpaymentprice,
  totalreservationprice,
  reservation
}) {
  // console.log(room  )
  return (
    <div className="p-4 h-[300px] md:h-[450px] overflow-auto  px-4 md:px-12 grid w-full gap-8 lg:grid-cols-2">
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-base w-full pb-2 border-b font-booking_font_bold font-bold family1">
          Room Terms
        </h3>
        <div className="w-full flex flex-col gap-6">
          <Popover>
            <PopoverTrigger>
              <div className="w-full grid sm:grid-cols-2 gap-4">
                {/* dates */}
                <div className="w-full text-sm font-semibold flex items-start flex-col gap-2">
                  <span> From:</span>
                  <label
                    htmlFor="titleprice"
                    className="text-sm w-full p-3 justify-between cursor-pointer border rounded-lg flex items-center gap-2 font-booking_font"
                  >
                    {moment(date?.from).format("DD MMMM YYYY")}
                    <FaCalendarAlt />
                  </label>
                </div>
                <div className="w-full text-sm font-semibold flex items-start flex-col gap-2">
                  <span> To:</span>
                  <label
                    htmlFor="titleprice"
                    className="text-sm w-full p-3 justify-between cursor-pointer border rounded-lg flex items-center gap-2 font-booking_font"
                  >
                    {moment(date?.to).format("DD MMMM YYYY")}
                    <FaCalendarAlt />
                  </label>
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
          <div className="w-full flex flex-col gap-2">
            <h5 className="text-sm font-booking_font font-bold">Number of Nights:</h5>
            <span className="block font-normal text-sm">
              {differenceInDays} Nights
            </span>
          </div>

          <div className="w-full flex flex-col gap-4 pt-2">
            <h3 className="text-base w-full pb-2 border-b font-booking_font_bold font-bold family1">
              Booking Status
            </h3>
            <div className="w-full grid grid-cols-1">
              <div
                onClick={() => HandleStatus({ stat: "CONFIRMED", tab: 0 })}
                className={`text-sm py-2 cursor-pointer px-4 ${status === "CONFIRMED" ? "bg-[#f5f5f5]" : ""
                  } flex items-center gap-4 font-booking_font`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-dark bg-[#0e7b10] text-[#000] text-end text-sm font-booking_font">
                  {status === "CONFIRMED" && <BiCheck />}
                </div>
                Fully Paid
              </div>
              <div
                onClick={() => HandleStatus({ stat: "PENDING", tab: 1 })}
                className={`text-sm py-2 cursor-pointer px-4 ${status === "PENDING" ? "bg-[#f5f5f5]" : ""
                  } flex items-center gap-4 font-booking_font`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-dark bg-[#f9d955] text-[#000] text-end text-sm font-booking_font">
                  {status === "PENDING" && <BiCheck />}
                </div>
                Pending Payment
              </div>

              <div
                onClick={() => HandleStatus({ stat: "UNAVAILABLE", tab: 1 })}
                className={`text-sm py-2 cursor-pointer px-4 ${status === "UNAVAILABLE" ? "bg-[#f5f5f5]" : ""
                  } flex items-center gap-4 font-booking_font`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-dark bg-[#CECECE] text-[#000] text-end text-sm font-booking_font">
                  {status === "UNAVAILABLE" && <BiCheck />}
                </div>
                Unavailable
              </div>
              {/* #B691C1 */}
              <div
                onClick={() => HandleStatus({ stat: "PARTPAYMENT", tab: 2 })}
                className={`text-sm py-2 cursor-pointer px-4 ${status === "PARTPAYMENT" ? "bg-[#f5f5f5]" : ""
                  } flex items-center gap-4 font-booking_font`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-dark bg-[#B691C1] text-[#000] text-end text-base font-booking_font">
                  {status === "PARTPAYMENT" && <BiCheck />}
                </div>
                Part Payment
              </div>
            </div>
          </div>



        </div>
      </div>
      {/* room price */}
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-3 pt-2">
          <h3 className="text-base w-full pb-2 border-b font-booking_font_bold font-bold family1">
            Rooms
          </h3>
          {
            reservation ? <div className="w-full flex items-center text-base font-semibold">
              {
                reservation?.title
              }
            </div> : <RoomModalSelection handleRoomId={handleRoomId} />
          }

          {/* rooms */}

        </div>
        {/* pricing section of the code */}
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-base w-full pb-2 border-b font-booking_font_bold font-bold family1">
            Room Pricing
          </h3>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid md:grid-cols-2 gap-4">
              <label
                htmlFor="titleprice"
                className="text-sm flex flex-col gap-4 font-booking_font"
              >
                <span className="font-semibold"> Room Price:</span>
                <span className="block text-lg font-booking_font_bold">
                  {" "}
                  {reservation?.roomprice || room?.price ? <>
                    ₦{Number(reservation?.roomprice ? reservation?.roomprice : room?.price).toLocaleString()}
                  </> : <h5 className="text-sm">No Room price selected</h5>}
                </span>
              </label>
              <label
                htmlFor="titleprice"
                className="text-sm flex flex-col gap-4 font-booking_font"
              >
                <span className="font-semibold"> Room Caution Price:</span>
                <span className="block text-lg font-booking_font_bold">
                  {" "}
                  {/* roomcautionprice */}
                  {reservation
                    || room?.cautionfee ? <>
                    ₦{Number(reservation?.roomcautionprice ? reservation?.roomcautionprice : room?.cautionfee).toLocaleString()}
                  </> : <h5 className="text-sm">No Room cautionfee selected</h5>}
                </span>
              </label>

            </div>
            <div className="w-full grid md:grid-cols-2 gap-4">
              <label
                htmlFor="titleprice"
                className="text-sm flex flex-col gap-2 font-booking_font"
              >
                <span className="font-semibold">Discount Amount:</span>
                <input type="number" onChange={(e) => setDiscountPrice(e.target.value)} className="input" placeholder="Input amount" />
              </label>
              <label
                htmlFor="titleprice"
                className="text-sm flex flex-col gap-2 font-booking_font"
              >
                <span className="font-semibold">Part Payment Amount:</span>
                <input type="number" name='partpaymentprice' value={partpaymentprice} onChange={(e) => setPartPaymentPrice(e.target.value)} className="input" placeholder="Input part payment amount" />
              </label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-4">
              <label
                htmlFor="titleprice"
                className="text-sm flex flex-col gap-2 font-booking_font"
              >
                <span className="font-semibold">Final Room Price:</span>
                <div className="p- text-lg flex items-center">
                  {totalPrice ? <>
                    ₦{Number(totalPrice <= 0 ? 0 : totalPrice).toLocaleString()}
                  </> : <span className="text-sm">Room price has not been selected</span>}
                </div>
              </label>
              {/* partpaymentprice */}
              <label
                htmlFor="titleprice"
                className="text-sm flex flex-col gap-2 font-booking_font"
              >
                <span className="font-semibold">Balance Due:</span>
                <div className="p- text-lg flex items-center">
                  {partpaymentprice ? <>
                    ₦{Number(totalBookingPrice - partpaymentprice <= 0 ? 0 : totalBookingPrice - partpaymentprice).toLocaleString()}
                  </> : <span className="text-sm">Room part price has not been selected</span>}
                </div>
              </label>
            </div>

            <div className="text-sm flex flex-col gap-2 font-booking_font">
              <span className="font-semibold"> Booking total Price:</span>
              <div className="p-2 text-dark rounded-[5px] bg-[#f5f5f5] text-end text-lg font-bold">
                {
                  totalBookingPrice ? <>
                    ₦{Number(totalBookingPrice <= 0 ? 0 : totalBookingPrice).toLocaleString()}
                  </> : <h5 className="text-sm">No Room price selected</h5>
                }

              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 pt-2">
          <h3 className="text-base w-full pb-2 border-b font-booking_font_bold font-bold family1">
            Number of Guests
          </h3>
          {/* <span className="block font-bold text-base">5 Guests</span> */}
          <div className="w-full p-2 border rounded-lg flex items-center justify-between">
            <button disabled={guests === 1} onClick={() => setGuests(guests - 1)} className="w-8 h-8 rounded-full text-sm flex items-center justify-center bg-[#eee]">
              <BiMinus />
            </button>
            <span className="flex-1 text-base text-center font-semibold">
              {guests}
            </span>
            <button disabled={guests >= room?.guests} onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[#eee]">
              <BiPlus />
            </button>
          </div>
        </div>
        {/* <div className="w-full flex flex-col gap-4 pt-3">
        <h3 className="text-base font-bold w-full pb-4 border-b family1">
          Client profile
        </h3>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-semibold text-sm"> Guest:</span>
          <UserListSelection handleUserSelection={handleUserSelection} />
        </div>

      </div> */}
      </div>
      {/* client profile */}
    </div>
  )
}
