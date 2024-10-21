import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { CiCalendar } from "react-icons/ci";
import { TbLocation } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import Image from "../common/Image";
import Heart from "@/assets/svg/heart";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";
import { useSelector, useDispatch } from "react-redux";
const RoomLocation = ({ dateRange, handleSelect, differenceinDays }) => {
  const { room } = useSelector((store) => store.room);
  const { currentUser } = useSelector((store) => store.auth);
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
    const customIconUrl = new Icon({
      iconUrl: "/location.png",
      iconSize: [38, 38],
    });

  return (
    <div className="flex pt-8 md:pt-12 border-t flex-col w-full gap-8">
      <h3 className="text-xl md:text-2xl family2">Where you’ll be</h3>
      <MapContainer
        center={[
          room?.latitude ? room?.latitude : 3.2839374,
          room?.longitude ? room?.longitude : 12.4964,
        ]}
        zoom={5}
        style={{
          height: "600px",
          width: "100%",
          fontFamily: " Kumbh Sans, sans-serif",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={customIconUrl}
          position={[room?.latitude, room?.longitude]}
        >
          <Popup>
            <Link
              to={`/room/${room?.id}`}
              className="w-[250px] flex flex-col rounded-xl overflow-hidden family1"
            >
              <div className={`w-full h-[130px] overflow-hidden relative`}>
                <Link
                  to={"#"}
                  onClick={() => handleFavouriteRooms(room)}
                  className="absolute z-[50] top-[10%] left-[5%]"
                >
                  <Heart />
                </Link>
                <div className="w-full z-[30] h-full">
                  <Image
                    src={room?.images[1]}
                    className="w-full z-10 h-[100%] relative object-cover"
                  />
                </div>
              </div>

              <div className="w-full flex p-2 pb-0 flex-col gap-1 rounded-b-xl">
                <h3 className={`text-sm font-bold w-full`}>{room?.title}</h3>
                <div className="w-full flex items-center text-[10px] gap-1 justify-between">
                  <div className="flex items-center flex-1 justify-center pr-2 border-r gap-1 text-dark">
                    <CiStar /> 5 Rating
                  </div>
                  <div className="flex items-center flex-1 justify-center pr-2 border-r gap-1 text-dark">
                    <TbLocation /> {room?.country}
                  </div>
                  <div className="flex items-center flex-1 justify-center gap-1 text-dark">
                    <CiCalendar /> today
                  </div>
                </div>
                <div className="flex justify-between w-full items-center  gap-4">
                  <div className="flex flex-col">
                    {/* <p className="text-base family2 text-grey family1">from</p> */}
                    <p className={`text-xs family2`}>
                      ₦{room?.price}{" "}
                      <span className="text-[10px] font-normal">/night</span>
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
      </MapContainer>
    </div>
  );
};

export default RoomLocation;
