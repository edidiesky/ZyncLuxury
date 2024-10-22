import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ProfileDropdownStyles } from "../common/navbar";
import { onLoginModal, onRegisterModal } from "@/features/modals/modalSlice";
import { HiBars3BottomRight } from "react-icons/hi2";
import { ClearUserInfo } from "@/features/auth/authSlice";

const Profile = ({ setBar, bar }) => {
  // const [bar, setBar] = React.useState(false);
  const [active, setActive] = useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(ClearUserInfo());
    window.location.reload(true);
  };
  return (
    <div className="wflex-1">
      {currentUser && (
        <div className="flex items-center justify-end gap-8">
          <div className="flex items-center gap-2">
            {currentUser?.image ? (
              <img
                onClick={() => setActive(!active)}
                src={currentUser?.image}
                alt=""
                className="w-14 h-14 object-cover rounded-full"
              />
            ) : (
              <img
                onClick={() => setActive(!active)}
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-14 h-14 object-cover rounded-full"
              />
            )}
          </div>
          <div
            style={{ transition: "all .4s ease" }}
            className={`absolute ${
              active ? "opacity-100 scale-100 visible" : "scale-[0] opacity-0 "
            } py-2 border right-[5%] top-[70%] shadow-lg w-[250px] bg-white rounded-lg`}
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
                      to={"/dashboard/menu"}
                      className="text-sm block font-normal px-4 py-2 hover:bg-[#fafafa] text-[#000]"
                    >
                      My Menus
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
                className="w-full hover:bg-[#fafafa] cursor-pointer family1 text-center py-2 font-semibold text-[#d02828ed]"
              >
                Sign Out
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // <ProfileDropdownStyles className="relative flex items-end justify-end gap-4">
    //   {currentUser ? (
    //     <div className="flex items-center gap-2">
    //       <div className="flex profile_wrapper relative items-center justify-end gap-2">
    //         <div className="profile_dropdown shadow absolute">
    //           <div className="w-full flex flex-col">
    //             <div className="p-4 border-b flex items-center gap-4">
    //               {currentUser?.image ? (
    //                 <img
    //                   src={currentUser?.image}
    //                   onClick={() => setActive(!active)}
    //                   alt=""
    //                   className="w-12 lg:w-12 h-12 lg:h-12 object-cover rounded-full"
    //                 />
    //               ) : (
    //                 <img
    //                   onClick={() => setActive(!active)}
    //                   src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
    //                   alt=""
    //                   className="w-12 lg:w-12 h-12 lg:h-12 object-cover rounded-full"
    //                 />
    //               )}
    //               <h4 className="text-base text-dark family2">
    //                 {currentUser?.name}
    //                 <span className="block font-normal regular text-xs text-dark">
    //                   {currentUser?.role === "SELLER" ? "Seller" : "Personal"}{" "}
    //                   Account
    //                 </span>
    //               </h4>
    //             </div>
    //             {currentUser?.role === "SELLER" ? (
    //               <div className="flex profile_dropdown_bottom regular flex-col w-full">
    //                 <Link
    //                   to={"/dashboard"}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Dashboard
    //                 </Link>
    //                 <Link
    //                   to={"/dashboard/settings"}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Profile
    //                 </Link>
    //                 <div
    //                   onClick={() => handleLogOut()}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Log Out
    //                 </div>
    //               </div>
    //             ) : currentUser?.email ? (
    //               <div className="flex profile_dropdown_bottom regular flex-col w-full">
    //                 <Link
    //                   to={"/trips"}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Orders
    //                 </Link>
    //                 <Link
    //                   to={"/savedhomes"}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Favourites
    //                 </Link>
    //                 <div
    //                   onClick={() => handleLogOut()}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Log Out
    //                 </div>
    //               </div>
    //             ) : (
    //               <div className="flex profile_dropdown_bottom regular flex-col w-full">
    //                 <div
    //                   onClick={() => dispatch(onRegisterModal())}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Sign Up
    //                 </div>
    //                 <div
    //                   onClick={() => dispatch(onLoginModal())}
    //                   className="text-sm block font-normal px-4 py-4 hover:bg-[#fafafa] text-[#000]"
    //                 >
    //                   Sign In
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //         <div className="flex min-w-[60px] cursor-pointer md:min-w-[80px] items-center gap-2">
    //           {currentUser?.image ? (
    //             <img
    //               src={currentUser?.image}
    //               onClick={() => setActive(!active)}
    //               alt=""
    //               className="w-12 lg:w-12 h-12 lg:h-12 object-cover rounded-full"
    //             />
    //           ) : currentUser?.username ? (
    //             // <div className="w-12 h-12 text-white object-cover rounded-full bg-[#000] text-2xl flex items-center justify-center ">
    //             //   {currentUser?.username[0]}{" "}
    //             // </div>
    //             <img
    //               onClick={() => setActive(!active)}
    //               src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
    //               alt=""
    //               className="w-12 lg:w-12 h-12 lg:h-12 object-cover rounded-full"
    //             />
    //           ) : (
    //             <img
    //               onClick={() => setActive(!active)}
    //               src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
    //               alt=""
    //               className="w-12 lg:w-12 h-12 lg:h-12 object-cover rounded-full"
    //             />
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <span className="flex items-center gap-4">
    //       <span
    //         onClick={() => setBar(true)}
    //         className="flex text-4xl cursor-pointer text-[#fff] lg:hidden"
    //       >
    //         <HiBars3BottomRight />
    //       </span>
    //     </span>
    //   )}
    // </ProfileDropdownStyles>
  );
};

export default Profile;
