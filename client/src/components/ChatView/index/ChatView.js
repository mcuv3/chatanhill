import React, { useState } from "react";
import { Grid } from "@chakra-ui/core";
import Controllers from "../ChatViewControllers";
import Messages from "../Messages";
import ChatInput from "../InputChat";
import { useStore } from "../../../store/index";
import Default from "../Default";
const ChatView = (props) => {
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useStore();

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
          setNewMessage={message}
          resetMessage={() => setMessage(null)}
          messages={state.chat.chatView.messages}
          currentUser={state.auth.userId}
        />
        <ChatInput
          setNewMessage={(msg) => setMessage({ user: 1, message: msg })}
        />
      </Grid>
    );
  }

  return view;
};

export default ChatView;
