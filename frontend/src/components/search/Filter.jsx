import { useSelector } from "react-redux";
import RoomCard from "../common/RoomCard";
import Loader from "@/components/home/loader";
import Map from "./Map";
import CardLoader from "@/components/common/CardLoader";
const Filter = () => {
  const { rooms, getallRoomisLoading, totalRooms } = useSelector(
    (store) => store.room
  );

  return (
    <div className="w-[100%] mx-auto max-w-custom py-4 z-40 relative grid grid-cols-2 items-start">
      <div className="w-full py-8 bg-[#fff]">
        <div
          className="w-full relative flex px-4 flex-col
       gap-4"
        >
          <h4 className="text-xl md:text-2xl family2">
            Over {totalRooms} property
          </h4>

          <div className="w-[100%] relative z-40 flex-col gap-12">
            {getallRoomisLoading ? (
              <div className="gap-8 w-full grid md:grid-cols-2">
                {new Array(12)?.fill("")?.map((_, index) => {
                  return <CardLoader key={index} />;
                })}
              </div>
            ) : (
              <div className="gap-x-2 gap-y-8 w-full grid items-start md:grid-cols-2">
                {rooms?.map((apartment, index) => {
                  return (
                    <RoomCard
                      type={"search"}
                      key={index}
                      apartment={apartment}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full relative">
        {getallRoomisLoading ? (
          <Loader type="dots" color={"#000"} size={"60"} />
        ) : (
          <Map />
        )}
      </div>
    </div>
  );
};

export default Filter;
