import React, { useContext } from "react";
import { Stack, Avatar, Icon, Flex, Tooltip } from "@chakra-ui/core";
import classes from "../../util/hover.css";
import { useStore } from "../../../store/index";
const UserControllers = () => {
  const dispatch = useStore()[1];
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
            onClick={() => dispatch("LOG_OUT")}
          />
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default UserControllers;
