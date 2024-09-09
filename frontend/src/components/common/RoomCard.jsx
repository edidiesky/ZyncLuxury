import { useState, useCallback } from "react";
import moment from "moment";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { addDays } from "date-fns";
import { CiCalendar } from "react-icons/ci";
import Heart from "../../assets/svg/heart";
import { TbLocation } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";
import Image from "./Image";
import DeleteModal from "../modals/DeleteModal";

const RoomCard = ({ type, apartment, inView, index, setMousePosition }) => {
  const [tabindex, setTabIndex] = useState(0);
  const [userdeletemodal, setUserDeleteModal] = useState(false);
  const { currentUser } = useSelector((store) => store.auth);
    const today = new Date();
  const handleImagePosition = (position) => {
    if (position === "left") {
      setTabIndex(tabindex < 0 ? apartment?.images?.length - 1 : tabindex - 1);
    }
    if (position === "right") {
      setTabIndex(tabindex >= apartment?.images?.length ? 0 : tabindex + 1);
    }
  };
  const dispatch = useDispatch();

  const handleFavouriteRooms = useCallback(() => {
    // check if the user exists
    // else perform wish lists
    if (!currentUser) {
      dispatch(onLoginModal());
    } else {
      dispatch(addListToWish(apartment?.id));
      // router.refresh();
    }
  }, [currentUser]);
  // DeleteReservation

  const customerData = JSON.parse(localStorage.getItem("customer"));
  const active = customerData?.favourites?.includes(apartment?.id);
  if (type == "trips") {
    const startDate = moment(apartment?.startDate).format("MMMM Do");

    const endDate = moment(apartment?.endDate).format("MMMM Do");
    return (
      <>
        <AnimatePresence>
          {userdeletemodal && (
            <DeleteModal
              type="reservation"
              room={apartment}
              modal={userdeletemodal}
              setModal={setUserDeleteModal}
            />
          )}
        </AnimatePresence>
        <Link
          to={`/reservation/payment/${apartment?.id}`}
          className="w-full flex flex-col"
        >
          <div className="h-[240px] overflow-hidden rounded-xl group w-full relative">
            <Link
              to={"#"}
              style={{ transition: "all .4s" }}
              onClick={() => setUserDeleteModal(true)}
              className="absolute group-hover:scale-100 scale-0 top-5 right-5 rounded-full w-12 h-12 z-[50] bg-white shadow-lg flex
           items-center justify-center text-xl"
            >
              <RxCross1 />
            </Link>
            <img
              alt="Cotion"
              placeholder="blur"
              style={{
                transition:
                  "filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              src={apartment?.rooms?.images[0]}
              className="w-full h-[240px] z-20 absolute object-cover hover:grayscale-[1] grayscale-0"
            />
          </div>
          <div className="w-full flex flex-col py-6 bg-white gap-2">
            <h3 className="text-2xl font-bold">{apartment?.rooms?.subtitle}</h3>

            <div
              style={{ letterSpacing: "1px" }}
              className="flex items-center justify-between gap-2 pb-2 uppercase 
            text-xs font-semibold"
            >
              <span className="flex uppercase items-center">
                <span>{startDate}</span> - <span>{endDate}</span>
              </span>

              <span className="flex text-xs font-normal font-booking_font flex-col">
                <span className="block text-lg md:text-xl font-bold font-booking_font_bold">
                  ₦{apartment?.rooms?.price}
                </span>
              </span>
            </div>
          </div>
        </Link>
      </>
    );
  }

  return (
    <div
      // variants={smallslideup2}
      // initial={"initial"}
      // animate={inView ? "animate" : "exit"}
      className="w-full"
      custom={index}
    >
      <Link to={`/room/${apartment?.id}`} className="w-full flex flex-col">
        <div className="w-full h-[270px] rounded-xl overflow-hidden relative">
          {/* <div className="w-full h-full absolute bg-[rgba(0,0,0,.3)] z-[30]"></div> */}

          <Link
            to={"#"}
            onClick={() => handleFavouriteRooms()}
            className="absolute z-[50] top-[10%] left-[5%]"
          >
            <Heart active={active} />
          </Link>
          <motion.div
            initial="initial"
            whileHover={"hover"}
            className="w-full h-full relative"
          >
            <motion.div
              variants={{
                initial: { opacity: 1 },
                hover: { opacity: 0 },
              }}
              transition={{
                delay: 0.025,
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="w-full h-full relative"
            >
              <Image
                src={apartment?.images[0]}
                className="w-full z-10 h-[100%] relative object-cover"
              />
            </motion.div>
            <motion.div
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{
                delay: 0.035,
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="w-full z-[30] h-full absolute top-0"
            >
              <Image
                src={apartment?.images[1]}
                className="w-full z-10 h-[100%] relative object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full flex flex-col gap-3 rounded-b-xl py-6">
          <h3 className="text-xl md:text-2xl font-bold w-full">
            {apartment?.title}
            {/* <span className="flex text-sm pt-1 items-center gap-2">
              <TiLocation fontSize={"16px"} />
              Houston
            </span> */}
            {/* Amazon */}
          </h3>
          <div className="w-full flex items-center gap-1 justify-between">
            <div className="flex items-center flex-1 justify-center pr-4 border-r text-sm gap-1 text-dark">
              <CiStar /> 5 Rating
            </div>
            <div className="flex items-center flex-1 justify-center pr-4 border-r text-sm gap-1 text-dark">
              <TbLocation /> {apartment?.country}
            </div>
            <div className="flex items-center flex-1 justify-center text-sm gap-1 text-dark">
              <CiCalendar /> today
            </div>
          </div>
          <div className="flex mt-2 justify-between w-full items-center  gap-4">
            <div className="flex flex-col">
              {/* <p className="text-base font-semibold text-grey family1">from</p> */}
              <p className="text-xl md:text-xl font-semibold">
                ₦{apartment?.price}{" "}
                <span className="text-sm font-normal">/night</span>
              </p>
            </div>
            <div className="btn btn_2 px-6 py-3 family1 font-bold text-white text-sm">
              View Room
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
