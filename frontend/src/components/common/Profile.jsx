import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClearUserInfo } from "@/features/auth/authSlice";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Profile = ({ type }) => {
  const [active, setActive] = useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(ClearUserInfo());
    window.location.reload(true);
  };
  return (
    <div className=" relative">
      {currentUser && (
        <div className="flex items-center justify-end gap-8">
          <div
            onClick={() => setActive(!active)}
            className="flex p-2 px-6 border rounded-full items-center gap-2"
          >
            {currentUser?.image ? (
              <img
                onClick={() => setActive(!active)}
                src={currentUser?.image}
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
            )}
            <h4
              style={{
                color: type === "home" ? "#fff" : "#000",
              }}
              className="text-lg lg:flex hidden flex-col family2 font-semibold"
            >
              {currentUser?.name}
              <span className="block text-sm font-semibold text-gray-400">
                {currentUser?.email}
              </span>
            </h4>
            <MdOutlineKeyboardArrowDown className="text-xl" />
          </div>
          <div
            style={{ transition: "all .4s ease" }}
            className={`absolute ${
              active ? "opacity-100 scale-100 visible" : "scale-[0] opacity-0 "
            } py-2 border right-[5%] top-[100%] shadow-lg w-[250px] bg-white rounded-lg`}
          >
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full relative pb-3 border-b px-4 items-center gap-4 cursor-pointer">
                <img
                  src={
                    currentUser?.image
                      ? currentUser?.image
                      : "https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                  }
                  className="w-12 h-12 object-cover rounded-full"
                  alt="Avatar for user"
                />
                <span className="text-base family2">
                  {currentUser?.name}
                  <span className="block font-normal family1 text-xs text-dark">
                    {currentUser?.role === "SELLER"
                      ? "Seller"
                      : currentUser?.role === "ADMIN"
                      ? "Admin"
                      : "Personal"}{" "}
                    Account
                  </span>
                </span>
              </div>
              {currentUser?.role === "SELLER" ||
              currentUser?.role === "ADMIN" ? (
                <div className="flex flex-col gap-3">
                  <div className="w-full family1 flex flex-col pb-3 border-b">
                    <Link
                      to={`/dashboard`}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to={`/dashboard/profile/${currentUser?.id}`}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Profile
                    </Link>
                    <Link
                      to={"/dashboard/rooms"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Listings
                    </Link>
                    <Link
                      to={"/dashboard/orders"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Orders
                    </Link>
                    {currentUser?.role === "ADMIN" && (
                      <Link
                        to={"/dashboard/customers"}
                        className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                      >
                        My Customers
                      </Link>
                    )}
                  </div>
                  <div className="w-full family1 flex flex-col pb-3 border-b">
                    <Link
                      to={"/"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Mode
                    </Link>
                    <Link
                      to={`/dashboard/profile/${currentUser?.id}`}
                      className="text-sm block  font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      Account Settings
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="w-full family1 flex flex-col pb-3 border-b">
                    <Link
                      to={`/savedhomes`}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Favourites
                    </Link>
                    <Link
                      to={`/trips`}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Trips
                    </Link>
                  </div>
                  <div className="w-full family1 flex flex-col pb-3 border-b">
                    <Link
                      to={"/"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Mode
                    </Link>
                    <Link
                      to={`/profile`}
                      className="text-sm block  font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      Account Settings
                    </Link>
                  </div>
                </div>
              )}

              <div
                onClick={handleLogOut}
                className="w-full hover:bg-[#fafafa] cursor-pointer family2 text-center py-2 text-[#d02828ed]"
              >
                Sign Out
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
