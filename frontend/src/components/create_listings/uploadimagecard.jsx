import React, { useState } from "react";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
export default function UploadImageCard({ x, index, handleDeleteListUpload }) {
  const [deleteoptions, setDeleteOptions] = useState(false);
  const deleteOptions = () => {
    handleDeleteListUpload(index);
    setDeleteOptions(false);
  };
  return (
    <div>
      <div className="imageWrapper w-100" key={index}>
        <img src={x} alt="" className="image" />
        <div className="imagegradient w-100 h-100"></div>
        {deleteoptions && (
          <div className="options">
            <div
              onClick={deleteOptions}
              className="fs-14 list text-light"
            >
              Delete
            </div>
            <div
              onClick={() => setDeleteOptions(false)}
              className="fs-14 list text-light"
            >
              Cancel
            </div>
          </div>
        )}

        <div
          onClick={() => setDeleteOptions(!deleteoptions)}
          className="icons flex item-center justify-center"
        >
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
}
