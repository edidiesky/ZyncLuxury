import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Loader from "./components/home/loader";
import Layout from "./screens/Layout";
import DashboardLayout from "./screens/DashboardLayout";

import {
  Statistics,
  Rooms,
  Customers,
  CreateRoom,
  Reservation,
  Orders,
  Settings,
} from "./screens/dashboard";
import { ProtectRoute } from "./lib/ProtectRoute";
import Preloader from "./components/common/Preloader";
const HomeWrapper = lazy(() => import("./screens/Home"));
const SearchWrapper = lazy(() => import("./screens/Search"));
const ProfileWrapper = lazy(() => import("./screens/Profile"));
const CreateListingWrapper = lazy(() => import("./screens/CreateListing"));
// CreateListing
const SingleWrapper = lazy(() => import("./screens/Single"));
const SavedWrapper = lazy(() => import("./screens/Saved"));
const TripsWrapper = lazy(() => import("./screens/Trips"));
const PaymentWrapper = lazy(() => import("./screens/Payment"));
const PaymentSuccess = lazy(() => import("./screens/Payment-Success"));

import {
  AboutPlace,
  BasicInfoAboutPlace,
  BasicOfferOfPlace,
  DescriptionOfPlace,
  InformationOfPlace,
  LocationOfplace,
  PhotosAboutPlace,
  ReviewOfPlace,
  PriceOfPlace,
  StandOut,
  TitleOfPlace,
} from "./screens/hosting";
import HostingLayout from "./screens/hosting/HostingLayout";
// PaymentSuccess
export default function App() {
  const [height, setHeight] = useState(0);

  return (
    <div className="based" style={{ height }}>
      {/* <Preloader/> */}
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <HomeWrapper />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<Loader />}>
                <SearchWrapper />
              </Suspense>
            }
          />
          <Route
            path="room/:id"
            element={
              <Suspense fallback={<Loader />}>
                <SingleWrapper />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Loader />}>
                <ProfileWrapper />
              </Suspense>
            }
          />

          <Route
            path="savedhomes"
            element={
              <Suspense fallback={<Loader />}>
                <SavedWrapper />
              </Suspense>
            }
          />
          <Route
            path="trips"
            element={
              <Suspense fallback={<Loader />}>
                <TripsWrapper />
              </Suspense>
            }
          />
          <Route
            path="reservation/payment/:id"
            element={
              <Suspense fallback={<Loader />}>
                <PaymentWrapper />
              </Suspense>
            }
          />
          <Route
            path="payment-success/:id"
            element={
              <Suspense fallback={<Loader />}>
                <PaymentSuccess />
              </Suspense>
            }
          />
        </Route>

        {/* become a host */}
        <Route
          path={"/become-a-host/:id"}
          element={
            <ProtectRoute>
              <HostingLayout />
            </ProtectRoute>
          }
        >
          <Route
            path="Basic-Information"
            element={
              <Suspense fallback={<></>}>
                <BasicInfoAboutPlace />
              </Suspense>
            }
          />
          <Route
            path="PriceOfPlace"
            element={
              <Suspense fallback={<></>}>
                <PriceOfPlace />
              </Suspense>
            }
          />
          <Route
            path="DescriptionOfPlace"
            element={
              <Suspense fallback={<></>}>
                <DescriptionOfPlace />
              </Suspense>
            }
          />
          <Route
            path="LocationOfplace"
            element={
              <Suspense fallback={<></>}>
                <LocationOfplace />
              </Suspense>
            }
          />
          <Route
            path="PhotosAboutPlace"
            element={
              <Suspense fallback={<></>}>
                <PhotosAboutPlace />
              </Suspense>
            }
          />
          <Route
            index
            element={
              <Suspense fallback={<></>}>
                <StandOut />
              </Suspense>
            }
          />
          <Route
            path="TitleOfPlace"
            element={
              <Suspense fallback={<></>}>
                <TitleOfPlace />
              </Suspense>
            }
          />
          <Route
            path="ReviewOfPlace"
            element={
              <Suspense fallback={<></>}>
                <ReviewOfPlace />
              </Suspense>
            }
          />
          <Route
            path="InformationOfPlace"
            element={
              <Suspense fallback={<></>}>
                <InformationOfPlace />
              </Suspense>
            }
          />
          <Route
            path="Basic-Offer"
            element={
              <Suspense fallback={<></>}>
                <BasicOfferOfPlace />
              </Suspense>
            }
          />
          {/* about */}
          <Route
            path="About-Place"
            element={
              <Suspense fallback={<></>}>
                <AboutPlace />
              </Suspense>
            }
          />
        </Route>
        <Route
          path={"/dashboard"}
          element={
            <ProtectRoute type={"dashboard"}>
              <DashboardLayout />
            </ProtectRoute>
          }
        >
          <Route
            exact
            path="reservation"
            element={
              <Suspense fallback={<></>}>
                <Reservation />
              </Suspense>
            }
          />
          <Route
            exact
            path="rooms"
            element={
              <Suspense fallback={<Loader />}>
                <Rooms />
              </Suspense>
            }
          />
          <Route
            exact
            path="rooms/:id"
            element={
              <Suspense fallback={<Loader />}>
                <CreateRoom />
              </Suspense>
            }
          />
          <Route
            exact
            path="customers"
            element={
              <Suspense fallback={<Loader />}>
                <Customers />
              </Suspense>
            }
          />
          {/* Settings */}
          <Route
            exact
            index
            element={
              <Suspense fallback={<Loader />}>
                <Statistics />
              </Suspense>
            }
          />

          <Route
            exact
            path="profile/:id"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          />

          <Route
            exact
            path="orders"
            element={
              <Suspense fallback={<Loader />}>
                <Orders />
              </Suspense>
            }
          />
          {/* Reservation */}

          <Route
            exact
            path="rooms/create-room"
            element={
              <Suspense fallback={<Loader />}>
                <CreateRoom />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
