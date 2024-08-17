import React, { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/src/locomotive-scroll.scss'
import HomeIndex from "../components/home";
import Meta from "@/components/common/Meta";

const Home = () => {
  const elementRef = useRef(null)
  // useEffect(() => {
  //   // const scrollEle = document.querySelector("#main-content")
  //   const locoScroll = new LocomotiveScroll({
  //     el: elementRef?.current,
  //     smooth: true,
  //     multiplier: 1,
  //     class: "is-reveal"
  //   })
  // }, [])
  return (
    <div ref={elementRef} id="main-content" data-scroll-container>
      <Meta />
      <HomeIndex />
    </div>
  );
};

export default Home;
