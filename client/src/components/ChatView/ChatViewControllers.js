import React from "react";
import { Stack, Heading, Flex, Icon, Avatar } from "@chakra-ui/core";
import classes from "../util/hover.css";
const ChatViewControllers = (props) => {
  return (
    <Stack
      isInline
      bg="#4FD1C5"
      p="0.6rem"
      borderBottom="1px"
      borderColor="#2C7A7B"
    >
      <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
      <Heading as="h6" size="xs" mt="0.7rem">
        mcuve
      </Heading>
      <Flex ml="auto" justify="space-around" align="center" width="12%">
        <Icon name="search-2" size="1rem" className={classes.hover} />
        <Icon name="add" size="1rem" className={classes.hover} />
        <Icon name="drag-handle" size="1rem" className={classes.hover} />
      </Flex>
    </Stack>
  );
};

export default ChatViewControllers;
