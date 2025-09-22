import CreateListingModal from "@/screens/dashboard/components/modals/listingModal";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";

export default function ModalProvider() {
  const { listingmodal } = useSelector((store) => store.modal);

  return (
    <>
      <AnimatePresence mode="wait">
        {listingmodal && <CreateListingModal />}
      </AnimatePresence>
    </>
  );
}
