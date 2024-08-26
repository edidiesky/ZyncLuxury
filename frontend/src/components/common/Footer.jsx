import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Github, Linkedin, Twitter } from "lucide-react";

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
    <div className="w-full flex mt-16 md:mt-20 flex-col">
      <div className="w-[90%] lg:w-[900px] shadows py-20 px-8 md:px-16 rounded-bl-2xl z-[50] gap-8 -mb-12 bg-white mx-auto flex flex-col">
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl md:text-4xl capitalize family1 font-bold">
            keep updated & don’t miss anything!
          </h3>
          <span className="block text-lg text-grey">
            Setus vitae pharetra auctor kasu mattiy sed interdum
          </span>
        </div>
        <div className="flex md:flex-row flex-col md:items-center gap-8">
          <input
            type="text"
            placeholder="Enter your email"
            className="input w-full"
          />
          <div className="btn px-6 py-4 flex items-center gap-4 text-white text-lg">
            Subscribe
            <FaLongArrowAltRight fontSize={"24px"} />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#22253d] flex px-4 md:px-8 flex-col pt-36 pb-20">
        <div className="w-[95%] max-w-custom mx-auto md:items-center md:justify-center z-40 flex flex-col gap-12">
          <h3 className="family2 text-4xl md:text-5xl md:text-center text-white font-extrabold">
            <span className="family1 text-lg block text-[var(--primary)] font-normal">
              Home of Luxury
            </span>
            Zyncs<span className="text-[var(--primary)]">Luxury</span>
          </h3>
          <div className="w-full grid md:items-center md:justify-center grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-8">
              <h4 className="text-lg md:text-center md:text-xl font-bold text-white">
                Resources
              </h4>
              <div className="flex flex-col gap-2">
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Get pre-qualified
                </h4>
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Find an Agent
                </h4>{" "}
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Housing Guide
                </h4>
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Research Media
                </h4>{" "}
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Media Room
                </h4>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-lg md:text-center md:text-xl font-bold text-white">
                Company
              </h4>
              <div className="flex flex-col gap-2">
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  About Us
                </h4>
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Newsroom
                </h4>{" "}
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Careers
                </h4>
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Investors
                </h4>{" "}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <h4 className="text-lg md:text-center md:text-xl font-bold text-white">
                Website Link
              </h4>
              <div className="flex flex-col gap-2">
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Home
                </h4>
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  About
                </h4>{" "}
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Favourite
                </h4>
                <h4 className="text-base md:text-center md:text-lg font-normal text-grey">
                  Reservations
                </h4>{" "}
              </div>
            </div>
          </div>
          <div className="pt-12 flex flex-col gap-12 w-full border-[#cdd5ea33] border-t">
            <div className="w-full text-center">
              <h2 className="text-6xl md:text-8xl font-extrabold text-[#cdd5ea33]">
                +1 800 555 5555
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link
                style={{ transition: "all .5s" }}
                href={"github.com/edidiesky"}
                className="w-16 md:w-20 h-16 md:h-20 hover:-translate-y-10 bg-[#282c48] flex text-5xl cursor-pointer md:text-6xl items-center rounded-full text-white justify-center"
              >
                <Github />
              </Link>
              <Link
                style={{ transition: "all .5s" }}
                href={"https://twitter.com/edidiesky"}
                className="w-16 md:w-20 h-16 md:h-20 hover:-translate-y-10 bg-[#282c48] flex text-5xl cursor-pointer md:text-6xl items-center rounded-full text-white justify-center"
              >
                <Twitter />
              </Link>{" "}
              <Link
                style={{ transition: "all .5s" }}
                href={"https://www.linkedin.com/in/victor-essien-379b03319/"}
                className="w-16 md:w-20 h-16 md:h-20 hover:-translate-y-10 bg-[#282c48] flex text-5xl cursor-pointer md:text-6xl items-center rounded-full text-white justify-center"
              >
                <Linkedin />
              </Link>
            </div>
            <h4 className="text-center text-sm  text-[#cdd5ea33]">
              <span className="text-[var(--primary)]">© 2024</span> • All Rights
              Reserved •{" "}
              <span className="text-[var(--primary)]">ZyncLuxury is a </span>{" "}
              resort conceptualization •{" "}
              <span className="text-[var(--primary)]">
                Developed By Victor Essien
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
