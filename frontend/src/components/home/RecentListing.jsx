import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { getAllRooms } from "@/features/room/roomReducer";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../common/RoomCard";
import { apartmentDataList } from "@/data/apartmentData";

import AnimateTextWord from "../common/AnimateTextWord";
import CardLoader from "../common/CardLoader";

const RecentListing = () => {
  const dispatch = useDispatch();
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);
  const collection_ref_1 = useRef(null);
  const inView1 = useInView(collection_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  useEffect(() => {
    dispatch(getAllRooms());
  }, []);
  return (
    <div data-scroll-section className="w-full flex py-32 flex-col">
      <div className="w-[90%] max-w-custom mx-auto flex flex-col gap-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start md:items-center w-full">
          <div className="flex flex-col gap-4">
            <h4 className="text-lg md:text-xl text-[var(--primary)]">
              Passionate – Dedicated – Professional
            </h4>
            <h4 className="text-4xl max-w-[500px] md:text-5xl capitalize family2 text-[var(--dark-1)]">
              <AnimateTextWord type={"bigtext"}>
                Check out our favourite listings
              </AnimateTextWord>
            </h4>
          </div>
          <div className="flex lg:items-center md:justify-end">
            <button className="btn btn_3 px-8 py-4 text-base md:text-lg family1 text-dark font-normal">
              Browse all Homes
            </button>
          </div>
        </div>
        <div
          ref={collection_ref_1}
          className="w-full gap-4 max-w-custom_1 grid sm:grid-cols-2 lg:grid-cols-3"
        >
          {getallRoomisLoading ? (
            <>
              {apartmentDataList?.slice(0, 3).map((_, index) => {
                return <CardLoader key={index} />;
              })}
            </>
          ) : (
            <>
              {rooms?.slice(3, 6)?.map((apartment, index) => {
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

export default RecentListing;
