import React, { useEffect } from "react";
import { theme, ThemeProvider, CSSReset, Grid, Box } from "@chakra-ui/core";
import Chat from "../../components/Chat/Chat";
import ChatView from "../../components/ChatView/index/ChatView";
import io from "socket.io-client";
import { useStore } from "../../store/index";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};

const Index = (props) => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    const socket = io("http://localhost:8080");
    // state.chat.chats.forEach((chat) => {
    //   socket.emit("JOIN", chat._id);
    // });
    socket.on("MESSAGES", (data) => {
      if (data.action === "MESSAGE_RECEIVED") {
        console.log(data.userId);
        if (data.userId !== state.auth.userId)
          dispatch("MESSAGE_RECEIVED", data);
      }
      if (data.action === "HOLA") {
        console.log("LLEGANDO");
      }
    });
  }, []);

  return (
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <Grid
        templateColumns="30% 70%"
        gap={0}
        width={{ lg: "88vw", xl: "82rem" }}
        height="95vh"
        m="auto"
        pt="1rem"
      >
        <Box w="100%" h="95vh">
          <Chat />
        </Box>
        <Box
          w="100%"
          h="95vh"
          style={{
            backgroundImage: "linear-gradient(to bottom,#4FD1C5 40%,#E6FFFA)",
          }}
        >
          <ChatView />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default Index;
