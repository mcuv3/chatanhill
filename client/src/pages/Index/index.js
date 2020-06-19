import React from "react";

import chatBg from "../../Assets/chat-bg.jpg";
import { theme, ThemeProvider, CSSReset, Grid, Box } from "@chakra-ui/core";

const index = () => {
  return (
    <Grid
      templateColumns="30% 70%"
      gap={0}
      width="82rem"
      height="96vh"
      m="auto"
      pt="1rem"
    >
      <Box w="100%" h="100%" bg="blue" />
      <Box
        w="100%"
        h="100%"
        bg={chatBg}
        style={{
          backgroundImage: `url(${chatBg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "auto",
        }}
      />
    </Grid>
  );
};

export default index;
