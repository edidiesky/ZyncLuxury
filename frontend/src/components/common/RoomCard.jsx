import { useState, useCallback } from "react";
import moment from "moment";
import { motion, useInView } from "framer-motion";
import { smallslideup2 } from "@/constants/utils/framer";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Heart from "../../assets/svg/heart";
import { FaRegUserCircle } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { DeleteReservation } from "@/features/reservation/reservationReducer";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";
import Image from "./Image";

const RoomCard = ({ type, apartment, inView, index, setMousePosition }) => {
  const [tabindex, setTabIndex] = useState(0);
  const { currentUser } = useSelector((store) => store.auth);
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
      <Link
        to={`/reservation/payment/${apartment?.id}`}
        className="w-full flex flex-col"
      >
        <div className="h-[240px] group w-full relative">
          <Link
            to={"#"}
            style={{ transition: "all .4s" }}
            onClick={() => dispatch(DeleteReservation(apartment?.id))}
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
        <div className="w-full flex flex-col py-3 bg-white gap-2">
          <h4
            style={{ letterSpacing: "3px" }}
            className="text-xs text-grey uppercase font-booking_font_bold font-bold"
          >
            for settling in castle
          </h4>
          <h3 className="text-2xl font-booking_font4 font-normal text-text_dark_1 ">
            {apartment?.rooms?.title}
          </h3>

          <div
            style={{ letterSpacing: "1px" }}
            className="flex items-center justify-between gap-2 pb-2 uppercase border-b border-[rgba(0,0,0,.6)] text-xs font-bold font-booking_font_bold"
          >
            <span className="flex uppercase items-center gap-2">
              Date: <span>{startDate}</span> - <span>{endDate}</span>
            </span>

            <span className="flex text-xs text-grey font-normal font-booking_font flex-col">
              price
              <span className="block text-lg text-stone-950 font-bold font-booking_font_bold">
                ₦{Number(apartment?.rooms?.price).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </Link>
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
      <Link
    
        to={`/room/${apartment?.id}`}
        className="w-full flex flex-col"
      >
        <div className="w-full h-[260px] overflow-hidden relative">
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

        <div className="w-full flex flex-col border rounded-b-xl p-6">
          <h3 className="text-2xl md:text-3xl family2 w-full">
            {apartment?.subtitle}
            {/* Amazon */}
          </h3>
          <div className="flex mt-4 justify-between w-full items-center  gap-4">
            <div className="flex itec flex-col">
              {/* <p className="text-base font-semibold text-grey family1">from</p> */}
              <p className="text-2xl font-bold family1">
                ₦{apartment?.price} <span className="text-sm font-normal">/night</span>
              </p>
            </div>
            <div className="btn btn_2 px-6 py-3 family1 font-bold text-white text-sm">
              Book Now
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
