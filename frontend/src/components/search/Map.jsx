import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { TbLocation } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { apartmentDataList } from "@/data/apartmentData";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";
import Image from "../common/Image";
import Heart from "@/assets/svg/heart";

const Map = () => {
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  // const customIcon = Icon({
  //   iconUrl: "",
  //   iconSizre: [40, 40],
  // });

  const handleFavouriteRooms = useCallback(
    (apartment) => {
      // check if the user exists
      // else perform wish lists
      if (!currentUser) {
        dispatch(onLoginModal());
      } else {
        dispatch(addListToWish(apartment?.id));
        // router.refresh();
      }
    },
    [currentUser]
  );

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[3.2839374, 12.4964]} // Default center point
        zoom={3}
        style={{
          height: "100%",
          width: "100%",
          fontFamily: " Kumbh Sans, sans-serif",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {rooms?.map((location, index) => {
          return (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <Link
                  to={`/room/${location?.id}`}
                  className="w-full flex flex-col family1"
                >
                  <div
                    className={`w-full h-[130px] rounded-xl overflow-hidden relative`}
                  >
                    {/* <div className="w-full h-full absolute bg-[rgba(0,0,0,.3)] z-[30]"></div> */}

                    <Link
                      to={"#"}
                      onClick={() => handleFavouriteRooms(location)}
                      className="absolute z-[50] top-[10%] left-[5%]"
                    >
                      <Heart />
                    </Link>
                    <div className="w-full z-[30] h-full">
                      <Image
                        src={location?.images[1]}
                        className="w-full z-10 h-[100%] relative object-cover"
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-3 rounded-b-xl py-1">
                    <h3 className={`text-sm font-bold w-full`}>
                      {location?.title}
                    </h3>
                    <div className="w-full flex items-center text-[10px] gap-1 justify-between">
                      <div className="flex items-center flex-1 justify-center pr-2 border-r gap-1 text-dark">
                        <CiStar /> 5 Rating
                      </div>
                      <div className="flex items-center flex-1 justify-center pr-2 border-r gap-1 text-dark">
                        <TbLocation /> {location?.country}
                      </div>
                      <div className="flex items-center flex-1 justify-center gap-1 text-dark">
                        <CiCalendar /> today
                      </div>
                    </div>
                    <div className="flex justify-between w-full items-center  gap-4">
                      <div className="flex flex-col">
                        {/* <p className="text-base font-semibold text-grey family1">from</p> */}
                        <p className={`text-xs font-semibold`}>
                          ₦{location?.price}{" "}
                          <span className="text-[10px] font-normal">
                            /night
                          </span>
                        </p>
                      </div>
                      <div
                        className={`btn btn_2 px-4 py-1 text-[10px] family1 font-bold text-white `}
                      >
                        View Room
                      </div>
                    </div>
                  </div>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
