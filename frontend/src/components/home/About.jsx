import { Phone } from "lucide-react";
import Image from "../common/Image";
const whychooseList = [
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    title: "Secuirty",
  },
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    title: "24 / 7 Electricity",
  },
  ,
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    title: "House Keeping",
  },
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    title: "Serene Environment",
  },
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    title: "Privacy",
  },
  {
    text: "Gateway to a full luxury lifestyle",
    subText:
      "Dynamically recapitalize bleeding-edge leadership skills for all apps.",
    title: "Equipped Kitchen",
  },
];

const About = () => {
  return (
    <div data-scroll-section className="w-full relative flex flex-col gap-20">
      {/* <div
        // style={{
        //   transform: "scale(1,-1)",
        //   backgroundPosition: "center center",
        //   backgroundImage:
        //     "url(data:image/svg+xml;utf8,%3Csvg%20width%3D%221920%22%20height%3D%22954%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url%28%23prefix__clip0_75_23031%29%22%20fill%3D%22rgba%2861%2C67%2C109%2C1%29%22%3E%3Cpath%20d%3D%22M1321.57%20538C1357.08%20287.516%201273.7%2089.91%201127-.418L1374.18-6c65.77%20100.68-15.89%20431.512-52.61%20544zM312%20955c432.242%200%20746.77-180.667%20850-271-90.34%20157.09-176.766%20246.121-208.688%20271H312z%22%20fill%3D%22rgba%2861%2C67%2C109%2C1%29%22%20fill-opacity%3D%22.25%22%2F%3E%3Cpath%20d%3D%22M1344.5%20427c0-252.4-212.67-390.833-319-428.5H1373c70%2082.4%2010.17%20320-28.5%20428.5z%22%20fill%3D%22rgba%2861%2C67%2C109%2C1%29%22%20fill-opacity%3D%22.1%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M839.644%20954C1138.37%20793.549%201337%20508.902%201337%20184.5c0-63.218-7.54-124.926-21.9-184.5H1920v954H839.644zm0%200C676.842%201041.44%20484.311%201092%20278%201092c-584.87%200-1059-406.302-1059-907.5S-306.87-723%20278-723c511.098%200%20937.63%20310.269%201037.1%20723H0v954h839.644z%22%20fill%3D%22rgba%2861%2C67%2C109%2C1%29%22%20fill-opacity%3D%22.5%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1011.55%20954C1221.42%20793.95%201353%20564.007%201353%20308.5c0-108.584-23.76-212.552-67.2-308.5H1920v954h-908.45zm0%200c-187.291%20142.83-436.933%20230-711.05%20230C-280.78%201184-752%20792.025-752%20308.5S-280.78-567%20300.5-567c450.743%200%20835.31%20235.692%20985.3%20567H0v954h1011.55z%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22prefix__clip0_75_23031%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h1920v954H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E)",
        // }}
        className="absolute bg-no-repeat z-10 top-0 left-0 right-0 h-full w-full"
      ></div> */}
      <div className="w-full py-20">
        <div className="w-[95%] max-w-custom mx-auto flex flex-col gap-20">
          <div className="grid lg:grid-cols-2 items-start md:items-center w-full gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg md:text-xl text-[var(--primary)]">
                Passionate – Dedicated – Professional
              </h4>
              <h4 className="text-4xl md:text-5xl family2 text-[var(--dark-1)]">
                Why you should <br /> Choose ZyncLuxury?
              </h4>
            </div>
            <div className="flex lg:items-center md:justify-end">
              <span className="text-xl max-w-[100%] md:max-w-[400px] text-grey font-normal">
                Auisque cursus metus vitae sed pharetra auctor semy mas interdum
                magnads augue.
              </span>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-y-16 gap-x-12">
            {whychooseList?.map((data, index) => {
              return (
                <div className="w-full cursor-pointer flex flex-col">
                  <div
                    style={{ transition: "all .5s" }}
                    key={index}
                    className="w-full z-20 hover:-translate-y-10 p-12 bg-[#f4f5fa] rounded-xl
                     flex flex-col gap-4"
                  >
                    <h3 className="text-2xl family1 font-extrabold text-dark">
                      {data?.title}
                    </h3>
                    <h4 className="text-sm md:text-base family1 font-normal text-grey">
                      {data?.subText}
                    </h4>
                  </div>
                  <div className="w-full z-10">
                    <div className="w-[90%] capitalize font-bold -mt-20 text-base text-center py-4 pt-12 px-4
                     rounded-xl text-white mx-auto bg-[var(--primary)]">
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
              Passionate – Dedicated – Professional
            </h4>
            <h3 className="text-4xl md:text-5xl leading-[2] capitalize family2 text-white">
              its’ not about business, <br /> <span>it’s about ‘YOU’!</span>
            </h3>
            <div className="flex items-center py-8 gap-8">
              <div className="family2 text-xl md:text-xl font-bold text-white">
                The Mission
              </div>
              <div className="family2 text-xl md:text-xl font-bold text-white">
                The Mission
              </div>
              <div className="family2 text-xl md:text-xl font-bold text-white">
                The Mission
              </div>
            </div>
            <p className="text-xl family1 leading-[1.4] font-normal text-white">
              Buisque cursus metus vitae sed pharetra auctor semy interdum magna
              augue eget diam ante ipsum faucibus luctus ultrices losuere
              cubilia. Vestibulum lacinia arcu eget nulla.
            </p>
            <div className="flex pt-8 flex-col gap-4">
              <p className="text-lg text-grey">
                Call us for inquiry : Monday to Friday : 9 am – 5 pm
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center bg-[var(--primary)] justify-center rounded-full text-white text-xl">
                  <Phone />
                </div>
                <h4 className="text-white text-2xl md:text-3xl font-bold">
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
