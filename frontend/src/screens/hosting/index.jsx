import { lazy } from "react";

const AboutPlace = lazy(() => import("./AboutPlace"));
const BasicInfoAboutPlace = lazy(() => import("./BasicInfoAboutPlace"));
const BasicOfferOfPlace = lazy(() => import("./BasicOfferOfPlace"));
const DescriptionOfPlace = lazy(() => import("./DescriptionOfPlace"));
const InformationOfPlace = lazy(() => import("./InformationOfPlace"));
const LocationOfplace = lazy(() => import("./LocationOfplace"));
const PhotosAboutPlace = lazy(() => import("./PhotosAboutPlace"));
const ReviewOfPlace = lazy(() => import("./ReviewOfPlace"));
const PriceOfPlace = lazy(() => import("./PriceOfPlace"));
const StandOut = lazy(() => import("./StandOut"));
const TitleOfPlace = lazy(() => import("./TitleOfPlace"));
// StandOut

export {
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
};
