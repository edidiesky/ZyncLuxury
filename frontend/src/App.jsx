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
  Starting,
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
              <Suspense fallback={<></>}>
                <HomeWrapper />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<></>}>
                <SearchWrapper />
              </Suspense>
            }
          />
          <Route
            path="room/:id"
            element={
              <Suspense fallback={<></>}>
                <SingleWrapper />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<></>}>
                <ProfileWrapper />
              </Suspense>
            }
          />

          <Route
            path="savedhomes"
            element={
              <Suspense fallback={<></>}>
                <SavedWrapper />
              </Suspense>
            }
          />
          <Route
            path="trips"
            element={
              <Suspense fallback={<></>}>
                <TripsWrapper />
              </Suspense>
            }
          />
          <Route
            path="reservation/payment/:id"
            element={
              <Suspense fallback={<></>}>
                <PaymentWrapper />
              </Suspense>
            }
          />
          <Route
            path="payment-success/:id"
            element={
              <Suspense fallback={<></>}>
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
            path="stand-out"
            element={
              <Suspense fallback={<></>}>
                <StandOut />
              </Suspense>
            }
          />
          <Route
            path="floor-plan"
            element={
              <Suspense fallback={<></>}>
                <BasicInfoAboutPlace />
              </Suspense>
            }
          />
          <Route
            path="price"
            element={
              <Suspense fallback={<></>}>
                <PriceOfPlace />
              </Suspense>
            }
          />
          <Route
            path="structure"
            element={
              <Suspense fallback={<></>}>
                <DescriptionOfPlace />
              </Suspense>
            }
          />
          <Route
            path="location"
            element={
              <Suspense fallback={<></>}>
                <LocationOfplace />
              </Suspense>
            }
          />
          <Route
            path="photos"
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
                <Starting />
              </Suspense>
            }
          />
          <Route
            path="title"
            element={
              <Suspense fallback={<></>}>
                <TitleOfPlace />
              </Suspense>
            }
          />
          <Route
            path="reviews/:apartmentid"
            element={
              <Suspense fallback={<></>}>
                <ReviewOfPlace />
              </Suspense>
            }
          />
          <Route
            path="description"
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
            path="about-your-place"
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
              <Suspense fallback={<></>}>
                <Rooms />
              </Suspense>
            }
          />
          <Route
            exact
            path="rooms/:id"
            element={
              <Suspense fallback={<></>}>
                <CreateRoom />
              </Suspense>
            }
          />
          <Route
            exact
            path="customers"
            element={
              <Suspense fallback={<></>}>
                <Customers />
              </Suspense>
            }
          />
          {/* Settings */}
          <Route
            exact
            index
            element={
              <Suspense fallback={<></>}>
                <Statistics />
              </Suspense>
            }
          />

          <Route
            exact
            path="profile/:id"
            element={
              <Suspense fallback={<></>}>
                <Settings />
              </Suspense>
            }
          />

          <Route
            exact
            path="orders"
            element={
              <Suspense fallback={<></>}>
                <Orders />
              </Suspense>
            }
          />
          {/* Reservation */}

          <Route
            exact
            path="rooms/create-room"
            element={
              <Suspense fallback={<></>}>
                <CreateRoom />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
