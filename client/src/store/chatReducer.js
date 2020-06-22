import { initStore } from "./index";
import axios from "../axios-instance";

const initialStore = {
  chat: {
    chats: [],
    activeChatId: null,
  },
};

const chatReducer = () => {
  const actions = {
    LOAD_CHATS: (cb, globalState, payload) => {
      console.log("LOAD_CHATS");
      axios
        .get("/chat/many")
        .then((res) => {
          console.log(res);
          cb({
            chat: {
              ...globalState.chat,
              chats: res.data.chats,
            },
          });
        })
        .catch((e) => console.log(e));
    },
    TOGGLE_CHAT_VIEW: (cb, globalState, payload) => {
      const chats = globalState.chat.chats;
      console.log(chats);
      const chat = chats.find((chat) => chat._id === payload.chatId);

      if (chat) {
        console.log(chat);
        cb({
          chat: {
            ...globalState.chat,
            chatView: {
              user: chat.users.find((u) => u._id !== globalState.auth.userId),
              messages: chat.messages,
            },
          },
        });
      }
    },
  };

  initStore(actions, initialStore);
};

export default chatReducer;
