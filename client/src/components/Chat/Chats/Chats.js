import React from "react";
import { Stack } from "@chakra-ui/core";
import ChatItem from "./ChatItem/ChatItem";

const Chats = (props) => {
  return (
    <Stack spacing={5} border="1px" borderColor="#E6FFFA" overflowY="scroll">
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </Stack>
  );
};

export default Chats;
