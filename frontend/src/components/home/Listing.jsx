import { useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { getAllRooms } from "@/features/room/roomReducer";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../common/RoomCard";
import { apartmentDataList } from "@/data/apartmentData";
import AnimateTextWord from "../common/AnimateTextWord";
import CardLoader from "../common/CardLoader";

const Listing = () => {
  const dispatch = useDispatch();
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);
  return (
    <div data-scroll-section className="w-full flex py-32 flex-col">
      <div className="w-[90%] max-w-custom mx-auto flex flex-col gap-20">
        <div className="grid lg:grid-cols-2 gap-4 items-start lg:items-center w-full">
          <div className="flex flex-col gap-4">
            <h4 className="text-lg md:text-xl text-[var(--primary)]">
              Passionate – Dedicated – Professional
            </h4>
            <h4 className="text-4xl capitalize max-w-[600px] md:text-5xl family2 text-[var(--dark-1)]">
              <AnimateTextWord type={"bigtext"}>
                Holiday accomodations recommendations for you
              </AnimateTextWord>
            </h4>
          </div>
          <div className="flex lg:items-center md:justify-end">
            <button className="btn btn md:px-8 px-4 py-4 text-sm md:text-base family1 text-white font-normal">
              Browse all Homes
            </button>
          </div>
        </div>
        <div className="w-full gap-x-8 gap-y-16 max-w-custom_1 grid sm:grid-cols-2 lg:grid-cols-3">
          {getallRoomisLoading ? (
            <>
              {apartmentDataList?.slice(0, 3).map((_, index) => {
                return <CardLoader key={index} />;
              })}
            </>
          ) : (
            <>
              {rooms?.slice(0, 3)?.map((apartment, index) => {
                return (
                  <RoomCard
                    index={index}
                    type={"Search"}
                    apartment={apartment}
                    // currentUser={currentUser}
                    key={index}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
