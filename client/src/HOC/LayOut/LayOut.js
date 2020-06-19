import React from "react";
import Header from "./Header";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};
const LayOut = (props) => {
  return (
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <Header />
      {props.children}
    </ThemeProvider>
  );
};

export default LayOut;
