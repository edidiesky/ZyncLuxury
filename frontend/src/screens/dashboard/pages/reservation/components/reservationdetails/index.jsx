// 
// import Image from "next/image";
import { motion } from 'framer-motion'
import { RxCross1 } from 'react-icons/rx'
import {  useState } from "react";
import { slideSidebarLeft } from "@/constants/utils/framer";
// import JobApplicationForm from "./JobApplicationForm";
const ReservationDetailsSidebar = ({ modal,setModal }) => {
  const data = {
    jobdescription:
      "We're looking for a skilled creative to join our team, focusing on creating top-quality landing pages.",
    jobtitle: "Entry-level Javascript Developer",
    joblocation: "onsite",
    company: "Proxify",
    ApplicationStatus: "PENDING",
    bgColor: "#FFE1CC",
    companyImage: "/images/Zello.png",
  };
  const [tab, setTab] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.6,
        },
      }}
      animate={{ opacity: 1 }}
      className={`w-screen h-[100vh] left-0 fixed z-[600] top-0 bg-[rgba(0,0,0,0.2)]`}
    >
      <motion.div
        variants={slideSidebarLeft}
        initial="initial"
        animate={modal ? "enter" : "exit"}
        exit="exit"
        className={`w-[100%] lg:w-[600px] h-[100vh] flex flex-col gap-8 overflow-auto absolute top-0 bg-white z-30 sidebar_shadow`}
      >
        <div className="w-full px-4 md:px-8 py-2 border-b flex items-center justify-between">
          <div
            onClick={() => setModal(false)}
            className="w-12 h-12 rounded-full z-20 flex items-center hover:shadow-md justify-center bg-white cursor-pointer"
          >
            <RxCross1 />
          </div>
        </div>
        <div className="w-full px-4 md:px-8 flex flex-col gap-8">
          {tab === 0 ? (
            <>
             ""
            </>
          ) : (
            // <JobApplicationForm />
            ""
          )}
        </div>
      </motion.div>
      <div
        style={{
          transition: "all .3s",
        }}
        onClick={() => setModal(false)}
        className={`${
          modal ? "opacity-100 right-[0%]" : "opacity-0 -right-[100%]"
        } w-full top-0 absolute bg-[rgba(0,0,0,.1)] h-full z-10`}
      ></div>
    </motion.div>
  );
};

export default ReservationDetailsSidebar;
