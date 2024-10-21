import React from "react";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { apartmentDataList } from "@/data/apartmentData";
import { useDispatch, useSelector } from "react-redux";
const RoomsCreated = () => {
  const { rooms, getallRoomisLoading, page } = useSelector(
    (store) => store.room
  );
  return (
    <div className="px-6 py-8 border rounded-lg flex flex-col w-full gap-6">
      <div className="w-full flex md:flex-row flex-col md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-xl block lg:text-3xl text-dark family2 family2">
            Recent Listings
          </h3>
          <span className="block family1 text-base font-normal">
            Overview of your properties regarding Rentals management
          </span>
        </div>
        <div className="flex-1 flex flex-row gap-4 items-center md:justify-end">
          <form action="" className="max-w-[240px] md:w-[200px] relative">
            <input
              type="text"
              placeholder="Search Listings created"
              className="text-sm font-normal rounded-full w-full "
            />
          </form>
          <div className="flex items-center md:justify-end">
            <button className="shadows py-3 rounded-full cursor-pointer px-6 border text-white bg-[#000] text-sm">
              Add Listings
            </button>
          </div>
        </div>
      </div>
      <Table>
        <div className="TableContainer">
          <table className="tableWrapper">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Room Description</th>
                {/* <th>Location</th> */}
                {/* <th>City</th> */}
                <th>Price</th>
                <th>Date</th>
                <th>Manage</th>
              </tr>
            </thead>

            {rooms?.length === 0 ? (
              ""
            ) : (
              //   <h4 className="w-full p-4 text-center text-lg family2">
              //     You have no Listings
              //   </h4> ""
              <tbody>
                {rooms?.slice(0, 4)?.map((x, index) => {
                  return <TableCard x={x} type={"rooms"} key={x?._id} />;
                })}
              </tbody>
            )}
          </table>
        </div>
      </Table>
    </div>
  );
};

export default RoomsCreated;
