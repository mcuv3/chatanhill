import { initStore } from "./index";

const initialState = {
  auth: {
    user: {
      username: "",
      profilePicture: "images/profilePictures/default.jpg",
    },
    token: null,
    userId: "",
    chats: [],
  },
};

const configureAuth = () => {
  const actions = {
    LOG_IN: (cb, globalState, payload) => {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload.userId);
      localStorage.setItem("username", payload.username);
      autoLogOut(payload.expiresIn);
      cb({
        auth: {
          ...globalState.auth,
          user: {
            username: payload.username,
            profilePicture: payload.profilePicture,
          },
          token: payload.token,
          userId: payload.userId,
        },
        chat: {
          ...globalState.chat,
          chats: payload.chats,
          chatView: null,
        },
      });
    },
    LOG_OUT: (cb) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      cb({
        auth: initialState,
      });
    },
    CHECK_CREDENTIALS: (cb, globalState, payload) => {
      if (localStorage.getItem("token")) payload("LOAD_CHATS");
      cb({
        auth: {
          ...globalState.auth,
          token: localStorage.getItem("token"),
          user: {
            username: localStorage.getItem("username"),
          },
          userId: localStorage.getItem("userId"),
        },
      });
    },
  };

  const autoLogOut = (timeSeconds) => {
    setTimeout(() => {
      actions.LOG_OUT();
    }, timeSeconds * 1000);
  };

  initStore(actions, initialState);
};

export default configureAuth;
