import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/core";
import Controllers from "../ChatViewControllers";
import Messages from "../Messages";
import ChatInput from "../InputChat";
import { useStore } from "../../../store/index";
import Default from "../Default";
import io from "socket.io-client";
const ChatView = (props) => {
  const [state, dispatch] = useStore();
  const sendMessage = (msg) => {
    dispatch("SEND_MESSAGE", { msg, dispatch });
  };

  let view = (
    <Grid templateColumns="1fr" height="100%">
      <Default />
    </Grid>
  );
  if (state.chat.chatView) {
    view = (
      <Grid templateColumns="1fr" templateRows="4rem auto 2.6rem" height="100%">
        <Controllers user={state.chat.chatView.user} />
        <Messages
          messages={state.chat.chatView.messages}
          currentUser={state.auth.userId}
        />
        <ChatInput setNewMessage={sendMessage} />
      </Grid>
    );
  }

  return view;
};

export default ChatView;
