import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CreateRoom } from "@/features/room/roomReducer";
export default function FooterHosting({ next, prev, text, active, submit }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth);
  const { listing, creatingRoomisSuccess } = useSelector((store) => store.room);
  // console.log(listing)

  const navigate = useNavigate();
  const handleNextNavigation = () => {
    navigate(`/become-a-host/${next}`);
  };
  const handleCreateListing = () => {
    dispatch(CreateRoom(listing));
  };

  // navigate if the listing has been succesfully created
  useEffect(() => {
    if (creatingRoomisSuccess) {
      setTimeout(() => {
        navigate(`/become-a-host/${currentUser?.id}/reviews`);
      }, 6000);
    }
  }, [creatingRoomisSuccess, navigate]);

  return (
    <>
      <div
        style={{
          backdropFilter: "blur(14px)",
        }}
        className="fixed bottom-0 w-full bg-[#ffffff78] shadow z-[4000] border-t h-[80px] flex items-center"
      >
        <div className="w-[90%] mx-auto flex items-center justify-between">
          {!text && (
            <Link
              to={`/become-a-host/${prev}`}
              className="btn px-4 py-3 text-white text-center min-w-[120px] text-base"
            >
              Back
            </Link>
          )}

          <div className="flex-1 flex items-center justify-end">
            {submit ? (
              <button
                onClick={handleCreateListing}
                className={
                  "btn btn_3 px-4 py-3 text-white text-center min-w-[120px] text-base"
                }
              >
                {text ? text : "Create Listing"}
              </button>
            ) : (
              <button
                onClick={handleNextNavigation}
                disabled={!active}
                className="btn btn_3 px-4 py-3 text-white text-center min-w-[120px] text-base"
              >
                {text ? text : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
