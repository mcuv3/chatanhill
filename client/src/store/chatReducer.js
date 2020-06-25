import { initStore } from "./index";
import axios from "../axios-instance";
import moment from "moment";

const initialStore = {
  chat: {
    chats: [],
    activeChatId: null,
    chatView: null,
  },
};

const chatReducer = () => {
  const actions = {
    LOAD_CHATS: (cb, globalState, payload) => {
      axios
        .get("/chat/many")
        .then((res) => {
          cb({
            chat: {
              ...globalState.chat,
              chats: res.data.chats,
            },
          });
        })
        .catch((e) => payload("LOG_OUT"));
    },
    TOGGLE_CHAT_VIEW: (cb, globalState, payload) => {
      const chats = globalState.chat.chats;
      const chat = chats.find((chat) => chat._id === payload.chatId);

      if (chat) {
        cb({
          chat: {
            ...globalState.chat,
            chatView: {
              chatId: chat._id,
              user: chat.users.find((u) => u._id !== globalState.auth.userId),
              messages: chat.messages,
            },
          },
        });
      }
    },
    SEND_MESSAGE: async (cb, globalState, payload) => {
      const userId = globalState.auth.userId;
      const msgUser = payload.msg;
      const chatId = globalState.chat.chatView.chatId;
      const msg = {
        chatId,
        message: msgUser,
      };
      payload.dispatch("SET_MESSAGE", { ...msg });
      const message = {
        author: userId,
        text: msgUser,
      };
      try {
        const res = await axios.post("chat/send", msg);

        const chatViewMessages = [...globalState.chat.chatView.messages];
        const messageSuccess = {
          ...message,
          date: res.data.date,
          status: "SENT",
        };
        chatViewMessages[chatViewMessages.length - 1] = messageSuccess;
        cb({
          chat: {
            chats: globalState.chat.chats.map((c) => {
              if (c._id === chatId)
                c.messages[c.messages.length - 1] = messageSuccess;
            }),
            chatView: {
              messages: chatViewMessages,
              ...globalState.chat.chatView,
            },
            ...globalState.chat,
          },
        });
      } catch (e) {
        const messageError = {
          ...message,
          date: moment().format("h:mm a"),
          status: "ERROR",
        };
        const chatViewMessages = [...globalState.chat.chatView.messages];
        chatViewMessages[chatViewMessages.length - 1] = messageError;
        cb({
          chat: {
            chats: globalState.chat.chats.map((c) => {
              if (c._id === chatId)
                c.messages[c.messages.length - 1] = messageError;
            }),
            chatView: {
              messages: chatViewMessages,
              ...globalState.chat.chatView,
            },
            ...globalState.chat,
          },
        });
      }
    },
    SET_MESSAGE: (cb, globalState, payload) => {
      const newChatViewMessages = [...globalState.chat.chatView.messages];
      const message = {
        author: globalState.auth.userId,
        date: moment().format("h:mm a"),
        status: "PLACED",
        text: payload.message,
      };
      newChatViewMessages.push(message);
      cb({
        chat: {
          chats: globalState.chat.chats.map((c) => {
            if (c._id === payload.chatId) c.messages.push(message);
          }),
          chatView: {
            messages: newChatViewMessages,
            ...globalState.chat.chatView,
          },
          ...globalState.chat,
        },
      });
    },
    MESSAGE_RECEIVED: (cb, globalState, payload) => {
      let newChatViewMessages = [];
      let chatViewId = "";
      if (globalState.chat.chatView) {
        newChatViewMessages = [...globalState.chat.chatView.messages];
        chatViewId = globalState.chat.chatView.chatId;
      }
      const message = { ...payload.message, status: "RECEIVED" };
      const chatId = payload.chatId;

      if (chatId === chatViewId) newChatViewMessages.push(message);

      cb({
        chat: {
          chats: globalState.chat.chats.map((c) => {
            if (c._id === payload.chatId) c.messages.push(message);
          }),
          chatView: {
            messages: newChatViewMessages,
            ...globalState.chat.chatView,
          },
          ...globalState.chat,
        },
      });
    },
  };

  initStore(actions, initialStore);
};

export default chatReducer;
