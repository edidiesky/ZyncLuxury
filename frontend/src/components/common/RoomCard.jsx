import { useState, useCallback, useRef } from "react";
import moment from "moment";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Heart from "../../assets/svg/heart";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";
import Image from "./Image";
import DeleteModal from "../modals/DeleteModal";
import { smallslideup2 } from "@/constants/utils/framer";
import { IoStarHalf, IoStar, IoWifi, IoBedSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaBath } from "react-icons/fa6";
const RoomCard = ({ type, apartment, index }) => {
  // console.log(apartment);
  const [tabindex, setTabIndex] = useState(0);
  const [userdeletemodal, setUserDeleteModal] = useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const refCard = useRef(null);
  const inView = useInView(refCard, {
    margin: "0px 100px -120px 0px",
    once: true,
  });
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
          className="w-full border rounded-xl gap-4 flex flex-col"
        >
          <div className="h-[240px] overflow-hidden rounded-t-xl group w-full relative">
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
          <div className="w-full px-4 py-4 flex flex-col bg-white">
            <h3 className="text-lg md:text-2xl family2">
              {apartment?.rooms?.title}
            </h3>
            <div
              className={`w-full ${
                type === "search" ? "text-xs" : "text-base"
              } flex items-center family1 text-grey gap-1`}
            >
              {" "}
              {apartment?.rooms?.state && (
                <span>{apartment?.rooms?.state},</span>
              )}{" "}
              {apartment?.rooms?.country}
            </div>
            <div
              style={{ letterSpacing: "1px" }}
              className="flex items-center justify-between gap-2 uppercase 
            text-xs regular"
            >
              <span className="flex uppercase items-center">
                <span>{startDate}</span> - <span>{endDate}</span>
              </span>

              <span className="flex text-xs font-normal font-booking_font flex-col">
                <span className="block text-lg md:text-xl family2 font-booking_font_bold">
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
    <motion.div
      variants={smallslideup2}
      initial={"initial"}
      animate={inView ? "animate" : "exit"}
      className="w-full"
      ref={refCard}
      custom={index}
    >
      <Link
        to={`/room/${apartment?.id}`}
        className="w-full rounded-xl border flex flex-col"
      >
        <div
          className={`w-full ${
            type === "search" ? "h-[170px]" : "h-[230px] md:h-[280px]"
          }  rounded-t-xl overflow-hidden relative`}
        >
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

        <div className="w-full flex flex-col">
          <div
            className={`${
              type === "search" ? "py-3 px-4 gap-1" : "p-4 gap-3"
            } w-full flex flex-col `}
          >
            <div className="w-full flex items-center gap-4 justify-between">
              <h3
                className={`${
                  type === "search"
                    ? "md:text-lg text-base"
                    : "md:text-3xl family1 text-2xl"
                }  family2 flex-1`}
              >
                ${apartment?.price}.00
              </h3>
              <span
                className={`${
                  apartment?.listingType === "SALE"
                    ? "bg-[#deddff] text-[#3e3aff]"
                    : apartment?.listingType === "RENT"
                    ? "bg-[#cdeed3] text-[#347345]"
                    : "bg-[#f3f3f1] text-[#a37d18]"
                } ${
                  type === "search"
                    ? "text-xs px-3 py-1 regular"
                    : "text-xs px-3 family2 py-2"
                } gap-2 flex items-center rounded-full `}
              >
                {/* <div className="w-4 h-4 rounded-full border-2 border-[rgba(0,0,0,1)]"></div> */}
                {apartment?.listingType === "SALE"
                  ? "For Sale"
                  : apartment?.listingType === "RENT"
                  ? "For Rent"
                  : "For Lease"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <h3
                className={`${
                  type === "search"
                    ? "md:text-base text-base"
                    : "md:text-2xl text-lg"
                }  flex-1 family2`}
              >
                {apartment?.title}
              </h3>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex items-center gap-1">
                {new Array(4).fill("").map((_, index) => {
                  return (
                    <span
                      key={index}
                      className={`${type === "search" ? "text-sm" : "text-base"}`}
                    >
                      <IoStar />
                    </span>
                  );
                })}
              </div>
              <span
                className={`${
                  type === "search" ? "text-sm" : "text-base"
                } family2`}
              >
                4.7
              </span>
              <span className={`${type === "search" ? "text-sm" : "text-base"} text-[#777]`}>
                87 reviews
              </span>
            </div>
            <div className="w-full flex flex-wrap items-center gap-3">
              <span
                className={`${
                  type === "search" ? "text-sm" : "text-base"
                } flex items-center gap-2 text-[#777]`}
              >
                <FaBath /> {apartment?.bathroom} bathroom
              </span>
               <span
                className={`${
                  type === "search" ? "text-sm" : "text-base"
                } flex items-center gap-2 text-[#777]`}
              >
                <IoWifi /> Wifi
              </span>
              <span
                className={`${
                  type === "search" ? "text-sm" : "text-base"
                } flex items-center gap-2 text-[#777]`}
              >
                <IoBedSharp /> {apartment?.bedroom} bedroom
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RoomCard;

