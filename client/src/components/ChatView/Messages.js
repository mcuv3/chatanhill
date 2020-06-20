import React, { useEffect, useRef, useState } from "react";
import { Stack, Box, Button } from "@chakra-ui/core";
import classes from "../util/message.css";
const currentUser = 1;

const Messages = (props) => {
  const messagesEnd = useRef();
  const [messages, setMessages] = useState([
    { user: 1, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 1, message: "Hi how are you?" },
    { user: 1, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 1, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 1, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 1, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 1, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    { user: 2, message: "Hi how are you?" },
    {
      user: 1,
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis enim debitis at cum consequuntur animi doloremque ad magnam earum perferendis nesciunt iusto vitae ducimus sequi iste natus consectetur ut veniam, reprehenderit corrupti molestiae. Non impedit a exercitationem totam assumenda! Incidunt.",
    },
    {
      user: 2,
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis enim debitis at cum consequuntur animi doloremque ad magnam earum perferendis nesciunt iusto vitae ducimus sequi iste natus consectetur ut veniam, reprehenderit corrupti molestiae. Non impedit a exercitationem totam assumenda! Incidunt.",
    },
  ]);

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

  return (
    <Stack p="1rem 10%" overflowY="scroll">
      {messages.map((message, index) => {
        if (message.user !== currentUser)
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
              {message.message}
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
              {message.message}
            </Box>
          );
      })}
    </Stack>
  );
};

export default Messages;
