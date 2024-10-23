import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CreateRoom } from "@/features/room/roomReducer";
export default function FooterHosting({ next, prev, text, active, submit }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.user);
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
        navigate(`/become-a-host/${userInfo?._id}/reviews`);
      }, 6000);
    }
  }, [creatingRoomisSuccess, navigate]);

  return (
    <>
      <div className="hostingbottom">
        <div className="w-85 auto flex item-center justify-space">
          {!text && (
            <Link to={`/become-a-host/${prev}`} className="hostbtn grey fs-18">
              Back
            </Link>
          )}

          <div className="flex-1 flex item-center justify-end">
            {submit ? (
              <button onClick={handleCreateListing} className={"hostbtn fs-18"}>
                {text ? text : "Create Listing"}
              </button>
            ) : (
              <button
                onClick={handleNextNavigation}
                disabled={!active}
                className={"hostbtn fs-18"}
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

const StartingContainer = styled.div``;
