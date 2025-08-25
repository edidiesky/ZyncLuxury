import express from "express";
import path from "path";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.WEB_ORIGIN,
  },
});

import { errorHandler, NotFound } from "./middleware/error-handler.js";

app.use(
  cors({
    origin: process.env.WEB_ORIGIN,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

import Auth from "./routes/authRoute.js";
import userAuth from "./routes/userRoute.js";
import roomRoute from "./routes/roomRoutes.js";
import reservationRoute from "./routes/reservationsRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import StatRoute from "./routes/statRoute.js";
import FavouritesRoute from "./routes/favouriteRoute.js";
import NotificationRoutes from "./routes/notificationRoutes.js";
import ConversationRoute from "./routes/conversationRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
// notificationRoutes

app.use("/api/v1/auth", Auth);
app.use("/api/v1/user", userAuth);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/reservation", reservationRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/payment", orderRoute);
app.use("/api/v1/stat", StatRoute);
app.use("/api/v1/favourites", FavouritesRoute);
app.use("/api/v1/notification", NotificationRoutes);
app.use("/api/v1/conversation", ConversationRoute);
app.use("/api/v1/message", messageRoute);
// // Middlewares
app.use(NotFound);
app.use(errorHandler);

// function 

let OnlineUsers = [];
const addUserId = (userId, socketId) => {
  // check if the object: {yserId, socketId} is being found in the usres array
  // if not found add it to the OnlineUsers array
  const userExits = OnlineUsers.find((user) => user.userId === userId);
  if (!userExits) {
    OnlineUsers.push({ userId, socketId });
  }
};

const RemoveUser = (socketId) => {
  // check if the object: {yserId, socketId} is being found in the usres array
  // if not found add it to the OnlineUsers array
  OnlineUsers = OnlineUsers?.filter((user) => user?.socketId !== socketId);
};

const getASpecificUser = (userId) => {
  // console.log(OnlineUsers)

  // return OnlineUsers?.filter((obj) => obj.userId === userId)
  const newuser = OnlineUsers.find((user) => user.userId === userId);
  return newuser;
};

io.on("connection", (socket) => {
  console.log("a user connected");

  // io.emit('message','Connected form the backend and testing sending of the data form the socket server')
  socket.on("addUserId", (id) => {
    addUserId(id, socket?.id);
    io.emit("getAllConnectedUser", OnlineUsers);
  });

  socket.on("sendMessage", ({ receiverid, ...data }) => {
    // get the specific usre u intend to send the message to
    const newuser = getASpecificUser(receiverid);
    // console.log(newuser);
    // console.log(newuser?.socketId)
    console.log({ receiverid });
    if (newuser?.socketId) {
      io.to(newuser?.socketId).emit("getMessage", {
        receiverid,
        ...data,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    RemoveUser(socket?.id);
    io.emit("getAllConnectedUser", OnlineUsers);
  });
});

// addUserId(id, socket?.id)
server.listen(4000, () => {
  console.log("server is listening on port 4000");
});
