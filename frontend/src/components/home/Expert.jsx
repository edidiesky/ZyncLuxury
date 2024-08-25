import Image from "../common/Image";
import { GiCutDiamond } from "react-icons/gi";
import { FaMountainCity } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
const Expert = () => {
  const zyncStength = [
    {
      title: "Security",
      percentage: 80,
    },
    {
      title: "24 / 7 Power Electricity",
      percentage: 90,
    },
    {
      title: "Luxury",
      percentage: 90,
    },
  ];
  return (
    <div className="flex w-full flex-col">
      <div
        data-scroll-section
        className="w-full flex relative bg-[#f4f5fa] py-20 flex-col gap-40"
      >
        <div className="background_grey"></div>
        <div className="w-[95%] max-w-custom mx-auto flex flex-col gap-20">
          <div className="grid lg:grid-cols-2 items-start md:items-center w-full gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg md:text-xl text-[var(--primary)]">
                Passionate – Dedicated – Professional
              </h4>
              <h3 className="text-4xl font-bold md:text-5xl family2 text-[var(--dark-1)]">
                Why you should <br /> Choose ZyncLuxury?
              </h3>
              <h4 className="text-lg md:text-xl text-[var(--dark-1)]">
                Auisque cursus sed magnads vitae conubia pharetra auctor
                interdum dui metus augue.
              </h4>
            </div>
            <div className="flex lg:items-center flex-col gap-4 md:justify-end">
              {zyncStength?.map((data, index) => {
                return (
                  <div key={index} className="w-full flex flex-col gap-3">
                    <span className="text-base md:text-lg text-dark font-normal">
                      {data?.title} {data?.percentage}%
                    </span>
                    <div className="w-full h-4 rounded-xl bg-[#d8d8d8]">
                      <div
                        style={{
                          width: `${data?.percentage}%`,
                        }}
                        className="h-[100%] rounded-xl bg-[#f73760]"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div data-scroll-section className="w-full flex relative flex-col gap-40">
        <div className="w-[100%] flex flex-col gap-20">
          <div className="grid lg:grid-cols-2 items-start md:items-center w-full">
            <div className="w-full h-full">
              <Image
                src={
                  "https://avada.website/business/wp-content/uploads/sites/171/2022/10/about-features-1.jpg"
                }
              />
            </div>
            <div className="flex h-full relative bg-[#22253d] items-start justify-center py-20 px-12 md:px-20 flex-col gap-8">
              <div className="background_grey"></div>

              <h4 className="text-lg md:text-xl text-[var(--primary)]">
                Passionate – Dedicated – Professional
              </h4>
              <h3 className="text-4xl md:text-5xl font-bold capitalize family2 text-white">
                Why you should choose ZyncLuxury?
              </h3>
              <p className="text-base md:text-lg family1 leading-[1.4] font-normal text-grey">
                Buisque cursus metus vitae sed pharetra auctor semy interdum
                magna augue eget diam ante ipsum faucibus luctus ultrices
                losuere cubilia. Vestibulum lacinia arcu eget nulla.
              </p>
              <div className="w-full flex items-center gap-4">
                <div className="w-24 h-24 bg-[#282c48] flex text-5xl items-center rounded-full text-white justify-center">
                  <GiCutDiamond />
                </div>
                <div className="w-24 h-24 bg-[#282c48] flex text-5xl items-center rounded-full text-white justify-center">
                  <FaMountainCity />
                </div>
                <div className="w-24 h-24 bg-[#282c48] flex text-5xl items-center rounded-full text-white justify-center">
                  <GiModernCity />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <FaLongArrowAltRight
                    fontSize={"26px"}
                    color="var(--primary)"
                  />
                  <span className="text-base md:text-xl text-white">
                    Awards won with business intelligence
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaLongArrowAltRight
                    fontSize={"26px"}
                    color="var(--primary)"
                  />
                  <span className="text-base md:text-xl text-white">
                    Our mission is to grow your business faster
                  </span>
                </div>{" "}
                <div className="flex items-center gap-3">
                  <FaLongArrowAltRight
                    fontSize={"26px"}
                    color="var(--primary)"
                  />
                  <span className="text-base md:text-xl text-white">
                    Global presence makes us top rated company
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-scroll-section
        className="w-full flex relative border-b border-dotted py-24 flex-col gap-40"
      >
        <div className="w-[95%] max-w-custom justify-center md:items-center mx-auto flex gap-20">
          <div className="w-full flex md:flex-row flex-col justify-center md:items-center gap-12 md:gap-24">
            <div className="flex flex-col gap-3">
              <h2 className="text-7xl md:text-9xl text-[#868dbb]">15k+</h2>
              <span className="text-lg md:text-xl text-[#000]">
                Supported Listings
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-7xl md:text-9xl text-[#868dbb]">3.5M</h2>
              <span className="text-lg md:text-xl text-[#000]">
                Supported Listings
              </span>
            </div>{" "}
            <div className="flex flex-col gap-3">
              <h2 className="text-7xl md:text-9xl text-[#868dbb]">600</h2>
              <span className="text-lg md:text-xl text-[#000]">
                Supported Listings
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
