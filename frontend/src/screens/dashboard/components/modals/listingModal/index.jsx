import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { offListingModal } from "@/features/modals/modalSlice";
import { slideRight } from "@/constants/utils/framer";
import { createRoomSchema } from "./validator";
import { FormField } from "@/components/ui/form";
import { ListingFormInput } from "./input";

const CreateListingModal = () => {
  const { listingmodal } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      country: "",
      guests: "",
      bedroom: "",
      bathroom: "",
      images: [],
      title: "",
      description: "",
      listingType: "RENT",
      type: "",
      price: "",
      features: [],
      cautionfee: "",
      latitude: "",
      longitude: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log("lisiting data:", {
        data,
      });
      // const result = await createRoom(data).unwrap();
      dispatch(offListingModal(""));
      reset();
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleFileChange = async (file) => {
    if (file) {
      const imageUrl = await convertFileToUrl(file);
      methods.setValue("images", [...methods.getValues("images"), imageUrl]);
    }
  };

  const convertFileToUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      onClick={() => dispatch(offListingModal(""))}
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-end z-50 p-4"
    >
      <FormProvider {...methods}>
        <motion.div
          variants={slideRight}
          initial="initial"
          animate={listingmodal ? "enter" : "exit"}
          exit={"exit"}
          className="bg-[#fff] w-full rounded-xl overflow-hidden relative flex flex-col lg:w-[600px] h-[95vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b w-full items-center justify-center h-[80px] flex flex-col gap-8 px-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex pl-4 gap-2 items-center">
                <h4 className="text-xl lg:text-xl font-semibold">
                  Create Listings
                  <span className="block text-sm text-gray-400 font-normal">
                    Develop various home types of lisitng for your shop
                  </span>
                </h4>
              </div>
              <button
                onClick={() => dispatch(offListingModal(""))}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm hover:bg-[#ddd]"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div
            style={{
              height: "calc(95vh - 80px)",
            }}
            className="w-full flex flex-col gap-2 justify-between"
          >
            <div
              style={{
                height: "calc(95vh - 80px - 70px)",
              }}
              className="px-4 w-full overflow-auto"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="w-full p-8 flex flex-col gap-4">
                  <FormField
                    name="title"
                    render={() => (
                      <ListingFormInput
                        control={methods.control}
                        name="title"
                        label="Listing Title"
                        placeholder={"A short title for your listing"}
                        required
                      />
                    )}
                  />
                  <FormField
                    name="description"
                    render={() => (
                      <ListingFormInput
                        control={methods.control}
                        name="description"
                        label="Description"
                        type="textarea"
                        required
                      />
                    )}
                  />

                  <FormField
                    name="images"
                    render={() => (
                      <ListingFormInput
                        control={methods.control}
                        name="images"
                        label="Images"
                        type="file"
                        onFileChange={handleFileChange}
                      />
                    )}
                  />

                  <div className="w-full grid grid-cols-2 gap-4">
                    <FormField
                      name="country"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="country"
                          placeholder="Choose your country"
                          label="Country"
                          required
                        />
                      )}
                    />
                    <FormField
                      name="bedroom"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="bedroom"
                          label="Bedroom"
                          placeholder="Select number of bedroom"
                          type="number"
                          required
                        />
                      )}
                    />
                    <FormField
                      name="bathroom"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="bathroom"
                          placeholder="Select number of bathroom"
                          label="Bathroom"
                          type="number"
                          required
                        />
                      )}
                    />
                    <FormField
                      name="type"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="type"
                          label="Type"
                          placeholder="Choose the type of listing"
                          type="select"
                          options={Object.values({
                            VILLA: "VILLA",
                            HOTEL: "HOTEL",
                            APARTMENT: "APARTMENT",
                            STAY: "STAY",
                          }).map((value) => ({ label: value, value }))}
                          required
                        />
                      )}
                    />
                    <FormField
                      name="listingType"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="listingType"
                          label="Listing Type"
                          type="select"
                          options={Object.values({
                            SALE: "SALE",
                            RENT: "RENT",
                            LEASE: "LEASE",
                          }).map((value) => ({ label: value, value }))}
                          required
                        />
                      )}
                    />
                    <FormField
                      name="price"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="price"
                          label="Price"
                          type="number"
                        />
                      )}
                    />
                    <FormField
                      name="cautionfee"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="cautionfee"
                          label="Caution Fee"
                          type="number"
                        />
                      )}
                    />

                    <FormField
                      name="features"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="features"
                          label="Features"
                          type="text"
                          options={[]}
                        />
                      )}
                    />
                    <FormField
                      name="latitude"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="latitude"
                          label="Latitude"
                        />
                      )}
                    />
                    <FormField
                      name="longitude"
                      render={() => (
                        <ListingFormInput
                          control={methods.control}
                          name="longitude"
                          label="Longitude"
                        />
                      )}
                    />
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <div className="text-red-500 text-sm">
                      {Object.values(errors)
                        .map((error) => error.message)
                        .join(", ")}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="border-t sticky z-[100] bottom-0 h-[80px] w-full flex flex-col gap-8 p-4 px-6">
              <div className="flex justify-between items-center w-full">
                <button
                  aria-label="Close modal"
                  onClick={() => dispatch(offListingModal(""))}
                  className="btn btn_2 bg-white px-4 p-3 border text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={false} // Adjust based on your loading state
                  aria-label="Perform action"
                  className="btn px-4 py-3 text-white text-sm disabled:opacity-50"
                >
                  Create Listing
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </FormProvider>
    </div>
  );
};

export default CreateListingModal;
