import { useSelector } from "react-redux";
import RoomCard from "../common/RoomCard";
import CardLoader from "@/components/common/CardLoader";
const Filter = () => {
  const { rooms, getallRoomisLoading, totalRooms } = useSelector(
    (store) => store.room
  );

  return (
    <div className="w-[100%] mx-auto max-w-custom py-20 z-40 relative grid grid-cols-1 items-start">
      <div
        className="w-[90%] max-w-custom mx-auto relative flex px-4 flex-col
       gap-4 lg:gap-12"
      >
        <h4 className="text-2xl md:text-4xl family2">
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
            <div className="gap-x-8 gap-y-16 w-full grid md:grid-cols-3">
              {rooms?.map((apartment, index) => {
                return <RoomCard key={index} apartment={apartment} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
