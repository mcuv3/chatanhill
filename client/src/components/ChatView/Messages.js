import React, { useEffect, useRef, useState } from "react";
import { Stack, Box, Button } from "@chakra-ui/core";
import classes from "../util/message.css";

const Messages = (props) => {
  const messagesEnd = useRef();
  const [messages, setMessages] = useState(props.messages);

  useEffect(() => {
    messagesEnd.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (props.setNewMessage) {
      addMessage(props.setNewMessage);
      props.resetMessage();
    }
  }, [props.setNewMessage]);

  const addMessage = (message) => {
    setMessages((prevMessages) => {
      return [...prevMessages, message];
    });
  };
  console.log(props.messages);

  return (
    <Stack p="1rem 10%" overflowY="scroll">
      {messages.map((message, index) => {
        if (message.author !== props.currentUser)
          return (
            <Box
              mr="auto"
              bg="#319795"
              p="0.5rem"
              borderRadius="8px 8px 8px 0"
              maxWidth="80%"
              className={classes.message}
              ref={index === messages.length - 1 ? messagesEnd : null}
              key={index}
            >
              {message.text}
            </Box>
          );
        else
          return (
            <Box
              ml="auto"
              bg="#4FD1C5"
              p="0.5rem"
              borderRadius="8px 8px 0 8px"
              maxWidth="80%"
              className={classes.message}
              ref={index === messages.length - 1 ? messagesEnd : null}
              key={index}
            >
              {message.text}
            </Box>
          );
      })}
    </Stack>
  );
};

export default Messages;
