import React, { useState, useCallback, useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import { motion } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../home/loader";
import { DeleteSingleUser } from "@/features/auth/authReducer";
import { handleClearUserAlert } from "@/features/auth/authSlice";
import { handleClearRoomAlert } from "@/features/room/roomSlice";
import { DeleteRoom } from "@/features/room/roomReducer";
import { DeleteReservation } from "@/features/reservation/reservationReducer";
import { handleClearReservationAlert } from "@/features/reservation/reservationSlice";
import { slide } from "@/constants/utils/framer";
export default function DeleteModal({
  type,
  modal,
  reservation,
  setModal,
  room,
  id,
}) {
  const { deleteRoomisLoading, deleteRoomisSuccess } = useSelector(
    (store) => store.room
  );
  const { deleteReservationisLoading, deleteReservationisSuccess } =
    useSelector((store) => store.reservation);
  const { deleteUserisLoading, deleteUserisSuccess } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const handleClearAlert = () => {
    setModal(false);
  };
  const handleDeleteRoom = useCallback(() => {
    dispatch(DeleteRoom(room?.id));
  }, []);
  // onClick={() => dispatch(DeleteReservation(reservation?.id))}
  const handleDeleteReservation = useCallback(() => {
    dispatch(DeleteReservation(room?.id));
  }, []);

  const handleDeleteUser = useCallback(() => {
    // console.log(id)
    dispatch(DeleteSingleUser(id));
  }, []);

  useEffect(() => {
    dispatch(handleClearRoomAlert());
    dispatch(handleClearUserAlert());
    if (
      deleteRoomisSuccess ||
      deleteUserisSuccess ||
      deleteReservationisSuccess
    ) {
      setModal(false);
      dispatch(handleClearRoomAlert());
      dispatch(handleClearUserAlert());
      dispatch(handleClearReservationAlert());
    }
  }, [
    setModal,
    deleteRoomisSuccess,
    deleteUserisSuccess,
    deleteReservationisSuccess,
  ]);

  if (type === "reservation") {
    return (
      <DeleteContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 1,
          },
        }}
        animate={{ opacity: 1 }}
        className="z-[400000]"
      >
        <motion.div
          initial="initial"
          variants={slide}
          exit={"exit"}
          animate={modal ? "enter" : "exit"}
          className={"deleteCard z-[400000] relative gap-2"}
        >
          <div className="cross" onClick={handleClearAlert}>
            <RxCross2 />
          </div>
          <div className="deleteCardTop p-8 px-4 flex items-center justify-center flex-col gap-2">
            <span className="w-full flex items-center justify-center">
              <CiWarning fontSize={"50px"} color={"var(--red)"} />
            </span>
            <h3 className="text-lg md:text-2xl text-center family2">
              Delete this Reservation?
              <span className="block text-sm lg:text-base w-[80%] mx-auto text-center  regular  text-dark">
                By deleting this reservation,It cannot be retrieved back if this
                action you carry has been taken.
              </span>
            </h3>
          </div>

          <div className="deleteCardBottom py-3 w-full flex items-center justify-end px-4 border-t">
            <button
              className="regular flex items-center justify-center text-sm"
              onClick={handleClearAlert}
            >
              Cancel
            </button>
            <button
              disabled={deleteReservationisLoading}
              onClick={handleDeleteReservation}
              className="deleteBtn regular flex items-center justify-center text-sm"
              // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
            >
              {deleteReservationisLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader type="dots" />
                  Deleting in progress
                </span>
              ) : (
                " Delete"
              )}
            </button>
          </div>
        </motion.div>
      </DeleteContainer>
    );
  }
  if (type === "rooms") {
    return (
      <DeleteContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 1,
          },
        }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          initial="initial"
          variants={slide}
          animate={modal ? "enter" : "exit"}
          exit={"exit"}
          className={"deleteCard gap-2"}
        >
          <div className="cross" onClick={handleClearAlert}>
            <RxCross2 />
          </div>
          <div className="deleteCardTop p-6 px-4 flex items-center justify-center flex-col gap-2">
            <span className="w-full flex items-center justify-center">
              <CiWarning fontSize={"50px"} color={"var(--red)"} />
            </span>
            <h3 className="text-lg md:text-2xl text-center family2">
              Delete this room?
              <span className="block  regular  text-sm lg:text-base w-[80%] mx-auto regular text-center text-dark">
                By deleting this product, It cannot be retrieved if this action
                you carry has been taken.
              </span>
            </h3>
          </div>

          <div className="deleteCardBottom py-3 w-full flex items-center justify-end px-4 border-t">
            <button
              className="regular flex items-center justify-center text-sm"
              onClick={handleClearAlert}
            >
              Cancel
            </button>
            <button
              disabled={deleteRoomisLoading}
              onClick={handleDeleteRoom}
              className="deleteBtn regular flex items-center justify-center text-sm"
              // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
            >
              {deleteRoomisLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader type="dots" />
                  Confirming in progress
                </span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </motion.div>
      </DeleteContainer>
    );
  }
  return (
    <DeleteContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial="initial"
        variants={slide}
        animate={modal ? "enter" : "exit"}
        exit={"exit"}
        className={"deleteCard gap-2"}
      >
        <div className="cross" onClick={handleClearAlert}>
          <RxCross2 />
        </div>
        <div className="deleteCardTop p-8 px-4 flex items-center justify-center flex-col gap-2">
          <span className="w-full flex items-center justify-center">
            <CiWarning fontSize={"50px"} color={"var(--red)"} />
          </span>
          <h3 className="text-lg md:text-2xl text-center family2">
            Delete this user?
            <span className="block text-sm lg:text-base w-[80%] regular mx-auto text-center  regular  text-dark">
              By deleting this user, It cannot be retrieved if this action you
              carry has been taken.
            </span>
          </h3>
        </div>

        <div className="deleteCardBottom py-3 w-full flex md:flex-row flex-col gap-2 items-center md:justify-end px-4 border-t">
          <button
            className="regular flex items-center justify-center text-sm"
            onClick={handleClearAlert}
          >
            Cancel
          </button>
          <button
            disabled={deleteUserisLoading}
            onClick={handleDeleteUser}
            className="deleteBtn regular flex items-center justify-center text-sm"
            // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
          >
            {deleteUserisLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader type="dots" />
                Confirming in progress
              </span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </motion.div>
    </DeleteContainer>
  );
}

const DeleteContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  z-index: 490000000;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  .deleteCard {
    max-width: 505px;
    min-width: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 480px) {
      max-width: 95%;
      min-width: 95%;
    }
    .cross {
      position: absolute;
      right: 15px;
      top: 4%;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
      svg {
        font-size: 20px;
      }
    }
    .deleteCardBottom {
      display: flex;
      gap: 1rem;
      button {
        padding: 0.5rem 1rem;
        min-height: 40px;
        border: none;
        background: #eee;
        color: #000;
        outline: none;
        border-radius: 40px;
        cursor: pointer;
        text-transform: none;
        &:hover {
          background: #c4c4c4;
        }
        &.deleteBtn {
          background: var(--red);
          color: #fff;
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
    .deleteCardCenter {
      padding: 2rem 0;
      width: 100%;
      background: var(--grey-3);
      border-left: 5px solid var(--red);
      display: flex;
      align-items: center;
      svg {
        font-size: 2rem;
        color: var(--red);
      }
    }

    .deleteCardTop {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
`;
