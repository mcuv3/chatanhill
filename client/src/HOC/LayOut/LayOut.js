import React, { useEffect } from "react";
import Header from "./Header";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { useStore } from "../../store/index";
import { withRouter } from "react-router-dom";

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
  const state = useStore()[0];
  useEffect(() => {
    if (state.auth.token) props.history.replace("/" + state.auth.user.username);
  }, [state.auth.token]);

  return (
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <Header />
      {props.children}
    </ThemeProvider>
  );
};

export default withRouter(LayOut);
