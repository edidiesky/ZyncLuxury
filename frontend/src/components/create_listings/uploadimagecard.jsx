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
      <div className="w-full h-[300px] p-3 border rounded-md relative" key={index}>
        <img src={x} alt="" className="h-full w-full object-cover" />
        <div className="imagegradient w-full h-full"></div>
        {deleteoptions && (
          <div className="options">
            <div
              onClick={deleteOptions}
              className="text-base list regular"
            >
              Delete
            </div>
            <div
              onClick={() => setDeleteOptions(false)}
              className="text-base list regular"
            >
              Cancel
            </div>
          </div>
        )}

        <div
          onClick={() => setDeleteOptions(!deleteoptions)}
          className="icons flex items-center justify-center"
        >
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
}
