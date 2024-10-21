import React from "react";
import HomeIndex from "../components/search";
import SmoothScroll from "../constants/utils/SmoothScroll";

import Meta from "@/components/common/Meta";
const Search = () => {
  return (
    <SmoothScroll>
      <Meta title={"Search for quality homes"} />
      <HomeIndex />
    </SmoothScroll>
  );
};

export default Search;
