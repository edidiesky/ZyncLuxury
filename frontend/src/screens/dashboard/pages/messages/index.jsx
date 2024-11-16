// import Head from "next/head";
import { useDispatch } from "react-redux";
import DashboardIndex from "./components";
import { useEffect } from "react";
import { GetAllUsers } from "@/features/auth/authReducer";

export default function Customers() {
  return (
    <div>
      <DashboardIndex />
    </div>
  );
}
