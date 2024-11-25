import React, { useState, createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
export const SocketContext = createContext();
const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser } = useSelector((store) => store.auth);

  useEffect(() => {
    setSocket(io.connect(`${import.meta.env.VITE_API_BASE_URL}`));
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket?.emit("addUserId", currentUser?.id);
      socket?.on("getAllConnectedUser", (users) => {
        console.log(users);
      });
    }
  }, [socket, currentUser]);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
