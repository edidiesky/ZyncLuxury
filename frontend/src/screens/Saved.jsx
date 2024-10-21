import React from "react";
import Meta from "@/components/common/Meta";
import HomeIndex from "../components/saved";
import SmoothScroll from "../constants/utils/SmoothScroll";

const Saved = () => {
  return (
    <SmoothScroll>
      <Meta title={"My Favourites Homes"} />
      <HomeIndex />
    </SmoothScroll>
  );
};

export default Saved;
