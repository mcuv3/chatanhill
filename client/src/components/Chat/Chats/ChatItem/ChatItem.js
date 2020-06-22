import React from "react";
import { Text, Stack, Avatar, Heading, Flex } from "@chakra-ui/core";
import classes from "./ChatItem.css";
import { useStore } from "../../../../store/index";

const ChatItem = (props) => {
  const dispatch = useStore()[1];
  const changeChatView = () => {
    dispatch("TOGGLE_CHAT_VIEW", { chatId: props.id });
  };
  return (
    <Stack
      isInline
      spacing={4}
      p="0.6rem"
      border="1px"
      borderColor="#E6FFFA"
      className={classes.avatar}
      onClick={changeChatView}
    >
      <Avatar>
        <Avatar name="Prosper Otemuyiwa" src={props.user.profilePicture} />
      </Avatar>

      <Flex direction="column">
        <Heading as="h6" size="xs" color="#2C7A7B">
          {props.user.username}
        </Heading>
        <Text fontSize="sm" color="#319795">
          {props.lastMessage ? props.lastMessage.text.slice(0, 25) : null}
        </Text>
      </Flex>
      <Flex alignSelf="flex-end" ml="auto">
        <Text fontSize="xs" color="gray.400">
          {props.lastMessage ? props.lastMessage.date : null}
        </Text>
      </Flex>
    </Stack>
  );
};

export default ChatItem;
