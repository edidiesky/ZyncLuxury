// import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import DashboardIndex from "./components";
import { useEffect } from "react";
import { GetAllUsers } from "@/features/auth/authReducer";
import Loader from "@/components/home/loader";

export default function Customers() {
  const dispatch = useDispatch()
  const { getallUserisLoading } = useSelector(store => store.auth)

  useEffect(() => {
    dispatch(GetAllUsers())
  }, [])
  if (getallUserisLoading) {
    return <Loader />
  }
  return (
    <div>
      <DashboardIndex />
    </div>
  );
}
