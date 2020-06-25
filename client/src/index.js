import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureChats from "./store/chatReducer";
import configureAuth from "./store/authReducer";
configureChats();
configureAuth();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
