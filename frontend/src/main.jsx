import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { store } from "./store";
import ToasterProvider from "./providers/ToasterProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToasterProvider />
      <BrowserRouter>
        <App />
        {/* Vercel does not support socket.io, I will asdd it later */}
        {/* <SocketContextProvider>
          <App />
        </SocketContextProvider> */}
      </BrowserRouter>
    </Provider>
    ,
  </React.StrictMode>
);

//
