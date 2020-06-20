import React, { useEffect } from "react";
import {
  theme,
  ThemeProvider,
  CSSReset,
  Grid,
  Box,
  useToast,
} from "@chakra-ui/core";
import Chat from "../../components/Chat/Chat";
import ChatView from "../../components/ChatView/index/ChatView";

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
  const toast = useToast();
  useEffect(() => {
    setTimeout(() => {
      // return toast({
      //   position: "bottom-left",
      //   title: "Successfully signed in.",
      //   description: "Start chatting and chilling.",
      //   status: "success",
      //   duration: 9000,
      //   isClosable: true,
      // });
    }, 1000);
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
          //bg="linear-gradient(to bottom,#319795,#E6FFFA)"
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
