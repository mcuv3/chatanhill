import React from "react";
import { Text, Stack, Avatar, Heading, Flex } from "@chakra-ui/core";
import classes from "./ChatItem.css";

const ChatItem = (props) => {
  return (
    <Stack
      isInline
      spacing={4}
      p="0.6rem"
      border="1px"
      borderColor="#E6FFFA"
      className={classes.avatar}
    >
      <Avatar>
        <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
      </Avatar>

      <Flex direction="column" width="100%">
        <Heading as="h6" size="xs">
          Mcuve
        </Heading>
        <Text fontSize="sm">Hi how are you?</Text>
      </Flex>

      {/* You can also change the borderColor and bg of the badge */}
    </Stack>
  );
};

export default ChatItem;
