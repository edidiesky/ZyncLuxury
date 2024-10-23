import LoginModal from "@/components/modals/Login";
import { Outlet, Link } from "react-router-dom";
import RegisterModal from "@/components/modals/Register";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "@/components/common/Profile";
const HostingLayout = () => {
  const { loginmodal, registermodal } = useSelector((store) => store.modal);
  return (
    <>
      <AnimatePresence mode="wait">
        {loginmodal && (
          <LoginModal registermodal={registermodal} modal={loginmodal} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {registermodal && <RegisterModal modal={registermodal} />}
      </AnimatePresence>

      <div className="w-full flex flex-col">
        <div className="w-full sticky top-0 left-0 py-4 border-b bg-white">
          <div
            className="w-[95%] max-w-custom mx-auto z-40 flex items-center justify-between gap-12"
          >
            <Link to={"/"} className="flex items-center gap-2">
              <img
                src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
                alt=""
                className="w-8"
              />
              <span className="text-2xl md:text-2xl family2 text-dark">
                ZyncLuxury
              </span>
            </Link>
            <Profile/>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default HostingLayout;
