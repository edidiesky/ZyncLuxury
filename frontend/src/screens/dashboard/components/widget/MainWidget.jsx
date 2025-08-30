;
import ContentLoader from "@/components/common/ContentLoader";
import { AiOutlineThunderbolt } from "react-icons/ai";

export default function Widget({ data, loading }) {
  return (
    <div className="w-full">
      {loading ? (
        <ContentLoader type="dashboard_card" />
      ) : (
        <div
          className={`grid grid-cols-2 md:grid-cols-2 ${
            data?.length === 4 ? "lg:grid-cols-4 " : "lg:grid-cols-3 "
          } lg:gap-6 gap-6`}
        >
          {data.map((stat, index) => {
            return (
              <div
                key={index}
                className="lg:py-4 p-6 rounded-3xl border py-2 min-h-[220px] bg-white flex flex-col justify-center gap-6 w-full"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="text-base medium text-gray-400">
                    {stat.title}
                  </h4>
                  <h3 className="text-2xl lg:text-5xl font-bold text-gray-900">
                    {stat.value || 0}{" "}
                  </h3>
                </div>

                <div className="flex w-full items-start flex-col gap-1">
                  {/* total bonus */}
                  <div className="flex p-2 px-3 bg-gray-100 rounded-full items-center gap-2">
                    <h5 className="text-sm font-bold text-green-600">+1000</h5>
                    <AiOutlineThunderbolt className="text-lg" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
