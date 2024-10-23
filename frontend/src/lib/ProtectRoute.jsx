import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectRoute = ({ children, type }) => {
  // const navigate = useNavigate()
  const { currentUser } = useSelector((store) => store.auth);
  // console.log(currentUser.role);
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  if (type === "dashboard" && currentUser?.role === "USER") {
    return <Navigate to="/" />;
  }

  return children;
};
