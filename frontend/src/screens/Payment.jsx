import React from "react";
import PaymentIndex from "../components/payment";
import Meta from "@/components/common/Meta";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "../constants/utils/SmoothScroll";

const Payment = () => {
  return (
    <SmoothScroll>
      <Meta title={"Payment for my booked Room"} />
      <Navbar />
      <PaymentIndex />
      <Footer />
    </SmoothScroll>
  );
};

export default Payment;
