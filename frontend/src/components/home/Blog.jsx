import { Link } from "react-router-dom";
import Image from "../common/Image";
import { FaLongArrowAltRight } from "react-icons/fa";
const blogList = [
  {
    title: "How to have a fantastic career opportunity with minimal spending",
    image:
      "https://avada.website/business/wp-content/uploads/sites/171/2022/09/blog-image-career-400x337.jpg",
    subtitle: "",
    shortDescription: "",
  },
  {
    title: `Understanding the value & background of all public relation trends`,
    image:
      "https://avada.website/business/wp-content/uploads/sites/171/2022/09/blog-image-business-pr-400x337.jpg",
    subtitle: "",
    shortDescription: "",
  },
  {
    title: "Things you should know before getting into the business industry",
    image:
      "https://avada.website/business/wp-content/uploads/sites/171/2022/09/blog-image-finance-400x337.jpg",
    subtitle: "",
    shortDescription: "",
  },
];
const Blog = () => {
  return (
    <div data-scroll-section className="w-full flex py-32 flex-col gap-40">
      <div className="w-[90%] max-w-custom mx-auto flex flex-col gap-20">
        <div className="flex flex-col items-start md:items-center md:justify-center w-full gap-4">
          <div className="flex flex-col md:items-center md:justify-center gap-4">
            <h4 className="text-lg md:text-xl text-[var(--primary)]">
              Passionate – Dedicated – Professional
            </h4>
            <h4 className="text-4xl md:text-5xl capitalize family2 text-[var(--dark-1)]">
              latest news & insights
            </h4>
          </div>
          <div className="flex lg:items-center md:justify-center">
            <span className="text-xl max-w-[100%] md:text-center mx-auto md:max-w-[600px] text-grey font-normal">
              Auisque cursus metus vitae sed pharetra auctor semy mas interdum
              magnads augue.
            </span>
          </div>
        </div>
        <div className="w-full grid md:grid-cols-3 gap-12">
          {blogList?.map((blog, index) => {
            return (
              <Link to={"/"} className="w-full group flex flex-col gap-4">
                <div className="w-full overflow-hidden rounded-xl">
                  <Image src={blog?.image} />
                </div>
                <div className="py-8 border-b border-dotted px-4 flex flex-col gap-4">
                  <h5 className="text-base font-normal">
                    Categories:{" "}
                    <span className="text-[var(--primary)]">Luxury Living</span>
                  </h5>
                  <h4 className="text-2xl group-hover:text-[var(--primary)] group-hover:underline md:text-3xl font-bold">
                    {blog?.title}
                  </h4>
                </div>
                <div className="px-2 py-2">
                  <h4 className="flex  items-center gap-4 text-lg">
                    <span
                      style={{
                        transition: "all .4s",
                      }}
                      className="group-hover:opacity-[1] group-hover:translate-x-6 opacity-0"
                    >
                      <FaLongArrowAltRight />
                    </span>
                    <span
                      style={{
                        transition: "all .4s",
                      }}
                      className="text-[var(--primary)] group-hover:translate-x-6"
                    >
                      Read More
                    </span>
                    <span
                      style={{
                        transition: "all .3s",
                      }}
                      className="group-hover:opacity-[0] opacity-1"
                    >
                      <FaLongArrowAltRight />
                    </span>
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
