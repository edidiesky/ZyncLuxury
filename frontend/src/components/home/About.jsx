import { Phone } from "lucide-react";
import { useRef } from "react";

import Image from "../common/Image";
import { GrSecure } from "react-icons/gr";
import { MdOutlineElectricalServices } from "react-icons/md";
import { SiInfluxdb } from "react-icons/si";
import { MdCleaningServices } from "react-icons/md";
import { GiConsoleController } from "react-icons/gi";
import { FaKitchenSet } from "react-icons/fa6";
import AnimateTextWord from "../common/AnimateTextWord";

const whychooseList = [
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    icons: <GrSecure />,
    title: "Security",
  },
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    icons: <MdOutlineElectricalServices />,
    title: "24 / 7 Electricity",
  },
  ,
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    icons: <SiInfluxdb />,
    title: "House Keeping",
  },
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    icons: <MdCleaningServices />,
    title: "Serene Environment",
  },
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    icons: <FaKitchenSet />,
    title: "Equipped Kitchen",
  },
  {
    text: "Equipped Gaming Console",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    icons: <GiConsoleController />,
    title: "Gaming Console",
  },
];

const About = () => {
 
  return (
    <div data-scroll-section className="w-full relative flex flex-col gap-20">
     
      <div className="w-full py-20">
        <div className="w-[90%] max-w-custom mx-auto flex flex-col gap-20">
          <div className="grid lg:grid-cols-2 items-start md:items-center w-full gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg md:text-xl text-[var(--primary)]">
                Passionate – Dedicated – Professional
              </h4>
              <h4 className="text-4xl max-w-[600px] md:text-5xl family2 text-[var(--dark-1)]">
                <AnimateTextWord type={"bigtext"}>
                  Why you should should Choose ZyncLuxury?
                </AnimateTextWord>
              </h4>
            </div>
            <div className="flex lg:items-center md:justify-end">
              <span className="text-xl max-w-[100%] md:max-w-[400px] text-grey font-normal">
                <AnimateTextWord>
                  Auisque cursus metus vitae sed pharetra auctor semy mas
                  interdum magnads augue.
                </AnimateTextWord>
              </span>
            </div>
          </div>
          <div className="w-full grid md:grid-cols-3 gap-y-16 gap-x-12">
            {whychooseList?.map((data, index) => {
              return (
                <div
                  className="w-full cursor-pointer flex flex-col"
                >
                  <div
                    style={{ transition: "all .3s" }}
                    key={index}
                    className="w-full z-20 group hover:-translate-y-10 p-12 bg-[#f4f5fa] rounded-xl
                     flex flex-col gap-4"
                  >
                    <div className="w-36 h-36 mb-4 border-8 group-hover:text-white group-hover:bg-[var(--primary)] border-[hsla(232, 28%, 73%,calc(100% - 80%))] md:text-6xl flex items-center justify-center rounded-full bg-white text-4xl">
                      {data?.icons}
                    </div>
                    <h3 className="text-2xl md:text-3xl family2 text-dark">
                      {data?.title}
                    </h3>
                    <h4 className="text-sm md:text-base family1 font-normal text-grey">
                      {data?.subText}
                    </h4>
                  </div>
                  <div className="w-full z-10">
                    <div
                      className="w-[90%] capitalize family1 font-normal -mt-20 text-base text-center py-4 pt-12 px-4
                     rounded-xl text-white mx-auto bg-[var(--primary)]"
                    >
                      {data?.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full bg-[#22253d] py-40 z-40">
        {" "}
        <div className="w-[90%] max-w-custom mx-auto grid md:grid-cols-2 gap-24">
          <div className="w-full h-[450px]">
            <Image
              src={
                "https://avada.website/business/wp-content/uploads/sites/171/2022/09/about-us-2.jpg"
              }
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            <h4 className="text-lg md:text-xl text-[var(--primary)]">
              <AnimateTextWord>
                Passionate – Dedicated – Professional
              </AnimateTextWord>
            </h4>
            <h3 className="text-4xl leading-[1.2] max-w-[500px] md:text-5xl family2 capitalize family2 text-white">
              <AnimateTextWord type={"bigtext"}>
                its’ not about business, it’s about ‘YOU’!
              </AnimateTextWord>{" "}
            </h3>
            <div className="flex items-center py-4 gap-8">
              <div className="family2 text-xl md:text-xl family2 text-white">
                The Mission
              </div>
              <div className="family2 text-xl md:text-xl family2 text-white">
                The Mission
              </div>
              <div className="family2 text-xl md:text-xl family2 text-white">
                The Mission
              </div>
            </div>
            <p className="text-xl family1 leading-[1.4] font-normal text-white">
              <AnimateTextWord>
                Buisque cursus metus vitae sed pharetra auctor semy interdum
                magna augue eget diam ante ipsum faucibus luctus ultrices
                losuere cubilia. Vestibulum lacinia arcu eget nulla.
              </AnimateTextWord>
            </p>
            <div className="flex pt-8 flex-col gap-4">
              <p className="text-lg text-grey">
                Call us for inquiry : Monday to Friday : 9 am – 5 pm
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center bg-[var(--primary)] justify-center rounded-full text-white text-xl">
                  <Phone />
                </div>
                <h4 className="text-white text-2xl md:text-3xl family2">
                  +1 (800) 555 555{" "}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
