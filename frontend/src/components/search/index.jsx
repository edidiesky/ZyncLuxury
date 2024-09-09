import React, { useEffect } from "react";
import MainContent from "./main/maincontent";
import Footer from "../common/Footer";
import Header, { FilterRooms } from "./Header";

const HomeIndex = () => {
  return (
    <div className="bg-[var(--light-grey)] h-[100vh] w-full flex flex-col">
      {/* <Navbar /> */}
      <Header />
      <div
        style={{
          height: "calc(100vh - 90px)",
        }}
        className="w-full flex flex-col relative gap-1"
      >
        <FilterRooms/>
        <MainContent />
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default HomeIndex;
