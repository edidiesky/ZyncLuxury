"use client";
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
          <td>
            <span className="flex items-center gap-2">
              Payment Received from{" "}
              <span className="font-booking_font_bold font-bold text-dark">
                {x?.user?.name}
              </span>
            </span>
          </td>
          <td>{x?.reservation?.id}</td>
          <td>₦{Number(x?.amount).toLocaleString()}</td>
          <td>{x?.currency}</td>
          <td>
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
          <td>{moment(x?.createdAt).format("DD MMMM YYYY")}</td>

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
        <tr key={x?._id}>
          <td>
            <div className="flex flex-col">
              <span className=" font-normal text-dark text-bold">
                {x?.name}
              </span>
              {/* <span className=" font-normal family1 text-dark">{x?.email}</span> */}
            </div>
          </td>
          <td>
            <span className=" font-normal family1  text-dark">{x?.email}</span>
          </td>
          <td>
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

          <td>
            <span className="text-dark  font-normal family1 text-light">
              {moment(x?.createdAt).format("DD MMM YYYY")}
            </span>
          </td>
          <td>
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
        <tr key={x?._id}>
          <td>
            <div className="flex w-full justify-start items-center gap-4">
              <img src={x?.images[0]} alt="" className="w-24 object-cover" />
              <span className="text-base font-normal family1 text-dark">
                {x?.title}
                <span className="block text-sm">
                  {x?.city}, {x?.country}
                </span>
              </span>
            </div>
          </td>
          {/* <td className=" font-normal">{x?.address}</td> */}

          {/* <td className=" font-normal"></td> */}
          <td className=" font-normal">₦{x?.price}</td>

          <td className=" font-normal">{startDate}</td>

          <td className=" font-normal">
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
          <td>
            <div className="flex items-center font-normal gap-3">
              <img
                src={x?.rooms?.images[0]}
                alt=""
                className="w-20 h-20 object-cover"
              />
              <span className="hidden lg:block">
                {" "}
                {x?.rooms?.title}
                <span className="block text-sm"> {x?.rooms?.location}</span>
              </span>
            </div>
          </td>

          <td className="hidden lg:table-cell">
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
          <td className=" font-normal">
            <span>
              {" "}
              {startDate} - {endDate}
            </span>
          </td>
          <td className=" font-normal">
            <span>₦{Number(x?.totalPrice).toLocaleString()}</span>
          </td>
          <td>
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

          <td className=" font-normal">
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
      <tr key={x?._id}>
        <td>
          <span className=" font-normal family1 text-dark">{x?.plan}</span>
        </td>
        <td>
          <span className="text-dark  font-normal family1">$ {x?.price}</span>
        </td>

        <td>
          <span className="text-dark  font-normal family1 text-light">
            Type 1
          </span>
        </td>
        <td>
          <span className="text-dark  font-normal family1 text-light">
            {x?.date}
          </span>
        </td>
      </tr>
    </>
  );
};

export default TableCard;
