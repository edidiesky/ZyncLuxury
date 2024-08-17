import { Link } from "react-router-dom";

const navbarCenterList = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Search",
    path: "search",
  },
  {
    title: "My Favourites",
    path: "savedhomes",
  },
  {
    title: "My Trips",
    path: "trips",
  },
  {
    title: "About & FAQ",
    path: "about",
  },
];
const Footer = () => {
  return (
    <>
      <div
        className="w-full  py-16 relative bg-[#1D1D1D] flex items-center justify-center
   gap-8"
      >
        <div
          className="w-[90%] mx-auto max-w-custom_1 justify-between z-40 grid md:grid-cols-2 lg:grid-cols-3
      gap-8 md:gap-2"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <img
              src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/icon-20.png"
              alt=""
              className="w-12 md:w-16"
            />
            <h3 className="text-2xl text-white font-booking_font4 font-bold">
              Phone Support
              <span className="block uppercase text-sm font-booking_font font-normal text-grey">
                CALL US
              </span>
            </h3>
            <h3 className="text-2xl text-white hover:text-[var(--gold-1)] font-booking_font4 font-bold">
              +(234) 913 861 1598
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <img
              src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/icon-19.png"
              alt=""
              className="w-12 md:w-16"
            />
            <h3 className="text-2xl text-white font-booking_font4 font-bold">
              Connect With Us
              <span className="block uppercase text-sm font-booking_font font-normal text-grey">
                SOCIAL MEDIA
              </span>
            </h3>
            <h3 className="text-2xl text-white font-booking_font4 font-bold">
              <Link
                _blanck
                className="hover:text-[var(--gold-1)] text-white"
                to={
                  "https://www.instagram.com/zyrastones_living?igsh=MzRIODBiNWFIZA"
                }
              >
                @zyrastones_living
              </Link>
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <img
              src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/icon-20.png"
              alt=""
              className="w-12 md:w-16"
            />
            <h3 className="text-2xl flex flex-col items-center justify-center gap-4 text-white font-booking_font4 font-bold">
              <span>
                Contact Us
                <span className="block leading-[1.5]  text-sm font-booking_font font-normal text-grey">
                  BOOK A RESERVATION
                </span>
              </span>
              <Link
                className="hover:text-[var(--gold-1)] text-white"
                mailto={"zyraandstones@gmail.com"}
              >
                zyraandstones@gmail.com
              </Link>
            </h3>
          </div>
        </div>
      </div>
      <div
        className="w-full  py-4 relative bg-[#000] flex items-center justify-center
   gap-8"
      >
        <div
          className="w-[90%] mx-auto max-w-custom_1 flex items-center justify-between
       gap-4"
        >
          <div className="items-center justify-start flex-wrap flex gap-1">
            {navbarCenterList?.map((list, index) => {
              return (
                <Link
                  to={"#"}
                  key={index}
                  className={`text-sm 
                font-normal  text-white font-booking_font flex items-center gap-2 p-3 px-4 rounded-[40px]`}
                >
                  {/* <img src={list?.icon} className="w-4" alt="" /> */}
                  {list?.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
