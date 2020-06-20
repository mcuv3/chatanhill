import React from "react";
import Chats from "./Chats/Chats";
import Search from "./Search/Search";
import UserControllers from "./UserControllers/UserControllers";
import { Stack, Box, Grid } from "@chakra-ui/core";

const Chat = (props) => {
  return (
    <Grid
      spacing={0}
      templateColumns="1fr"
      templateRows="4rem 2.5rem auto"
      height="100%"
    >
      <UserControllers />
      <Search />
      <Chats />
    </Grid>
  );
};

export default Chat;
