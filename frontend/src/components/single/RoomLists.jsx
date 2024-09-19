import React, { useCallback, useState } from "react";
import { FaStar } from "react-icons/fa";
import RoomGallery from "./RoomGallery";
import RoomTitleAndDescription from "./RoomTitleAndDescription";
import { useSelector, useDispatch } from "react-redux";
import { FaShower } from "react-icons/fa";
import RoomFeatures from "./RoomFeatures";
import { addDays } from "date-fns";
import RoomPaymentTab from "./RoomPaymentTab";
import { Bed } from "lucide-react";
import { LiaChartAreaSolid } from "react-icons/lia";
import RoomCalendar from "./RoomCalendar";
import moment from "moment";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";
import Heart from "@/assets/svg/heart";
import RoomLocation from "./RoomLocation";
const RoomLists = ({}) => {
  const [datemodal, setDateModal] = useState(false);
  const [guestsmodal, setGuestsModal] = useState(false);
  const [loginmodal, setLoginModal] = useState(false);
  const dispatch = useDispatch();
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    selection: {
      startDate: today,
      endDate: addDays(today, 3),
      key: "selection",
    },
  });
  const handleSelect = (ranges) => {
    // console.log(ranges);
    const selectedStartDate = ranges?.range1?.startDate;
    const selectedendDate = ranges?.range1?.endDate;

    setDateRange({
      ...ranges.range1,
      selection: {
        startDate: selectedStartDate,
        endDate: selectedendDate,
      },
    });
  };

  const differenceinDays = Math.round(
    (moment(dateRange.selection.endDate, "DD/MM") -
      moment(dateRange.selection.startDate, "DD/MM")) /
      (1000 * 3600 * 20)
  );
  const [childrens, setChildrens] = useState(1);
  const [adults, setAdults] = useState(2);

  const { room } = useSelector((store) => store.room);
  const { currentUser } = useSelector((store) => store.auth);
  // handle favourite room
  const handleFavouriteRooms = useCallback(() => {
    // check if the user exists
    // else perform wish lists
    if (!currentUser) {
      dispatch(onLoginModal());
    } else {
      dispatch(addListToWish(room?.id));
      // router.refresh();
    }
  }, [currentUser]);
  const customerData = JSON.parse(localStorage.getItem("customer"));
  const active = customerData?.favourites?.includes(room?.id);

  return (
    <>
      <div className="w-full relative py-2 md:py-12 gap-12 flex flex-col items-center justify-center">
        <div className="w-full md:w-[90%] max-auto max-w-custom mx-auto">
          <RoomGallery room={room} />
        </div>
        <div className="w-[90%] max-auto max-w-custom flex flex-col gap-12">
          <div
            className="w-full z-40 flex flex-col-reverse lg:grid lg:grid-cols-custom items-start justify-center
       gap-20"
          >
            <div className="w-full">
              <div className="flex flex-col gap-12 w-full">
                {/* room title */}
                <div className="w-full flex flex-col gap-4">
                  <div className="flex md:flex-row flex-col lg:items-center justify-between gap-4">
                    <h3 className="text-4xl flex-1 font-bold">
                      {room?.title}

                      <span className="text-sm pt-3 text-dark font-normal family1 flex items-center gap-3">
                        <span>
                          {room?.city}, {room?.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>
                      </span>
                    </h3>
                    <div className="flex lg:items-center md:justify-end gap-4">
                      <div
                        onClick={() => handleFavouriteRooms()}
                        className=" flex text-lg font-semibold cursor-pointer items-center gap-2 text-dark justify-center"
                      >
                        <Heart active={active} />
                        {active ? "Added to Favourites" : " Add to Favourites"}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 border rounded-[10px] md:gap-4">
                    <div className="flex flex-col p-4 pl-4 md:pl-8 border-r min-h-[120px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <span className="text-lg font-semibold">Bedroom</span>
                      <div className="flex items-center gap-4">
                        <span className="text-base">{room?.bedroom} </span>
                        <Bed fontSize={"32px"} />
                      </div>
                    </div>
                    <div className="flex flex-col  p-4 border-r min-h-[120px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <span className="text-lg font-semibold">Bathroom</span>
                      <div className="flex items-center gap-4">
                        <span className="text-base">{room?.bathroom} </span>
                        <FaShower fontSize={"30px"} />
                      </div>
                    </div>
                    <div className="flex flex-col p-4 border-r min-h-[120px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <span className="text-lg font-semibold">Bedroom</span>
                      <div className="flex items-center gap-3">
                        <span className="text-base">1220 sq.ft </span>

                        <LiaChartAreaSolid fontSize={"30px"} />
                      </div>
                    </div>
                    <div className="flex flex-col p-4 border-r min-h-[120px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <span className="text-lg font-semibold">Bedroom</span>
                      <div className="flex items-center gap-3">
                        <span className="text-base">1220 sq.ft </span>

                        <LiaChartAreaSolid fontSize={"30px"} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* room description */}
                <RoomTitleAndDescription room={room} />
                {/* room services */}
                <RoomFeatures />
                <RoomCalendar
                  dateRange={dateRange}
                  handleSelect={handleSelect}
                  differenceinDays={differenceinDays}
                />
              </div>
            </div>
            {/* <div className="w"></div> */}
            <RoomPaymentTab
              setAdults={setAdults}
              datemodal={datemodal}
              setDateModal={setDateModal}
              adults={adults}
              setChildrens={setChildrens}
              childrens={childrens}
              guestsmodal={guestsmodal}
              setGuestsModal={setGuestsModal}
              loginmodal={loginmodal}
              setLoginModal={setLoginModal}
              room={room}
              differenceinDays={differenceinDays}
            />
          </div>
        </div>
        <div className="w-[90%] max-auto max-w-custom flex flex-col gap-12">
          <RoomLocation />
        </div>
      </div>
    </>
  );
};

export default RoomLists;
