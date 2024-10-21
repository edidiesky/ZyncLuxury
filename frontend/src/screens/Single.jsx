import React from "react";
import HomeIndex from "../components/single";
import Meta from "@/components/common/Meta";
import { useSelector } from "react-redux";
import SmoothScroll from "../constants/utils/SmoothScroll";

const Single = () => {
  const { room } = useSelector((store) => store.room);
  return (
    <div>
      <Meta title={`Home Detail for ${room?.title ? room?.title : ""} `} />
      <SmoothScroll>
        <HomeIndex />
      </SmoothScroll>
    </div>
  );
};

export default Single;
