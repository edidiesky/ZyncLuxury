import React from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { toast } from "sonner";
export default function CustomToast({ message, type }) {
  const Icon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="toast-icon success" />;
      case "error":
        return <FaExclamationCircle className="toast-icon error" />;
      case "info":
      default:
        return <FaInfoCircle className="toast-icon info" />;
    }
  };
  return (
    <div className={`custom-toast border ${type}`}>
      <Icon />
      <span className="toast-message bold">{message}</span>
    </div>
  );
}

export const showCustomToast = (
  message,
  type
) => {
  toast.custom(() => <CustomToast message={message} type={type} />);
};
