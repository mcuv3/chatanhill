import React, { useContext } from "react";
import { Stack, Avatar, Icon, Flex, Tooltip } from "@chakra-ui/core";
import classes from "../../util/hover.css";
import { authContext } from "../../../auth-context/auth-context";
const UserControllers = () => {
  const logout = useContext(authContext).logOut;
  return (
    <Stack isInline p="0.6rem" bg="#319795">
      <Avatar name="Mcuve" src="https://bit.ly/dan-abramov" />
      <Flex ml="auto" justify="space-around" align="center" width="30%">
        <Tooltip label="New chat" placement="bottom">
          <Icon name="chat" size="1.2rem" className={classes.hover} />
        </Tooltip>
        <Tooltip label="Settings" placement="bottom">
          <Icon name="settings" size="1.2rem" className={classes.hover} />
        </Tooltip>
        <Tooltip label="Log out" placement="bottom">
          <Icon
            name="lock"
            size="1.2rem"
            className={classes.hover}
            onClick={() => logout()}
          />
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default UserControllers;
