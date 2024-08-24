import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { getAllRooms } from "@/features/room/roomReducer";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../common/RoomCard";

const Listing = () => {
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
      <div className="w-[95%] max-w-custom mx-auto flex flex-col gap-20">
        <div className="grid lg:grid-cols-2 items-start md:items-center w-full">
          <div className="flex flex-col gap-4">
            <h4 className="text-lg md:text-xl text-[var(--primary)]">
              Passionate – Dedicated – Professional
            </h4>
            <h4 className="text-4xl md:text-5xl font-bold text-[var(--dark-1)]">
              Our New Listings
            </h4>
          </div>
          <div className="flex lg:items-center justify-end">
            <button className="btn btn_3 px-8 py-4 text-base md:text-lg family1 text-dark font-normal">
              Browse all Homes
            </button>
          </div>
        </div>
        <div
          ref={collection_ref_1}
          className="w-full gap-4 max-w-custom_1 grid sm:grid-cols-2 lg:grid-cols-3"
        >
          {rooms?.slice(0, 3)?.map((apartment, index) => {
            return (
              <RoomCard
                index={index}
                inView={inView1}
                key={index}
                apartment={apartment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Listing;
