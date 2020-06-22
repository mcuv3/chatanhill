import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./auth-context/auth-context";
import configureChats from "./store/chatReducer";
import configureAuth from "./store/authReducer";
configureChats();
configureAuth();
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
