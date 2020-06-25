import React from "react";
import Chats from "./Chats/Chats";
import Search from "./Search/Search";
import UserControllers from "./UserControllers/UserControllers";
import { Grid } from "@chakra-ui/core";
import { useStore } from "../../store/index";

const Chat = (props) => {
  const state = useStore()[0];
  return (
    <Grid
      spacing={0}
      templateColumns="1fr"
      templateRows="4rem 2.5rem auto"
      height="100%"
    >
      <UserControllers />
      <Search />
      <Chats chats={state.chat.chats} userId={state.auth.userId} />
    </Grid>
  );
};

export default Chat;
