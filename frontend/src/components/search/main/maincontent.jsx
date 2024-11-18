
import { useSelector } from "react-redux";
import RoomCard from "../../common/RoomCard";
import Loader from "@/components/home/loader";
import Map from "../Map";
import CardLoader from "@/components/common/CardLoader";
const MainContent = () => {
  return (
    <div className="w-full relative flex flex-col gap-8">
      <RoomLists />
    </div>
  );
};

const RoomLists = () => {
  const { rooms, getallRoomisLoading, totalRooms } = useSelector(
    (store) => store.room
  );

  return (
    <div
      className="w-[100%] mx-auto max-w-custom  z-40 relative grid grid-cols-1 items-start"
    >
    
      <div className="w-full py-8 bg-[#fff]">
        <div
          className="w-full relative flex px-4 flex-col
       gap-4"
        >
          <h4 className="text-xl md:text-2xl family2">
            Over {totalRooms} property
          </h4>

          <div
            className="w-[100%] relative z-40 items-start lg:justify-center flex-col gap-12"
          >
            {getallRoomisLoading ? (
              <div className=" gap-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
                {new Array(12)?.fill("")?.map((_, index) => {
                  return <CardLoader key={index} />;
                })}
              </div>
            ) : (
              <div className=" gap-x-2 gap-y-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
                {rooms?.slice(0, 12).map((apartment, index) => {
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
    </div>
  );
};

export default MainContent;
