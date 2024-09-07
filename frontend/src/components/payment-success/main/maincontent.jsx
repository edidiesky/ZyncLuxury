"use client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import Confettis from "@/components/common/Confetti";
const MainContent = () => {
  return (
    <>
      <div className="w-full relative overflow-hidden min-h-[100vh] flex flex-col">
        <PaymentMessage />
      </div>
    </>
  );
};

const PaymentMessage = () => {
  const { reservation } = useSelector((store) => store.reservation);
  const { payment, updatedReservation } = useSelector((store) => store.payment);
  const startDate = moment(updatedReservation?.startDate).format(
    "MMM Do YYYY , h:mm a"
  );
  const paymentDate = moment(payment?.createAt).format("MMM Do YYYY , h:mm a");
  const endDate = moment(updatedReservation?.endDate).format(
    "MMM Do YYYY , h:mm a"
  );
  const differenceInDays = moment(updatedReservation?.endDate).diff(
    moment(updatedReservation?.startDate),
    "days"
  );
  // console.log(reservation)
  const [showconfetti, setShowConfetti] = useState(false);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    if (payment) {
      const interval = setTimeout(() => {
        setShowConfetti(true);
      }, 300);
      return () => clearTimeout(interval);
    }
  }, [payment]);
  return (
    <div className="overflow-hidden">
      {showconfetti && <Confettis />}
      <div
        className="w-full relative pt-24 flex items-center justify-center
   gap-8"
      >
        <div
          className="w-[90%] relative mx-auto max-w-custom_1 z-40 grid md:grid-cols-1 items-start justify-center flex-col gap-12"
          ref={printRef}
        >
          <div className="w-full flex flex-col gap-4">
            <div className="py-2 px-8 w-full flex items-center flex-col gap-8 justify-center">
              <div className="w-32 border-8  h-32 rounded-full border-[#0CAC97] flex items-center justify-center">
                <IoMdCheckmark className="text-[60px]" color="#0CAC97" />
              </div>

              <h3 className="text-2xl lg:text-3xl text-center font-booking_font4 font-bold ">
                Your Payment has been confirmed
                <span
                  className="block md:mx-auto pt-4 font-normal md:text-center md:w-[400px] text-base md:text-lg font-booking_font
                 text-grey"
                >
                  Your payment has been carried out successfully!
                </span>
              </h3>
            </div>
            <div className="w-full pb-4 lg:pb-8 border-b flex flex-col gap-3 lg:gap-8">
              <h3 className="text-3xl lg:text-4xl font-booking_font4 font-bold ">
                Order Details
              </h3>
              <div className="w-full grid sm:grid-cols-custom lg:items-center gap-8 lg:gap-20">
                <div className="w-full">
                  <div className="grid lg:grid-cols-2 items-center gap-3 lg:gap-8">
                    <img
                      src={updatedReservation?.rooms?.images[0]}
                      alt=""
                      className="w-[220px] lg:w-[300px] object-cover h-[200px] lg:h-[300px]"
                    />
                    <div className="w-full flex flex-col gap-2 lg:gap-4">
                      <h3 className="text-3xl font-booking_font4 font-bold ">
                        {updatedReservation?.rooms?.title}
                      </h3>
                      <ul className="flex flex-col lg:gap-2">
                        <li className="text-sm sm:text-sm grid grid-cols-2 items-center gap-3 font-booking_font">
                          <span className="font-bold w-[80px] lg:w-[100px] font-booking_font_bold">
                            Check In:
                          </span>
                          <span className="text-start"> {startDate}</span>
                        </li>
                        <li className="text-sm sm:text-sm grid grid-cols-2 items-center gap-3 font-booking_font">
                          <span className="font-bold w-[80px] lg:w-[100px] font-booking_font_bold">
                            Check Out:
                          </span>
                          <span className="text-start">{endDate}</span>
                        </li>
                        <li className="text-sm sm:text-sm grid grid-cols-2 items-center gap-3 font-booking_font">
                          <span className="font-bold w-[80px] lg:w-[100px] font-booking_font_bold">
                            Guests:
                          </span>
                          <span className="text-start">{payment?.guests}</span>
                          {/* 4 */}
                        </li>
                        <li className="text-sm sm:text-sm grid grid-cols-2 items-center gap-3 font-booking_font">
                          <span className="font-bold w-[80px] lg:w-[100px] font-booking_font_bold">
                            Total Days:
                          </span>
                          <span className="text-start">
                            {differenceInDays} Nights
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-[70%] md:w-[400px]">
                  <div className="w-full flex flex-col gap-4">
                    <h3 className="text-3xl font-booking_font4 font-bold ">
                      Reservation Details
                    </h3>
                    <ul className="flex flex-col gap-2">
                      <li className="text-sm sm:text-sm grid grid-cols-2 items-center gap-3 font-booking_font">
                        <span className="font-bold w-[80px] lg:w-[100px] font-booking_font_bold">
                          Order No:
                        </span>
                        {payment?.id}
                      </li>
                      <li className="text-sm sm:text-sm grid grid-cols-2 items-center gap-3 font-booking_font">
                        <span className="font-bold w-[80px] lg:w-[100px] font-booking_font_bold">
                          Order Date:
                        </span>
                        {paymentDate}
                      </li>
                      <li className="text-sm sm:text-sm grid grid-cols-2 items-center gap-3 font-booking_font">
                        <span className="font-bold w-[80px] lg:w-[100px] font-booking_font_bold">
                          Order Id:
                        </span>{" "}
                        {updatedReservation?.id}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-start">
              <h3 className="text-3xl font-booking_font4 font-bold ">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  Amount Paid:{" "}
                  <div className="flex items-center gap-4">
                    <span>₦ {payment?.amount.toLocaleString()}</span>
                    {/* <span>₦{Number(payment?.amount).toLocaleString}</span> */}
                    <div
                      onClick={handlePrint}
                      className="w-12 h-12 hover:bg-[#eee] text-2xl cursor-pointer rounded-full flex items-center justify-center"
                    >
                      <MdOutlinePictureAsPdf />
                    </div>
                  </div>
                </div>

                <span className="block font-booking_font_bold font-normal text-lg">
                  For early check-in or further enquiries, contact us{" "}
                  <span className="text-lg text-[var(--gold-1)] hover:text-[var(--gold-1)] font-booking_font4 font-bold ">
                    +(234) 913 861 1598
                  </span>
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
