import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FooterHosting from "./footer";
import UploadImageCard from "./uploadimagecard";
import { useDispatch } from "react-redux";
import { handleListingImage } from "@/features/room/roomSlice";
import Loader from "../home/loader";
import toast from "react-hot-toast";
import Upload from "@/assets/svg/upload";
export default function PhotosofPlace() {
  const { currentUser } = useSelector((store) => store.auth);
  const { listing } = useSelector((store) => store.room);
  const dispatch = useDispatch();
  const [uploadimage, setUploadImage] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    // get the file
    const file = e.target.files;
    setUploading(true);
    // create formdata
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    console.log(formData);

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

      setUploadImage([...data?.urls]);
      setUploading(false);
      dispatch(handleListingImage(data.urls));

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

  useEffect(() => {
    if (listing.images.length > 0) {
      setUploadImage(listing.images);
    }
  }, [listing, setUploadImage]);

  const handleDeleteListUpload = (listindex) => {
    const result = uploadimage.filter((x, index) => index !== listindex);
    setUploadImage(result);
  };
  return (
    <>
      <PhotosofPlaceContainer>
        {uploading && <Loader />}
        <div className="aboutCenter flex flex-col gap-8 justify-center items-center w-[90%]  max-w-custom mx-auto">
          <h2 className="family2 w-full text-start text-dark">
            Add some photos of your boat
            <span className="block py-1 text-sm md:text-base regular text-grey">
              You'll need 5 photos to get started. You can add more or make
              changes later.
            </span>
          </h2>
          {!uploadimage.length > 0 ? (
            <div className="flex items-center justify-center w-[90%]  max-w-custom mx-auto">
              <label
                htmlFor="upload"
                className="uploadWrapper auto flex items-center justify-center flex-col gap-1"
              >
                <Upload />
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
                <h4 className="text-lg family2">
                  Upload your photos here
                  <span className="regular block text-center fs-16">
                    Choose at least 5 photos
                  </span>
                </h4>
              </label>
            </div>
          ) : (
            <div className="upload grid md:grid-cols-2 w-[90%] gap-4 max-w-custom mx-auto">
              {uploadimage.map((x, index) => {
                return (
                  <UploadImageCard
                    index={index}
                    x={x}
                    handleDeleteListUpload={handleDeleteListUpload}
                  />
                );
              })}
            </div>
          )}
        </div>
      </PhotosofPlaceContainer>
      <FooterHosting
        active={listing.images.length >= 4 || uploadimage?.length >= 4}
        prev={`${currentUser?.id}/stand-out`}
        next={`${currentUser?.id}/title`}
      />
    </>
  );
}

const PhotosofPlaceContainer = styled.div`
  width: 100%;
  padding-bottom: 6rem;
  @media (max-width: 780px) {
    padding-top: 2rem;
  }
  .list1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
  }
  h4 {
    @media (max-width: 580px) {
      font-size: 20px;
      text-align: center;
      span {
        font-size: 14px;
      }
    }
  }
  .options {
    background-color: #fff;
    position: absolute;
    cursor: pointer;
    top: 10%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    right: 5%;
    width: 150px;
    z-index: 40;
    border-radius: 4px;
    /* padding: 1rem 0; */
    .list {
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      transition: all 0.4s;
      padding: 0.6rem 2rem;
      &:hover {
        background-color: #fafafa;
      }
      /* padding-bottom: 0.5rem; */
    }
  }
  .icons {
    width: 2.4rem;
    height: 2.4rem;
    background-color: #fff;
    position: absolute;
    cursor: pointer;
    top: 10%;
    border-radius: 50%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    right: 5%;
    transition: all 0.4s;
    z-index: 30;
    &:hover {
      transform: scale(1.08) translateY(-4px);
      box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3);
    }
    svg {
      font-size: 20px;
    }
  }
  .imageWrapper {
    height: 30rem;
    position: relative;
    border-radius: 4px;
    @media (max-width: 780px) {
      height: 25rem;
    }
    .imagegradient {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 20;
      border-radius: inherit;
    }
    .images {
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: inherit;
      object-fit: cover;
    }
  }
  .upload {
    width: 65%;
    padding: 0 3rem;
    @media (max-width: 780px) {
      width: 90%;
      padding: 0;
    }
  }
  .uploadWrapper {
    width: 65%;
    border: 1px dashed rgba(0, 0, 0, 1);
    padding: 4rem 3rem;
    height: 100%;
    cursor: pointer;
    @media (max-width: 780px) {
      width: 90%;
    }
  }
  .aboutCenter {
    @media (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
    }
  }
  .images {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
  }
  h2 {
    font-size: 35px;
    line-height: 1.2;
    width: 60%;

    @media (max-width: 780px) {
      /* font-size: 40px; */
      font-size: 30px;
    }
    @media (max-width: 780px) {
      width: 90%;
    }
  }
`;
