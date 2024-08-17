import React, { useCallback, useState } from "react";
import axios from "axios";
import { BiPlus, BiSearch, BiUpload } from "react-icons/bi";
import toast from "react-hot-toast";
import Loader from "@/components/home/loader";
import { RxCross1 } from "react-icons/rx";
const ImageUpload = ({ images, setImages }) => {
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleFileUpload = async (e) => {
    // get the file
    const file = e.target.files;
    setUploading(true);
    // create formdata
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/upload`,
        formData,
        config
      );

      setImages(data?.urls);
      setAlert(true);
      setUploading(false);
      toast.success("Image uploaded succesfully!!");
    } catch (error) {
      setUploading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  const handleDeleteImage = (index) => {
    const newimages = images.filter((data,imageindex) => imageindex !== index)
    console.log(newimages)
    setImages([...newimages])
  }
  return (
    <div className="w-full bg-[#fff] border p-6 px-2 rounded-[10px]">
      {uploading && <Loader />}
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-8">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-2xl font-booking_font4 font-bold">
            Room Images
            <span className="font-normal font-booking_font text-base block">
              Share what makes your rooms images special.
            </span>
          </h4>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4 text-sm font-booking_font4 font-bold">
            <span>Photos</span>
            {images?.length > 0 ? (
              <div className="w-full flex flex-col justify-center items-center gap-8">
               <div className="w-full grid grid-cols-4 gap-2">
               {images?.map((image, index) => {
                  return (
                    <div className="w-full relative flex items-center justify-center h-32 border p-4 border-[rgba(0,0,0,.3)] cursor-pointer">
                      <img alt="Cotion" loading="lazy" className="h-[80%] absolute w-[80%] object-cover" src={image} />
                      <div onClick={() => handleDeleteImage(index)} className="w-10 h-10 hover:bg-[#eee] rounded-full bg-white absolute top-2 right-2 flex items-center justify-center shadow-lg text-base">
                        <RxCross1 />
                      </div>
                    </div>
                  );
                })}
               </div>
                <label
                  htmlFor="upload"
                  className="w-full cursor-pointer bg-[#fafafa] rounded-lg flex gap-4 items-center justify-center h-[60px]"
                >
                  <div className="w-10 h-10 hover:bg-[#eee] rounded-full bg-white border flex items-center justify-center shadow-lg text-base">
                    <BiPlus />
                  </div>
                  Select the photos for your room
                  <input
                    type="file"
                    id="upload"
                    placeholder="Gig Image"
                    autoComplete="off"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    multiple
                    className="w-full"
                  />
                </label>

              </div>
            ) : (
              <label
                htmlFor="upload"
                className="w-full bg-[#fafafa] rounded-lg flex items-center justify-center h-[300px]"
              >
                <div
                  style={{ transition: "all .4s" }}
                  className="text-base font-bold cursor-pointer flex items-center shadow-sm hover:shadow-lg border rounded-lg justify-center bg-white p-4 gap-3 font-booking_font_bold"
                >
                  <input
                    type="file"
                    id="upload"
                    placeholder="Gig Image"
                    autoComplete="off"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    multiple
                    className="w-full"
                  />
                  <BiUpload fontSize={"24px"} /> Select the photos for your room
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
