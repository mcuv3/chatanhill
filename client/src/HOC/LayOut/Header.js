import React, { useState } from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import SignUp from "../../pages/Auth/signup";
import LogIn from "../../pages/Auth/login";

const Header = (props) => {
  const [show, setShow] = React.useState(false);

  const [isSignedUp, setSignedUp] = useState(false);
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.2rem"
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
        color="#38B2AC"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Heading as="h2" size="lg" letterSpacing={"-.1rem"}>
            Chatanhill
          </Heading>
          <Text
            display="flex"
            mt="0.5rem"
            ml="0.5rem"
            fontSize="0.8rem"
            fontStyle="italic"
            align="start"
          >
            Chat and chill
          </Text>
        </Flex>

        <Flex display="block">
          <LogIn
            buttonStyle={{
              variant: "outline",
              variantColor: "teal",
              size: "sm",
            }}
            justCreateAccount={isSignedUp}
            toggleJustCreateAccount={() => setSignedUp(false)}
          />
          <SignUp
            buttonStyle={{ variant: "solid", variantColor: "teal", size: "sm" }}
            signedUp={() => setSignedUp(true)}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
