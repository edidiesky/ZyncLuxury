 
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import DeleteModal from "../modals/DeleteModal";

const TableCard = ({ x, type, handleModal }) => {
  const [userdeletemodal, setUserDeleteModal] = useState(false);

  const handleDeleteClient = () => {
    setUserDeleteModal(true);
  };
  if (type === "orderlist") {
    return (
      <>
        {/* <Delete /> */}
        <tr key={x?.id}>
          <td className='text-sm font-semibold'>
            <span className="flex items-center gap-2">
              Payment Received from{" "}
              <span className="font-booking_font_bold family2 text-dark">
                {x?.user?.name}
              </span>
            </span>
          </td>
          <td className='text-sm font-semibold'>{x?.reservation?.id}</td>
          <td className='text-sm font-semibold'>₦{Number(x?.amount).toLocaleString()}</td>
          <td className='text-sm font-semibold'>{x?.currency}</td>
          <td className='text-sm font-semibold'>
            {/* <span className="p-4">
              {x?.status}
            </span> */}

            {x?.status === "CONFIRMED" ? (
              <span className=" font-normal text-sm font-booking_font_bold text-center success">
                {x?.status}
              </span>
            ) : (
              <span className=" font-normal text-sm font-booking_font_bold text-center danger">
                {x?.status}
              </span>
            )}
          </td>
          <td className='text-sm font-semibold'>{moment(x?.createdAt).format("DD MMMM YYYY")}</td>

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
              id={x?.id}
              modal={userdeletemodal}
              setModal={setUserDeleteModal}
            />
          )}
        </AnimatePresence>
        {/* <Delete /> */}
        <tr key={x?.id}>
          <td className='text-sm font-semibold'>
            <div className="flex flex-col">
              <span className=" font-normal text-dark family2">
                {x?.name}
              </span>
              {/* <span className=" font-normal family1 text-dark">{x?.email}</span> */}
            </div>
          </td>
          <td className='text-sm font-semibold'>
            <span className=" font-normal family1  text-dark">{x?.email}</span>
          </td>
          <td className='text-sm font-semibold'>
            {x?.role === "ADMIN" ? (
              <span className=" font-normal text-xs family1 text-center success">
                Admin
              </span>
            ) : x?.role === "SELLER" ? (
              <span className=" font-normal text-xs family1 text-center success">
                SELLER
              </span>
            ) : (
              <span className=" font-normal text-xs family1 text-center danger">
                User
              </span>
            )}
          </td>

          <td className='text-sm font-semibold'>
            <span className="text-dark  font-normal family1 regular">
              {moment(x?.createdAt).format("DD MMM YYYY")}
            </span>
          </td>
          <td className='text-sm font-semibold'>
            <div className="flex items-center justify-center">
              <Link
                to={`/dashboard/profile/${x?.id}`}
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
    const startDate = moment(x?.createdAt).format("MMMM Do YYYY");
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
        <tr className="family1" key={x?.id}>
          <td className="text-sm font-semibold">
            <div className="flex w-full justify-start items-center gap-4">
              <img src={x?.images[0]} alt="" className="w-16 object-cover" />
              <span className="text-base family2 text-dark">
                {x?.title}
                <span className="block text-xs regular">
                  {x?.city}, {x?.country}
                </span>
              </span>
            </div>
          </td>
          <td className="text-sm font-semibold">₦{x?.price}</td>

          <td className="text-sm font-semibold">{startDate}</td>

          <td className="text-sm font-semibold">
            <div className="flex items-center justify-center">
              <Link
                to={`/dashboard/rooms/${x?.id}`}
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
    const startDate = moment(x?.startDate).format("DD MMM YYYY");
    const endDate = moment(x?.endDate).format("DD MMM YYYY");
    return (
      <>
        <tr key={x?.id} className="px-4">
          <td className="text-sm font-semibold">
            <div className="flex items-center font-normal gap-3">
              <img
                src={x?.rooms?.images[0]}
                alt=""
                className="w-16 object-cover"
              />
              <span className="hidden text-base family2 lg:block">
                {" "}
                {x?.rooms?.title}
                <span className="block regular text-sm"> {x?.rooms?.country}</span>
              </span>
            </div>
          </td>

          <td className="hidden lg:table-cell text-sm font-semibold">
            <div className="flex items-center font-normal gap-3">
              {x?.user?.image ? (
                <div className="flex items-center gap-3">
                  <img
                    src={x?.user?.image}
                    alt=""
                    className="w-14 h-14 rounded-full"
                  />
                  <span>
                    {x?.user?.name}

                    <span className="block text-sm text-grey">
                      {" "}
                      @{x?.user?.username}
                    </span>
                  </span>
                </div>
              ) : (
                <div className="flex w-full items-center gap-4">
                  <span>
                    {x?.user?.name}

                    <span className="block text-sm text-grey">
                      {" "}
                      @{x?.user?.username}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </td>
          <td className="text-sm font-semibold">
            <span>
              {" "}
              {startDate} - {endDate}
            </span>
          </td>
          <td className="text-sm font-semibold">
            <span>₦{Number(x?.totalPrice).toLocaleString()}</span>
          </td>
          <td className="text-sm font-semibold">
            {/* <span className="p-4">
              {x?.status}
            </span> */}

            {x?.status === "CONFIRMED" ? (
              <span className=" font-normal text-xs font-booking_font_bold text-center success">
                {x?.status}
              </span>
            ) : (
              <span className=" font-normal text-xs font-booking_font_bold text-center danger">
                {x?.status}
              </span>
            )}
          </td>

          <td className="text-sm font-semibold">
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

  return (
    <>
      {/* <Delete /> */}
      <tr key={x?.id}>
        <td className='text-sm font-semibold'>
          <span className=" font-normal family1 text-dark">{x?.plan}</span>
        </td>
        <td className='text-sm font-semibold'>
          <span className="text-dark  font-normal family1">$ {x?.price}</span>
        </td>

        <td className='text-sm font-semibold'>
          <span className="text-dark  font-normal family1 regular">
            Type 1
          </span>
        </td>
        <td className='text-sm font-semibold'>
          <span className="text-dark  font-normal family1 regular">
            {x?.date}
          </span>
        </td>
      </tr>
    </>
  );
};

export default TableCard;
