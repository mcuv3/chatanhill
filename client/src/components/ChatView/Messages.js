import React, { useEffect, useRef, useState } from "react";
import { Stack, Box, Icon, Flex, Text } from "@chakra-ui/core";
import { BsCheckAll, BsCompass, BsCheck } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { MdError } from "react-icons/md";

import classes from "../util/message.css";

const Messages = (props) => {
  const messagesEnd = useRef();
  const [messages, setMessages] = useState(props.messages);

  useEffect(() => {
    setMessages(props.messages);
  }, [props.messages]);

  useEffect(() => {
    if (messagesEnd.current) messagesEnd.current.scrollIntoView();
  }, [messages]);

  return (
    <Stack p="1rem 10%" overflowY="scroll">
      {messages.map((message, index) => {
        if (message.author !== props.currentUser)
          return (
            <Box
              position="relative"
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
        else {
          let icon;
          switch (message.status) {
            case "PLACED":
              icon = BsCompass;
              break;
            case "SENT":
              icon = BsCheck;
              break;
            case "RECEIVED":
              icon = BsCheckAll;
              break;
            case "SEEN":
              icon = FcCheckmark;
              break;
            case "ERROR":
              icon = MdError;
              break;
            default:
              icon = BsCompass;
              break;
          }
          return (
            <Flex
              isInline
              ml="auto"
              bg={message.status === "ERROR" ? "#FED7D7" : "#4FD1C5"}
              p="0.5rem"
              borderRadius="8px 8px 0 8px"
              maxWidth="80%"
              className={classes.message}
              ref={index === messages.length - 1 ? messagesEnd : null}
              key={index}
              display={{ sm: "block", md: "flex" }}
              color={message.status === "ERROR" ? "#E53E3E" : "black.200"}
            >
              {message.text}
              <Flex isInline align="flex-end" justify="flex-end" ml="1.5rem">
                <Icon as={icon} textAlign="center" pt="0.2rem" />
                <Text fontSize="xs" color="black.200">
                  {message.date}
                </Text>
              </Flex>
            </Flex>
          );
        }
      })}
    </Stack>
  );
};

export default Messages;
