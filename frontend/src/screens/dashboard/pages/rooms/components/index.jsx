import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import RoomsList from "./rooms";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
import Widget from "../../statistics/components/widget";
import CardLoader from "@/components/common/CardLoader";
import { BookingDataTable } from "@/screens/dashboard/components/table";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const { deleteRoomisSuccess, page, getStatisLoading } = useSelector(
    (store) => store.room
  );
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoomsForAdmin());
  }, [page]);

  const data = [
    {
      id: "m5gr84i9",
      bedroom: 2,
      bathroom: 4,
      images: [
        "https://avada.website/real-estate/wp-content/uploads/sites/176/2023/09/spacious-houston-farm-property.jpg",
        "https://avada.website/real-estate/wp-content/uploads/sites/176/2023/07/06-secondary-bedroom.jpg",
        "https://avada.website/real-estate/wp-content/uploads/sites/176/2023/07/02-main-bedroom.jpg",
        "https://avada.website/real-estate/wp-content/uploads/sites/176/2023/07/03-kitchen-room.jpg",
      ],
      // subtitle: "Garden Villa",
      title: "Modern Expansive Green Oasis",
      description:
        "On a magnificent street in United States, this 1-bedroom APARTMENT feels like a slice of serenity tucked away from the chatter of the city. Enormous arched windows offer spectacular views as well as allow sunlight to stream inside, illuminating the decorator's magnificent décor.  Spend an afternoon meandering the historic streets before stopping for a midday espresso. There are plenty of mouth-watering restaurants around the corner.  ",
      price: "17,000",
      cautionfee: "100,000",
      guests: 4,
      latitude: "38.8920292",
      longitude: "-77.0136483",
      country: "United States",
      city: "Washington",
      state: "District of Columbia",
      type: "STAY",
      listingType: "LEASE",
    },
  ];
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {roommodal && (
          <ReservationRoomsModal modal={roommodal} setModal={setRoomModal} />
        )}
      </AnimatePresence>
      <div className="w-full pb-20 flex flex-col gap-8 lg:gap-16 ">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-8 lg:gap-16 justify-between">
          <div className="w-full flex flex-col gap-1">
            <h3 className="text-2xl block lg:text-4xl text-dark family2">
              Listings Created
            </h3>
            <span className="block family1 text-base lg:text-lg font-normal">
              Overview of your properties regarding your Listings created
            </span>
          </div>

          <div className="flex items-center lg:justify-end gap-2">
            <Link
              to={`/become-a-host/${currentUser?.id}`}
              className="btn text-center md:block hidden text-sm md:text-base family2 text-white px-4 md:px-8 py-3"
            >
              Host your Home
            </Link>
          </div>
        </div>

        <div className="w-full grid items-start gap-12 lg:gap-12 lg:grid-cols-1">
          <div className="w-full">
            {getStatisLoading ? (
              <CardLoader type={"dashboard_overview"} />
            ) : (
              <Widget />
            )}
          </div>

          <BookingDataTable
            title={"Room listings!"}
            data={data}
            description={"Here's a list of your rooms for this month."}
          />
        </div>
        {/* <RoomsList /> */}
      </div>
    </div>
  );
};

export default DashboardIndex;
