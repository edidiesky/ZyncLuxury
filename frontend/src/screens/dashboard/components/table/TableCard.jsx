import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import DeleteModal from "../../../../components/modals/DeleteModal";

const TableCard = ({ tableData, type, handleModal }) => {
  const [userdeletemodal, setUserDeleteModal] = useState(false);

  const handleDeleteClient = () => {
    setUserDeleteModal(true);
  };
  if (type === "orderlist") {
    return (
      <>
        {/* <Delete /> */}
        <tr key={tableData?.id}>
          <td className="tetableDatat-sm family2 text-gray-500">
            <span className="fletableData items-center gap-2">
              Payment Received from{" "}
              <span className="font-booking_font_bold family2 tetableDatat-dark">
                {tableData?.user?.name}
              </span>
            </span>
          </td>
          <td className="tetableDatat-sm font-semibold">
            {tableData?.reservation?.id}
          </td>
          <td className="tetableDatat-sm font-semibold">
            ₦{Number(tableData?.amount).toLocaleString()}
          </td>
          <td className="tetableDatat-sm font-semibold">
            {tableData?.currency}
          </td>
          <td className="tetableDatat-sm font-semibold">
            {renderStatus(tableData?.status)}
          </td>
          <td className="tetableDatat-sm font-semibold">
            {moment(tableData?.createdAt).format("DD MMM YYYY")}
          </td>

          {/* <td>

          </td> */}
        </tr>
      </>
    );
  }
  if (type === "customerlist") {
    return (
      <>
        <AnimatePresence>
          {userdeletemodal && (
            <DeleteModal
              id={tableData?.id}
              modal={userdeletemodal}
              setModal={setUserDeleteModal}
            />
          )}
        </AnimatePresence>
        {/* <Delete /> */}
        <tr key={tableData?.id}>
          <td className="tetableDatat-sm font-semibold">
            <div className="fletableData fletableData-col">
              <span className=" font-normal tetableDatat-dark family2">
                {tableData?.name}
              </span>
              {/* <span className=" font-normal family1 tetableDatat-dark">{tableData?.email}</span> */}
            </div>
          </td>
          <td className="tetableDatat-sm font-semibold">
            <span className=" font-normal family1  tetableDatat-dark">
              {tableData?.email}
            </span>
          </td>
          <td className="tetableDatat-sm font-semibold">
            {tableData?.role === "ADMIN" ? (
              <span className=" font-normal tetableDatat-tableDatas family1 tetableDatat-center success">
                Admin
              </span>
            ) : tableData?.role === "SELLER" ? (
              <span className=" font-normal tetableDatat-tableDatas family1 tetableDatat-center success">
                SELLER
              </span>
            ) : (
              <span className=" font-normal tetableDatat-tableDatas family1 tetableDatat-center danger">
                User
              </span>
            )}
          </td>

          <td className="tetableDatat-sm font-semibold">
            <span className="tetableDatat-dark  font-normal family1 regular">
              {moment(tableData?.createdAt).format("DD MMM YYYY")}
            </span>
          </td>
          <td className="text-sm p-3 border-b font-semibold">
            <div className="flex items-center justify-center">
              <Link
                to={`/dashboard/profile/${tableData?.id}`}
                // to={"#"}
                className="w-12 h-12 rounded-full flex hover:shadow-sm hover:bg-[#ddd] items-center justify-center"
              >
                <MdEdit />
              </Link>
              <div
                onClick={handleDeleteClient}
                className="w-12 h-12 rounded-full flex hover:shadow-sm hover:bg-[#ddd] items-center justify-center"
              >
                <BsTrash />
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }
  if (type === "rooms") {
    const startDate = moment(tableData?.createdAt).format("MMM Do YYYY");
    return (
      <>
        <AnimatePresence>
          {userdeletemodal && (
            <DeleteModal
              type="rooms"
              room={x}
              modal={userdeletemodal}
              setModal={setUserDeleteModal}
            />
          )}
        </AnimatePresence>
        <tr className="family1" key={tableData?.id}>
          <td className="text-sm p-3 border-b font-semibold">
            <div className="flex w-full justify-start items-center gap-3">
              <img
                src={tableData?.images[0]}
                alt=""
                className="w-16 rounded-2xl object-cover"
              />
              {/* <span className="text-base family2 text-dark">
                {tableData?.title}
                <span className="block text-xs regular">
                  {tableData?.city}, {tableData?.country}
                </span>
              </span> */}
            </div>
          </td>
          <td className="text-sm p-3 border-b family2 text-gray-500">
            {tableData?.id}
          </td>
          <td className="text-sm p-3 border-b family2 text-gray-500">
            ₦{tableData?.price}
          </td>
          <td className="text-sm p-3 border-b family2 text-gray-500">
            {tableData?.type}
          </td>
          <td className="text-sm p-3 border-b family2 text-gray-500">
            {startDate}
          </td>

          <td className="text-sm p-3 border-b family2 text-gray-500">
            <div className="flex items-center justify-center">
              <Link
                to={`/dashboard/rooms/${tableData?.id}`}
                className="w-12 h-12 rounded-full flex hover:shadow-sm hover:bg-[#ddd] items-center justify-center"
              >
                <MdEdit />
              </Link>
              <div
                onClick={handleDeleteClient}
                className="w-12 h-12 rounded-full flex hover:shadow-sm 
                hover:bg-[#ddd] items-center justify-center"
              >
                <BsTrash />
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }
  if (type === "Reservation") {
    const startDate = moment(tableData?.startDate).format("DD MMM YYYY");
    const endDate = moment(tableData?.endDate).format("DD MMM YYYY");
    return (
      <>
        <tr key={tableData?.id} className="px-4">
          <td className="text-sm p-3 border-b family2 text-gray-500">
            <div className="flex items-center font-normal gap-3">
              <img
                src={tableData?.rooms?.images[0]}
                alt=""
                className="w-16 object-cover"
              />
              <span className="hidden text-base family2 lg:block">
                {" "}
                {tableData?.rooms?.title}
                <span className="block regular text-sm">
                  {" "}
                  {tableData?.rooms?.country}
                </span>
              </span>
            </div>
          </td>

          <td className="hidden lg:table-cell text-sm family2 text-gray-500">
            <div className="flex items-center font-normal gap-3">
              {tableData?.user?.image ? (
                <div className="flex items-center gap-3">
                  <img
                    src={tableData?.user?.image}
                    alt=""
                    className="w-14 h-14 rounded-full"
                  />
                  <span>
                    {tableData?.user?.name}

                    <span className="block text-sm text-grey">
                      {" "}
                      @{tableData?.user?.username}
                    </span>
                  </span>
                </div>
              ) : (
                <div className="flex w-full items-center gap-3">
                  <span>
                    {tableData?.user?.name}

                    <span className="block text-sm text-grey">
                      {" "}
                      @{tableData?.user?.username}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </td>
          <td className="text-sm p-3 border-b family2 text-gray-500">
            <span>
              {" "}
              {startDate} - {endDate}
            </span>
          </td>
          <td className="text-sm p-3 border-b family2 text-gray-500">
            <span>₦{Number(tableData?.totalPrice).toLocaleString()}</span>
          </td>
          <td className="text-sm p-3 border-b family2 text-gray-500">
            {renderStatus(tableData?.status)}
          </td>

          <td className="text-sm p-3 border-b family2 text-gray-500">
            <div className="flex items-center justify-center">
              <div
                onClick={handleModal}
                className="w-12 h-12 rounded-full flex hover:shadow-sm hover:bg-[#ddd] items-center justify-center"
              >
                <MdEdit />
              </div>
              <div
                onClick={handleDeleteClient}
                className="w-12 h-12 rounded-full flex hover:shadow-sm 
                hover:bg-[#ddd] items-center justify-center"
              >
                <BsTrash />
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }

  return null;
};

export default TableCard;
