import React, { useEffect, useRef } from "react";

import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../../common/RoomCard";
import { getAllRooms } from "../../../features/room/roomReducer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { slideup, clipPathLeft, smallslideup2 } from "@/constants/utils/framer";
import AnimateText from "@/animations/AnimateText";
import { Link } from "react-router-dom";
import Hero from "../hero";
import Listing from "../Listing";
import About from "../About";
import RecentListing from "../RecentListing";
import Expert from "../Expert";
import Choice from "../Choice";
const MainContent = () => {
  return (
    <div
      data-scroll-section
      className="w-full overflow-hidden flex flex-col"
    >
      <Hero />
      <Listing />
      <About />
      <RecentListing />
      <Expert/>
      <Choice/>
    
    </div>
  );
};



const RoomFlex = () => {
  const RoomFlex_text_ref_1 = useRef(null);
  const RoomFlex_text_ref_2 = useRef(null);
  const RoomFlex_text_ref_4 = useRef(null);
  const RoomFlex_text_ref_5 = useRef(null);
  const image_ref_1 = useRef(null);
  const inView1 = useInView(RoomFlex_text_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  const inView7 = useInView(image_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  const inView5 = useInView(RoomFlex_text_ref_5, {
    margin: "0px 100px -120px 0px",
  });
  const inView2 = useInView(RoomFlex_text_ref_2, {
    margin: "0px 100px -120px 0px",
  });

  const RoomFlex_text_1 = [`Enjoy`, `A`, `Luxury`, `Experience`];
  const RoomFlex_text_2 = [
    ` Discover a unique blend of comfort, `,
    `style, and convenience at our Apartments`,
    `Whether you're traveling for leisure, business, or a special occasion, `,
    ` Our space offers everything you need for an unforgettable stay.`,
  ];

  const RoomFlex_text_3 = ["The Art of Living"];
  const RoomFlex_text_4 = [
    `Our rooms are designed to be your home away from home. `,
    `Make every moment a peaceful retreat from the outside world.`,
    `Situated in the city of excellence, the highlights of Lagos are just a step away.`,
    `Take advantage of our fully equipped apartments to binge your favorite shows.`,
  ];
  const RoomFlex_text_5 = [
    `Enjoy access to a fully equipped kitchen, high-speed Wi-Fi, and a cozy living area perfect for relaxing`,
    `We promise a getaway you won't soon forget.`,
  ];

  return (
    <div data-scroll-section className="w-full flex py-32 flex-col gap-40">
      <div className="w-[90%] mx-auto gap-24 md:gap-24 md:items-center max-w-custom_1 flex md:justify-center">
        <h1
          ref={RoomFlex_text_ref_1}
          className="text-dark md:text-center leading-[1.6] text-5xl md:text-7xl font-booking_font4 font-bold"
        >
          <span
            style={{ letterSpacing: "4px" }}
            className="text-xs pb-12 font-semibold uppercase block font-booking_font"
          >
            Luxury Home & Best Resort
          </span>
          <span className=" md:w-[550px] mx-auto leading-[1.2] gap-x-[5px] flex md:items-center md:justify-center flex-wrap ">
            {RoomFlex_text_1.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    animate={inView1 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
          <span
            className="text-sm md:text-base w-full md:w-[650px] md:mx-auto font-normal pt-6
             flex md:items-center md:justify-center gap-x-[4px] leading-[1.5] flex-wrap  font-booking_font"
          >
            {RoomFlex_text_2.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    key={index}
                    animate={inView1 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </h1>
      </div>
      <div className="w-[90%] mx-auto gap-24 md:gap-24 py-12 md:items-center max-w-custom_1 grid lg:grid-cols-custom_4">
        <div
          ref={image_ref_1}
          className="w-full lg:w-[450px] h-[350px] md:h-[550px] relative"
        >
          <motion.img
            variants={clipPathLeft}
            initial="initial"
            animate={inView7 ? "animate" : "exit"}
            src="/images/pearl_1.jpeg"
            alt=""
            className="w-full absolute h-full object-cover"
          ></motion.img>
          <div className="absolute -bottom-[6%] bg-[var(--gold-1)] -left-[1%] lg:-left-[10%] min-h-[190px] w-[180px] flex items-center justify-center">
            <div className="text-5xl text-center flex flex-col gap-1 uppercase text-white font-booking_font4 font-bold">
              + 8
              <br />{" "}
              <span
                style={{ letterSpacing: "3px" }}
                className="text-xs font-booking_font uppercase"
              >
                Big Rooms
              </span>
            </div>
          </div>
        </div>
        <div ref={RoomFlex_text_ref_2} className="w-full flex flex-col gap-8">
          <span
            style={{ letterSpacing: "3px" }}
            className="text-xs font-booking_font uppercase"
          >
            enjoy your life
          </span>
          <h2 className="text-5xl md:text-7xl leading-[1.1] font-booking_font4 font-bold gap-x-[5px] flex flex-wrap ">
            {RoomFlex_text_3.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    animate={inView2 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </h2>
          <span
            className="text-sm md:text-base w-full md:w-[650px] font-normal
             flex gap-x-[4px] leading-[1.5] flex-wrap  font-booking_font"
          >
            {RoomFlex_text_4.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    key={index}
                    animate={inView2 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
          <span
            ref={RoomFlex_text_ref_5}
            className="text-sm md:text-base w-full font-normal
             flex gap-x-[4px] leading-[1.5] flex-wrap  font-booking_font"
          >
            {RoomFlex_text_5.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    key={index}
                    animate={inView5 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

const Collections = () => {
  const dispatch = useDispatch();
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);
  const collection_ref_1 = useRef(null);
  const collection_ref_2 = useRef(null);
  const text_ref_4 = useRef(null);
  const text_ref_5 = useRef(null);
  const image_ref_1 = useRef(null);
  const container_ref_1 = useRef(null);
  const inView1 = useInView(collection_ref_1, {
    margin: "0px 100px -120px 0px",
  });

  const inView5 = useInView(text_ref_4, {
    margin: "0px 100px -120px 0px",
  });
  const inView6 = useInView(text_ref_5, {
    margin: "0px 100px -120px 0px",
  });
  const inView8 = useInView(container_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  const inView7 = useInView(image_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  const inView2 = useInView(collection_ref_2, {
    margin: "0px 100px -120px 0px",
  });

  const text_1 = [`Come Stay`, `With Us`];
  const text_4 = [
    `At Zyra&Stones Living, we prioritize your comfort and satisfaction. `,
    `our commitment to cleanliness, attention to detail, and personalized `,
    ` service ensures a stay that's as enjoyable as it is memorable.`,
  ];

  const text_5 = [
    `At Zyra&Stones Living, we prioritize your comfort and satisfaction. `,
    `our commitment to cleanliness, attention to detail, and personalized `,
    ` service ensures a stay that's as enjoyable as it is memorable.`,
  ];

  const servicesData = [
    {
      title: "  Online Reservation",
      image: "/images/hazel_1.jpeg",
      desc: "  Book your stay in minutes, Experience convenience at your fingertips with our seamless online reservation system.",
    },
    {
      title: " Smooth Check-in",
      image: "/images/hazel_2.jpeg",
      desc: "  Get immediate confirmation of your booking, and enjoy a seamless process through to check-in.  ",
    },
  ];
  return (
    <div data-scroll-section className="w-full flex flex-col gap-32 md:gap-40">
      <div
        ref={collection_ref_1}
        className="w-[90%] mx-auto gap-4 max-w-custom_1 grid md:grid-cols-2 lg:grid-cols-3"
      >
        {rooms?.slice(0, 6)?.map((apartment, index) => {
          return (
            <RoomCard
              index={index}
              inView={inView1}
              key={index}
              apartment={apartment}
            />
          );
        })}
      </div>

      <div
        className="w-[90%] mx-auto lg:items-center gap-16 md:gap-24 max-w-custom_1 grid 
      lg:grid-cols-custom_4"
      >
        <div className="w-full flex flex-col gap-8">
          <span
            style={{ letterSpacing: "3px" }}
            className="text-xs font-booking_font uppercase"
          >
            Carry out a view of
          </span>
          <h2
            ref={collection_ref_2}
            className="text-5xl md:text-7xl leading-[1.1] font-booking_font4 font-bold"
          >
            <span className="w-full gap-x-[5px] flex flex-wrap ">
              {text_1.map((x, index) => {
                return (
                  <span
                    key={index}
                    className="flex hide relative items-center justify-start"
                  >
                    <motion.span
                      variants={slideup}
                      custom={index}
                      initial="initial"
                      animate={inView2 ? "animate" : "exit"}
                    >
                      {x}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          </h2>
          <span
            ref={text_ref_4}
            className="text-sm md:text-base w-full md:w-[650px] font-normal
             flex gap-x-[4px] leading-[1.5] flex-wrap  font-booking_font"
          >
            {text_4.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    key={index}
                    animate={inView5 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
          <span
            ref={text_ref_5}
            className="text-sm md:text-base w-full md:w-[650px] font-normal
             flex gap-x-[4px] leading-[1.5] flex-wrap  font-booking_font"
          >
            {text_5.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    key={index}
                    animate={inView6 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </div>
        <div
          ref={image_ref_1}
          className=" w-full lg:w-[450px] h-[400px] md:h-[650px] relative"
        >
          <motion.img
            variants={clipPathLeft}
            initial="initial"
            animate={inView7 ? "animate" : "exit"}
            src="/images/hazel_2.jpeg"
            alt=""
            className="w-full absolute h-full object-cover"
          ></motion.img>
          <div className="absolute -bottom-[6%] bg-[var(--gold-1)] -left-[1%] lg:-left-[10%] min-h-[190px] w-[180px] flex items-center justify-center">
            <div className="text-5xl text-center flex flex-col gap-1 uppercase text-white font-booking_font4 font-bold">
              + 8
              <br />{" "}
              <span
                style={{ letterSpacing: "3px" }}
                className="text-xs font-booking_font uppercase"
              >
                Big Rooms
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={container_ref_1}
        className="w-[90%] md:w-[85%] mx-auto gap-8 md:gap-32 max-w-custom_1 grid 
      lg:grid-cols-2"
      >
        {servicesData?.map((data, index) => {
          return (
            <motion.div
              variants={slideup}
              custom={index}
              initial="initial"
              animate={inView8 ? "animate" : "exit"}
              key={index}
              className=" w-full flex md:flex-row flex-col items-center
               md:justify-center gap-8 py-12 px-8 bg-white shadow-xl border rounded-xl relative"
            >
              <img
                src={data?.image}
                alt=""
                className="w-[130px]  md:-ml-24 h-[130px] rounded-full object-cover"
              />
              <div className=" flex items-center flex-col justify-center">
                <h4 className="text-3xl text-dark font-booking_font4 font-bold">
                  {data?.title}
                  <span className="block text-base pt-2 font-normal font-booking_font text-start text-grey">
                    {data?.desc}
                  </span>
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const RoomStructure = () => {
  const roomService = [
    {
      icon: "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/icon-16.png",
      ddsc: "Gated estate and security",
      title: "Gated Estate",
    },
    {
      icon: "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/icon-15.png",
      ddsc: "Ample storage room for luggage",
      title: "Store Luggage",
    },
    {
      icon: "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/icon-17.png",
      ddsc: "Fully equipped kitchens to prepare meals",
      title: "KItchenette",
    },
    {
      icon: "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/icon-18.png",
      ddsc: "Standby housekeeping 24/7",
      title: "Housekeeping",
    },
  ];
  const roomUtilities = [
    {
      width: "90%",
      title: "Housekeeping",
      bgColor: "var(--gold-1)",
    },
    {
      width: "60%",
      title: "24/7 Power and internet",
      bgColor: "#000",
    },
    {
      width: "90%",
      title: "Smart Television",
      bgColor: "var(--gold-1)",
    },
  ];
  const collection_ref_1 = useRef(null);
  const collection_ref_2 = useRef(null);
  const collection_ref_3 = useRef(null);
  const text_ref_5 = useRef(null);
  const image_ref_1 = useRef(null);
  const inView1 = useInView(collection_ref_1, {
    margin: "0px 100px -120px 0px",
  });

  const inView3 = useInView(image_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  const inView4 = useInView(collection_ref_3, {
    margin: "0px 100px -120px 0px",
  });
  const inView2 = useInView(collection_ref_2, {
    margin: "0px 100px -120px 0px",
  });

  const text_1 = [`The`, `View`];
  const text_4 = [
    `At Zyra&Stones Living, We believe that every stay should be an unforgettable experience. 
    With our prime locations in the heart of Lagos, we offer the perfect blend of comfort, style and charm.`,
    `We are passionate about creating a home away from home for our esteemed guests.`,
    `This is why we strive to provide a space where our guests can relax, unwind and immerse themselves in the experiences we have to offer.`,
  ];
  return (
    <div
      data-scroll-section
      className="w-full flex py-40 mt-24 flex-col gap-20"
    >
      <div className="w-[90%] mx-auto gap-24 md:gap-16 md:items-center max-w-custom_1 grid lg:grid-cols-2">
        <div className="w-full flex items-center gap-4 relative">
          <div className="w-full relative grid md:grid-cols-2 gap-12">
            <img
              src="/images/hazel_4.jpeg"
              alt=""
              className="object-cover md:min-h-[550px]"
            />
            <div className="min-h-[240px] shadow-2xl md:absolute px-8 left-[40%] top-[30%] bg-white flex flex-col gap-4 items-center justify-center">
              <div className="text-3xl text-center flex flex-col gap-1 uppercase text-dark font-booking_font4 font-bold">
                8+
                <br />{" "}
                <span
                  style={{ letterSpacing: "3px" }}
                  className="text-xs font-normal font-booking_font uppercase"
                >
                  ROOMS
                </span>
              </div>
              <div className="text-3xl text-center flex flex-col gap-1 uppercase text-dark font-booking_font4 font-bold">
                12
                <br />{" "}
                <span
                  style={{ letterSpacing: "3px" }}
                  className="text-xs font-normal font-booking_font uppercase"
                >
                  suites
                </span>
              </div>
              <div className="text-3xl font-bold text-center flex flex-col gap-1 uppercase text-dark font-booking_font4 font-bold">
                24
                <br />{" "}
                <span
                  style={{ letterSpacing: "3px" }}
                  className="text-xs font-normal font-booking_font uppercase"
                >
                  Hrs
                </span>
              </div>
            </div>
            <img
              src="/images/hazel_4.jpeg"
              alt=""
              className="object-cover md:min-h-[550px]"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <span
            style={{ letterSpacing: "3px" }}
            className="text-xs font-normal font-booking_font uppercase"
          >
            {/* HOTEL FACILITIES */}
          </span>
          <h2
            ref={collection_ref_1}
            className="text-5xl md:text-7xl leading-[1.2] font-booking_font4 font-bold"
          >
            {/* The Structure */}
            <span className="w-full gap-x-[5px] flex flex-wrap ">
              {text_1.map((x, index) => {
                return (
                  <span
                    key={index}
                    className="flex hide relative items-center justify-start"
                  >
                    <motion.span
                      variants={slideup}
                      custom={index}
                      initial="initial"
                      animate={inView1 ? "animate" : "exit"}
                    >
                      {x}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          </h2>
          <span
            ref={collection_ref_3}
            className="text-sm md:text-base w-full font-normal
             flex gap-x-[4px] leading-[1.5] flex-wrap  font-booking_font"
          >
            {text_4.map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    key={index}
                    animate={inView4 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
          <div ref={image_ref_1} className="flex flex-col gap-4 w-full">
            {roomUtilities?.map((data, index) => {
              return (
                <motion.div
                  variants={clipPathLeft}
                  initial="initial"
                  custom={index}
                  animate={inView3 ? "animate" : "exit"}
                  style={{
                    width: `${data?.width}`,
                    background: `${data?.bgColor}`,
                  }}
                  key={index}
                  className="h-10  px-4 text-white font-semibold text-sm flex items-center justify-between"
                >
                  <span className="">{data?.title}</span>
                  {/* <span className="">{data?.width}</span> */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        ref={collection_ref_2}
        className="w-[90%] py-8 mx-auto gap-12 md:gap-16 md:items-center max-w-custom_1 grid md:grid-cols-2 lg:grid-cols-4"
      >
        {roomService.map((room, index) => {
          return (
            <motion.div
              variants={slideup}
              custom={index}
              initial="initial"
              animate={inView2 ? "animate" : "exit"}
              key={index}
              className="flex items-center gap-4"
            >
              <img
                src={room.icon}
                alt="room_images_icon"
                className="w-12 md:w-20"
              />
              <span className="text-xl font-booking_font4 font-bold">
                {room.title}
                <span className="block text-sm text-grey font-normal font-booking_font">
                  {room?.ddsc}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const RoomsPrice = () => {
  const roompriceData = [
    {
      title: "Single Room",
      background: "var(-white-1)",
      price: "70,000",
      amenties: [
        "Home Screen",
        "PS5 Console",
        "Walk in Closets",
        "Fibre Optic Networks",
        "DSTV, Showmax, and Netflix",
        "Gated and Secured Estates",
        "Fully Furnished Kitchen",
      ],
    },
    {
      title: "Small Suite",
      background: "var(-gold-1)",
      price: "90,000",
      amenties: [
        "Home Screen",
        "24 / 7 Power Supply",
        "PS5 Console",
        "Walk in Closets",
        "Fibre Optic Networks",
        "DSTV, Showmax, and Netflix",
        "Gated and Secured Estates",
        "Fully Furnished Kitchen",
      ],
    },
    {
      title: "Apartment",
      background: "var(-white-1)",
      price: "120,000",
      amenties: [
        "Home Screen",
        "24 / 7 Power Supply",
        "PS5 Console",
        "Walk in Closets",
        "Fibre Optic Networks",
        "DSTV, Showmax, and Netflix",
        "Gated and Secured Estates",
        "Fully Furnished Kitchen",
        "Spacious Compound",
        "House Keeping",
      ],
    },
  ];
  const price_ref_1 = useRef(null);
  const image_ref_1 = useRef(null);
  const inView1 = useInView(price_ref_1, {
    margin: "0px 100px -120px 0px",
  });

  const inView2 = useInView(image_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  return (
    <div
      data-scroll-section
      className="w-full min-h-[100vh] py-40 relative flex items-center justify-center gap-8"
    >
      <img
        src="/images/hazel_11.jpeg"
        alt=""
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className="w-full h-full z-30 bg-[rgba(0,0,0,.5)] absolute top-0 left-0"></div>
      <div
        className="w-full z-40 flex items-center justify-center flex-col
       gap-16"
      >
        <h1
          ref={price_ref_1}
          className="text-white text-center leading-[1.3] text-6xl md:text-7xl font-booking_font4 font-bold"
        >
          <span
            style={{ letterSpacing: "4px" }}
            className="text-xs pb-6 text-center font-semibold uppercase block font-booking_font"
          >
            <span className="w-full gap-x-[5px] flex justify-center items-center flex-wrap ">
              {["OUR", "ROOM", "Prices"].map((x, index) => {
                return (
                  <span
                    key={index}
                    className="flex hide relative items-center justify-start"
                  >
                    <motion.span
                      variants={slideup}
                      custom={index}
                      initial="initial"
                      animate={inView1 ? "animate" : "exit"}
                    >
                      {x}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          </span>
          <span className="w-full gap-x-[8px] flex justify-center items-center flex-wrap ">
            {["The", "", "Best", "", "Prices"].map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    animate={inView1 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </h1>

        <div
          ref={image_ref_1}
          className="w-[90%] max-w-custom_1 mx-auto py-4 lg:flex-row gap-4 flex-col items-start justify-center flex"
        >
          {roompriceData.map((room, index) => {
            return (
              <motion.div
                key={index}
                variants={smallslideup2}
                custom={index}
                initial="initial"
                animate={inView2 ? "animate" : "exit"}
                className={`w-full ${index === 1 ? "bg-[#101727] text-white" : "bg-white"
                  } flex items-center shadow-2xl justify-center rounded-[20px] flex-col gap-8`}
              >
                <div className="w-full flex flex-col gap-3 px-8">
                  <h3
                    className={`${index === 1 ? "text-[#B7FF0A]" : "b"}
                     text-xl font-booking_font_bold font-bold`}
                  >
                    {room?.title}
                  </h3>
                  <h3 className="text-4xl md:text-5xl font-booking_font4 font-bold">
                    <span className="text-xl">₦</span>
                    {room?.price}
                    <span className="pl-3 text-xl font-booking_font">
                      / night
                    </span>
                  </h3>
                  <div className="w-full">
                    <div
                      className="btn font-bold btn_2 flex items-center justify-center
                     py-4 mt-6 px-8 rounded-[40px] w-full text-lg"
                    >
                      <AnimateText children={"Get Started Now!"} />
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full ${index === 1
                      ? "border-[rgba(255,255,255,.2)]"
                      : "border-[rgba(0,0,0,.2)]"
                    } pt-6 border-t px-8 flex flex-col gap-12`}
                >
                  <div className="w-full flex flex-col gap-8">
                    <h3
                      className={`${index === 1 ? "text-[#fff]" : "text-dark"}
                     text-xl font-booking_font font-bold`}
                    >
                      Features
                    </h3>
                    <div className="flex flex-col gap-4">
                      {room.amenties.map((am, index) => {
                        return (
                          <div
                            key={index}
                            className="w-full flex items-center gap-4 text-base"
                          >
                            <div
                              className="w-6 text-xm bg-[#B7FF0A] h-6 flex 
                        items-center justify-center text-[#000] rounded-full"
                            >
                              {" "}
                              <BiCheck />{" "}
                            </div>
                            {am}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const RoomsBanner = () => {
  const banner_ref_1 = useRef(null);
  const button_ref = useRef(null);
  const inView1 = useInView(banner_ref_1, {
    margin: "0px 100px -120px 0px",
  });

  const inView2 = useInView(button_ref, {
    margin: "0px 100px -120px 0px",
  });

  return (
    <div
      data-scroll-section
      className="w-full min-h-[100vh] py-40 overflow-hidden relative flex items-center justify-center
   gap-8"
    >
      <div className="w-full h-full z-30 bg-[rgba(0,0,0,.6)] absolute top-0 left-0"></div>
      <motion.div className="w-full absolute z-[20] h-full">
        <img
          src="/images/hazel_8.jpeg"
          alt=""
          className="absolute z-10 object-cover top-0 left-0 h-full w-full"
        />
      </motion.div>
      <div
        className="w-[90%] max-w-custom mx-auto z-40 grid items-center lg:grid-cols-2
       gap-12"
      >
        <div className="flex flex-col gap-6">
          <h1
            ref={banner_ref_1}
            className="text-white text-start leading-[1.3] text-6xl md:text-7xl font-booking_font4 font-bold"
          >
            <span
              style={{ letterSpacing: "4px" }}
              className="text-xs pb-8 font-bold uppercase block font-booking_font_bold"
            >
              <span className="w-full gap-x-[5px] flex justify-start items-center flex-wrap ">
                {["COME", "JOIN", "US"].map((x, index) => {
                  return (
                    <span
                      key={index}
                      className="flex hide relative items-center justify-start"
                    >
                      <motion.span
                        variants={slideup}
                        custom={index}
                        initial="initial"
                        animate={inView1 ? "animate" : "exit"}
                      >
                        {x}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            </span>
            <span className="w-full gap-x-[8px] flex flex-wrap ">
              {["Enjoy", "A", "Luxury", "", "Experience"].map((x, index) => {
                return (
                  <span
                    key={index}
                    className="flex hide relative items-center justify-start"
                  >
                    <motion.span
                      variants={slideup}
                      custom={index}
                      initial="initial"
                      animate={inView1 ? "animate" : "exit"}
                    >
                      {x}
                    </motion.span>
                  </span>
                );
              })}
            </span>
            <span className="w-full overflow-hidden">
              <motion.span
                variants={slideup}
                initial="initial"
                animate={inView1 ? "animate" : "exit"}
                className="block py-6 text-lg leading-[1.6] font-normal font-booking_font"
              >
                Ready to experience the best of comfort? Book your stay today
                and start creating unforgettable memories. We look forward to
                welcoming you and ensuring your time with us is nothing short of
                exceptional. For inquiries or assistance, reach out to us at{" "}
                <Link
                  style={{ textDecoration: "underline" }}
                  className="text-[var(--gold-1)]"
                  mailto={"zyraandstones@gmail.com"}
                >
                  zyraandstones@gmail.com
                </Link>{" "}
                or{" "}
                <Link
                  style={{ textDecoration: "underline" }}
                  className="text-[var(--gold-1)]"
                  to={""}
                >
                  +(234) 913 861 1598
                </Link>{" "}
                . Follow us on IG:{" "}
                <Link
                  _blanck
                  style={{ textDecoration: "underline" }}
                  className="text-[var(--gold-1)]"
                  to={
                    "https://www.instagram.com/zyrastones_living?igsh=MzRIODBiNWFIZA"
                  }
                >
                  @zyrastones_living
                </Link>{" "}
                for the latest news and special offers.
              </motion.span>
            </span>
          </h1>
          <div
            ref={button_ref}
            className="w-full overflow-hidden items-start flex"
          >
            <div
              style={{ letterSpacing: "4px" }}
              className="btn btn_2 text-xs text-white uppercase px-12 py-6"
            >
              <AnimateText children={"Room & Suites"} />
            </div>
          </div>
        </div>

        <div className="w-[95%] lg:w-full py-4 gap-8 flex-col items-start flex">
          {/* <div className="w-64 text-2xl text-white h-64 rounded-full items-center justify-center flex bg-[var(--gold-1)]">
            <span>50%</span>
          </div> */}
          <img
            src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/03/towels-1024x837.png"
            alt=""
            className="w-[70%]"
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
