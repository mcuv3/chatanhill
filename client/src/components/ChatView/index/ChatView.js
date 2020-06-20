import React, { useState } from "react";
import { Grid } from "@chakra-ui/core";
import Controllers from "../ChatViewControllers";
import Messages from "../Messages";
import ChatInput from "../InputChat";

const ChatView = (props) => {
  const [message, setMessage] = useState(null);

  return (
    <Grid templateColumns="1fr" templateRows="4rem auto 2.6rem" height="100%">
      <Controllers />
      <Messages setNewMessage={message} resetMessage={() => setMessage(null)} />
      <ChatInput
        setNewMessage={(msg) => setMessage({ user: 1, message: msg })}
      />
    </Grid>
  );
};

export default ChatView;
