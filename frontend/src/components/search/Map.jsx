import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { TbLocation } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";
import Image from "../common/Image";
import Heart from "@/assets/svg/heart";

const Map = () => {
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const customerData = JSON.parse(localStorage.getItem("customer"));
  // 
  const customIconUrl = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38],
  });

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
        zoom={4}
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
          const active = customerData?.favourites?.includes(location?.id);
          return (
            <Marker
              key={index}
              icon={customIconUrl}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <Link
                  to={`/room/${location?.id}`}
                  className="w-[220px] flex flex-col overflow-hidden rounded-md family1"
                >
                  <div className={`w-full h-[130px] overflow-hidden relative`}>
                    {/* <div className="w-full h-full absolute bg-[rgba(0,0,0,.3)] z-[30]"></div> */}

                    <Link
                      to={"#"}
                      onClick={() => handleFavouriteRooms(location)}
                      className="absolute z-[50] top-[10%] left-[5%]"
                    >
                      <Heart active={active} />
                    </Link>
                    <div className="w-full z-[30] h-full">
                      <Image
                        src={location?.images[1]}
                        className="w-full z-10 h-[100%] relative object-cover"
                      />
                    </div>
                  </div>

                  <div className="w-full flex p-2 pb-0 flex-col rounded-b-xl">
                    <h3 className={`text-base family2 w-full`}>
                      {location?.title}
                      <span className="block regular text-xs">{location?.country}</span>
                    </h3>
                    <div className="flex justify-between w-full items-center  gap-4">
                      <div className="flex flex-col">
                        {/* <p className="text-base family2 text-grey family1">from</p> */}
                        <p className={`text-xs family2`}>
                          ₦{location?.price}{" "}
                          <span className="text-[10px] font-normal">
                            /night
                          </span>
                        </p>
                      </div>
                      <div
                        className={`btn px-4 py-1 text-[10px] family1 family2 text-white `}
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
