import React, { useState } from "react";

const initialState = {
  user: {
    username: "",
    profilePicture: "images/profilePictures/default.jpg",
  },
  token: null,
  userId: "",
  chats: [],
  logIn: (response) => {},
  logOut: () => {},
};

export const authContext = React.createContext(initialState);

export default (props) => {
  const [authCredentials, setAuthCredentials] = useState(initialState);
  const logIn = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.userId);
    localStorage.setItem("username", response.username);
    setAuthCredentials({
      user: {
        username: response.username,
        profilePicture: response.profilePicture,
      },
      token: response.token,
      userId: response.userId,
      chats: response.chats,
    });
    autoLogOut(response.expiresIn);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAuthCredentials(initialState);
  };
  const autoLogOut = (timeSeconds) => {
    setTimeout(() => {
      logOut();
    }, timeSeconds * 100);
  };

  const checkCredentials = () => {
    setAuthCredentials((prevState) => {
      return {
        ...prevState,
        token: localStorage.getItem("token"),
        user: {
          username: localStorage.getItem("username"),
        },
        userId: localStorage.getItem("userId"),
      };
    });
  };

  return (
    <authContext.Provider
      value={{
        token: authCredentials.token,
        userId: authCredentials.userId,
        user: authCredentials.user,
        chats: authCredentials.chats,
        logIn: logIn,
        logOut: logOut,
        checkCredentials: checkCredentials,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
